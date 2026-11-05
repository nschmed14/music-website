/**
 * @file Contact.jsx
 * @description Contact form, submitted to POST /api/contact (worker/index.js on Cloudflare)
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import { useEffect, useState } from 'react';
import PageLayout from './PageLayout';

// Public reCAPTCHA v3 site key (safe to ship; the secret key lives on the server)
const RECAPTCHA_KEY = import.meta.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LflfyAsAAAAAOcGko460R1LoZvpvxveFIlXhvYc';
const EMPTY = { name: '', email: '', message: '', company: '' }; // `company` is a hidden honeypot

function loadRecaptcha() {
  if (!RECAPTCHA_KEY || document.getElementById('recaptcha-v3')) return;
  const script = document.createElement('script');
  script.id = 'recaptcha-v3';
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`;
  script.async = true;
  document.head.appendChild(script);
}

async function getRecaptchaToken() {
  const g = window.grecaptcha;
  if (!RECAPTCHA_KEY || !g?.ready) return undefined;
  try {
    await new Promise((resolve) => g.ready(resolve));
    return await g.execute(RECAPTCHA_KEY, { action: 'contact_submit' });
  } catch {
    return undefined;
  }
}

function validate({ name, email, message }) {
  if (!name.trim()) return 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.';
  if (message.trim().length < 10) return 'Your message must be at least 10 characters.';
  return '';
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  useEffect(loadRecaptcha, []);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
    if (status === 'sent') setStatus('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const problem = validate(form);
    if (problem) {
      setError(problem);
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          company: form.company,
          recaptchaToken: await getRecaptchaToken(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  const sending = status === 'sending';

  return (
    <PageLayout title="Contact" image="contact" position="33% center">
      <div className="page-top mx-auto flex w-full max-w-7xl justify-center px-4 pb-12 sm:px-8 lg:justify-end">
        <div className="w-full max-w-lg space-y-6">
          <section className="panel">
            <h1 className="mb-5 text-4xl font-light md:text-5xl">Contact Me</h1>

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div aria-live="polite">
                {status === 'sent' && (
                  <p className="rounded-lg border border-green-600 bg-green-900/80 p-4">
                    <span className="font-semibold">Message sent!</span> I'll get back to you within 24–48 hours.
                  </p>
                )}
                {error && (
                  <p role="alert" className="rounded-lg border border-red-600 bg-red-900/80 p-4">
                    {error}
                  </p>
                )}
              </div>

              <label className="block">
                <span className="sr-only">Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your Name *"
                  autoComplete="name"
                  maxLength={100}
                  required
                  disabled={sending}
                  className="field"
                />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Your Email *"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  required
                  disabled={sending}
                  className="field"
                />
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Your Message *"
                  rows={6}
                  maxLength={2000}
                  required
                  disabled={sending}
                  className="field min-h-[150px] resize-y"
                />
              </label>

              {/* Honeypot: hidden from people, bots tend to fill it in */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center rounded-lg border border-brown-border bg-brown px-6 py-3 font-medium transition-colors duration-200 hover:bg-brown-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending && (
                  <svg className="-ml-1 mr-3 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {sending ? 'Sending…' : 'Send Message'}
              </button>

              {RECAPTCHA_KEY && (
                <p className="text-center text-xs text-gray-300">
                  Protected by reCAPTCHA. Google{' '}
                  <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">
                    Privacy
                  </a>{' '}
                  and{' '}
                  <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">
                    Terms
                  </a>{' '}
                  apply.
                </p>
              )}
            </form>
          </section>

          <section className="panel">
            <p className="mb-3 text-lg">When reaching out regarding a lesson inquiry, please include:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>The student's name and year in school</li>
              <li>How many years the student has been playing</li>
              <li>Your preferred lesson location</li>
            </ul>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
