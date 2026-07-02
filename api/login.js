// api/login.js
// Validates username/password against users.json and issues a signed session cookie.
// Reads the SAME users.json that admin.html / get-users.js use, so there's one source of truth.

const crypto = require('crypto');
const users = require('../users.json');

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    return res.status(500).json({ error: 'Server misconfigured: missing SESSION_SECRET' });
  }

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const match = users.find(u => u.username === username && u.password === password);

  if (!match) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // NOTE: per-user expiresAt in users.json is NOT enforced here, to keep this simple.
  // Session below always lasts 24 hours from login regardless of that field.
  // If you want accounts to stop working after a certain date, say so and I'll wire it in.

  const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24-hour session
  const payload = `${username}.${expiry}`;
  const signature = sign(payload, secret);
  const token = `${payload}.${signature}`;

  res.setHeader(
    'Set-Cookie',
    `voxera_session=${token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=86400`
  );

  return res.status(200).json({ success: true, username });
};
