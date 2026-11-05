/**
 * Cloudflare Worker for noahsax.com
 *
 * Serves the built site from ./build (configured in wrangler.jsonc) and handles
 * the contact form at POST /api/contact, sending the message through EmailJS.
 *
 * Secrets (Cloudflare dashboard → Worker → Settings → Variables and Secrets):
 *   EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY  (required)
 *   RECAPTCHA_SECRET_KEY                                                              (optional)
 */

const TO_EMAIL = 'noahschmedding@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_RECAPTCHA_SCORE = 0.5;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const clean = (value, max) =>
  typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim().slice(0, max) : '';

/**
 * Returns null when the check passes, otherwise a short reason code
 * (logged, and included in the error response to make problems diagnosable).
 */
async function recaptchaProblem(env, token, ip) {
  if (!env.RECAPTCHA_SECRET_KEY) return null; // verification not configured
  if (!token) return 'missing-token';

  const params = new URLSearchParams({ secret: env.RECAPTCHA_SECRET_KEY, response: token });
  if (ip) params.set('remoteip', ip);
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: params });
  const data = await res.json();
  console.log('reCAPTCHA result:', JSON.stringify({
    success: data.success,
    score: data.score,
    action: data.action,
    hostname: data.hostname,
    errors: data['error-codes'],
  }));

  if (!data.success) return (data['error-codes'] || ['failed']).join(',');
  if (data.action !== 'contact_submit') return 'wrong-action';
  if (typeof data.score === 'number' && data.score < MIN_RECAPTCHA_SCORE) return 'low-score';
  return null;
}

async function sendEmail(env, params) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: env.EMAILJS_SERVICE_ID,
      template_id: env.EMAILJS_TEMPLATE_ID,
      user_id: env.EMAILJS_PUBLIC_KEY,
      accessToken: env.EMAILJS_PRIVATE_KEY,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}

async function handleContact(request, env) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid request.' });
  }

  // Honeypot filled in → almost certainly a bot. Pretend it worked.
  if (body.company) return json(200, { success: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const message = clean(body.message, 2000);

  if (!name || !email || !message) return json(400, { error: 'Please fill in all fields.' });
  if (!EMAIL_RE.test(email)) return json(400, { error: 'Please enter a valid email address.' });
  if (message.length < 10) return json(400, { error: 'Your message must be at least 10 characters.' });

  try {
    const ip = request.headers.get('CF-Connecting-IP');
    const problem = await recaptchaProblem(env, body.recaptchaToken, ip);
    if (problem) {
      return json(400, { error: 'Spam check failed. Please refresh the page and try again.', reason: problem });
    }

    await sendEmail(env, { from_name: name, from_email: email, message, to_email: TO_EMAIL, reply_to: email });
    return json(200, { success: true });
  } catch (error) {
    console.error('Contact form error:', error.message);
    return json(500, { error: 'Unable to send your message right now. Please try again later.' });
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') return handleContact(request, env);
    if (pathname.startsWith('/api/')) return json(404, { error: 'Not found' });
    return env.ASSETS.fetch(request);
  },
};
