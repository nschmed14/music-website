/**
 * @file Bio.jsx
 * @description Biography page
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import PageLayout from './PageLayout';

export default function Bio() {
  return (
    <PageLayout title="Bio" image="bio" position="66.67% center" overlay="bg-black/40">
      <div className="page-top mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8">
        <h1 className="mb-6 text-4xl font-light sm:mb-8 md:text-5xl">Biography</h1>

        <div className="panel max-w-3xl">
          <div className="space-y-6 text-lg font-light leading-relaxed md:text-xl">
            <p>
              Noah Schmedding is a saxophonist and educator based in Madison, Wisconsin, where he received a Master of
              Music in Saxophone Performance at the University of Wisconsin-Madison. Noah's career in saxophone
              performance includes many significant engagements with both chamber music as well as large ensembles
              including a tour through Central Europe as principal saxophonist with the University of Northern Iowa Wind
              Ensemble, as well as a season with the UW-Madison Wind Ensemble.
            </p>
            <p>
              As a dedicated chamber musician, Noah has served as the soprano chair with the Juniper Saxophone Quartet. In
              addition to his career in performance, Noah is also an active teacher throughout the greater Madison area,
              offering private instruction to middle and high school students.
            </p>
            <p>
              Noah has participated in masterclasses with Nicolas Prost, Staff Sgt. Stacy Wilson, Dr. Jan Berry Baker, and
              the Colere Quartet. Noah holds dual degrees in both Music and Computer Science from the University of
              Northern Iowa, where he studied saxophone under Dr. Ann Bradfield. Noah speaks four languages fluently
              (English, sheet music, Python, and JavaScript). His primary instructors throughout his time at the
              University of Wisconsin-Madison include Dr. Matthew Koester, Dr. Andrew MacRossie, and Dr. Walt Puyear.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
