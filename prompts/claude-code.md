# Kilowott Design System — Claude Code prompt

Paste this at the start of a Claude Code session when you want the agent to produce on-brand code for any Kilowott surface (dashboards, marketing pages, tooling).

---

You are building for the **Kilowott Design System v0.6**. Read these first and do not deviate:

1. **Tokens** — machine-readable: `tokens.json`. CSS source: `project/styles/tokens.css`. Use `var(--fg)`, `var(--bg)`, `var(--accent)`, `var(--rule)`, `var(--s-*)`, `var(--r-*)`, `var(--font-display)`, `var(--font-sans)`, `var(--font-mono)` — never hardcode hex or pixel values that live as tokens.

2. **Brand reference (compact)** — `KILOWOTT_BRAND.md`. Covers palette, type, voice, vocab, mechanics, length ladder.

3. **Component manifest** — `manifest.json`. Maps every class (`.k-btn`, `.kpi`, `.ss-wrap`, etc.) to its file and house rule. When you need a primitive, check the manifest before inventing one.

4. **Live prototype** — open `project/index.html` (or the deployed URL) to see every component rendered. Use "View Source" on any page to lift a working snippet.

## Hard rules

- **Fonts:** Newsreader (display, serif) + DM Sans (sans) + JetBrains Mono (numeric/code). No other families.
- **Red:** `#E4022D` — one accent moment per surface. Never decoration. Losses, alerts, single CTAs, italic emphasis words.
- **Italics:** serif italic only, usually carries accent color.
- **Headings:** font-weight 500, tight tracking (`-0.02em`), line-height 1.04–1.2.
- **Tabular numerals:** `font-variant-numeric: tabular-nums;` on every figure that sits in a column.
- **Spacing:** 8pt scale. Read density from `--density` var so tweaks panel works.
- **Focus:** 2px accent ring at 3px offset. Never remove focus outlines.

## When generating code

- Write semantic HTML (`<button>` not `<div>`, `<nav>` not `<div class="nav">`).
- Prefer existing classes to inline styles. If you need a new class, follow the BEM-ish prefix convention: module prefix + double-dash variant (e.g. `.kpi__num--accent`).
- Keep dark mode working: use tokens that remap under `[data-theme="dark"]` automatically.
- Keep the four Tweaks knobs alive: `accent`, `theme`, `fontPair`, `density`. Nothing should break when any of them changes.
- Every `<a href="#">` inside an embedded surface must `preventDefault` to avoid hash routing issues (see `project/pages/dashboards.js` for the safety-net pattern).

## Voice (when writing copy)

- Outcome-driven, specific, confident, human. Contractions fine. First person fine.
- **Avoid:** leverage, empower, unlock, synergy, best-in-class, cutting-edge, at scale, seamless, end-to-end, tailored solutions, "excited to announce".
- **Use:** partner, deliver / ship, measurable, outcome / ROI, ownership, build, help.
- Length ladder: hero 4–9 words · deck headline 10–14 · subhead 25–40 · social 60–120 · service 250–400 · case 600–900.
- No exclamation marks. Em-dashes unspaced. Oxford comma.

## Icons — always Lucide

Kilowott uses [Lucide](https://lucide.dev) (1,500+ icons, ISC licensed). Loaded globally in `index.html`.

- **Markup:** `<i data-lucide="arrow-right"></i>` — no SVG by hand, ever.
- **Hydrate** after render: `lucide.createIcons({ root: myContainer });`
- **Never hand-draw an SVG icon.** If Lucide doesn't have it, tell the user — don't invent one.
- **Stroke-width:** 1.5 (not Lucide default 2) — brand spec. Already set in global `.lucide` CSS.
- **Color:** always `currentColor`. Never hardcode a hex on an icon.
- **Accent state-only:** hover/active/alert get `var(--accent)`. Resting icons use `var(--fg)`.

When you need to use an icon:
1. Check the house-curated set in `project/pages/icons.js` first (63 icons across nav/action/status/fin/social/misc).
2. If not there, search [lucide.dev/icons](https://lucide.dev/icons) by keyword.
3. Use the canonical Lucide name as `data-lucide` value.

Example:
```html
<button class="k-btn k-btn--primary">
  <i data-lucide="plus"></i> New row
</button>
```

## Where to copy from

| Need | Lift from |
|---|---|
| Buttons, forms, tabs, badges | `project/pages/components.js` |
| KPI tiles, charts, dashboard shell | `project/pages/dashboards.js` |
| Slide layouts | `project/pages/deck.js` |
| Social templates | `project/pages/social.js` |
| Photo treatments | `project/pages/imagery.js` |
| Copy examples | `project/pages/voice.js` |

## Quick smoke test

After generating, open the component in a browser with the Tweaks panel open. Flip theme, change accent, swap density. If anything breaks, it's not on-brand yet.
