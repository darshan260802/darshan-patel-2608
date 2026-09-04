# Portfolio site — Darshan Patel

## Context

`/Users/darshan/Work/Projects/portfolio` is a freshly scaffolded but empty Vite 8 + React 19.2 + TS 6 + Tailwind v4 project (`App.tsx` renders `<></>`). The only content is a résumé PDF at `src/resources/DarshanPatelAngular.pdf`. The goal is a single-page personal portfolio that gets a hiring manager from "who is this" to "I want to talk to this person" in about sixty seconds.

The résumé's own material sets the direction: Darshan is a frontend engineer whose work is **real-time UI under load** — POS terminals, socket sync, an Electron point-of-sale, a −98% re-render optimization, published NPM packages. So the site is designed as an **instrument panel**, not a creative-developer showreel. Monochrome, hairline-ruled, mono-labelled, with numbers that are real and measured.

Brief constraints (fixed): pitch-black background, white accent, smooth scroll, animation, React Bits animated components, interactive, mobile responsive, Bun as package manager.

Confirmed with the user: Archivo Expanded typography, `Threads` hero, and contact = email + GitHub + LinkedIn + résumé download + NPM links. **Phone number is deliberately excluded** from the public site.

---

## Design system

### Palette — fully achromatic, zero hue
The one real risk in this design: no accent color at all. Every other black portfolio reaches for acid green or vermilion; this one spends its boldness on type and structure instead.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#000000` | page ground, true black |
| `--surface` | `#0A0A0A` | raised panels, cards |
| `--line` | `#1C1C1C` | hairline rules, borders |
| `--line-hi` | `#333333` | hover / active hairlines |
| `--muted` | `#737373` | mono labels, secondary text |
| `--paper` | `#EDEDED` | body copy (softer than pure white) |
| `--signal` | `#FFFFFF` | headlines, active state, focus ring |

### Type — three faces, three jobs
All self-hosted via Fontsource (verified available at 5.3.0):

- **Display — Archivo Variable**, imported from `@fontsource-variable/archivo/wdth.css` to get *both* `wght` and `wdth` axes. Set at `font-variation-settings: 'wdth' 125, 'wght' 700`, tracking `-0.045em`, leading `0.85`. The expanded width is the signature — it reads as signage stencilled on a machine.
- **Body — Instrument Sans Variable**. Deliberately not Inter (which is the default reach and is currently installed; it gets removed).
- **Data — JetBrains Mono Variable**. Every label, date, metric, and eyebrow. Uppercase, `0.18em` tracking, `--muted`.

Scale: `display-xl` `clamp(3.5rem, 12vw, 11rem)` · `display-l` `clamp(2.5rem, 6vw, 5rem)` · `h2` `clamp(2rem, 4vw, 3.5rem)` · `lead` `clamp(1.25rem, 2.2vw, 1.75rem)` · `body` `1.0625rem/1.65` · `mono-label` `0.6875rem`.

### Structure encodes data, not decoration
No `01 / 02 / 03` counters. Each section header is a mono label naming what it *is*, with a right-aligned readout carrying real information:

```
SUMMARY                                        4 YRS ACTIVE
TRACK RECORD                                   2023 — PRESENT
SYSTEMS                                        4 SHIPPED
STACK                                          22 TOOLS
CONTACT                                        AHMEDABAD, IN
```

The experience timeline *is* chronological, so a dated vertical rail is legitimate there.

### Signature
`Threads` — a WebGL field of thin white lines that bend away from the cursor on pure black. Chosen because it makes "a real-time interface responding to input" literally visible, which is the subject of the whole résumé. It is the one loud element; everything below it stays quiet.

---

## Page composition

