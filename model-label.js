// model-label.js
// Standalone add-on for Voxera. Shows a small, unobtrusive badge indicating
// which internal Voxera "engine" answered the last question — using friendly
// internal names only, never the actual underlying provider/model.
//
// Technique: wraps window.fetch so it can OBSERVE the /api/chat response
// without changing it. The original response is always passed through
// untouched to voice_chat.html's existing code — this script cannot alter
// app behavior even if something inside it fails.

(function () {
  // Internal display names — never expose real provider/model names to the UI
  const MODEL_LABELS = {
    'llama-3.3-70b-versatile': 'Voxera Core',
    'openai/gpt-oss-120b': 'Voxera Core+',
    'qwen/qwen3.6-27b': 'Voxera Flex',
    'openai/gpt-oss-20b': 'Voxera Swift',
    'llama-3.1-8b-instant': 'Voxera Lite',
  };

  function friendlyName(modelId) {
    return MODEL_LABELS[modelId] || 'Voxera';
  }

  function injectBadge() {
    const badge = document.createElement('div');
    badge.id = 'voxera-engine-badge';
    badge.textContent = '';
    badge.style.cssText = `
      position: fixed; bottom: 20px; left: 20px; z-index: 9997;
      background: rgba(26,26,46,0.85); color: #fff; padding: 6px 12px;
      border-radius: 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      pointer-events: none; opacity: 0; transition: opacity 0.3s;
    `;
    document.body.appendChild(badge);
    return badge;
  }

  function updateBadge(badge, modelId) {
    if (!badge) return;
    badge.textContent = friendlyName(modelId);
    badge.style.opacity = '1';
  }

  try {
    const badge = injectBadge();
    const originalFetch = window.fetch;

    window.fetch = function (...args) {
      const url = args[0];
      const isChatCall =
        typeof url === 'string' && url.indexOf('/api/chat') !== -1;

      const fetchPromise = originalFetch.apply(this, args);

      if (isChatCall) {
        fetchPromise
          .then((response) => response.clone().json())
          .then((data) => {
            if (data && data._modelUsed) {
              updateBadge(badge, data._modelUsed);
            }
          })
          .catch(() => {
            // Silently ignore — never let this affect the real app flow
          });
      }

      // Always return the ORIGINAL, untouched promise to the app's own code
      return fetchPromise;
    };
  } catch (e) {
    console.error('model-label.js failed to initialize (existing app unaffected):', e);
  }
})();
