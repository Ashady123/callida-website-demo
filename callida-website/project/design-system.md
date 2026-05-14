# Callida — Design System

A short reference for the look, feel and rhythm of the Callida website.
Distilled from the homepage. Intended as guidance for the rest of the site.

---

## 1. Brand posture

Callida is a mature, public-sector advisory firm. The website should feel:

- **Editorial, not corporate.** Closer to a magazine column than a SaaS landing page.
- **Quiet, not loud.** Confidence comes from typography and restraint, not gradients or motion.
- **Senior, not startup.** Refined, conservative, executive-safe.

Yellow is a marker, never a wash. White space is the loudest element.

---

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F8F6F1` | Default light background. Warm off-white. |
| `--paper-2` | `#F1EEE5` | Subtle section variation (Clients, asides). |
| `--ink` | `#0F1115` | Primary type on light. Near-black. |
| `--ink-soft` | `#2A2D34` | Body copy on light. |
| `--ink-mute` | `#6A6B6E` | Labels, captions, tertiary text. |
| `--rule` | `#DCD7C9` | Hairline dividers on paper. |
| `--rule-soft` | `#ECE7DA` | Very faint dividers, alt rows. |
| `--navy` | `#1B2028` | Dark sections (Services, CTA). |
| `--on-dark` | `#F4F1E8` | Primary type on dark. |
| `--on-dark-mute` | `#A8A69D` | Labels and body on dark. |
| `--yellow` | `#F2DC4B` | Accent marker. Never used as a fill. |
| `--yellow-deep` | `#D6BF2C` | Italic numerals, unit modifiers (`+`, `%`). |

**Rules**
- Use exactly two background tones per page (paper + navy). Don't introduce extra tints.
- Yellow appears only as: a 36×2px marker, a small dot in eyebrows, a single value glyph (e.g. `+` on stats), and active hover states.
- Saturation above 0.02 is reserved for yellow only. No tinted neutrals.

---

## 3. Type

Two families do all the work. A third (mono) handles micro-copy.

| Family | Role |
|---|---|
| **Source Serif 4** | All display headlines, statements, large numerals. Italic is structural — used as the second line of every callout. |
| **Helvetica Neue** (system fallback Arial) | Body copy, supporting paragraphs, button labels, navigation. |
| **JetBrains Mono** | Eyebrows, labels, meta-rows, numerals in small data tables. Always uppercase with 0.14–0.18em tracking. |

### Type scale (rendered)

| Token | Range (clamp) | Usage |
|---|---|---|
| Hero headline | `60 → 156px` | One per page. Always two lines. |
| Section title | `36 → 80px` | Who / Services / Approach / Clients / CTA. |
| Stat numeral | `56 → 96px` | Who-we-are counters. |
| Stat label / eyebrow | `12px` | Mono, uppercase, 0.14em tracking. |
| Lede | `16 → 18px` | Helvetica, 1.6 line-height, max 42ch. |
| Body | `15–16px` | Helvetica, 1.55–1.65 line-height. |

### Headline rule

Every major section headline is built the same way:

```
[plain line one.]
[italic line two.]
```

- Line 1: serif, regular weight.
- Line 2: serif, italic, same weight, same size.
- A real `<br>` separates them — not text-wrap.
- `max-width: 22ch` so the longest line fits on a single visual line.

Examples in use:

> A Canberra firm.
> *Trusted by government.*

> Six practices.
> *One way of working.*

> Three movements.
> *Every engagement.*

> Our clients.
> *In the public sector.*

> Bring us your
> *most difficult brief*.

---

## 4. Layout

### Container

- Page max-width: **1320px**.
- Page gutter: `clamp(20px, 4vw, 56px)`.
- All sections are full-bleed; content is constrained by `.container`.

### Section rhythm

- Vertical padding: `clamp(88px, 9vw, 128px)` top and bottom.
- Section-head margin-bottom: `clamp(56px, 6vw, 88px)`.
- No section eyebrows or numerals. Sections lead with their headline directly.

### Section-head pattern

Used by **Approach**, **Clients**, and any future section that pairs a headline with supporting text:

```
┌─────────────────────────────┬─────────────────────────────┐
│  Two-line headline          │  Short supporting lede      │
│  (left, ~1fr)               │  (right, ~1fr)              │
└─────────────────────────────┴─────────────────────────────┘
```

