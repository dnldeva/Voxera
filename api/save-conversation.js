import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { timestamp, username, messages, audioMode } = req.body;

    // Create conversations directory if it doesn't exist
    const conversationsDir = path.join(process.cwd(), 'conversations');
    if (!fs.existsSync(conversationsDir)) {
      fs.mkdirSync(conversationsDir, { recursive: true });
    }

    // Create filename based on username and date
    const date = new Date(timestamp).toISOString().split('T')[0];
    const filename = `${username}_${date}.json`;
    const filepath = path.join(conversationsDir, filename);

    // Prepare data to save
    const conversationData = {
      timestamp,
      username,
      messages,
      audioMode,
      savedAt: new Date().toISOString()
    };

    // Append to existing file or create new one
    let existingData = [];
    if (fs.existsSync(filepath)) {
      const content = fs.readFileSync(filepath, 'utf-8');
      existingData = JSON.parse(content);
    }

    existingData.push(conversationData);

    // Save to file
    fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ 
      success: true, 
      message: 'Conversation saved',
      filename 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
