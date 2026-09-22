/**
 * ==========================================================================
 * URBAN 101 – CAROUSEL ORCHESTRATOR
 * Coordinates overview track and connects user interactions to the stage
 * ==========================================================================
 */

import { SESSIONS } from './session-data.js';
import { createStageController } from './stage.js';

export function initCityDinnerCarousel() {
  const wrapper = document.querySelector('.city-dinner-carousel-wrapper');
  const track = document.querySelector('.city-dinner-carousel');
  const stage = document.getElementById('city-dinner-stage');
  if (!wrapper || !track || !stage) return;

  const prevBtn = wrapper.querySelector('.carousel-btn-prev');
  const nextBtn = wrapper.querySelector('.carousel-btn-next');
  const counter = wrapper.querySelector('.carousel-counter');
  const closeBtn = document.getElementById('stage-close-btn');

  const getCards = () => track.querySelectorAll('.session-card');
  const getThumbBtns = () => wrapper.querySelectorAll('.stage-thumb-btn');

  let activeIndex = 0;

  function updateCounter(index) {
    activeIndex = index;
    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(SESSIONS.length).padStart(2, '0')}`;
    }
    const thumbs = getThumbBtns();
    thumbs.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
    });
  }

  function scrollToCard(index) {
    const cards = getCards();
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    activeIndex = index;

    cards[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    updateCounter(activeIndex);
  }

  const stageCtrl = createStageController({
    wrapper,
    stage,
    track,
    getCards,
    getThumbBtns,
    updateCounter
  });

  // Card click triggers expansion
  getCards().forEach((card, idx) => {
    card.addEventListener('click', () => {
      stageCtrl.expandSession(idx);
    });
  });

  // Stage close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      stageCtrl.collapseSession(scrollToCard);
    });
  }

  // Thumbnails inside stage
  getThumbBtns().forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-session') || '0', 10);
      const dir = target > stageCtrl.getCurrentIndex() ? 1 : -1;
      stageCtrl.switchSession(target, dir);
    });
  });

  // Prev / Next Navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (stageCtrl.isExpandedState()) {
        stageCtrl.switchSession(stageCtrl.getCurrentIndex() - 1, -1);
      } else {
        scrollToCard(activeIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (stageCtrl.isExpandedState()) {
        stageCtrl.switchSession(stageCtrl.getCurrentIndex() + 1, 1);
      } else {
        scrollToCard(activeIndex + 1);
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!stageCtrl.isExpandedState()) return;
    if (e.key === 'Escape') {
      stageCtrl.collapseSession(scrollToCard);
    } else if (e.key === 'ArrowRight') {
      stageCtrl.switchSession(stageCtrl.getCurrentIndex() + 1, 1);
    } else if (e.key === 'ArrowLeft') {
      stageCtrl.switchSession(stageCtrl.getCurrentIndex() - 1, -1);
    }
  });

  // Overview track scroll sync
  let scrollTimer;
  track.addEventListener('scroll', () => {
    if (stageCtrl.isExpandedState()) return;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const trackRect = track.getBoundingClientRect();
      let closest = 0;
      let closestDist = Infinity;
      getCards().forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const dist = Math.abs(cardRect.left - trackRect.left);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      updateCounter(closest);
    }, 80);
  });

  updateCounter(0);
}
