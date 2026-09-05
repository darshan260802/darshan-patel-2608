---
name: Darshan Patel — Portfolio
description: An achromatic instrument-panel portfolio — hairline-ruled, mono-labelled, and built to look like the real-time interfaces it describes.
colors:
  signal: "#FFFFFF"
  ink: "#000000"
  surface: "#0A0A0A"
  line: "#1C1C1C"
  line-hi: "#333333"
  muted-ink: "#737373"
  paper: "#EDEDED"
typography:
  display:
    fontFamily: "'Archivo Variable', sans-serif"
    fontSize: "clamp(3.5rem, 12vw, 11rem)"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 125, 'wght' 700"
  headline:
    fontFamily: "'Archivo Variable', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "'Archivo Variable', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Instrument Sans Variable', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "-0.015em"
  label:
    fontFamily: "'JetBrains Mono Variable', monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  none: "0px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "2rem"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.375rem 0.75rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted-ink}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.signal}"
---

# Design System: Darshan Patel — Portfolio

## Overview

**Creative North Star: "The Instrument Panel"**

The résumé behind this site is about real-time UI under load — socket-synced dashboards, forms that can't afford to stutter, systems other teams build on. So the site is built to *look like* the instrument it describes rather than describe it in prose: pitch black, hairline-ruled, mono-labelled, with a WebGL line field in the hero that visibly bends away from the cursor. The design's own construction is the strongest evidence on the page.

The one deliberate risk is total color abstinence. Every other black portfolio reaches for an accent — acid green, vermilion, an electric blue. This one spends its boldness on typography and structure instead: seven greys, zero hue, nothing else. Confirmed rejection: no accent color will ever be added; that constraint is the point, not a placeholder waiting to be filled in.

Density stays low and honest. Sections don't compete for attention — each one opens with a hairline rule and a mono label naming exactly what it is, carrying a real right-aligned readout instead of a decorative counter. The `Threads` hero is the system's one loud gesture; everything below it stays quiet by design.

**Key Characteristics:**
- Fully achromatic — seven greys, zero hue, no exceptions anywhere in the system.
- Ruled, not rounded — 0px radius everywhere; 1px hairlines carry every division.
- Every number is real — section readouts and animated metrics are counted from content, never decorative.
- One loud element — the `Threads` WebGL field is the system's single expressive gesture.
- Three faces, three jobs — Archivo for display, Instrument Sans for body, JetBrains Mono for data; never swapped.

## Colors

Pure grayscale, structured as a single tonal ramp from true black to true white — no hue exists anywhere in the system.

### Primary
- **Signal White** (`#FFFFFF`): the one color allowed to carry emphasis — headlines, the fully-inverted hover/active button state, the focus ring, and the header's scroll-progress rule. It never appears as a background at rest.

### Neutral
- **True Black** (`#000000`): the page ground (`--ink`). Every section sits directly on this; there is no lighter "page background" anywhere.
- **Panel Black** (`#0A0A0A`): raised surfaces (`--surface`) — cards, the packages panel, browser-chrome frames. A 4%-lightness step above the ground is the entire "raised" cue; there is no shadow.
- **Hairline Grey** (`#1C1C1C`): the default 1px border/rule (`--line`) — every section divider, card edge, table rule, and tag outline.
- **Charged Hairline** (`#333333`): the hover/active/focus-adjacent border state (`--line-hi`) — the only border color change the system permits.
- **Instrument Grey** (`#737373`): mono labels and secondary text (`--muted-ink`) — the resting color for nav items, tags, dt labels, and outbound links before hover.
- **Soft Paper** (`#EDEDED`): body copy (`--paper`) — deliberately softer than pure white so headlines (Signal White) always read louder than paragraphs.

### Named Rules
**The Zero-Hue Rule.** All seven tokens are pure grayscale (0% saturation). No accent color exists anywhere in the system; boldness is spent on typography and structure instead of hue.

**The Signal Rarity Rule.** `--signal` appears only at genuine points of emphasis — headlines, the hover-inverted button/active toggle state, the focus ring, and the scroll-progress bar — never as a resting background or decoration. Its rarity is what makes it read as "signal."

## Typography

**Display Font:** Archivo Variable (`wght` + `wdth` axes), fallback sans-serif
**Body Font:** Instrument Sans Variable, fallback sans-serif — deliberately not Inter
**Label/Mono Font:** JetBrains Mono Variable, fallback monospace

