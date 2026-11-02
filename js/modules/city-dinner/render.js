/**
 * ==========================================================================
 * URBAN 101 – DYNAMIC SESSION RENDERER
 * Generates carousel cards and stage thumbnails directly from session-data.js
 * Keeps HTML clean and drastically improves DX for future event additions.
 * ==========================================================================
 */

export function renderSessions(sessions) {
  const carousel = document.querySelector('.city-dinner-carousel');
  const strip = document.getElementById('stage-minimized-strip');
  const counter = document.querySelector('.carousel-counter');

  if (carousel) {
    carousel.innerHTML = sessions.map((s, idx) => {
      const volTag = s.edition.split('·')[0].trim();
      const locationLabel = s.isCollab 
        ? `📍 ${s.location}` 
        : (s.location || 'City Over Dinner · Jakarta');

      const collabBadge = s.collabTag 
        ? `<span class="card-collab-badge" title="${s.collabTag}"><span class="collab-dot" aria-hidden="true"></span>${s.collabTag}</span>` 
        : '';

      return `
        <article class="session-card ${s.isCollab ? 'is-collab' : ''}" data-accent="${s.accent}" data-session="${idx}">
          <div class="session-card-inner">
            <img src="${s.photo}" alt="${s.topic}" class="card-photo" loading="lazy" width="760" height="1080">
            <div class="card-tint"></div>
            <div class="card-gradient"></div>
            <div class="card-top-bar">
              ${collabBadge}
              <span class="card-hint">Explore session <span class="card-hint-arrow">→</span></span>
            </div>
            <div class="card-content">
              <span class="card-edition">${s.edition}</span>
              <h3 class="card-topic">${s.topic}</h3>
              <span class="card-speaker">${s.speaker}</span>
              <span class="card-date ${s.isCollab ? 'card-venue-tag' : ''}">${locationLabel}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  if (strip) {
    strip.innerHTML = sessions.map((s, idx) => {
      const volTag = s.edition.split('·')[0].trim();
      return `
        <button class="stage-thumb-btn ${idx === 0 ? 'is-active' : ''} ${s.isCollab ? 'is-collab-thumb' : ''}" data-session="${idx}" aria-label="Switch to ${volTag}">
          <img src="${s.photo}" alt="${s.edition}" class="thumb-img">
          <span class="thumb-label">${volTag}</span>
        </button>
      `;
    }).join('');
  }

  if (counter) {
    counter.textContent = `01 / ${String(sessions.length).padStart(2, '0')}`;
  }
}
