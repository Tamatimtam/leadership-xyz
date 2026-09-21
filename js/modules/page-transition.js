/**
 * ==========================================================================
 * KINETIC PAGE TRANSITION SYSTEM
 * Manages dual-tone shutter wipes, theatrical unveils,
 * and zero-flash inter-page navigation without boring fade-ins.
 * ==========================================================================
 */

const STORAGE_KEY = 'xyz_page_transition';

export function initPageTransitions() {
  const curtain = document.querySelector('.page-transition-curtain');
  const mainContent = document.querySelector('main');

  if (!curtain) return;

  const leadPanel = curtain.querySelector('.transition-panel-lead');
  const basePanel = curtain.querySelector('.transition-panel-base');
  const emblem = curtain.querySelector('.transition-emblem-wrap');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let isNavigating = false;

  // 1. ARRIVAL / ENTER ANIMATION (New page transition animation comes OUT)
  const wasTransitioning = sessionStorage.getItem(STORAGE_KEY) === 'active';

  if (wasTransitioning && typeof gsap !== 'undefined' && !prefersReducedMotion) {
    sessionStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove('is-page-transitioning');
    curtain.classList.add('is-active');

    // Ensure panels start fully covering the screen at 0
    gsap.set(basePanel, { yPercent: 0, clearProps: 'transform' });
    gsap.set(leadPanel, { yPercent: 0, clearProps: 'transform' });
    gsap.set([basePanel, leadPanel], { yPercent: 0 });
    gsap.set(emblem, { opacity: 1, scale: 1, y: 0 });
    if (mainContent) gsap.set(mainContent, { y: 24 });

    // Animate curtain OUT (revealing new page)
    const enterTl = gsap.timeline({
      delay: 0.06,
      defaults: { ease: 'power4.inOut' },
      onComplete: () => {
        curtain.classList.remove('is-active');
        gsap.set([leadPanel, basePanel], { yPercent: 100 });
        gsap.set(emblem, { opacity: 0, scale: 0.9, y: 20 });
        if (mainContent) gsap.set(mainContent, { y: 0 });
      }
    });

    // Emblem launches upward first
    enterTl.to(emblem, { y: -30, opacity: 0, scale: 1.05, duration: 0.22, ease: 'power2.in' }, 0);

    // The base shield sweeps up off the top
    enterTl.to(basePanel, { yPercent: -100, duration: 0.44, ease: 'power4.inOut' }, 0.08);

    // The accent blade snaps out slightly behind with elastic momentum
    enterTl.to(leadPanel, { yPercent: -100, duration: 0.48, ease: 'power4.inOut' }, 0.12);

    // Content rises into place with physical spring
    if (mainContent) {
      enterTl.to(mainContent, { y: 0, duration: 0.5, ease: 'power3.out' }, 0.16);
    }
  } else {
    sessionStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove('is-page-transitioning');
    curtain.classList.remove('is-active');
    if (typeof gsap !== 'undefined') {
      gsap.set([leadPanel, basePanel], { yPercent: 100 });
      gsap.set(emblem, { opacity: 0, scale: 0.9, y: 20 });
    }
  }

  // 2. DEPARTURE / EXIT ANIMATION (Current page transition animation comes IN)
  function triggerPageTransition(targetUrl) {
    if (isNavigating) return;
    isNavigating = true;

    if (typeof gsap === 'undefined' || prefersReducedMotion) {
      window.location.href = targetUrl;
      return;
    }

    curtain.classList.add('is-active');

    // Reset starting positions below the viewport
    gsap.set([leadPanel, basePanel], { yPercent: 100, clearProps: 'transform' });
    gsap.set(leadPanel, { yPercent: 100 });
    gsap.set(basePanel, { yPercent: 100 });
    gsap.set(emblem, { opacity: 0, scale: 0.85, y: 30 });

    const exitTl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        // Now that the screen is completely covered, navigate to target
        sessionStorage.setItem(STORAGE_KEY, 'active');
        window.location.href = targetUrl;
      }
    });

    // Lead accent blade shoots up first
    exitTl.to(leadPanel, { yPercent: 0, duration: 0.38, ease: 'power3.inOut' }, 0);

    // Base shield follows with tight trailing lag
    exitTl.to(basePanel, { yPercent: 0, duration: 0.42, ease: 'power3.inOut' }, 0.05);

    // Emblem springs into the center with tactile overshoot
    exitTl.to(emblem, { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: 'back.out(1.4)' }, 0.12);
  }

  // 3. INTERCEPT INTERNAL NAVIGATION CLICKS (CAPTURE PHASE)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    // Ignore modified clicks (Ctrl, Cmd, Shift, Alt, middle-click) or new tabs
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || link.target === '_blank') {
      return;
    }

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore hash-only or external protocols
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      return;
    }

    // Determine target URL
    const targetUrl = new URL(link.href, window.location.origin);
    const currentUrl = new URL(window.location.href);

    // Ignore if same page anchor scroll
    if (targetUrl.pathname === currentUrl.pathname) return;

    // Only intercept HTML page navigation
    if (targetUrl.pathname.endsWith('.html') || targetUrl.pathname === '/' || href.includes('.html')) {
      e.preventDefault();
      e.stopPropagation();
      triggerPageTransition(link.href);
    }
  }, true); // Use capture phase so we always intercept before anything else

  // 4. BFCache / Back-Forward Browser Navigation Safety
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      curtain.classList.remove('is-active');
      document.documentElement.classList.remove('is-page-transitioning');
      if (typeof gsap !== 'undefined') {
        gsap.set([leadPanel, basePanel], { yPercent: 100 });
        gsap.set(emblem, { opacity: 0 });
      }
      isNavigating = false;
    }
  });
}
