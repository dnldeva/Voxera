import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'users.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);
    
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error reading users.json:', error);
    return res.status(200).json({ users: [] });
  }
}
