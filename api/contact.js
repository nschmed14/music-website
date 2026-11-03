// Netlify function: sends contact form submissions through EmailJS.
//
// Environment variables (Netlify → Site settings → Environment variables):
//   REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID,
//   REACT_APP_EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY   (required)
//   RECAPTCHA_SECRET_KEY                                (optional; enables reCAPTCHA v3 verification)
const emailjs = require('@emailjs/nodejs');

const TO_EMAIL = 'noahschmedding@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_RECAPTCHA_SCORE = 0.5;

const reply = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const clean = (value, max) =>
  typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim().slice(0, max) : '';

async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // verification not configured
  if (!token) return false;

  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.set('remoteip', ip);
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: params });
  const data = await res.json();
  return data.success && data.action === 'contact_submit' && data.score >= MIN_RECAPTCHA_SCORE;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed' });

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return reply(400, { error: 'Invalid request.' });
  }

  // Honeypot filled in → almost certainly a bot. Pretend it worked.
  if (body.company) return reply(200, { success: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const message = clean(body.message, 2000);

  if (!name || !email || !message) return reply(400, { error: 'Please fill in all fields.' });
  if (!EMAIL_RE.test(email)) return reply(400, { error: 'Please enter a valid email address.' });
  if (message.length < 10) return reply(400, { error: 'Your message must be at least 10 characters.' });

  try {
    const ip = event.headers?.['x-nf-client-connection-ip'];
    if (!(await verifyRecaptcha(body.recaptchaToken, ip))) {
      return reply(400, { error: 'Spam check failed. Please refresh the page and try again.' });
    }

    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      { from_name: name, from_email: email, message, to_email: TO_EMAIL, reply_to: email },
      { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY, privateKey: process.env.EMAILJS_PRIVATE_KEY }
    );

    return reply(200, { success: true });
  } catch (error) {
    console.error('Contact form error:', error?.text || error?.message || error);
    return reply(500, { error: 'Unable to send your message right now. Please try again later.' });
  }
};
