export function initGalleryParallax() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP missing, skipping gallery parallax.');
    return;
  }

  const gallerySection = document.querySelector('.cod-immersive-gallery');
  const textWrapper = document.querySelector('.gallery-huge-text-wrapper');
  
  if (!gallerySection || !textWrapper) return;

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
  
  // Split into two arrays for top and bottom marquees
  const midPoint = Math.floor(shuffledImages.length / 2);
  const topImages = shuffledImages.slice(0, midPoint);
  const bottomImages = shuffledImages.slice(midPoint);

  // Helper to create a marquee row
  const createMarquee = (images, isReverse) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'marquee-wrapper';
    
    const track = document.createElement('div');
    track.className = 'marquee-track';
    
    // We append the images TWICE to the track to create a seamless infinite loop
    const populateTrack = () => {
      images.forEach(src => {
        const item = document.createElement('div');
        item.className = 'marquee-item';
        
        // Random aspect ratio class mapping for visual variety
        const isPortrait = Math.random() > 0.5;
        const widthVal = isPortrait ? '21vh' : '38vh'; 
        
        const img = document.createElement('img');
        img.src = `assets/gallery/${src}`;
        img.loading = 'lazy';
        img.style.width = widthVal;
        
        item.appendChild(img);
        track.appendChild(item);
      });
    };

    populateTrack();
    populateTrack(); // duplicate for seamless loop

    wrapper.appendChild(track);
    return { wrapper, track };
  };

  const topMarquee = createMarquee(topImages, false);
  const bottomMarquee = createMarquee(bottomImages, true);

  // Insert into DOM (Top marquee before text, Bottom after)
  gallerySection.insertBefore(topMarquee.wrapper, textWrapper);
  gallerySection.appendChild(bottomMarquee.wrapper);

  // Animate with GSAP using a modifier for seamless looping
  const animateTrack = (track, directionLeft) => {
    // The width of half the track (one set of images)
    // We must wait a tick for DOM to render and calculate width
    requestAnimationFrame(() => {
      const trackWidth = track.scrollWidth / 2;
      
      // Setup the infinite tween
      // Speed: 50 seconds for a full loop
      const duration = 60; 

      if (directionLeft) {
        gsap.fromTo(track, 
          { x: 0 },
          {
            x: -trackWidth,
            ease: 'none',
            duration: duration,
            repeat: -1
          }
        );
      } else {
        gsap.fromTo(track, 
          { x: -trackWidth },
          {
            x: 0,
            ease: 'none',
            duration: duration,
            repeat: -1
          }
        );
      }
    });
  };

  // Top scrolls Left, Bottom scrolls Right
  animateTrack(topMarquee.track, true);
  animateTrack(bottomMarquee.track, false);
}
