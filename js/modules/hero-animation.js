/**
 * ==========================================================================
 * HERO ANIMATION MODULE
 * Handles the opening sequence: navbar slide, staggered letters,
 * marketplace button pop-in, and mockup reveal.
 * ==========================================================================
 */

export function initHeroAnimation() {
  // Ensure GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. Skipping animations.');
    return;
  }

  // Split hero title into individual character spans for the stagger effect
  const title = document.querySelector('.hero-title');
  if (title && !title.querySelector('.char')) {
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words.map(word => {
      const chars = word.split('').map(char => `<span class="char">${char}</span>`).join('');
      return `<span class="word">${chars}</span>`;
    }).join(' ');
  }

  // Create orchestrated timeline
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    delay: 0.1
  });

  // 1. Floating Navbar drops in gently
  tl.from('.navbar', {
    y: -40,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out'
  });

  // 2. "READY STOCK" letters stagger in like a wave
  tl.from('.hero-title .char', {
    opacity: 0,
    y: 35,
    duration: 0.8,
    stagger: 0.035,
    ease: 'back.out(1.8)'
  }, '-=0.7');

  // 3. Subtitle fades up
  tl.from('.hero-subtitle', {
    opacity: 0,
    y: 25,
    duration: 0.9,
    ease: 'power2.out'
  }, '-=0.5');

  // 4. Marketplace action buttons spring in
  tl.from('.btn-marketplace', {
    opacity: 0,
    y: 25,
    scale: 0.85,
    duration: 0.8,
    stagger: 0.12,
    ease: 'back.out(2)'
  }, '-=0.6');

  // 5. 3D Book Mockup glides up with depth
  tl.from('.hero-mockup-img', {
    opacity: 0,
    y: 70,
    scale: 0.95,
    duration: 1.5,
    ease: 'power3.out'
  }, '-=0.7');
}
