// resume-upload.js
// Standalone add-on for Voxera. Lets the user upload a resume and/or job
// description (PDF, Word, or plain text) BEFORE or during the interview.
// The extracted text is merged into the outgoing AI request as extra
// context — it never touches voice_chat.html's own code or SYSTEM_PROMPT.
//
// Technique: same fetch-wrapping pattern as model-label.js. Multiple
// scripts can each wrap window.fetch independently and they compose safely
// — each one calls through to whatever fetch existed before it.
//
// PDF/Word parsing libraries (pdf.js, mammoth.js) are loaded from CDN only
// when actually needed (first file upload), not on page load — zero impact
// on normal interview startup time.

(function () {
  const RESUME_KEY = 'voxera_resume_text';
  const JD_KEY = 'voxera_jd_text';

  const PDFJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  const PDFJS_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const MAMMOTH_URL = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';

  let pdfjsLoaded = false;
  let mammothLoaded = false;

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${url}"]`);
      if (existing) return resolve();
      const s = document.createElement('script');
      s.src = url;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load ' + url));
      document.head.appendChild(s);
    });
  }

  async function ensurePdfJs() {
    if (pdfjsLoaded) return;
    await loadScript(PDFJS_URL);
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
    pdfjsLoaded = true;
  }

  async function ensureMammoth() {
    if (mammothLoaded) return;
    await loadScript(MAMMOTH_URL);
    mammothLoaded = true;
  }

  async function extractPdfText(file) {
    await ensurePdfJs();
    const buffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ') + '\n';
    }
    return text.trim();
  }

  async function extractDocxText(file) {
    await ensureMammoth();
    const buffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
    return (result.value || '').trim();
  }

  async function extractTxtText(file) {
    return await file.text();
  }

  async function extractText(file) {
    const name = file.name.toLowerCase();
    if (name.endsWith('.pdf')) return extractPdfText(file);
    if (name.endsWith('.docx') || name.endsWith('.doc')) return extractDocxText(file);
    return extractTxtText(file);
  }

  function getStored(key) {
    try { return localStorage.getItem(key) || ''; } catch (e) { return ''; }
  }

  function setStored(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  function injectButton() {
    const btn = document.createElement('button');
    btn.id = 'voxera-resume-btn';
    btn.textContent = '📄 Resume & JD';
    btn.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 9996;
      background: #1a1a2e; color: #fff; border: none; padding: 10px 16px;
      border-radius: 24px; font-size: 13px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    btn.onclick = renderPanel;
    document.body.appendChild(btn);
  }

  function fileUploadRow(label, storageKey, statusEl) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin-bottom: 16px;';

    const title = document.createElement('p');
    title.textContent = label;
    title.style.cssText = 'font-weight:600;font-size:13px;color:#1a1a2e;margin-bottom:6px;';

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.style.cssText = 'font-size:13px;';

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Or paste text here instead...';
    textarea.style.cssText = 'width:100%;min-height:70px;margin-top:8px;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:12px;font-family:inherit;';
    textarea.value = getStored(storageKey);

    const status = document.createElement('p');
    status.style.cssText = 'font-size:11px;color:#16a34a;margin-top:4px;min-height:14px;';
    const existing = getStored(storageKey);
    if (existing) status.textContent = `Loaded (${existing.length.toLocaleString()} characters)`;

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      status.style.color = '#888';
      status.textContent = 'Reading file...';
      try {
        const text = await extractText(file);
        textarea.value = text;
        setStored(storageKey, text);
        status.style.color = '#16a34a';
        status.textContent = `Loaded from ${file.name} (${text.length.toLocaleString()} characters)`;
      } catch (e) {
        status.style.color = '#c00';
        status.textContent = 'Could not read that file — try pasting the text below instead.';
        console.error('resume-upload.js extraction error:', e);
      }
    };

    textarea.oninput = () => {
      setStored(storageKey, textarea.value);
      status.style.color = '#16a34a';
      status.textContent = textarea.value
        ? `Saved (${textarea.value.length.toLocaleString()} characters)`
        : '';
    };

    wrap.appendChild(title);
    wrap.appendChild(input);
    wrap.appendChild(textarea);
    wrap.appendChild(status);
    return wrap;
  }

  function renderPanel() {
    const existing = document.getElementById('voxera-resume-panel');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'voxera-resume-panel';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      z-index: 99999; display: flex; align-items: center; justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
      background: #fff; border-radius: 12px; width: 90%; max-width: 560px;
      max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;

    const header = document.createElement('div');
    header.style.cssText = 'padding: 20px 24px; border-bottom: 1px solid #eee; display:flex; justify-content:space-between; align-items:center;';
    header.innerHTML = `<h2 style="font-size:18px;color:#1a1a2e;margin:0;">Resume &amp; Job Description</h2>`;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none;border:none;font-size:24px;cursor:pointer;color:#999;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.style.cssText = 'padding: 20px 24px; overflow-y: auto; flex: 1;';
    body.innerHTML = `<p style="font-size:12px;color:#888;margin-bottom:16px;">
      Upload a PDF, Word doc, or paste text directly. This is added as extra context
      for the AI — your existing interview setup is not changed.
    </p>`;
    body.appendChild(fileUploadRow('Resume', RESUME_KEY, 'resume-status'));
    body.appendChild(fileUploadRow('Job Description', JD_KEY, 'jd-status'));

    const footer = document.createElement('div');
    footer.style.cssText = 'padding: 14px 24px; border-top: 1px solid #eee; display:flex; justify-content:flex-end; gap:8px;';
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear Both';
    clearBtn.style.cssText = 'padding:8px 14px;background:#f1f1f1;border:none;border-radius:6px;cursor:pointer;font-size:13px;color:#555;';
    clearBtn.onclick = () => {
      if (confirm('Clear the uploaded resume and job description?')) {
        setStored(RESUME_KEY, '');
        setStored(JD_KEY, '');
        renderPanel();
      }
    };
    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.style.cssText = 'padding:8px 14px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;';
    doneBtn.onclick = () => overlay.remove();
    footer.appendChild(clearBtn);
    footer.appendChild(doneBtn);

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

      if (isChatCall && args[1] && typeof args[1].body === 'string') {
        const resumeText = getStored(RESUME_KEY);
        const jdText = getStored(JD_KEY);

        if (resumeText || jdText) {
          try {
            const parsedBody = JSON.parse(args[1].body);
            if (Array.isArray(parsedBody.messages) && parsedBody.messages[0] && parsedBody.messages[0].role === 'system') {
              let extra = '\n\n--- ADDITIONAL CONTEXT (uploaded by candidate) ---\n';
              if (resumeText) extra += `\nRESUME:\n${resumeText}\n`;
              if (jdText) extra += `\nJOB DESCRIPTION:\n${jdText}\n`;
              parsedBody.messages[0] = {
                ...parsedBody.messages[0],
                content: parsedBody.messages[0].content + extra,
              };
              args[1] = { ...args[1], body: JSON.stringify(parsedBody) };
            }
          } catch (e) {
            // If anything goes wrong, fall through and send the original request untouched
          }
        }
      }

      return originalFetch.apply(this, args);
    };
  } catch (e) {
    console.error('resume-upload.js failed to initialize (existing app unaffected):', e);
  }
})();
