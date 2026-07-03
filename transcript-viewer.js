// transcript-viewer.js
// Standalone add-on for Voxera. Does NOT modify any existing variable, function,
// or element from voice_chat.html — it only READS the existing `history` array.
// All of its own data lives under its own localStorage key, so it can never
// collide with anything else the app stores.
//
// Feature: every 5 minutes during an interview, takes a snapshot of the
// conversation so far. A floating button opens a panel listing each snapshot.

(function () {
  const STORAGE_KEY = 'voxera_5min_snapshots'; // namespaced, won't collide with anything existing
  const SNAPSHOT_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
  let snapshots = [];
  let snapshotTimer = null;
  let sessionStartTime = null;

  function loadSnapshots() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      snapshots = raw ? JSON.parse(raw) : [];
    } catch (e) {
      snapshots = [];
    }
  }

  function saveSnapshots() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
    } catch (e) {
      // Storage full or unavailable — fail silently, don't disrupt the interview
    }
  }

  function saveSnapshotToServer(snap) {
    const username = localStorage.getItem('currentUser') || 'unknown';
    fetch('/api/save-snapshot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        timestamp: snap.timestamp,
        elapsedMinutes: snap.elapsedMinutes,
        messages: snap.messages,
      }),
    }).catch(() => {
      // Silently ignore — server save is best-effort, localStorage copy is always kept regardless
    });
  }

  function takeSnapshot() {
    // Read-only access to the existing global `history` array from voice_chat.html.
    // If it doesn't exist yet or is empty, skip — never throws, never disrupts the app.
    if (typeof history === 'undefined' || !Array.isArray(history) || history.length === 0) {
      return;
    }

    const elapsedMinutes = sessionStartTime
      ? Math.round((Date.now() - sessionStartTime) / 60000)
      : 0;

    const snap = {
      timestamp: new Date().toISOString(),
      elapsedMinutes,
      messages: JSON.parse(JSON.stringify(history)), // deep copy, never a live reference
    };

    snapshots.push(snap);
    saveSnapshots();
    saveSnapshotToServer(snap);
  }

  function startSnapshotTimer() {
    if (snapshotTimer) return;
    sessionStartTime = sessionStartTime || Date.now();
    snapshotTimer = setInterval(takeSnapshot, SNAPSHOT_INTERVAL_MS);
  }

  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString();
  }

  function roleLabel(role) {
    if (role === 'user') return 'Interviewer';
    if (role === 'assistant') return 'Voxera';
    return role;
  }

  function renderPanel() {
    const existing = document.getElementById('voxera-transcript-panel');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'voxera-transcript-panel';
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
    header.innerHTML = `<h2 style="font-size:18px;color:#1a1a2e;margin:0;">5-Minute Transcript Snapshots</h2>`;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none;border:none;font-size:24px;cursor:pointer;color:#999;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.style.cssText = 'padding: 20px 24px; overflow-y: auto; flex: 1;';

    if (snapshots.length === 0) {
      body.innerHTML = `<p style="color:#888;font-size:14px;">
        No snapshots yet. One is captured automatically every 5 minutes once the interview starts.
        Current live transcript still appears below (real-time preview).
      </p>`;
    } else {
      snapshots.forEach((snap, i) => {
        const section = document.createElement('div');
        section.style.cssText = 'margin-bottom: 18px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;';

        const snapHeader = document.createElement('button');
        snapHeader.style.cssText = `
          width: 100%; text-align: left; padding: 12px 16px; background: #f8f8f5;
          border: none; cursor: pointer; font-weight: 600; font-size: 14px; color: #1a1a2e;
          display: flex; justify-content: space-between; align-items: center;
        `;
        snapHeader.innerHTML = `<span>Snapshot ${i + 1} — ~${snap.elapsedMinutes} min in</span><span style="font-weight:400;color:#999;font-size:12px;">${formatTime(snap.timestamp)}</span>`;

        const snapBody = document.createElement('div');
        snapBody.style.cssText = 'padding: 12px 16px; display: none; font-size: 13px; color: #333;';
        snapBody.innerHTML = snap.messages.map(m =>
          `<p style="margin:0 0 8px 0;"><strong>${roleLabel(m.role)}:</strong> ${(m.content || '').replace(/</g, '&lt;')}</p>`
        ).join('');

        snapHeader.onclick = () => {
          snapBody.style.display = snapBody.style.display === 'none' ? 'block' : 'none';
        };

        section.appendChild(snapHeader);
        section.appendChild(snapBody);
        body.appendChild(section);
      });
    }

    // Always show current live transcript at the bottom, regardless of snapshots
    if (typeof history !== 'undefined' && Array.isArray(history) && history.length > 0) {
      const liveSection = document.createElement('div');
      liveSection.style.cssText = 'margin-top: 20px; padding-top: 16px; border-top: 2px solid #4f46e5;';
      liveSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#4f46e5;margin-bottom:8px;">Live (current, not yet snapshotted)</p>`;
      const liveContent = document.createElement('div');
      liveContent.style.cssText = 'font-size:13px;color:#333;';
      liveContent.innerHTML = history.map(m =>
        `<p style="margin:0 0 8px 0;"><strong>${roleLabel(m.role)}:</strong> ${(m.content || '').replace(/</g, '&lt;')}</p>`
      ).join('');
      liveSection.appendChild(liveContent);
      body.appendChild(liveSection);
    }

    // Server-saved transcripts section — fetched fresh each time the panel opens
    const serverSection = document.createElement('div');
    serverSection.style.cssText = 'margin-top: 20px; padding-top: 16px; border-top: 2px solid #22c55e;';
    serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Saved on Server (persistent, downloadable)</p><p style="font-size:12px;color:#999;">Loading...</p>`;
    body.appendChild(serverSection);

    fetch('/api/list-transcripts')
      .then(r => r.json())
      .then(data => {
        const list = (data.transcripts || []).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        if (list.length === 0) {
          serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Saved on Server (persistent, downloadable)</p><p style="font-size:12px;color:#999;">Nothing saved yet — snapshots upload automatically every 5 minutes.</p>`;
          return;
        }
        const listHtml = list.map(item => {
          const name = item.pathname.split('/').pop();
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f1f1;font-size:13px;">
            <span style="color:#333;">${name}</span>
            <a href="/api/download-snapshot?url=${encodeURIComponent(item.url)}&pathname=${encodeURIComponent(item.pathname)}" style="color:#4f46e5;text-decoration:none;font-weight:600;">Download</a>
          </div>`;
        }).join('');
        serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Saved on Server (persistent, downloadable)</p>${listHtml}`;
      })
      .catch(() => {
        serverSection.innerHTML = `<p style="font-weight:600;font-size:13px;color:#16a34a;margin-bottom:8px;">Saved on Server (persistent, downloadable)</p><p style="font-size:12px;color:#c00;">Couldn't load server list right now.</p>`;
      });

    const footer = document.createElement('div');
    footer.style.cssText = 'padding: 14px 24px; border-top: 1px solid #eee; display:flex; justify-content:space-between; gap:8px;';

    const saveNowBtn = document.createElement('button');
    saveNowBtn.textContent = 'Save Current Transcript Now';
    saveNowBtn.style.cssText = 'padding:8px 14px;background:#22c55e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;';
    saveNowBtn.onclick = () => {
      if (typeof history === 'undefined' || !Array.isArray(history) || history.length === 0) {
        alert('Nothing to save yet — no conversation started.');
        return;
      }
      const elapsedMinutes = sessionStartTime ? Math.round((Date.now() - sessionStartTime) / 60000) : 0;
      const snap = { timestamp: new Date().toISOString(), elapsedMinutes, messages: JSON.parse(JSON.stringify(history)) };
      saveSnapshotToServer(snap);
      saveNowBtn.textContent = 'Saved!';
      setTimeout(() => { saveNowBtn.textContent = 'Save Current Transcript Now'; }, 1500);
    };
    footer.appendChild(saveNowBtn);

    const rightButtons = document.createElement('div');
    rightButtons.style.cssText = 'display:flex;gap:8px;';
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear Snapshots';
    clearBtn.style.cssText = 'padding:8px 14px;background:#f1f1f1;border:none;border-radius:6px;cursor:pointer;font-size:13px;color:#555;';
    clearBtn.onclick = () => {
      if (confirm('Clear all saved 5-minute snapshots? This does not affect your current live interview.')) {
        snapshots = [];
        saveSnapshots();
        renderPanel();
      }
    };
    rightButtons.appendChild(clearBtn);
    footer.appendChild(rightButtons);

    box.appendChild(header);
    box.appendChild(body);
    box.appendChild(footer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

  function injectButton() {
    const btn = document.createElement('button');
    btn.id = 'voxera-transcript-btn';
    btn.textContent = '📋 5-min Transcripts';
    btn.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 9998;
      background: #4f46e5; color: #fff; border: none; padding: 10px 16px;
      border-radius: 24px; font-size: 13px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    btn.onclick = renderPanel;
    document.body.appendChild(btn);
  }

  // Initialize — never throws, never touches existing app state
  try {
    loadSnapshots();
    injectButton();
    startSnapshotTimer();
  } catch (e) {
    console.error('transcript-viewer.js failed to initialize (existing app unaffected):', e);
  }
})();
