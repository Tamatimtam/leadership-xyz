/**
 * ==========================================================================
 * URBAN 101 – MINIMALIST SESSION ARCHIVE WIP MODAL
 * Clean, understated open/close transition with keyboard isolation
 * ==========================================================================
 */

export function initArchiveModal() {
  const backdrop = document.getElementById('session-archive-modal');
  const sheet = backdrop?.querySelector('.archive-modal-sheet');
  const triggerBtn = document.getElementById('stage-archive-btn');
  if (!backdrop || !sheet || !triggerBtn) return;

  const closeBtn = backdrop.querySelector('.archive-modal-close');
  const doneBtn = backdrop.querySelector('.archive-btn-done');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let isOpen = false;
  let activeTl = null;
  let lastFocusedEl = null;

  function openModal() {
    if (activeTl) activeTl.kill();
    lastFocusedEl = document.activeElement;
    isOpen = true;

    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (typeof gsap === 'undefined' || prefersReducedMotion) {
      gsap.set?.([backdrop, sheet], { clearProps: 'all' });
      doneBtn?.focus();
      return;
    }

    activeTl = gsap.timeline({
      onComplete: () => {
        activeTl = null;
        doneBtn?.focus();
      }
    });

    activeTl
      .fromTo(backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.24, ease: 'power2.out' },
        0
      )
      .fromTo(sheet,
        { opacity: 0, y: 14, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: 'power3.out' },
        0.02
      );
  }

  function closeModal() {
    if (!isOpen) return;
    if (activeTl) activeTl.kill();
    isOpen = false;

    const finishClose = () => {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      activeTl = null;
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    };

    if (typeof gsap === 'undefined' || prefersReducedMotion) {
      finishClose();
      return;
    }

    activeTl = gsap.timeline({ onComplete: finishClose });
    activeTl
      .to(sheet, { opacity: 0, y: 8, scale: 0.98, duration: 0.16, ease: 'power2.in' }, 0)
      .to(backdrop, { opacity: 0, duration: 0.18, ease: 'power2.inOut' }, 0);
  }

  triggerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener('click', closeModal);
  doneBtn?.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeModal();
    }
  }, true);
}
