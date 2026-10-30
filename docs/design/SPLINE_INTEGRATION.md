# Spline 연결 방법

현재 사이트는 별도 라이브러리 없이 동작하는 경량 3D Canvas 장면을 기본으로 제공합니다. 실제 Spline 장면이 준비되면 URL 한 줄만 바꿔 교체할 수 있습니다.

## 1. Spline 장면 제작

1. Spline에서 새 파일을 만듭니다.
2. `SPLINE_SCENE_PROMPT.md` 내용을 Spline AI에 입력하거나 수동으로 장면을 구성합니다.
3. 배경은 투명 또는 `#11110F`로 설정합니다.
4. 카메라 왼쪽에는 웹사이트 제목이 들어갈 여백을 남깁니다.
5. 모바일 Play Mode에서도 코어가 잘리지 않는지 확인합니다.

## 2. Viewer URL 내보내기

Spline 상단의 **Export** 메뉴에서 **Viewer**를 선택하고 생성된 Scene URL을 복사합니다.

형식 예시:

```text
https://prod.spline.design/xxxxxxxxxxxxxxxx/scene.splinecode
```

## 3. 사이트에 URL 입력

`assets/spline-config.js`를 열어 아래 값을 교체합니다.

```js
window.PORTFOLIO_SPLINE_SCENE_URL =
  'https://prod.spline.design/xxxxxxxxxxxxxxxx/scene.splinecode';
```

URL이 비어 있으면 현재 내장된 경량 3D 장면이 표시됩니다. URL이 있으면 Spline Viewer가 로드되고 내장 장면은 자동으로 숨겨집니다.

## 4. 배포

정적 사이트이므로 폴더 전체를 GitHub 저장소에 올리고 Vercel에 연결하면 됩니다.

```text
index.html
assets/
project-*.html
vercel.json
```

## 5. 프로젝트 선택과 Spline 상태 연동

현재 홈페이지의 세 대표 프로젝트 행 Hover/Focus는 내장 Canvas 장면의 상태를 바꿉니다. IMST-Mamba는 `Research & Additional Work` 영역의 별도 연구 노트로 연결합니다.

Spline 장면의 상태까지 웹 코드에서 변경하려면 Viewer Embed보다 React/Next.js Code Export와 Code API를 사용하는 편이 적합합니다. 이 단계에서는 다음 변수 또는 오브젝트 이름을 권장합니다.

```text
projectMode = 0 | 1 | 2
systemState = chaotic | verified

Project_Algo
Project_Medi
Project_Insight
```

프로젝트 Hover 시 대응 상태:

```text
0 → Algo_State
1 → Medi_State
2 → Insight_State
```

## 6. 성능 기준

- 한 페이지의 Spline Embed는 Hero 1개를 기본으로 유지
- 프로젝트 상세 페이지는 정적 이미지 또는 가벼운 시각화 사용
- 텍스처, 조명, 재질, 오브젝트 수 최소화
- 모바일에서는 간소화된 카메라와 동작 사용
- `prefers-reduced-motion` 환경에서는 정적 상태 유지

## 파일 안내

- `preview.html` — 하나의 파일로 확인 가능한 자체 포함 미리보기
- `index.html` — 실제 배포용 메인 페이지
- `assets/reliability-core.js` — Spline URL이 없을 때 사용하는 경량 3D 장면
- `assets/spline-config.js` — Spline URL 입력 파일
- `assets/spline-loader.js` — Viewer 자동 로더
- `SPLINE_SCENE_PROMPT.md` — Spline AI 장면 생성 프롬프트
