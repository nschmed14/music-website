/**
 * @file Footer.jsx
 * @description Site footer: social links, signature credit, copyright
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import { Link, useLocation } from 'react-router-dom';

const SOCIAL_LINKS = [
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@nschmed14',
    icon: (
      <>
        <defs>
          <linearGradient id="tiktok-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25F4EE" />
            <stop offset="100%" stopColor="#FE2C55" />
          </linearGradient>
        </defs>
        <path
          fill="url(#tiktok-gradient)"
          d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V7.159a4.831 4.831 0 0 1-1.003-.079 4.785 4.785 0 0 1-1.246-.394z"
        />
      </>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@NoahSchmedding',
    icon: (
      <>
        <path
          fill="#FF0000"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418z"
        />
        <path fill="#FFFFFF" d="M9.546 8.803v6.394l5.454-3.197z" />
      </>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/noah_schmedding',
    icon: (
      <>
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#833AB4" />
            <stop offset="50%" stopColor="#FD1D1D" />
            <stop offset="100%" stopColor="#F77737" />
          </linearGradient>
        </defs>
        <path
          fill="url(#instagram-gradient)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
        />
        <path
          fill="#FFFFFF"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7.982a4.018 4.018 0 1 0 0 8.036 4.018 4.018 0 0 0 0-8.036zm0 6.627a2.61 2.61 0 1 1 0-5.218 2.61 2.61 0 0 1 0 5.218z"
        />
        <circle cx="17.25" cy="6.75" r="1" fill="#FFFFFF" />
      </>
    ),
  },
];

export default function Footer() {
  const { pathname } = useLocation();

  // On the home page the link goes nowhere new, so reload instead to replay the signature animation
  const onSignatureClick = (e) => {
    if (pathname !== '/') return;
    e.preventDefault();
    window.scrollTo(0, 0); // so the reload starts at the top
    window.location.reload();
  };

  return (
    <footer className="w-full border-t border-gray-800 bg-black px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-col items-center gap-5 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <ul className="flex items-center gap-6 md:justify-self-start">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="block transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <Link
          to="/"
          onClick={onSignatureClick}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <span className="font-ringbearer text-sm font-light tracking-wider text-gray-400">Website by</span>
          <img src="/assets/signature.png" alt="Noah Schmedding" className="h-12 w-auto" width="96" height="48" />
        </Link>

        <p className="text-center text-sm text-gray-500 md:justify-self-end md:text-right">
          © {new Date().getFullYear()} Noah Schmedding. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
