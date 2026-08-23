(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Close' : 'Menu';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu';
      });
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const rows = [...document.querySelectorAll('[data-project]')];
  const statusNode = document.querySelector('[data-preview-status]');
  const numberNode = document.querySelector('[data-preview-number]');
  const questionNode = document.querySelector('[data-preview-question]');
  const evidenceNode = document.querySelector('[data-preview-evidence]');
  const sceneTitleNode = document.querySelector('[data-scene-title]');
  const sceneLabelNode = document.querySelector('[data-scene-label]');

  const previewContent = {
    algo: {
      status: 'QUALITY HARDENING',
      number: '01 / 03',
      question: 'LLM 결과를 어디까지 신뢰할 수 있는가?',
      evidence: '104 tests · unsupported numeric claim blocked · DB isolation · dry-run',
      title: 'ALGO PIPELINE',
      label: 'VERIFY / OPERATE'
    },
    medi: {
      status: 'SECURE MEDICAL AI',
      number: '02 / 03',
      question: '의료 데이터를 어디까지 안전하게 처리할 수 있는가?',
      evidence: '50MB input cap · Private Storage · Signed URL · Demo boundary',
      title: 'MEDI-MATRIX',
      label: 'VOLUME / VITALS'
    },
    insight: {
      status: 'CAUSAL ANALYSIS',
      number: '03 / 03',
      question: '공포 제목의 효과인가, 채널 규모의 착시인가?',
      evidence: '3,713 videos · PSM 0.63× · DiD +3.4% (n.s.)',
      title: 'MEDICAL INSIGHT',
      label: 'NAIVE → CONTROLLED'
    }
  };

  function activateProject(key) {
    const content = previewContent[key];
    if (!content) return;

    rows.forEach((row) => row.classList.toggle('is-active', row.dataset.project === key));
    if (statusNode) statusNode.textContent = content.status;
    if (numberNode) numberNode.textContent = content.number;
    if (questionNode) questionNode.textContent = content.question;
    if (evidenceNode) evidenceNode.textContent = content.evidence;
    if (sceneTitleNode) sceneTitleNode.textContent = content.title;
    if (sceneLabelNode) sceneLabelNode.textContent = content.label;
    if (window.Portfolio3D) window.Portfolio3D.setWorkMode(key);
  }

  rows.forEach((row) => {
    const key = row.dataset.project;
    row.addEventListener('mouseenter', () => activateProject(key));
    row.addEventListener('focus', () => activateProject(key));
    row.addEventListener('touchstart', () => activateProject(key), { passive: true });
  });

  if (rows.length) activateProject(rows[0].dataset.project || 'algo');
})();

// Lightbox Implementation
(function initLightbox() {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', '이미지 확대 보기');
  overlay.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="닫기">×</button>
    <img class="lightbox-img" src="" alt="확대된 이미지">
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');
  let lastFocusedElement = null;

  function openLightbox(triggerEl) {
    lastFocusedElement = triggerEl;
    imgEl.src = triggerEl.src;
    imgEl.alt = triggerEl.alt || '확대된 이미지';
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      closeBtn.focus();
    }, 50);
  }

  function closeLightbox() {
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
    
    setTimeout(() => { 
      imgEl.src = ''; 
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    }, 300);
  }

  // Set tabindex and role dynamically if missing
  function setupKeyboardAccess() {
    document.querySelectorAll('.zoomable-image').forEach(img => {
      if (!img.hasAttribute('tabindex')) {
        img.setAttribute('tabindex', '0');
      }
      if (!img.hasAttribute('role')) {
        img.setAttribute('role', 'button');
      }
      const altText = img.alt ? img.alt + ' 확대 보기' : '이미지 확대 보기';
      if (!img.hasAttribute('aria-label') || img.getAttribute('aria-label') === '이미지 확대 보기') {
        img.setAttribute('aria-label', altText);
      }
    });
  }

  // Run once immediately and maybe re-run if DOM changes
  setupKeyboardAccess();
  
  // Create a MutationObserver to handle dynamically added images
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    mutations.forEach(m => {
      if (m.addedNodes.length) shouldUpdate = true;
    });
    if (shouldUpdate) setupKeyboardAccess();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('zoomable-image')) {
      openLightbox(e.target);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('zoomable-image')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(e.target);
      }
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeLightbox();
    }
  });
})();
