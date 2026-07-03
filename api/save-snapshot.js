// api/save-snapshot.js
// Saves one transcript snapshot as a JSON file in Vercel Blob storage.
// Called by transcript-viewer.js — does not affect any existing route or file.

import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, timestamp, elapsedMinutes, messages } = req.body || {};

    if (!username || !timestamp || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Path groups snapshots by user, filename is timestamp-based so each is unique
    const safeUsername = String(username).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `transcripts/${safeUsername}/${timestamp}.json`;

    const content = JSON.stringify({ username, timestamp, elapsedMinutes, messages }, null, 2);

    const blob = await put(filename, content, {
      access: 'private', // private + proxied downloads keeps this behind your existing login gate
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    return res.status(200).json({ success: true, url: blob.url, pathname: blob.pathname });
  } catch (err) {
    console.error('save-snapshot error:', err);
    return res.status(500).json({ error: 'Failed to save snapshot', details: err.message });
  }
}
