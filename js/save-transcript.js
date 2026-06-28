// save-transcript.js
// Auto-save conversation logic

let autoSaveInterval = null;

function startAutoSave() {
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  autoSaveInterval = setInterval(saveConversation, 300000); // 5 minutes
}

async function saveConversation() {
  // Get history from voice_chat.html
  if (typeof history === 'undefined' || history.length === 0) return;
  
  try {
    const conversationData = {
      timestamp: new Date().toISOString(),
      username: window.currentUsername || localStorage.getItem('currentUser'),
      messages: history,
      audioMode: 'system-audio'
    };
    
    const response = await fetch('/api/save-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(conversationData)
    });
    
    if (response.ok) {
      console.log('? Conversation auto-saved');
      showSaveToast();
    }
  } catch (error) {
    console.error('Save error:', error);
  }
}

// Toast notification function
function showSaveToast() {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = '?? Saving transcript...';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.textContent = '? Transcript saved!';
  }, 500);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

startAutoSave();
