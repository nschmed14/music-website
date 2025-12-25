import React, { useEffect, useRef, useState } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Lottie from 'lottie-react';

const Home = () => {
  const lottieRef = useRef();
  const [animationData, setAnimationData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
  }, []);

  // Strategic preload: Load animation first, then wait for everything to be ready
  useEffect(() => {
    let mounted = true;
    let loadTimeout;

    const loadWithStrategy = async () => {
      try {
        // On mobile: add artificial delay to let browser prepare
        if (isMobile) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        const response = await fetch('/assets/animations/signature-animation.json');
        const data = await response.json();
        
        if (!mounted) return;
        
        // Apply mobile optimizations if needed
        const optimizedData = isMobile ? optimizeForMobile(data) : data;
        setAnimationData(optimizedData);
        
        // Wait for render cycle to complete
        await new Promise(resolve => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (mounted) {
                setIsLoaded(true);
                resolve();
              }
            });
          });
        });

        // Final delay before showing animation (critical for mobile)
        loadTimeout = setTimeout(() => {
          if (mounted) {
            setShowAnimation(true);
          }
        }, isMobile ? 200 : 50);

      } catch (error) {
        console.error('Error loading animation:', error);
        if (mounted) {
          setIsLoaded(true);
          setShowAnimation(true);
        }
      }
    };

    loadWithStrategy();

    return () => {
      mounted = false;
      clearTimeout(loadTimeout);
    };
  }, [isMobile]);

  // Optimize animation settings for mobile
  const optimizeForMobile = (data) => {
    const optimized = JSON.parse(JSON.stringify(data));
    
    // Lower frame rate for mobile (smoother performance)
    optimized.fr = 24;
    
    // Shorten animation slightly if it's very long
    if (optimized.op > 180) {
      optimized.op = Math.min(optimized.op, 180);
    }
    
    return optimized;
  };

  // Play animation when everything is ready
  useEffect(() => {
    if (lottieRef.current && showAnimation && animationData) {
      // Double requestAnimationFrame for optimal timing
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (lottieRef.current) {
            lottieRef.current.play();
          }
        });
      });
    }
  }, [showAnimation, animationData]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      {/* Background Image - Load immediately */}
      <div className="fixed inset-0 -z-10">
        <picture>
          <source srcSet="/assets/home.webp" type="image/webp" />
          <img
            src="/assets/home.jpg"
            alt="Saxophone Background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'right center' }}
            loading="eager"
            fetchpriority="high"
          />
        </picture>
      </div>

      {/* Signature Animation Container */}
      <div 
        className="absolute top-[5%] left-[5%] 
                   w-[90vw] max-w-[1050px] 
                   h-[40vh] max-h-[750px]
                   transition-opacity duration-500"
        style={{
          opacity: showAnimation ? 1 : 0,
          // Force GPU layer
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'opacity'
        }}
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
                progressiveLoad: false,
                // Use canvas on mobile for better performance
                renderer: isMobile ? 'canvas' : 'svg',
                hideOnTransparent: false
              }}
              style={{
                width: '100%',
                height: '100%',
                filter: 'brightness(0) invert(1)',
                // Hardware acceleration
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          )}
        </div>
      </div>
      
      {/* Loading indicator (only shows briefly on mobile) */}
      {!showAnimation && isMobile && (
        <div className="absolute top-[5%] left-[5%] 
                       w-[90vw] max-w-[1050px] 
                       h-[40vh] max-h-[750px]
                       flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;