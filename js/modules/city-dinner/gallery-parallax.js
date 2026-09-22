export function initGalleryParallax() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP missing, skipping gallery parallax.');
    return;
  }

  const gallerySection = document.querySelector('.cod-immersive-gallery');
  if (!gallerySection) return;

  const imageFiles = [
    'DJI_20260902191258_0030_D_TCM.webp', 'DJI_20260902191302_0031_D_TCM.webp', 'DJI_20260902191311_0032_D_TCM.webp',
    'DJI_20260902192834_0033_D_TCM.webp', 'DJI_20260902192840_0034_D_TCM.webp', 'DJI_20260902193137_0035_D_TCM.webp',
    'DJI_20260902193226_0036_D_TCM.webp', 'DJI_20260902193232_0037_D_TCM.webp', 'DJI_20260902193239_0038_D_TCM.webp',
    'DJI_20260902193423_0039_D_TCM.webp', 'DJI_20260902193434_0040_D_TCM.webp', 'DJI_20260902194755_0041_D_TCM.webp',
    'DJI_20260902194757_0042_D_TCM.webp', 'DJI_20260902194826_0043_D_TCM.webp', 'DJI_20260902194829_0044_D_TCM.webp',
    'DJI_20260902194910_0045_D_TCM.webp', 'DJI_20260902194913_0046_D_TCM.webp', 'DJI_20260902195025_0047_D_TCM.webp',
    'DJI_20260902195035_0048_D_TCM.webp', 'DJI_20260902195330_0049_D_TCM.webp', 'DJI_20260902195333_0050_D_TCM.webp',
    'DJI_20260902195401_0051_D_TCM.webp', 'DJI_20260902195404_0052_D_TCM.webp', 'DJI_20260902200110_0053_D_TCM.webp',
    'DJI_20260902200114_0054_D_TCM.webp', 'DJI_20260902200121_0055_D_TCM.webp', 'DJI_20260902200137_0056_D_TCM.webp',
    'DJI_20260902200141_0057_D_TCM.webp', 'DJI_20260902200758_0058_D_TCM.webp', 'DJI_20260902200803_0059_D_TCM.webp',
    'DJI_20260902200811_0060_D_TCM.webp', 'DJI_20260902203715_0061_D_TCM.webp', 'DJI_20260902203717_0062_D_TCM.webp',
    'DJI_20260902203722_0063_D_TCM.webp', 'DJI_20260902203740_0064_D_TCM.webp', 'DJI_20260902203742_0065_D_TCM.webp',
    'DJI_20260902203743_0066_D_TCM.webp', 'UDK02198.webp', 'UDK02206.webp', 'UDK02209.webp', 'UDK02212.webp',
    'UDK02216.webp', 'UDK02218.webp', 'UDK02219.webp', 'UDK02221.webp', 'UDK02223.webp', 'UDK02225.webp',
    'UDK02227.webp', 'UDK02228.webp', 'UDK02231.webp', 'UDK02233.webp', 'UDK02234.webp', 'UDK02235.webp',
    'UDK02237.webp', 'UDK02238.webp', 'UDK02244.webp', 'UDK02249.webp', 'UDK02252.webp', 'UDK02253.webp',
    'UDK02254.webp', 'UDK02260.webp', 'UDK02262.webp', 'UDK02267.webp', 'UDK02271.webp', 'UDK02274.webp',
    'UDK02276.webp', 'UDK02277.webp'
  ];

  // Shuffle images so we get a random feed
  const shuffledImages = [...imageFiles].sort(() => 0.5 - Math.random());
  let imageIndex = 0;

  // Helper to get next image
  const getNextImage = () => {
    const src = shuffledImages[imageIndex];
    imageIndex = (imageIndex + 1) % shuffledImages.length;
    return `assets/gallery/${src}`;
  };

  /**
   * Spawns an image that continuously scrolls upwards.
   * @param {number} startY - Y position (in pixels) to start at. If null, starts at bottom.
   */
  const spawnImage = (startY = null) => {
    const frame = document.createElement('div');
    frame.className = 'gallery-frame';

    // 1. Avoid Center: Randomly pick Left zone (2vw-30vw) or Right zone (70vw-85vw)
    const isMobile = window.innerWidth < 900;
    const isLeft = Math.random() > 0.5;
    
    let minLeft, maxLeft, widthVw;
    
    if (isMobile) {
      minLeft = isLeft ? 2 : 65;
      maxLeft = isLeft ? 25 : 85;
      widthVw = 30 + Math.random() * 15; // 30vw - 45vw
    } else {
      minLeft = isLeft ? 2 : 75;
      maxLeft = isLeft ? 25 : 85;
      widthVw = 12 + Math.random() * 12; // 12vw - 24vw
    }

    const left = minLeft + Math.random() * (maxLeft - minLeft);
    
    // Random aspect ratio between 3:4 and 4:3
    const isPortrait = Math.random() > 0.5;
    const aspectRatio = isPortrait ? (3/4 + Math.random()*0.1) : (4/3 + Math.random()*0.1);
    
    frame.style.width = `${widthVw}vw`;
    frame.style.aspectRatio = aspectRatio.toString();
    frame.style.left = `${left}vw`;

    // Add image
    const img = document.createElement('img');
    img.src = getNextImage();
    img.loading = 'lazy';
    frame.appendChild(img);
    gallerySection.appendChild(frame);

    // 2. Animation Logic
    const sectionHeight = gallerySection.offsetHeight;
    const frameHeight = window.innerWidth * (widthVw / 100) / aspectRatio; // approximate height
    
    // Start position: just below screen or at predefined startY
    const startingY = startY !== null ? startY : sectionHeight + 100;
    const endingY = -frameHeight - 100; // scroll up past the top
    
    // Set initial position
    gsap.set(frame, { y: startingY });

    // Base duration for a full screen traversal
    const baseDuration = 15 + Math.random() * 15; // 15 to 30 seconds
    
    // If starting halfway up, adjust duration proportionally so speed is consistent
    const distanceToTravel = startingY - endingY;
    const fullDistance = sectionHeight + frameHeight + 200;
    const actualDuration = baseDuration * (distanceToTravel / fullDistance);

    // Continuous float animation (X drift & rotation)
    const drift = gsap.to(frame, {
      x: (Math.random() - 0.5) * 50,
      rotation: (Math.random() - 0.5) * 10,
      duration: actualDuration,
      ease: 'none'
    });

    // Vertical scroll animation
    gsap.to(frame, {
      y: endingY,
      duration: actualDuration,
      ease: 'none',
      onComplete: () => {
        drift.kill();
        frame.remove();
      }
    });
  };

  // Pre-fill the screen with some images so it doesn't start empty
  const numInitialFrames = window.innerWidth > 900 ? 8 : 4;
  for (let i = 0; i < numInitialFrames; i++) {
    // Distribute them evenly along the Y axis of the screen
    const sectionHeight = gallerySection.offsetHeight;
    const randomY = Math.random() * sectionHeight;
    spawnImage(randomY);
  }

  // Continuously spawn new images at the bottom
  const spawnInterval = setInterval(() => {
    spawnImage();
  }, 2000); // Spawn a new image every 2 seconds

  // Clean up on unmount
  window.addEventListener('beforeunload', () => {
    clearInterval(spawnInterval);
  });
}
