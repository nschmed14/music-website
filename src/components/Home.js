import React, { useEffect, useRef, useState } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Lottie from 'lottie-react';

const Home = () => {
  const lottieRef = useRef();
  const [animationData, setAnimationData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load different animation based on device
  useEffect(() => {
    const animationPath = isMobile 
      ? '/assets/animations/signature-animation-mobile.json'
      : '/assets/animations/signature-animation.json';
    
    fetch(animationPath)
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        setHasLoaded(true);
      })
      .catch(error => {
        console.error('Error loading animation:', error);
        // Fallback to desktop version
        fetch('/assets/animations/signature-animation.json')
          .then(response => response.json())
          .then(data => {
            setAnimationData(data);
            setHasLoaded(true);
          });
      });
  }, [isMobile]);

  // Play animation once loaded
  useEffect(() => {
    if (lottieRef.current && hasLoaded) {
      lottieRef.current.play();
    }
  }, [hasLoaded]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <picture>
          <source srcSet="/assets/home.webp" type="image/webp" />
          <img
            src="/assets/home.jpg"
            alt="Saxophone Background"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'right center'
            }}
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
          />
        </picture>
      </div>

      {/* Animation Container with performance optimizations */}
      <div className={`absolute top-[5%] left-[5%] 
                      ${isMobile ? 'w-[600px] h-[400px]' : 'w-[1050px] h-[750px]'}
                      max-w-[calc(100vw-10%)] 
                      max-h-[calc(100vh-10%)]
                      transition-all duration-300
                      will-change-transform`}>
        <div className="relative w-full h-full">
          {animationData && (
            <div style={{
              // Use CSS for the filter on desktop only
              filter: isMobile ? 'none' : 'brightness(0) invert(1) sepia(1) saturate(0)',
              // Render the signature in white for mobile (more efficient)
              backgroundColor: isMobile ? 'transparent' : 'transparent'
            }}>
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={true}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  progressiveLoad: true, // Progressive loading
                  hideOnTransparent: true // Skip transparent areas
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  // Force GPU acceleration
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
                onDOMLoaded={() => {
                  // Optional: Add a small delay for mobile
                  if (isMobile) {
                    setTimeout(() => {
                      if (lottieRef.current) {
                        lottieRef.current.play();
                      }
                    }, 100);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;