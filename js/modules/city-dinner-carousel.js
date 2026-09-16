/**
 * ==========================================================================
 * CITY OVER DINNER – Carousel & Spotlight Expand Controller
 *
 * Interaction model:
 *   Hover  → card lifts, grayscale dissolves to color (CSS-driven)
 *   Click  → GSAP-animated spotlight overlay expands with staggered content
 *   Close  → smooth collapse back, body scroll restored
 * ==========================================================================
 */

export function initCityDinnerCarousel() {
  const track = document.querySelector('.city-dinner-carousel');
  if (!track) return;

  const cards = track.querySelectorAll('.session-card');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const counter = document.querySelector('.carousel-counter');
  const overlay = document.getElementById('spotlight-overlay');

  let currentIndex = 0;

  // ── Card Data (maps to each card for the spotlight) ─────────
  const sessionData = [
    {
      edition: 'Vol. 01 · Public Spaces',
      topic: "Do's and Don'ts Steps to Build Public Spaces",
      speaker: 'Her Pramtama',
      desc: 'Spatial leadership and civic ownership — how thoughtful design of public spaces can transform communities. This session explored the principles behind creating spaces that invite civic participation, the common pitfalls in public space development, and the courage required to champion designs that serve people over profit.',
      lens: 'Spatial Leadership & Civic Ownership',
      accent: 'violet',
      photo: 'assets/images/speaker-her.jpg'
    },
    {
      edition: 'Vol. 02 · Urbanism',
      topic: 'Ctrl+C and Ctrl+V Singapore Urbanism — Should We Do It?',
      speaker: 'Prof. Sulfikar Amir',
      desc: 'Public policy adaptation and democratic infrastructure — can we copy Singapore, and should we? A provocative dinner conversation about what happens when developing nations borrow urban planning models wholesale, the hidden assumptions embedded in foreign infrastructure, and the democratic cost of technocratic efficiency.',
      lens: 'Public Policy & Democratic Infrastructure',
      accent: 'cobalt',
      photo: 'assets/images/speaker-sulfikar.jpg'
    },
    {
      edition: 'Vol. 03 · Enterprise',
      topic: 'How to Spark Life in the City: Career, Enterprise & Community',
      speaker: 'Roni Pramaditia',
      desc: 'Grassroots enterprise and youth mobilization — igniting civic energy from the ground up. Roni shared his journey of building community-driven ventures that transform neighborhoods, exploring how young leaders can create economic opportunity while strengthening the social fabric of their cities.',
      lens: 'Grassroots Enterprise & Youth Mobilization',
      accent: 'green',
      photo: 'assets/images/speaker-roni.jpg'
    }
  ];

  // ── Click to Expand Spotlight ───────────────────────────────
  cards.forEach((card, index) => {
    card.addEventListener('click', () => openSpotlight(index));
  });

  function openSpotlight(index) {
    if (!overlay) return;
    const data = sessionData[index];

    // Populate the spotlight panel
    const panel = overlay.querySelector('.spotlight-panel');
    panel.setAttribute('data-accent', data.accent);

    overlay.querySelector('.spotlight-photo').src = data.photo;
    overlay.querySelector('.spotlight-photo').alt = data.speaker;
    overlay.querySelector('.spotlight-edition').textContent = data.edition;
    overlay.querySelector('.spotlight-topic').textContent = data.topic;
    overlay.querySelector('.spotlight-speaker-name').textContent = data.speaker;
    overlay.querySelector('.spotlight-desc').textContent = data.desc;
    overlay.querySelector('.spotlight-lens-text').textContent = data.lens;

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    overlay.classList.add('active');

    // GSAP entrance sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(overlay.querySelector('.spotlight-backdrop'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    )
    .fromTo(panel,
      { opacity: 0, scale: 0.92, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo(overlay.querySelector('.spotlight-photo'),
      { scale: 1.15, filter: 'grayscale(100%) brightness(0.5)' },
      { scale: 1, filter: 'grayscale(0%) brightness(1)', duration: 0.8 },
      '-=0.4'
    )
    .fromTo(overlay.querySelectorAll('.spotlight-content-side > *'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
      '-=0.5'
    )
    .fromTo(overlay.querySelector('.spotlight-close'),
      { opacity: 0, scale: 0.5, rotation: -90 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.4 },
      '-=0.4'
    );
  }

  function closeSpotlight() {
    if (!overlay || !overlay.classList.contains('active')) return;

    const panel = overlay.querySelector('.spotlight-panel');
    const tl = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    tl.to(overlay.querySelector('.spotlight-close'),
      { opacity: 0, scale: 0.5, rotation: 90, duration: 0.2 }
    )
    .to(overlay.querySelectorAll('.spotlight-content-side > *'),
      { opacity: 0, y: -10, duration: 0.25, stagger: 0.03 },
      '-=0.1'
    )
    .to(panel,
      { opacity: 0, scale: 0.94, y: 30, duration: 0.35 },
      '-=0.15'
    )
    .to(overlay.querySelector('.spotlight-backdrop'),
      { opacity: 0, duration: 0.3 },
      '-=0.2'
    );
  }

  // Close handlers
  if (overlay) {
    overlay.querySelector('.spotlight-backdrop').addEventListener('click', closeSpotlight);
    overlay.querySelector('.spotlight-close').addEventListener('click', closeSpotlight);

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSpotlight();
    });
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

  // Keep counter in sync when user scrolls manually
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

  updateCounter();

  // ── GSAP Scroll Reveal ──────────────────────────────────────
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
        opacity: 0, y: 50, scale: 0.95, duration: 0.9, stagger: 0.18, ease: 'power3.out'
      }, '-=0.3')
      .from('.carousel-nav', {
        opacity: 0, y: 10, duration: 0.5, ease: 'power3.out'
      }, '-=0.5');
  }
}
