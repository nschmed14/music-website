/**
 * @file Signature.jsx
 * @description Animated "written" signature.
 *
 * The signature image is revealed through an SVG mask made of strokes that trace
 * the handwriting; animating stroke-dashoffset draws it on. This replaces the
 * old Lottie animation: no runtime library, no per-frame JS, no CSS filters,
 * so it runs smoothly on phones.
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import { useEffect, useState } from 'react';
import SIGNATURE_PATHS from './signaturePaths';

const SRC = '/assets/signature.png';
const WIDTH = 1287;
const HEIGHT = 645;

export default function Signature({ className = '' }) {
  const [play, setPlay] = useState(false);

  // Start drawing only once the image is decoded, so the whole animation is visible.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = SRC;
    const start = () => !cancelled && setPlay(true);
    (img.decode ? img.decode() : Promise.resolve()).then(start, start);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={`${play ? 'signature-play' : ''} ${className}`}
      role="img"
      aria-label="Noah Schmedding"
    >
      <defs>
        <mask id="signature-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={WIDTH} height={HEIGHT}>
          <g fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
            {SIGNATURE_PATHS.map(({ d, length }) => (
              <path key={length} d={d} className="signature-stroke" style={{ '--len': length }} />
            ))}
          </g>
        </mask>
      </defs>
      <image href={SRC} width={WIDTH} height={HEIGHT} mask="url(#signature-reveal)" />
    </svg>
  );
}
