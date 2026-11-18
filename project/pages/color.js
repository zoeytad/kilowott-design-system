/* ============================================================
   COLOR PAGE
   ------------------------------------------------------------
   FOR AGENTS: every brand hex shown here is READ AT RENDER TIME
   from project/styles/tokens.css (custom properties on :root),
   so tokens.css is the single source of truth. Contrast ratios
   are COMPUTED (WCAG 2.x relative luminance), never typed in.
   A11Y_PAIRS below is also parsed by scripts/check.mjs.
   Machine-readable palette: /tokens.json · /project/brand.json
   ============================================================ */

/* Pairs shown in the accessibility table. fg/bg are token names
   (resolved from tokens.css) or literal hexes. Keep this array a
   plain literal so scripts/check.mjs can parse it. */
const A11Y_PAIRS = [
  { fg: '--k-ink',        bg: '--k-paper',   fgName: 'Ink',        bgName: 'Paper',      use: 'Body text, headlines' },
  { fg: '--k-ink-2',      bg: '--k-paper',   fgName: 'Ink 2',      bgName: 'Paper',      use: 'Long-form body' },
  { fg: '--k-muted',      bg: '--k-paper',   fgName: 'Muted',      bgName: 'Paper',      use: 'Secondary text, captions' },
  { fg: '--k-muted',      bg: '--k-paper-2', fgName: 'Muted',      bgName: 'Warm',       use: 'Captions on warm sections' },
  { fg: '--k-red',        bg: '--k-paper',   fgName: 'Red',        bgName: 'Paper',      use: 'Emphasis word, stat, CTA label' },
  { fg: '--k-paper',      bg: '--k-red',     fgName: 'Paper',      bgName: 'Red',        use: 'Label on red button' },
  { fg: '--k-red',        bg: '--k-paper-2', fgName: 'Red',        bgName: 'Warm',       use: 'Large display only' },
  { fg: '--k-red',        bg: '--k-ink',     fgName: 'Red',        bgName: 'Ink',        use: 'Large display only' },
  { fg: '--k-red-ink',    bg: '--k-paper',   fgName: 'Red ink',    bgName: 'Paper',      use: 'Text links, inline code' },
  { fg: '--k-paper',      bg: '--k-ink',     fgName: 'Paper',      bgName: 'Ink',        use: 'Type on dark hero' },
  { fg: '--k-muted-dark', bg: '--k-ink',     fgName: 'Muted dark', bgName: 'Ink',        use: 'Secondary text on dark' },
  { fg: '--k-success',    bg: '--k-paper',   fgName: 'Success',    bgName: 'Paper',      use: 'State text, product UI' },
  { fg: '--k-warning',    bg: '--k-paper',   fgName: 'Warning',    bgName: 'Paper',      use: 'State text, product UI' },
  { fg: '--k-info',       bg: '--k-paper',   fgName: 'Info',       bgName: 'Paper',      use: 'State text, product UI' },
];

