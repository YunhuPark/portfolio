(() => {
  'use strict';

  const sceneUrl = String(window.PORTFOLIO_SPLINE_SCENE_URL || '').trim();
  if (!sceneUrl) return;

  const slot = document.querySelector('[data-spline-slot]');
  const canvasWrap = slot?.querySelector('.scene-canvas-wrap');
  if (!slot || !canvasWrap) return;

  const loadViewer = () => {
    const viewer = document.createElement('spline-viewer');
    viewer.className = 'spline-embed';
    viewer.setAttribute('url', sceneUrl);
    viewer.setAttribute('loading', 'eager');
    viewer.setAttribute('aria-label', 'Spline Reliability Core 3D scene');
    canvasWrap.prepend(viewer);
    slot.classList.add('spline-active');
  };

  if (customElements.get('spline-viewer')) {
    loadViewer();
    return;
  }

  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';
  script.addEventListener('load', loadViewer, { once: true });
  script.addEventListener('error', () => {
    console.warn('Spline Viewer could not be loaded. The local 3D fallback remains active.');
  }, { once: true });
  document.head.appendChild(script);
})();
