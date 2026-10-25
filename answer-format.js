// answer-format.js
// Standalone add-on for Voxera. The core page shows answers as one block of
// plain text, so numbered points, bullet points and tables come out as raw
// "1." / "-" / "|" characters run together. This file watches for new
// answer bubbles and re-draws them with proper points, tables, bold and
// line breaks. Display only: the text sent to the AI and saved in
// transcripts is unchanged.
//
// When "Word highlight & zoom" is ON, the core page splits the answer into
// one span per word for the highlight effect. Those bubbles are left alone,
// so for points and tables keep highlight OFF.

(function () {
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.06);padding:0 4px;border-radius:4px;">$1</code>');
  }
  function cells(row) {
    return row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  }

  function render(text) {
    const lines = text.replace(/\r/g, '').split('\n');
    let html = '', i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      if (!line) { i++; continue; }

      // table: consecutive lines starting with |
      if (line.startsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i].trim()); i++; }
        // drop the |---|---| separator row
        const body = rows.filter(r => !cells(r).every(c => /^:?-{2,}:?$/.test(c)));
        if (body.length) {
          html += '<div style="overflow-x:auto;margin:8px 0;"><table style="border-collapse:collapse;width:100%;font-size:15px;">';
          body.forEach((r, idx) => {
            const tag = idx === 0 ? 'th' : 'td';
            html += '<tr>' + cells(r).map(c =>
              `<${tag} style="border:1px solid #e3d3b0;padding:6px 8px;text-align:left;vertical-align:top;${idx === 0 ? 'background:#fbe9c6;' : ''}">${inline(c)}</${tag}>`
            ).join('') + '</tr>';
          });
          html += '</table></div>';
        }
        continue;
      }

      // numbered list
      if (/^\d+[.)]\s+/.test(line)) {
        html += '<ol style="margin:6px 0 6px 22px;padding:0;">';
        while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
          html += '<li style="margin:4px 0;">' + inline(lines[i].trim().replace(/^\d+[.)]\s+/, '')) + '</li>'; i++;
        }
        html += '</ol>';
        continue;
      }

      // bullet list
      if (/^[-*•]\s+/.test(line)) {
        html += '<ul style="margin:6px 0 6px 22px;padding:0;">';
        while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
          html += '<li style="margin:4px 0;">' + inline(lines[i].trim().replace(/^[-*•]\s+/, '')) + '</li>'; i++;
        }
        html += '</ul>';
        continue;
      }

      // heading-style lines (#) shown as bold text
      if (/^#{1,6}\s+/.test(line)) { html += '<p style="margin:6px 0;"><strong>' + inline(line.replace(/^#+\s+/, '')) + '</strong></p>'; i++; continue; }

      html += '<p style="margin:6px 0;">' + inline(line) + '</p>';
      i++;
    }
    return html;
  }

  function formatBubble(bubble) {
    if (!bubble || bubble.dataset.vxFormatted) return;
    if (bubble.querySelector('.word, .typing')) return; // highlight mode or still typing
    const label = bubble.querySelector('.label');
    let text = '';
    bubble.childNodes.forEach(n => { if (n !== label) text += n.textContent; });
    if (!text.trim()) return;
    const content = document.createElement('div');
    content.innerHTML = render(text);
    Array.from(bubble.childNodes).forEach(n => { if (n !== label) n.remove(); });
    bubble.appendChild(content);
    bubble.dataset.vxFormatted = '1';
  }

  try {
    const box = document.getElementById('messages');
    if (!box) return;
    new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType === 1 && n.classList.contains('msg') && n.classList.contains('ai') && n.id !== 'typing-msg') {
          formatBubble(n.querySelector('.bubble'));
        }
      }));
    }).observe(box, { childList: true });
  } catch (e) {
    console.error('answer-format.js failed to initialize (existing app unaffected):', e);
  }
})();
