// qa-bank.js
// Standalone add-on for Voxera. For every question, finds the 2-4 most
// relevant entries in window.VOXERA_KB (endur-kb.js) and adds ONLY those to
// the AI request, so answers are based on your prepared material instead of
// being made up. Your own answers are preferred over generic reference notes.
//
// Also raises max_tokens so longer answers (e.g. "tell me about yourself")
// are not cut off.
//
// Matching runs in the browser (no extra API calls, no Vercel function used).
// Speech-to-text mistakes are normalised first (e.g. "JBS" -> jvs).
// Active only when Endur mode is ON (same switch as endur-context.js).
//
// Load order in voice_chat.html: endur-kb.js must come BEFORE this file.

(function () {
  const ENABLED_KEY = 'voxera_endur_mode';
  const MAX_ENTRIES = 4;
  const MAX_CHARS = 4500;
  const MIN_TOP_SCORE = 2.0;
  const MAX_TOKENS = 900;

  // heard -> meant (applied to questions AND bank text so they match)
  const FIXES = [
    [/\b(jay\s*vs|j\s*v\s*s|jbs|gvs|jvm script|java script in endur)\b/g, ' jvs '],
    [/\bopen\s*jvs\b/g, ' openjvs jvs '],
    [/\b(a\s*v\s*s|aps|avis)\b/g, ' avs '],
    [/\bopen\s*components?\b/g, ' opencomponents '],
    [/\b(t\s*p\s*m|tpn)\b/g, ' tpm '],
    [/\b(a\s*p\s*m)\b/g, ' apm '],
    [/\b(end\s*of\s*day|e\s*o\s*d)\b/g, ' eod '],
    [/\b(ab|a\s*b|abby|app)\s*_?\s*trans?\b/g, ' ab_tran '],
    [/\btran(s)?\s*_?\s*info\b/g, ' tran_info '],
    [/\btran(s)?\s*_?\s*num(ber)?\b/g, ' tran_num '],
    [/\bdeal\s*tracking(\s*num(ber)?)?\b/g, ' deal_tracking_num '],
    [/\buds\s*are\b|\buser\s*defined\s*sim(ulation)?\s*results?\b/g, ' udsr '],
    [/\bconnects\b/g, ' connex '],
    [/\b(post|pre)\s*-?\s*(ops|operations?|process(ing)?)\b/g, ' $1ops opservice '],
    [/\b(endure|indoor|in\s*door|indore|and\s*your)\b/g, ' endur '],
    [/\bopen\s*link\b/g, ' openlink '],
    [/\bwashington\b/g, ' version '],
    [/\bsettlement\s*best\s*stop\b/g, ' settlement desktop '],
    [/\bmorning\s*star\b/g, ' morningstar '],
    [/\bn\s*market\b/g, ' nmarket '],
    [/\bdata\s*load\b/g, ' dataload '],
    [/\bsim(s)?\b/g, ' simulation '],
    [/\bcubes?\b/g, ' cube '],
    [/\bbusiness\s*units?\b|\bbu\b/g, ' bunit businessunit '],
    [/\blegal\s*entit(y|ies)\b|\ble\b/g, ' legalentity '],
    [/\bsettlement\s*instructions?\b|\bsi\b/g, ' settlementinstruction '],
  ];

  const STOP = new Set(('a an the and or of to in on for with is are was were be been it its this that these those ' +
    'what which who whom how why when where do does did you your yours i me my we our us they them their ' +
    'can could would should will shall may might have has had about from by as at into than then there here ' +
    'any some all each also just so if not no yes please tell explain describe give example examples ' +
    'walk through like kind type types use used using get got one two').split(' '));

  function normalise(text) {
    let t = ' ' + String(text || '').toLowerCase() + ' ';
    FIXES.forEach(([re, rep]) => { t = t.replace(re, rep); });
    return t.replace(/[^a-z0-9_]+/g, ' ');
  }

  function tokens(text) {
    return normalise(text).split(' ').filter(w => w && w.length > 1 && !STOP.has(w))
      .map(w => (w.length > 4 && w.endsWith('s') && !w.endsWith('ss')) ? w.slice(0, -1) : w);
  }

  // ---- build BM25 index once ----
  let INDEX = null;
  function buildIndex() {
    const kb = Array.isArray(window.VOXERA_KB) ? window.VOXERA_KB : [];
    const docs = kb.map(e => {
      const qt = tokens(e.q), at = tokens(e.a);
      const all = qt.concat(qt, qt, at); // question/title counts 3x
      const tf = {};
      all.forEach(w => { tf[w] = (tf[w] || 0) + 1; });
      return { e, tf, len: all.length };
    });
    const df = {};
    docs.forEach(d => Object.keys(d.tf).forEach(w => { df[w] = (df[w] || 0) + 1; }));
    const avg = docs.reduce((s, d) => s + d.len, 0) / Math.max(docs.length, 1);
    INDEX = { docs, df, avg, N: docs.length };
  }

  function search(query) {
    if (!INDEX) buildIndex();
    const { docs, df, avg, N } = INDEX;
    const qt = Array.from(new Set(tokens(query)));
    if (!qt.length || !N) return [];
    const k1 = 1.2, b = 0.75;
    // an entry must match enough of the question's key words (max 3 required)
    const needHits = Math.min(3, Math.max(1, Math.ceil(qt.length * 0.6)));
    const scored = docs.map(d => {
      let s = 0, hit = 0;
      qt.forEach(w => {
        const f = d.tf[w];
        if (!f) return;
        hit++;
        const idf = Math.log(1 + (N - df[w] + 0.5) / (df[w] + 0.5));
        s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / avg));
      });
      if (d.e.o) s *= 1.3; // prefer your own answers
      return { e: d.e, s, hit };
    }).filter(x => x.s > 0 && x.hit >= needHits).sort((x, y) => y.s - x.s);
    if (!scored.length || scored[0].s < MIN_TOP_SCORE) return [];
    const top = scored[0].s, out = [];
    let chars = 0;
    for (const x of scored) {
      if (out.length >= MAX_ENTRIES || x.s < top * 0.5) break;
      if (chars + x.e.a.length > MAX_CHARS && out.length) continue;
      out.push(x.e); chars += x.e.a.length;
    }
    return out;
  }

  function buildBlock(entries) {
    let t = `

--- CANDIDATE'S PREPARED KNOWLEDGE BANK (entries matched to this question) ---
How to use these:
- [YOUR OWN ANSWER] entries are the candidate's own prepared answers and notes. If one directly answers the question, base the answer on it closely: same points, same order, same experience. Tidy the grammar and adapt it to the exact question, but do not change the substance.
- [REFERENCE NOTES] entries are study material. Use them for correct Endur facts, tables, APIs and steps. Do NOT turn them into personal experience claims: only claim projects, clients, tools and numbers that appear in the resume or in [YOUR OWN ANSWER] entries. For anything else, explain it as "the way it works" or "the approach I would take".
- If none of the entries is relevant to the question, ignore this section completely.
- Prefer these entries over your own general knowledge when they disagree.
`;
    entries.forEach((e, i) => {
      t += `\n[${e.o ? 'YOUR OWN ANSWER' : 'REFERENCE NOTES'} ${i + 1} — ${e.s}]\nQ/Topic: ${e.q}\n${e.a}\n`;
    });
    return t;
  }

  function isOn() {
    try { return localStorage.getItem(ENABLED_KEY) !== 'off'; } catch (e) { return true; }
  }

  // Expose for testing in the browser console: voxeraKbSearch("what is tpm")
  window.voxeraKbSearch = function (q) { return search(q).map(e => (e.o ? '[OWN] ' : '[REF] ') + e.q); };

  try {
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      const url = args[0];
      const isChatCall = typeof url === 'string' && url.indexOf('/api/chat') !== -1;
      if (isChatCall && isOn() && args[1] && typeof args[1].body === 'string') {
        try {
          const body = JSON.parse(args[1].body);
          const msgs = Array.isArray(body.messages) ? body.messages : [];
          const users = msgs.filter(m => m.role === 'user').map(m => String(m.content || ''));
          if (users.length && msgs[0] && msgs[0].role === 'system') {
            const last = users[users.length - 1];
            // short follow-ups ("why?", "how?") borrow context from the previous question
            const query = last.split(/\s+/).length < 6 && users.length > 1
              ? last + ' ' + users[users.length - 2] : last;
            const hits = search(query);
            if (hits.length) {
              msgs[0] = { ...msgs[0], content: msgs[0].content + buildBlock(hits) };
            }
            if (!body.max_tokens || body.max_tokens < MAX_TOKENS) body.max_tokens = MAX_TOKENS;
            body.messages = msgs;
            args[1] = { ...args[1], body: JSON.stringify(body) };
          }
        } catch (e) {
          // fall through and send the original request untouched
        }
      }
      return originalFetch.apply(this, args);
    };
  } catch (e) {
    console.error('qa-bank.js failed to initialize (existing app unaffected):', e);
  }
})();
