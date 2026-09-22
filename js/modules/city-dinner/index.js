/**
 * ==========================================================================
 * URBAN 101 / CITY OVER DINNER – MODULE ENTRY POINT
 * Bundles hero kinetic scrub, countdown timer, carousel & stage controls
 * ==========================================================================
 */

import { initHeroTextScrub } from './hero-scrub.js';
import { initCountdownTimer } from './countdown.js';
import { initCityDinnerCarousel } from './carousel.js';
import { initCityDinnerIntro } from './intro.js';

export function initUrban101Page() {
  initCityDinnerIntro();
  initHeroTextScrub();
  initCountdownTimer();
  initCityDinnerCarousel();
}
