// api/manual-list-transcripts.js
// Lists saved MANUAL recording snapshots from Vercel Blob storage.
// Separate from api/list-transcripts.js — only looks under the
// manual-recordings/ prefix, so it never touches or lists the existing
// 5-minute auto-snapshots. Sits behind your existing middleware.js login gate.

import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { blobs } = await list({ prefix: 'manual-recordings/' });

    const items = blobs.map(b => ({
      pathname: b.pathname,
      url: b.url,
      size: b.size,
      uploadedAt: b.uploadedAt,
    }));

    return res.status(200).json({ transcripts: items });
  } catch (err) {
    console.error('manual-list-transcripts error:', err);
    return res.status(500).json({ error: 'Failed to list manual recordings', details: err.message });
  }
}
