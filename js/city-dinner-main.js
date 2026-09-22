/**
 * ==========================================================================
 * LEADERSHIP XYZ - CITY OVER DINNER STANDALONE ENTRY POINT
 * ==========================================================================
 */

import { initUrban101Page } from './modules/city-dinner/index.js';
import { initNavigationMenu } from './modules/navigation-menu.js';
import { initPageTransitions } from './modules/page-transition.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize transitions, navigation and Urban 101 features
  initPageTransitions();
  initSmoothScroll();
  initNavigationMenu();
  initUrban101Page();

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
