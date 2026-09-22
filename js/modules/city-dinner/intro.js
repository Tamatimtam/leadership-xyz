/**
 * ==========================================================================
 * URBAN 101 / CITY OVER DINNER – INTRO ANIMATION
 * ==========================================================================
 */

export function initCityDinnerIntro() {
  const heroLogo = document.querySelector('.cod-hero-logo');
  const heroTitle = document.querySelector('.cod-hero-title');
  const navbar = document.querySelector('.navbar');
  const heroCopy = document.querySelector('.cod-hero-scrub-box');
  const restElements = document.querySelectorAll('.cod-countdown-section, .city-dinner-section, .cod-gallery-section, .events-coming-soon, .site-footer');

  const allSecondaryElements = [navbar, heroCopy, ...restElements].filter(Boolean);

  if (!heroLogo || !heroTitle || typeof gsap === 'undefined') {
    document.body.classList.add('intro-done');
    return;
  }

  // Initial state is already handled by CSS (opacity: 0, visibility: hidden)
  // But we set initial GSAP properties for the animation.
  gsap.set(heroLogo, { y: 40 });
  gsap.set(heroTitle, { y: 40 });

  // Check if we just arrived via page transition.
  // The page transition curtain takes about ~0.6s to clear.
  const curtain = document.querySelector('.page-transition-curtain');
  const isPageTransitioning = curtain && curtain.classList.contains('is-active');
  const delay = isPageTransitioning ? 0.6 : 0.2;

  const tl = gsap.timeline({
    delay: delay,
    onStart: () => {
      // Ensure elements are visible to GSAP during animation
      gsap.set([heroLogo, heroTitle, ...allSecondaryElements], { visibility: 'visible' });
    },
    onComplete: () => {
      document.body.classList.add('intro-done');
      // Clear inline GSAP styles that might conflict with other features (like navbar scroll)
      gsap.set(allSecondaryElements, { clearProps: 'opacity,visibility' });
    }
  });

  // 1. Logo and Title animate up smoothly
  tl.to(heroLogo, {
    autoAlpha: 1,
    y: 0,
    duration: 1.4,
    ease: "power3.out"
  })
    .to(heroTitle, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=1.0") // Overlap significantly for a connected feel

    // 2. Sequential cascade of the remaining elements
    // The delay between the title appearing and the next elements is controlled by the offset string here (e.g. "+=0.2").
    // To make the delay longer, increase this value (e.g. "+=0.5"). To make it shorter or overlap, use a negative value (e.g. "-=0.2").
    .to(navbar, {
      autoAlpha: 1,
      duration: 1.0,
      ease: "power2.out"
    }, "-=0.15") // <--- TWEAK THIS VARIABLE TO ADJUST THE DELAY BEFORE NAVBAR APPEARS

    // 3. Bring in the body text shortly after the navbar starts
    .to(heroCopy, {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=1.1") // Start fading in while navbar is finishing

    // 4. Finally, cascade the rest of the page elements
    .to(restElements, {
      autoAlpha: 1,
      duration: 1.0,
      stagger: 0.15,
      ease: "power2.inOut"
    }, "-=0.8"); // Start fading in while hero copy is still fading
}
