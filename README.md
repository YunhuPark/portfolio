# PARK YUNHU — AI Engineer Portfolio

AI 모델과 LLM을 검증·보안·배포 가능한 시스템으로 구현하는 AI Engineer 박윤후의 포트폴리오.

## Live

[park-yunhu-portfolio.vercel.app](https://park-yunhu-portfolio.vercel.app/)

## Tech

- Static HTML / CSS / Vanilla JS
- Canvas-based 3D visualization (Spline-ready)
- Vercel (Static Hosting)

## Projects

| # | Name | Domain |
|---|------|--------|
| 01 | [Algo Pipeline](https://github.com/YunhuPark/algo-pipeline) | LLM Agent · Reliability |
| 02 | [Medi-Matrix](https://github.com/YunhuPark/Medi-Matrix) | Secure Multi-modal Medical AI |
| 03 | [Medical Insight Lab](https://github.com/YunhuPark/Medical_Insight_Lab) | Causal Analysis · Data Science |
| R1 | [IMST-Mamba](https://github.com/YunhuPark/IMST-Mamba) | Time-series ML · Related Research |

## Structure

```
├── index.html              # Homepage
├── project-algo.html       # Case study: Algo Pipeline
├── project-medi-matrix.html    # Case study: Medi-Matrix
├── project-medical-insight.html # Case study: Medical Insight Lab
├── project-imst-mamba.html # Research note: IMST-Mamba
├── 404.html                # Error page
├── assets/
│   ├── styles.css
│   ├── site.js
│   ├── reliability-core.js # Canvas 3D engine
│   ├── spline-config.js    # Spline scene URL (optional)
│   ├── spline-loader.js    # Spline runtime loader
│   └── favicon.svg
├── vercel.json
├── robots.txt
└── preview.html            # Dev reference (not production)
```

## Local Preview

```bash
npx serve .
```

## Deployment

Vercel에 정적 사이트로 배포됩니다.

- Framework: Other (static)
- Build command: 없음
- Output directory: `.` (root)

## Contact

- Email: byunhu35@gmail.com
- GitHub: [YunhuPark](https://github.com/YunhuPark)
