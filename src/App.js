/**
 * @file App.js
 * @description Main application component with routing and page transitions
 * @copyright 2024 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home'));
const Bio = lazy(() => import('./components/Bio'));
const Media = lazy(() => import('./components/Media'));
const Contact = lazy(() => import('./components/Contact'));

// Main layout wrapper
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      {children}
    </main>
  </div>
);

// 404 Component with proper navigation
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-2xl text-gray-300 mb-8">Page not found</p>
      <button
        onClick={() => window.location.href = '/'}
        className="bg-black border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Return to homepage"
      >
        Return Home
      </button>
    </div>
  );
};

// Smooth fade transition that doesn't interfere with backgrounds
const FadeTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.25,
        ease: "easeInOut"
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Main App component
function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      {/* Simple black background behind everything to prevent white flash */}
      <div className="fixed inset-0 bg-black -z-50"></div>
      
      {/* Main content area */}
      <div className="relative min-h-screen">
        <Suspense fallback={
          <div className="fixed inset-0 bg-black z-50">
            <LoadingSpinner />
          </div>
        }>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <MainLayout>
                  <FadeTransition>
                    <Home />
                  </FadeTransition>
                </MainLayout>
              } />
              <Route path="/bio" element={
                <MainLayout>
                  <FadeTransition>
                    <Bio />
                  </FadeTransition>
                </MainLayout>
              } />
              <Route path="/media" element={
                <MainLayout>
                  <FadeTransition>
                    <Media />
                  </FadeTransition>
                </MainLayout>
              } />
              <Route path="/contact" element={
                <MainLayout>
                  <FadeTransition>
                    <Contact />
                  </FadeTransition>
                </MainLayout>
              } />
              {/* 404 Route - Must be last */}
              <Route path="*" element={
                <FadeTransition>
                  <NotFound />
                </FadeTransition>
              } />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

// App wrapper with Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;