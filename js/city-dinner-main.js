/**
 * ==========================================================================
 * LEADERSHIP XYZ - CITY OVER DINNER STANDALONE ENTRY POINT
 * ==========================================================================
 */

import { initCityDinnerCarousel } from './modules/city-dinner-carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the full interactive carousel & expandable spotlight
  initCityDinnerCarousel();

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

  console.log('✨ City Over Dinner standalone page initialized.');
});
