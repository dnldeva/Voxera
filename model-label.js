// model-label.js
// Standalone add-on for Voxera. Shows an ALWAYS-VISIBLE badge indicating
// which internal Voxera "engine" is active, plus a manual switcher dropdown.
// Never exposes real provider/model names — only friendly internal names.
//
// Technique: wraps window.fetch so it can OBSERVE and (only when a manual
// override is chosen) lightly adjust the outgoing /api/chat request body.
// When left on "Auto", requests pass through completely untouched and the
// server-side fallback chain in api/chat.js behaves exactly as before.

(function () {
  const MODEL_LABELS = {
    'llama-3.3-70b-versatile': 'Voxera Core',
    'openai/gpt-oss-120b': 'Voxera Core+',
    'qwen/qwen3.6-27b': 'Voxera Flex',
    'openai/gpt-oss-20b': 'Voxera Swift',
    'llama-3.1-8b-instant': 'Voxera Lite',
  };
  const OVERRIDE_KEY = 'voxera_model_override'; // 'auto' or a model id
  const DEFAULT_LABEL = 'Voxera Core';
  let currentModelId = null;

  function friendlyName(modelId) {
    return MODEL_LABELS[modelId] || 'Voxera';
  }

  function getOverride() {
    try {
      return localStorage.getItem(OVERRIDE_KEY) || 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  function setOverride(value) {
    try {
      localStorage.setItem(OVERRIDE_KEY, value);
    } catch (e) {
      // ignore
    }
  }

  function injectBadge() {
    const wrap = document.createElement('div');
    wrap.id = 'voxera-engine-wrap';
    wrap.style.cssText = `
      position: fixed; bottom: 20px; left: 20px; z-index: 9997;
      display: flex; align-items: center; gap: 6px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;

    const badge = document.createElement('div');
    badge.id = 'voxera-engine-badge';
    badge.textContent = DEFAULT_LABEL;
    badge.style.cssText = `
      background: rgba(26,26,46,0.85); color: #fff; padding: 6px 12px;
      border-radius: 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
      pointer-events: none; opacity: 1;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: box-shadow 0.3s, background 0.3s, transform 0.3s;
    `;

    const select = document.createElement('select');
    select.id = 'voxera-engine-select';
    select.style.cssText = `
      font-size: 11px; padding: 5px 8px; border-radius: 12px; border: 1px solid #ccc;
      background: #fff; color: #333; cursor: pointer; font-family: inherit;
    `;
    const options = [['auto', 'Auto'], ...Object.entries(MODEL_LABELS).map(([id, label]) => [id, label])];
    options.forEach(([value, label]) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      select.appendChild(opt);
    });
    select.value = getOverride();
    select.onchange = () => setOverride(select.value);

    wrap.appendChild(badge);
    wrap.appendChild(select);
    document.body.appendChild(wrap);
    return badge;
  }

  function flashSwitchIndicator(badge) {
    badge.style.background = '#22c55e';
    badge.style.boxShadow = '0 0 0 4px rgba(34,197,94,0.35)';
    badge.style.transform = 'scale(1.08)';
    setTimeout(() => {
      badge.style.background = 'rgba(26,26,46,0.85)';
      badge.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      badge.style.transform = 'scale(1)';
    }, 1400);
  }

  function updateBadge(badge, modelId) {
    if (!badge) return;
    const switched = currentModelId !== null && currentModelId !== modelId;
    currentModelId = modelId;
    badge.textContent = friendlyName(modelId);
    if (switched) flashSwitchIndicator(badge);
  }

  try {
    const badge = injectBadge();
    const originalFetch = window.fetch;

    window.fetch = function (...args) {
      const url = args[0];
      const isChatCall = typeof url === 'string' && url.indexOf('/api/chat') !== -1;

      // If a manual override is set, attach it to the outgoing request body.
      // On "Auto", nothing is touched — request passes through exactly as before.
      if (isChatCall && args[1] && typeof args[1].body === 'string') {
        const override = getOverride();
        if (override !== 'auto') {
          try {
            const parsedBody = JSON.parse(args[1].body);
            parsedBody.preferredModel = override;
            args[1] = { ...args[1], body: JSON.stringify(parsedBody) };
          } catch (e) {
            // If parsing fails for any reason, fall through and send the original request untouched
          }
        }
      }

      const fetchPromise = originalFetch.apply(this, args);

      if (isChatCall) {
        fetchPromise
          .then((response) => response.clone().json())
          .then((data) => {
            if (data && data._modelUsed) updateBadge(badge, data._modelUsed);
          })
          .catch(() => {});
      }

      return fetchPromise;
    };
  } catch (e) {
    console.error('model-label.js failed to initialize (existing app unaffected):', e);
  }
})();
