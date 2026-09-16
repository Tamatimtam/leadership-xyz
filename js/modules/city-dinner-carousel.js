/**
 * ==========================================================================
 * CITY OVER DINNER – Carousel & In-Place Section Expand Controller
 *
 * Interaction Model:
 *   1. Overview State:
 *      - 3 cards side-by-side with photo hover (grayscale-to-color lift).
 *      - Counter updates as user scrolls or clicks prev/next.
 *   2. Expand Interaction:
 *      - Clicking any card expands it in-place to fill the entire section width.
 *      - Sibling cards minimize into a quick-access thumbnail strip.
 *      - Carousel nav (`‹ 01 / 03 ›`) becomes the hero switcher between sessions.
 *   3. Navigation in Expanded State:
 *      - Prev / Next buttons glide between expanded sessions with GSAP crossfade.
 *      - Clicking any minimized thumbnail switches to that session.
 *   4. Collapse Interaction:
 *      - Clicking "All Sessions" or pressing Esc collapses the stage back
 *        to the 3-card overview grid.
 * ==========================================================================
 */

export function initCityDinnerCarousel() {
  const wrapper = document.querySelector('.city-dinner-carousel-wrapper');
  const track = document.querySelector('.city-dinner-carousel');
  if (!wrapper || !track) return;

  const cards = track.querySelectorAll('.session-card');
  const stage = document.getElementById('city-dinner-stage');
  const closeBtn = document.getElementById('stage-close-btn');
  const prevBtn = wrapper.querySelector('.carousel-btn-prev');
  const nextBtn = wrapper.querySelector('.carousel-btn-next');
  const counter = wrapper.querySelector('.carousel-counter');
  const thumbBtns = wrapper.querySelectorAll('.stage-thumb-btn');

  let currentIndex = 0;
  let isExpanded = false;

  // ── Session Chronicle Data ───────────────────────────────────
  const sessionData = [
    {
      edition: 'Vol. 01 · Public Spaces',
      topic: "Do's and Don'ts Steps to Build Public Spaces",
      speaker: 'Her Pramtama',
      role: 'Principal Architect & Urbanist',
      desc: 'Spatial leadership and civic ownership — how thoughtful design of public spaces can transform communities. This session explored the principles behind creating spaces that invite civic participation, the common pitfalls in public space development, and the courage required to champion designs that serve people over profit.',
      lens: 'Spatial Leadership & Civic Ownership',
      accent: 'violet',
      photo: 'assets/images/speaker-her.jpg'
    },
    {
      edition: 'Vol. 02 · Urbanism',
      topic: 'Ctrl+C and Ctrl+V Singapore Urbanism — Should We Do It?',
      speaker: 'Prof. Sulfikar Amir',
      role: 'Associate Professor of Science, Technology & Society',
      desc: 'Public policy adaptation and democratic infrastructure — can we copy Singapore, and should we? A provocative dinner conversation about what happens when developing nations borrow urban planning models wholesale, the hidden assumptions embedded in foreign infrastructure, and the democratic cost of technocratic efficiency.',
      lens: 'Public Policy & Democratic Infrastructure',
      accent: 'cobalt',
      photo: 'assets/images/speaker-sulfikar.jpg'
    },
    {
      edition: 'Vol. 03 · Enterprise',
      topic: 'How to Spark Life in the City: Career, Enterprise & Community',
      speaker: 'Roni Pramaditia',
      role: 'Community Builder & Social Entrepreneur',
      desc: 'Grassroots enterprise and youth mobilization — igniting civic energy from the ground up. Roni shared his journey of building community-driven ventures that transform neighborhoods, exploring how young leaders can create economic opportunity while strengthening the social fabric of their cities.',
      lens: 'Grassroots Enterprise & Youth Mobilization',
      accent: 'green',
      photo: 'assets/images/speaker-roni.jpg'
    }
  ];

  // ── Populate Stage Elements ──────────────────────────────────
  function populateStage(index) {
    if (!stage) return;
    const data = sessionData[index];
    const stageCard = stage.querySelector('.stage-card');

    stageCard.setAttribute('data-accent', data.accent);

    const photo = stage.querySelector('.stage-photo');
    photo.src = data.photo;
    photo.alt = data.speaker;

    stage.querySelector('.stage-edition-badge').textContent = data.edition;
    stage.querySelector('.stage-topic').textContent = data.topic;
    stage.querySelector('.stage-speaker-name').textContent = data.speaker;
    stage.querySelector('.stage-speaker-role').textContent = data.role;
    stage.querySelector('.stage-desc').textContent = data.desc;
    stage.querySelector('.stage-lens-text').textContent = data.lens;
  }

  // ── Update Counter Display ───────────────────────────────────
  function updateCounter(index) {
    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    }
    // Sync minimized thumbnails
    thumbBtns.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
    });
  }

  // ── Expand Session to In-Place Stage ─────────────────────────
  function expandSession(index) {
    if (!stage) return;
    currentIndex = index;
    isExpanded = true;

    populateStage(currentIndex);
    updateCounter(currentIndex);

    // Fade overview track slightly before switching
    if (typeof gsap !== 'undefined') {
      gsap.to(track, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          wrapper.classList.add('is-expanded');
          stage.setAttribute('aria-hidden', 'false');

          // GSAP Entrance Choreography for Stage
          const stageCard = stage.querySelector('.stage-card');
          const stagePhoto = stage.querySelector('.stage-photo');
          const contentChildren = stage.querySelectorAll('.stage-content > *');
          const closeButton = stage.querySelector('.stage-close-btn');

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          tl.fromTo(stageCard,
            { opacity: 0, scale: 0.96, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.55 }
          )
          .fromTo(stagePhoto,
            { scale: 1.12, filter: 'grayscale(70%) brightness(0.7)' },
            { scale: 1, filter: 'grayscale(0%) brightness(1)', duration: 0.7 },
            '-=0.4'
          )
          .fromTo(contentChildren,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 },
            '-=0.45'
          )
          .fromTo(closeButton,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.35 },
            '-=0.3'
          )
          .fromTo('.stage-minimized-strip',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4 },
            '-=0.3'
          );

          // Gently scroll stage into view if needed
          stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    } else {
      wrapper.classList.add('is-expanded');
      stage.setAttribute('aria-hidden', 'false');
    }
  }

  // ── Switch Between Sessions in Expanded State ─────────────────
  function switchSession(newIndex, direction = 1) {
    if (newIndex < 0) newIndex = sessionData.length - 1;
    if (newIndex >= sessionData.length) newIndex = 0;
    if (newIndex === currentIndex) return;

    currentIndex = newIndex;
    updateCounter(currentIndex);

    if (typeof gsap !== 'undefined') {
      const stagePhoto = stage.querySelector('.stage-photo');
      const stageContent = stage.querySelector('.stage-content');
      const slideDist = direction > 0 ? 25 : -25;

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.to([stagePhoto, stageContent], {
        opacity: 0.2,
        y: slideDist,
        duration: 0.2,
        onComplete: () => {
          populateStage(currentIndex);
        }
      })
      .fromTo([stagePhoto, stageContent],
        { opacity: 0.2, y: -slideDist },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      populateStage(currentIndex);
    }
  }

  // ── Collapse Session Back to Overview ────────────────────────
  function collapseSession() {
    if (!isExpanded) return;

    if (typeof gsap !== 'undefined') {
      const stageCard = stage.querySelector('.stage-card');

      gsap.to(stageCard, {
        opacity: 0,
        scale: 0.96,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          wrapper.classList.remove('is-expanded');
          stage.setAttribute('aria-hidden', 'true');
          isExpanded = false;

          // Restore track
          gsap.fromTo(track,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
          );

          // Scroll overview card into view
          scrollToOverviewCard(currentIndex);
        }
      });
    } else {
      wrapper.classList.remove('is-expanded');
      stage.setAttribute('aria-hidden', 'true');
      isExpanded = false;
      scrollToOverviewCard(currentIndex);
    }
  }

  // ── Overview Track Scroll ────────────────────────────────────
  function scrollToOverviewCard(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    currentIndex = index;

    cards[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });

    updateCounter(currentIndex);
  }

  // ── Event Listeners ──────────────────────────────────────────

  // Card click expands to section stage
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      expandSession(index);
    });
  });

  // Close / Collapse button
  if (closeBtn) {
    closeBtn.addEventListener('click', collapseSession);
  }

  // Minimized thumbnail strip buttons
  thumbBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const targetSession = parseInt(btn.getAttribute('data-session') || index, 10);
      const dir = targetSession > currentIndex ? 1 : -1;
      switchSession(targetSession, dir);
    });
  });

  // Prev button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isExpanded) {
        switchSession(currentIndex - 1, -1);
      } else {
        scrollToOverviewCard(currentIndex - 1);
      }
    });
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isExpanded) {
        switchSession(currentIndex + 1, 1);
      } else {
        scrollToOverviewCard(currentIndex + 1);
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!isExpanded) return;
    if (e.key === 'Escape') {
      collapseSession();
    } else if (e.key === 'ArrowRight') {
      switchSession(currentIndex + 1, 1);
    } else if (e.key === 'ArrowLeft') {
      switchSession(currentIndex - 1, -1);
    }
  });

  // Synchronize counter on manual touch/mouse scroll in overview
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    if (isExpanded) return;
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
      updateCounter(currentIndex);
    }, 80);
  });

  updateCounter(0);

  // ── GSAP Initial Scroll Reveal for the Section ───────────────
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
      .from('.carousel-control-bar', {
        opacity: 0, y: 10, duration: 0.5, ease: 'power3.out'
      }, '-=0.5');
  }
}
