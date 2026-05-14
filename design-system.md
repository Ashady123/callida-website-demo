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

**Dark section hairlines**

On navy backgrounds, use semi-transparent white for rules and borders:

| Use | Value |
|---|---|
| Hairline dividers | `rgba(244,241,232,0.14)` |
| Grid/column borders | `rgba(244,241,232,0.12)` |
| Faint separators | `rgba(244,241,232,0.08)` |

---

## 2b. CSS Custom Properties

Beyond colour tokens, these variables control layout and motion:

| Token | Value | Use |
|---|---|---|
| `--navy-2` | `#262C36` | Secondary navy (reserved, not currently used). |
| `--max` | `1320px` | Container max-width. |
| `--gutter` | `clamp(20px, 4vw, 56px)` | Page edge padding. Scales with viewport. |
| `--ease` | `cubic-bezier(.2, .6, .2, 1)` | Global easing curve for all transitions. |

**Font stacks**

| Token | Stack |
|---|---|
| `--serif` | `"Source Serif 4", "Source Serif Pro", "Tinos", "Times New Roman", Georgia, serif` |
| `--sans` | `"Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--mono` | `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` |

---

## 3. Type

Two families do all the work. A third (mono) handles micro-copy.

| Family | Role |
|---|---|
| **Source Serif 4** | All display headlines, statements, large numerals. Italic is structural — used as the second line of every callout. |
| **Helvetica Neue** (system fallback Arial) | Body copy, supporting paragraphs, button labels, navigation. |
| **JetBrains Mono** | Eyebrows, labels, meta-rows, numerals in small data tables. Always uppercase with 0.14–0.18em tracking. |

### Type scale (rendered)

| Token | Range (clamp) | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|
| Hero headline | `60 → 156px` | `0.92` | `-0.035em` | One per page. Always two lines. |
| Hero sub | `20 → 26px` | `1.3` | `-0.005em` | Serif italic, opacity 0.86, max 42ch. |
| Section title | `36 → 80px` | `1` | `-0.025em` | Who / Services / Approach / Clients. |
| CTA title | `52 → 132px` | `0.94` | `-0.03em` | Large callout, max 14ch. |
| Stat numeral | `56 → 96px` | `1` | `-0.025em` | Who-we-are counters. |
| Service name | `26 → 44px` | `1.05` | `-0.018em` | Serif, on dark sections. |
| Card title | `22 → 28px` | `1.2` | `-0.01em` | Approach step titles, max 18ch. |
| Stat label / eyebrow | `12px` | `1` | `0.14em` | Mono, uppercase. |
| Meta label | `11px` | `1` | `0.16–0.18em` | Mono, uppercase, smallest. |
| Lede | `16 → 18px` | `1.55–1.6` | `0` | Helvetica, max 42ch. |
| Body | `15–16px` | `1.55–1.65` | `0` | Helvetica, max 64ch. |

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

## 4b. Responsive Breakpoints

Three breakpoints handle the layout shifts:

| Breakpoint | What changes |
|---|---|
| **880px** | Nav links hide. Section-head and grids stack to single column. |
| **760px** | CTA footer grid stacks. Service row arrow column shrinks (48px → 32px). |
| **560px** | Logo height reduces from 56px to 44px. |

Use `@media (max-width: Npx)` for all breakpoints. Mobile-first is not used.

---

## 4c. Z-index Scale

Layering is minimal. Only four levels are used:

| z-index | Element |
|---|---|
| `50` | Navigation (fixed) |
| `2` | Hero content layer |
| `0` | Hero image / default |
| `-1` | Service row hover wash (behind text) |

Do not introduce additional z-index values without extending this scale.

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

**Hero veil gradients**

The image is darkened with two overlapping linear gradients:

```css
/* Horizontal veil (left-to-right fade) */
linear-gradient(90deg,
  rgba(8,10,14,0.78) 0%,
  rgba(8,10,14,0.55) 45%,
  rgba(8,10,14,0.30) 100%
)

/* Vertical veil (top-bottom-top) */
linear-gradient(180deg,
  rgba(8,10,14,0.35) 0%,
  rgba(8,10,14,0.0) 30%,
  rgba(8,10,14,0.55) 100%
)
```