**Character:** A machine-stencilled display face over a quiet, humane body face, with every piece of data — labels, dates, metrics — set in an unmistakably separate mono voice. The pairing reads as signage over a technical readout, never as one undifferentiated typographic voice.

### Hierarchy
- **Display** (700, `clamp(3.5rem, 12vw, 11rem)`, leading 0.85, tracking `-0.045em`, `wdth 125`): the hero name and the Contact section's closing email — the two loudest moments on the page. Only these two instances use the expanded `wdth 125` axis.
- **Headline** (700, `1.5rem → 1.875rem` at `md:`, leading tight, tracking `-0.015em`, normal width): section/card/company titles — Track Record entries, Project cards, the modal datasheet title. Archivo Bold at the font's default width, not the expanded signature.
- **Lead** (500, `1.5rem → 2.25rem` at `md:`, leading 1.15, tracking `-0.015em`): the Summary section's positioning statement only — Archivo at body-adjacent weight, sitting between Headline and Body in register.
- **Body** (400, `0.875rem–1.125rem` depending on context, leading relaxed ≈1.625, tracking `-0.015em` inherited): paragraph copy, bullet points, taglines, the hero role line.
- **Label** (400, `0.625rem–0.75rem`, uppercase, tracking `0.1em–0.18em`): every mono/data instance — section header labels and readouts, nav items, dt/dd metadata, tags, outbound links, footer colophon.

### Named Rules
**The Three Jobs Rule.** Archivo is display only, Instrument Sans is body only, JetBrains Mono is data/label only. Never use Archivo for a paragraph or Mono for a headline — each face has exactly one job.

**The Expanded-Is-Rare Rule.** The signature `wdth 125` expansion belongs to the two loudest display moments (hero name, closing email) alone. Every other Archivo instance — including all section and card headlines — renders at the font's normal width axis.

**The Wider-Is-Louder Rule.** Mono label tracking scales with importance: `0.18em` for section headers and hero readouts (the loudest data), stepping down to `0.14em` for navigation and the footer, and `0.1em` for dense inline tags and links. Tracking is never uniform across all mono text.

## Layout

Every content section shares one container: `max-w-6xl` (72rem), horizontal padding `1.5rem → 2.5rem` at `md:`, vertical rhythm `5rem → 7rem` (`py-20 md:py-28`). Sections stack directly on the black ground; a hairline top border (`border-t border-line`), not a background change, is what separates one section from the next.

Two-column patterns (Summary's statement + fact column, Track Record's date rail + content) collapse to a single column below `md:`; the Systems project grid runs one column until `lg:`, where the two flagship cards sit side by side. The header is fixed, `bg-ink/80` with backdrop blur, and carries a 1px `--signal` scroll-progress rule pinned to its bottom edge (width = scroll % of page) — the one piece of "instrument" chrome that persists across the whole visit. Below `md:`, the desktop nav is fully replaced by a full-screen `StaggeredMenu` overlay, not a collapsed version of the same bar.

## Elevation & Depth

Flat by construction: no `box-shadow` is invoked by any shipped site component. Depth comes from three things only — tonal layering (True Black ground vs. Panel Black surface, a 4%-lightness step), 1px hairline borders (Hairline Grey at rest, Charged Hairline on hover/active), and, on interactive cards, a cursor-tracked radial glow (soft white, opacity 0→0.6, 80% falloff, 500ms ease-in-out) as the sole "lift" cue. A full shadow scale (`--shadow-sm` through `--shadow-2xl`) exists in `:root` as inherited shadcn/Tailwind infrastructure, but no site component reaches for it.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only "elevation" response is the spotlight glow on hover/focus, never a box-shadow. Don't invoke the inherited `--shadow-*` scale without a deliberate decision to break flatness.

## Shapes

Radius is `0px` across every token (`--radius` through `--radius-4xl`). Borders are always 1px hairlines in Hairline Grey or Charged Hairline; nothing is clipped or organically shaped. The only non-rectilinear marks on the page are the WebGL `Threads` line field and a small set of glyphs (`▭ ▯ ▮` viewport toggles, `▸` browser-chrome caret, `↗ ↓` link arrows).

### Named Rules
**The Ruled, Not Rounded Rule.** 0px radius is universal. A single rounded corner anywhere breaks the instrument-panel read.

## Components