1. **Header** (fixed) — `DP` mono wordmark left, menu right. A 1px white scroll-progress rule pinned to the header's bottom edge, width = scroll %. Instrument motif, and it's genuine information.
2. **Hero** (`100dvh`) — `Threads` canvas behind. Name in Archivo Expanded, revealed with `SplitText`. Role line, then a mono readout strip (`4 YRS · ANGULAR / TYPESCRIPT · REAL-TIME UI · AHMEDABAD, IN`). `GradualBlur` at the bottom edge fades the canvas into section 2.
3. **Stack marquee** — `ScrollVelocity`, two counter-directional mono rows, speed tied to scroll velocity. Hairline rules top and bottom. Reinforces "real-time" without adding a new idea.
4. **Summary** — `ScrollReveal` word-by-word on a two-sentence positioning statement, beside a small mono fact column (B.Tech, GTU, 2023, CGPA 8.29).
5. **Track record** — vertical dated rail, `AnimatedContent` stagger:
   - **Anblicks Inc.** — SDE-II, Engg. & AI · Dec 2024 – Present · dealership management system, e-signature document module, Smart CRM dashboard, real-time dealership data sync.
   - **WebOccult Technologies** — Frontend Engineer · Jan 2023 – Nov 2024 · production Angular + TypeScript/Redux/RxJS, published NPM packages, Figma → accessible responsive UI, modular architecture and lazy loading.
6. **Systems** (projects) — `SpotlightCard` panels:
   - **EatCard** (Angular, TypeScript, RxJS, Socket.IO, Electron) — the flagship. Metrics animate with `CountUp` on view: **8+** modules · **−98%** UI re-renders · **−34%** API call volume. Infinite scroll, SQS printing, dynamic taxation, multi-currency, i18n, socket sync, Electron desktop POS.
   - **Learning Management System** (Angular, Sass, TypeScript, Socket.IO, PWA) — task-based training platform, custom video player component, offline PWA support.
   - **Published packages** — `angular-video-controller` and `@darshanpatel2608/human-body-react`, linked out to npmjs as shipped public proof of work.
7. **Stack** — hairline table in four groups (Frontend / Backend & APIs / UI & Styling / Tooling) from the résumé's skills section. `Magnet` hover per item.
8. **Contact** — the email set enormous in Archivo, `ShinyText` on hover, as the page's closing statement. GitHub, LinkedIn, and a résumé download beneath. Mono colophon footer.
9. **Mobile** — `StaggeredMenu` for navigation; marquee rows slow down; `Threads` renders at reduced density.

### Copy
Written fresh, active voice, no filler — not résumé bullets pasted in. Metrics stay exactly as the résumé states them; nothing gets inflated.

---

## Implementation

### Step 1 — Fix the scaffold (blocks everything else)

- `tsconfig.app.json`: add `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }`. They currently sit only in the solution-level `tsconfig.json`, which has `"files": []`, so `@/` resolves nowhere.
- `vite.config.ts`: add `resolve.alias` mapping `@` → `path.resolve(__dirname, './src')`. Vite has no alias at all today.
- Delete the stray root `lib/utils.ts` — a duplicate of `src/lib/utils.ts` from a `shadcn init` before the alias existed. Keep `src/lib/utils.ts` (`cn()` helper, already correct).
- Delete the empty `src/App.css` and its import in `src/App.tsx`; delete template assets `src/assets/{react.svg,vite.svg,hero.png}`.
- Move `src/resources/DarshanPatelAngular.pdf` → `public/darshan-patel-resume.pdf` so it is fetchable.

### Step 2 — Dependencies (Bun)

```
bun add gsap @gsap/react ogl lenis \
  @fontsource-variable/archivo @fontsource-variable/instrument-sans @fontsource-variable/jetbrains-mono
bun remove @fontsource-variable/inter
```

Versions verified live: gsap 3.15.0, @gsap/react 2.1.2, ogl 1.0.11, lenis 1.3.26, Fontsource 5.3.0. `motion` 12.x is already installed.

### Step 3 — React Bits components

The `@react-bits` registry is already wired in `components.json`. Install the TypeScript + Tailwind variants:

