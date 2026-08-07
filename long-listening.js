// Long-listening add-on for Voxera: auto-restarts speech recognition for up to one hour.
(function () {
  const MAX_SESSION_MS = 60 * 60 * 1000;
  const RESTART_DELAY_MS = 500;
  const SNAPSHOT_INTERVAL_MS = 5 * 60 * 1000;
  const STORAGE_KEY = 'voxera_long_listening_snapshots';
  const FATAL_ERRORS = new Set(['not-allowed', 'service-not-allowed', 'audio-capture', 'aborted']);

  window.voxeraLongListening = window.voxeraLongListening || {
    manualStop: false,
    lastError: null,
    activeRecognition: null
  };

  let sessionStartedAt = 0;
  let latestTranscript = '';
  let snapshotTimer = null;
  let deadlineTimer = null;

  function sessionActive() {
    return sessionStartedAt &&
      !window.voxeraLongListening.manualStop &&
      Date.now() - sessionStartedAt < MAX_SESSION_MS;
  }

  function saveSnapshot(force) {
    if ((!force && !sessionActive()) || !latestTranscript.trim()) return;

    const snapshot = {
      timestamp: new Date().toISOString(),
      elapsedMinutes: Math.floor((Date.now() - sessionStartedAt) / 60000),
      messages: [{ role: 'interviewer', content: latestTranscript.trim() }]
    };

    try {
      const snapshots = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      snapshots.push(snapshot);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
    } catch (error) {
      console.warn('Could not save local transcript snapshot.', error);
    }

    fetch('/api/save-snapshot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: localStorage.getItem('currentUser') || 'unknown',
        ...snapshot
      })
    }).catch(() => {});
  }

  function endSession(message) {
    clearInterval(snapshotTimer);
    clearTimeout(deadlineTimer);
    snapshotTimer = null;
    deadlineTimer = null;
    sessionStartedAt = 0;

    if (message) {
      setTimeout(() => {
        const status = document.getElementById('status');
        if (status) status.textContent = message;
      }, 0);
    }
  }

  function startSessionIfNeeded() {
    if (sessionStartedAt || window.voxeraLongListening.manualStop) return;

    sessionStartedAt = Date.now();
    window.voxeraLongListening.lastError = null;

    snapshotTimer = setInterval(() => saveSnapshot(false), SNAPSHOT_INTERVAL_MS);

    deadlineTimer = setTimeout(() => {
      window.voxeraLongListening.manualStop = true;
      saveSnapshot(true);

      try {
        window.voxeraLongListening.activeRecognition.stop();
      } catch (error) {
        // Recognition may already have ended.
      }

      endSession('One-hour listening limit reached — final transcript snapshot saved.');
    }, MAX_SESSION_MS);
  }

  window.addEventListener('voxera:recognitionstart', startSessionIfNeeded);

  window.addEventListener('voxera:transcriptupdate', (event) => {
    startSessionIfNeeded();
    latestTranscript = event.detail.finalText || event.detail.text || latestTranscript;
  });

  window.addEventListener('voxera:recognitionend', (event) => {
    const recognition = event.detail.recognition;
    const error = window.voxeraLongListening.lastError;

    if (window.voxeraLongListening.manualStop || FATAL_ERRORS.has(error)) {
      if (window.voxeraLongListening.manualStop) saveSnapshot(true);
      endSession();
      return;
    }

    startSessionIfNeeded();

    if (!sessionActive()) {
      window.voxeraLongListening.manualStop = true;
      saveSnapshot(true);
      endSession('One-hour listening limit reached — final transcript snapshot saved.');
      return;
    }

    event.preventDefault();
    window.voxeraLongListening.lastError = null;

    setTimeout(() => {
      if (!sessionActive()) return;

      try {
        recognition.start();
      } catch (error) {
        console.warn('Speech-recognition restart failed.', error);
      }
    }, RESTART_DELAY_MS);
  });
})();
