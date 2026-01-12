/**
 * @file Media.js
 * @description Media gallery component with video and photo sections
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React, { useState, useMemo } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

const Media = () => {
  const [activeTab, setActiveTab] = useState('video');

  // Photo gallery data
  const photos = useMemo(() => [
    { id: 1, src: '/assets/photos/photo1.jpg', webp: '/assets/photos/photo1.webp' },
    { id: 2, src: '/assets/photos/photo2.jpg', webp: '/assets/photos/photo2.webp' },
    { id: 3, src: '/assets/photos/photo3.jpg', webp: '/assets/photos/photo3.webp' },
    { id: 4, src: '/assets/photos/photo4.jpg', webp: '/assets/photos/photo4.webp' },
    { id: 5, src: '/assets/photos/photo5.jpg', webp: '/assets/photos/photo5.webp' },
    { id: 6, src: '/assets/photos/photo6.jpg', webp: '/assets/photos/photo6.webp' },
  ], []);

  // Video gallery data
  const videos = useMemo(() => [
    {
      id: 'qKee9bEtlto',
      title: 'Pequeña Czarda',
      composer: 'Pedro Iturralde',
      description: `Live performance from my year 1 master's recital in Spring of 2025.\n\nFeaturing:\nAlto Saxophone - Dr. Andrew MacRossie \nPiano - Dr. Elizabeth Vaughan`,
      align: 'right'
    },
    {
      id: 'EtzSO-1u9YU',
      title: 'Concerto for Alto Saxophone and Band I. Energetic',
      composer: 'Paul Creston',
      description: 'Recorded in November of 2023 in preparation for my masters degree audition cycle\n\nFeaturing:\nPiano - John Flannery',
      align: 'left'
    },
    {
      id: '9-_qDosZBzg',
      title: 'Concerto for Alto Saxophone and Band III. Rhythmic',
      composer: 'Paul Creston',
      description: 'Recorded in November of 2023 in preparation for my masters degree audition cycle\n\nFeaturing:\nPiano - John Flannery',
      align: 'right'
    },
  ], []);

  return (
    // Main page container
    <div className="relative min-h-screen flex flex-col">
      <Header />

      // Background image for media page
      <div className="fixed inset-0 -z-10">
        <picture>
          <source srcSet="/assets/media.webp" type="image/webp" />
          <img
            src="/assets/media.jpg"
            alt="Saxophone performance background with stage lighting"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'left center'
            }}
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
          />
        </picture>
      </div>

      // Main content area
      <div className="pt-40 pb-16 px-4 md:px-8 flex-grow relative z-10">
        // Tab navigation for photos/videos
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setActiveTab('photo')}
            className={`px-10 py-4 mx-3 text-xl rounded-xl transition-all duration-300 ${activeTab === 'photo' 
              ? 'bg-black/60 backdrop-blur-md text-white shadow-lg transform scale-105 border border-white/20' 
              : 'bg-black/40 backdrop-blur-sm text-white hover:bg-black/50 hover:shadow-md hover:transform hover:scale-[1.02] border border-white/10'}`}
            style={{ fontFamily: "'Ringbearer', sans-serif" }}
            aria-pressed={activeTab === 'photo'}
            aria-label="View photo gallery"
          >
            Photo
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-10 py-4 mx-3 text-xl rounded-xl transition-all duration-300 ${activeTab === 'video' 
              ? 'bg-black/60 backdrop-blur-md text-white shadow-lg transform scale-105 border border-white/20' 
              : 'bg-black/40 backdrop-blur-sm text-white hover:bg-black/50 hover:shadow-md hover:transform hover:scale-[1.02] border border-white/10'}`}
            style={{ fontFamily: "'Ringbearer', sans-serif" }}
            aria-pressed={activeTab === 'video'}
            aria-label="View video gallery"
          >
            Video
          </button>
        </div>

        // Video gallery section
        {activeTab === 'video' && (
          <div className="max-w-6xl mx-auto space-y-12 lg:space-y-24">
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className={`flex flex-col ${video.align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-0 overflow-hidden rounded-xl shadow-2xl`}
              >
                // YouTube video embed
                <div className="w-full lg:w-2/3 relative">
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                      className="absolute top-0 left-0 w-full h-full"
                      title={`${video.title} - ${video.composer}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                  </div>
                </div>
                
                // Video description panel
                <div className="w-full lg:w-1/3 relative lg:block">
                  <div className="hidden lg:block absolute inset-0 bg-black/40 backdrop-blur-sm border-l border-r border-white/20">
                    <div className="h-full p-6 md:p-8 flex flex-col justify-center">
                      <h2 
                        className="text-2xl md:text-3xl mb-3 font-light text-white"
                        style={{ fontFamily: "'Ringbearer', sans-serif" }}
                      >
                        {video.title}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-300 mb-4 italic font-sans">
                        {video.composer}
                      </p>
                      <p className="text-white leading-relaxed whitespace-pre-line font-sans">
                        {video.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:hidden bg-black/40 backdrop-blur-sm p-6 border-t border-white/20">
                    <h2 
                      className="text-2xl mb-3 font-light text-white"
                      style={{ fontFamily: "'Ringbearer', sans-serif" }}
                    >
                      {video.title}
                    </h2>
                    <p className="text-lg text-gray-300 mb-4 italic font-sans">
                      {video.composer}
                    </p>
                    <p className="text-white leading-relaxed whitespace-pre-line font-sans">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        // Photo gallery section
        {activeTab === 'photo' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            // Photo gallery title
            <h2 
              className="text-4xl font-light text-white mb-8 text-center"
              style={{ fontFamily: "'Ringbearer', sans-serif" }}
            >
              Photo Gallery
            </h2>

            // Masonry style photo grid
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {photos.length > 0 ? (
                photos.map((photo) => (
                  <div 
                    key={photo.id}
                    className="group break-inside-avoid overflow-hidden rounded-xl shadow-lg bg-black/10 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <picture>
                      <source srcSet={photo.webp} type="image/webp" />
                      <img
                        src={photo.src}
                        alt={`Performance ${photo.id} - saxophonist on stage`}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="600"
                      />
                    </picture>
                  </div>
                ))
              ) : (
                // Empty gallery placeholder
                <div className="col-span-3">
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-12 md:p-16 border border-white/20 text-center">
                    <p className="text-2xl text-white font-sans mb-4">
                      Photo Gallery Coming Soon
                    </p>
                    <p className="text-lg text-gray-300 font-sans">
                      Professional performance, studio, and teaching photos will be added here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      // Footer section
      <div className="mt-auto relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Media;