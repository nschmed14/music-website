import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Media = () => {
  const [activeTab, setActiveTab] = useState('video');

  const videos = [
    {
      id: 'YOUR_VIDEO_ID_1',
      title: 'Blue Caprice',
      composer: 'Isaiah Collier',
      description: 'Live performance featuring contemporary jazz improvisation techniques',
      align: 'right'
    },
    {
      id: 'YOUR_VIDEO_ID_2',
      title: 'Sonata for Alto Saxophone',
      composer: 'Paul Creston',
      description: 'First movement performed at UW-Madison recital hall',
      align: 'left'
    },
    {
      id: 'YOUR_VIDEO_ID_3',
      title: 'Improvisation in G Minor',
      composer: 'Noah Schmedding',
      description: 'Original composition showcasing extended techniques',
      align: 'right'
    },
    {
      id: 'YOUR_VIDEO_ID_4',
      title: 'Tableaux de Provence',
      composer: 'Paule Maurice',
      description: 'Excerpts from this French classical work',
      align: 'left'
    },
    {
      id: 'YOUR_VIDEO_ID_5',
      title: 'Jazz Standards Medley',
      composer: 'Various',
      description: 'Live quartet performance featuring classic repertoire',
      align: 'right'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F5F5]">
      {/* Use the shared Header component */}
      <Header />

      {/* Main Content - Adjusted padding-top for taller header */}
      <div className="pt-40 pb-16 px-4 md:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setActiveTab('photo')}
            className={`px-8 py-3 mx-2 text-lg font-display ${activeTab === 'photo' ? 'bg-[#2C423F] text-white' : 'bg-[#949B96] text-white hover:bg-[#829191]'} transition-colors rounded-lg`}
          >
            Photo
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-8 py-3 mx-2 text-lg font-display ${activeTab === 'video' ? 'bg-[#2C423F] text-white' : 'bg-[#949B96] text-white hover:bg-[#829191]'} transition-colors rounded-lg`}
          >
            Video
          </button>
        </div>

        {/* Video Content */}
        {activeTab === 'video' && (
          <div className="max-w-6xl mx-auto space-y-24">
            {videos.map((video, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${video.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
              >
                {/* Video Embed with proper 16:9 aspect ratio container */}
                <div className="w-full md:w-2/3 relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
                
                {/* Text Content */}
                <div className="w-full md:w-1/3 p-4">
                  <h2 className="font-display text-2xl md:text-3xl text-[#2C423F] mb-3">{video.title}</h2>
                  <p className="text-lg md:text-xl text-[#829191] mb-4">{video.composer}</p>
                  <p className="text-[#4C5B61] leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photo Content */}
        {activeTab === 'photo' && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-3xl font-display text-[#2C423F] mb-6">Photo Gallery</h2>
            <p className="text-xl text-[#4C5B61]">Coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;