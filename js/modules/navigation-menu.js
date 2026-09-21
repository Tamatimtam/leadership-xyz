/**
 * ==========================================================================
 * MINIMALIST EDITORIAL NAVIGATION MENU MODULE
 * Orchestrates slow, cinematic, luxury GSAP choreography,
 * tactile button physics, and pure typographic reveals.
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

  // Elements to choreograph
  const eyebrowLabels = overlay.querySelectorAll('.nav-eyebrow');
  const chapterItems = overlay.querySelectorAll('.nav-chapter-item');
  const chapterMasks = overlay.querySelectorAll('.nav-chapter-item .nav-mask-inner');
  const chapterNumbers = overlay.querySelectorAll('.nav-item-num');
  const chapterArrows = overlay.querySelectorAll('.nav-item-arrow');
  const bookLinks = overlay.querySelectorAll('.nav-book-link');
  const bookMasks = overlay.querySelectorAll('.nav-book-link .nav-mask-inner');
  const orderSection = overlay.querySelector('.nav-order-row');
  const orderLinks = overlay.querySelectorAll('.nav-order-link');

  // 1. Tactile Menu Button Physics
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    const btnLabel = menuBtn.querySelector('.nav-menu-label');
    const btnIcon = menuBtn.querySelector('.nav-menu-icon');

    menuBtn.addEventListener('mouseenter', () => {
      if (isOpen) return;
      gsap.to(menuBtn, { scale: 1.04, duration: 0.3, ease: 'power2.out' });
      if (btnLabel) gsap.to(btnLabel, { x: 2, duration: 0.28, ease: 'power2.out' });
      if (btnIcon) gsap.to(btnIcon, { x: -2, rotate: -4, duration: 0.3, ease: 'power2.out' });
    });

    menuBtn.addEventListener('mouseleave', () => {
      if (isOpen) return;
      gsap.to(menuBtn, { scale: 1, duration: 0.35, ease: 'power2.out' });
      if (btnLabel) gsap.to(btnLabel, { x: 0, duration: 0.3, ease: 'power2.out' });
      if (btnIcon) gsap.to(btnIcon, { x: 0, rotate: 0, duration: 0.35, ease: 'power2.out' });
    });

    // Chapter Row Hover Dynamics
    chapterItems.forEach(item => {
      const arrow = item.querySelector('.nav-item-arrow');
      const title = item.querySelector('.nav-item-title');
      const num = item.querySelector('.nav-item-num');

      item.addEventListener('mouseenter', () => {
        if (title) gsap.to(title, { x: 8, duration: 0.35, ease: 'power2.out' });
        if (arrow) gsap.to(arrow, { x: 6, opacity: 1, duration: 0.35, ease: 'power2.out' });
        if (num) gsap.to(num, { opacity: 1, duration: 0.3 });
      });

      item.addEventListener('mouseleave', () => {
        if (title) gsap.to(title, { x: 0, duration: 0.35, ease: 'power2.out' });
        if (arrow) gsap.to(arrow, { x: 0, opacity: 0.4, duration: 0.35, ease: 'power2.out' });
        if (num) gsap.to(num, { opacity: 0.7, duration: 0.3 });
      });
    });
  }

  // 2. Master Entrance Choreography (Slow, Cinematic, Unhurried Luxury)
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
      tl.to(overlay, { opacity: 1, duration: 0.3 });
      return tl;
    }

    // Button tactile compress & release
    tl.fromTo(menuBtn, { scale: 0.93 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, 0);

    // Overlay container spatial fade & slight descent
    tl.fromTo(overlay,
      { opacity: 0, y: -25 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      0
    );

    // Eyebrow labels arrive unhurriedly
    if (eyebrowLabels.length) {
      tl.fromTo(eyebrowLabels,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        0.2
      );
    }

    // Chapter item borders unroll
    if (chapterItems.length) {
      tl.fromTo(chapterItems,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' },
        0.28
      );
    }

    // Chapter masked titles reveal like majestic editorial print
    if (chapterMasks.length) {
      tl.fromTo(chapterMasks,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.75, stagger: 0.14, ease: 'power3.out' },
        0.32
      );
    }

    // Chapter index numbers slide into place
    if (chapterNumbers.length) {
      tl.fromTo(chapterNumbers,
        { opacity: 0, x: -10 },
        { opacity: 0.75, x: 0, duration: 0.5, stagger: 0.14 },
        0.35
      );
    }

    // Subtle arrow indicators drift in
    if (chapterArrows.length) {
      tl.fromTo(chapterArrows,
        { opacity: 0, x: -14 },
        { opacity: 0.4, x: 0, duration: 0.5, stagger: 0.14 },
        0.42
      );
    }

    // Secondary Book links cascade
    if (bookLinks.length) {
      tl.fromTo(bookLinks,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
        0.38
      );
    }

    if (bookMasks.length) {
      tl.fromTo(bookMasks,
        { y: '105%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
        0.42
      );
    }

    // Order text links reveal with relaxed timing
    if (orderSection) {
      tl.fromTo(orderSection,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.6
      );
    }

    if (orderLinks.length) {
      tl.fromTo(orderLinks,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
        0.68
      );
    }

    return tl;
  }

  // 3. Master Exit Choreography (Snappy, Clean Reverse)
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

    // Button snap back
    tl.to(menuBtn, { scale: 0.95, duration: 0.15, ease: 'power1.in' }, 0);
    tl.to(menuBtn, { scale: 1, duration: 0.25, ease: 'power2.out' }, 0.15);

    // Retract links and overlay promptly
    if (orderSection) tl.to(orderSection, { opacity: 0, duration: 0.18 }, 0);
    if (bookLinks.length) tl.to(bookLinks, { opacity: 0, y: -8, duration: 0.22, stagger: 0.03 }, 0.04);
    if (chapterItems.length) tl.to(chapterItems, { opacity: 0, y: -10, duration: 0.25, stagger: 0.04 }, 0.08);

    tl.to(overlay, { opacity: 0, y: -15, duration: 0.35, ease: 'power3.inOut' }, 0.15);

    return tl;
  }

  // Toggle Action
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

  // Escape to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu();
    }
  });

  // Click on backdrop to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      toggleMenu();
    }
  });

  // Close when clicking an anchor link inside overlay
  const navLinks = overlay.querySelectorAll('a[href]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        toggleMenu();
      }
    });
  });

  // Prevent accidental pinch-to-zoom gestures on iOS Safari
  document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
  }, { passive: false });
}
