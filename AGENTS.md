# AGENTS.md — Kilowott brand kit v1.0

> **If you are an AI agent and you opened `https://brandkit.kilowott.com`, this file is what the site sent you instead of the interactive kit** (which needs JavaScript). Everything you need is below or linked from here. Humans see the interactive kit at https://brandkit.kilowott.com/project/. To get this guide on purpose, request `https://brandkit.kilowott.com/?format=md` or `/AGENTS.md`.

**For AI agents** (Claude Code, Cursor, ChatGPT, Claude Design, v0, Lovable, Bolt, Copilot, …) **and the people driving them.** Read this file first. It tells you what the brand is, which file to read for your task, what to link, and what never to do.

- **Live kit (humans):** https://brandkit.kilowott.com/project/
- **This file:** https://brandkit.kilowott.com/AGENTS.md
- **Everything in one file:** https://brandkit.kilowott.com/llms-full.txt
- **Index (llmstxt.org format):** https://brandkit.kilowott.com/llms.txt
- **Source:** https://github.com/zoeytad/kilowott-design-system (raw files: `https://raw.githubusercontent.com/zoeytad/kilowott-design-system/main/<path>`)

> **The site is a JavaScript single-page app.** Fetching `/project/` gives you an empty shell. Read the text files below, or the page sources at `https://brandkit.kilowott.com/project/pages/<tab>.js` (each one is a template string with the exact CSS and HTML of that tab).

---

## 1. The brand in 60 seconds

- **Light, paper-led, editorial.** White page (`#FFFFFF`), near-black ink type (`#0B0F14`), warm paper sections (`#F6F4F0`), and one hit of Kilowott Red (`#E4022D`). If your output is dark by default, you have misread the brand.
- **Ratio 60 · 30 · 5 · 5 = paper · ink · warm paper · red.**
- **Type trio:** Newsreader (serif display, weight 400, tight, −0.02em) · DM Sans (body and UI) · JetBrains Mono (labels, numbers, code). No other fonts.
- **The signature move:** a serif headline with **one** word in italic red: `Ahead, by <em>design</em>.`
- **Pill buttons**, 1px rules, 8px card radius, 8pt spacing, 1280px container, 96px between sections. No gradients, glows, neon, or drop-shadow-everything.
- **Icons:** Lucide, 1.5px stroke, `currentColor`.
- **Voice:** outcome-driven, specific, confident, human. No exclamation marks. Sentence case. Numbers that can be checked.
- **Tagline:** *Ahead, by design.* (keep the comma). Long form: *We build ahead so you can scale faster, deliver better and create impact.* A middle line (5–8 words) is not decided yet: leave a placeholder, never invent one. The old line “Built for what comes next.” is retired.

---

## 2. Hard rules (never break these)

**Red**
1. One red moment per surface: the italic headline word **or** one stat **or** the primary CTA **or** a thin rule. Count them before you ship.
2. Never red body text, never a red background wash or full red section, never red gradients or tints, never red beside another saturated colour.
3. Small red text (links, inline code, labels) uses `var(--link)` (red-ink `#8A021B`), never brand red. Brand red is 4.8:1 on paper and fails on warm paper.
4. State colours (`--success`, `--warning`, `--info`) are for product UI only, with an icon and a word. Danger is brand red.

**Code**
5. Use tokens (`var(--bg)`, `var(--fg)`, `var(--accent)`, `var(--s-5)`, …), not raw hex. Exceptions: HTML email (inline hex required), colour swatches, third-party platform mock chrome, print mock-ups.
6. Light theme by default. Dark is for breaks (an ink band, a section divider), or when the user asks.
7. Semantic HTML, visible focus (2px accent ring at 3px offset), tabular numerals in columns, `prefers-reduced-motion` respected.

**Voice**
8. No exclamation marks. Sentence case. Oxford comma. Curly quotes. Em dash unspaced. One to nine spelled out, numerals from 10. Every stat has a source and a time window.
9. Avoid: leverage, empower, unlock, synergy, best-in-class, cutting-edge, at scale, seamless, end-to-end, tailored solutions, excited to announce, revolutionary, transformative, world-class.

