// keyboard-shortcuts.js
// Standalone add-on for Voxera. Adds keyboard shortcuts:
//   Down arrow  = start / stop recording the interviewer's question
//   Right arrow = GO (get the answer). Works even while still recording,
//                 because submitQuestion() stops the mic first.
//
// It only CALLS the existing global functions toggleMic() and submitQuestion()
// from voice_chat.html. No core code is changed.
//
// Shortcuts are ignored while typing in a text box / dropdown, while a
// panel (Resume & JD, Endur mode) is open, when held down (key repeat),
// or when Ctrl / Alt / Shift / Cmd is pressed.
//
// Also includes one small non-invasive fix: voice_chat.html's
// resetMicButtons() looks for a #candidate-mic button that no longer exists
// on the page, which throws an error when recording stops (so the status
// line never updates to "Input captured"). Adding a hidden placeholder with
// that id stops the error without editing voice_chat.html.

(function () {
  try {
    if (!document.getElementById('candidate-mic')) {
      const ph = document.createElement('button');
      ph.id = 'candidate-mic';
      ph.style.display = 'none';
      ph.tabIndex = -1;
      ph.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ph);
    }

    function isTypingInField(el) {
      if (!el) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    }

    function panelOpen() {
      return !!(document.getElementById('voxera-resume-panel') ||
                document.getElementById('voxera-endur-panel'));
    }

    document.addEventListener('keydown', function (e) {
      if (e.repeat || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
      if (isTypingInField(document.activeElement) || panelOpen()) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault(); // stop the page scrolling
        if (typeof window.toggleMic === 'function') window.toggleMic('interviewer');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (typeof window.submitQuestion === 'function') window.submitQuestion();
      }
    });

    // Small hint so you remember the keys
    const hint = document.createElement('div');
    hint.id = 'voxera-shortcut-hint';
    hint.textContent = '↓ Record / Stop   ·   → Go';
    hint.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 9995;
      background: rgba(26,26,46,0.85); color: #EF9F27; padding: 6px 12px;
      border-radius: 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
      pointer-events: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    document.body.appendChild(hint);
  } catch (e) {
    console.error('keyboard-shortcuts.js failed to initialize (existing app unaffected):', e);
  }
})();
