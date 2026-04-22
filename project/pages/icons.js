/* ============================================================
   ICONS — Lucide
   Library: Lucide (lucide.dev) — 1,500+ icons, MIT/ISC licensed.
   Loaded globally via CDN in index.html. Markup uses
     <i data-lucide="<name>"></i>
   then lucide.createIcons(scope) hydrates them as SVGs.
   House spec: 24×24 · 1.5px stroke · round caps · currentColor.
   ============================================================ */

window.renderIcons = function (root) {

  // Curated subset — the Kilowott-sanctioned set.
  // Picked to cover nav, actions, status, finance, social, misc.
  // All names are canonical Lucide names — see https://lucide.dev/icons
  const icons = [
    // Navigation
    {n:'arrow-right',    c:'nav'},
    {n:'arrow-left',     c:'nav'},
    {n:'arrow-up',       c:'nav'},
    {n:'arrow-down',     c:'nav'},
    {n:'chevron-right',  c:'nav'},
    {n:'chevron-left',   c:'nav'},
    {n:'chevron-up',     c:'nav'},
    {n:'chevron-down',   c:'nav'},
    {n:'x',              c:'nav'},
    {n:'menu',           c:'nav'},
    {n:'search',         c:'nav'},
    {n:'external-link',  c:'nav'},

    // Actions
    {n:'plus',              c:'action'},
    {n:'minus',             c:'action'},
    {n:'pencil',            c:'action'},
    {n:'copy',              c:'action'},
    {n:'share-2',           c:'action'},
    {n:'download',          c:'action'},
    {n:'upload',            c:'action'},
    {n:'trash-2',           c:'action'},
    {n:'filter',            c:'action'},
    {n:'arrow-up-down',     c:'action'},
    {n:'rotate-cw',         c:'action'},
    {n:'save',              c:'action'},
    {n:'check',             c:'action'},
    {n:'sliders-horizontal',c:'action'},

    // Status
    {n:'circle-check',   c:'status'},
    {n:'circle-alert',   c:'status'},
    {n:'triangle-alert', c:'status'},
    {n:'info',           c:'status'},
    {n:'clock',          c:'status'},
    {n:'loader',         c:'status'},
    {n:'circle-x',       c:'status'},
    {n:'shield-check',   c:'status'},

    // Finance
    {n:'bar-chart-3',   c:'fin'},
    {n:'line-chart',    c:'fin'},
    {n:'pie-chart',     c:'fin'},
    {n:'trending-up',   c:'fin'},
    {n:'trending-down', c:'fin'},
    {n:'dollar-sign',   c:'fin'},
    {n:'percent',       c:'fin'},
    {n:'calendar',      c:'fin'},
    {n:'receipt',       c:'fin'},
    {n:'wallet',        c:'fin'},
    {n:'credit-card',   c:'fin'},
    {n:'coins',         c:'fin'},
    {n:'banknote',      c:'fin'},
    {n:'landmark',      c:'fin'},

    // Social
    {n:'linkedin',   c:'social'},
    {n:'twitter',    c:'social'},
    {n:'github',     c:'social'},
    {n:'youtube',    c:'social'},
    {n:'instagram',  c:'social'},
    {n:'facebook',   c:'social'},
    {n:'rss',        c:'social'},

    // Misc
    {n:'user',      c:'misc'},
    {n:'users',     c:'misc'},
    {n:'settings',  c:'misc'},
    {n:'bell',      c:'misc'},
    {n:'mail',      c:'misc'},
    {n:'link',      c:'misc'},
    {n:'home',      c:'misc'},
    {n:'folder',    c:'misc'},
    {n:'file-text', c:'misc'},
    {n:'inbox',     c:'misc'},
    {n:'briefcase', c:'misc'},
    {n:'globe',     c:'misc'},
    {n:'eye',       c:'misc'},
    {n:'lock',      c:'misc'},
  ];

  const categories = [
    { key:'nav',    label:'Navigation' },
    { key:'action', label:'Action' },
    { key:'status', label:'Status' },
    { key:'fin',    label:'Finance' },
    { key:'social', label:'Social' },
    { key:'misc',   label:'Misc' },
  ];

  const icon = (name) => `<i data-lucide="${name}"></i>`;

  root.innerHTML = `
  <style>
    .ic-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .ic-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .ic-hero h1 em { font-style: italic; color: var(--accent); }
    .ic-hero__lede {
      margin-top: 22px; max-width: 62ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }
    .ic-hero__meta {
      display: grid; grid-template-columns: repeat(4, auto);
      gap: var(--s-6); margin-top: var(--s-7);
      font-size: var(--fs-xs); letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--fg-2);
    }
    .ic-hero__meta > div b {
      display: block; color: var(--fg); font-weight: 500;
      margin-top: 4px; letter-spacing: 0.02em;
      text-transform: none; font-size: var(--fs-sm);
    }
    @media (max-width: 800px) { .ic-hero__meta { grid-template-columns: repeat(2, auto); } }

    /* Global Lucide SVG style — 1.5px stroke to match brand spec */
    .lucide {
      width: 24px; height: 24px;
      stroke-width: 1.5;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      display: inline-block;
      vertical-align: middle;
    }

    .ic-spec {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      margin-top: 24px;
    }
    .ic-spec__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .ic-spec__count { font-family: var(--font-mono); color: var(--fg-2); }

    .ic-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 0;
    }
    @media (max-width: 900px) { .ic-grid { grid-template-columns: repeat(4, 1fr); } }
    @media (max-width: 600px) { .ic-grid { grid-template-columns: repeat(3, 1fr); } }

    .ic-cell {
      background: var(--bg);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 10px;
      padding: 20px 12px;
      cursor: pointer;
      transition: background .15s ease;
      border: 0;
      border-right: 1px solid var(--rule);
      border-bottom: 1px solid var(--rule);
      font-family: inherit; color: inherit;
      margin: 0; min-height: 110px;
    }
    .ic-cell:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
    .ic-cell .lucide { color: var(--fg); transition: color .15s ease; }
    .ic-cell:hover { background: var(--bg-2); }
    .ic-cell:hover .lucide { color: var(--accent); }
    .ic-cell.is-copied { background: var(--bg-2); }
    .ic-cell.is-copied .lucide { color: var(--accent); }
    .ic-grid .ic-cell:nth-child(6n) { border-right: 0; }
    @media (max-width: 900px) {
      .ic-grid .ic-cell:nth-child(6n) { border-right: 1px solid var(--rule); }
      .ic-grid .ic-cell:nth-child(4n) { border-right: 0; }
    }
    @media (max-width: 600px) {
      .ic-grid .ic-cell:nth-child(4n) { border-right: 1px solid var(--rule); }
      .ic-grid .ic-cell:nth-child(3n) { border-right: 0; }
    }
    .ic-name {
      font-family: var(--font-mono); font-size: 10.5px;
      color: var(--fg-2); letter-spacing: 0.04em;
      user-select: all;
    }

    /* Sizes row */
    .ic-sizes {
      display: flex; align-items: center; gap: 32px;
      padding: 28px;
      background: var(--bg); flex-wrap: wrap;
    }
    .ic-size {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      color: var(--fg);
    }
    .ic-size__label {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-2);
    }
    .ic-size--16 .lucide { width: 16px; height: 16px; }
    .ic-size--20 .lucide { width: 20px; height: 20px; }
    .ic-size--24 .lucide { width: 24px; height: 24px; }
    .ic-size--32 .lucide { width: 32px; height: 32px; }
    .ic-size--48 .lucide { width: 48px; height: 48px; stroke-width: 1.25; }

    /* Usage examples row */
    .ic-uses {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 16px; padding: 24px;
      background: var(--bg-2);
    }
    @media (max-width: 900px) { .ic-uses { grid-template-columns: 1fr; } }

    .ic-use {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: 16px 18px;
    }
    .ic-use__label {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--fg-2); margin-bottom: 12px;
    }
    .ic-use-row {
      display: flex; align-items: center; gap: 10px;
      font-size: 14px;
    }
    .ic-use-row + .ic-use-row { margin-top: 10px; }
    .ic-use-row .lucide { color: var(--fg); flex-shrink: 0; }
    .ic-use-row--accent .lucide { color: var(--accent); }
    .ic-use-row .k-btn .lucide { width: 16px; height: 16px; color: currentColor; }
    .ic-use-row .k-btn { gap: 6px; white-space: nowrap; }
    .ic-use-row .k-btn span { white-space: nowrap; }

    /* Implementation snippet block */
    .ic-snippet {
      margin-top: 24px;
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg-2);
      font-family: var(--font-mono);
      font-size: 13px; line-height: 1.7;
    }
    .ic-snippet__head {
      padding: 10px 18px;
      border-bottom: 1px solid var(--rule);
      font-size: 11px; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--fg-2);
      background: var(--bg);
    }
    .ic-snippet pre {
      margin: 0; padding: 18px 22px;
      background: var(--bg);
      color: var(--fg);
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 13px;
    }
    .ic-snippet pre .c { color: var(--fg-2); }
    .ic-snippet pre .t { color: var(--accent); }
    .ic-snippet pre .a { color: var(--fg); }

    .ic-toast {
      position: fixed; left: 50%; bottom: 32px;
      transform: translateX(-50%) translateY(16px);
      background: var(--fg); color: var(--bg);
      padding: 8px 14px; border-radius: var(--r-pill);
      font-family: var(--font-mono); font-size: 12px;
      letter-spacing: 0.04em;
      opacity: 0; pointer-events: none;
      transition: opacity .2s ease, transform .2s ease;
      box-shadow: var(--shadow-2);
      z-index: 100;
    }
    .ic-toast.is-on {
      opacity: 1; pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }
  </style>

  <!-- HERO -->
  <section class="ic-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">07 · Icons</span>
      <h1>One library. <em>One weight</em>. One behaviour.</h1>
      <p class="ic-hero__lede">
        Kilowott uses <b>Lucide</b> &mdash; the open-source fork of Feather Icons with 1,500+ glyphs,
        all drawn to the same editorial spec: 24&times;24 canvas, 1.5px stroke, round caps, one line.
        Icons inherit <code>currentColor</code> so tokens, themes, and accents cascade without overrides.
        The ${icons.length} shown below are the house-curated starter set. Everything else on
        <a href="https://lucide.dev" target="_blank" rel="noopener" style="color:var(--accent)">lucide.dev</a>
        is available &mdash; click to copy any name.
      </p>

      <div class="ic-hero__meta">
        <div>Library<b>Lucide</b></div>
        <div>License<b>ISC &middot; commercial-safe</b></div>
        <div>Canvas<b>24 &times; 24px</b></div>
        <div>Stroke<b>1.5px round</b></div>
      </div>
    </div>
  </section>

  <!-- RULES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">House rules</h2>
        <p class="section-head__body">Four rules for every icon that enters the system. Anything that breaks one gets rewritten or rejected.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; Lucide first. If the icon exists in Lucide, use it &mdash; never hand-draw a one-off.</span><span class="token-row__meta">Source</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; <code>stroke-width: 1.5</code> and <code>currentColor</code> always. Never override to a hex.</span><span class="token-row__meta">Style</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Accent color is state-only &mdash; hover, active, alert. Resting icons inherit <code>var(--fg)</code>.</span><span class="token-row__meta">Color</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Hit area min 36&times;36px on interactive icons. Icon button padding: 6&ndash;8px around a 20&ndash;24px glyph.</span><span class="token-row__meta">A11y</span></li>
      </ul>
    </div>
  </section>

  <!-- HOW TO USE -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">How to use</h2>
        <p class="section-head__body">Add the library once at page load, drop <code>&lt;i data-lucide="name"&gt;&lt;/i&gt;</code> wherever you need a glyph, then hydrate.</p>
      </div>

      <div class="ic-snippet">
        <div class="ic-snippet__head">HTML &middot; load once in &lt;head&gt;</div>
        <pre><span class="c">&lt;!-- Lucide loaded globally in index.html --&gt;</span>
<span class="t">&lt;script</span> <span class="a">src</span>=<span class="c">"https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"</span><span class="t">&gt;&lt;/script&gt;</span></pre>
      </div>

      <div class="ic-snippet">
        <div class="ic-snippet__head">HTML &middot; markup</div>
        <pre><span class="t">&lt;button</span> <span class="a">class</span>=<span class="c">"k-btn k-btn--primary"</span><span class="t">&gt;</span>
  <span class="t">&lt;i</span> <span class="a">data-lucide</span>=<span class="c">"plus"</span><span class="t">&gt;&lt;/i&gt;</span> New row
<span class="t">&lt;/button&gt;</span></pre>
      </div>

      <div class="ic-snippet">
        <div class="ic-snippet__head">JS &middot; hydrate after render</div>
        <pre><span class="c">// After innerHTML assignment, convert placeholders into SVGs.</span>
<span class="c">// Scope to your root so you don't re-render the whole page.</span>
<span class="a">lucide.createIcons({ root: myContainer });</span></pre>
      </div>

      <div class="ic-snippet">
        <div class="ic-snippet__head">CSS &middot; global override (in your stylesheet)</div>
        <pre><span class="c">/* Match brand spec: 1.5px stroke, currentColor inherit */</span>
<span class="a">.lucide {
  width: 24px; height: 24px;
  stroke-width: 1.5;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}</span></pre>
      </div>
    </div>
  </section>

  <!-- SIZES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Sizes</h2>
        <p class="section-head__body">Five canonical sizes. Stroke stays 1.5px except at 48+ where it drops to 1.25px for optical consistency.</p>
      </div>
      <div class="ic-spec">
        <div class="ic-spec__head"><span>Size scale</span><span class="ic-spec__count">16 &middot; 20 &middot; 24 &middot; 32 &middot; 48</span></div>
        <div class="ic-sizes">
          <div class="ic-size ic-size--16">${icon('arrow-right')}<span class="ic-size__label">16 · Dense UI</span></div>
          <div class="ic-size ic-size--20">${icon('arrow-right')}<span class="ic-size__label">20 · Toolbar</span></div>
          <div class="ic-size ic-size--24">${icon('arrow-right')}<span class="ic-size__label">24 · Default</span></div>
          <div class="ic-size ic-size--32">${icon('arrow-right')}<span class="ic-size__label">32 · Hero</span></div>
          <div class="ic-size ic-size--48">${icon('arrow-right')}<span class="ic-size__label">48 · Feature</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- USAGE EXAMPLES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">In context</h2>
        <p class="section-head__body">How icons actually sit in the system &mdash; never alone, always paired with a word.</p>
      </div>
      <div class="ic-spec">
        <div class="ic-spec__head"><span>Nav · buttons · alerts</span><span>inherit color &middot; align-items: center</span></div>
        <div class="ic-uses">
          <div class="ic-use">
            <div class="ic-use__label">Nav items</div>
            <div class="ic-use-row">${icon('line-chart')}<span>Overview</span></div>
            <div class="ic-use-row">${icon('receipt')}<span>Invoices</span></div>
            <div class="ic-use-row">${icon('pie-chart')}<span>Portfolio</span></div>
            <div class="ic-use-row">${icon('settings')}<span>Settings</span></div>
          </div>
          <div class="ic-use">
            <div class="ic-use__label">Button + label</div>
            <div class="ic-use-row"><button class="k-btn k-btn--primary k-btn--sm">${icon('plus')}<span>New row</span></button></div>
            <div class="ic-use-row"><button class="k-btn k-btn--secondary k-btn--sm"><span>Export</span>${icon('download')}</button></div>
            <div class="ic-use-row"><button class="k-btn k-btn--ghost k-btn--sm">${icon('rotate-cw')}<span>Refresh</span></button></div>
          </div>
          <div class="ic-use">
            <div class="ic-use__label">Inline status</div>
            <div class="ic-use-row ic-use-row--accent">${icon('triangle-alert')}<span>Runway breach in 11 weeks</span></div>
            <div class="ic-use-row">${icon('circle-check')}<span>All 4 approvals in</span></div>
            <div class="ic-use-row">${icon('info')}<span>Q3 close pending review</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FULL LIBRARY -->
  ${categories.map(cat => {
    const set = icons.filter(i => i.c === cat.key);
    return `
    <section class="section" id="ic-${cat.key}">
      <div class="container">
        <div class="section-head">
          <h2 class="section-head__title">${cat.label}</h2>
          <p class="section-head__body">${set.length} ${cat.key === 'social' ? 'brand marks' : 'glyphs'} from Lucide. Click to copy the name &mdash; paste into <code>data-lucide="..."</code>.</p>
        </div>
        <div class="ic-spec">
          <div class="ic-spec__head">
            <span>${cat.label} · ${set.length}</span>
            <span class="ic-spec__count">click to copy</span>
          </div>
          <div class="ic-grid">
            ${set.map(i => `
              <button class="ic-cell" type="button" data-copy="${i.n}" title="Copy '${i.n}'">
                ${icon(i.n)}
                <span class="ic-name">${i.n}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </section>`;
  }).join('')}

  <!-- EXTENDING -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Need an icon that isn&rsquo;t here?</h2>
        <p class="section-head__body">Lucide has 1,500+ icons. If a glyph exists on <a href="https://lucide.dev" target="_blank" rel="noopener" style="color:var(--accent)">lucide.dev</a>, you can use it immediately &mdash; no code change needed. Just reference the name.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label">Browse the full catalogue</span><span class="token-row__meta"><a href="https://lucide.dev/icons" target="_blank" rel="noopener" style="color:var(--accent)">lucide.dev/icons →</a></span></li>
        <li class="token-row"><span class="token-row__label">Search by keyword</span><span class="token-row__meta"><a href="https://lucide.dev" target="_blank" rel="noopener" style="color:var(--accent)">lucide.dev →</a></span></li>
        <li class="token-row"><span class="token-row__label">Submit a new icon to the upstream library</span><span class="token-row__meta"><a href="https://github.com/lucide-icons/lucide/issues" target="_blank" rel="noopener" style="color:var(--accent)">github → issues</a></span></li>
        <li class="token-row"><span class="token-row__label">License</span><span class="token-row__meta">ISC &middot; free for commercial use</span></li>
        <li class="token-row"><span class="token-row__label">Bundle size (CDN global)</span><span class="token-row__meta">~20KB gzipped</span></li>
      </ul>
    </div>
  </section>

  <div class="ic-toast" id="ic-toast">Copied</div>
  `;

  // ---------- Hydrate Lucide placeholders → SVG ----------
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try { window.lucide.createIcons({ root }); } catch (e) { console.error('Lucide hydration failed:', e); }
  } else {
    // Lucide not yet loaded — retry shortly
    const retry = setInterval(() => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons({ root }); } catch (e) {}
        clearInterval(retry);
      }
    }, 120);
    setTimeout(() => clearInterval(retry), 5000);
  }

  // ---------- Click-to-copy with inline toast ----------
  const toast = root.querySelector('#ic-toast');
  let toastTimer;
  root.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const name = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(name);
      } catch (e) { /* no-op in insecure contexts */ }
      btn.classList.add('is-copied');
      setTimeout(() => btn.classList.remove('is-copied'), 600);
      if (toast) {
        toast.textContent = 'Copied · ' + name;
        toast.classList.add('is-on');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('is-on'), 1400);
      }
    });
  });
};
