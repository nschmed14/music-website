/**
 * @file Header.js
 * @description Navigation header component with responsive design
 * @copyright 2024 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Final Logo.png';
import '../assets/fonts/fonts.css';

const Header = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const [underline, setUnderline] = useState({
    width: 0,
    left: 0,
    opacity: 0,
    direction: 'right'
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  const prevPath = useRef(null);

  const linkOrder = useMemo(() => ({
    '/': 0,
    '/bio': 1,
    '/media': 2,
    '/contact': 3
  }), []);

  // Function to calculate and set underline position
  const calculateUnderlinePosition = useCallback(() => {
    if (!navRef.current || windowWidth <= 1024 || windowHeight > windowWidth) {
      return;
    }

    const activeLink = navRef.current.querySelector(`a[href="${location.pathname}"]`);
    if (!activeLink) return;

    let direction = 'right';
    if (prevPath.current !== null) {
      const currentOrder = linkOrder[location.pathname] || 0;
      const prevOrder = linkOrder[prevPath.current] || 0;
      direction = currentOrder > prevOrder ? 'right' : 'left';
    }
    prevPath.current = location.pathname;

    const tempWidth = activeLink.scrollWidth;
    const linkWidth = activeLink.offsetWidth;
    const linkLeft = activeLink.offsetLeft;
    
    // Calculate position relative to the nav container
    const textCenterX = linkLeft + (linkWidth / 2);
    const underlineLeft = textCenterX - (tempWidth / 2);

    setUnderline({
      width: tempWidth,
      left: underlineLeft,
      opacity: 1,
      direction
    });
  }, [location.pathname, windowWidth, windowHeight, linkOrder]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      if (window.innerWidth > 1024 && window.innerHeight <= window.innerWidth) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate underline position when route changes
  useEffect(() => {
    // Reset opacity to trigger animation
    setUnderline(prev => ({ ...prev, opacity: 0 }));
    
    // Small delay to ensure DOM is updated, then calculate position
    const timer = setTimeout(() => {
      calculateUnderlinePosition();
    }, 10);
    
    return () => clearTimeout(timer);
  }, [location.pathname, calculateUnderlinePosition]);

  // Calculate underline position when window dimensions change
  useEffect(() => {
    // Reset opacity to trigger animation
    setUnderline(prev => ({ ...prev, opacity: 0 }));
    
    // Small delay to ensure layout is stable, then calculate position
    const timer = setTimeout(() => {
      calculateUnderlinePosition();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [windowWidth, windowHeight, calculateUnderlinePosition]);

  // Initial calculation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateUnderlinePosition();
    }, 50);
    
    return () => clearTimeout(timer);
  }, [calculateUnderlinePosition]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/bio', name: 'Bio' },
    { path: '/media', name: 'Media' },
    { path: '/contact', name: 'Contact' }
  ];

  const isPortraitMode = windowHeight >= windowWidth;
  const isMobileLayout = windowWidth <= 1024 || isPortraitMode;

  const getResponsiveValues = () => {
    if (windowWidth > 1920) {
      return {
        fontSize: 'text-2xl',
        gap: '2.5rem',
        paddingX: 'px-3',
        paddingBottom: 'pb-6',
        letterSpacing: '0.1em',
        logoSize: 'h-24 max-h-24',
        navMargin: 'ml-4',
        navPaddingTop: 'pt-10',
        maxWidth: 'max-w-none'
      };
    } else if (windowWidth > 1600) {
      return {
        fontSize: 'text-xl',
        gap: '2rem',
        paddingX: 'px-2',
        paddingBottom: 'pb-5',
        letterSpacing: '0.08em',
        logoSize: 'h-22 max-h-22',
        navMargin: 'ml-3',
        navPaddingTop: 'pt-9',
        maxWidth: 'max-w-none'
      };
    } else if (windowWidth > 1366) {
      return {
        fontSize: 'text-lg',
        gap: '1.75rem',
        paddingX: 'px-1',
        paddingBottom: 'pb-4',
        letterSpacing: '0.06em',
        logoSize: 'h-20 max-h-20',
        navMargin: 'ml-2',
        navPaddingTop: 'pt-8',
        maxWidth: 'max-w-none'
      };
    } else if (windowWidth > 1152) {
      return {
        fontSize: 'text-base',
        gap: '1.5rem',
        paddingX: 'px-1',
        paddingBottom: 'pb-3',
        letterSpacing: '0.05em',
        logoSize: 'h-18 max-h-18',
        navMargin: 'ml-1',
        navPaddingTop: 'pt-7',
        maxWidth: 'max-w-xs'
      };
    } else if (windowWidth > 1024) {
      return {
        fontSize: 'text-sm',
        gap: '1.25rem',
        paddingX: 'px-1',
        paddingBottom: 'pb-2',
        letterSpacing: '0.04em',
        logoSize: 'h-16 max-h-16',
        navMargin: 'ml-0',
        navPaddingTop: 'pt-6',
        maxWidth: 'max-w-xs'
      };
    } else {
      // Mobile layout with dynamic sizing
      if (windowWidth >= 768) {
        return {
          fontSize: 'text-base',
          gap: '2rem',
          paddingX: 'px-2',
          paddingBottom: 'pb-4',
          letterSpacing: '0.08em',
          logoSize: 'h-12 max-h-12',
          navMargin: 'ml-0',
          navPaddingTop: 'pt-0',
          maxWidth: 'max-w-none',
          logoHeight: '48px'
        };
      } else if (windowWidth >= 480) {
        return {
          fontSize: 'text-base',
          gap: '2rem',
          paddingX: 'px-2',
          paddingBottom: 'pb-4',
          letterSpacing: '0.08em',
          logoSize: 'h-10 max-h-10',
          navMargin: 'ml-0',
          navPaddingTop: 'pt-0',
          maxWidth: 'max-w-none',
          logoHeight: '40px'
        };
      } else {
        // For screens smaller than 480px, maintain the size from 480+ breakpoint
        return {
          fontSize: 'text-base',
          gap: '2rem',
          paddingX: 'px-2',
          paddingBottom: 'pb-4',
          letterSpacing: '0.08em',
          logoSize: 'h-10 max-h-10', // Same as 480+ breakpoint
          navMargin: 'ml-0',
          navPaddingTop: 'pt-0',
          maxWidth: 'max-w-none',
          logoHeight: '40px', // Same as 480+ breakpoint
          isExtraSmallScreen: true // Flag for extra small screens
        };
      }
    }
  };

  const responsiveValues = getResponsiveValues();

  const headerClasses = `fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 backdrop-blur-md transition-all duration-300 ${
    !isMobileLayout ? 'h-28' : 'h-20'
  }`;

  return (
    <header className={headerClasses}>
      <div className="h-full flex items-center relative">
        {/* Desktop Navigation - LEFT SIDE */}
        {!isMobileLayout && (
          <div className={`w-1/3 flex justify-center items-start relative ${responsiveValues.navPaddingTop} ${responsiveValues.navMargin}`}>
            <nav 
              ref={navRef} 
              className={`flex relative ${responsiveValues.maxWidth}`} 
              style={{ gap: responsiveValues.gap }}
            >
              <motion.div
                className="absolute bottom-0 h-1 bg-white rounded-full"
                initial={{
                  width: 0,
                  left: underline.left,
                  opacity: 0
                }}
                animate={{
                  width: underline.width,
                  left: underline.left,
                  opacity: underline.opacity
                }}
                transition={{
                  width: {
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                    from: 0,
                    to: underline.width,
                    velocity: underline.direction === 'right' ? 1 : -1
                  },
                  left: {
                    type: 'spring',
                    damping: 20,
                    stiffness: 300
                  },
                  opacity: { duration: 0.2 }
                }}
                key={`${location.pathname}-${underline.direction}-${windowWidth}`}
              />
              
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path} 
                  className={({ isActive }) => 
                    `relative hover:scale-110 transition-all duration-200 ${responsiveValues.fontSize} ${responsiveValues.paddingBottom} ${responsiveValues.paddingX} font-light tracking-wider whitespace-nowrap text-white
                    ${isActive ? 'font-bold' : ''}`
                  }
                  style={{ 
                    fontFamily: "'Ringbearer', sans-serif",
                    letterSpacing: responsiveValues.letterSpacing
                  }}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Mobile Menu Button - appears in mobile layout */}
        {isMobileLayout && (
          <div className="absolute left-4 z-50 flex-shrink-0" style={{ 
            width: responsiveValues.isExtraSmallScreen ? '60px' : '80px' 
          }}>
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="relative w-6 h-5">
                  {/* Top line */}
                  <motion.span 
                    className="absolute top-0 left-0 h-0.5 bg-white w-full rounded-full"
                    animate={isMobileMenuOpen ? { 
                      rotate: 45, 
                      y: 9,
                      width: '100%'
                    } : { 
                      rotate: 0, 
                      y: 0,
                      width: '100%'
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25,
                      duration: 0.3 
                    }}
                  />
                  {/* Middle line */}
                  <motion.span 
                    className="absolute top-1/2 left-0 h-0.5 bg-white w-full rounded-full -translate-y-1/2"
                    animate={isMobileMenuOpen ? { 
                      opacity: 0,
                      width: 0
                    } : { 
                      opacity: 1,
                      width: '100%'
                    }}
                    transition={{ 
                      duration: 0.2 
                    }}
                  />
                  {/* Bottom line */}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-white w-full rounded-full"
                    animate={isMobileMenuOpen ? { 
                      rotate: -45, 
                      y: -9,
                      width: '100%'
                    } : { 
                      rotate: 0, 
                      y: 0,
                      width: '100%'
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25,
                      duration: 0.3 
                    }}
                  />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Centered Logo - MIDDLE with improved constraints */}
        <div className={`flex items-center ${
          !isMobileLayout 
            ? 'w-1/3 justify-center pl-0 pr-0'
            : 'w-full justify-center'
        }`}>
          <div className="relative w-full max-w-full flex justify-center">
            <NavLink 
              to="/" 
              className="flex items-center justify-center"
              onClick={() => {
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              style={{
                maxWidth: isMobileLayout 
                  ? responsiveValues.isExtraSmallScreen 
                    ? `calc(100vw - 120px)` // 60px each side for extra small screens
                    : `calc(100vw - 160px)` // 80px each side for normal mobile
                  : '33vw' // Max 1/3 of viewport width on desktop
              }}
            >
              <img 
                src={logo} 
                alt="Noah Schmedding Saxophone Logo - noahsax.com" 
                className={`transition-all duration-100 hover:opacity-80 object-contain mx-auto ${
                  responsiveValues.logoSize
                }`}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: isMobileLayout 
                    ? responsiveValues.logoHeight || 
                      (windowWidth >= 768 ? '48px' 
                        : windowWidth >= 480 ? '40px' 
                        : '40px') // Always 40px for smallest screens
                    : '96px'
                }}
              />
            </NavLink>
          </div>
        </div>

        {/* Right side spacing for mobile layout */}
        {isMobileLayout && (
          <div className="absolute right-4 flex-shrink-0" style={{ 
            width: responsiveValues.isExtraSmallScreen ? '60px' : '80px' 
          }}></div>
        )}

        {/* Empty div for desktop layout balance - RIGHT SIDE */}
        {!isMobileLayout && <div className="w-1/3"></div>}

        {/* Mobile Menu Overlay - FIXED POSITIONING */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay background */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={toggleMobileMenu}
              />
              
              {/* Menu content - positioned below the existing header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.3 
                }}
                className="fixed top-20 left-0 right-0 z-50 bg-transparent flex justify-center items-start px-4 py-8"
                style={{ height: 'calc(100vh - 80px)' }}
              >
                {/* Single container box for all navigation items - Less transparent with black border */}
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }}
                  className="bg-[#5C4033]/90 backdrop-blur-md border-2 border-black rounded-2xl shadow-2xl p-6 w-full max-w-md"
                >
                  <motion.nav 
                    className="flex flex-col space-y-4"
                  >
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.1 
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full"
                      >
                        <NavLink
                          to={link.path}
                          onClick={toggleMobileMenu}
                          className={({ isActive }) => 
                            `block w-full text-center transition-all duration-300 py-5 px-6 rounded-xl text-white font-medium
                            ${isActive 
                              ? 'bg-[#8B5A5A]/80 border-2 border-[#A67C7C] shadow-lg' 
                              : 'bg-[#4A2C2A]/50 border border-black/50 hover:bg-[#6B4F4F]/70 hover:border-[#8B5A5A] hover:shadow-lg'
                            }`
                          }
                          style={{ 
                            fontFamily: "'Ringbearer', sans-serif",
                            letterSpacing: '0.1em',
                            fontSize: '1.1rem'
                          }}
                        >
                          {link.name}
                        </NavLink>
                      </motion.div>
                    ))}
                  </motion.nav>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;