// api/download-snapshot.js
// Streams a specific transcript blob back as a READABLE plain-text file,
// converting the raw stored JSON into a clean Q&A transcript on the fly.
// The JSON in Blob storage stays exactly as it was — only the download
// output changes. Protected by your existing middleware.js login gate.

import { get } from '@vercel/blob';

function formatTimestamp(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch (e) {
    return iso;
  }
}

function roleLabel(role) {
  if (role === 'user') return 'INTERVIEWER';
  if (role === 'assistant') return 'VOXERA';
  return (role || '').toUpperCase();
}

function formatTranscript(data) {
  const lines = [];
  lines.push('Voxera Interview Transcript');
  lines.push(`Saved: ${formatTimestamp(data.timestamp)}`);
  if (typeof data.elapsedMinutes === 'number') {
    lines.push(`(~${data.elapsedMinutes} minutes into the interview)`);
  }
  if (data.username) {
    lines.push(`Candidate: ${data.username}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  const messages = Array.isArray(data.messages) ? data.messages : [];
  messages.forEach((m) => {
    lines.push(`${roleLabel(m.role)}:`);
    lines.push(m.content || '');
    lines.push('');
  });

  return lines.join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, pathname } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const result = await get(url, { access: 'private' });

    if (!result) {
      return res.status(404).json({ error: 'Transcript not found' });
    }

    const rawContent = await (await fetch(result.url)).text();

    let outputText;
    let filename;

    try {
      const data = JSON.parse(rawContent);
      outputText = formatTranscript(data);
      const dateForName = (data.timestamp || '').slice(0, 16).replace(/[:T]/g, '-');
      filename = `Voxera-Transcript-${dateForName || 'export'}.txt`;
    } catch (parseErr) {
      // Fallback: if it's not valid JSON for some reason, just send it as-is
      outputText = rawContent;
      filename = ((pathname || url).split('/').pop().split('?')[0]) + '.txt';
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(outputText);
  } catch (err) {
    console.error('download-snapshot error:', err);
    return res.status(500).json({ error: 'Failed to download transcript', details: err.message });
  }
}
