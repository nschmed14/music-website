/**
 * @file Footer.js
 * @description Website footer component with social links and signature
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React from 'react';
import { motion } from 'framer-motion';
import signatureTB from '../assets/Signature TB (Inverted).png';

const Footer = () => {
  const socialLinks = {
    tiktok: 'https://www.tiktok.com/@nschmed14',
    youtube: 'https://www.youtube.com/@NoahSchmedding',
    instagram: 'https://www.instagram.com/noah_schmedding',
  };

  return (
    // Main footer with fade-in animation
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-black text-white py-6 px-4 border-t border-gray-800 w-full"
    >
      <div className="w-full">
        // Desktop layout with three sections
        <div className="hidden md:flex items-center justify-between w-full px-4">
          // Left side - Social media icons
          <div className="flex items-center space-x-6">
            // TikTok social link
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300"
              aria-label="TikTok Profile"
            >
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V7.159a4.831 4.831 0 0 1-1.003-.079 4.785 4.785 0 0 1-1.246-.394z"
                  fill="url(#tiktok-gradient)"
                  className="group-hover:opacity-90 transition-opacity duration-300"
                />
                <defs>
                  <linearGradient id="tiktok-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#25F4EE" />
                    <stop offset="100%" stopColor="#FE2C55" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.a>
            
            // YouTube social link
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300"
              aria-label="YouTube Channel"
            >
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418z" 
                  fill="#FF0000"
                  className="group-hover:fill-[#FF3333] transition-colors duration-300"
                />
                <path 
                  d="M9.546 8.803v6.394l5.454-3.197z" 
                  fill="#FFFFFF"
                />
              </svg>
            </motion.a>
            
            // Instagram social link
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300"
              aria-label="Instagram Profile"
            >
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#FD1D1D" />
                    <stop offset="100%" stopColor="#F77737" />
                  </linearGradient>
                </defs>
                
                <path 
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" 
                  fill="url(#instagram-gradient)"
                  className="group-hover:opacity-90 transition-opacity duration-300"
                />
                
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M12 7.982a4.018 4.018 0 1 0 0 8.036 4.018 4.018 0 0 0 0-8.036zm0 6.627a2.61 2.61 0 1 1 0-5.218 2.61 2.61 0 0 1 0 5.218z" 
                  fill="#FFFFFF"
                />
                
                <circle cx="17.25" cy="6.75" r="1" fill="#FFFFFF" />
              </svg>
            </motion.a>
          </div>
          
          // Center - Website by signature
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm font-light tracking-wider" style={{ fontFamily: "'Ringbearer', sans-serif" }}>
                Website by
              </span>
              <motion.a
                href="https://noahsax.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
                aria-label="Visit Noah Schmedding's website"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={signatureTB}
                  alt="Noah Schmedding Signature - Transparent Background"
                  className="h-12 w-auto object-contain opacity-100 hover:opacity-90 transition-opacity duration-300"
                />
              </motion.a>
            </div>
          </div>
          
          // Right side - Copyright text
          <div>
            <p className="text-gray-500 text-sm whitespace-nowrap">
              © {new Date().getFullYear()} Noah Schmedding. All rights reserved.
            </p>
          </div>
        </div>

        // Mobile layout stacked vertically
        <div className="md:hidden flex flex-col items-center gap-6">
          // Social media icons row
          <div className="flex items-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300"
              aria-label="TikTok Profile"
            >
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V7.159a4.831 4.831 0 0 1-1.003-.079 4.785 4.785 0 0 1-1.246-.394z"
                  fill="url(#tiktok-gradient-mobile)"
                />
                <defs>
                  <linearGradient id="tiktok-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#25F4EE" />
                    <stop offset="100%" stopColor="#FE2C55" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300"
              aria-label="YouTube Channel"
            >
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418z" 
                  fill="#FF0000"
                />
                <path 
                  d="M9.546 8.803v6.394l5.454-3.197z" 
                  fill="#FFFFFF"
                />
              </svg>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300"
              aria-label="Instagram Profile"
            >
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="instagram-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#FD1D1D" />
                    <stop offset="100%" stopColor="#F77737" />
                  </linearGradient>
                </defs>
                
                <path 
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" 
                  fill="url(#instagram-gradient-mobile)"
                />
                
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M12 7.982a4.018 4.018 0 1 0 0 8.036 4.018 4.018 0 0 0 0-8.036zm0 6.627a2.61 2.61 0 1 1 0-5.218 2.61 2.61 0 0 1 0 5.218z" 
                  fill="#FFFFFF"
                />
                
                <circle cx="17.25" cy="6.75" r="1" fill="#FFFFFF" />
              </svg>
            </motion.a>
          </div>
          
          // Signature in mobile view
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-light tracking-wider" style={{ fontFamily: "'Ringbearer', sans-serif" }}>
              Website by
            </span>
            <motion.a
              href="https://noahsax.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
              aria-label="Visit Noah Schmedding's website"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={signatureTB}
                alt="Noah Schmedding Signature - Transparent Background"
                className="h-12 w-auto object-contain opacity-100 hover:opacity-90 transition-opacity duration-300"
              />
            </motion.a>
          </div>
          
          // Copyright in mobile view
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Noah Schmedding. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;