```
bunx shadcn@latest add @react-bits/Threads-TS-TW @react-bits/SplitText-TS-TW \
  @react-bits/ScrollVelocity-TS-TW @react-bits/ScrollReveal-TS-TW @react-bits/CountUp-TS-TW \
  @react-bits/AnimatedContent-TS-TW @react-bits/SpotlightCard-TS-TW @react-bits/ShinyText-TS-TW \
  @react-bits/Magnet-TS-TW @react-bits/StaggeredMenu-TS-TW @react-bits/GradualBlur-TS-TW
```

These land at `src/components/<Name>/<Name>.tsx` and are treated as vendored — restyled to the palette, not rewritten. **`PillNav` is deliberately not used**: it pulls in `react-router-dom` for a single-page site.

### Step 4 — Rewrite the theme (`src/index.css`)

The file currently ships a light `:root` with a **rose/red primary**, purple-tinted shadows, a `.dark` block nothing ever activates, and a `--font-sans` conflict (`@theme` says Inter Variable, `:root` overrides it with uninstalled Plus Jakarta Sans). Replace with a single permanently-dark achromatic theme:

- Import the three Fontsource packages (Archivo via `/wdth.css`).
- Define the seven palette tokens above; map the shadcn token names (`--background`, `--foreground`, `--border`, `--primary`, …) onto them so any future shadcn component still renders correctly.
- Set `--font-display` / `--font-sans` / `--font-mono` to the new trio and delete the duplicate declarations.
- One `--radius: 0` — this design is hairline-ruled, not rounded. (Resolves the existing 1rem/0.625rem/1rem conflict.)
- `html { scroll-behavior: auto }` since Lenis owns scrolling.
- Focus-visible: 1px `--signal` outline at 3px offset, visible on black.
- Selection: white background, black text.

### Step 5 — Content layer

`src/content/profile.ts` — a single typed export holding every string: identity, contact links, experience entries, projects with metrics, stack groups, résumé path. All sections read from it, so copy edits never touch JSX.

### Step 6 — Build the sections

