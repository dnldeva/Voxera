// manual-recorder.js
// Standalone add-on for Voxera. Does NOT modify any existing variable, function,
// or element from voice_chat.html — it only READS the existing `history` array,
// the same way transcript-viewer.js already does.
//
// Feature: ONE toggle button.
//   - Click once  -> starts a manual recording session. Every 5 minutes,
//                    automatically saves a snapshot (locally + to server).
//   - Click again  -> stops the session, saves one final snapshot, done.
//
// Fully isolated from the existing auto 5-min snapshot feature:
//   - own localStorage key: voxera_manual_recordings
//   - own server route:     /api/manual-transcripts (POST=save, GET=list)
//                            (own Blob prefix: manual-recordings/)
//   - reuses the EXISTING /api/download-snapshot route for downloads (that route
//     is already generic and takes any blob url/pathname, so nothing new needed there)

(function () {
  const STORAGE_KEY = 'voxera_manual_recordings';
  const SNAPSHOT_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

  let sessions = [];          // all past + current sessions, persisted locally
  let currentSession = null;  // the in-progress session object, or null if not recording
  let timer = null;

  function loadSessions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      sessions = raw ? JSON.parse(raw) : [];
    } catch (e) {
      sessions = [];
    }
  }

  function saveSessions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      // Storage full/unavailable — fail silently, never disrupt the interview
    }
  }

  function getUsername() {
    return localStorage.getItem('currentUser') || 'unknown';
  }

  function uploadSnapshot(snap) {
    fetch('/api/manual-transcripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: getUsername(),
        sessionId: currentSession ? currentSession.sessionId : snap.sessionId,
        timestamp: snap.timestamp,
        elapsedMinutes: snap.elapsedMinutes,
        isFinal: !!snap.isFinal,
        messages: snap.messages,
      }),
    }).catch(() => {
      // Best-effort — the localStorage copy is always kept regardless
    });
  }

  function currentHistorySnapshot(isFinal) {
    if (typeof history === 'undefined' || !Array.isArray(history)) {
      return null;
    }
    const elapsedMinutes = currentSession
      ? Math.round((Date.now() - currentSession.startedAt) / 60000)
      : 0;
    return {
      timestamp: new Date().toISOString(),
      elapsedMinutes,
      isFinal: !!isFinal,
      messages: JSON.parse(JSON.stringify(history)),
    };
  }

  function takeSnapshot(isFinal) {
    if (!currentSession) return;
    const snap = currentHistorySnapshot(isFinal);
    if (!snap || snap.messages.length === 0) return;

    currentSession.snapshots.push(snap);
    saveSessions();
    uploadSnapshot(snap);
  }

  function startRecording() {
    const sessionId = `session-${Date.now()}`;
    currentSession = {
      sessionId,
      startedAt: Date.now(),
      startedAtIso: new Date().toISOString(),
      stoppedAtIso: null,
      snapshots: [],
    };
    sessions.push(currentSession);
    saveSessions();

    timer = setInterval(() => takeSnapshot(false), SNAPSHOT_INTERVAL_MS);
    updateButton();
  }

  function stopRecording() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (currentSession) {
      takeSnapshot(true); // final snapshot on stop, even if <5 min since last one
      currentSession.stoppedAtIso = new Date().toISOString();
      saveSessions();
    }
    currentSession = null;
    updateButton();
  }

  function toggleRecording() {
    if (currentSession) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  function updateButton() {
    const btn = document.getElementById('voxera-manual-record-btn');
    const viewBtn = document.getElementById('voxera-manual-view-btn');
    if (btn) {
      if (currentSession) {
        btn.textContent = '⏹ Stop Recording';
        btn.style.background = '#dc2626';
      } else {
        btn.textContent = '● Start Recording';
        btn.style.background = '#4f46e5';
      }
    }
    if (viewBtn) {
      viewBtn.style.display = currentSession ? 'inline-block' : 'none';
    }
  }

  function roleLabel(role) {
    if (role === 'user') return 'Interviewer';
    if (role === 'assistant') return 'Voxera';
    return role;
  }

  function formatTime(iso) {
    try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
  }

  function renderPanel() {
    const existing = document.getElementById('voxera-manual-panel');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'voxera-manual-panel';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      z-index: 99999; display: flex; align-items: center; justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
      background: #fff; border-radius: 12px; width: 90%; max-width: 640px;
      max-height: 80vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      padding: 20px 24px; border-bottom: 1px solid #eee; display: flex;
      justify-content: space-between; align-items: center;
    `;
    header.innerHTML = `<h2 style="font-size:18px;color:#1a1a2e;margin:0;">Manual Recording</h2>`;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none;border:none;font-size:24px;cursor:pointer;color:#999;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.style.cssText = 'padding: 20px 24px; overflow-y: auto; flex: 1;';

    // Live, currently-recording transcript
    if (currentSession) {
      const liveSection = document.createElement('div');
      liveSection.style.cssText = 'margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #dc2626;';
      const elapsed = Math.round((Date.now() - currentSession.startedAt) / 60000);
      liveSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#dc2626;margin-bottom:8px;">🔴 Recording live — ~${elapsed} min in</p>`;
      const liveContent = document.createElement('div');
      liveContent.style.cssText = 'font-size:13px;color:#333;';
      if (typeof history !== 'undefined' && Array.isArray(history) && history.length > 0) {
        liveContent.innerHTML = history.map(m =>
          `<p style="margin:0 0 8px 0;"><strong>${roleLabel(m.role)}:</strong> ${(m.content || '').replace(/</g, '&lt;')}</p>`
        ).join('');
      } else {
        liveContent.innerHTML = `<p style="color:#888;">No conversation captured yet.</p>`;
      }
      liveSection.appendChild(liveContent);
      body.appendChild(liveSection);

      // Snapshots saved so far this session
      if (currentSession.snapshots.length > 0) {
        const snapSection = document.createElement('div');
        snapSection.style.cssText = 'margin-bottom: 20px;';
        snapSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#4f46e5;margin-bottom:8px;">Snapshots saved this session (${currentSession.snapshots.length})</p>`;
        currentSession.snapshots.forEach((snap, i) => {
          const line = document.createElement('p');
          line.style.cssText = 'font-size:12px;color:#666;margin:2px 0;';
          line.textContent = `#${i + 1} — ~${snap.elapsedMinutes} min in — ${formatTime(snap.timestamp)}`;
          snapSection.appendChild(line);
        });
        body.appendChild(snapSection);
      }
    } else {
      body.innerHTML = `<p style="color:#888;font-size:14px;">Not currently recording. Click "Start Recording" to begin.</p>`;
    }

    // Past sessions from server
    const serverSection = document.createElement('div');
    serverSection.style.cssText = 'margin-top: 12px; padding-top: 16px; border-top: 2px solid #22c55e;';
    serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Past Manual Recordings (server)</p><p style="font-size:12px;color:#999;">Loading...</p>`;
    body.appendChild(serverSection);

    fetch('/api/manual-transcripts')
      .then(r => r.json())
      .then(data => {
        const list = (data.transcripts || []).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        if (list.length === 0) {
          serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Past Manual Recordings (server)</p><p style="font-size:12px;color:#999;">Nothing saved yet.</p>`;
          return;
        }
        const listHtml = list.map(item => {
          const name = item.pathname.split('/').pop();
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f1f1;font-size:13px;">
            <span style="color:#333;">${name}</span>
            <a href="/api/download-snapshot?url=${encodeURIComponent(item.url)}&pathname=${encodeURIComponent(item.pathname)}" style="color:#4f46e5;text-decoration:none;font-weight:600;">Download</a>
          </div>`;
        }).join('');
        serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Past Manual Recordings (server)</p>${listHtml}`;
      })
      .catch(() => {
        serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Past Manual Recordings (server)</p><p style="font-size:12px;color:#c00;">Couldn't load list right now.</p>`;
      });

    box.appendChild(header);
    box.appendChild(body);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  function injectButton() {
    const btn = document.createElement('button');
    btn.id = 'voxera-manual-record-btn';
    btn.style.cssText = `
      position: fixed; bottom: 20px; left: 20px; z-index: 9998;
      background: #4f46e5; color: #fff; border: none; padding: 10px 16px;
      border-radius: 24px; font-size: 13px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    btn.textContent = '● Start Recording';
    btn.onclick = toggleRecording;
    document.body.appendChild(btn);

    const viewBtn = document.createElement('button');
    viewBtn.id = 'voxera-manual-view-btn';
    viewBtn.style.cssText = `
      position: fixed; bottom: 20px; left: 170px; z-index: 9998;
      background: #333; color: #fff; border: none; padding: 10px 16px;
      border-radius: 24px; font-size: 13px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2); display: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    viewBtn.textContent = '👁 View Recording';
    viewBtn.onclick = renderPanel;
    document.body.appendChild(viewBtn);
  }

  // Initialize — never throws, never touches existing app state
  try {
    loadSessions();
    injectButton();
  } catch (e) {
    console.error('manual-recorder.js failed to initialize (existing app unaffected):', e);
  }
})();
