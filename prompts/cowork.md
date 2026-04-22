# Kilowott Design System — Cowork prompt

Paste this into Cowork when you want its agents to operate on-brand for any Kilowott deliverable.

---

You are working inside Cowork on a Kilowott deliverable. Before producing anything, load these:

1. [`tokens.json`](../tokens.json) — colors, type, spacing as machine-readable tokens.
2. [`manifest.json`](../manifest.json) — every component with class name, file, and house rule.
3. [`KILOWOTT_BRAND.md`](../KILOWOTT_BRAND.md) — compact brand reference (hex, fonts, voice, vocab).
4. [`llms.txt`](../llms.txt) — system entry point.

The live prototype is at `project/index.html` — every component, rule, and copy example is there.

## What Cowork should do

- **Design tasks** — consult `prompts/claude-design.md`.
- **Code tasks** — consult `prompts/claude-code.md`.
- **Copy tasks** — use `pages/voice.js` vocabulary, length-ladder, and mechanics.
- **Research or strategy tasks** — stay in the Kilowott voice: outcome-driven, specific, confident, human.

## Hand-off checklist

When Cowork finishes any artifact, validate against these four gates before marking complete:

1. **Tokens only.** No hardcoded hex, no arbitrary pixel values where tokens exist.
2. **One accent moment.** Count the reds. If more than one per surface, cut or justify.
3. **Voice passes.** No banned words (leverage, synergy, etc.), no exclamations, no generic adjectives replacing proof.
4. **Dark/light + density/accent swap works.** If the artifact breaks on any of the 4 Tweaks axes, it's not on-brand yet.

## Cross-tool handoffs

- **Cowork → Claude Code:** pass the same manifest + tokens + voice files plus the `claude-code.md` prompt.
- **Cowork → Claude Design:** pass `claude-design.md` plus the target prototype page to echo.
- **Cowork → Humans:** always include a link to the live prototype and the relevant KILOWOTT_BRAND.md section so the reviewer can fact-check against the source.

## Icons — Lucide only

Kilowott's icon system is **Lucide** ([lucide.dev](https://lucide.dev)), loaded globally. Cowork agents **never hand-draw SVG icons**. Always reference the canonical Lucide name via `<i data-lucide="<name>"></i>` and call `lucide.createIcons({ root })` to hydrate.

Spec (already enforced in global CSS):
- Canvas 24×24, stroke 1.5px (1.25 at 48+)
- `currentColor` — inherits from context
- Accent color is state-only (hover / active / alert)

Full reference: `project/pages/icons.js` (63-icon curated set) + `manifest.json → icon-set` (pattern, hydration, license).

## Cowork-specific notes

- Automations that produce copy should pull their constraint list from `manifest.json` → `voice.length-ladder` and `voice.avoid-vocab`.
- Automations that produce visuals should pull `tokens.json` directly; never transcribe hex values into code the LLM might drift on.
- When Cowork needs to generate a new component class, follow the prefix convention in `manifest.json` (`.db-*` for dashboards, `.k-*` for components, `.dk-*` for deck, `.vc-*` for voice page, etc.).
