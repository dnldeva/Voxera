import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const usersPath = path.join(process.cwd(), 'users.json');
    
    if (!fs.existsSync(usersPath)) {
      return res.status(200).json({ users: [] });
    }

    const content = fs.readFileSync(usersPath, 'utf-8');
    const users = JSON.parse(content);

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
