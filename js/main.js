/**
 * ==========================================================================
 * LEADERSHIP XYZ - MAIN JS ENTRY POINT
 * Initializes all modular animations and interactive features.
 * ==========================================================================
 */

import { initHeroAnimation } from './modules/hero-animation.js';
import { initScrollReveals } from './modules/scroll-reveal.js';
import { initInteractions } from './modules/interactions.js';
import { initCityDinnerCarousel } from './modules/city-dinner-carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations in sequence
  initHeroAnimation();
  initScrollReveals();
  initInteractions();
  initCityDinnerCarousel();
  
  console.log('✨ Leadership XYZ initialized successfully with modular architecture.');
});