- Two equal columns.
- Vertically centred (`align-items: center`).
- On <880px: stack to a single column.

### Section background sequence

The homepage alternates two backgrounds to create rhythm:

1. Hero — image (Canberra skyline, brightness ~0.88)
2. Who — paper
3. Services — navy
4. Approach — paper
5. Clients — paper-2 (subtly deeper)
6. CTA — navy
7. Footer — `#0B0D11` (near-black)

Never more than two consecutive paper sections without a navy break.

---

## 5. Components

### Navigation

- Fixed position.
- Transparent over the hero (dark logo + light text).
- Switches to blurred paper background the instant `scrollY > 40` — same moment the light-mode logo takes over.
- Right-edge holds a single capsule CTA (`Speak with us`).

### Logo

- **Light backgrounds:** grey wordmark + grey/yellow sunburst C.
- **Dark backgrounds:** yellow C + white wordmark.
- Two `<img>` tags, swapped by CSS. Height 56px desktop / 44px mobile.

### Hero

- Photographic background with double-veil (vertical + horizontal gradient).
- Subtle scale-up entry animation (1.12 → 1.04 over 2s).
- Parallax tied to scroll (`translateY × 0.12`), max 800px.
- Two CTAs: primary (paper button on dark) + ghost.

### Buttons

| Variant | Background | Text | Border |
|---|---|---|---|
| `btn--primary` | ink | paper | — |
| `btn--ghost` | transparent | ink | ink |
| `btn--on-dark` | paper | ink | — |
| `btn--ghost-on-dark` | transparent | on-dark | rgba(244,241,232,0.4) |

- 14px 24px padding · 999px radius · 15px sans label.
- All buttons carry an animated 18→26px arrow line, hover-only.

### Service rows

A single column of links, separated by hairlines. Each row:
- Service name (serif, 26–44px)
- Short description (sans, 14–16px, on-dark-mute)
- `↗` arrow on the right
- On hover: padding shifts +24px right, faint yellow wash, name → yellow, arrow → yellow.

### Stat counters

- Serif numerals, `tabular-nums` for stable width.
- Count from `0` to target on first viewport entry (cubic ease-out, 1.6s).
- Yellow italic unit modifier (`+` / `%`) anchored to the baseline.

### Yellow marker

A 36×2px yellow rule used as a quiet visual signal:
- Above the hero meta line.
- Above the CTA section label.
- Above each approach step card.

It replaces what a logo accent or icon would normally do.

---

## 6. Motion

Movement is restrained, slow, and never bouncy.

- **Easing:** `cubic-bezier(.2, .6, .2, 1)` for everything.
- **Scroll reveal:** 18px translateY + opacity fade, 900ms, staggered by 80–340ms.
- **Image clip reveal:** `clip-path: inset(... 100% ...)` → `inset(0)` over 1200ms.
- **Stat count-up:** 1600ms cubic-ease-out, only on first intersection.
- **Hero parallax:** 0.12 × scrollY, capped.
- **Hero entry:** 2000ms image scale + brightness ramp.
- `prefers-reduced-motion: reduce` short-circuits all of the above.

Do **not** introduce: bounce, overshoot, gradient motion, cursor-tracking effects, springs, or anything that calls attention to itself.

---

## 7. Voice

Short. Specific. No padding. Verbs over nouns.

- Replace "we help organisations" with what you actually do.
- Replace "leveraging" / "synergies" / "transformative" with what changed and for whom.
- One claim per line. If a sentence has two clauses, split it.
- Italic only on second-line headlines and the occasional in-line emphasis — not for tone.

---

## 8. Don't

- Don't add eyebrows above section titles. The grid does the labelling work.
- Don't introduce a third typeface or a third background tone.
- Don't use yellow as a fill or behind a paragraph of text.
- Don't add icons next to navigation links or stats.
- Don't add stock illustrations or 3D glyphs. Photography only.
- Don't centre body copy.
- Don't write CTAs longer than three words.

---

*This system is the floor, not the ceiling. Future sections should extend it the same way: paper or navy, serif headline in two lines, hairline dividers, yellow as a single mark.*