- `src/components/site/` — `Header.tsx`, `Hero.tsx`, `StackMarquee.tsx`, `Summary.tsx`, `TrackRecord.tsx`, `Systems.tsx`, `Stack.tsx`, `Contact.tsx`, `SectionHeader.tsx` (the mono label + readout pattern, reused by every section).
- `src/lib/smooth-scroll.ts` — Lenis setup (`lerp: 0.09`), bridged to GSAP via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add`, so scroll-triggered reveals stay in sync with the smoothed position.
- `src/hooks/use-reduced-motion.ts` — one gate that, when `prefers-reduced-motion: reduce` is set, skips Lenis entirely, swaps `Threads` for a static rule, and collapses reveal animations to instant opacity.
- `src/App.tsx` — composes the sections; renders `Threads` once at hero scope, not page-wide.

### Step 7 — Metadata (`index.html`)

Currently the untouched Vite template: lowercase `portfolio` title, Vite favicon, no description. Replace with a real title and description, OG + Twitter card tags, `<meta name="theme-color" content="#000000">`, and a new `public/favicon.svg` — a white `DP` monogram on black, matching the wordmark. Delete the template favicon and `public/icons.svg`.

---

## Known hazards

- **React Compiler is enabled** (`babel-plugin-react-compiler` in `vite.config.ts`). The vendored React Bits components use imperative refs and GSAP contexts heavily. If any of them misbehave after compilation, add a `"use no memo"` directive at the top of that file rather than disabling the compiler globally.
- **`noUnusedLocals` / `noUnusedParameters` are on** in `tsconfig.app.json` while `strict` is off. Vendored registry code frequently trips these, so `bun run build` (`tsc -b`) may fail on freshly added React Bits files — expect to clean up unused imports in them.
- `components.json` points at a `tailwind.config.ts` that doesn't exist. Harmless under Tailwind v4's CSS-first config; leave it.

## Verification

1. `bun run dev` — walk the full page at **390px, 768px, and 1440px**. Confirm no horizontal overflow, the marquee clips rather than widens the body, and `Threads` fills the hero without stretching.
2. `bun run build` then `bun run preview` — must compile clean under `tsc -b`; check the shipped bundle actually renders (WebGL and font loading behave differently in prod).
3. `bun run lint` — oxlint clean, especially `react/rules-of-hooks` across the vendored components.
4. **Reduced motion**: enable macOS *Reduce Motion*, reload. Scrolling must become native, `Threads` must not animate, and all content must still be readable — nothing stuck at `opacity: 0` from an unfired reveal.
5. **Keyboard**: tab from the top through header → every section → contact links. Focus ring visible on black at every stop; the mobile menu must trap and restore focus.
6. **Content check**: every metric on the page (98%, 34%, 8+, 4+ years, CGPA 8.29, all dates) matches the résumé exactly, and the phone number appears nowhere.
7. Confirm the résumé download resolves at `/darshan-patel-resume.pdf` and both NPM links open the right packages.

---

## Addendum — résumé sync + connected project preview (2026-09-04)

The site above was built from an earlier résumé (Angular-first, "Frontend Engineer", 4 yrs,
EatCard/LMS as flagship projects). It was brought in sync with `New_resume_react.pdf`:

- **Positioning moved React-first.** Hero role/focus, the readout strip, the summary
  paragraph, the stack marquee, and `index.html` SEO/OG tags now read "Software Engineer,"
  "3.5+" years, React/TypeScript/Node.js. The Anblicks bullets now credit React instead of
  Angular for the dealership system, matching the résumé.
- **Systems now shows Dev Presence and Claude Dash**, replacing EatCard and the LMS — the
  résumé's own PROJECTS section swapped these. EatCard's work is still represented in the
  WebOccult Track Record bullets.
- **Every project and package link now opens a connected preview modal**
  (`src/components/site/ProjectModal.tsx` + `BrowserChrome.tsx`) instead of a bare new-tab
  anchor. The launch button carries a shared `layoutId` (via `motion`) with the modal's
  frame, so the panel visibly grows out of the button that opened it. Framed as an
  instrument-panel browser window — mono URL readout, load-progress hairline, desktop/
  tablet/phone viewport toggles.
  - `devpresence.dev` sends no frame-blocking headers, so it renders as a **live iframe**.
  - `npmjs.com` (`X-Frame-Options: SAMEORIGIN`) and `github.com` (`frame-ancestors 'none'`)
    both refuse to be framed — verified by inspecting response headers, not detected at
    runtime (cross-origin frame refusal has no reliable JS signal). Those targets render a
    **datasheet panel** instead: install command with copy-to-clipboard, the project's
    bullets/stack, and outbound npm/GitHub links. Same chrome, same animation — never a
    blank frame.
  - Accessibility (focus trap, Escape, scroll lock, focus restoration) is hand-rolled in
    `src/hooks/use-modal-behavior.ts` rather than wired through `@base-ui/react`'s Dialog —
    getting Base UI's own mount/unmount transition lifecycle to cooperate with `motion`'s
    shared-layout animation added more risk than it removed, and there was no other Base UI
    usage in the codebase to stay consistent with.
  - Launch links stay real `<a href>` elements with `preventDefault()` skipped on
    cmd/ctrl/shift/middle-click, so the URLs remain crawlable, copyable, and open-in-new-tab
    still works.
- **Fixed a pre-existing bug found while verifying the modal on mobile**: `StaggeredMenu`'s
  outer fixed wrapper (`src/components/StaggeredMenu.tsx`) spanned the full viewport without
  `pointer-events: none`, silently swallowing every click below the `md` breakpoint — menu
  open or closed. One-line fix; the inner elements already had their own `pointer-events-auto`
  overrides, so the menu itself is unaffected.

The design system, palette, and section composition below are otherwise unchanged — see
`README.md` for the current page-composition table, which reflects this addendum.
