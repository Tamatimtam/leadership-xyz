/**
 * ==========================================================================
 * CITY OVER DINNER – Carousel & In-Place Section Expand Controller
 *
 * Micro-Choreographed, Tactile Motion System:
 *   - Sibling cards and clicked card have unique, staggered physical exits
 *   - Stage entrance is seamless, overlapping, weighted, and deeply layered
 *   - Collapse animation completely restores overview track with staggered bounce
 *   - Switching sessions features direction-aware slide & photo reveal
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
  let isTransitioning = false;

  // ── Session Data (Strict brand tokens: indigo, emerald, nav-pill) ────────
  const sessionData = [
    {
      edition: 'Vol. 01 · Public Spaces',
      topic: "Do's and Don'ts Steps to Build Public Spaces",
      speaker: 'Her Pramtama',
      role: 'Principal Architect & Urbanist',
      desc: 'Spatial leadership and civic ownership — how thoughtful design of public spaces can transform communities. This session explored the principles behind creating spaces that invite civic participation, the common pitfalls in public space development, and the courage required to champion designs that serve people over profit.',
      lens: 'Spatial Leadership & Civic Ownership',
      accent: 'indigo',
      photo: 'assets/images/speaker-her.jpg'
    },
    {
      edition: 'Vol. 02 · Urbanism',
      topic: 'Ctrl+C and Ctrl+V Singapore Urbanism — Should We Do It?',
      speaker: 'Prof. Sulfikar Amir',
      role: 'Associate Professor of Science, Technology & Society',
      desc: 'Public policy adaptation and democratic infrastructure — can we copy Singapore, and should we? A provocative dinner conversation about what happens when developing nations borrow urban planning models wholesale, the hidden assumptions embedded in foreign infrastructure, and the democratic cost of technocratic efficiency.',
      lens: 'Public Policy & Democratic Infrastructure',
      accent: 'emerald',
      photo: 'assets/images/speaker-sulfikar.jpg'
    },
    {
      edition: 'Vol. 03 · Enterprise',
      topic: 'How to Spark Life in the City: Career, Enterprise & Community',
      speaker: 'Roni Pramaditia',
      role: 'Community Builder & Social Entrepreneur',
      desc: 'Grassroots enterprise and youth mobilization — igniting civic energy from the ground up. Roni shared his journey of building community-driven ventures that transform neighborhoods, exploring how young leaders can create economic opportunity while strengthening the social fabric of their cities.',
      lens: 'Grassroots Enterprise & Youth Mobilization',
      accent: 'nav-pill',
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

  // ── Update Counter Display & Minimized Strip ─────────────────
  function updateCounter(index) {
    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    }
    thumbBtns.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
    });
  }

  // ── Expand Session (Tactile, Multi-Layered Choreography) ──────
  function expandSession(index) {
    if (!stage || isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    isExpanded = true;

    populateStage(currentIndex);
    updateCounter(currentIndex);

    if (typeof gsap === 'undefined') {
      wrapper.classList.add('is-expanded');
      stage.setAttribute('aria-hidden', 'false');
      isTransitioning = false;
      return;
    }

    const clickedCard = cards[index];
    const siblingCards = Array.from(cards).filter((_, i) => i !== index);

    // 1. Staged exit for overview cards
    const exitTl = gsap.timeline();

    // Sibling cards peel back with momentum
    siblingCards.forEach((sibling, sIdx) => {
      const siblingInner = sibling.querySelector('.session-card-inner');
      const siblingPhoto = sibling.querySelector('.card-photo');
      const siblingContent = sibling.querySelectorAll('.card-content > *');

      exitTl.to(siblingContent, {
        opacity: 0,
        y: 18,
        stagger: 0.03,
        duration: 0.25,
        ease: 'power2.in'
      }, 0);

      exitTl.to(siblingPhoto, {
        scale: 0.94,
        filter: 'grayscale(100%) brightness(0.5)',
        duration: 0.32,
        ease: 'power2.in'
      }, 0);

      exitTl.to(siblingInner || sibling, {
        opacity: 0,
        y: 28,
        scale: 0.90,
        duration: 0.35,
        delay: sIdx * 0.04,
        ease: 'power3.in'
      }, 0);
    });

    // Clicked card leads the expansion
    const clickedInner = clickedCard.querySelector('.session-card-inner');
    const clickedPhoto = clickedCard.querySelector('.card-photo');
    const clickedContent = clickedCard.querySelectorAll('.card-content > *');
    const clickedHint = clickedCard.querySelector('.card-hint');

    if (clickedHint) {
      exitTl.to(clickedHint, { opacity: 0, y: -10, scale: 0.8, duration: 0.2 }, 0);
    }

    exitTl.to(clickedContent, {
      opacity: 0,
      y: -16,
      stagger: 0.03,
      duration: 0.28,
      ease: 'power2.in'
    }, 0);

    exitTl.to(clickedPhoto, {
      scale: 1.08,
      filter: 'grayscale(0%) brightness(1.05)',
      duration: 0.35,
      ease: 'power2.out'
    }, 0);

    exitTl.to(clickedInner || clickedCard, {
      scale: 1.03,
      y: -8,
      duration: 0.35,
      ease: 'power2.out'
    }, 0);

    // 2. Seamless overlap into Stage Entrance
    exitTl.add(() => {
      wrapper.classList.add('is-expanded');
      stage.setAttribute('aria-hidden', 'false');

      // Clear overview inline styles behind the scene
      gsap.set(cards, { clearProps: 'all' });
      cards.forEach(c => gsap.set(c.querySelectorAll('.card-content > *, .card-photo, .card-hint, .session-card-inner'), { clearProps: 'all' }));
      gsap.set(track, { clearProps: 'all' });

      // Elements of the stage to micro-animate
      const stageCard = stage.querySelector('.stage-card');
      const stagePhoto = stage.querySelector('.stage-photo');
      const editionBadge = stage.querySelector('.stage-edition-badge');
      const headerTags = stage.querySelector('.stage-header');
      const topic = stage.querySelector('.stage-topic');
      const speakerWrap = stage.querySelector('.stage-speaker-wrap');
      const divider = stage.querySelector('.stage-divider');
      const desc = stage.querySelector('.stage-desc');
      const lens = stage.querySelector('.stage-lens');
      const stageClose = stage.querySelector('.stage-close-btn');

      const enterTl = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
        }
      });

      // Stage card lands with weighted authority
      enterTl.fromTo(stageCard,
        { opacity: 0, scale: 0.93, y: 38 },
        { opacity: 1, scale: 1, y: 0, duration: 0.78, ease: 'power3.out' }
      )
      // Photo zooms from expanding momentum
      .fromTo(stagePhoto,
        { scale: 1.16, filter: 'grayscale(60%) contrast(1.15) brightness(0.65)' },
        { scale: 1, filter: 'grayscale(0%) contrast(1.05) brightness(1)', duration: 0.95, ease: 'power3.out' },
        '-=0.6'
      )
      // Edition badge drops in with spring
      .fromTo(editionBadge,
        { opacity: 0, y: -18, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.5)' },
        '-=0.65'
      )
      // Header tags glide
      .fromTo(headerTags,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.6'
      )
      // Topic headline sweeps in
      .fromTo(topic,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.55'
      )
      // Speaker wrap
      .fromTo(speakerWrap,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.5'
      )
      // Divider line draws from left to right!
      .fromTo(divider,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.52, ease: 'power2.out' },
        '-=0.45'
      )
      // Narrative paragraph
      .fromTo(desc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.62, ease: 'power3.out' },
        '-=0.42'
      )
      // Lens badge pops with spring
      .fromTo(lens,
        { opacity: 0, y: 16, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.52, ease: 'back.out(1.4)' },
        '-=0.38'
      )
      // Close button snaps in
      .fromTo(stageClose,
        { opacity: 0, scale: 0.75, rotation: -20 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.8)' },
        '-=0.4'
      )
      // Minimized buttons stagger in
      .fromTo(thumbBtns,
        { opacity: 0, y: 14, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07, ease: 'power3.out' },
        '-=0.35'
      );

      stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0.28);
  }

  // ── Switch Sessions in Expanded State (Tactile Direction Glide) ──
  function switchSession(newIndex, direction = 1) {
    if (newIndex < 0) newIndex = sessionData.length - 1;
    if (newIndex >= sessionData.length) newIndex = 0;
    if (newIndex === currentIndex || isTransitioning) return;

    isTransitioning = true;
    currentIndex = newIndex;
    updateCounter(currentIndex);

    if (typeof gsap === 'undefined') {
      populateStage(currentIndex);
      isTransitioning = false;
      return;
    }

    const stagePhoto = stage.querySelector('.stage-photo');
    const contentChildren = stage.querySelectorAll('.stage-content > *');
    const divider = stage.querySelector('.stage-divider');
    const activeThumb = wrapper.querySelector(`.stage-thumb-btn[data-session="${currentIndex}"]`);
    const slideDist = direction > 0 ? 22 : -22;

    const switchTl = gsap.timeline({
      onComplete: () => {
        isTransitioning = false;
      }
    });

    // Content & photo slide out
    switchTl.to(contentChildren, {
      opacity: 0,
      y: slideDist,
      stagger: 0.025,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    .to(stagePhoto, {
      opacity: 0.2,
      scale: 0.97,
      duration: 0.24,
      ease: 'power2.in'
    }, 0)
    .add(() => {
      populateStage(currentIndex);
    })
    // Photo enters with fresh zoom
    .fromTo(stagePhoto,
      { opacity: 0.2, scale: 1.10, filter: 'grayscale(40%)' },
      { opacity: 1, scale: 1, filter: 'grayscale(0%)', duration: 0.65, ease: 'power3.out' }
    )
    // Content glides in from opposite direction
    .fromTo(contentChildren,
      { opacity: 0, y: -slideDist },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, ease: 'power3.out' },
      '-=0.5'
    )
    // Divider redraws
    .fromTo(divider,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.45, ease: 'power2.out' },
      '-=0.45'
    );

    // Active thumb tactile pulse
    if (activeThumb) {
      gsap.fromTo(activeThumb,
        { scale: 0.92 },
        { scale: 1, duration: 0.35, ease: 'back.out(2)' }
      );
    }
  }

  // ── Collapse Session (Guaranteed Track Restore & Staggered Settle) ─
  function collapseSession() {
    if (!isExpanded || isTransitioning) return;
    isTransitioning = true;

    if (typeof gsap === 'undefined') {
      wrapper.classList.remove('is-expanded');
      stage.setAttribute('aria-hidden', 'true');
      isExpanded = false;
      isTransitioning = false;
      scrollToOverviewCard(currentIndex);
      return;
    }

    const stageCard = stage.querySelector('.stage-card');
    const stagePhoto = stage.querySelector('.stage-photo');
    const contentChildren = stage.querySelectorAll('.stage-content > *');

    const collapseTl = gsap.timeline({
      onComplete: () => {
        // 1. Switch back DOM state
        wrapper.classList.remove('is-expanded');
        stage.setAttribute('aria-hidden', 'true');
        isExpanded = false;

        // 2. Clear all inline styles from stage
        gsap.set(stage.querySelectorAll('.stage-card, .stage-photo, .stage-content > *, .stage-close-btn, .stage-edition-badge, .stage-divider'), { clearProps: 'all' });

        // 3. Guaranteed reset of track styles (Prevents invisible track bug!)
        gsap.set(track, { clearProps: 'all' });
        track.style.display = 'flex';
        track.style.opacity = '1';
        track.style.transform = 'none';

        // 4. Clean cards before return animation
        cards.forEach(c => {
          gsap.set(c.querySelectorAll('.card-content > *, .card-photo, .card-hint, .session-card-inner'), { clearProps: 'all' });
        });

        // 5. Staggered, tactile return of the 3 overview cards
        const returnTl = gsap.timeline({
          onComplete: () => {
            isTransitioning = false;
            scrollToOverviewCard(currentIndex);
          }
        });

        returnTl
          .fromTo(cards,
            { opacity: 0, y: 35, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.72, stagger: 0.1, ease: 'power3.out' }
          )
          .fromTo(track.querySelectorAll('.card-photo'),
            { scale: 1.12 },
            { scale: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
            '-=0.6'
          )
          .fromTo(track.querySelectorAll('.card-content > *'),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, ease: 'power3.out' },
            '-=0.55'
          );
      }
    });

    // Stage content descends
    collapseTl
      .to(contentChildren, {
        opacity: 0,
        y: 20,
        stagger: 0.025,
        duration: 0.25,
        ease: 'power2.in'
      }, 0)
      .to(stagePhoto, {
        scale: 0.96,
        filter: 'grayscale(50%) brightness(0.6)',
        duration: 0.3,
        ease: 'power2.in'
      }, 0)
      .to(stageCard, {
        opacity: 0,
        scale: 0.94,
        y: 30,
        duration: 0.36,
        ease: 'power2.inOut'
      }, 0.05);
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

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      expandSession(index);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', collapseSession);
  }

  thumbBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const targetSession = parseInt(btn.getAttribute('data-session') || index, 10);
      const dir = targetSession > currentIndex ? 1 : -1;
      switchSession(targetSession, dir);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isExpanded) {
        switchSession(currentIndex - 1, -1);
      } else {
        scrollToOverviewCard(currentIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isExpanded) {
        switchSession(currentIndex + 1, 1);
      } else {
        scrollToOverviewCard(currentIndex + 1);
      }
    });
  }

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

  // Track scroll counter sync in overview
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

  // ── GSAP Initial Scroll Reveal for Section ───────────────────
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
