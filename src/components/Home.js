/**
 * @file Home.js
 * @description Home page component
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React, { useEffect, useRef, useState } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Lottie from 'lottie-react';

const Home = () => {
  const lottieRef = useRef();
  const [animationData, setAnimationData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if user is on mobile device
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Load and play signature animation file
  useEffect(() => {
    let mounted = true;
    
    const loadAnimation = async () => {
      try {
        if (isMobile) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const response = await fetch('/assets/animations/signature-animation.json');
        const data = await response.json();
        
        if (mounted) {
          setAnimationData(data);
          
          setTimeout(() => {
            if (lottieRef.current) {
              lottieRef.current.play();
            }
          }, 50);
        }
      } catch (error) {
        console.error('Error loading animation:', error);
      }
    };
    
    loadAnimation();
    
    return () => {
      mounted = false;
    };
  }, [isMobile]);

  return (
    // Main page container
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      // Full-screen background image
      <div className="fixed inset-0 -z-10">
        <picture>
          <source srcSet="/assets/home.webp" type="image/webp" />
          <img
            src="/assets/home.jpg"
            alt="Saxophone Background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'right center' }}
            loading="eager"
          />
        </picture>
      </div>

      // Animated signature overlay
      <div 
        className="absolute top-[5%] left-[5%] 
                   w-[90vw] max-w-[1050px] 
                   h-[40vh] max-h-[750px]"
      >
        <div className="relative w-full h-full">
          {animationData && (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid meet',
                progressiveLoad: false
              }}
              style={{
                width: '100%',
                height: '100%',
                filter: 'brightness(0) invert(1)',
                transform: 'translateZ(0)'
              }}
            />
          )}
        </div>
      </div>
      
      // Footer at bottom of page
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;