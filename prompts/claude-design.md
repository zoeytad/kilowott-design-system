# Kilowott brand kit v1.0 — Claude Design prompt

Paste this when you want Claude Design to mock up a Kilowott surface: landing page, pitch deck, dashboard, social asset, poster, case study, hero section.

---

You are designing for the **Kilowott brand kit v1.0**. Read **https://brandkit.kilowott.com/AGENTS.md** first (rules, decision tree, page index), then **https://brandkit.kilowott.com/KILOWOTT_BRAND.md** (tokens, type, logo, imagery, voice). For the surface you are mocking, read its spec in **https://brandkit.kilowott.com/project/llms.txt** and look at the live tab at `https://brandkit.kilowott.com/project/#<tab>`.

If you produce HTML, link **https://brandkit.kilowott.com/project/kit/kilowott.css** and build on its primitives (`.display`, `.eyebrow`, `.btn`, `.card`, `.stat`, `.section--warm`, `.section--ink`). Start landing pages from https://brandkit.kilowott.com/project/kit/starter/index.html.

## Locked-in direction

- **Canvas:** white paper (`#FFFFFF`), warm paper (`#F6F4F0`) for section breaks, ink (`#0B0F14`) for the occasional dark band. Light by default.
- **Ratio:** 60 · 30 · 5 · 5 = paper · ink · warm paper · red.
- **Type:** Newsreader (serif display, weight 400) + DM Sans (body, UI) + JetBrains Mono (labels, numbers). One italic word per headline carries the red.
- **Tone:** calm, editorial, wide whitespace, narrow measure. Noise is a design failure.

## Four principles: check every mock against them

1. **Calm by default.** If the layout feels loud, cut half of it.
2. **Red earns its place.** One accent moment per surface: a word, a stat, or a CTA. Never a decorative frame or background.
3. **Editorial over ornamental.** Serif for the idea, sans for the argument. No gradients, glows, or filler icons.
4. **Technical and human.** Precise, never sterile. Confident, never loud.

## Type patterns

- **Hero:** serif 56–100px, line-height 1.04, one italic accent word, 4–9 words.
- **Section head:** serif 32–48px, about 22ch.
- **Body:** sans 16–18px, line-height 1.55, 58–64ch.
- **Eyebrow:** sans 12px caps, 0.18em tracking, 24px tick, max four words.
- **Stats:** serif display numerals, one label line, one mono source line.
- **Numbers in columns:** JetBrains Mono, tabular, right-aligned.

## Layout

- 8pt grid. 96px between sections, 48px for tight ones. Container 1280px, gutter 32px, collapse at 900px.
- Cards: 1px rule border, 8px radius, no shadow by default. Pill buttons and chips. Everything else 0–8px radius.
- Decks: 1920×1080, 56px outer margin, one red per slide (see `#deck`, 15 layouts). Posters, banners, ads: see `#posters` (sizes, archetypes, `script#posters-spec`). Social: see `#social`.

## Icons and imagery

- **Lucide only** (1.5px stroke, `currentColor`). Accent colour is for state only. Never hand-draw an icon.
- **Real photography**, natural light, mid-project moments. No AI-generated imagery, no stock clichés. Duotone (ink + paper, or ink + red) for heroes only. Crops: 16:9, 21:9, 4:5, 1:1, 9:16.
- Logo: the SVG wordmark (`https://brandkit.kilowott.com/project/downloads/kilowott-logo.svg`) with clear space equal to the K height. The bolt mark is a 100×100 JPG only: use it small (avatars, favicons), never upscaled.

## Copy (even in mocks)

- Outcome-driven, specific, short. Three-beat headlines where they fit: “Scale faster. Deliver better. Create impact.”
- No exclamation marks. Sentence case. Unspaced em dash. Oxford comma. Curly quotes.
- Avoid: leverage, empower, unlock, synergy, best-in-class, cutting-edge, at scale, seamless, end-to-end.
- **Demo content is fictional:** Nordhavn Coffee (3.5× organic traffic in six months, sample figures) and Ola Nordmann. Never real third-party clients, people, logos, or testimonials.

## Smoke test before finalising

- Squint: the headline should clearly dominate.
- Count the reds: exactly one.
- Check the edges: 56px minimum outer margin on slides, 32px gutter on web.
- Try dark: does it still feel like Kilowott?
