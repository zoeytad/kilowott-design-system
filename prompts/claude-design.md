# Kilowott Design System — Claude Design prompt

Paste this when you want Claude Design to mock up a new Kilowott surface (landing page, pitch deck, dashboard, social asset, case study, hero section).

---

You are designing for the **Kilowott Design System v0.6**. The brand reference lives in `KILOWOTT_BRAND.md` and the live prototype lives at `project/index.html` (locally) or the deployed URL. Consult both before mocking anything.

## Locked-in direction

- **Canvas:** white paper (`#FFFFFF`) or warm paper-2 (`#F6F4F0`) by default. Ink (`#0B0F14`) for section dividers and occasional inversions. That's it — two backgrounds.
- **Palette:** one paper + one ink + one red (`#E4022D`). 60 / 30 / 5 / 5 ratio (paper / ink / red / muted).
- **Pairing:** Newsreader (serif display) + DM Sans (sans body). Italic serif words carry the accent color.
- **Tone:** calm, editorial, wide whitespace, narrow measure. Noise is a design failure.

## Four principles — check every mock against these

1. **Calm by default.** If the layout feels loud, cut half of it.
2. **Red earns its place.** One accent moment per surface — a stat, a verb, a CTA. Never a decorative frame.
3. **Editorial over ornamental.** Serif for the idea, sans for the argument. No gradients, no glows, no filler icons.
4. **Technical & human.** Precise, never sterile. Confident, never loud.

## Type patterns

- **Hero:** serif 56–100px, line-height 1.04, italic accent word.
- **Section head:** serif 32–48px, 22ch max.
- **Body:** sans 16–18px, line-height 1.55, 58ch max.
- **Eyebrow:** sans 12px uppercase, 0.18em tracking, 24px accent tick prefix.
- **Stats:** serif display, tabular-nums, optional `<small>` for unit.
- **Numbers in columns:** mono (JetBrains Mono), tabular-nums, right-aligned.

## When you mock

- Build on an 8pt spacing grid. Section gutters at 96px on desktop, 48px for tight sections.
- Container max 1280px. Breakpoints at 900px (desktop → tablet collapse).
- Cards: 1px rule border, 8px radius, no shadows by default. Shadows only for elevation change.
- Elements almost never round-corner. Pill buttons yes. Everything else 2–8px or 0.
- Every italic emphasis word picks up the accent color.

## Surface starters

| Surface | Starting layout |
|---|---|
| Landing hero | Eyebrow · display headline with italic accent · 58ch lede · 1 primary CTA · optional stat |
| Pitch deck slide | See `deck.js` — 7 canonical layouts |
| Dashboard | Sidebar (paper-2, active tick accent) · crumb topbar · 4-up KPI strip · data surface (table, tree, chart) |
| Case study card | 4:3 photo with subtle gradient scrim · 2 tag pills · serif title with italic accent · arrow CTA |
| Social feed post | Paper or ink · eyebrow · 3-beat headline · brand mark corner |
| Stat card | Serif display number, sans label under 22ch, optional mono source line |

## Copy voice (even in mocks)

- Outcome-driven, specific, short.
- **Avoid:** leverage, empower, unlock, synergy, best-in-class, cutting-edge, at scale, seamless, end-to-end.
- Headlines three-beat when possible: "Scale faster. Deliver better. Create impact."
- No exclamation marks. Em-dashes unspaced `—`. Oxford comma.
- Every abstraction earns a concrete. "Across Nordics, EU, APAC" beats "globally."

## Icons

**Always Lucide.** 1,500+ icons at [lucide.dev](https://lucide.dev). ISC licensed.

- 24×24 canvas, 1.5px stroke, round caps, one line weight throughout.
- Always `currentColor` — inherits from the context (body text, button text, etc.).
- Accent red is **state-only**: hover, active, alert. Resting icons = ink.
- Sizes: 16 (dense) · 20 (toolbar) · **24 default** · 32 (hero) · 48 (feature, stroke drops to 1.25).

When mocking: **never hand-draw an icon**. If a glyph isn't in Lucide, flag it — usually there's a semantically close match.

Common Kilowott icons by use case:
- Nav/CRUD — `arrow-right`, `chevron-down`, `plus`, `pencil`, `trash-2`, `download`, `upload`
- Status — `circle-check`, `circle-alert`, `triangle-alert`, `info`, `clock`
- Finance — `bar-chart-3`, `line-chart`, `pie-chart`, `trending-up`, `trending-down`, `dollar-sign`, `receipt`
- People/comms — `user`, `users`, `mail`, `bell`, `briefcase`

## Imagery

- Natural light · real people · mid-project moments (not posed).
- Duotone treatment permitted: ink + paper highlights, or ink + subtle red.
- No stock. No AI-generated.
- Crop: portraits 4:5, landscapes 16:9, full-bleed hero 21:9.

## Smoke test before finalizing

- Squint — does one element clearly dominate? Should be the headline.
- Count the reds — if more than one, cut.
- Check the edges — 56px minimum outer margin on slides, 32px gutter on web.
- Try it in dark mode — does it still feel Kilowott?
