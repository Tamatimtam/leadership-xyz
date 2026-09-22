/**
 * ==========================================================================
 * SMOOTH SCROLL MODULE (Lenis)
 * Adds universal smooth scrolling to the page.
 * ==========================================================================
 */

export function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis is not loaded.');
    return;
  }

  const lenis = new Lenis();

  // Keep GSAP ScrollTrigger in sync with Lenis
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  // Use GSAP ticker if available for better performance, else use standard raf
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}
