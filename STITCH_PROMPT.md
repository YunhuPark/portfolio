# Google Stitch Master Prompt

아래 프롬프트를 그대로 복사해 사용하세요.

---

Create a high-fidelity, responsive personal portfolio website for **PARK YUNHU, AI Engineer**.

## Primary objective
The website must answer “Why should we hire this candidate?” within the first few scrolls. It should not look like a fintech app, SaaS dashboard, or Toss-style product page. Avoid rounded cards, blue gradients, pill badges, oversized UI icons, glassmorphism, and generic dashboard components.

## Design direction: Editorial Research
Use a strong editorial portfolio aesthetic inspired by independent design studios, research journals, and exhibition catalogs.

- Dark charcoal hero section, warm off-white content sections
- One restrained accent color: burnt orange / vermilion
- Very large typography and generous negative space
- Mostly square corners and thin divider lines
- No conventional project-card grid
- Projects presented as a numbered vertical index
- On desktop, hovering or focusing a project row updates a large sticky preview panel
- On mobile, preserve readability and stack content naturally
- Combine bold geometric sans-serif typography with a restrained serif italic accent
- The overall impression should be confident, analytical, technical, and personal

## Hero content
Small metadata row:
- AI ENGINEER
- SEOUL, KR
- PORTFOLIO 2026

Large name:
PARK YUNHU

Main statement:
불확실한 AI 결과를
검증 가능한 시스템으로 바꿉니다.

Supporting metadata:
- LLM Agent, Medical AI, Data Analysis
- Quality · Security · Deployment

## Selected Work section
Heading:
세 개의 대표 사례,
하나의 엔지니어링 원칙.

Supporting sentence:
서로 다른 문제를 다루지만, 결과를 그대로 보여주는 데서 끝내지 않고 검증·보안·운영 경계를 함께 설계했습니다.

Display projects as a numbered editorial index, not cards:

01 Algo Pipeline
Autonomous Content Agent · Reliability
Key question: LLM 결과를 어디까지 신뢰할 수 있는가?
Evidence: 104 tests · Quality Gate · DB isolation
Status: Quality hardening / Draft PR / Dry-run

02 Medi-Matrix
Secure Multi-modal Medical AI
Key question: 의료 데이터를 어디까지 안전하게 처리할 수 있는가?
Evidence: Private Storage · Signed URL · Input validation
Status: Demo inference / Synthetic data

03 Medical Insight Lab
Causal Analysis · Data Science
Key question: 공포 제목의 효과인가, 채널 규모의 착시인가?
Evidence: 3,713 videos · PSM 0.63× · Fixed effects


For the desktop preview panel, create abstract but meaningful visualizations:
- Algo: Collect → Generate → Verify → Operate pipeline and terminal-like validation logs
- Medi-Matrix: abstract 3D chest scan plus vital metrics
- Medical Insight: comparison bars showing 2.1× → 1.0× → 0.63×
Do not use fabricated product screenshots.

## Engineering Principles section
Dark background.
Heading:
좋은 AI 시스템은
결과보다 경계가 선명합니다.

Three large editorial rows:
1. 검증할 수 없는 출력은 운영 결과가 아닙니다.
2. 정확도 하나보다 문제에 맞는 지표를 봅니다.
3. 데모와 운영의 차이를 코드로 명시합니다.

## How I Work section
Use a clean numbered list with divider lines:
01 Define — 사용자 불편, 데이터 한계, 실패 비용을 먼저 정의
02 Design — 입출력 계약, 상태 흐름, 예외 시나리오 문서화
03 Build — 핵심 가설을 확인할 최소 단위부터 구현
04 Verify — 테스트, 품질 게이트, 보안 점검, 적절한 지표
05 Operate — 환경 분리, 한계와 다음 개선 방향 기록

## Research & Additional Work
Minimal rows, not cards:
- IMST-Mamba — 독립 시계열 연구. Medi-Matrix에서 실험적 Vitals 추론 모듈로 연결. Link to a dedicated research note.
- Golden-Time — 독립 응급의료 탐색 서비스. Medi-Matrix 분석 결과 자동 연동은 Future Work.
- 마른길 — 위험 엣지를 제거하고 대피소를 탐색하는 침수 안전 경로 팀 프로젝트.

## Medi-Matrix relationship section
Inside the Medi-Matrix case-study page, add a clear editorial section titled:

Model → System → Action

Display three stages with explicit status labels:
1. IMST-Mamba / MODEL / RELATED RESEARCH
2. Medi-Matrix / SYSTEM / CURRENT PROTOTYPE
3. Golden-Time / ACTION / INDEPENDENT APP

Use a solid connector from IMST-Mamba to Medi-Matrix labelled “experimental module connection”. Use a dashed connector from Medi-Matrix to Golden-Time labelled “Future Work”. Include a note that the public Medi-Matrix deployment uses Demo Inference and synthetic data, and that Golden-Time is not currently integrated automatically.

## Closing section
Dark background with oversized typography:
LET’S BUILD
RELIABLE AI.

Links:
Email / GitHub / Notion

## Case-study page template
Create a reusable project detail screen with:
- Dark hero with oversized project title
- Minimal metadata row: Type / Role / Status / Stack
- Warm off-white article body
- Each section separated by thin horizontal rules
- Two-column editorial layout: small section label on left, content on right
- Sections: Core Question, Problem, My Role, Key Decisions, System, Evidence, Limits, Learning
- Large numeric evidence blocks without rounded cards
- Explicit labels for IMPLEMENTED, DEMO, RESEARCH, DRAFT, and FUTURE WORK
- Next-project navigation at the bottom

## Accessibility and responsive rules
- Strong contrast and readable Korean typography
- Body text at least 16px desktop and mobile
- Visible keyboard focus states
- Hover interactions must also work with keyboard focus
- No content should be hidden by default if JavaScript fails
- Respect prefers-reduced-motion
- Use semantic HTML structure

Produce desktop and mobile screens for the homepage and one representative case-study page.
