/**
 * @file Media.js
 * @description Media page: video performances and photo gallery
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageLayout from './PageLayout';

const PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: n,
  thumb: `/assets/photos/thumbs/photo${n}.webp`,
  full: `/assets/photos/photo${n}.webp`,
  alt: `Noah Schmedding performance photo ${n}`,
}));

const VIDEOS = [
  {
    id: 'qKee9bEtlto',
    title: 'Pequeña Czarda',
    composer: 'Pedro Iturralde',
    description:
      "Live performance from my year 1 master's recital in Spring of 2025.\n\nFeaturing:\nAlto Saxophone - Dr. Andrew MacRossie\nPiano - Dr. Elizabeth Vaughan",
  },
  {
    id: 'EtzSO-1u9YU',
    title: 'Concerto for Alto Saxophone and Band I. Energetic',
    composer: 'Paul Creston',
    description:
      'Recorded in November of 2023 in preparation for my masters degree audition cycle\n\nFeaturing:\nPiano - Patrick Flannery',
  },
  {
    id: '9-_qDosZBzg',
    title: 'Concerto for Alto Saxophone and Band III. Rhythmic',
    composer: 'Paul Creston',
    description:
      'Recorded in November of 2023 in preparation for my masters degree audition cycle\n\nFeaturing:\nPiano - Patrick Flannery',
  },
];

const TABS = [
  { id: 'photo', label: 'Photo' },
  { id: 'video', label: 'Video' },
];

function Videos() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 lg:space-y-20">
      {VIDEOS.map((video, i) => (
        <article
          key={video.id}
          className={`flex flex-col overflow-hidden rounded-xl shadow-2xl ${i % 2 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
        >
          <div className="aspect-video w-full bg-black lg:w-2/3">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
              className="h-full w-full"
              title={`${video.title} - ${video.composer}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="flex w-full flex-col justify-center border-white/20 bg-black/50 p-6 backdrop-blur-sm max-lg:border-t lg:w-1/3 lg:border-x lg:p-8">
            <h2 className="mb-3 text-2xl font-light md:text-3xl">{video.title}</h2>
            <p className="mb-4 text-lg italic text-gray-300 md:text-xl">{video.composer}</p>
            <p className="whitespace-pre-line leading-relaxed">{video.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Lightbox({ index, onClose, onStep }) {
  const touchX = useRef(null);
  const photo = PHOTOS[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, onStep]);

  const arrow = 'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80';

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <img
        key={photo.id}
        src={photo.full}
        alt={photo.alt}
        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="absolute right-3 top-3 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80"
        onClick={onClose}
        aria-label="Close"
        autoFocus
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <button
        type="button"
        className={`${arrow} left-3`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous photo"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        className={`${arrow} right-3`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next photo"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}

function Photos() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir) => setOpen((i) => (i + dir + PHOTOS.length) % PHOTOS.length), []);

  return (
    <>
      <div className="mx-auto max-w-7xl columns-1 gap-6 sm:columns-2 lg:columns-3">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpen(i)}
            className="group mb-6 block w-full break-inside-avoid overflow-hidden rounded-xl bg-black/20 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            aria-label={`View ${photo.alt}`}
          >
            <img
              src={photo.thumb}
              alt={photo.alt}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </>
  );
}

export default function Media() {
  const [activeTab, setActiveTab] = useState('video');

  return (
    <PageLayout image="media" position="left center">
      <div className="page-top px-4 pb-16 sm:px-8">
        <h1 className="sr-only">Media</h1>
        <div className="mb-10 flex justify-center gap-4 sm:mb-16 sm:gap-6" role="tablist" aria-label="Media type">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl border px-8 py-3 font-ringbearer text-lg transition-all duration-300 sm:px-10 sm:py-4 sm:text-xl ${
                  active
                    ? 'scale-105 border-white/30 bg-black/60 shadow-lg backdrop-blur-md'
                    : 'border-white/10 bg-black/40 backdrop-blur-sm hover:scale-[1.02] hover:bg-black/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div role="tabpanel">{activeTab === 'video' ? <Videos /> : <Photos />}</div>
      </div>
    </PageLayout>
  );
}
