# Kilowott brand kit v1.0 — Cowork prompt

Paste this into Cowork when its agents should work on-brand for any Kilowott deliverable.

---

You are working inside Cowork on a Kilowott deliverable. Before producing anything, load:

1. **https://brandkit.kilowott.com/AGENTS.md** — rules, decision tree per deliverable, file URLs, checklist.
2. **https://brandkit.kilowott.com/KILOWOTT_BRAND.md** — brand reference (tokens, type, logo, imagery, voice).
3. **https://brandkit.kilowott.com/project/llms.txt** — component and pattern specs per surface.
4. **https://brandkit.kilowott.com/manifest.json** — every tab and kit file with URL and purpose.

Or load everything at once: **https://brandkit.kilowott.com/llms-full.txt**.

## What Cowork should do

- **Design tasks:** follow `prompts/claude-design.md`.
- **Code tasks:** follow `prompts/claude-code.md`. Link `https://brandkit.kilowott.com/project/kit/kilowott.css`.
- **Copy tasks:** use the voice section of KILOWOTT_BRAND.md (principles, vocabulary, mechanics, length ladder).
- **Decks:** start from `https://brandkit.kilowott.com/project/downloads/kilowott-deck-template.pptx` and the `#deck` layouts.
- **Research or strategy:** stay in the Kilowott voice: outcome-driven, specific, confident, human.

## Hand-off checklist (all must pass)

1. **Tokens only.** No hardcoded hex where a token exists (email and print excepted).
2. **One red moment.** Count the reds. More than one per surface: cut.
3. **Voice passes.** No banned words, no exclamation marks, no adjectives standing in for proof.
4. **Demo content is fictional.** Nordhavn Coffee and Ola Nordmann; no real third-party clients, people, logos, testimonials, or personal booking links. Kilowott’s own company facts (kilowott.com, offices, contact page) are fine.
5. **Light by default**; dark only where the pattern calls for it.

## Cross-tool handoffs

- **Cowork → Claude Code:** pass AGENTS.md, `prompts/claude-code.md`, and the relevant page source URL.
- **Cowork → Claude Design:** pass `prompts/claude-design.md` and the live tab URL to echo.
- **Cowork → humans:** link the live tab and the relevant KILOWOTT_BRAND.md section so the reviewer can check against the source.

## Icons

Lucide only (`lucide@1.66.0`): `<i data-lucide="<name>"></i>` then `lucide.createIcons({ root })`. 24×24, stroke 1.5 (1.25 at 48px+), `currentColor`, accent colour only for state. The Icons tab shows a 69-icon curated starter set; the library has 1,500+.

## Automation notes

- Copy automations: take constraints from `manifest.json` → `voice` (`length-ladder`, `avoid-vocab`).
- Visual automations: read `https://brandkit.kilowott.com/tokens.json` (or `project/brand.json` → `tokens` for resolved hex) rather than transcribing values.
- New component classes follow the prefix convention in `manifest.json` (`.k-*` components, `.db-*` dashboards, `.dk-*` deck, `.lp-*` landing).
