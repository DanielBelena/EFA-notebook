/* ============================================================
   EFA PREP — Shared UI utilities
   - Dark / light mode toggle (persisted in localStorage)
   - Font size cycle: normal → large → xlarge (persisted)
   ============================================================ */

(function () {
  'use strict';

  /* ---- Theme ---- */
  const THEME_KEY = 'efa-theme';
  const FS_KEY    = 'efa-fontsize';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  /* ---- Font size ---- */
  const FS_CYCLE = ['normal', 'large', 'xlarge'];
  const FS_LABELS = { normal: 'A', large: 'A+', xlarge: 'A++' };

  function applyFontSize(size) {
    document.documentElement.setAttribute('data-fontsize', size);
    FS_CYCLE.forEach(s => {
      const btn = document.getElementById('fs-btn-' + s);
      if (btn) btn.classList.toggle('active', s === size);
    });
  }

  function setFontSize(size) {
    localStorage.setItem(FS_KEY, size);
    applyFontSize(size);
  }

  /* ---- Init ---- */
  function init() {
    // Restore theme
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);

    // Restore font size
    const savedFS = localStorage.getItem(FS_KEY) || 'normal';
    applyFontSize(savedFS);

    // Bind theme button
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Bind font size buttons
    FS_CYCLE.forEach(size => {
      const btn = document.getElementById('fs-btn-' + size);
      if (btn) btn.addEventListener('click', () => setFontSize(size));
    });
  }

  /* ---- Slider track fill helper ---- */
  window.setTrack = function(el) {
    const min = +el.min || 0;
    const max = +el.max || 100;
    const pct = ((el.value - min) / (max - min) * 100).toFixed(1) + '%';
    el.style.setProperty('--p', pct);
  };

  /* Run on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
