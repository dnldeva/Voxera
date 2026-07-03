// api/list-transcripts.js
// Lists saved transcript snapshots from Vercel Blob storage.
// This route sits behind your existing middleware.js login gate automatically
// (it's not in the excluded list), so only logged-in users can call it.

import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { blobs } = await list({ prefix: 'transcripts/' });

    const items = blobs.map(b => ({
      pathname: b.pathname,
      url: b.url,
      size: b.size,
      uploadedAt: b.uploadedAt,
    }));

    return res.status(200).json({ transcripts: items });
  } catch (err) {
    console.error('list-transcripts error:', err);
    return res.status(500).json({ error: 'Failed to list transcripts', details: err.message });
  }
}
