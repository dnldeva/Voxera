import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const conversationsDir = path.join(process.cwd(), 'conversations');
    
    if (!fs.existsSync(conversationsDir)) {
      return res.status(200).json({ conversations: [] });
    }

    const files = fs.readdirSync(conversationsDir);
    const conversations = files.map(filename => {
      const filepath = path.join(conversationsDir, filename);
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);
      const lastEntry = data[data.length - 1];

      return {
        filename,
        username: lastEntry.username,
        date: lastEntry.timestamp,
        lastSaved: lastEntry.savedAt,
        messageCount: lastEntry.messages.length,
        audioMode: lastEntry.audioMode
      };
    });

    res.status(200).json({ conversations: conversations.reverse() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
