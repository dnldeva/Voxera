// api/chat.js
// UPDATED: now tries multiple Groq models in priority order. If the primary
// model hits its daily/rate limit (or any error), it automatically retries
// the SAME request on the next model — no user-facing failure.
//
// Existing behavior for the frontend is unchanged: same endpoint, same
// request/response shape. voice_chat.html needs no changes at all.

// IMPORTANT: llama-3.3-70b-versatile and llama-3.1-8b-instant are both
// scheduled for shutdown by Groq on 08/16/26 (~6 weeks from now, per
// console.groq.com/docs/deprecations). They still work today, so they stay
// in the chain, but plan to swap the primary model before that date.
const MODEL_CHAIN = [
  'llama-3.3-70b-versatile',   // 1. Primary — best reasoning quality (shuts down 08/16/26)
  'openai/gpt-oss-120b',       // 2. Groq's official recommended replacement — strong reasoning
  'qwen/qwen3.6-27b',          // 3. Newer model, not on the deprecation list
  'openai/gpt-oss-20b',        // 4. Fast, cheap, official replacement for 3.1 8B
  'llama-3.1-8b-instant',      // 5. Last resort — fastest/cheapest (shuts down 08/16/26)
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // If the client requested a specific model manually (via the UI switcher),
  // try that one first, then fall back through the rest of the normal chain
  // if it fails. On "Auto" (no preferredModel sent), behavior is unchanged.
  const { preferredModel, ...bodyWithoutOverride } = req.body || {};
  let chain = MODEL_CHAIN;
  if (preferredModel && MODEL_CHAIN.includes(preferredModel)) {
    chain = [preferredModel, ...MODEL_CHAIN.filter(m => m !== preferredModel)];
  }

  let lastError = null;

  for (const model of chain) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.GROQ_API_KEY,
        },
        // Override whatever model the client sent — this endpoint controls the chain now
        body: JSON.stringify({ ...bodyWithoutOverride, model }),
      });

      const data = await response.json();

      if (!data.error) {
        // Success — optionally note which model actually answered (harmless extra field,
        // frontend already only reads data.choices[0].message.content and ignores the rest)
        data._modelUsed = model;
        return res.status(200).json(data);
      }

      // Got an error (rate limit or otherwise) — remember it and try the next model
      lastError = data.error;
      console.log(`Model ${model} failed (${data.error.code || data.error.type}), trying next...`);
    } catch (err) {
      lastError = { message: err.message };
      console.log(`Model ${model} threw an exception, trying next...`, err.message);
    }
  }

  // Every model in the chain failed
  return res.status(500).json({
    error: 'All models exhausted for today. Please try again later.',
    details: lastError,
  });
}
