/**
 * ==========================================================================
 * URBAN 101 – HERO TEXT KINETIC SCRUB
 * Splits narrative words & letters to progressively light up upon scroll.
 * ==========================================================================
 */

export function initHeroTextScrub() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const narrativeEls = document.querySelectorAll('.cod-hero-scrub-text');
  const sectionEl = document.querySelector('.cod-hero-section');
  if (!narrativeEls.length || !sectionEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function processText(text, targetFrag, charsCollector) {
    const tokens = text.split(/(\s+)/);
    tokens.forEach(tok => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        targetFrag.appendChild(document.createTextNode(tok));
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
        targetFrag.appendChild(wordSpan);
      }
    });
  }

  const chars = [];
  
  narrativeEls.forEach(narrativeEl => {
    const childNodes = Array.from(narrativeEl.childNodes);
    childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        processText(text, frag, chars);
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const innerText = node.textContent;
        node.innerHTML = '';
        const frag = document.createDocumentFragment();
        processText(innerText, frag, chars);
        node.appendChild(frag);
      }
    });
  });

  if (!chars.length) return;

  sectionEl.classList.add('has-scroll-scrub');

  gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top top',
      end: '+=450',
      scrub: 0.15
    }
  }).to(chars, {
    opacity: 1,
    duration: 0.001,
    stagger: 0.008,
    ease: 'steps(1)'
  });
}
