// endur-context.js
// Standalone add-on for Voxera. Puts Voxera into "Endur interview mode":
//   1. Treats every question as coming from an OpenLink Endur (ION) developer
//      / consultant interview.
//   2. Silently corrects speech-recognition mistakes (e.g. "JBS" -> JVS,
//      "AB trans" -> ab_tran) by assuming the Endur meaning.
//   3. Copies YOUR way of explaining things, from a sample answer you paste
//      into the "Endur mode" panel.
//
// Your resume still comes from the existing "Resume & JD" button
// (resume-upload.js). This file adds instructions only — it never stores
// your CV in the code.
//
// Technique: same fetch-wrapping pattern as resume-upload.js / model-label.js.
// It appends to the system message of /api/chat requests. If anything fails,
// the original request is sent untouched.

(function () {
  const ENABLED_KEY = 'voxera_endur_mode';   // 'on' (default) or 'off'
  const STYLE_KEY = 'voxera_answer_style';   // your sample explanation(s)

  const ENDUR_PROMPT = `

--- INTERVIEW CONTEXT: OPENLINK ENDUR DEVELOPER INTERVIEW ---
This is a live interview for an OpenLink Endur (now ION) developer / consultant role in energy trading (ETRM), mainly gas and power. Read EVERY question in that context. Generic-sounding questions ("how do you handle a failed task", "what is a plugin", "how do you debug a script", "how do you improve performance") must be answered in Endur terms, from hands-on Endur experience.

SPEECH-RECOGNITION ERRORS: The question comes from live speech-to-text and will often contain mis-heard or misspelled words. Silently interpret any odd word as the closest Endur / ETRM / SQL term and answer that. Never point out the mistake, never say "I think you mean", never ask the interviewer to repeat because of a typo. If a phrase could mean several things, answer the most likely Endur meaning.
Common mis-hearings (heard -> meant):
"jay vs", "JBS", "GVS", "JVM script" -> JVS / OpenJVS
"APS", "AVIS", "a v s" -> AVS
"open component", "OC" -> OpenComponents
"TPN", "TPM workflow", "T P M" -> TPM (Trade Process Management)
"APM" -> Active Position Manager
"end of day", "E O D", "EOD batch" -> EOD processing
"AB tran", "a b trans", "abby tran", "app tran" -> ab_tran table
"tran num", "deal num", "deal tracking" -> tran_num / deal_tracking_num
"ins num", "instrument number" -> ins_num
"tran info", "trans info" -> tran_info (deal info fields)
"UDS are", "user defined sim result" -> UDSR
"sim", "simulation result", "sim result" -> Simulation / sim results; "cube", "Q" -> cube
"connects", "connex" -> Connex framework
"ops service", "post ops", "pre ops", "pre process", "post process" -> Operation Services pre/post-process scripts
"notification manager", "limits manager", "deal manager" -> the Endur managers
"BU", "LE", "party agreement", "SI", "settlement instruction" -> parties, business units, legal entities, settlement instructions
"user table", "U table" -> USER_ tables
"market manager", "curve", "index" -> Market Manager, indexes / price curves
"report builder", "crystal" -> Report Builder / Crystal Reports
"data load", "dataload" -> dataLoad scripts
"Endure", "and your", "in door", "Indore" -> Endur; "open link", "ion" -> OpenLink / ION
"Zema", "morning star", "n market" -> Zema, MorningStar, ABB nMarket price feeds
"Washington 24", "version twenty four" -> version 24 (Endur V24); "indoor" -> Endur
"settlement best stop", "settlement desk top" -> Settlement Desktop; "STL doc" -> stldoc tables
"NBP", "N B P" -> National Balancing Point (UK gas hub); "TTF" -> Dutch gas hub
Apply the same idea to anything not in this list.

GROUNDING: Speak from the candidate's real experience in the uploaded resume. For a standard Endur concept the resume doesn't mention specifically, explain it as a practitioner would, but do not claim a specific project, client, or number that isn't in the resume.`;

  // Built-in description of how the candidate speaks, taken from his own sample answers.
  const STYLE_DEFAULT = `

--- CANDIDATE'S SPEAKING STYLE (always follow) ---
- Start directly from his own work, e.g. "In my current engagement...", "In Endur, ...", "First, ...". Never open with a textbook definition, and never with "Great question".
- For process / "how do you handle" / "walk me through" questions, go step by step: "First... Based on that, I... Then... Then, based on whether...". Speak as "I" doing it now ("I create", "I check", "I schedule").
- Name the real Endur objects he uses (user tables, static data, tasks, the workflow tab in Services Manager, email tables, ab_tran, tran_info, stldoc tables) rather than theory.
- Cover the "if" cases: "If it's automated...", "If it's EOD-related...", "If an email has to go out...".
- Show he is careful: he checks existing scripts and dependencies, does impact analysis, and discusses with the business before scheduling or changing anything.
- Examples follow: what we noticed -> what we were asked to do -> what I built -> "This is to make sure...".
- Use his phrases naturally (not in every sentence): "predominantly", "mainly", "I've been involved in", "I've been part of", "hands-on experience", "I also...". Longer answers can end with "So overall, ...".
- Plain, simple spoken English with clean grammar. Medium-length sentences. No buzzwords, no consultant language.

--- ANSWER FORMAT (this OVERRIDES the earlier "no bullet points / no markdown" rule) ---
The candidate reads the answer from the screen while speaking, so make it easy to read aloud at a glance:
- Process, steps, approach, troubleshooting, "how do you..." questions: one short opening line, then numbered points "1.", "2.", ... with one idea per point, each a short spoken sentence. Optionally one closing line.
- "Difference between" / comparison questions, or several items that each have attributes: one short opening line, then a simple markdown table (2-4 columns, max 6 rows, short cells), then one spoken closing line.
- Introduction, experience, story or behavioural answers: short paragraphs of 1-3 sentences, no bullets.
- Short factual questions: 1-2 sentences, no formatting.
- Use **bold** only for a few key Endur terms. No headings.`;

  function getStored(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; }
  }
  function setStored(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function isOn() { return getStored(ENABLED_KEY, 'on') !== 'off'; }

  function buildExtra() {
    let extra = ENDUR_PROMPT + STYLE_DEFAULT;
    const style = getStored(STYLE_KEY, '').trim();
    if (style) {
      extra += `

--- EXTRA SAMPLES OF HOW THE CANDIDATE EXPLAINS THINGS (copy this pattern) ---
Below is an example of how the candidate actually explains things out loud in interviews. Answer in the SAME pattern: the same way of opening, the same order of points, the same kind of transitions and linking phrases, the same sentence length, and the same way of wrapping up. Copy the PATTERN and VOICE only — do not copy the content unless the question is about the same topic. Still follow the length guidance for each question type.
EXAMPLE(S):
${style}`;
    }
    return extra;
  }

  function updateButton() {
    const btn = document.getElementById('voxera-endur-btn');
    if (!btn) return;
    btn.textContent = isOn() ? '🎯 Endur mode: ON' : '🎯 Endur mode: OFF';
    btn.style.background = isOn() ? '#EF9F27' : '#888';
    btn.style.color = isOn() ? '#1a1a1a' : '#fff';
  }

  function injectButton() {
    const btn = document.createElement('button');
    btn.id = 'voxera-endur-btn';
    btn.style.cssText = `
      position: fixed; top: 66px; right: 20px; z-index: 9996;
      border: none; padding: 10px 16px; border-radius: 24px;
      font-size: 13px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    btn.onclick = renderPanel;
    document.body.appendChild(btn);
    updateButton();
  }

  function renderPanel() {
    const old = document.getElementById('voxera-endur-panel');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'voxera-endur-panel';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
      background: #fff; border-radius: 12px; width: 90%; max-width: 560px;
      max-height: 85vh; display: flex; flex-direction: column;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;

    const header = document.createElement('div');
    header.style.cssText = 'padding:20px 24px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center;';
    header.innerHTML = '<h2 style="font-size:18px;color:#1a1a2e;margin:0;">Endur interview mode</h2>';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none;border:none;font-size:24px;cursor:pointer;color:#999;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.style.cssText = 'padding:20px 24px;overflow-y:auto;flex:1;';

    const toggleRow = document.createElement('label');
    toggleRow.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:14px;color:#1a1a2e;font-weight:600;margin-bottom:16px;cursor:pointer;';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = isOn();
    cb.onchange = () => { setStored(ENABLED_KEY, cb.checked ? 'on' : 'off'); updateButton(); };
    toggleRow.appendChild(cb);
    toggleRow.appendChild(document.createTextNode('Use Endur interview context + typo correction'));

    const styleTitle = document.createElement('p');
    styleTitle.textContent = 'Extra style samples (optional — your style is already built in)';
    styleTitle.style.cssText = 'font-weight:600;font-size:13px;color:#1a1a2e;margin-bottom:6px;';

    const ta = document.createElement('textarea');
    ta.placeholder = 'Optional extra samples. Your style is already built in. Example: "So basically, in Endur, ... First I would ... then ... In my last project at ... we ..."';
    ta.style.cssText = 'width:100%;min-height:160px;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:12px;font-family:inherit;';
    ta.value = getStored(STYLE_KEY, '');

    const status = document.createElement('p');
    status.style.cssText = 'font-size:11px;color:#16a34a;margin-top:4px;min-height:14px;';
    if (ta.value) status.textContent = `Saved (${ta.value.length.toLocaleString()} characters)`;
    ta.oninput = () => {
      setStored(STYLE_KEY, ta.value);
      status.textContent = ta.value ? `Saved (${ta.value.length.toLocaleString()} characters)` : '';
    };

    const note = document.createElement('p');
    note.textContent = 'Your resume still comes from the "Resume & JD" button. Settings are saved in this browser.';
    note.style.cssText = 'font-size:11px;color:#888;margin-top:12px;';

    body.appendChild(toggleRow);
    body.appendChild(styleTitle);
    body.appendChild(ta);
    body.appendChild(status);
    body.appendChild(note);

    const footer = document.createElement('div');
    footer.style.cssText = 'padding:14px 24px;border-top:1px solid #eee;display:flex;justify-content:flex-end;';
    const done = document.createElement('button');
    done.textContent = 'Done';
    done.style.cssText = 'padding:8px 14px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;';
    done.onclick = () => overlay.remove();
    footer.appendChild(done);

    box.appendChild(header);
    box.appendChild(body);
    box.appendChild(footer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  try {
    injectButton();
    const originalFetch = window.fetch;

    window.fetch = function (...args) {
      const url = args[0];
      const isChatCall = typeof url === 'string' && url.indexOf('/api/chat') !== -1;

      if (isChatCall && isOn() && args[1] && typeof args[1].body === 'string') {
        try {
          const parsed = JSON.parse(args[1].body);
          if (Array.isArray(parsed.messages) && parsed.messages[0] && parsed.messages[0].role === 'system') {
            parsed.messages[0] = { ...parsed.messages[0], content: parsed.messages[0].content + buildExtra() };
            args[1] = { ...args[1], body: JSON.stringify(parsed) };
          }
        } catch (e) {
          // fall through and send the original request untouched
        }
      }
      return originalFetch.apply(this, args);
    };
  } catch (e) {
    console.error('endur-context.js failed to initialize (existing app unaffected):', e);
  }
})();
