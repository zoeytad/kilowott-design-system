# Kilowott brand kit

Kilowott’s **agentic brand kit** (v1.0): the brand system for people and for AI agents. It is live at **https://brandkit.kilowott.com**.

- **People:** open https://brandkit.kilowott.com/project/ to browse 20 tabs. They cover logo, colour, type, voice, imagery, foundations, icons, components, landing pages, dashboards, decks, email, signatures, newsletters, stationery, case studies, magazine, social, and posters and banners.
- **AI agents** (Claude Code, Cursor, ChatGPT, Claude Design, v0, Lovable…): start with **[AGENTS.md](AGENTS.md)** (https://brandkit.kilowott.com/AGENTS.md). For a web page, link one stylesheet: `https://brandkit.kilowott.com/project/kit/kilowott.css`. To load everything in one file, use https://brandkit.kilowott.com/llms-full.txt.

## Run locally

Run this from the repo root:

```bash
python3 -m http.server 8723
```

Then open http://localhost:8723/project/. The site is static and has no build step. The repo root is served so that `/llms.txt`, `/AGENTS.md`, `/tokens.json` and `/prompts/` resolve the same way they do in production. To check the production server config, including headers and the `/` → `/project/` redirect, run `npm start`; it needs `npm install` first.

## Scripts

Both scripts need Node 18 or later and nothing else.

| Command | What it does |
|---|---|
| `npm run build:tokens` | Reads `project/styles/tokens.css`, the single source of truth, and regenerates the files in the table below. |
| `npm run check` | Runs `node --check` on every JS file. Checks that the generated files are in sync with `tokens.css`. Checks the WCAG contrast claims in `color.js` (`A11Y_PAIRS`) and the contrast comments in `tokens.css`. Checks that `manifest.json` matches the tabs routed in `app.js`. Checks that every local URL in the docs exists. Flags raw `\NNN` escapes in template strings, version drift, and dummy-data policy violations. CI runs it on every push and PR (`.github/workflows/check.yml`). |

Files that `npm run build:tokens` regenerates:

| File | Contents |
|---|---|
| `tokens.json` | W3C design tokens |
| `project/brand.json` | The `tokens` key only |
| `<!-- tokens:start -->` blocks | The marked blocks in `llms.txt`, `project/llms.txt`, `KILOWOTT_BRAND.md` and `AGENTS.md` |
| `llms-full.txt` | Single-file bundle for agents |
| `project/kit/kilowott.css` | Drop-in stylesheet |
| `project/kit/tokens.scss` | Sass tokens |
| `project/kit/tokens.tailwind.js`, `project/kit/tokens.tailwind.css` | Tailwind tokens |
| `project/kit/figma-tokens.json` | Figma tokens |
| `project/downloads/kilowott-colors.ase`, `.gpl`, `.json` | Colour swatches |
| `project/downloads/kilowott-logo.svg` | Logo |

**To change a token:** edit `project/styles/tokens.css`, run `npm run build:tokens`, then run `npm run check`. Never hand-edit a generated file.

## Deploy

Pushing to `main` deploys. Railway runs `node server.mjs` (serve-handler + `serve.json`, plus agent detection — see `server.mjs`), and the domain is `brandkit.kilowott.com`. See [DEPLOY.md](DEPLOY.md).

## File map

```
AGENTS.md              Front door for AI agents: rules, decision tree, files, page index, starter
llms.txt               llmstxt.org index (root)
llms-full.txt          Generated: AGENTS.md + KILOWOTT_BRAND.md + project/llms.txt
KILOWOTT_BRAND.md      Brand reference: principles, tokens, type, logo, imagery, voice
tokens.json            Generated W3C design tokens
manifest.json          All 20 tabs (URL, purpose, contents, source) + kit files + component catalogue
prompts/               Ready-to-paste prompts: claude-code, claude-design, cowork, web-builders
scripts/               build-tokens.mjs, check.mjs, kit-extras.css (hand-written part of kilowott.css)
serve.json             Production server config: redirect, rewrites, Content-Type and CORS headers
railway.json, Procfile Railway start command
project/
  index.html           SPA shell (topbar, drawer, page containers, noscript fallback)
  app.js               Hash router + tweaks panel
  pages/<tab>.js       One file per tab; each defines window.render<Tab>(root)
  styles/tokens.css    Canonical tokens (single source of truth)
  styles/shell.css     App chrome
  llms.txt             Build spec for agents (linked from index.html)
  brand.json           Structured brand data; "tokens" key is generated
  kit/                 Agent-ready assets: kilowott.css, Tailwind, SCSS, Figma tokens, starter/
  downloads/           Deck template, logo SVG, colour swatches (.ase / .gpl / .json)
  assets/              Wordmark SVG, bolt JPG, cleared photos (assets/photos/)
  uploads/             Shutterstock originals: the team's photo library (see below)
```

## Photo library (`project/uploads/`)

`project/uploads/` holds licensed Shutterstock stock, kept as the team’s internal reference library. These images are for Kilowott use only. Do not redistribute them, hotlink them from non-Kilowott work, or treat them as cleared for client deliverables without checking the licence. The cleared images used in the kit live in `project/assets/photos/`.

## Dummy data

Everything shown in the kit is demo content that shows how the brand looks and works. The shared demo client is **Nordhavn Coffee**. Its figures are sample figures, including 3.5× organic traffic in six months. The placeholder person is **Ola Nordmann**. Kilowott’s own company facts are real: kilowott.com, the contact page, the offices in Fredrikstad, Sandnes, Goa and Dubai, and the company phone lines. Never add real third-party people, clients, testimonials, or personal booking links.
