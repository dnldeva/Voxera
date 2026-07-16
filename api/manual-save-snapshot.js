// api/manual-save-snapshot.js
// Saves one MANUAL recording snapshot as a JSON file in Vercel Blob storage.
// This is a completely separate route from api/save-snapshot.js — different
// blob path prefix (manual-recordings/ vs transcripts/), so it can never
// collide with or overwrite anything the existing auto-snapshot feature saves.
// Called only by manual-recorder.js.

import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
      access: 'private', // stays behind your existing middleware.js login gate
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    return res.status(200).json({ success: true, url: blob.url, pathname: blob.pathname });
  } catch (err) {
    console.error('manual-save-snapshot error:', err);
    return res.status(500).json({ error: 'Failed to save manual snapshot', details: err.message });
  }
}
