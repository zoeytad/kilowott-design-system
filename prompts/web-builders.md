# Kilowott brand kit v1.0 — prompt for web builders

For v0, Lovable, Bolt, Cursor, ChatGPT, Gemini, Copilot, or any agent that builds pages. Paste the block below, then describe what you want built.

---

Build this on the **Kilowott brand kit v1.0**. First read https://brandkit.kilowott.com/AGENTS.md (if you can’t fetch URLs, use the rules below; they are enough).

**Setup**
- Load the stylesheet `https://brandkit.kilowott.com/project/kit/kilowott.css` (it imports the fonts and defines every token and the primitives `.display`, `.eyebrow`, `.btn`, `.btn--primary`, `.btn--accent`, `.chip`, `.card`, `.stat`, `.section`, `.section--warm`, `.section--ink`, `.container`, `.grid-3`, `.k-nav`, `.k-hero`, `.k-footer`, `.k-logo`).
- Tailwind v3: use the preset `https://brandkit.kilowott.com/project/kit/tokens.tailwind.js`. Tailwind v4: import `https://brandkit.kilowott.com/project/kit/tokens.tailwind.css` after kilowott.css. Use semantic classes (`bg-bg`, `text-fg`, `text-fg-2`, `border-rule`, `text-link`, `bg-accent`) so dark mode works.
- Template to start from: https://brandkit.kilowott.com/project/kit/starter/index.html
- Icons: Lucide (`lucide@1.66.0` or `lucide-react`), stroke width 1.5, `currentColor`.

**Look**
- White paper background `#FFFFFF`, ink text `#0B0F14`, warm paper `#F6F4F0` for section breaks, ink for an occasional dark band. Ratio 60·30·5·5 (paper · ink · warm paper · red). Light by default.
- Headlines: Newsreader, weight 400, line-height 1.04, letter-spacing −0.02em. Body: DM Sans 16px / 1.55. Labels and numbers: JetBrains Mono.
- **Exactly one red (`#E4022D`) moment per page or section-sized surface:** one italic `<em>` word in the hero headline, or one stat, or one primary CTA. Links use red-ink `#8A021B` (`var(--link)`). Never red backgrounds or red body text.
- Pill buttons (primary = ink fill), 1px rules, 8px card radius, 8pt spacing, 1280px container, 96px between sections. No gradients, glows, neon, glassmorphism, emoji, or AI-generated imagery.

**Words**
- Outcome-driven, specific, confident, human. Hero 4–9 words; lede 25–40 words. No exclamation marks. Sentence case. Oxford comma. Curly quotes. Numbers that cite a source and window.
- Never: leverage, empower, unlock, synergy, best-in-class, cutting-edge, at scale, seamless, end-to-end, tailored solutions, excited to announce, revolutionary, world-class.

**Content**
- All example content is fictional. Client: **Nordhavn Coffee** (specialty coffee brand, US launch, SEO + paid social, 3.5× organic traffic in six months, sample figures). Person: **Ola Nordmann**, Senior Strategist, ola.nordmann@kilowott.com. No real third-party companies, people, logos, or testimonials.
- Real Kilowott facts you may use: kilowott.com · contact page https://kilowott.com/contact-us/ · offices Fredrikstad · Sandnes · Goa · Dubai · tagline “Ahead, by design.”
- Logo: `https://brandkit.kilowott.com/project/downloads/kilowott-logo.svg` (or `.k-logo` from kilowott.css). Don’t redraw it.

**Before you answer:** count the reds (one), check the background is paper, check there are no exclamation marks or banned words, and check every name and number is fictional or a real Kilowott fact.
