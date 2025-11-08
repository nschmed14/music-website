import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
  const resizeTimeout = useRef(null);
  
  const prevPath = useRef(null);
  const linkOrder = {
    '/': 0,
    '/bio': 1,
    '/media': 2,
    '/contact': 3
  };

  // Real-time resize handler with performance optimization
  useEffect(() => {
    const handleResize = () => {
      // Cancel any pending updates
      if (resizeTimeout.current) {
        cancelAnimationFrame(resizeTimeout.current);
      }
      
      // Use requestAnimationFrame for smooth updates during resize
      resizeTimeout.current = requestAnimationFrame(() => {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth);
        if (newWidth > 1024) {
          setIsMobileMenuOpen(false);
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        cancelAnimationFrame(resizeTimeout.current);
      }
    };
  }, []);

  // Update underline position and width
  useEffect(() => {
    if (navRef.current && windowWidth > 1024) {
      const activeLink = navRef.current.querySelector(`a[href="${location.pathname}"]`);
      if (activeLink) {
        let direction = 'right';
        if (prevPath.current !== null) {
          const currentOrder = linkOrder[location.pathname] || 0;
          const prevOrder = linkOrder[prevPath.current] || 0;
          direction = currentOrder > prevOrder ? 'right' : 'left';
        }
        prevPath.current = location.pathname;

        // Use getComputedStyle for better performance than creating temp span
        const linkStyle = window.getComputedStyle(activeLink);
        const tempWidth = activeLink.scrollWidth; // More performant measurement
        
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        const textCenterX = linkRect.left + (linkRect.width / 2) - navRect.left;
        const underlineLeft = textCenterX - (tempWidth / 2);

        setUnderline({
          width: tempWidth,
          left: underlineLeft,
          opacity: 1,
          direction
        });
      }
    }
  }, [location.pathname, windowWidth]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/bio', name: 'Bio' },
    { path: '/media', name: 'Media' },
    { path: '/contact', name: 'Contact' }
  ];

  // Optimized resize classes
  const headerClasses = `fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 backdrop-blur-md transition-all duration-100 ${
    windowWidth > 1024 ? 'h-28' : 'h-20'
  }`;

  return (
    <header className={headerClasses}>
      <div className="h-full flex items-center relative">
        {/* Mobile Menu Button - appears below 1024px */}
        {windowWidth <= 1024 && (
          <div className="absolute left-4 z-50">
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-8 flex flex-col space-y-2">
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: 45, y: 10 } : {}}
                  className="h-0.5 bg-white w-full transition-all"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="h-0.5 bg-white w-full transition-all"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: -45, y: -10 } : {}}
                  className="h-0.5 bg-white w-full transition-all"
                />
              </div>
            </button>
          </div>
        )}

        {/* Desktop Navigation - appears above 1024px */}
        {windowWidth > 1024 && (
          <div className="w-1/3 flex justify-center relative">
            <nav ref={navRef} className="flex space-x-8 relative">
              <motion.div
                className="absolute bottom-0 h-1 bg-[#2C423F] rounded-full"
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
                key={`${location.pathname}-${underline.direction}`}
              />
              
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path} 
                  className={({ isActive }) => 
                    `relative text-white hover:text-[#2C423F] transition-colors duration-200 font-Kanit text-lg pb-3 px-3 font-light
                    ${isActive ? 'text-[#2C423F]' : ''}`
                  }
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Centered Name - responsive sizing */}
        <div className={`flex justify-center ${
          windowWidth > 1024 ? 'w-1/3' : 'w-full'
        }`}>
          <h1 className={`font-display text-white whitespace-nowrap transition-all duration-100 ${
            windowWidth > 1024 ? 'text-4xl' : 'text-2xl'
          }`}>
            Noah Schmedding
          </h1>
        </div>

        {/* Empty div for desktop layout balance */}
        {windowWidth > 1024 && <div className="w-1/3"></div>}

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-95 z-40 pt-20"
              onClick={toggleMobileMenu}
            >
              <motion.nav 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex flex-col items-center space-y-6 mt-8"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={toggleMobileMenu}
                      className={({ isActive }) => 
                        `text-xl text-white hover:text-[#2C423F] transition-colors font-Kanit py-2 px-6
                        ${isActive ? 'text-[#2C423F]' : ''}`
                      }
                      style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;