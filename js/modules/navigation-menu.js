/**
 * ==========================================================================
 * IMMERSIVE NAVIGATION MENU MODULE
 * Orchestrates GSAP timelines, tactile physics, spatial depth,
 * and individual component choreography for Leadership XYZ.
 * ==========================================================================
 */

export function initNavigationMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const overlay = document.querySelector('#navOverlay');
  const mainContent = document.querySelector('main');

  if (!menuBtn || !overlay) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isOpen = false;
  let isAnimating = false;

  // Query choreographable elements
  const eyebrowLabels = overlay.querySelectorAll('.nav-eyebrow');
  const dividerLines = overlay.querySelectorAll('.nav-divider-line');
  const chapterCards = overlay.querySelectorAll('.nav-chapter-card');
  const chapterMasks = overlay.querySelectorAll('.nav-chapter-card .nav-mask-inner');
  const chapterBadges = overlay.querySelectorAll('.nav-status-badge');
  const chapterArrows = overlay.querySelectorAll('.nav-chapter-arrow');
  const chapterDescs = overlay.querySelectorAll('.nav-chapter-desc');
  const bookLinks = overlay.querySelectorAll('.nav-book-link');
  const actionsPanel = overlay.querySelector('.nav-actions-panel');
  const footerRow = overlay.querySelector('.nav-overlay-footer');
  const closeTriggers = overlay.querySelectorAll('[data-close-nav]');

  // Initialize GSAP states if available
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    // 1. Tactile Menu Button Physics (Micro-interactions)
    const btnLabel = menuBtn.querySelector('.nav-menu-label');
    const btnIcon = menuBtn.querySelector('.nav-menu-icon');

    menuBtn.addEventListener('mouseenter', () => {
      if (isOpen) return;
      gsap.to(menuBtn, { scale: 1.05, y: -1, duration: 0.28, ease: 'power2.out' });
      if (btnLabel) gsap.to(btnLabel, { x: 2, duration: 0.25, ease: 'power2.out' });
      if (btnIcon) gsap.to(btnIcon, { x: -2, rotate: -4, duration: 0.28, ease: 'power2.out' });
    });

    menuBtn.addEventListener('mouseleave', () => {
      if (isOpen) return;
      gsap.to(menuBtn, { scale: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      if (btnLabel) gsap.to(btnLabel, { x: 0, duration: 0.3, ease: 'power2.out' });
      if (btnIcon) gsap.to(btnIcon, { x: 0, rotate: 0, duration: 0.35, ease: 'power2.out' });
    });

    // 2. Link Hover Physics
    chapterCards.forEach(card => {
      const arrow = card.querySelector('.nav-chapter-arrow');
      const title = card.querySelector('.nav-chapter-title');
      const badge = card.querySelector('.nav-status-badge');

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -3, duration: 0.3, ease: 'power2.out' });
        if (title) gsap.to(title, { x: 6, duration: 0.28, ease: 'power2.out' });
        if (arrow) gsap.to(arrow, { x: 4, scale: 1.1, duration: 0.3, ease: 'back.out(1.4)' });
        if (badge) gsap.to(badge, { scale: 1.04, duration: 0.25, ease: 'power1.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.35, ease: 'power2.out' });
        if (title) gsap.to(title, { x: 0, duration: 0.3, ease: 'power2.out' });
        if (arrow) gsap.to(arrow, { x: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
        if (badge) gsap.to(badge, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  // Master Entrance Choreography (Slow, Smooth, Luxury UI)
  function buildOpenTimeline() {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onStart: () => {
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        menuBtn.classList.add('is-active');
        menuBtn.setAttribute('aria-expanded', 'true');
        const label = menuBtn.querySelector('.nav-menu-label');
        if (label) label.textContent = 'Close';
        if (mainContent) mainContent.classList.add('page-receded');
        document.body.style.overflow = 'hidden';
      },
      onComplete: () => {
        isAnimating = false;
      }
    });

    if (prefersReducedMotion) {
      tl.to(overlay, { opacity: 1, duration: 0.25 });
      return tl;
    }

    // Immediate tactile click resistance & button compression
    tl.fromTo(menuBtn, { scale: 0.92 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' }, 0);

    // Overlay container spatial slide & fade
    tl.fromTo(overlay,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      0
    );

    // Eyebrow and decorative lines assemble
    if (eyebrowLabels.length) {
      tl.fromTo(eyebrowLabels,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
        0.18
      );
    }

    if (dividerLines.length) {
      tl.fromTo(dividerLines,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.55, stagger: 0.08 },
        0.22
      );
    }

    // Chapters staggered entrance
    if (chapterCards.length) {
      tl.fromTo(chapterCards,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out' },
        0.25
      );
    }

    // Masked chapter titles reveal
    if (chapterMasks.length) {
      tl.fromTo(chapterMasks,
        { y: '105%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.55, stagger: 0.09, ease: 'power3.out' },
        0.28
      );
    }

    // Badges pop with slight overshoot
    if (chapterBadges.length) {
      tl.fromTo(chapterBadges,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)' },
        0.35
      );
    }

    // Interactive circular arrows slide in
    if (chapterArrows.length) {
      tl.fromTo(chapterArrows,
        { x: -16, opacity: 0, rotate: -30 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(1.3)' },
        0.38
      );
    }

    // Chapter descriptions gently arrive
    if (chapterDescs.length) {
      tl.fromTo(chapterDescs,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
        0.42
      );
    }

    // Book overview links cascade
    if (bookLinks.length) {
      tl.fromTo(bookLinks,
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' },
        0.32
      );
    }

    // Marketplace / actions card surfaces
    if (actionsPanel) {
      tl.fromTo(actionsPanel,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.45
      );
    }

    // Footer tagline arrives last
    if (footerRow) {
      tl.fromTo(footerRow,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.55
      );
    }

    return tl;
  }

  // Master Exit Choreography (Snappy, Controlled Reverse)
  function buildCloseTimeline() {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.in' },
      onStart: () => {
        menuBtn.classList.remove('is-active');
        menuBtn.setAttribute('aria-expanded', 'false');
        const label = menuBtn.querySelector('.nav-menu-label');
        if (label) label.textContent = 'Menu';
        if (mainContent) mainContent.classList.remove('page-receded');
      },
      onComplete: () => {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isAnimating = false;
      }
    });

    if (prefersReducedMotion) {
      tl.to(overlay, { opacity: 0, duration: 0.2 });
      return tl;
    }

    // Button tactile snap back
    tl.to(menuBtn, { scale: 0.95, duration: 0.15, ease: 'power1.in' }, 0);
    tl.to(menuBtn, { scale: 1, duration: 0.25, ease: 'power2.out' }, 0.15);

    // Retract secondary actions and footer
    if (footerRow) tl.to(footerRow, { opacity: 0, duration: 0.2 }, 0);
    if (actionsPanel) tl.to(actionsPanel, { opacity: 0, y: 15, duration: 0.22 }, 0.05);

    // Retract links and chapters with quick reverse stagger
    if (bookLinks.length) {
      tl.to(bookLinks, { opacity: 0, x: 15, duration: 0.25, stagger: 0.04 }, 0.05);
    }

    if (chapterCards.length) {
      tl.to(chapterCards, { opacity: 0, y: -15, duration: 0.3, stagger: 0.05 }, 0.08);
    }

    // Retract overlay canvas
    tl.to(overlay, { opacity: 0, y: -15, duration: 0.38, ease: 'power3.inOut' }, 0.18);

    return tl;
  }

  // Toggle Function
  function toggleMenu() {
    if (isAnimating) return;
    isAnimating = true;

    if (typeof gsap === 'undefined') {
      isOpen = !isOpen;
      overlay.classList.toggle('is-open', isOpen);
      menuBtn.classList.toggle('is-active', isOpen);
      if (mainContent) mainContent.classList.toggle('page-receded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      isAnimating = false;
      return;
    }

    if (!isOpen) {
      isOpen = true;
      buildOpenTimeline().play();
    } else {
      isOpen = false;
      buildCloseTimeline().play();
    }
  }

  // Event Listeners
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  closeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isOpen) toggleMenu();
    });
  });

  // Keyboard accessibility: Escape to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu();
    }
  });

  // Close when clicking empty backdrop
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      toggleMenu();
    }
  });

  // Close when clicking an anchor link inside overlay
  const internalNavLinks = overlay.querySelectorAll('a[href^="#"], a[href$=".html"]');
  internalNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        toggleMenu();
      }
    });
  });
}