### Buttons
- **Shape:** 0px radius; a 1px border is always visible, never a filled background at rest.
- **Primary** (launch CTA, e.g. "Open preview ↗"): `border-line-hi` outline, mono uppercase label, Signal White text at rest, padding `0.5rem 1rem`. Inverts completely on hover/focus — Signal White background, True Black text.
- **Ghost / Text link** (nav items, footer, secondary project links): no border or background ever; mono uppercase, Instrument Grey resting, Signal White on hover. The one exception — the "Published packages" list — adds an underline (Charged Hairline, offset 4px, brightening to Signal White on hover).
- **Icon button** (modal close, chrome close): a bare Lucide icon, Instrument Grey → Signal White on hover, no border or fill; relies on the global focus-visible ring for keyboard state.
- **Segmented toggle** (viewport switcher): a 1px `line` border wraps plain segments; the active segment persists the same invert pattern as the primary button's hover state (Signal White fill, True Black glyph).

### Chips (tech tags)
- **Style:** 1px Hairline Grey border, no fill, mono uppercase Instrument Grey text, padding `0.375rem–0.5rem` × `0.625rem–0.75rem` depending on context.
- **State:** brightens to Charged Hairline border + Signal White text on hover; the Stack section's tool chips additionally respond to cursor-attraction (`Magnet`). No chip is ever a filter or selection control — every chip is purely informational.

### Cards / Containers (SpotlightCard)
- **Corner Style:** 0px radius.
- **Background:** Panel Black on the True Black page ground.
- **Shadow Strategy:** none — see Elevation & Depth. Depth is the cursor-tracked spotlight glow only.
- **Border:** 1px Hairline Grey, does not change on hover.
- **Internal Padding:** `2rem` on all sides.

### Navigation
- **Desktop:** fixed header, `bg-ink/80` + backdrop blur, `border-b border-line`; items are mono uppercase Instrument Grey at `0.14em` tracking, brightening to Signal White on hover — no underline, no active-page indicator beyond the global scroll-progress rule.
- **Mobile:** a full-screen `StaggeredMenu` overlay (Panel Black / Hairline Grey panels, Instrument Grey accent, white/black menu-button swap on open) fully replaces the desktop bar below `md:`; numbered items, a socials block, and focus-trap while open.

### Connected Preview Modal (signature component)
The `BrowserChrome` + `ProjectModal` pairing is the site's one bespoke "app-like" surface, and its behavior is the literal proof of the résumé's real-time-UI claim. A project's launch link and the opened panel share a `layoutId`, so the panel visually scales out of the exact button clicked (spring transition: stiffness 300, damping 32, mass 0.9) rather than fading in from nowhere. It live-embeds the real product in an iframe for framable targets — URL bar shows the true hostname, a 1px Signal White loading rule fills across the top edge while it loads — or renders a "datasheet" (title, version, a copy-to-clipboard install command, points, stack tags, outbound links) for npm/GitHub targets that can't be framed. Desktop/tablet/phone glyphs (`▭ ▯ ▮`) resize the embedded frame in place without leaving the modal.

## Do's and Don'ts

### Do:
- **Do** keep every hairline at exactly 1px in Hairline Grey at rest, stepping to Charged Hairline only on hover/active/focus — never introduce a third border weight or color.
- **Do** reserve Signal White for genuine emphasis (headlines, the inverted hover/active state, the focus ring, the scroll-progress rule); see **The Signal Rarity Rule**.
- **Do** keep every section-header readout and animated metric wired to real content in `src/content/profile.ts` — never a decorative counter or placeholder number.
- **Do** scale mono-label tracking with importance per **The Wider-Is-Louder Rule** (`0.18em` section headers → `0.1em` dense tags).
- **Do** gate any new animation behind the existing `motionEnabled` prop so `prefers-reduced-motion` collapses it to an instant, static state.

### Don't:
- **Don't** introduce any hue anywhere — no accent color, no tinted shadow, no colored focus ring. All seven tokens stay pure grayscale (**The Zero-Hue Rule**).
- **Don't** add border-radius to anything. 0px is universal (**The Ruled, Not Rounded Rule**); a single rounded corner breaks the system.
- **Don't** reach for the inherited `--shadow-*` scale to add depth to a new component; the shipped design is flat by construction (**The Flat-By-Default Rule**).
- **Don't** use Archivo for body copy or Instrument Sans for headlines/labels — each face has exactly one job (**The Three Jobs Rule**).
- **Don't** apply the expanded `wdth 125` axis outside the hero name and closing email — it is reserved for the two loudest display moments only (**The Expanded-Is-Rare Rule**).
- **Don't** invent a decorative "01 / 02 / 03" counter or icon system; the site already encodes real information in every header readout, and ornament for its own sake contradicts the whole thesis.
