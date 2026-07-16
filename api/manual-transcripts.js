// api/manual-transcripts.js
// Combined route for the manual recording feature — handles BOTH saving a
// snapshot (POST) and listing saved sessions (GET) in a single serverless
// function. Merged deliberately to avoid pushing the project over Vercel's
// Hobby-plan 12-function limit. Still fully separate from the existing
// api/save-snapshot.js and api/list-transcripts.js — uses its own Blob
// prefix (manual-recordings/) so it can never collide with the existing
// auto 5-min snapshot feature.

import { put, list } from '@vercel/blob';

async function handleSave(req, res) {
  const { username, sessionId, timestamp, elapsedMinutes, isFinal, messages } = req.body || {};

  if (!username || !sessionId || !timestamp || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const safeUsername = String(username).replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, '_');
  const suffix = isFinal ? '-final' : '';
  const filename = `manual-recordings/${safeUsername}/${safeSessionId}/${timestamp}${suffix}.json`;

  const content = JSON.stringify(
    { username, sessionId, timestamp, elapsedMinutes, isFinal: !!isFinal, messages },
    null,
    2
  );

  const blob = await put(filename, content, {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
  });

  return res.status(200).json({ success: true, url: blob.url, pathname: blob.pathname });
}

async function handleList(req, res) {
  const { blobs } = await list({ prefix: 'manual-recordings/' });

  const items = blobs.map(b => ({
    pathname: b.pathname,
    url: b.url,
    size: b.size,
    uploadedAt: b.uploadedAt,
  }));

  return res.status(200).json({ transcripts: items });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      return await handleSave(req, res);
    }
    if (req.method === 'GET') {
      return await handleList(req, res);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('manual-transcripts error:', err);
    return res.status(500).json({ error: 'Failed', details: err.message });
  }
}
