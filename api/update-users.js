export default async function handler(req, res) {
  return res.status(200).json({ 
    success: false,
    message: 'User management coming soon. For now, edit users.json directly in GitHub.'
  });
}
