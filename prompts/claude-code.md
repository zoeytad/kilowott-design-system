# Kilowott brand kit v1.0 — Claude Code prompt

Paste this at the start of a Claude Code session (or into `CLAUDE.md` of the project you are building) when the agent should produce on-brand code for a Kilowott surface: marketing pages, product UI, dashboards, internal tools.

---

You are building for the **Kilowott brand kit v1.0**. Before writing code, fetch and read:

1. **https://brandkit.kilowott.com/AGENTS.md** — hard rules, decision tree, files, page index, checklist. Follow it.
2. **https://brandkit.kilowott.com/project/llms.txt** — component and pattern specs for the surface you are building.
3. The page source for that surface, e.g. `https://brandkit.kilowott.com/project/pages/landing.js` or `dashboards.js`. Each is a template string with the exact CSS and HTML of that tab: lift patterns from it.

(Or fetch everything at once: https://brandkit.kilowott.com/llms-full.txt)

## Setup

- **Plain HTML / any framework:** link `https://brandkit.kilowott.com/project/kit/kilowott.css` (fonts, tokens, base, primitives), or copy it into the project. Start from `https://brandkit.kilowott.com/project/kit/starter/index.html` for landing pages.
- **Tailwind v3:** download `https://brandkit.kilowott.com/project/kit/tokens.tailwind.js` and add `presets: [require('./tokens.tailwind.js')]`, plus kilowott.css for the CSS variables.
- **Tailwind v4:** import kilowott.css and `https://brandkit.kilowott.com/project/kit/tokens.tailwind.css`.
- **Sass:** `project/kit/tokens.scss`. **Token pipelines:** `https://brandkit.kilowott.com/tokens.json` (W3C DTCG, light + dark).
- **Icons:** Lucide pinned to `https://unpkg.com/lucide@1.66.0/dist/umd/lucide.min.js`; `<i data-lucide="arrow-right"></i>` then `lucide.createIcons({ root })`. Stroke 1.5, `currentColor`. Never hand-draw an SVG icon.

## Hard rules

- **Tokens, not hex:** `var(--bg)`, `var(--fg)`, `var(--fg-2)`, `var(--accent)`, `var(--link)`, `var(--rule)`, `var(--s-*)`, `var(--r-*)`, `var(--font-display|sans|mono)`. Exceptions: HTML email (inline hex), swatches, third-party mock chrome, print mock-ups.
- **Light by default.** Dark (`data-theme="dark"`) is for product surfaces and ink bands (`.section--ink`).
- **Fonts:** Newsreader (display, weight 400, line-height 1.04, −0.02em) + DM Sans (body/UI) + JetBrains Mono (numbers, code, meta). Nothing else.
- **Red is one moment per surface:** the italic `<em>` word in a headline, or one stat, or the primary CTA (`.btn--accent`), or a thin rule. Links and small red text use `var(--link)`. Never red body text or red backgrounds.
- **State colours** (`--success`, `--warning`, `--info`) only in product UI, always with an icon and a word. Dashboard deltas: up = ink, down = red.
- **Tabular numerals** on any figure in a column. 8pt spacing. Visible focus: 2px accent ring at 3px offset.
- **Semantic HTML.** `<button>`, `<nav>`, `<main>`, labelled inputs. Respect `prefers-reduced-motion`.

## Content

- Demo content is **fictional**: client **Nordhavn Coffee** (specialty coffee, US launch, SEO + paid social, 3.5× organic traffic in six months, sample figures), person **Ola Nordmann**, Senior Strategist, ola.nordmann@kilowott.com, +47 000 00 000. No real third-party people, companies, logos, testimonials, or personal booking links.
- Company facts are real and may be used: kilowott.com, https://kilowott.com/contact-us/, offices Fredrikstad · Sandnes · Goa · Dubai.
- Voice: outcome-driven, specific, confident, human. No exclamation marks, sentence case, Oxford comma, curly quotes, unspaced em dash, numerals from 10. Avoid: leverage, empower, unlock, synergy, best-in-class, cutting-edge, at scale, seamless, end-to-end, tailored solutions, excited to announce.

## Before you finish

Run the checklist in AGENTS.md §9: paper background, exactly one red moment, Newsreader 400 headlines with at most one italic word, tokens only, voice passes, demo content fictional, Lucide icons, visible focus, AA contrast.

## Working on the brand kit repo itself

Edit tokens only in `project/styles/tokens.css`, then `npm run build:tokens`. Run `npm run check` before pushing. Inside page template strings, CSS escapes are doubled (`\\201C`). Push to `main` deploys.
