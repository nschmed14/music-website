/**
 * @file App.jsx
 * @description Routing, persistent header, and page transitions
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import PageLayout from './components/PageLayout';
import Home from './components/Home';
import Bio from './components/Bio';
import Media from './components/Media';
import Contact from './components/Contact';

const NotFound = () => (
  <PageLayout title="Page Not Found">
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="mb-4 text-6xl">404</h1>
      <p className="mb-8 text-xl text-gray-300">Page not found</p>
      <Link
        to="/"
        className="rounded-lg border border-white/30 px-6 py-3 transition-colors hover:bg-white/10"
      >
        Return Home
      </Link>
    </div>
  </PageLayout>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <AnimatedRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
