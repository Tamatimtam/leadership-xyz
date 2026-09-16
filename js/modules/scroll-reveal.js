/**
 * ==========================================================================
 * SCROLL REVEAL MODULE
 * Uses GSAP ScrollTrigger to reveal content gracefully as the user scrolls.
 * ==========================================================================
 */

export function initScrollReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Philosophy Section Reveal
  const philosophyTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.philosophy-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  philosophyTl
    .from('.philosophy-badge', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'back.out(1.5)'
    })
    .from('.philosophy-quote', {
      opacity: 0,
      y: 35,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.philosophy-narrative', {
      opacity: 0,
      y: 25,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.6');

  // 2. "Every Story Matters" Card Reveal
  gsap.from('.story-card', {
    scrollTrigger: {
      trigger: '.story-card-section',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    scale: 0.96,
    duration: 1.1,
    ease: 'power3.out'
  });

  // 3. Authors Section Header & Cards Stagger
  const authorsTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.authors-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  authorsTl
    .from('.authors-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.author-card', {
      opacity: 0,
      y: 45,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out'
    }, '-=0.4');
}
