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
  const secret = process.env.SECRET;

  if (!secret) {
    return res.status(500).json({ error: 'Server misconfigured: missing SECRET' });
  }

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const match = users.find(u => u.username === username && u.password === password);

  if (!match) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Session length: 90 minutes
  const expiry = Date.now() + 90 * 60 * 1000; // 90 minutes in milliseconds
  const payload = `${username}.${expiry}`;
  const signature = sign(payload, secret);
  const token = `${payload}.${signature}`;

  res.setHeader(
    'Set-Cookie',
    `voxera_session=${token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=5400` // 90 minutes in seconds
  );

  // expiresAt is safe to expose (just a timestamp, not the secret) — lets the
  // client show a countdown without being able to read or forge the HttpOnly cookie itself.
  return res.status(200).json({ success: true, username, expiresAt: expiry });
};
