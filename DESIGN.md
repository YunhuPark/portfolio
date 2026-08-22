# Park Yunhu Portfolio — DESIGN.md

## Brand intent

A calm, precise editorial portfolio for an AI Engineer who focuses on reliable and production-minded AI systems. The site should feel closer to an independent research journal or design studio archive than a SaaS landing page.

## Color roles

- `ink`: `#11110F` — hero, closing section, strong contrast
- `ink-soft`: `#1A1916` — secondary dark surfaces
- `paper`: `#F0EDE6` — primary warm background
- `paper-deep`: `#E7E2D8` — alternate editorial background
- `white`: `#FFFDF8` — high-contrast light text
- `muted-dark`: `#B7B0A5` — metadata on dark surfaces
- `muted-paper`: `#69645C` — supporting copy on light surfaces
- `accent`: `#EF5B35` — vermilion emphasis, active project, evidence
- `accent-deep`: `#D9441F` — hover and pressed state

Use the accent sparingly. It should identify the most important decision, number, or active item.

## Typography roles

- Display sans: Arial / Helvetica Neue / Pretendard, weight 800–900
- Editorial serif: Georgia / Noto Serif KR, regular or italic
- Metadata mono: SFMono-Regular / Consolas

### Scale

- Hero name: oversized, 88–240 px depending on viewport
- Section headline: 44–104 px desktop
- Project title: 32–56 px
- Body: minimum 16 px
- Metadata: 9–12 px, uppercase, increased letter spacing

## Shape language

- Primarily square geometry
- Thin 1 px divider lines
- Corner radius: 0–4 px only
- No pill components
- No glassmorphism
- No floating rounded card grids
- No generic dashboard widgets

## Layout

- Maximum width: approximately 1440 px
- Generous horizontal padding and vertical whitespace
- Asymmetric two-column layouts on desktop
- Numbered project index rather than project cards
- Sticky preview panel for desktop project exploration
- Natural stacked reading order on mobile

## Motion

- Subtle color and underline transitions only
- Project preview changes on hover and keyboard focus
- Important content must be visible before JavaScript executes
- Respect `prefers-reduced-motion`

## Core components

### Hero
Dark charcoal, oversized name, one Korean positioning statement, minimal metadata.

### Project index
Number, large title, domain, short description, year, arrow. Thin rules separate projects.

### Preview panel
Dark rectangular field with one meaningful metric and a simple system visualization. Never use fabricated product screenshots.

### Case-study section
Small orange label on the left and large decision-oriented content on the right. Use horizontal rules between sections.

### Evidence
Large numbers and plain text separated by rules. No cards.
