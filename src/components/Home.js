import React, { useEffect, useRef, useState } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Lottie from 'lottie-react';

const Home = () => {
  const lottieRef = useRef();
  const [animationData, setAnimationData] = useState(null);
  const containerRef = useRef();

  // Load animation once
  useEffect(() => {
    fetch('/assets/animations/signature-animation.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  // Play animation when loaded
  useEffect(() => {
    if (lottieRef.current && animationData) {
      // Small delay to ensure rendering
      setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.play();
        }
      }, 100);
    }
  }, [animationData]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      {/* Background Image - SIMPLIFIED */}
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

      {/* Signature Animation - SIMPLIFIED */}
      <div 
        ref={containerRef}
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
                // Force white signature on all devices
                filter: 'brightness(0) invert(1)'
              }}
            />
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