**Content**
10. **Demo content is fictional.** Use the shared demo client **Nordhavn Coffee** (specialty coffee brand, US launch, SEO + paid social, **3.5× organic traffic in six months** — sample figures, domain `nordhavn-coffee.example`) and the placeholder person **Ola Nordmann**, Senior Strategist, ola.nordmann@kilowott.com, +47 000 00 000. Never real third-party people, companies, logos, testimonials, personal phone numbers, or personal booking links (no HubSpot or Calendly personal URLs).
11. **Company facts are real** and may be used as-is: Kilowott · https://kilowott.com · contact page https://kilowott.com/contact-us/ · offices Fredrikstad · Sandnes · Goa · Dubai · company phone lines and socials in `project/brand.json` → `facts`. Don't invent offices, clients, awards, or numbers.
12. **Imagery:** real photography, no AI-generated images in external work, no stock clichés (handshakes, hard hats, people lined up against a wall). Photos in `project/assets/photos/` are cleared for kit use. `project/uploads/` holds licensed Shutterstock originals: an internal reference library for Kilowott use only. Do not redistribute them or hotlink them from non-Kilowott work.
13. **Logo:** use the supplied wordmark files; navy (`#021032`, `var(--logo)`) on paper and warm paper, white on ink and red. Never redraw, stretch, recolour, or add effects. Navy is for the logo only, not for text or surfaces.

---

## 3. Decision tree: what are you building?

Every web surface starts the same way: **link `kit/kilowott.css`, load Lucide if you need icons, copy the pattern from the tab, then run the checklist in §9.**

| You are building… | Read | Link / download | Copy patterns from |
|---|---|---|---|
| **Landing page / marketing website / web page** | §1–2 here, `KILOWOTT_BRAND.md` §9 voice | `project/kit/kilowott.css`; clone `project/kit/starter/index.html` | `#landing` (`project/pages/landing.js`): 6 heroes + 4 sections. `#components` for nav, footer, forms |
| **React / Next.js / Tailwind app** (v0, Lovable, Bolt, Cursor) | this file §5 | `kit/kilowott.css` + `kit/tokens.tailwind.js` (Tailwind v3 preset) or `kit/tokens.tailwind.css` (v4 `@theme`) | `#components`, `#landing` |
| **Product UI / dashboard** | `project/llms.txt` → Dashboards | `kit/kilowott.css` | `#dashboards` (`.db-*`, KPI tiles, tables, charts, full shell), `#components` (`.k-*`, states) |
| **Slide deck** | `project/llms.txt` → Deck | `project/downloads/kilowott-deck-template.pptx` (15 slides) | `#deck`: 15 layouts, 1920×1080 |
| **HTML email** | `project/llms.txt` → Email | none: email needs inline styles and hex | `#email` (transactional + newsletter), `#newsletter` (block composer, exports Gmail-safe HTML) |
| **Email signature** | — | — | `#signature` generator (3 layouts) |
| **Poster, banner, display ad, OG image, event badge** | `project/llms.txt` → Posters | `kit/kilowott.css` for HTML-rendered artwork | `#posters` (print, OOH, web ads; 4 archetypes; JSON spec in `script#posters-spec` inside `project/pages/posters.js`) |
| **Social post / carousel / story / cover** | `project/llms.txt` → Social | — | `#social` (LinkedIn, X, Facebook, Instagram, cover banners) |
| **Case study** | `project/llms.txt` → Case study, voice ladder (600–900 words) | `kit/kilowott.css` | `#case-study` (situation → decision → result) |
| **Magazine / long-form editorial** | `project/llms.txt` → Magazine | — | `#magazine` (Framework cover + spreads, A4 print specs) |
| **Print: business card, letterhead, envelope** | `project/llms.txt` → Stationery | `project/downloads/kilowott-colors.ase` | `#stationery` (mm specs, CMYK) |
| **Copy only** (headlines, posts, emails) | `KILOWOTT_BRAND.md` §9 | — | `#voice` (principles, dial, vocab, length ladder) |
| **Design file** (Figma, Claude Design) | `KILOWOTT_BRAND.md` | `kit/figma-tokens.json` (Tokens Studio), `downloads/kilowott-colors.ase` | the matching tab |

---

## 4. Files and URLs

All paths are relative to `https://brandkit.kilowott.com/`. Text and JSON files are served with CORS `*`, so you can `fetch()` them.

