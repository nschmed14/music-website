/**
 * @file Bio.js
 * @description Biography page component
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

export default function Bio() {
    return (
      // Main page container
      <div className="relative min-h-screen flex flex-col">
        <Header />
        
        // Background image with dark overlay
        <div className="fixed inset-0 -z-10">
          <picture>
            <source srcSet="/assets/bio.webp" type="image/webp" />
            <img
              src="/assets/bio.jpg"
              alt="Bio Background"
              className="w-full h-full object-cover"
              style={{
                objectPosition: '66.67% center'
              }}
              loading="lazy"
              decoding="async"
              width="1920"
              height="1080"
            />
          </picture>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        // Biography content section
        <div className="container mx-auto px-4 py-8 relative z-10 pt-40 flex-grow">
          // Biography page title
          <h1 
            className="text-4xl md:text-5xl font-light mb-8 text-white"
            style={{ fontFamily: "'Ringbearer', sans-serif" }}
          >
            Biography
          </h1>
          
          // Biography text container with styling
          <div className="bg-[#5C4033]/80 backdrop-blur-md border-2 border-black rounded-xl p-6 md:p-8 max-w-3xl">
            <div className="text-lg md:text-xl font-light leading-relaxed text-white whitespace-pre-line font-sans space-y-6">
              <p>
                Noah Schmedding is a saxophonist and educator based in Madison, Wisconsin, where he is pursuing a Master of Music in Saxophone Performance at the University of Wisconsin-Madison. Noah's career in saxophone performance inlcudes many significant engagements with both chamber music as well as large ensembles including a tour through Central Europe as principal saxophonist with the University of Northern Iowa Wind Ensemble, as well as a season with the UW-Madison Wind Ensemble.
              </p>
              
              <p>
                As a dedicated chamber musician, Noah currently serves as the alto chair with the Cardinal Saxophone Quartet, and previously served as the soprano chair with the Juniper Saxophone Quartet. In addition to his career in performance, Noah is also an active teacher throughout the greater Madison area, offering private instruction to middle and high school students.
              </p>
              
              <p>
                Noah has participated in masterclasses with Nicolas Prost, Staff Sgt. Stacy Wilson, Dr. Jan Berry Baker, and the Colere Quartet. Noah holds dual degrees in both Music and Computer Science from the University of Northern Iowa, where he studied saxophone under Dr. Ann Bradfield. Noah speaks four languages fluently (English, sheet music, Python, and JavaScript). His primary instructors throughout his time at the University of Wisconsin-Madison include Dr. Matthew Koester, Dr. Andrew MacRossie, and Dr. Walt Puyear.
              </p>
            </div>
          </div>
        </div>
        
        // Footer positioned at bottom
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
}