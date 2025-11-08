import React, { useEffect } from 'react';
import Header from './Header';

const Home = () => {
  useEffect(() => {
    // Trigger animation after component mounts
    const path = document.querySelector('.signature-path');
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.animation = 'draw 3s ease-out forwards';
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />
      
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/assets/home.jpg"
          alt="Saxophone Background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Signature Animation - Using your actual path */}
      <div className="absolute top-1/4 left-1/4 w-96 h-64">
        <svg
          viewBox="0 0 1376 1032"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Your actual signature path - cleaned and reversed for left-to-right animation */}
          <path
            className="signature-path"
            d="M170.5,687.83c25.88-153.83,86.28-290.54,170.5-419.45,9.4-14.39,19.11-28.61,28.78-42.68,6.23-9.07,12.62-18.06,18.79-27.17.16-.24,4.57-5.98,1.77-5.23-40.44,53.26-78.32,108.86-110.08,167.68-64.04,118.61-108.14,249.55-121.74,384.8l-3.51,61.42c-.22-3.11-1.26-6.45-1.48-9.5-9.97-133.76-2.26-263.14,13.08-396.5,2.96-25.73,12-64.26,9.92-89.05-1.51-18.11-11.92-10.48-18.48-.42-15.77,24.2-28.39,58.53-37.98,85.91-42.39,121.08-65.9,254.34-74.57,382.09l2.09,36.46c2.48,1.06,2.87-4.41,2.9-5.59.83-37.41.61-71.61,5.21-109.67,10.29-85.27,29.47-173.53,54.1-255.61,12-40.01,25.11-82.92,45.19-119.66,3.62-6.63,8.08-12.73,12.23-19l3.28-.96c1.55,17.05-.34,35.22-2.09,52.35-4.99,48.61-11.82,96.98-15.9,145.94-8.51,102.12-13.49,216.33-.1,317.83.67,5.08-1.56,15.66,6.11,14.37.82-49.64,3.75-99.39,11.99-148.37Z"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: 'none' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;