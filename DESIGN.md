# Design Specification: XYZ @ City Over Dinner

## 1. Context & Overview
**"XYZ @ City Over Dinner"** is the first chapter in a series of experiential event showcases under Leadership XYZ (followed by *XYZ @ Book Talks* and *XYZ @ Idea Fest*). 

Located directly beneath the author profiles, this section functions as an interactive event chronicle. It documents the intimate dinners where leadership, urbanism, architecture, and civic life converge with practitioners and thought leaders.

---

## 2. Visual World & Brand Crossover
This section bridges **Leadership XYZ**'s editorial restraint with **City Over Dinner**'s vibrant civic-graphic identity:

* **Background**: Warm chalk/cream (`#f6f6f6`), transitioning into subtle off-white canvas with light geometric line accents.
* **Palette Accents** (borrowed from City Over Dinner posters):
  * Electric Cobalt Blue: `#1b4eb8`
  * Velvet Violet / Purple: `#5d3a82`
  * Civic Green: `#27a74a`
  * Deep Indigo (Leadership XYZ anchor): `#433e70`
  * Charcoal Dark: `#191919`
* **Motifs & Textures**:
  * Architectural skyscraper silhouetting.
  * Radiant sunburst arc graphics.
  * Wavy zigzag civic lines.
  * Circle stamps with edition numbers (`01`, `02`, `03`).

---

## 3. The 3-Stage Speaker Reveal Mechanism (Chris Petir Concept)
Each carousel item represents a specific City Over Dinner session and features a progressive state transition:

```
[ Stage 1: Poster Silhouette ]
           ↓ (User click / hover)
[ Stage 2: Black & White Candid Action ]
           ↓ (User click to expand)
[ Stage 3: Full-Color Immersive Session Spotlight ]
```

### Stage 1: The Silhouette Poster (Teaser State)
* **Visual**: Graphic cutout silhouette of the speaker framed by City Over Dinner's signature radial sunburst arch and edition tag (e.g. `Vol. 01: Public Spaces`).
* **Copy**: Topic teaser, speaker name, and date badge.
* **Tone**: Mysterious, punchy, graphic-novel poster look.

### Stage 2: The Black & White Transition (Inspection State)
* **Trigger**: Clicking the card triggers a smooth transition (`filter: grayscale(100%)`, contrast boost, and image crossfade).
* **Visual**: The silhouette dissolves into a gritty, authentic black-and-white photograph of the speaker holding the mic or sketching on the whiteboard.
* **Affordance**: A floating pill badge: *"Click to Explore Session ↗"*.

### Stage 3: Full-Color Expansion (Active / Modal State)
* **Trigger**: Expanding the card (either expanding in-place or opening an editorial spotlight drawer).
* **Visual**:
  * Grayscale dissolves smoothly into rich, warm full-color photography (`filter: grayscale(0%)`).
  * Reveals session insights: the whiteboard spider-web diagrams, attendee discussion notes, book tie-in quotes, and registration / recap archive links.

---

## 4. Carousel Architecture & Layout
* **Header**:
  * Eyebrow pill: `Urban 101`
  * Section Title: *"City Over Dinner"* (Large serif `DM Serif Display`)
  * Subtitle: *"Conversations on cities, leadership, and public life over intimate dinners."*
* **Carousel Rail**:
  * Horizontal overflow rail with smooth touch/drag and directional arrow buttons.
  * Cards peek from the right edge to invite horizontal exploration.
  * Card dimensions: `380px × 540px` (desktop), scaling to `300px × 460px` (mobile).
* **Control Bar**:
  * Active session indicator (e.g., `01 / 03`).
  * Progress timeline pill.
  * Previous / Next circular navigation buttons.

---

## 5. Curated Initial Sessions
1. **Vol. 01: Her Pramtama**
   * *Topic*: Do's and Don'ts Steps to Build Public Spaces
   * *Accent*: Violet & Cobalt (`#5d3a82`)
   * *Leadership Lens*: Spatial leadership and civic ownership.
2. **Vol. 02: Prof. Sulfikar Amir**
   * *Topic*: Ctrl+C and Ctrl+V Singapore Urbanism — Should We Do It?
   * *Accent*: Cobalt Blue (`#1b4eb8`)
   * *Leadership Lens*: Public policy adaptation and democratic infrastructure.
3. **Vol. 03: Roni Pramaditia**
   * *Topic*: How to Spark Life in the City: Career, Enterprise & Community
   * *Accent*: Civic Green (`#27a74a`)
   * *Leadership Lens*: Grassroots enterprise and youth mobilization.

---

## 6. Implementation Strategy (Zero-Build Modular)
* **HTML**: Semantic `<section class="city-dinner-section" id="city-over-dinner">` placed between Authors and Footer.
* **CSS**: `css/city-dinner.css` imported into `css/style.css`.
* **JS**: `js/modules/city-dinner-carousel.js` imported into `js/main.js` leveraging GSAP for the silhouette-to-grayscale-to-color transitions.