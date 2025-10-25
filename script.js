(() => {
  const SECTION_IDS = {
    landing: 'landing',
    success: 'success',
    seeYou: 'see-you',
  };

  const STORAGE_KEYS = {
    unlocked: 'kq_unlocked',
    attempts: 'kq_attempts',
    musicMuted: 'kq_music_muted',
  };

  const ACCEPTED_ANSWERS = ['payasam', 'paayasam', 'kheer'];

  function getElement(id) {
    return document.getElementById(id);
  }

  function showSection(sectionIdToShow) {
    Object.values(SECTION_IDS).forEach((id) => {
      const el = getElement(id);
      if (!el) return;
      const shouldShow = id === sectionIdToShow;
      el.hidden = !shouldShow;
      el.classList.toggle('visible', shouldShow);
    });
  }

  function getAttempts() {
    const raw = localStorage.getItem(STORAGE_KEYS.attempts);
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }

  function setAttempts(n) {
    localStorage.setItem(STORAGE_KEYS.attempts, String(n));
  }

  function setUnlocked() {
    localStorage.setItem(STORAGE_KEYS.unlocked, 'true');
  }

  function isUnlocked() {
    return localStorage.getItem(STORAGE_KEYS.unlocked) === 'true';
  }

  function normalize(input) {
    return String(input || '')
      .trim()
      .toLowerCase();
  }

  function isCorrectAnswer(input) {
    const value = normalize(input);
    return ACCEPTED_ANSWERS.includes(value);
  }

  function errorMessageForAttempt(attemptIndex) {
    if (attemptIndex === 0) return 'Not quite... Krishna smiles at your effort 🪷';
    if (attemptIndex === 1) return "The answer lies in the temple's kitchen... think of what you tasted";
    return 'Remember that day... what made the prasadam extraordinary?';
  }

  function init() {
    const form = getElement('password-form');
    const input = getElement('password-input');
    const error = getElement('error-msg');
    const ctaBtn = getElement('cta-btn');
    const musicBtn = getElement('music-toggle');
    const audioEl = getElement('bg-music');

    // Always start on landing; do not persist session
    try {
      localStorage.removeItem(STORAGE_KEYS.unlocked);
      localStorage.removeItem(STORAGE_KEYS.attempts);
      localStorage.removeItem(STORAGE_KEYS.musicMuted);
    } catch {}
    showSection(SECTION_IDS.landing);

    // Decorative sparkles
    spawnSparkles();

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input?.value ?? '';

      if (isCorrectAnswer(value)) {
        error.textContent = '';
        showSection(SECTION_IDS.success);
        return;
      }

      // Track attempts only in-memory for this session
      init.attemptCount = (init.attemptCount || 0) + 1;
      error.textContent = errorMessageForAttempt((init.attemptCount - 1));
      input?.focus();
      input?.select?.();
    });

    ctaBtn?.addEventListener('click', () => {
      showSection(SECTION_IDS.seeYou);
    });

    // Background music setup
    setupMusic(audioEl, musicBtn);
  }

  function setupMusic(audioEl, musicBtn) {
    if (!audioEl || !musicBtn) return;

    audioEl.volume = 0.6;

    function setUi(isPlaying) {
      musicBtn.setAttribute('aria-pressed', String(isPlaying));
      musicBtn.textContent = isPlaying ? '🔈' : '🔇';
      musicBtn.classList.toggle('pulse', !isPlaying);
      musicBtn.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Enable music');
    }

    function play() {
      return audioEl.play().then(() => setUi(true)).catch(() => setUi(false));
    }

    function pause() {
      audioEl.pause();
      setUi(false);
    }

    // Start music by default (autoplay may be blocked by browser)
    play();

    const tryStartOnInteract = () => {
      if (audioEl.paused) {
        play();
      }
      document.removeEventListener('pointerdown', tryStartOnInteract);
    };
    document.addEventListener('pointerdown', tryStartOnInteract);

    musicBtn.addEventListener('click', () => {
      if (audioEl.paused) {
        play();
      } else {
        pause();
      }
    });
  }

  function spawnSparkles() {
    const decor = document.getElementById('decor');
    if (!decor) return;
    const EMOJIS = ['✨', '🦚', '🪷', '💫'];
    const isMobile = window.matchMedia('(max-width: 480px)').matches;
    const COUNT = isMobile ? 12 : 20;
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = EMOJIS[i % EMOJIS.length];
      const left = Math.random() * 100;
      const delay = Math.random() * 6;
      const duration = (isMobile ? 18 : 14) + Math.random() * (isMobile ? 12 : 18);
      let size;
      const bucket = Math.random();
      const isPeacock = el.textContent === '🦚';
      if (bucket < 0.25) {
        size = 16 + Math.floor(Math.random() * 12); // 16-28px
      } else if (bucket < 0.6) {
        size = 28 + Math.floor(Math.random() * 14); // 28-42px
      } else if (bucket < 0.9) {
        size = 40 + Math.floor(Math.random() * 16); // 40-56px
      } else {
        size = 56 + Math.floor(Math.random() * 18); // 56-74px
      }
      if (isPeacock) {
        size = Math.min(96, Math.floor(size * 1.6)); // peacocks are larger
      }
      el.style.left = left + 'vw';
      el.style.animationDelay = delay + 's, ' + Math.random() * 2 + 's';
      el.style.animationDuration = duration + 's, 2.5s';
      el.style.fontSize = size + 'px';
      // No parallax; keep simple float
      decor.appendChild(el);
    }

    // Parallax removed for mobile simplicity
  }

  document.addEventListener('DOMContentLoaded', init);
})();


