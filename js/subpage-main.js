/**
 * ==========================================================================
 * LEADERSHIP XYZ - SUBPAGE MAIN SCRIPT
 * Initializes navigation menu and scroll behavior for subpages.
 * ==========================================================================
 */

import { initNavigationMenu } from './modules/navigation-menu.js';
import { initPageTransitions } from './modules/page-transition.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initSmoothScroll();
  initNavigationMenu();

  // Dynamic Navbar Scroll Behavior
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 24) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  console.log('✨ Leadership XYZ subpage initialized.');
});