window.renderColor = function (root) {
  /* ---------- helpers ---------- */
  const css = getComputedStyle(document.documentElement);
  const tok = (name) => {
    if (!name.startsWith('--')) return name.toUpperCase();
    const v = css.getPropertyValue(name).trim();
    return (v || '#000000').toUpperCase();
  };
  const rgb = (hex) => { const h = hex.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const lum = (hex) => {
    const c = rgb(hex).map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const textOn = (hex) => (ratio('#FFFFFF', hex) >= ratio('#0B0F14', hex) ? '#FFFFFF' : '#0B0F14');

  /* ---------- palette data (hex resolved from tokens.css) ---------- */
  const CORE = [
    { name: 'Paper',        token: '--k-paper',   role: 'bg default · 60%' },
    { name: 'Ink',          token: '--k-ink',     role: 'fg default · 30%' },
    { name: 'Warm Paper',   token: '--k-paper-2', role: 'section break · 5%' },
    { name: 'Kilowott Red', token: '--k-red',     role: 'accent, use sparingly · 5%' },
  ];
  const EXTENDED = [
    { name: 'Ink 2',      token: '--k-ink-2',      role: 'dark surface, long-form body' },
    { name: 'Ink 3',      token: '--k-ink-3',      role: 'borders on dark' },
    { name: 'Paper 3',    token: '--k-paper-3',    role: 'cards on warm paper' },
    { name: 'Rule',       token: '--k-rule-soft',  role: 'soft divider' },
    { name: 'Muted',      token: '--k-muted',      role: 'secondary text on paper' },
    { name: 'Muted Dark', token: '--k-muted-dark', role: 'secondary text on ink' },
    { name: 'Red Ink',    token: '--k-red-ink',    role: 'links & small red text' },
    { name: 'Red Soft',   token: '--k-red-soft',   role: 'accent tint bg' },
  ];
  const ALT = [
    { name: 'Deeper Red',    hex: '#C8102E', role: 'alt · editorial, print' },
    { name: 'Signal Orange', hex: '#F05A28', role: 'alt · Workforce, energy' },
    { name: 'Electric Blue', hex: '#1F3CFF', role: 'alt · Intelligence, product' },
    { name: 'Ink Mono',      hex: '#0B0F14', role: 'alt · mono, restraint' },
  ];
  const STATES = [
    { name: 'Success', token: '--k-success', soft: '--k-success-soft', word: 'Live',  use: 'Live status dots, paid badges, success toasts, confirm modals. <b>Never</b> decorative.' },
    { name: 'Warning', token: '--k-warning', soft: '--k-warning-soft', word: 'Watch', use: 'Threshold breached but not broken. Review-required, rate-limited, nearing capacity.' },
    { name: 'Info',    token: '--k-info',    soft: '--k-info-soft',    word: 'Info',  use: 'Notices, tooltips, beta tags, feature announcements. Muted, never shouts.' },
    { name: 'Danger',  token: '--k-red',     soft: '--k-red-soft',     word: 'Error', use: 'Errors, destructive confirms, breach alerts. The brand red IS the danger colour &mdash; no separate value.' },
  ];

  const swatch = (s) => {
    const hex = s.hex || tok(s.token);
    const [r, g, b] = rgb(hex);
    const fg = textOn(hex);
    const edge = hex === '#FFFFFF' ? 'box-shadow: inset 0 0 0 1px var(--rule);' : '';
    return `
      <button type="button" class="cl-sw" data-copy="${hex}" aria-label="Copy ${s.name} ${hex}">
        <span class="cl-sw__color" style="background:${hex}; ${edge}"><span style="color:${fg}">${s.name}</span><i data-lucide="copy" style="color:${fg}"></i></span>
        <span class="cl-sw__meta">
          <span class="cl-sw__name">${s.name}</span>
          <span class="cl-sw__hex">${hex} · RGB ${r} ${g} ${b}</span>
          <span class="cl-sw__token">${s.token ? s.token + ' · ' : ''}${s.role}</span>
        </span>
      </button>`;
  };

  const a11yRow = (p) => {
    const fg = tok(p.fg), bg = tok(p.bg);
    const r = ratio(fg, bg);
    const body = r >= 4.5, large = r >= 3;
    const mark = (ok, label) => `<div class="${ok ? 'pass' : 'fail'}"><i data-lucide="${ok ? 'check' : 'x'}"></i> ${label}</div>`;
    return `
      <div class="cl-a11y-row">
        <div><span class="cl-a11y-chip" style="background:${fg}"></span>${p.fgName}</div>
        <div><span class="cl-a11y-chip" style="background:${bg}"></span>${p.bgName}</div>
        <div class="mono">${r.toFixed(2)} : 1</div>
        ${mark(body, body ? 'Pass' : 'Fail')}
        ${mark(large, large ? 'Pass' : 'Fail')}
        <div class="cl-a11y-use">${p.use}</div>
      </div>`;
  };

  const stateCard = (s) => {
    const hex = tok(s.token);
    const r = ratio(hex, '#FFFFFF');
    const note = s.name === 'Danger' ? 'Brand red &mdash; same hex' : `${r.toFixed(1)}:1 on paper &middot; AA ${r >= 4.5 ? 'pass' : 'fail'}`;
    const tokenName = s.name.toLowerCase();
    return `
      <div class="cl-state-card">
        <div class="cl-state-card__swatch" style="background:${hex}; color:#fff;">${s.word}</div>
        <div class="cl-state-card__body">
          <div class="cl-state-card__name">${s.name}</div>
          <div class="cl-state-card__hex"><b>${hex}</b><span>${note}</span></div>
          <div class="cl-state-card__tokens">
            --${tokenName}${s.name === 'Danger' ? ': var(--accent)' : ''}<br>
            --${tokenName}-soft${s.name === 'Danger' ? ': var(--k-red-soft)' : ''}
          </div>
        </div>
        <div class="cl-state-card__use"><b>Where &mdash;</b> ${s.use}</div>
      </div>`;
  };

  root.innerHTML = `
  <style>
    .cl-hero {
      display: grid; grid-template-columns: 1.2fr 1fr; gap: 0;
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .cl-hero { grid-template-columns: 1fr; } }
    .cl-hero__text {
      padding: var(--s-9) var(--s-7) var(--s-8);
      border-right: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .cl-hero__text { border-right: 0; padding: var(--s-7) var(--gutter); } }
    .cl-hero__demo {
      background: var(--k-paper);
      display: grid; place-items: center; align-content: center; padding: var(--s-7);
      min-height: 500px;
    }
    @media (max-width: 900px) { .cl-hero__demo { min-height: 0; padding: var(--s-6) var(--gutter); } }
    .cl-hero__ratios {
      display: flex; width: 100%; max-width: 520px; height: 72px;
      border-radius: var(--r-3); overflow: hidden;
      box-shadow: var(--shadow-2);
    }
    .cl-hero__ratios > div { min-width: 0; }
    .cl-hero__ratios > div:nth-child(1) { flex: 60; background: var(--k-paper); box-shadow: inset 0 0 0 1px var(--k-rule-soft); }
    .cl-hero__ratios > div:nth-child(2) { flex: 30; background: var(--k-ink); }
    .cl-hero__ratios > div:nth-child(3) { flex: 5;  background: var(--k-paper-2); }
    .cl-hero__ratios > div:nth-child(4) { flex: 5;  background: var(--k-red); }
    .cl-legend {
      display: grid; grid-template-columns: repeat(4, auto); justify-content: space-between;
      gap: 8px 16px; width: 100%; max-width: 520px; margin-top: 16px;
      font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--k-muted);
    }
    @media (max-width: 480px) { .cl-legend { grid-template-columns: repeat(2, auto); } }
    .cl-legend span { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .cl-legend i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; box-shadow: inset 0 0 0 1px rgba(11,15,20,.12); }
    .cl-legend b { color: var(--k-ink); font-weight: 500; }

    /* Swatches */
    .cl-row {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    @media (max-width: 900px) { .cl-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .cl-sw {
      all: unset; box-sizing: border-box; cursor: pointer;
      display: flex; flex-direction: column;
      border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
      min-height: 220px; min-width: 0;
    }
    .cl-sw:focus-visible { outline: 2px solid var(--fg); outline-offset: -2px; }
    .cl-sw__color { flex: 1; padding: 20px; display: flex; align-items: flex-end; justify-content: space-between; }
    .cl-sw__color span {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .cl-sw__color .lucide { width: 14px; height: 14px; opacity: 0; transition: opacity var(--dur-fast) var(--ease-standard); }
    .cl-sw:hover .cl-sw__color .lucide, .cl-sw:focus-visible .cl-sw__color .lucide { opacity: .8; }
    .cl-sw__meta {
      display: block; padding: 16px 20px; background: var(--bg); color: var(--fg);
      border-top: 1px solid var(--rule);
      font-size: var(--fs-sm);
    }
    .cl-sw__meta > span { display: block; }
    .cl-sw__name { font-weight: 500; }
    .cl-sw__hex  { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); margin-top: 4px; }
    .cl-sw__token { font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); margin-top: 2px; overflow-wrap: anywhere; }
    .cl-toast {
      position: fixed; left: 50%; bottom: 24px; transform: translate(-50%, 20px);
      background: var(--fg); color: var(--bg); padding: 10px 16px; border-radius: var(--r-pill);
      font-family: var(--font-mono); font-size: 12px; opacity: 0; pointer-events: none;
      transition: all var(--dur-standard) var(--ease-standard); z-index: 100;
    }
    .cl-toast.is-on { opacity: 1; transform: translate(-50%, 0); }

    /* Usage recipes */
    .cl-recipe {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
      display: flex; flex-direction: column;
    }
    .cl-recipe__preview {
      padding: var(--s-7) var(--s-6);
      min-height: 280px;
      display: flex; flex-direction: column; justify-content: center; gap: 16px;
    }
    .cl-recipe__meta {
      padding: 16px 24px; border-top: 1px solid var(--rule);
      display: flex; justify-content: space-between; align-items: center; gap: 12px;
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
    }
    .cl-recipe--paper { background: var(--k-paper);   color: var(--k-ink); }
    .cl-recipe--ink   { background: var(--k-ink);     color: var(--k-paper); }
    .cl-recipe--warm  { background: var(--k-paper-2); color: var(--k-ink); }
    .cl-recipe__eyebrow {
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .cl-recipe__eyebrow::before { content: ""; width: 20px; height: 1px; background: currentColor; }
    .cl-recipe__h {
      font-family: var(--font-display); font-weight: 400;
      font-size: 2.25rem; line-height: 1.05; letter-spacing: -0.02em;
    }
    .cl-recipe__h em { color: var(--accent); font-style: italic; }
    .cl-recipe__btn {
      align-self: flex-start;
      padding: 10px 18px; border-radius: var(--r-pill);
      font-size: 13px; font-weight: 500;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .cl-recipe__btn .lucide { width: 14px; height: 14px; stroke-width: 1.75; }
    .cl-recipe--paper .cl-recipe__btn, .cl-recipe--ink .cl-recipe__btn { background: var(--accent); color: #fff; }
    .cl-recipe--warm .cl-recipe__btn  { background: var(--k-ink); color: var(--k-paper-2); }

    /* Accessibility table */
    .cl-a11y { border: 1px solid var(--rule); border-radius: var(--r-3); overflow-x: auto; }
    .cl-a11y-row {
      display: grid; grid-template-columns: 1.1fr 1fr 0.9fr 0.8fr 0.8fr 1.6fr;
      min-width: 720px;
      border-top: 1px solid var(--rule);
      font-size: var(--fs-sm);
    }
    .cl-a11y-row:first-child {
      border-top: 0;
      font-family: var(--font-mono); font-size: 11px; color: var(--fg-2);
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .cl-a11y-row > div { padding: 14px 18px; border-right: 1px solid var(--rule); }
    .cl-a11y-row > div:last-child { border-right: 0; }
    .cl-a11y-use { color: var(--fg-2); }
    .cl-a11y-chip {
      display: inline-block; width: 20px; height: 20px; border-radius: 4px;
      vertical-align: middle; margin-right: 8px;
      border: 1px solid rgba(0,0,0,0.1);
    }
    .pass { color: var(--success); font-weight: 500; display: inline-flex; align-items: center; gap: 6px; }
    .fail { color: var(--danger); font-weight: 500; display: inline-flex; align-items: center; gap: 6px; }
    .pass .lucide, .fail .lucide { width: 14px; height: 14px; }
    .cl-note { margin-top: 16px; color: var(--fg-2); font-size: var(--fs-sm); max-width: 72ch; }
    .cl-note code, .cl-code { font-family: var(--font-mono); font-size: 13px; color: var(--link); }

    /* State colours */
    .cl-states { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 24px; }
    @media (max-width: 900px) { .cl-states { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .cl-states { grid-template-columns: 1fr; } }
    .cl-state-card { border: 1px solid var(--rule); border-radius: var(--r-3); overflow: hidden; background: var(--bg); }
    .cl-state-card__swatch {
      height: 88px; display: flex; align-items: center; justify-content: center;
      font-family: var(--font-display); font-size: 2rem; line-height: 1; letter-spacing: -0.02em;
    }
    .cl-state-card__body { padding: 14px 16px 16px; }
    .cl-state-card__name {
      font-family: var(--font-sans); font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase; color: var(--fg-2);
    }
    .cl-state-card__hex {
      font-family: var(--font-mono); font-size: 12px; color: var(--fg); margin-top: 4px;
      display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap;
    }
    .cl-state-card__hex b { color: var(--fg); font-weight: 500; }
    .cl-state-card__hex span { color: var(--fg-2); }
    .cl-state-card__tokens {
      margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); letter-spacing: 0.04em; line-height: 1.8;
    }
    .cl-state-card__use {
      padding: 14px 16px; background: var(--bg-2); font-size: 13px; color: var(--fg);
      line-height: 1.5; border-top: 1px solid var(--rule);
    }
    .cl-state-card__use b { color: var(--fg); font-weight: 500; }

    /* Downloads */
    .cl-dl { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
  </style>

  <!-- HERO -->
  <section class="cl-hero">
    <div class="cl-hero__text">
      <span class="eyebrow eyebrow--accent">02 · Color</span>
      <h1 class="page-header__title" style="padding:0; border:0; margin-top:16px">A narrow palette, used with <em style="color:var(--accent); font-style:italic">intent</em>.</h1>
      <p class="page-header__lede">Four colours do all the work. White carries the page. Ink holds the type. Warm paper separates sections. Red is a spotlight &mdash; never a wash. The 60&middot;30&middot;5&middot;5 ratio keeps it honest.</p>
      <div style="margin-top:32px; display:flex; gap:12px; flex-wrap:wrap;">
        <a class="btn btn--primary" href="#foundations">See tokens</a>
        <a class="btn" href="#type">Type rules</a>
      </div>
    </div>
    <div class="cl-hero__demo">
      <div class="cl-hero__ratios" role="img" aria-label="Colour ratio: 60% paper, 30% ink, 5% warm paper, 5% red">
        <div></div><div></div><div></div><div></div>
      </div>
      <div class="cl-legend">
        <span><i style="background:var(--k-paper)"></i><b>60%</b> Paper</span>
        <span><i style="background:var(--k-ink)"></i><b>30%</b> Ink</span>
        <span><i style="background:var(--k-paper-2)"></i><b>5%</b> Warm</span>
        <span><i style="background:var(--k-red)"></i><b>5%</b> Red</span>
      </div>
    </div>
  </section>

  <!-- CORE PALETTE -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Core palette</h2>
        <p class="section-head__body">Four named colours. Every surface, every deck, every template pulls from here. Click any swatch to copy its hex. Values are read live from <span class="cl-code">tokens.css</span>, so this page can never drift from the code.</p>
      </div>
      <div class="cl-row">${CORE.map(swatch).join('')}</div>

      <div style="margin-top: 40px;">
        <span class="eyebrow">Extended</span>
        <div class="cl-row" style="margin-top: 16px;">${EXTENDED.map(swatch).join('')}</div>
      </div>

      <div style="margin-top: 40px;">
        <span class="eyebrow">Alt accents &middot; sub-brand &amp; campaign</span>
        <p class="cl-note" style="margin-top:12px;">
          Four alternates for campaign-specific or sub-brand work. They replace Kilowott Red <em>as the single accent</em> &mdash; never used alongside it &mdash; by overriding <code>--accent</code> on a surface. The 60&middot;30&middot;5&middot;5 ratio and &ldquo;red is a spotlight&rdquo; rules apply identically to whichever alt is active.
        </p>
        <div class="cl-row" style="margin-top: 16px;">${ALT.map(swatch).join('')}</div>
        <p class="cl-note" style="font-family: var(--font-mono); font-size: 13px;">
          Signal Orange is 3.4:1 against white &mdash; large type and button fills only, never small text.
        </p>
      </div>
    </div>
  </section>

  <!-- USAGE RECIPES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Three working recipes</h2>
        <p class="section-head__body">The system has three canvas modes &mdash; Paper, Ink and Warm. Use them intentionally. <b>Paper</b> for marketing default, <b>Ink</b> for hero moments and product, <b>Warm</b> for long-form editorial.</p>
      </div>
      <div class="grid grid-3">
        <div class="cl-recipe">
          <div class="cl-recipe__preview cl-recipe--paper">
            <span class="cl-recipe__eyebrow">Case study</span>
            <h3 class="cl-recipe__h">Engineering <em>brave</em> products.</h3>
            <p style="color:var(--k-muted); font-size:14px; line-height:1.6; max-width:32ch;">Calm canvas. Ink for type. One flash of red for the verb or CTA.</p>
            <a class="cl-recipe__btn" href="#">Read the story <i data-lucide="arrow-right"></i></a>
          </div>
          <div class="cl-recipe__meta"><span>Recipe 01 · Paper</span><span>60·30·5·5</span></div>
        </div>
        <div class="cl-recipe">
          <div class="cl-recipe__preview cl-recipe--ink">
            <span class="cl-recipe__eyebrow" style="color:var(--accent)">Product hero</span>
            <h3 class="cl-recipe__h">Signal, not <em>noise</em>.</h3>
            <p style="color:var(--k-muted-dark); font-size:14px; line-height:1.6; max-width:32ch;">Dark canvas, white type, red as spotlight. Use for launches and headline moments.</p>
            <a class="cl-recipe__btn" href="#">See the product <i data-lucide="arrow-right"></i></a>
          </div>
          <div class="cl-recipe__meta"><span>Recipe 02 · Ink</span><span>Hero moments</span></div>
        </div>
        <div class="cl-recipe">
          <div class="cl-recipe__preview cl-recipe--warm">
            <span class="cl-recipe__eyebrow">Essay</span>
            <h3 class="cl-recipe__h">The <em>long</em> view.</h3>
            <p style="color:var(--k-muted); font-size:14px; line-height:1.6; max-width:32ch;">Warm paper reduces glare for long reading. Red becomes even more precious here &mdash; display sizes only.</p>
            <a class="cl-recipe__btn" href="#">Continue reading <i data-lucide="arrow-right"></i></a>
          </div>
          <div class="cl-recipe__meta"><span>Recipe 03 · Warm</span><span>Long-form</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- RED RULES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Red is a spotlight</h2>
        <p class="section-head__body">The brand colours are strong, and misuse is loud. These six rules handle 95% of decisions about red.</p>
      </div>
      <div class="grid grid-2">
        <ul style="list-style:none; padding:0; margin:0;">
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; One red idea per surface &mdash; a stat, a verb, a CTA.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; Never use red for body copy or paragraph text.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Red buttons only for primary, conversion-critical actions.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Small red text (links, code, labels) uses Red Ink <span class="cl-code">--link</span>, not brand red.</span><span class="token-row__meta">A11y</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">05</b> &nbsp; Don&rsquo;t tint red &mdash; use Red Soft or a neutral instead.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">06</b> &nbsp; Red never sits next to another saturated colour.</span><span class="token-row__meta">Rule</span></li>
        </ul>
        <div class="card" style="background:var(--bg-2); padding: var(--s-6);">
          <span class="eyebrow eyebrow--accent">Quick test</span>
          <p style="margin-top:16px; font-family: var(--font-display); font-size: 1.5rem; line-height: 1.25;">If you can remove the red and the page still works, you&rsquo;re using it right.</p>
          <p style="margin-top:16px; color:var(--fg-2); font-size:14px;">Red should draw the eye to <em>one</em> thing. If it&rsquo;s everywhere, it&rsquo;s nowhere.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ACCESSIBILITY -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Accessibility</h2>
        <p class="section-head__body">Contrast against WCAG 2.2 AA: &ge;4.5:1 for body text, &ge;3:1 for large text (24px+, or 18.7px+ bold) and UI shapes. Ratios are calculated live from the tokens. Don&rsquo;t use a combination marked Fail for reading.</p>
      </div>
      <div class="cl-a11y">
        <div class="cl-a11y-row">
          <div>Foreground</div><div>Background</div><div>Ratio</div><div>Body (AA)</div><div>Large (AA)</div><div>Use for</div>
        </div>
        ${A11Y_PAIRS.map(a11yRow).join('')}
      </div>
      <p class="cl-note">Brand red passes on white only just (4.8:1) and fails on warm paper and ink for small text. Keep red text to display sizes there; for links and small labels use Red Ink.</p>
    </div>
  </section>

  <!-- SEMANTIC STATE COLORS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Semantic state colours</h2>
        <p class="section-head__body">The brand palette is editorial &mdash; ink, paper, red. Products need four more: <b>success, warning, info, danger</b>. These are the only greens, ambers and blues permitted in the system, and they come with strict scope: inline state only. All four pass AA as text on paper; dark mode swaps in lighter values automatically.</p>
      </div>
      <div class="cl-states">${STATES.map(stateCard).join('')}</div>

      <div class="section-head" style="margin-top: 48px;">
        <h3 style="font-family:var(--font-display); font-size:1.25rem; letter-spacing:-0.01em;">Strict scope</h3>
        <p class="section-head__body">State colours are <em>product</em> colours, not brand colours. They never appear in marketing, decks, or social. The brand doesn&rsquo;t &ldquo;have&rdquo; green &mdash; the product borrows it when a workflow needs it.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; State colours only in product UI. Never in marketing site, deck, or social.</span><span class="token-row__meta">Scope</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; Paired with an icon + a word. Colour alone is not state.</span><span class="token-row__meta">A11y</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Danger = brand red. No separate &ldquo;error red&rdquo; &mdash; one red is enough.</span><span class="token-row__meta">Discipline</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Fills allowed only for: dot, pill, 1&ndash;2 char badge. Never large surfaces.</span><span class="token-row__meta">Usage</span></li>
      </ul>
    </div>
  </section>

  <!-- GET THE PALETTE -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Get the palette</h2>
        <p class="section-head__body">One source, every format. Designers take the swatch files; developers and AI agents take the tokens.</p>
      </div>
      <div class="cl-dl" id="cl-downloads">
        <a class="btn" href="../tokens.json" target="_blank" rel="noopener"><i data-lucide="braces"></i> tokens.json</a>
        <a class="btn" href="styles/tokens.css" target="_blank" rel="noopener"><i data-lucide="file-code"></i> tokens.css</a>
      </div>
    </div>
  </section>

  <div class="cl-toast" role="status" aria-live="polite"></div>
  `;

  /* ---------- click to copy ---------- */
  const toast = root.querySelector('.cl-toast');
  let t;
  root.querySelectorAll('[data-copy]').forEach(el => el.addEventListener('click', async () => {
    const hex = el.dataset.copy;
    try { await navigator.clipboard.writeText(hex); toast.textContent = 'Copied ' + hex; }
    catch (e) { toast.textContent = hex; }
    toast.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => toast.classList.remove('is-on'), 1400);
  }));
};
