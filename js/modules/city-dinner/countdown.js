/**
 * ==========================================================================
 * URBAN 101 – MINIMALIST EVENT COUNTDOWN TIMER & FINISH STATE CONTROLLER
 * Dynamically computes relative timing ("Today", "Tomorrow", or specific date)
 * Renders an elegant concluded state when the session time elapses.
 * ==========================================================================
 */

export function initCountdownTimer() {
  const container = document.getElementById('cod-countdown-section');
  if (!container) return;

  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const timingLabel = document.getElementById('cod-event-timing-label');
  const pulseDot = container.querySelector('.cod-pulse-dot');
  const countdownWrap = container.querySelector('.cod-countdown-wrap');
  const concludedCard = document.getElementById('cod-concluded-card');
  const joinBtn = container.querySelector('.cod-join-btn');

  // Chapter 07 Target: Wednesday, Sept 23, 2026 at 19:00:00 GMT+0700
  const targetDate = new Date('2026-09-23T19:00:00+07:00');
  const targetTime = targetDate.getTime();

  // URL query hook for quick testing: ?concluded=1
  const forceConcluded = window.location.search.includes('concluded=1');

  function updateTimingLabel(now) {
    if (!timingLabel) return;
    const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
    const todayDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const dayDiff = Math.round((targetDay - todayDay) / (1000 * 60 * 60 * 24));

    const timeStr = `${String(targetDate.getHours()).padStart(2, '0')}:${String(targetDate.getMinutes()).padStart(2, '0')} WIB`;

    if (dayDiff === 0) {
      timingLabel.textContent = `Next Session · Chapter 07 · Today at ${timeStr}`;
    } else if (dayDiff === 1) {
      timingLabel.textContent = `Next Session · Chapter 07 · Tomorrow at ${timeStr}`;
    } else if (dayDiff > 1) {
      const options = { weekday: 'long', day: 'numeric', month: 'short' };
      const dateFormatted = targetDate.toLocaleDateString('en-GB', options);
      timingLabel.textContent = `Next Session · Chapter 07 · ${dateFormatted} at ${timeStr}`;
    } else {
      timingLabel.textContent = 'Chapter 07 Concluded · Stay Tuned for Next Event';
    }
  }

  function showConcludedState() {
    if (timingLabel) {
      timingLabel.textContent = 'Chapter 07 Concluded · Stay Tuned for Chapter 08';
    }
    if (pulseDot) {
      pulseDot.classList.add('is-concluded');
    }
    if (countdownWrap) {
      countdownWrap.style.display = 'none';
    }
    if (concludedCard) {
      concludedCard.style.display = 'block';
    }
    if (joinBtn) {
      joinBtn.style.display = 'none';
    }
  }

  let prevH = '', prevM = '', prevS = '';

  function updateDigit(el, val, prevVal) {
    if (!el) return '';
    const strVal = String(val).padStart(2, '0');
    if (strVal !== prevVal) {
      el.textContent = strVal;
      el.classList.remove('digit-tick');
      void el.offsetWidth;
      el.classList.add('digit-tick');
    }
    return strVal;
  }

  function tick() {
    const now = new Date();
    const diff = targetTime - now.getTime();

    if (forceConcluded || diff <= 0) {
      showConcludedState();
      return false; // stop interval
    }

    updateTimingLabel(now);

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    prevH = updateDigit(hoursEl, hours, prevH);
    prevM = updateDigit(minutesEl, minutes, prevM);
    prevS = updateDigit(secondsEl, seconds, prevS);
    return true;
  }

  const shouldContinue = tick();
  if (!shouldContinue) return;

  const intervalId = setInterval(() => {
    const running = tick();
    if (!running) clearInterval(intervalId);
  }, 1000);

  return () => clearInterval(intervalId);
}
