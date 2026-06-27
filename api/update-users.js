import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password, expiryHours, action } = req.body;

    const usersDir = path.join(process.cwd(), 'users');
    if (!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir, { recursive: true });
    }

    if (action === 'delete') {
      const filepath = path.join(usersDir, `${username}.json`);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      return res.status(200).json({ success: true, message: 'User deleted' });
    }

    // Add or Update user
    const userData = {
      username,
      password,
      expiryHours: parseInt(expiryHours),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString()
    };

    const filepath = path.join(usersDir, `${username}.json`);
    fs.writeFileSync(filepath, JSON.stringify(userData, null, 2));

    res.status(200).json({ 
      success: true, 
      message: 'User saved successfully',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
