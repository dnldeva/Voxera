// save-transcript.js
// Auto-save conversation logic

let autoSaveInterval = null;

function startAutoSave() {
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  autoSaveInterval = setInterval(saveConversation, 600000); // 10 minutes
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
      console.log('✅ Conversation auto-saved');
    }
  } catch (error) {
    console.error('Save error:', error);
  }
}

// Start auto-save when this script loads
startAutoSave();