| File | What it is |
|---|---|
| [`AGENTS.md`](https://brandkit.kilowott.com/AGENTS.md) | This guide |
| [`llms.txt`](https://brandkit.kilowott.com/llms.txt) | llmstxt.org index of the kit |
| [`llms-full.txt`](https://brandkit.kilowott.com/llms-full.txt) | AGENTS.md + KILOWOTT_BRAND.md + project/llms.txt in one file (generated) |
| [`KILOWOTT_BRAND.md`](https://brandkit.kilowott.com/KILOWOTT_BRAND.md) | Brand reference: principles, tokens, type, logo, imagery, voice |
| [`project/llms.txt`](https://brandkit.kilowott.com/project/llms.txt) | Build spec: render recipe, common mistakes, component and pattern specs per surface |
| [`project/brand.json`](https://brandkit.kilowott.com/project/brand.json) | Structured brand data: rules, logo, facts (real) vs demo (fictional), resolved tokens |
| [`tokens.json`](https://brandkit.kilowott.com/tokens.json) | W3C Design Tokens (DTCG): brand, state, semantic, dark theme, type, spacing, radii, shadows, motion |
| [`manifest.json`](https://brandkit.kilowott.com/manifest.json) | Every tab with URL, purpose, contents, source file; components and kit files |
| [`project/kit/kilowott.css`](https://brandkit.kilowott.com/project/kit/kilowott.css) | **The one stylesheet**: fonts + tokens + base + primitives |
| [`project/kit/starter/index.html`](https://brandkit.kilowott.com/project/kit/starter/index.html) | On-brand landing page template to clone |
| [`project/kit/tokens.tailwind.js`](https://brandkit.kilowott.com/project/kit/tokens.tailwind.js) | Tailwind v3 preset |
| [`project/kit/tokens.tailwind.css`](https://brandkit.kilowott.com/project/kit/tokens.tailwind.css) | Tailwind v4 `@theme inline` block |
| [`project/kit/tokens.scss`](https://brandkit.kilowott.com/project/kit/tokens.scss) | Sass variables and maps |
| [`project/kit/figma-tokens.json`](https://brandkit.kilowott.com/project/kit/figma-tokens.json) | Tokens Studio for Figma (light + dark sets) |
| [`project/styles/tokens.css`](https://brandkit.kilowott.com/project/styles/tokens.css) | Canonical token source (everything above is generated from it) |
| [`project/downloads/kilowott-logo.svg`](https://brandkit.kilowott.com/project/downloads/kilowott-logo.svg) | Wordmark, navy `#021032`, vector. The default logo file |
| [`project/downloads/logo/`](https://brandkit.kilowott.com/project/downloads/kilowott-logo-pack.zip) | Full logo set: `kilowott-logo-{navy,white,black}.svg`, `kilowott-logo-navy.pdf`, `kilowott-logo-{navy,white,black}-{300,600,1200,2400}.png` (transparent), two 1200×630 link-preview cards. Every URL with its use is listed in `project/brand.json` → `logo.wordmark.files`; the link here is the zip |
| [`project/assets/kilowott-bolt.jpg`](https://brandkit.kilowott.com/project/assets/kilowott-bolt.jpg) | Bolt mark, 100×100 JPG only (see §8) |
| [`project/downloads/kilowott-colors.ase`](https://brandkit.kilowott.com/project/downloads/kilowott-colors.ase) | Adobe swatches (Illustrator, InDesign, Photoshop) |
| [`project/downloads/kilowott-colors.gpl`](https://brandkit.kilowott.com/project/downloads/kilowott-colors.gpl) | GIMP / Inkscape / Krita palette |
| [`project/downloads/kilowott-colors.json`](https://brandkit.kilowott.com/project/downloads/kilowott-colors.json) | Swatches as JSON (hex, RGB, role) |
| [`project/downloads/kilowott-deck-template.pptx`](https://brandkit.kilowott.com/project/downloads/kilowott-deck-template.pptx) | PowerPoint template, 15 slides |
| [`prompts/`](https://github.com/zoeytad/kilowott-design-system/tree/main/prompts) | Ready-to-paste prompts: `claude-code.md`, `claude-design.md`, `cowork.md`, `web-builders.md` |

---

## 5. Getting the tokens in your format

<!-- tokens:start variant=compact -->
<!-- Generated by scripts/build-tokens.mjs from project/styles/tokens.css. Do not edit by hand: run `npm run build:tokens`. -->

### Brand colours

| Token | Hex | Role |
|---|---|---|
| `--k-ink` | `#0B0F14` | near-black, primary text, hero backgrounds |
| `--k-ink-2` | `#1A2230` | secondary surface dark |
| `--k-ink-3` | `#2B3544` | tertiary, borders on dark |
| `--k-paper` | `#FFFFFF` | primary surface |
| `--k-paper-2` | `#F6F4F0` | warm off-white, section breaks |
| `--k-paper-3` | `#EDEAE3` | warmer still, cards on paper |
| `--k-red` | `#E4022D` | signature — use sparingly |
| `--k-red-soft` | `#FCE5EA` | tinted bg for red accents |
| `--k-red-ink` | `#8A021B` | darkened red for text on paper |
| `--k-rule` | `#1A2230` | rules/borders on paper |
| `--k-rule-soft` | `#E2DED6` | soft divider on paper |
| `--k-muted` | `#5B6573` | secondary text on paper |
| `--k-muted-dark` | `#8A95A5` | secondary text on ink |
| `--k-red-hover` | `#B40224` | pressed / hover state for red fills |
| `--k-navy` | `#021032` | logo navy: the wordmark on paper, nothing else |

### State colours (product UI only, never marketing)

| Token | Hex | Role |
|---|---|---|
| `--k-success` | `#1A7F35` | success text, icons, dots · 5.1:1 on paper |
| `--k-success-soft` | `#E8F3EB` | success tint (badge / banner background) |
| `--k-warning` | `#9A6200` | warning text, icons, dots · 5.1:1 on paper |
| `--k-warning-soft` | `#FBF1E0` | warning tint (badge / banner background) |
| `--k-info` | `#1A4E8A` | info text, icons, dots · 8.4:1 on paper |
| `--k-info-soft` | `#E6EDF5` | info tint (badge / banner background) |

### Semantic tokens (use these in CSS; they switch with the theme)

| Token | Light (default) | Dark (`[data-theme="dark"]`) | Use for |
|---|---|---|---|
| `--bg` | `#FFFFFF` (`--k-paper`) | `#0B0F14` (`--k-ink`) | page background |
| `--bg-2` | `#F6F4F0` (`--k-paper-2`) | `#1A2230` (`--k-ink-2`) | warm paper: section breaks, cards on paper |
| `--bg-3` | `#EDEAE3` (`--k-paper-3`) | `#2B3544` (`--k-ink-3`) | warmer card on paper |
| `--fg` | `#0B0F14` (`--k-ink`) | `#FFFFFF` (`--k-paper`) | primary text |
| `--fg-2` | `#5B6573` (`--k-muted`) | `#8A95A5` (`--k-muted-dark`) | secondary text |
| `--accent` | `#E4022D` (`--k-red`) | `#E4022D` (`--k-red`) | signature red: one spotlight per surface |
| `--accent-ink` | `#8A021B` (`--k-red-ink`) | `#FCE5EA` (`--k-red-soft`) | red for small text on paper |
| `--rule` | `#E2DED6` (`--k-rule-soft`) | `#2B3544` | soft divider |
| `--rule-strong` | `#1A2230` (`--k-rule`) | `#3B4656` | strong rule / button border |
| `--accent-hover` | `#B40224` (`--k-red-hover`) | `#B40224` (`--k-red-hover`) | hover / pressed state for red fills |
| `--success` | `#1A7F35` (`--k-success`) | `#5BC27A` | state: success (product UI only) |
| `--success-soft` | `#E8F3EB` (`--k-success-soft`) | `rgba(91,194,122,0.12)` | state: success tint |
| `--warning` | `#9A6200` (`--k-warning`) | `#E0A43A` | state: warning (product UI only) |
| `--warning-soft` | `#FBF1E0` (`--k-warning-soft`) | `rgba(224,164,58,0.12)` | state: warning tint |
| `--info` | `#1A4E8A` (`--k-info`) | `#7FA8E0` | state: info (product UI only) |
| `--info-soft` | `#E6EDF5` (`--k-info-soft`) | `rgba(127,168,224,0.12)` | state: info tint |
| `--danger` | `#E4022D` (`--accent`) | `#E4022D` (`--accent`) | state: danger = brand red |
| `--danger-soft` | `#FCE5EA` (`--k-red-soft`) | `#FCE5EA` (`--k-red-soft`) | state: danger tint |
| `--link` | `#8A021B` (`--accent-ink`) | `#FCE5EA` (`--accent-ink`) | text links, inline code, small red text |
| `--logo` | `#021032` (`--k-navy`) | `#FFFFFF` (`--k-paper`) | the wordmark: navy on paper, white on ink |

**Fonts:** `--font-display` "Newsreader", ui-serif, Georgia, serif · `--font-sans` "DM Sans", ui-sans-serif, system-ui, sans-serif · `--font-mono` "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace

**Spacing (8pt):** `--s-0` 0 · `--s-1` 4px · `--s-2` 8px · `--s-3` 12px · `--s-4` 16px · `--s-5` 24px · `--s-6` 32px · `--s-7` 48px · `--s-8` 64px · `--s-9` 96px · `--s-10` 128px

**Radii:** `--r-0` 0 · `--r-1` 2px · `--r-2` 4px · `--r-3` 8px · `--r-4` 12px · `--r-pill` 999px

Full tables (type scale, shadows, motion, contrast): https://brandkit.kilowott.com/KILOWOTT_BRAND.md#2-tokens
<!-- tokens:end -->

| You use… | Do this |
|---|---|
| Plain HTML / any framework | `<link rel="stylesheet" href="https://brandkit.kilowott.com/project/kit/kilowott.css">` then `var(--bg)`, `var(--fg)`, `var(--accent)`, `var(--s-5)` |
| Tailwind v3 | download `project/kit/tokens.tailwind.js`, then `presets: [require('./tokens.tailwind.js')]`. Classes: `bg-bg text-fg text-fg-2 border-rule text-link bg-accent font-display text-d1 p-s-5 rounded-pill shadow-k-2`, brand hex as `bg-k-paper-2` |
| Tailwind v4 | `@import "tailwindcss"; @import "https://brandkit.kilowott.com/project/kit/kilowott.css"; @import "https://brandkit.kilowott.com/project/kit/tokens.tailwind.css";` (or copy both files locally) |
| Sass | `@use "tokens"` with `project/kit/tokens.scss` (`$k-ink`, `$bg`, `$s-5`, maps `$kilowott-theme-light/-dark`) |
| JS / design-token tooling (Style Dictionary, etc.) | `fetch('https://brandkit.kilowott.com/tokens.json')`: DTCG `$value`/`$type`, aliases like `{color.brand.paper}`, dark overrides under `theme.dark` |
| Resolved values, no aliases | `project/brand.json` → `tokens` (hex for light and dark, contrast ratios) |
| Figma | import `project/kit/figma-tokens.json` with Tokens Studio; swatches via `kilowott-colors.ase` |
| Dark theme | `<html data-theme="dark">` with kilowott.css; or wrap a band in `.section--ink` |

---

## 6. Page index: the 22 pages

Live: `https://brandkit.kilowott.com/project/#<id>` · Source: `https://brandkit.kilowott.com/project/pages/<id>.js`

The sidebar groups the pages by task: **Start** (Home, Downloads) · **Brand basics** (Logo, Colour, Type, Imagery, Voice) · **Make something** (Social media, Posters & ads, Presentations, Email & newsletters, Email signature, Print & stationery, Case studies & editorial) · **Build for web** (Foundations, Components, Icons, Landing pages, Dashboards, Developers & AI). Every page opens with a “Rules at a glance” do / never box. Deep links: `#<id>/<element-id>`.

| Tab (`#id`) | What it contains | Use it when |
|---|---|---|
| Home (`#overview`) | Search, eight task tiles, the brand in 60 seconds, most-used files, four principles | Orientation |
| Downloads (`#downloads`) | Every file in one place: logo, swatches, deck template, starter page, CSS, Tailwind, Sass, tokens, Figma tokens, AI files | Getting a file |
| Developers & AI (`#developers`) | Copy-paste prompt for AI tools, tokens by format, machine-readable files | Briefing an AI tool, wiring tokens into code |
| Logo (`#logo`) | Wordmark anatomy, bolt mark, clear space and sizes, placements, CSS-mask implementation, don’ts | Placing the logo anywhere |
| Color (`#color`) | Core palette, 60·30·5·5, alt accents, three recipes (paper, ink, warm), red rules, accessibility table, state colours | Any colour decision |
| Type (`#type`) | Newsreader + DM Sans pairing, 9-step scale, headline patterns, JetBrains Mono usage | Setting type |
| Foundations (`#foundations`) | 8pt spacing, 12-column grid, radii, elevation, motion, full token dump | Layout and spacing |
| Icons (`#icons`) | Lucide rules, usage, sizes, 69-icon curated starter set in 6 categories | Choosing icons |
| Components (`#components`) | Buttons, badges, eyebrows, forms, cards, stat and case cards, tabs, breadcrumbs, UI states, modal, toast, tooltip, accordion, dropdown, avatar, alert, pagination, table, top nav, footer, search (`.k-*`) | Any UI element |
| Landing (`#landing`) | 6 hero patterns (editorial, stat-led, image-right, full-bleed, proof, video-poster) + 4 sections (three-up, feature split, stat strip, final CTA), house rules | Landing pages and websites |
| Dashboards (`#dashboards`) | Rules for dense surfaces, KPI tiles, deltas, sparklines, tables, meters, toolbars, spreadsheet, OHLC, tree grid, waterfall, heatmap, forecast, full shell (`.db-*`) | Product UI, analytics |
| Deck (`#deck`) | 15 slide layouts, four deck rules, canvas specs, .pptx template | Presentations |
| Email (`#email`) | Five email rules, receipt, welcome, quarterly newsletter, specs (600px, inline styles) | HTML email |
| Signature (`#signature`) | Generator with 3 layouts, copies Gmail-ready HTML | Email signatures |
| Newsletter (`#newsletter`) | Block composer (11 blocks), exports email-safe HTML or plain text | Newsletters |
| Stationery (`#stationery`) | Business card, letterhead, compliments slip, envelope, notebook, folder, sticker; print specs | Print |
| Case study (`#case-study`) | Seven rules, full rendered template, checklist | Case studies |
| Magazine (`#magazine`) | Framework cover, article spreads, five pillars, print specs | Editorial long-form |
| Imagery (`#imagery`) | Four principles, five categories, grades, crops, mistakes, placeholders, approved library, sourcing | Choosing or treating photos |
| Voice (`#voice`) | Principles, service lines, tone dial, registers, before/after, vocab, mechanics, length ladder | Writing anything |
| Social media (`#social`) | Where to post (LinkedIn first), six post types with copy formulas (proof, point of view, people, hiring, event, end card), LinkedIn document carousel, post editor with PNG export, feed previews for LinkedIn, Instagram, X, Facebook, profile kit | Any social post |
| Posters & banners (`#posters`) | Print posters (A3/A2/A1/18×24in), roll-up 850×2000mm, backdrop, 48-sheet billboard, flyer, event badge; IAB display ads, Meta/LinkedIn ad set, OG 1200×630, YouTube thumbnail, email hero; 4 archetypes (Statement, Stat, Photo-led, Event) | Posters, ads, banners, OG images |

---

## 7. Starter page (copy, paste, edit)

A fuller version with nav, stats, services, case card, and footer: https://brandkit.kilowott.com/project/kit/starter/index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nordhavn Coffee × Kilowott — demo page</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://brandkit.kilowott.com/project/kit/kilowott.css">
  <script src="https://unpkg.com/lucide@1.66.0/dist/umd/lucide.min.js" defer></script>
</head>
<body>
  <!-- Demo content: Nordhavn Coffee and its figures are fictional sample data. -->
  <header class="k-nav">
    <div class="k-nav__inner">
      <a href="/" class="k-logo" aria-label="Kilowott"></a>
      <ul class="k-nav__links">
        <li><a href="#work">Work</a></li>
        <li><a href="#services">Services</a></li>
      </ul>
      <a class="btn btn--primary btn--sm" href="https://kilowott.com/contact-us/">Talk to us</a>
    </div>
  </header>

  <main>
    <section class="k-hero">
      <div class="container">
        <span class="eyebrow">Kilowott for Brands</span>
        <h1 class="display">A US launch that <em>compounds</em>.</h1>
        <p class="lede">Nordhavn Coffee came to the US with a strong product and no search footprint. Six months of SEO and paid social later, organic traffic is up 3.5×.</p>
        <div class="k-hero__actions">
          <a class="btn btn--primary" href="#work">Read the case <i data-lucide="arrow-right" class="btn__arrow"></i></a>
          <a class="btn btn--ghost" href="https://kilowott.com/contact-us/">Start a project</a>
        </div>
      </div>
    </section>

    <section class="section section--warm" id="work">
      <div class="container grid grid-3">
        <div class="stat"><div class="stat__num">3.5×</div><div class="stat__label">organic traffic</div><div class="stat__source">Sample figure · 6 months</div></div>
        <div class="stat"><div class="stat__num">−21%</div><div class="stat__label">cost per acquisition</div><div class="stat__source">Sample figure · 6 months</div></div>
        <div class="stat"><div class="stat__num">58</div><div class="stat__label">page-one keywords</div><div class="stat__source">Sample figure · 6 months</div></div>
      </div>
    </section>
  </main>

  <footer class="k-footer">
    <div class="container">Fredrikstad · Sandnes · Goa · Dubai · <a href="https://kilowott.com">kilowott.com</a></div>
  </footer>
  <script>addEventListener('DOMContentLoaded', () => window.lucide && lucide.createIcons());</script>
</body>
</html>
```

One red moment: the italic *compounds*. The CTA is ink, the stats are ink. If you add a red button, take the red off the headline word.

---

## 8. Known gaps

- **Bolt mark is raster only:** `project/assets/kilowott-bolt.jpg`, 100×100 JPG. There is no vector bolt. Don’t trace, redraw, or upscale it into a fake vector; use the wordmark, or ask the Kilowott brand team for the master file.
- **Fonts are Google Fonts only**: no self-hosted font files in the kit.
- **Print colour** is specified on the Stationery tab (red CMYK 0/100/87/5, nearest Pantone 186 C); there is no Pantone-licensed swatch book. The `.ase` file is RGB.
- **The live site needs JavaScript.** Use the text files for reading; use the browser for looking.

---

## 9. Checklist before you hand anything back

1. Background is paper (or warm paper). Text is ink. It looks calm.
2. Count the reds: exactly one red moment. Links and small red text use `--link`.
3. Headlines are Newsreader 400 with at most one italic word. Body is DM Sans. Numbers in columns are tabular.
4. Tokens only (except email/print/swatches). Works with `data-theme="dark"` if it is a product surface.
5. Copy passes voice: no exclamation marks, no banned words, sentence case, numbers sourced.
6. All people, clients, quotes, and numbers are fictional (Nordhavn Coffee, Ola Nordmann) unless they are Kilowott company facts.
7. Icons are Lucide at 1.5 stroke. Logo is the supplied wordmark file, navy on light or white on dark, with clear space.
8. Focus states are visible; contrast is AA (see the contrast table in `KILOWOTT_BRAND.md` §2).

---

## 10. Working on this repo (agents editing the kit itself)

- Static SPA, no build step for the site: `project/index.html` + `project/app.js` (hash router) + `project/pages/<tab>.js` (each defines `window.render<Tab>(root)`) + `project/styles/tokens.css` + `project/styles/shell.css`.
- Run locally: `python3 -m http.server 8723` from the repo root, open http://localhost:8723/project/.
- **Tokens:** edit only `project/styles/tokens.css`, then `npm run build:tokens`. Never hand-edit generated files (`tokens.json`, `llms-full.txt`, `project/kit/*` except `starter/`, the `tokens` key in `project/brand.json`, `<!-- tokens:start -->` blocks, `project/downloads/kilowott-colors.*`, `project/downloads/kilowott-logo.svg`, `project/downloads/logo/*.svg`).
- **Before pushing:** `npm run check` (syntax, generated files in sync, contrast claims, manifest vs router, links, escape bugs). CI runs the same on every push and PR.
- Inside template strings, CSS escapes must be doubled: write `\\201C`, not `\201C`.
- Push to `main` deploys to https://brandkit.kilowott.com (Railway). See `DEPLOY.md`.