**Hero image positioning:** `background-position: center 60%` keeps the Canberra skyline horizon in view.

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

### Approach step card

A vertical card used in the 3-column approach grid. Structure:

| Element | Style |
|---|---|
| Yellow marker | 28×2px, positioned at top-left of card |
| Step number | Serif italic, 18px, `--ink-mute` |
| Step tag | Mono, 11px, 0.18em tracking, uppercase, `--ink` |
| Step title | Serif, `clamp(22px, 1.9vw, 28px)`, max-width 18ch |
| Step description | Sans, 14px, 1.55 line-height, `--ink-soft`, max-width 32ch |

Cards are separated by 1px `--rule` vertical borders. On mobile (<880px), borders become horizontal.

### Client cell

A simple text row for listing client names:

- Font: serif, `clamp(20px, 2vw, 28px)`, `-0.01em` tracking
- Border: 1px `--rule` bottom
- Hover: +16px `padding-left` indent, 250ms ease
- Background: `--paper-2`

### CTA meta row

A key-value grid used in the CTA footer (Studio / Panels / Hours):

| Element | Style |
|---|---|
| Key | Mono, 11px, 0.16em tracking, uppercase, `--yellow` |
| Value | Serif, 18px, 1.3 line-height, `--on-dark` |

Grid: 3 equal columns (`1fr 1fr 1fr`), separated by 1px `rgba(244,241,232,0.12)` vertical borders.

### Footer-min

A compact footer variant used at page bottom:

- Background: `#0B0D11` (near-black, darker than navy)
- Grid: `1fr 2fr 1fr` (logo | meta | legal)
- Border-top: 1px `rgba(244,241,232,0.08)`
- Meta text: mono, 12px, 0.14em tracking, `--on-dark-mute`
- On mobile (<760px): stacks to single centered column

---

## 6. Motion

Movement is restrained, slow, and never bouncy.

- **Easing:** `cubic-bezier(.2, .6, .2, 1)` for everything.
- **Scroll reveal:** 18px translateY + opacity fade, 900ms, staggered by 80–340ms.
- **Image clip reveal:** `clip-path: inset(... 100% ...)` → `inset(0)` over 1200ms.
- **Stat count-up:** 1600ms cubic-ease-out, only on first intersection.
- **Hero parallax:** 0.12 × scrollY, capped at 800px.
- **Hero entry:** 2000ms image scale (1.12 → 1.04) + brightness ramp (0.65 → 0.88).
- `prefers-reduced-motion: reduce` short-circuits all of the above.

**IntersectionObserver settings**

Reveal animations use these observer settings:

```js
{
  threshold: 0.12,
  rootMargin: "0px 0px -50px 0px"
}
```

**Stagger pattern**

Use the `--rd` CSS custom property on elements to stagger reveal delays:

```html
<div class="reveal" style="--rd:0ms">First</div>
<div class="reveal" style="--rd:120ms">Second</div>
<div class="reveal" style="--rd:240ms">Third</div>
```

Typical stagger increments: 60ms, 80ms, 100ms, or 120ms depending on density.

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

## 9. Class Naming

CSS classes follow a BEM-like convention:

| Type | Pattern | Examples |
|---|---|---|
| Block | `.block` | `.nav`, `.hero`, `.btn`, `.section` |
| Element | `.block-element` | `.hero-headline`, `.nav-links`, `.service-row` |
| Modifier | `.block--modifier` | `.btn--primary`, `.btn--ghost-on-dark`, `.brand-logo--on-light` |
| State | `.state` | `.scrolled`, `.dark`, `.in`, `.reveal` |

**Naming rules**

- Use lowercase with hyphens (no camelCase).
- Modifiers use double-hyphen (`--`).
- State classes are standalone and toggle behaviour (e.g., `.nav.dark.scrolled`).
- Avoid nesting beyond `.block .block-element` — keep specificity flat.

---

*This system is the floor, not the ceiling. Future sections should extend it the same way: paper or navy, serif headline in two lines, hairline dividers, yellow as a single mark.*
