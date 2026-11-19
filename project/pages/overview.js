/* ============================================================
   HOME — a starting point, not a manifesto: search, the eight most
   common tasks, the brand in 60 seconds, and the most-used files.
   Task tiles link to pages listed in app.js (NAV).
   ============================================================ */

window.renderOverview = function (root) {
  const TASKS = [
    { t: 'Get the logo',        d: 'SVG wordmark, bolt mark, usage rules', i: 'badge',                to: 'logo' },
    { t: 'Brand colours',       d: 'Hex codes, ratios, swatch files',      i: 'palette',              to: 'color' },
    { t: 'Make a social post',  d: 'LinkedIn, Instagram, and paid ads',    i: 'share-2',              to: 'social' },
    { t: 'Make a poster or ad', d: 'Print, billboards, web banners',       i: 'rectangle-horizontal', to: 'posters' },
    { t: 'Build a presentation', d: '15 layouts and a .pptx template',     i: 'presentation',         to: 'deck' },
    { t: 'Set up my signature', d: 'Generate it, paste into Gmail',        i: 'pen-line',             to: 'signature' },
    { t: 'Write copy',          d: 'Tone, words to avoid, taglines',       i: 'message-square-text',  to: 'voice' },
    { t: 'Build a web page',    d: 'Stylesheet, starter page, sections',   i: 'layout-template',      to: 'developers' },
  ];
  const FILES = [
    { f: 'SVG',  t: 'Logo wordmark',         d: 'The vector wordmark. Ink or paper only.',              h: 'downloads/kilowott-logo.svg',           i: 'badge' },
    { f: 'PPTX', t: 'Presentation template', d: '15 slide layouts for PowerPoint and Keynote.',          h: 'downloads/kilowott-deck-template.pptx', i: 'presentation' },
    { f: 'ASE',  t: 'Colour swatches',       d: 'Adobe swatches for Illustrator, InDesign, Photoshop.', h: 'downloads/kilowott-colors.ase',         i: 'palette' },
  ];

  root.innerHTML = `
  <style>
    .hm-hero { padding: var(--s-8) 0 var(--s-7); }
    .hm-hero h1 { font-family: var(--font-display); font-weight: 400; font-size: var(--fs-d2); line-height: 1.02;
      letter-spacing: -0.025em; margin: var(--s-5) 0 var(--s-4); max-width: 15ch; }
    .hm-hero h1 em { font-style: italic; color: var(--accent); }
    .hm-hero p { color: var(--fg-2); font-size: 1.125rem; line-height: 1.55; max-width: 56ch; margin: 0 0 var(--s-6); }
    .hm-search { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 640px; padding: 16px 20px;
      border: 1px solid var(--rule-strong); border-radius: var(--r-pill); background: var(--bg); color: var(--fg-2);
      font: inherit; font-size: var(--fs-body); cursor: text; text-align: left; transition: box-shadow var(--dur-fast) var(--ease-standard); }
    .hm-search:hover { box-shadow: var(--shadow-2); }
    .hm-search .lucide { width: 18px; height: 18px; stroke-width: 1.5; }
    .hm-search kbd { margin-left: auto; font-family: var(--font-mono); font-size: 12px; padding: 3px 8px; border: 1px solid var(--rule); border-radius: var(--r-2); }

    .hm-sec { padding: var(--s-7) 0; border-top: 1px solid var(--rule); }
    .hm-sec h2 { font-family: var(--font-display); font-weight: 400; font-size: 1.75rem; letter-spacing: -0.015em; margin: 0 0 6px; }
    .hm-sec > .container > p { color: var(--fg-2); margin: 0 0 var(--s-5); }
    .hm-sec a.hm-link { color: var(--link); }

    .hm-tiles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .hm-tile { display: flex; flex-direction: column; gap: 6px; padding: 20px; min-height: 140px; border: 1px solid var(--rule);
      border-radius: var(--r-3); background: var(--bg); color: var(--fg); text-decoration: none;
      transition: border-color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard); }
    .hm-tile:hover { border-color: var(--rule-strong); background: var(--bg-2); }
    .hm-tile .lucide { width: 22px; height: 22px; stroke-width: 1.5; margin-bottom: 10px; }
    .hm-tile b { font-weight: 500; }
    .hm-tile span { font-size: 13px; color: var(--fg-2); line-height: 1.45; }

    .hm-ess { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .hm-card { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 24px; display: flex; flex-direction: column; gap: 14px; background: var(--bg); }
    .hm-card__top { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    .hm-card__top b { font-weight: 500; }
    .hm-card__top a { font-size: 13px; color: var(--link); }
    .hm-sw { display: grid; grid-template-columns: 60fr 30fr 5fr 5fr; height: 72px; border-radius: var(--r-2); overflow: hidden; border: 1px solid var(--rule); }
    .hm-sw__lbl { display: grid; grid-template-columns: 60fr 30fr 10fr; font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); }
    .hm-note { font-size: 13px; color: var(--fg-2); }
    .hm-type .t1 { font-family: var(--font-display); font-size: 2rem; letter-spacing: -0.02em; line-height: 1.1; }
    .hm-type .t2 { font-size: var(--fs-sm); color: var(--fg-2); margin-top: 6px; }
    .hm-type .t3 { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); margin-top: 6px; letter-spacing: .04em; }
    .hm-sig { font-family: var(--font-display); font-size: 1.75rem; letter-spacing: -0.02em; line-height: 1.15; }
    .hm-sig em { font-style: italic; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 5px; }
    .hm-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; font-size: var(--fs-sm); }
    .hm-list li { display: flex; gap: 10px; }
    .hm-list .lucide { width: 16px; height: 16px; stroke-width: 1.5; margin-top: 2px; color: var(--fg-2); flex: none; }

    .hm-files { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .hm-file { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 20px; display: flex; flex-direction: column; gap: 8px; background: var(--bg); }
    .hm-file__prev { height: 88px; border-radius: var(--r-2); background: var(--bg-2); display: grid; place-items: center; }
    .hm-file__prev .lucide { width: 24px; height: 24px; stroke-width: 1.5; }
    .hm-fmt { align-self: flex-start; font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; padding: 3px 8px;
      border-radius: var(--r-pill); background: var(--bg-2); border: 1px solid var(--rule); color: var(--fg-2); }
    .hm-file b { font-weight: 500; }
    .hm-file p { margin: 0; font-size: 13px; color: var(--fg-2); line-height: 1.5; flex: 1; }
    .hm-file .btn { align-self: flex-start; margin-top: 8px; }
    .hm-file .btn .lucide { width: 14px; height: 14px; }

    .hm-princ { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--s-5); }
    .hm-princ b { display: block; font-family: var(--font-display); font-weight: 400; font-size: 1.25rem; margin: 6px 0; }
    .hm-princ span { font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; color: var(--fg-2); }
    .hm-princ p { margin: 0; font-size: var(--fs-sm); color: var(--fg-2); line-height: 1.55; }

    @media (max-width: 1180px) { .hm-tiles, .hm-princ { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 720px) { .hm-ess, .hm-files { grid-template-columns: minmax(0, 1fr); } .hm-hero { padding: var(--s-6) 0 var(--s-6); } }
    @media (max-width: 520px) { .hm-tiles, .hm-princ { grid-template-columns: minmax(0, 1fr); } .hm-tile { min-height: 0; } }
  </style>

  <section class="hm-hero">
    <div class="container">
      <span class="eyebrow">Kilowott brand kit</span>
      <h1>Everything you need to look like <em>Kilowott</em>.</h1>
      <p>Logos, colours, templates, and rules for every surface: social, posters, presentations, email, and the web. Pick a task below or search.</p>
      <button class="hm-search" type="button" data-kb-search><i data-lucide="search"></i>What do you need to make?<kbd>⌘K</kbd></button>
    </div>
  </section>

  <section class="hm-sec">
    <div class="container">
      <h2>Start with a task</h2>
      <p>The eight things people come here for most.</p>
      <div class="hm-tiles">${TASKS.map(x => `<a class="hm-tile" href="#${x.to}"><i data-lucide="${x.i}"></i><b>${x.t}</b><span>${x.d}</span></a>`).join('')}</div>
    </div>
  </section>

  <section class="hm-sec">
    <div class="container">
      <h2>The brand in 60 seconds</h2>
      <p>If you only read one thing, read this.</p>
      <div class="hm-ess">
        <div class="hm-card">
          <div class="hm-card__top"><b>Colour: paper, ink, one red</b><a href="#color">Colour</a></div>
          <div class="hm-sw"><div style="background:var(--k-paper)"></div><div style="background:var(--k-ink)"></div><div style="background:var(--k-paper-2)"></div><div style="background:var(--k-red)"></div></div>
          <div class="hm-sw__lbl"><span>Paper 60</span><span>Ink 30</span><span>Warm 5 · Red 5</span></div>
          <span class="hm-note">Red is a spotlight: one red moment per surface.</span>
        </div>
        <div class="hm-card">
          <div class="hm-card__top"><b>Type: three families, no others</b><a href="#type">Type</a></div>
          <div class="hm-type"><div class="t1">Newsreader for headlines</div><div class="t2">DM Sans for body text and buttons</div><div class="t3">JETBRAINS MONO FOR LABELS AND NUMBERS</div></div>
        </div>
        <div class="hm-card">
          <div class="hm-card__top"><b>The signature move</b><a href="#type">Type</a></div>
          <div class="hm-sig">Ahead, by <em>design</em>.</div>
          <span class="hm-note">A serif headline with one italic phrase. On a real surface, that phrase is the red moment.</span>
        </div>
        <div class="hm-card">
          <div class="hm-card__top"><b>How we sound</b><a href="#voice">Voice</a></div>
          <ul class="hm-list">
            <li><i data-lucide="check"></i>Outcome first, specific, and confident.</li>
            <li><i data-lucide="check"></i>Sentence case. No exclamation marks.</li>
            <li><i data-lucide="check"></i>Every number has a source and a time window.</li>
            <li><i data-lucide="x"></i>Never “leverage”, “seamless”, or “world-class”.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="hm-sec">
    <div class="container">
      <h2>Most-used files</h2>
      <p>Everything else is on <a class="hm-link" href="#downloads">Downloads</a>.</p>
      <div class="hm-files">${FILES.map(x => `<div class="hm-file"><div class="hm-file__prev"><i data-lucide="${x.i}"></i></div><span class="hm-fmt">${x.f}</span><b>${x.t}</b><p>${x.d}</p><a class="btn btn--sm" href="${x.h}" download><i data-lucide="download"></i>Download</a></div>`).join('')}</div>
    </div>
  </section>

  <section class="hm-sec">
    <div class="container">
      <h2>Four principles</h2>
      <p>Why the rules are the way they are.</p>
      <div class="hm-princ">
        <div><span>01</span><b>Calm by default</b><p>White space, a narrow palette, and type doing the heavy lifting.</p></div>
        <div><span>02</span><b>Red earns its place</b><p>A spotlight, not a wash: one idea per surface.</p></div>
        <div><span>03</span><b>Editorial over ornamental</b><p>Serif display, clean sans, italics for emphasis. No gradients or glows.</p></div>
        <div><span>04</span><b>Technical and human</b><p>Built with engineers, written like people. Precise, never sterile.</p></div>
      </div>
    </div>
  </section>
  `;
  root.querySelectorAll('[data-kb-search]').forEach(b => b.addEventListener('click', () => window.__kitSearch && window.__kitSearch.open()));
};
