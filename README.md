<div align="center">

<img src="public/logo1.png" alt="DP monogram" width="88" />

# Darshan Patel — Portfolio

**A single-page portfolio built as an instrument panel, not a showreel.**

Pitch black, fully achromatic, hairline-ruled, mono-labelled — with a WebGL line field
in the hero that bends away from your cursor, because the whole subject of the site is
*real-time interfaces responding to input*.

<br />

![React](https://img.shields.io/badge/React-19.2-000000?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-000000?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-000000?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-000000?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.13-000000?style=flat-square&logo=greensock&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.3-000000?style=flat-square&logo=bun&logoColor=white)

</div>

---

## The idea

The résumé behind this site is about **real-time UI under load** — React and TypeScript
depth, Node.js/NestJS-backed apps, a hosted product shipped end-to-end solo (Dev Presence),
a local-first analytics dashboard published as an npm CLI (Claude Dash). So the site is
designed to look like the instrument it describes.

Three rules drove every decision:

1. **No accent colour.** Every other black portfolio reaches for acid green or vermilion.
   This one spends its boldness on typography and structure instead — seven greys, nothing else.
2. **Structure encodes data.** No `01 / 02 / 03` decorative counters. Each section header carries
   a real right-aligned readout — `SUMMARY → 3.5+ YRS ACTIVE`, `SYSTEMS → 4 SHIPPED`, `STACK → 24 TOOLS`
   — and those numbers are counted from the content file, not typed in.
3. **One loud element.** The `Threads` WebGL hero is the signature. Everything below it stays quiet.

---

## Design system

### Palette — zero hue

| Token | Value | Role |
|---|---|---|
| `--ink` | `#000000` | Page ground, true black |
| `--surface` | `#0A0A0A` | Raised panels, cards |
| `--line` | `#1C1C1C` | Hairline rules, borders |
| `--line-hi` | `#333333` | Hover / active hairlines |
| `--muted-ink` | `#737373` | Mono labels, secondary text |
| `--paper` | `#EDEDED` | Body copy — softer than pure white |
| `--signal` | `#FFFFFF` | Headlines, active state, focus ring |

Radius is `0px` across the board. This design is ruled, not rounded.
Every shadcn token (`--background`, `--foreground`, `--border`, …) is mapped onto these seven
so any component dropped in later inherits the palette for free.

### Type — three faces, three jobs

| Face | Package | Job |
|---|---|---|
| **Archivo Variable** | `@fontsource-variable/archivo/wdth.css` | Display. Both `wght` **and** `wdth` axes — set to `wdth 125 / wght 700`, tracking `-0.045em`, leading `0.85`. The expanded width is the signature: type stencilled on a machine. |
| **Instrument Sans Variable** | `@fontsource-variable/instrument-sans` | Body copy. Deliberately not Inter. |
| **JetBrains Mono Variable** | `@fontsource-variable/jetbrains-mono` | Data. Every label, date, metric and eyebrow — uppercase, `0.18em` tracking. |

All self-hosted through Fontsource. No network font requests at runtime.

---

## Page composition

| # | Section | Motion component | What it does |
|---|---|---|---|
| 1 | **Header** | `StaggeredMenu` | Fixed `DP` wordmark, plus a 1px white scroll-progress rule pinned to its bottom edge |
| 2 | **Hero** | `Threads` · `SplitText` · `GradualBlur` | `100dvh` WebGL line field reacting to the cursor; name revealed per-character; canvas fades into the next section |
| 3 | **Stack marquee** | `ScrollVelocity` | Two counter-directional mono rows whose speed tracks scroll velocity |
| 4 | **Summary** | `ScrollReveal` | Word-by-word reveal on the positioning statement, beside a mono fact column |
| 5 | **Track record** | `AnimatedContent` | Dated vertical rail — Anblicks Inc. and WebOccult Technologies |
| 6 | **Systems** | `SpotlightCard` · `CountUp` · `ProjectModal` | Project panels for Dev Presence and Claude Dash; each launch link opens a connected preview modal — an instrument-panel browser frame that scales out of the exact button clicked, live-embeds the site (`devpresence.dev`) or shows an install/link datasheet when the target can't be framed (npm, GitHub) |
| 7 | **Stack** | `Magnet` | Hairline table in four groups, each item magnetised to the cursor |
| 8 | **Contact** | `ShinyText` | The email set enormous in Archivo as the page's closing statement |

The eleven motion components under `src/components/` come from the
[React Bits](https://reactbits.dev) registry (wired in `components.json`) and are treated as
**vendored** — restyled to the palette, not rewritten.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19.2 with the **React Compiler** enabled |
| Build | Vite 8 (Rolldown) · TypeScript 6 |
| Styling | Tailwind CSS v4, CSS-first config — no `tailwind.config.ts` |
| Motion | GSAP + ScrollTrigger, `motion`, Lenis smooth scroll |
| WebGL | OGL — powers the `Threads` hero |
| Components | shadcn CLI + Base UI, React Bits registry, Lucide icons |
| Package manager | Bun |
| Lint | Oxlint |

---

## Getting started

```bash
bun install
bun run dev
```

The site runs at `http://localhost:5173`.

### Scripts

| Command | Does |
|---|---|
| `bun run dev` | Vite dev server with HMR |
| `bun run build` | `tsc -b` then a production build into `dist/` |
| `bun run preview` | Serve the production build locally |
| `bun run lint` | Oxlint across the project |

> **Note** — always verify with `bun run preview`, not just `dev`. WebGL context creation and
> font loading behave differently in a production bundle.

---

## Project structure

```
src/
├── App.tsx                  # composes every section; owns the reduced-motion gate
├── index.css                # palette, type scale, shadcn token mapping — the whole theme
├── content/
│   └── profile.ts           # ← every string on the site lives here
├── components/
│   ├── site/                # the eight page sections + SectionHeader + ProjectModal/BrowserChrome
│   └── *.tsx                # vendored React Bits motion components
├── hooks/
│   ├── use-smooth-scroll.ts # Lenis, bridged to GSAP's ticker
│   ├── use-modal-behavior.ts # focus trap, Escape, scroll lock for ProjectModal
│   └── use-reduced-motion.ts
└── lib/
    ├── utils.ts              # cn()
    └── preview.ts             # normalizes a project/package into the modal's PreviewTarget
public/
├── darshan-patel-resume.pdf
├── og-image.png
└── favicon-*.png
```

### Editing content

Copy never lives in JSX. `src/content/profile.ts` exports one typed object per concern —
`identity`, `contact`, `readout`, `marqueeTerms`, `experience`, `projects`, `packages`,
`stack`, `education`, `navItems` — and every section reads from it. Change a metric or a
date there and it updates everywhere it appears.

---

## Motion and accessibility

`useReducedMotion` is a single gate, read once in `App.tsx` and threaded down as
`motionEnabled`. When the OS reports `prefers-reduced-motion: reduce`:

- Lenis never initialises — scrolling returns to native
- `Threads` stops animating
- Reveal animations collapse to instant opacity, so nothing is ever stranded at `opacity: 0`

Alongside that: a 1px `--signal` focus ring at 3px offset (visible on true black), inverted
selection colours, the mobile menu traps and restores focus, and every metric on the page
matches the résumé exactly.

`useSmoothScroll` bridges Lenis into GSAP's ticker with `lagSmoothing(0)` so scroll-triggered
reveals stay locked to the smoothed scroll position rather than the native one.

---

## Notes for future me

- **React Compiler is on.** The vendored React Bits components lean hard on imperative refs and
  GSAP contexts. If one misbehaves after compilation, add `"use no memo"` at the top of *that
  file* — don't disable the compiler globally.
- **`noUnusedLocals` / `noUnusedParameters` are enabled** while `strict` is off. Freshly added
  registry components often trip these, so `bun run build` can fail on unused imports in code
  you didn't write.
- **`components.json` points at a `tailwind.config.ts` that doesn't exist.** Harmless under
  Tailwind v4's CSS-first config. Leave it.
- The full design brief and build log lives in [`PLAN.md`](PLAN.md).

---

## Contact

**Darshan Patel** — Software Engineer · Ahmedabad, IN

[Email](mailto:darshanpatel2608ce@gmail.com) ·
[GitHub](https://github.com/darshan260802) ·
[LinkedIn](https://www.linkedin.com/in/darshan-patel-2608) ·
[Résumé](public/darshan-patel-resume.pdf)

Published packages:
[`angular-video-controller`](https://www.npmjs.com/package/angular-video-controller) ·
[`@darshanpatel2608/human-body-react`](https://www.npmjs.com/package/@darshanpatel2608/human-body-react)
