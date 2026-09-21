/**
 * ==========================================================================
 * SCROLL REVEAL MODULE
 * Uses GSAP ScrollTrigger to reveal content gracefully as the user scrolls.
 * ==========================================================================
 */

export function initScrollReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Philosophy Badge Reveal
  gsap.from('.philosophy-badge', {
    scrollTrigger: {
      trigger: '.philosophy-section',
      start: 'top 82%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    scale: 0.8,
    y: 20,
    duration: 0.85,
    ease: 'back.out(1.4)'
  });

  // 2. Philosophy Text Kinetic Scrub (Words light up progressively as you scroll)
  initPhilosophyTextScrub();

  // 2. "Every Story Matters" Card Reveal
  gsap.from('.story-card', {
    scrollTrigger: {
      trigger: '.story-card-section',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    scale: 0.96,
    duration: 1.1,
    ease: 'power3.out'
  });

  // 3. Authors Section Header & Cards Stagger
  const authorsTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.authors-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  authorsTl
    .from('.authors-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.author-card', {
      opacity: 0,
      y: 45,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out'
    }, '-=0.4');
}

/**
 * Splits quote & narrative into words and letters to create a crisp,
 * binary (translucent -> SOLID) per-letter scroll scrub effect.
 */
function initPhilosophyTextScrub() {
  const quoteEl = document.querySelector('.philosophy-quote');
  const narrativeEl = document.querySelector('.philosophy-narrative');
  const sectionEl = document.querySelector('.philosophy-section');
  const container = document.querySelector('.philosophy-container');

  if (!quoteEl || !container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Helper to split text into words and individual character spans
  function processTextContent(text, targetFragment, charsCollector) {
    const tokens = text.split(/(\s+)/);
    tokens.forEach(tok => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        targetFragment.appendChild(document.createTextNode(tok));
      } else {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'scrub-word';
        Array.from(tok).forEach(ch => {
          const charSpan = document.createElement('span');
          charSpan.className = 'scrub-char';
          charSpan.textContent = ch;
          wordSpan.appendChild(charSpan);
          charsCollector.push(charSpan);
        });
        targetFragment.appendChild(wordSpan);
      }
    });
  }

  // Parse parent preserving child tags like <span class="highlight"> or <strong>
  function wrapCharacters(parentEl) {
    const chars = [];
    const childNodes = Array.from(parentEl.childNodes);

    childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text.trim()) return;

        const frag = document.createDocumentFragment();
        processTextContent(text, frag, chars);
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const innerText = node.textContent;
        node.innerHTML = '';
        const frag = document.createDocumentFragment();
        processTextContent(innerText, frag, chars);
        node.appendChild(frag);
      }
    });

    return chars;
  }

  const quoteChars = wrapCharacters(quoteEl);
  const narrativeChars = narrativeEl ? wrapCharacters(narrativeEl) : [];

  if (!quoteChars.length) return;

  // Activate translucent base styling
  sectionEl?.classList.add('has-scroll-scrub');

  // Author the binary letter-by-letter scrub timeline
  const scrubTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      end: 'bottom 45%',
      scrub: 0.15
    }
  });

  // Quote letters snap binary: translucent -> SOLID
  scrubTl.to(quoteChars, {
    opacity: 1,
    duration: 0.001,
    stagger: 0.01,
    ease: 'steps(1)'
  });

  // Narrative letters snap binary immediately following
  if (narrativeChars.length) {
    scrubTl.to(narrativeChars, {
      opacity: 1,
      duration: 0.001,
      stagger: 0.007,
      ease: 'steps(1)'
    }, '+=0.04');
  }
}
