// session-timer.js
// Standalone add-on for Voxera. Shows a countdown warning banner once the
// session is close to expiring (last 2 minutes by default), and a clear
// "session expired" message — instead of the confusing generic
// "Connection error" that happens when an expired session silently fails
// on the next AI request.
//
// Reads the expiry timestamp that login.html stores in localStorage. It
// never reads or touches the actual HttpOnly session cookie (can't — that's
// intentional for security), it only displays a countdown based on the
// timestamp the server already handed back at login time.

(function () {
  const EXPIRES_KEY = 'voxera_session_expires';
  const WARNING_THRESHOLD_MS = 2 * 60 * 1000; // show countdown in the last 2 minutes
  let bannerEl = null;
  let tickInterval = null;

  function getExpiresAt() {
    try {
      const raw = localStorage.getItem(EXPIRES_KEY);
      return raw ? parseInt(raw, 10) : null;
    } catch (e) {
      return null;
    }
  }

  function formatCountdown(ms) {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  function ensureBanner() {
    if (bannerEl) return bannerEl;
    bannerEl = document.createElement('div');
    bannerEl.id = 'voxera-session-banner';
    bannerEl.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; z-index: 100000;
      display: none; align-items: center; justify-content: center; gap: 12px;
      background: #fbbf24; color: #1a1a2e; font-weight: 600; font-size: 13px;
      padding: 10px 16px; text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(bannerEl);
    return bannerEl;
  }

  function showWarning(remainingMs) {
    const banner = ensureBanner();
    banner.style.display = 'flex';
    banner.style.background = '#fbbf24';
    banner.style.color = '#1a1a2e';
    banner.textContent = `⏱ Your session expires in ${formatCountdown(remainingMs)} — please finish up or you'll need to log in again.`;
  }

  function showExpired() {
    const banner = ensureBanner();
    banner.style.display = 'flex';
    banner.style.background = '#dc2626';
    banner.style.color = '#fff';
    banner.innerHTML = '';
    const text = document.createElement('span');
    text.textContent = 'Your session has expired.';
    const link = document.createElement('a');
    link.href = '/login.html';
    link.textContent = 'Log in again';
    link.style.cssText = 'color:#fff;text-decoration:underline;font-weight:700;';
    banner.appendChild(text);
    banner.appendChild(link);
  }

  function hideBanner() {
    if (bannerEl) bannerEl.style.display = 'none';
  }

  function tick() {
    const expiresAt = getExpiresAt();
    if (!expiresAt) return; // nothing stored yet — say nothing, don't disrupt anything

    const remaining = expiresAt - Date.now();

    if (remaining <= 0) {
      showExpired();
      if (tickInterval) clearInterval(tickInterval);
      return;
    }

    if (remaining <= WARNING_THRESHOLD_MS) {
      showWarning(remaining);
    } else {
      hideBanner();
    }
  }

  try {
    tick(); // check immediately on load
    tickInterval = setInterval(tick, 1000);
  } catch (e) {
    console.error('session-timer.js failed to initialize (existing app unaffected):', e);
  }
})();
