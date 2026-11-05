/**
 * @file useHomeLinkClick.js
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import { useLocation } from 'react-router-dom';

/**
 * Click handler for links to "/". On the home page such a link would do nothing,
 * so it reloads the page from the top instead, replaying the signature animation.
 */
export default function useHomeLinkClick() {
  const { pathname } = useLocation();

  return (e) => {
    if (pathname !== '/') return;
    e.preventDefault();
    window.scrollTo(0, 0); // so the reload starts at the top
    window.location.reload();
  };
}
