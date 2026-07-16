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
//   - own server route:     /api/manual-save-snapshot  (own Blob prefix: manual-recordings/)
//   - own list route:       /api/manual-list-transcripts
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
    fetch('/api/manual-save-snapshot', {
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
    if (!btn) return;
    if (currentSession) {
      btn.textContent = '⏹ Stop Recording';
      btn.style.background = '#dc2626';
    } else {
      btn.textContent = '● Start Recording';
      btn.style.background = '#4f46e5';
    }
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
  }

  // Initialize — never throws, never touches existing app state
  try {
    loadSessions();
    injectButton();
  } catch (e) {
    console.error('manual-recorder.js failed to initialize (existing app unaffected):', e);
  }
})();
