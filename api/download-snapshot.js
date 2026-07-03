// api/download-snapshot.js
// Streams a specific private transcript blob back to the browser as a downloadable file.
// Protected by your existing middleware.js login gate — same as every other page/route.
//
// FIXED: get() needs the blob's full URL, not just its pathname — that mismatch
// caused "Failed to parse URL from undefined" on the previous version.

import { get } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, pathname } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const result = await get(url, { access: 'private' });

    if (!result) {
      return res.status(404).json({ error: 'Transcript not found' });
    }

    const content = await (await fetch(result.url)).text();

    const filename = (pathname || url).split('/').pop().split('?')[0];
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(content);
  } catch (err) {
    console.error('download-snapshot error:', err);
    return res.status(500).json({ error: 'Failed to download transcript', details: err.message });
  }
}
