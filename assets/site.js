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
  const imageNode = document.querySelector('[data-preview-image]');
  const captionNode = document.querySelector('[data-preview-caption]');
  const linkNode = document.querySelector('[data-preview-link]');

  const previewContent = {
    algo: {
      status: 'QUALITY HARDENING',
      number: '01 / 03',
      question: 'LLM 결과를 어디까지 신뢰할 수 있는가?',
      evidence: '104 tests · unsupported numeric claim blocked · DB isolation',
      image: 'https://raw.githubusercontent.com/YunhuPark/algo-site/main/public/dashboard/main.png',
      alt: 'Algo Pipeline 운영 대시보드 실제 화면',
      caption: 'ALGO DASHBOARD / ACTUAL PROJECT UI',
      link: 'https://algo-site-hazel.vercel.app',
      linkLabel: 'Open live evidence ↗'
    },
    medi: {
      status: 'SECURE MEDICAL AI',
      number: '02 / 03',
      question: '의료 데이터를 어디까지 안전하게 처리할 수 있는가?',
      evidence: 'Private Storage · Signed URL · input validation · Demo boundary',
      image: 'https://raw.githubusercontent.com/YunhuPark/Medi-Matrix/main/frontend/src/assets/hero.png',
      alt: 'Medi-Matrix 저장소에 포함된 의료 AI 프로젝트 비주얼',
      caption: 'MEDI-MATRIX / REPOSITORY ASSET',
      link: 'https://github.com/YunhuPark/Medi-Matrix',
      linkLabel: 'Open repository ↗'
    },
    insight: {
      status: 'CAUSAL ANALYSIS',
      number: '03 / 03',
      question: '공포 제목의 효과인가, 채널 규모의 착시인가?',
      evidence: '3,713 videos · PSM 0.63× · DiD +3.4% (n.s.)',
      image: 'https://raw.githubusercontent.com/YunhuPark/Medical_Insight_Lab/main/results/dashboard_final.png',
      alt: 'Medical Insight Lab 분석 대시보드 실제 결과 화면',
      caption: 'ANALYSIS DASHBOARD / ACTUAL PROJECT OUTPUT',
      link: 'https://medicalinsightlab-n598heosmpwubhkfyhjksm.streamlit.app',
      linkLabel: 'Open dashboard ↗'
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
    if (captionNode) captionNode.textContent = content.caption;
    if (imageNode) {
      imageNode.style.opacity = '0.2';
      imageNode.src = content.image;
      imageNode.alt = content.alt;
      const reveal = () => { imageNode.style.opacity = '1'; };
      if (imageNode.complete) reveal();
      else imageNode.addEventListener('load', reveal, { once: true });
    }
    if (linkNode) {
      linkNode.href = content.link;
      linkNode.textContent = content.linkLabel;
    }
  }

  rows.forEach((row) => {
    const key = row.dataset.project;
    row.addEventListener('mouseenter', () => activateProject(key));
    row.addEventListener('focus', () => activateProject(key));
    row.addEventListener('touchstart', () => activateProject(key), { passive: true });
  });

  if (rows.length) activateProject(rows[0].dataset.project || 'algo');
})();
