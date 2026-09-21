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
import { initNavigationMenu } from './modules/navigation-menu.js';
import { initPageTransitions } from './modules/page-transition.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize transitions and animations
  initPageTransitions();
  initNavigationMenu();
  initHeroAnimation();
  initScrollReveals();
  initInteractions();
  initCityDinnerCarousel();
  
  console.log('✨ Leadership XYZ initialized successfully with modular architecture.');
});
