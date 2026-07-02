// api/get-users.js
// FIXED: previously returned a hardcoded, disconnected copy of alice/bob/charlie
// regardless of what was actually in users.json. Now reads the real file, so
// admin.html shows what's actually configured for login.

const users = require('../users.json');

module.exports = async function handler(req, res) {
  return res.status(200).json({ users });
};
