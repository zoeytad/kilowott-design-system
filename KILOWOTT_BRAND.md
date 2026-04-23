# Kilowott Brand Reference

Compact style guide for reuse across presentations, designs, copy. Source of truth: `project/` (served at `http://localhost:8723/`). Canonical files: `project/styles/tokens.css`, `project/pages/voice.js`, `project/pages/overview.js`.

> **Positioning line:** *Scale faster. Deliver better. Create impact.*
> Strategic partner that turns strategy + execution into measurable outcomes — protecting margins, speed, delivery confidence.

---

## 1. Brand principles (4)

1. **Calm by default.** Generous whitespace, narrow palette. Type does heavy lifting. Noise is failure.
2. **Red earns its place.** Signature red is spotlight, not wash. One idea per surface — stat, verb, or CTA.
3. **Editorial over ornamental.** Serif display + clean sans. Italics carry emphasis. No gradients, glows, filler icons.
4. **Technical & human.** Built with engineers, for enterprise — written like people. Precise, never sterile. Confident, never loud.

---

## 2. Color tokens

### Brand
| Token | Hex | Role |
|---|---|---|
| `--k-ink` | `#0B0F14` | near-black, primary text, hero bg |
| `--k-ink-2` | `#1A2230` | secondary dark surface |
| `--k-ink-3` | `#2B3544` | tertiary, borders on dark |
| `--k-paper` | `#FFFFFF` | primary surface |
| `--k-paper-2` | `#F6F4F0` | warm off-white, section breaks |
| `--k-paper-3` | `#EDEAE3` | warmer, cards on paper |
| `--k-red` | `#E4022D` | **signature — use sparingly** |
| `--k-red-soft` | `#FCE5EA` | tinted bg for red accents |
| `--k-red-ink` | `#8A021B` | darkened red for text on paper |
| `--k-rule` | `#1A2230` | rules/borders on paper |
| `--k-rule-soft` | `#E2DED6` | soft divider on paper |
| `--k-muted` | `#5B6573` | secondary text on paper |
| `--k-muted-dark` | `#8A95A5` | secondary text on ink |

### Usage ratio
**60 / 30 / 5 / 5** → paper / ink / red / muted.

### Alt accents (tweaks panel)
Deeper red `#C8102E` · Signal orange `#F05A28` · Electric blue `#1F3CFF` · Ink monochrome `#0B0F14`. Default = Kilowott Red `#E4022D`.

---

## 3. Typography

### Families
- **Display (serif):** `Newsreader` (primary) — fallback `Fraunces`, `ui-serif`, `Georgia`
- **Sans (UI/body):** `DM Sans` — fallback `Inter Tight`, `ui-sans-serif`, `system-ui`
- **Mono:** `JetBrains Mono` — fallback `ui-monospace`, `SF Mono`, `Menlo`

### Display italics
Italic emphasis words in headlines carry accent color `#E4022D`. Variation: `font-variation-settings: "SOFT" 100, "WONK" 1;` (Fraunces/Newsreader wonk axis).

### Scale
**Display** (editorial, fluid):
- `--fs-d1` 56–100px (hero)
- `--fs-d2` 44–72px (page title)
- `--fs-d3` 32–48px (section head)

**UI:**
- `--fs-h1` 36 · `--fs-h2` 24 · `--fs-h3` 18 · `--fs-body` 16 · `--fs-sm` 14 · `--fs-xs` 12 (eyebrow)

### Line height
- `--lh-tight` 1.04 · `--lh-snug` 1.2 · `--lh-body` 1.55

### Tracking
- Eyebrow `0.18em` · Display `-0.02em`

### Weights
Headings 500. Body 400. Buttons 500.

---

## 4. Spacing — 8pt base

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128.

Section default: `padding: calc(var(--s-9) * var(--density)) 0` (≈96px vertical). Tight section: `--s-7`.

Density multiplier (tweaks): compact · comfortable · **spacious (default)**.

---

## 5. Radii & shadows

**Radii:** `--r-0` 0 · `--r-1` 2 · `--r-2` 4 · `--r-3` 8 · `--r-4` 12 · `--r-pill` 999.

**Shadows (light):**
- `--shadow-1` subtle (card hover baseline)
- `--shadow-2` medium (elevated card)
- `--shadow-3` heavy (modals/popovers)

Dark mode remaps shadows to deeper `rgba(0,0,0,…)` values.

---

## 6. Layout

