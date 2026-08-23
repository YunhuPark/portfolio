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
