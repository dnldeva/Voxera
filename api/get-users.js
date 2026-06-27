export default async function handler(req, res) {
  const users = [
    {
      "username": "alice",
      "password": "password123",
      "expiryHours": 24,
      "createdAt": "2026-06-27T00:00:00.000Z",
      "expiresAt": "2026-06-28T00:00:00.000Z"
    },
    {
      "username": "bob",
      "password": "securepass456",
      "expiryHours": 24,
      "createdAt": "2026-06-27T00:00:00.000Z",
      "expiresAt": "2026-06-28T00:00:00.000Z"
    },
    {
      "username": "charlie",
      "password": "mypassword789",
      "expiryHours": 24,
      "createdAt": "2026-06-27T00:00:00.000Z",
      "expiresAt": "2026-06-28T00:00:00.000Z"
    }
  ];
  
  return res.status(200).json({ users });
}
