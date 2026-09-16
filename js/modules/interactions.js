/**
 * ==========================================================================
 * INTERACTIONS & MICRO-ANIMATIONS MODULE
 * Handles 3D author card flipping, floating mockup motion, and hover dynamics.
 * ==========================================================================
 */

export function initInteractions() {
  if (typeof gsap === 'undefined') return;

  // 1. Subtle continuous floating/breathing motion for 3D Book Mockup
  const mockup = document.querySelector('.hero-mockup-img');
  if (mockup) {
    gsap.to(mockup, {
      y: '-=10',
      duration: 3.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.8
    });
  }

  // 2. Marketplace button tactile hover physics
  const buttons = document.querySelectorAll('.btn-marketplace, .navbar-contact-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.04, duration: 0.25, ease: 'power1.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

  // 3. Author Card Flip Interaction
  const authorCards = document.querySelectorAll('.author-card');
  authorCards.forEach(card => {
    // Click to flip
    card.addEventListener('click', (e) => {
      // If clicking directly on an anchor link (like instagram), do not flip
      if (e.target.closest('a')) return;

      card.classList.toggle('is-flipped');
    });

    // Keyboard support (Enter or Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });
}
