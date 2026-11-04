/**
 * @file Home.jsx
 * @description Home page with the animated signature
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import PageLayout from './PageLayout';
import Signature from './Signature';

export default function Home() {
  return (
    <PageLayout
      image="home"
      position="78% center"
      // Darkens the top on narrow screens, where the signature sits over the bright windows
      overlay="bg-gradient-to-b from-black/60 via-black/10 to-transparent desk:from-transparent desk:via-transparent"
    >
      <h1 className="sr-only">Noah Schmedding, Saxophonist</h1>
      <div className="flex flex-1 justify-center px-[6vw] pt-24 desk:justify-start desk:pt-[max(9rem,16vh)]">
        {/* Sized by width, but also capped by viewport height (image is ~2:1) so it fits landscape phones */}
        <Signature className="h-auto w-[min(88vw,calc((100svh-12rem)*2),640px)] self-start desk:w-[min(46vw,calc((100svh-14rem)*2),960px)]" />
      </div>
    </PageLayout>
  );
}
