import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const usersDir = path.join(process.cwd(), 'users');
    
    if (!fs.existsSync(usersDir)) {
      return res.status(200).json({ users: [] });
    }

    const files = fs.readdirSync(usersDir);
    const users = [];

    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filepath = path.join(usersDir, file);
        const content = fs.readFileSync(filepath, 'utf-8');
        const user = JSON.parse(content);
        users.push(user);
      }
    });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
