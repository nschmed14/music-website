/**
 * @file LoadingSpinner.js
 * @description Animated loading spinner component
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  // Full-screen loading container
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex items-center justify-center bg-black"
  >
    <div className="relative">
      <div className="w-16 h-16 border-4 border-white/30 border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/60 border-t-transparent rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  </motion.div>
);

export default LoadingSpinner;