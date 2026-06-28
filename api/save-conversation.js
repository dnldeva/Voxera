// Save to localStorage for now (client-side)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { timestamp, username, messages, audioMode } = req.body;
    
    console.log('? Received save request:', { username, messageCount: messages.length });
    
    // Return success - the actual saving happens client-side
    res.status(200).json({ 
      success: true, 
      message: 'Conversation saved to browser',
      timestamp,
      username
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
