# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is broader than a single hiring funnel: hiring managers and recruiters evaluating Darshan Patel for full-time engineering roles, alongside potential freelance/contract clients and technical peers or OSS collaborators who arrive via the published npm packages (`angular-video-controller`, `@darshanpatel2608/human-body-react`) or GitHub. All of these visitors are doing the same job in the same sixty seconds: deciding whether Darshan is worth a message.

## Product Purpose

A single-page personal portfolio for Darshan Patel, a software engineer based in Ahmedabad, IN, focused on real-time UI under load (React/TypeScript, Node.js/NestJS, socket-synced dashboards, component libraries other teams build on). Success is a visitor going from "who is this" to "I want to talk to this person" fast enough to act — email, GitHub, LinkedIn, résumé download, or an npm install.

## Positioning

The site is built to look like the instrument it describes: an achromatic, hairline-ruled, mono-labelled "instrument panel," not a creative-developer showreel. Every other black portfolio reaches for an accent color; this one spends its boldness on typography and structure instead, and every number on the page (years active, metrics, tool counts) is real and counted from content, not decorative.

## Operating Context

- Content is centralized in `src/content/profile.ts` — one typed object per concern (`identity`, `contact`, `readout`, `marqueeTerms`, `experience`, `projects`, `packages`, `stack`, `education`, `navItems`); no copy lives in JSX.
- The résumé PDF (`public/darshan-patel-resume.pdf`) is the source of truth for career facts; every metric shown on the site must match it exactly.
- Two employers are documented in Track Record: Anblicks Inc. (SDE-II, Engg. & AI, Dec 2024–Present) and WebOccult Technologies Pvt. Ltd. (Frontend Engineer, Jan 2023–Nov 2024).
- Two flagship "Systems" projects: Dev Presence (a hosted portfolio-builder product, live at devpresence.dev, shipped solo end-to-end) and Claude Dash (a local-first Claude Code usage-analytics dashboard, published as an installable npm CLI). Each links out to a live site, npm, and/or GitHub via a connected preview modal.
- Dev command: `bun run dev` (Vite, `localhost:5173`). Always verify visual changes with `bun run build && bun run preview`, not just `dev` — WebGL context creation and self-hosted font loading behave differently in the production bundle.

## Capabilities and Constraints

- Phone number is deliberately excluded from the public site — hard constraint, not an oversight.
- Résumé metrics must never be inflated or restated loosely; copy is written fresh but every number must trace back to the résumé.
- No testimonials, customers, benchmarks, or press exist for this product; none should be fabricated.
- Motion is gated behind a single `useReducedMotion` read in `App.tsx` (threaded down as `motionEnabled`): when `prefers-reduced-motion: reduce`, Lenis never initializes, the `Threads` WebGL hero stops animating, and reveal animations collapse to instant opacity.

## Brand Commitments

- Name: Darshan Patel. Role line: "Software Engineer" / "React / TypeScript · Node.js." Location: Ahmedabad, IN.
- `DP` monogram wordmark (`public/logo1.png`) used in the fixed header.
- Fully achromatic palette (seven greys, zero hue) and the `Threads` WebGL hero are binding identity choices, not open for casual revision — see `PLAN.md` for the full rationale and `README.md`'s Design System section for current token values.
- Contact surface is fixed: email, GitHub, LinkedIn, résumé download, and links to published npm packages. No phone number.

## Evidence on Hand

- Résumé PDF at `public/darshan-patel-resume.pdf` — authoritative for all career facts and metrics.
- Two live/shipped proof points: devpresence.dev (live product) and `@darshanpatel2608/human-body-react` / `angular-video-controller` / `@darshanpatel2608/claude-dash` (published, installable npm packages).
- No testimonials, press, or third-party endorsements exist; do not invent any.

## Product Principles

1. Every visible number is real and traceable to the résumé or content file — never decorative or invented.
2. Boldness comes from typography and structure, not color; the zero-hue palette is a deliberate constraint, not a placeholder waiting for an accent.
3. The site's own construction should demonstrate the résumé's claim (real-time interfaces responding to input) rather than just describing it in prose.
4. Copy is written fresh in active voice — never résumé bullets pasted verbatim — but never inflates a metric beyond what the résumé states.
5. Serve all visitor types (hiring managers, clients, technical peers) with the same fast, evidence-first path rather than segmenting the page by audience.

## Accessibility & Inclusion

Current best-effort baseline is the standard to maintain, not a floor to exceed toward a formal compliance target: `prefers-reduced-motion` gates all motion (Lenis, `Threads`, reveal animations) to instant/static states, a 1px `--signal` focus ring at 3px offset is visible on true black, selection colors are inverted for contrast, and the mobile `StaggeredMenu` traps and restores focus on open/close.
