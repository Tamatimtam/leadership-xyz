/**
 * ==========================================================================
 * LEADERSHIP XYZ - MAIN JS ENTRY POINT
 * Initializes all modular animations and interactive features.
 * ==========================================================================
 */

import { initHeroAnimation } from './modules/hero-animation.js';
import { initScrollReveals } from './modules/scroll-reveal.js';
import { initInteractions } from './modules/interactions.js';
import { initNavigationMenu } from './modules/navigation-menu.js';
import { initPageTransitions } from './modules/page-transition.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize transitions and animations
  initPageTransitions();
  initSmoothScroll();
  initNavigationMenu();
  initHeroAnimation();
  initScrollReveals();
  initInteractions();
  
  console.log('✨ Leadership XYZ initialized successfully with modular architecture.');
});
