import React, { useEffect, useRef } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/signature-animation.json';

const Home = () => {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      {/* Background Image with WebP support - ONLY CHANGE */}
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

      <div className="absolute top-[5%] left-[5%] 
                      w-[1050px] h-[750px]
                      max-w-[calc(100vw-10%)] 
                      max-h-[calc(100vh-10%)]
                      transition-all duration-300">
        <div className="relative w-full h-full">
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={true}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid meet'
            }}
            style={{
              filter: 'brightness(0) invert(1) sepia(1) saturate(0)',
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;