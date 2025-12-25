import React, { useEffect, useRef, useState, useCallback } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Lottie from 'lottie-react';

const Home = () => {
  const lottieRef = useRef();
  const [animationData, setAnimationData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const animationContainerRef = useRef();

  // Throttled mobile detection
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Simplified mobile animation - create it programmatically
  const getMobileAnimationData = useCallback(() => {
    // Create a drastically simplified version of the animation
    return {
      v: "5.9.0",
      fr: 30, // Reduced framerate
      ip: 0,
      op: 90, // Much shorter duration (3 seconds instead of ~30)
      w: 600, // Smaller canvas
      h: 300,
      nm: "Signature Mobile",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4, // Shape layer instead of image with mask
          nm: "Signature Path",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [300, 150, 0], ix: 2 },
            a: { a: 0, k: [300, 150, 0], ix: 1 },
            s: { a: 0, k: [100, 100, 100], ix: 6 }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "sh",
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0.667, y: 1 },
                        o: { x: 0.333, y: 0 },
                        t: 0,
                        s: [
                          { i: [[0,0],[0,0]], o: [[0,0],[0,0]], v: [[-200,0],[-200,0]] }
                        ]
                      },
                      {
                        t: 30,
                        s: [
                          { i: [[0,0],[0,0]], o: [[0,0],[0,0]], v: [[-200,0],[200,0]] }
                        ]
                      }
                    ]
                  }
                },
                {
                  ty: "st",
                  c: { a: 0, k: [1,1,1,1] },
                  o: { a: 0, k: 100 },
                  w: { a: 0, k: 3 },
                  lc: 2,
                  lj: 2,
                  ml: 4,
                  nm: "Stroke 1"
                },
                {
                  ty: "tr",
                  a: { a: 0, k: [0,0] },
                  o: { a: 0, k: 100 },
                  p: { a: 0, k: [0,0] },
                  r: { a: 0, k: 0 },
                  s: { a: 0, k: [100,100] },
                  sk: { a: 0, k: 0 },
                  sa: { a: 0, k: 0 }
                }
              ]
            }
          ],
          ef: [
            {
              ty: 22,
              nm: "Stroke",
              np: 13,
              mn: "ADBE Stroke",
              ix: 1,
              en: 1,
              ef: [
                { ty: 10, nm: "Path", mn: "ADBE Stroke-0001", ix: 1, v: { a: 0, k: 1 } },
                { ty: 7, nm: "All Masks", mn: "ADBE Stroke-0010", ix: 2, v: { a: 0, k: 1 } },
                { ty: 7, nm: "Stroke Sequentially", mn: "ADBE Stroke-0011", ix: 3, v: { a: 0, k: 1 } },
                { ty: 2, nm: "Color", mn: "ADBE Stroke-0002", ix: 4, v: { a: 0, k: [1,1,1,1] } },
                { ty: 0, nm: "Brush Size", mn: "ADBE Stroke-0003", ix: 5, v: { a: 0, k: 4 } },
                { ty: 0, nm: "Brush Hardness", mn: "ADBE Stroke-0004", ix: 6, v: { a: 0, k: 0 } },
                { ty: 0, nm: "Opacity", mn: "ADBE Stroke-0005", ix: 7, v: { a: 0, k: 100 } },
                { ty: 0, nm: "Start", mn: "ADBE Stroke-0008", ix: 8, v: { a: 0, k: 0 } },
                { ty: 0, nm: "End", mn: "ADBE Stroke-0009", ix: 9, v: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { t: 90, s: [100] }] } },
                { ty: 7, nm: "Spacing", mn: "ADBE Stroke-0006", ix: 10, v: { a: 0, k: 1 } },
                { ty: 7, nm: "Paint Style", mn: "ADBE Stroke-0007", ix: 11, v: { a: 0, k: 3 } }
              ]
            }
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0
        }
      ],
      markers: []
    };
  }, []);

  // Load animation
  useEffect(() => {
    if (isMobile) {
      // Use programmatically created simple animation for mobile
      const simpleAnimation = getMobileAnimationData();
      setAnimationData(simpleAnimation);
      setHasLoaded(true);
    } else {
      // Load full animation for desktop
      fetch('/assets/animations/signature-animation.json')
        .then(response => response.json())
        .then(data => {
          setAnimationData(data);
          setHasLoaded(true);
        })
        .catch(error => {
          console.error('Error loading animation:', error);
        });
    }
  }, [isMobile, getMobileAnimationData]);

  // Play animation with performance optimizations
  useEffect(() => {
    if (lottieRef.current && hasLoaded) {
      // Add a tiny delay to ensure DOM is ready
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (lottieRef.current) {
            lottieRef.current.play();
          }
        }, 50);
      });
    }
  }, [hasLoaded]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      {/* Background Image with lazy loading */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <picture>
          <source srcSet="/assets/home.webp" type="image/webp" />
          <img
            src="/assets/home.jpg"
            alt="Saxophone Background"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'right center',
              // Add will-change for performance
              willChange: 'transform'
            }}
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
            importance="low"
          />
        </picture>
      </div>

      {/* Animation Container */}
      <div 
        ref={animationContainerRef}
        className={`absolute top-[5%] left-[5%] 
                    ${isMobile ? 'w-[300px] h-[150px] md:w-[400px] md:h-[200px]' : 'w-[1050px] h-[750px]'}
                    max-w-[calc(100vw-10%)] 
                    max-h-[calc(100vh-10%)]
                    transition-all duration-300
                    transform-gpu`}
        style={{
          // Force GPU acceleration
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          willChange: 'transform, opacity'
        }}
      >
        <div className="relative w-full h-full">
          {animationData && (
            <div 
              className="transform-gpu"
              style={{
                filter: isMobile ? 'none' : 'brightness(0) invert(1) sepia(1) saturate(0)',
                backgroundColor: 'transparent',
                // More GPU acceleration
                transform: 'translateZ(0)',
                willChange: 'filter'
              }}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={true}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  progressiveLoad: true,
                  hideOnTransparent: true,
                  // Use canvas renderer for mobile (more performant than SVG)
                  renderer: isMobile ? 'canvas' : 'svg',
                  clearCanvas: true
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  // Critical: Force GPU layers
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  // Remove if not needed
                  opacity: hasLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                onDOMLoaded={() => {
                  // Add loading class removal
                  if (animationContainerRef.current) {
                    animationContainerRef.current.classList.remove('opacity-0');
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