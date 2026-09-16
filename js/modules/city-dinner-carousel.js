/**
 * ==========================================================================
 * CITY OVER DINNER – Carousel & 3-Stage Reveal Controller
 *
 * Stage 1 (poster)  →  click  →  Stage 2 (B&W candid)
 * Stage 2 (B&W)     →  click  →  Stage 3 (full-color expanded)
 * Stage 3 (color)   →  click "back"  →  Stage 1 (poster)
 * ==========================================================================
 */

export function initCityDinnerCarousel() {
  const track = document.querySelector('.city-dinner-carousel');
  if (!track) return;

  const cards = track.querySelectorAll('.session-card');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const counter = document.querySelector('.carousel-counter');

  let currentIndex = 0;

  // ── Card State Machine ──────────────────────────────────────
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicking "back" link inside stage-color, reset to poster
      if (e.target.closest('.stage-color-back')) {
        resetCard(card);
        return;
      }

      const state = getState(card);

      if (state === 'poster') {
        // Poster → B&W
        card.classList.add('state-bw');
        card.classList.remove('state-color');
      } else if (state === 'bw') {
        // B&W → Full Color
        card.classList.remove('state-bw');
        card.classList.add('state-color');
      } else {
        // Color → back to Poster
        resetCard(card);
      }
    });
  });

  function getState(card) {
    if (card.classList.contains('state-color')) return 'color';
    if (card.classList.contains('state-bw')) return 'bw';
    return 'poster';
  }

  function resetCard(card) {
    card.classList.remove('state-bw', 'state-color');
  }

  // ── Carousel Scroll Navigation ──────────────────────────────
  function scrollToIndex(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    currentIndex = index;

    cards[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });

    updateCounter();
  }

  function updateCounter() {
    if (counter) {
      counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => scrollToIndex(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => scrollToIndex(currentIndex + 1));
  }

  // Keep counter in sync when user scrolls manually / drags
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const trackRect = track.getBoundingClientRect();
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const dist = Math.abs(cardRect.left - trackRect.left);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      currentIndex = closest;
      updateCounter();
    }, 80);
  });

  // Initialize counter
  updateCounter();

  // ── GSAP Scroll Reveal for the whole section ────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.city-dinner-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });

    sectionTl
      .from('.city-dinner-series-label', {
        opacity: 0, y: 15, duration: 0.5, ease: 'power3.out'
      })
      .from('.city-dinner-title', {
        opacity: 0, y: 25, duration: 0.8, ease: 'power3.out'
      }, '-=0.35')
      .from('.city-dinner-subtitle', {
        opacity: 0, y: 18, duration: 0.6, ease: 'power3.out'
      }, '-=0.5')
      .from('.session-card', {
        opacity: 0, y: 40, scale: 0.96, duration: 0.9, stagger: 0.15, ease: 'power3.out'
      }, '-=0.4')
      .from('.carousel-nav', {
        opacity: 0, y: 10, duration: 0.5, ease: 'power3.out'
      }, '-=0.5');
  }
}