- Container max-width: `1280px`
- Gutter: `32px`
- Grids: `grid-2`, `grid-3`, `grid-4`, `grid-6` (collapse to 2-col or 1-col <900px)
- Two-col editorial: 1fr 1fr · gap `--s-8`
- Section head: 1fr 2fr · gap `--s-8`

---

## 7. Component primitives

- **`.btn`** — pill, transparent, 1px border. Hover invert. Variants: `.btn--primary` (fg bg), `.btn--accent` (red bg), `.btn--ghost` (no border). Arrow icon slides right on hover.
- **`.chip`** — pill, 1px rule border, uppercase eyebrow text, muted color.
- **`.card`** — paper bg, 1px rule, `--r-3` radius, `--s-6` padding.
- **`.rule`** / **`.rule--strong`** — 1px horizontal divider.
- **`.eyebrow`** — uppercase label with leading 24×1px tick. Variant `.eyebrow--accent` (red).
- **`.token-row`** — label left / mono meta right, `--rule` divider.
- **`.dodont`** — do/don't card with tagged aspect-ratio frame + caption.
- **`.display`** — serif, weight 400, tight leading, `-0.02em` tracking. `em` inside = italic + wonk.

---

## 7b. Icons

**Library:** [Lucide](https://lucide.dev) — 1,500+ icons, ISC licensed, commercial-safe. Loaded globally via CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

**Use:** drop `<i data-lucide="<name>"></i>` anywhere, then hydrate once after render:

```js
lucide.createIcons({ root: myContainer });
```

**CSS override** (already in the system — apply globally):

```css
.lucide {
  width: 24px; height: 24px;
  stroke-width: 1.5;           /* brand spec (Lucide default is 2) */
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
```

**House rules:**
1. **Lucide first.** If the icon exists on lucide.dev, use it. Never hand-draw a one-off.
2. **`stroke-width: 1.5`** + **`currentColor`** always. Never hardcode a hex.
3. **Accent state-only** — hover, active, alert. Resting icons inherit `var(--fg)`.
4. **Hit area** ≥ 36×36px on interactive icons.

**Sizes:** 16 (dense) · 20 (toolbar) · **24 (default)** · 32 (hero) · 48 (feature — drops to stroke 1.25).

**House-curated starter set** (63 icons across 6 categories): see [project/pages/icons.js](project/pages/icons.js). Browse full catalogue at [lucide.dev/icons](https://lucide.dev/icons).

---

## 8. Logo

- Master: `project/assets/kilowott-logo.svg`
- Viewbox: `0 0 313 41`
- Used via CSS mask → recolors with `currentColor`
- Topbar rendering: **110×18px** (aspect `313:41` preserved via `aspect-ratio`)
- Minimum size, clear space → see `pages/logo.js` (load if needed)

### Topbar snippet
```css
.topbar__logo {
  width: 110px; height: 18px;
  aspect-ratio: 313 / 41;
  background: currentColor;
  -webkit-mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
          mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
}
```
Parent sets `color` — no asset swap per theme. Full technique + placements: `pages/logo.js`.

---

## 8b. Imagery

Imagery does what the type doesn't — it puts the work in a room. Editorial, not stock. The rules below keep it calm even when the subject isn't.

### Principles
1. **Human, not corporate.** Real hands, real screens, real sites. No handshake clip-art, no stock "diverse team laughing at laptop."
2. **Crop tight.** One subject, one idea. Work shown from the operator's POV — not the pitch deck's.
3. **Restrained color.** Desaturated base. Brand red only when it's already there (a jacket, a sign, a UI state) — never added in post.
4. **Negative space matters.** Imagery leaves room for type. Never bleed subjects to all four edges.

### Treatment
- **Duotone reserved for hero.** Ink + paper duotone only at the top of case studies or section covers. Not a global default.
- **Warm paper over photos.** When paired with body copy, sit photography in a Warm Paper section (`--k-paper-2`) — reduces visual temperature against editorial serif.
- **Grain OK, filters not.** 1–3% film grain texture acceptable. No gradient overlays, vignettes, or Instagram-style presets.
- **Ratios:** `16:9` (hero / case study) · `4:5` (portrait, social) · `1:1` (grid only).

### Do / Don't
| Do | Don't |
|---|---|
| Shot of hands on a keyboard, screen visible | Suited team posed in a boardroom |
| Close-up of a production rig, real signage | Glowing abstract "AI" renders, blue grids |
| Editorial portrait with ambient light | Stock smile, studio backdrop |
| On-location client work, ambient color | Gradient-heavy hero illustrations |

### Tokens
- `--shadow-2` for framed images on paper (tooltips/card elevation)
- `--r-3` (8px) default image radius · `--r-0` edge-to-edge hero only
- `--rule` 1px border when image sits on same tone as the surrounding surface

Full patterns + canonical treatments: see [project/pages/imagery.js](project/pages/imagery.js).

---

## 9. Voice — principles (4)

1. **Outcome-driven** — measurable results, not activity. Every claim → ROI / growth / delivery / checkable number.
2. **Strategic & specific** — partner in the room, not vendor at the door. Name industry, tool, region, number.
3. **Confident, not loud** — no "may", "could", "potentially". No exclamations. Work carries the weight.
4. **Human, not corporate** — write to a person. Contractions fine. First person fine. Senior partner tone.

### Tone sliders (lean direction)
- Formal → **Plainspoken** (82%)
- Cautious → **Direct** (76%)
- Activity → **Outcomes** (90%)
- Vendor → **Partner** (86%)
- Abstract → **Concrete** (86%)

---

## 10. Vocabulary

### Use
partner · deliver / ship · measurable · outcome / ROI · ownership · team / specialists · build · help / support · use · **Kilowott Intelligence** · **Kilowott for Brands** · **Kilowott for Agencies** · **Kilowott Workforce**

### Avoid
leverage · empower · unlock · synergy · best-in-class · cutting-edge · at scale · seamless · end-to-end · tailored solutions · excited to announce · revolutionary / game-changing

**Rule:** when in doubt, left column wins.

---

## 11. Mechanics (house style)

**Punctuation:** Oxford comma · em-dash unspaced `—` · semicolons almost never · **no exclamations** · curly quotes always · sentence case titles.

**Numbers:** spell 1–9, numerals 10+. `6%` not `6 percent`. `$4.2M` not `$4,200,000`. En-dash ranges `6–9`. Every stat cites source + window.

**Names:** Kilowott one word. Product names title case, no "The". Acronyms spelled on first use. Lowercase job titles in prose.

---

## 12. Length ladder

| Length | Format |
|---|---|
| 4–9 words | Hero line (3-beat taglines default) |
| 10–14 words | Deck headline (1 sentence/slide, argument-first) |
| 25–40 words | Subhead / lede |
| 60–120 words | Social post |
| 250–400 words | Service blurb |
| 600–900 words | Case study (situation → decision → result) |
| 1,200–1,800 words | POV / essay (bylined) |

---

## 13. Register shifts by context

| Context | Tone | Length |
|---|---|---|
| Sales deck | Confident, partner-register | 10–14 words/headline |
| Website hero | Sharp, thesis-first | 4–9 words |
| Case study | Narrative, ROI-specific | 600–900 words |
| Product UI | Instructive, forgiving | <15 words/string |
| Social / LinkedIn | Partnered, proof-led | 60–120 words |
| Internal / Slack | Casual, precise | 2–4 lines |

---

## 14. Copy patterns — do/don't

**Don't:** *"Leveraging cutting-edge AI solutions to empower enterprise transformation at scale."*
**Do:** *"Kilowott Intelligence pairs smart systems with human oversight, so the workflow scales and the outcome stays accountable."*

**Don't:** *"We drove significant growth through targeted marketing."*
**Do:** *"Sales up 44% for a coffee brand after six months."*

**Don't:** *"We are excited to announce a strategic partnership!"*
**Do:** *"A new engagement, starting today — Kilowott Workforce is standing up a cross-functional team with a Nordic logistics partner. First release in Q3."*

---

## 15. Service lines (name them)

- **Kilowott for Brands** — full operational ownership, measured in ROI
- **Kilowott for Agencies** — white-label / agency partnership
- **Kilowott Intelligence** — AI offering (smart systems + human oversight)
- **Kilowott Workforce** — cross-functional team build-outs

---

## 16. Tweaks / theme knobs

Live runtime controls in prototype (`window.__tweaks`):
- `theme`: `light` (default) | `dark`
- `accent`: 5 preset hex swatches
- `fontPair`: `newsreader` (locked default)
- `density`: `compact` | `comfortable` | `spacious` (default)

---

## 17. How to use this doc

- **Presentations:** pull hex, fonts, spacing, length-ladder, voice principles directly. Use §14 copy patterns as qc check.
- **New surfaces:** start from §1 principles + §7 primitives. If you need a ratio, §2 (60/30/5/5).
- **Copywriting:** §9 (principles) + §10 (vocab) + §11 (mechanics) + §12 (length).
- **Extending:** load `project/pages/*.js` for full patterns per section (color, type, logo, foundations, components, deck, imagery, voice, social).
