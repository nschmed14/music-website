/**
 * @file PageLayout.js
 * @description Shared page shell: fixed background image, content area, footer
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import React from 'react';
import Footer from './Footer';

/**
 * @param {object}  props
 * @param {string}  [props.image]     Base name in /assets (e.g. "home" -> home.webp / home.jpg)
 * @param {string}  [props.position]  CSS object-position for the background
 * @param {string}  [props.overlay]   Extra classes for a tint layer over the background
 */
export default function PageLayout({ image, position = 'center', overlay, children }) {
  return (
    <div className="relative flex min-h-svh flex-col">
      {image && (
        // lvh keeps the image from rescaling when mobile browser toolbars show/hide
        <div className="fixed inset-x-0 top-0 -z-10 h-lvh overflow-hidden bg-black" aria-hidden="true">
          <picture>
            <source srcSet={`/assets/${image}.webp`} type="image/webp" />
            <img
              src={`/assets/${image}.jpg`}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: position }}
              fetchpriority="high"
              decoding="async"
            />
          </picture>
          {overlay && <div className={`absolute inset-0 ${overlay}`} />}
        </div>
      )}

      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
