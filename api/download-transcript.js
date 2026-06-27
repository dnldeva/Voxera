import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: 'Filename required' });
  }

  try {
    const conversationsDir = path.join(process.cwd(), 'conversations');
    const filepath = path.join(conversationsDir, filename);

    // Security: ensure filepath is within conversations directory
    if (!filepath.startsWith(conversationsDir)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const content = fs.readFileSync(filepath, 'utf-8');
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
