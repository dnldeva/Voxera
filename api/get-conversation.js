import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { filename } = req.query;

  try {
    const conversationsDir = path.join(process.cwd(), 'conversations');
    const filepath = path.join(conversationsDir, filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const content = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(content);
    const lastEntry = data[data.length - 1];

    res.status(200).json({
      username: lastEntry.username,
      messages: lastEntry.messages,
      audioMode: lastEntry.audioMode,
      timestamp: lastEntry.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
