/**
 * @file Header.jsx
 * @description Fixed site header: desktop nav with sliding underline, mobile slide-out menu
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Final Logo.png';
import useHomeLinkClick from './useHomeLinkClick';

const NAV_LINKS = [
  { path: '/', name: 'Home' },
  { path: '/bio', name: 'Bio' },
  { path: '/media', name: 'Media' },
  { path: '/contact', name: 'Contact' },
];

const DESKTOP_QUERY = '(min-width: 1024px) and (orientation: landscape)';

function MenuButton({ open, onClick }) {
  const bar = 'absolute left-0 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-out';
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative -ml-2 flex h-11 w-11 items-center justify-center desk:hidden"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
    >
      <span className="relative block h-5 w-6">
        <span className={`${bar} top-0 ${open ? 'translate-y-[9px] rotate-45' : ''}`} />
        <span className={`${bar} top-[9px] ${open ? 'scale-x-0 opacity-0' : ''}`} />
        <span className={`${bar} bottom-0 ${open ? '-translate-y-[9px] -rotate-45' : ''}`} />
      </span>
    </button>
  );
}

function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 top-20 z-40 bg-black/50 desk:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            key="panel"
            id="mobile-menu"
            aria-label="Main"
            className="fixed left-0 top-20 z-50 w-[300px] max-w-[85vw] overflow-hidden rounded-br-xl bg-brown-dark shadow-2xl desk:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.path}
                to={link.path}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-8 py-5 font-ringbearer text-[1.05rem] tracking-wide transition-colors ${
                    i !== NAV_LINKS.length - 1 ? 'border-b border-brown-mid' : ''
                  } ${
                    isActive
                      ? 'border-l-4 border-l-gold bg-gradient-to-r from-gold/10 via-brown-mid to-brown-dark text-white'
                      : 'text-[#E8E0D5] hover:bg-brown-mid/60 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    <svg
                      className={`h-5 w-5 text-gold transition-all duration-300 ${isActive ? 'opacity-100' : '-translate-x-2 opacity-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </NavLink>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const onLogoClick = useHomeLinkClick();

  // Close the menu on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  // Close the menu if the layout switches to desktop (rotate / resize)
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // While open: Escape closes, page behind doesn't scroll
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-20 bg-black/60 backdrop-blur-md desk:h-28">
        <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-4 desk:px-8">
          {/* Left: hamburger (compact) or nav (desktop) */}
          <div className="flex items-center desk:justify-center">
            <MenuButton open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />

            <nav aria-label="Main" className="hidden items-center gap-5 desk:flex xl:gap-7 2xl:gap-10">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `relative whitespace-nowrap px-1 pb-3 pt-1 font-ringbearer text-sm tracking-[0.06em] transition-transform duration-200 hover:scale-110 xl:text-base 2xl:text-xl ${
                      isActive ? 'font-bold' : 'font-light'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-white"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <Link
            to="/"
            onClick={onLogoClick}
            className="flex justify-center transition-opacity hover:opacity-80"
            aria-label="Home"
          >
            <img
              src={logo}
              alt="Noah Schmedding Saxophone"
              className="h-10 w-auto max-w-[calc(100vw-8rem)] object-contain sm:h-12 desk:h-20 2xl:h-24"
            />
          </Link>

          {/* Right: spacer keeps the logo centered */}
          <div />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
