/**
 * ==========================================================================
 * URBAN 101 – STAGE EXPANSION & CONTROLLER
 * Tactile expanded state for in-depth session examination
 * ==========================================================================
 */

import { SESSIONS } from './session-data.js';

export function createStageController({ wrapper, stage, track, getCards, getThumbBtns, updateCounter }) {
  let currentIndex = 0;
  let isExpanded = false;
  let isTransitioning = false;

  function populateStage(index) {
    if (!stage) return;
    const data = SESSIONS[index];
    const stageCard = stage.querySelector('.stage-card');
    if (!data || !stageCard) return;

    stageCard.setAttribute('data-accent', data.accent);

    const photo = stage.querySelector('.stage-photo');
    if (photo) {
      photo.src = data.photo;
      photo.alt = data.speaker;
    }

    const setTxt = (selector, val) => {
      const el = stage.querySelector(selector);
      if (el) el.textContent = val || '';
    };

    setTxt('.stage-edition-badge', data.edition);
    setTxt('.stage-topic', data.topic);
    setTxt('.stage-speaker-name', data.speaker);
    setTxt('.stage-speaker-role', data.role);
    setTxt('.stage-desc', data.desc);
    setTxt('.stage-lens-text', data.lens);

    const linkBtn = stage.querySelector('.stage-register-btn');
    if (linkBtn) {
      linkBtn.href = data.link;
    }
  }

  function expandSession(index) {
    if (!stage || isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    isExpanded = true;

    populateStage(currentIndex);
    updateCounter(currentIndex);

    const cards = getCards();
    if (typeof gsap === 'undefined') {
      wrapper.classList.add('is-expanded');
      stage.setAttribute('aria-hidden', 'false');
      isTransitioning = false;
      return;
    }

    const clickedCard = cards[index];
    const siblingCards = Array.from(cards).filter((_, i) => i !== index);

    const exitTl = gsap.timeline();

    siblingCards.forEach((sibling, sIdx) => {
      const inner = sibling.querySelector('.session-card-inner') || sibling;
      exitTl.to(inner, {
        opacity: 0,
        y: 24,
        scale: 0.92,
        duration: 0.28,
        delay: sIdx * 0.02,
        ease: 'power3.in'
      }, 0);
    });

    if (clickedCard) {
      const clickedInner = clickedCard.querySelector('.session-card-inner') || clickedCard;
      exitTl.to(clickedInner, {
        scale: 1.03,
        y: -8,
        duration: 0.32,
        ease: 'power2.out'
      }, 0);
    }

    exitTl.add(() => {
      wrapper.classList.add('is-expanded');
      stage.setAttribute('aria-hidden', 'false');

      gsap.set(cards, { clearProps: 'all' });
      cards.forEach(c => gsap.set(c.querySelectorAll('.card-content > *, .card-photo, .card-hint, .session-card-inner'), { clearProps: 'all' }));
      gsap.set(track, { clearProps: 'all' });

      const stageCard = stage.querySelector('.stage-card');
      const stagePhoto = stage.querySelector('.stage-photo');
      const contentKids = stage.querySelectorAll('.stage-content > *');

      const enterTl = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
        }
      });

      enterTl
        .fromTo(stageCard,
          { opacity: 0, scale: 0.94, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(stagePhoto,
          { scale: 1.14, filter: 'grayscale(50%)' },
          { scale: 1, filter: 'grayscale(0%)', duration: 0.85, ease: 'power3.out' },
          '-=0.55'
        )
        .fromTo(contentKids,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.04, ease: 'power3.out' },
          '-=0.5'
        );

      stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0.25);
  }

  function switchSession(newIndex, direction = 1) {
    if (newIndex < 0) newIndex = SESSIONS.length - 1;
    if (newIndex >= SESSIONS.length) newIndex = 0;
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
    const slideDist = direction > 0 ? 20 : -20;

    const switchTl = gsap.timeline({
      onComplete: () => {
        isTransitioning = false;
      }
    });

    switchTl
      .to(contentChildren, { opacity: 0, y: slideDist, stagger: 0.02, duration: 0.2, ease: 'power2.in' }, 0)
      .to(stagePhoto, { opacity: 0.3, scale: 0.98, duration: 0.2, ease: 'power2.in' }, 0)
      .add(() => {
        populateStage(currentIndex);
      })
      .fromTo(stagePhoto,
        { opacity: 0.3, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' }
      )
      .fromTo(contentChildren,
        { opacity: 0, y: -slideDist },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out' },
        '-=0.45'
      );
  }

  function collapseSession(onCollapseComplete) {
    if (!isExpanded || isTransitioning) return;
    isTransitioning = true;

    if (typeof gsap === 'undefined') {
      wrapper.classList.remove('is-expanded');
      stage.setAttribute('aria-hidden', 'true');
      isExpanded = false;
      isTransitioning = false;
      if (onCollapseComplete) onCollapseComplete(currentIndex);
      return;
    }

    const stageCard = stage.querySelector('.stage-card');
    const cards = getCards();

    gsap.to(stageCard, {
      opacity: 0,
      scale: 0.94,
      y: 25,
      duration: 0.32,
      ease: 'power2.inOut',
      onComplete: () => {
        wrapper.classList.remove('is-expanded');
        stage.setAttribute('aria-hidden', 'true');
        isExpanded = false;

        gsap.set(stageCard, { clearProps: 'all' });
        gsap.set(track, { clearProps: 'all' });
        track.style.display = 'flex';

        cards.forEach(c => gsap.set(c.querySelectorAll('.card-content > *, .card-photo, .card-hint, .session-card-inner'), { clearProps: 'all' }));

        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
            onComplete: () => {
              isTransitioning = false;
              if (onCollapseComplete) onCollapseComplete(currentIndex);
            }
          }
        );
      }
    });
  }

  return {
    expandSession,
    switchSession,
    collapseSession,
    isExpandedState: () => isExpanded,
    getCurrentIndex: () => currentIndex
  };
}
