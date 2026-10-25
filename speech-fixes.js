// speech-fixes.js
// Standalone add-on for Voxera. Deals with speech-to-text mishearing Endur terms.
//
// 1. Word fixes: before a question is sent, words like "indoor", "endure",
//    "vendor", "JBS" are replaced with the Endur term. The "Captured Input"
//    bubble also shows the corrected text, so you can see what was sent.
// 2. Accent setting: a small dropdown (bottom left, next to the engine
//    switcher) lets you choose English (UK), English (India) or English (US)
//    for speech recognition. English (India) often recognises Indian-accented
//    technical words better. Default stays English (UK), as before.
//
// Core files are not changed: the accent is applied by wrapping the browser's
// SpeechRecognition.start(), and the word fixes by wrapping fetch like the
// other add-ons. Load this file LAST so its fixes happen before qa-bank.js
// picks knowledge-bank entries.

(function () {
  const LANG_KEY = 'voxera_sr_lang';

  // [pattern, replacement]  — whole words only, case-insensitive.
  // Remove a line if it ever replaces a word you really meant.
  const FIXES = [
    [/\b(indoor|in door|endure|endor|enduro|vendor|vendors|and dur|en dur|andur)\b/gi, 'Endur'],
    [/\b(open link|openlink endur)\b/gi, 'OpenLink Endur'],
    [/\b(jbs|gvs|jay vs|jay v s|j v s)\b/gi, 'JVS'],
    [/\b(open jbs|open jvs|open j v s)\b/gi, 'OpenJVS'],
    [/\b(a v s|avis)\b/gi, 'AVS'],
    [/\b(t p m|tpn)\b/gi, 'TPM'],
    [/\b(e o d)\b/gi, 'EOD'],
    [/\b(abby tran|a b tran|ab tran|app tran)s?\b/gi, 'ab_tran'],
    [/\b(settlement best stop|settlement desk top|settlement best top)\b/gi, 'Settlement Desktop'],
    [/\bwashington (\d+)\b/gi, 'version $1'],
    [/\b(uds are|u d s r)\b/gi, 'UDSR'],
    [/\b(morning star)\b/gi, 'MorningStar'],
    [/\b(n market)\b/gi, 'nMarket'],
  ];

  function fixText(t) {
    let out = String(t || '');
    FIXES.forEach(([re, rep]) => { out = out.replace(re, rep); });
    return out;
  }
  window.voxeraFixText = fixText; // for testing in the console

  // ---- 1. accent / language for speech recognition ----
  function getLang() {
    try { return localStorage.getItem(LANG_KEY) || ''; } catch (e) { return ''; }
  }
  try {
    const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SRClass && SRClass.prototype && SRClass.prototype.start) {
      const originalStart = SRClass.prototype.start;
      SRClass.prototype.start = function () {
        const lang = getLang();
        if (lang) this.lang = lang;
        return originalStart.apply(this, arguments);
      };
    }

    const sel = document.createElement('select');
    sel.id = 'voxera-lang-select';
    sel.title = 'Speech recognition accent';
    sel.style.cssText = `
      position: fixed; bottom: 54px; left: 20px; z-index: 9997;
      font-size: 11px; padding: 5px 8px; border-radius: 12px; border: 1px solid #ccc;
      background: #fff; color: #333; cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    [['', 'Accent: English (UK)'], ['en-IN', 'Accent: English (India)'], ['en-US', 'Accent: English (US)']]
      .forEach(([v, label]) => { const o = document.createElement('option'); o.value = v; o.textContent = label; sel.appendChild(o); });
    sel.value = getLang();
    sel.onchange = () => {
      try { localStorage.setItem(LANG_KEY, sel.value); } catch (e) { /* ignore */ }
      sel.blur(); // give keyboard shortcuts back
    };
    document.body.appendChild(sel);
  } catch (e) {
    console.error('speech-fixes.js accent setting failed (existing app unaffected):', e);
  }

  // ---- 2. correct the question before it is sent ----
  try {
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      const url = args[0];
      const isChatCall = typeof url === 'string' && url.indexOf('/api/chat') !== -1;
      if (isChatCall && args[1] && typeof args[1].body === 'string') {
        try {
          const body = JSON.parse(args[1].body);
          if (Array.isArray(body.messages)) {
            body.messages = body.messages.map(m => m.role === 'user' ? { ...m, content: fixText(m.content) } : m);
            args[1] = { ...args[1], body: JSON.stringify(body) };
          }
        } catch (e) { /* send original */ }
      }
      return originalFetch.apply(this, args);
    };
  } catch (e) {
    console.error('speech-fixes.js failed to initialize (existing app unaffected):', e);
  }

  // ---- 3. show the corrected text in the "Captured Input" bubble ----
  try {
    const box = document.getElementById('messages');
    if (box) {
      new MutationObserver(muts => {
        muts.forEach(m => m.addedNodes.forEach(n => {
          if (n.nodeType !== 1 || !n.classList.contains('interviewer')) return;
          const b = n.querySelector('.bubble');
          if (!b) return;
          b.childNodes.forEach(c => {
            if (c.nodeType === 3) { const f = fixText(c.textContent); if (f !== c.textContent) c.textContent = f; }
          });
        }));
      }).observe(box, { childList: true });
    }
  } catch (e) { /* display only */ }
})();
