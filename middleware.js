// middleware.js
// Runs on EVERY request before it reaches voice_chat.html, admin.html, user-transcripts.html,
// or any /api/* route (except the ones excluded below). Redirects to /login.html if there's
// no valid session cookie. None of your existing HTML files need any changes for this to work.
//
// IMPORTANT: this project has no package.json / is not a Next.js app, so we use plain
// Web APIs (Request/Response/crypto.subtle) rather than the `next/server` import — that
// import only works inside a Next.js app and would fail to deploy here.

export const config = {
  matcher: [
    '/((?!login.html|api/login|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js)$).*)',
  ],
};

function getCookie(request, name) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

async function verifySignature(payload, signatureHex, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedHex = Array.from(new Uint8Array(sigBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return expectedHex === signatureHex;
}

export default async function middleware(request) {
  const cookie = getCookie(request, 'voxera_session');

  if (!cookie) {
    return Response.redirect(new URL('/login.html', request.url));
  }

  const parts = cookie.split('.');
  if (parts.length !== 3) {
    return Response.redirect(new URL('/login.html', request.url));
  }

  const [username, expiry, signature] = parts;
  const payload = `${username}.${expiry}`;
  const secret = process.env.SESSION_SECRET;

  const valid = await verifySignature(payload, signature, secret);
  const notExpired = Date.now() < Number(expiry);

  if (!valid || !notExpired) {
    return Response.redirect(new URL('/login.html', request.url));
  }

  // No return value = request passes through to the requested page/API normally.
}
