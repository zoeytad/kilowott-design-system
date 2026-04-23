/* ============================================================
   FOUNDATIONS — spacing, grid, radii, shadows, tokens
   ============================================================ */

window.renderFoundations = function (root) {
  root.innerHTML = `
  <style>
    .fd-hero {
      padding: var(--s-9) 0 var(--s-7);
      border-bottom: 1px solid var(--rule);
    }
    .fd-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      max-width: 22ch; margin-top: 24px;
    }
    .fd-hero h1 em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "WONK" 1; }
    .fd-hero__lede { margin-top: 24px; max-width: 60ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }

    /* Spacing viz */
    .fd-space {
      display: grid; grid-template-columns: 80px 1fr 120px 1fr;
      align-items: center; gap: 24px;
      padding: 14px 24px;
      border-top: 1px solid var(--rule);
    }
    .fd-space:first-child { border-top: 0;
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .fd-space__bar {
      height: 12px; background: var(--fg); border-radius: 2px;
      position: relative;
    }
    .fd-space__val { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); }
    .fd-space__use { color: var(--fg-2); font-size: 13px; }
    .fd-space__token { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); }
    @media (max-width: 900px) {
      .fd-space { grid-template-columns: 1fr; padding: 12px 0; }
    }

    /* Grid viz */
    .fd-grid-viz {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 16px;
      padding: 24px;
      background: var(--bg-2);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
    }
    .fd-grid-viz > div {
      height: 96px;
      background: var(--accent);
      opacity: 0.12;
      border-radius: 4px;
    }
    .fd-grid-caption {
      display: flex; justify-content: space-between; margin-top: 16px;
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
      letter-spacing: 0.08em; text-transform: uppercase;
    }

    /* Radius cards */
    .fd-radius {
      display: flex; flex-direction: column; align-items: center; gap: 16px;
      padding: var(--s-6);
      border: 1px solid var(--rule);
    }
    .fd-radius__demo {
      width: 80px; height: 80px; background: var(--fg);
    }
    .fd-radius__name { font-size: 13px; font-weight: 500; }
    .fd-radius__val { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); }

    /* Shadow cards */
    .fd-shadow {
      display: flex; flex-direction: column; align-items: center; gap: 16px;
      padding: var(--s-7);
      background: var(--bg-2);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
    }
    .fd-shadow__demo {
      width: 96px; height: 96px; background: var(--bg);
      border-radius: 8px;
      border: 1px solid var(--rule);
    }
    .fd-shadow__name { font-size: 13px; font-weight: 500; }
    .fd-shadow__val { font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); text-align: center; line-height: 1.4; }

    /* Token dump */
    .fd-tokens {
      background: var(--bg-2);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      padding: var(--s-6);
      font-family: var(--font-mono); font-size: 13px; line-height: 1.8;
      color: var(--fg);
      overflow-x: auto;
    }
    .fd-tokens .comment { color: var(--fg-2); }
    .fd-tokens .prop { color: var(--accent); }
    .fd-tokens .val { color: var(--fg); }

    /* Motion demo */
    .fd-motion {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    @media (max-width: 900px) { .fd-motion { grid-template-columns: 1fr; } }
    .fd-motion__col {
      padding: var(--s-6);
      border-right: 1px solid var(--rule);
      display: flex; flex-direction: column; gap: 16px;
    }
    .fd-motion__col:last-child { border-right: 0; }
    .fd-motion__role { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2); }
    .fd-motion__name { font-family: var(--font-display); font-size: 1.75rem; line-height: 1.1; }
    .fd-motion__dot {
      width: 24px; height: 24px; background: var(--accent); border-radius: 50%;
      animation: fd-slide 2.4s infinite;
    }
    .fd-motion__col:nth-child(1) .fd-motion__dot { animation-timing-function: cubic-bezier(.2,.8,.2,1); }
    .fd-motion__col:nth-child(2) .fd-motion__dot { animation-timing-function: cubic-bezier(.7,0,.3,1); animation-duration: 1.6s; }
    .fd-motion__col:nth-child(3) .fd-motion__dot { animation-timing-function: linear; animation-duration: 3.6s; }
    @keyframes fd-slide {
      0%, 100% { transform: translateX(0); }
      50%      { transform: translateX(calc(100% + 80px)); }
    }
    .fd-motion__spec { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); }
  </style>

  <!-- HERO -->
  <section class="fd-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">04 · Foundations</span>
      <h1>Spacing, grid, radii, shadows &mdash; the <em>scaffolding</em>.</h1>
      <p class="fd-hero__lede">These are the invisible rules that make everything feel like Kilowott. An 8-point base keeps layouts tight and rhythm predictable. A 12-column grid gives designers and developers a shared vocabulary.</p>
    </div>
  </section>

  <!-- SPACING -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Spacing scale</h2>
        <p class="section-head__body">Based on a 4-point unit, doubling up as it grows. Only use these values &mdash; never arbitrary pixels.</p>
      </div>
      <div style="border: 1px solid var(--rule); border-radius: var(--r-3); padding: 24px;">
        <div class="fd-space">
          <div>Token</div><div>Scale</div><div>Value</div><div>Typical use</div>
        </div>
        <div class="fd-space"><div class="fd-space__token">--s-1</div><div class="fd-space__bar" style="width:4px"></div><div class="fd-space__val">4px</div><div class="fd-space__use">Tightest gaps, icon padding</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-2</div><div class="fd-space__bar" style="width:8px"></div><div class="fd-space__val">8px</div><div class="fd-space__use">Tag padding, inline gaps</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-3</div><div class="fd-space__bar" style="width:12px"></div><div class="fd-space__val">12px</div><div class="fd-space__use">Form field padding</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-4</div><div class="fd-space__bar" style="width:16px"></div><div class="fd-space__val">16px</div><div class="fd-space__use">Card padding, stacks</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-5</div><div class="fd-space__bar" style="width:24px"></div><div class="fd-space__val">24px</div><div class="fd-space__use">Grid gap, card gap</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-6</div><div class="fd-space__bar" style="width:32px"></div><div class="fd-space__val">32px</div><div class="fd-space__use">Container gutter, block gap</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-7</div><div class="fd-space__bar" style="width:48px"></div><div class="fd-space__val">48px</div><div class="fd-space__use">Component block gap</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-8</div><div class="fd-space__bar" style="width:64px"></div><div class="fd-space__val">64px</div><div class="fd-space__use">Small section padding</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-9</div><div class="fd-space__bar" style="width:96px"></div><div class="fd-space__val">96px</div><div class="fd-space__use">Section padding · default</div></div>
        <div class="fd-space"><div class="fd-space__token">--s-10</div><div class="fd-space__bar" style="width:128px"></div><div class="fd-space__val">128px</div><div class="fd-space__use">Hero padding</div></div>
      </div>
    </div>
  </section>

  <!-- GRID -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">12-column grid</h2>
        <p class="section-head__body">1280&nbsp;px max container, 32&nbsp;px gutter. Collapses to 4 columns on mobile. Content never exceeds 10 columns &mdash; always leave breathing room.</p>
      </div>
      <div class="fd-grid-viz">
        ${Array.from({length: 12}).map(() => '<div></div>').join('')}
      </div>
      <div class="fd-grid-caption">
        <span>12 cols · 16px gutter shown</span>
        <span>max 1280px · gutter 32px</span>
      </div>
    </div>
  </section>

  <!-- RADII -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Radii</h2>
        <p class="section-head__body">Kilowott runs sharp. Most surfaces use 0 or 4 px; pills for navigation and chips; 8 px for cards. Nothing softer.</p>
      </div>
      <div class="grid grid-6" style="grid-template-columns: repeat(5, 1fr);">
        <div class="fd-radius"><div class="fd-radius__demo" style="border-radius: 0;"></div><span class="fd-radius__name">r-0 · Sharp</span><span class="fd-radius__val">0px · default</span></div>
        <div class="fd-radius"><div class="fd-radius__demo" style="border-radius: 2px;"></div><span class="fd-radius__name">r-1 · Edge</span><span class="fd-radius__val">2px</span></div>
        <div class="fd-radius"><div class="fd-radius__demo" style="border-radius: 4px;"></div><span class="fd-radius__name">r-2 · Tag</span><span class="fd-radius__val">4px</span></div>
        <div class="fd-radius"><div class="fd-radius__demo" style="border-radius: 8px;"></div><span class="fd-radius__name">r-3 · Card</span><span class="fd-radius__val">8px</span></div>
        <div class="fd-radius"><div class="fd-radius__demo" style="border-radius: 999px;"></div><span class="fd-radius__name">r-pill</span><span class="fd-radius__val">Buttons, chips</span></div>
      </div>
    </div>
  </section>

  <!-- SHADOWS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Elevation</h2>
        <p class="section-head__body">Four levels of elevation. Use rarely &mdash; Kilowott prefers borders and whitespace to separate surfaces, not shadow. Reserve <span class="mono">shadow-3</span> for modals and detached overlays only.</p>
      </div>
      <div class="grid grid-4">
        <div class="fd-shadow"><div class="fd-shadow__demo"></div><span class="fd-shadow__name">Flat · shadow-0</span><span class="fd-shadow__val">Default · 1px border</span></div>
        <div class="fd-shadow"><div class="fd-shadow__demo" style="box-shadow: 0 1px 0 rgba(11,15,20,0.06), 0 1px 2px rgba(11,15,20,0.04);"></div><span class="fd-shadow__name">Soft · shadow-1</span><span class="fd-shadow__val">Cards on hover</span></div>
        <div class="fd-shadow"><div class="fd-shadow__demo" style="box-shadow: 0 2px 4px rgba(11,15,20,0.06), 0 8px 16px rgba(11,15,20,0.06);"></div><span class="fd-shadow__name">Lift · shadow-2</span><span class="fd-shadow__val">Tooltips, popovers</span></div>
        <div class="fd-shadow"><div class="fd-shadow__demo" style="box-shadow: 0 4px 8px rgba(11,15,20,0.08), 0 24px 48px rgba(11,15,20,0.10);"></div><span class="fd-shadow__name">Float · shadow-3</span><span class="fd-shadow__val">Modals, overlays</span></div>
      </div>
    </div>
  </section>

  <!-- MOTION -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Motion principles</h2>
        <p class="section-head__body">Motion is punctuation. It clarifies cause and effect &mdash; it doesn&rsquo;t perform. Default to 200&nbsp;ms and the standard ease. Reserve longer durations for hero moments.</p>
      </div>
      <div class="fd-motion">
        <div class="fd-motion__col">
          <span class="fd-motion__role">Default · 80%</span>
          <h3 class="fd-motion__name">Standard</h3>
          <div class="fd-motion__dot"></div>
          <span class="fd-motion__spec">200ms · cubic-bezier(.2,.8,.2,1)</span>
          <span class="muted" style="font-size:13px;">Buttons, tabs, hovers, state.</span>
        </div>
        <div class="fd-motion__col">
          <span class="fd-motion__role">Hero · 15%</span>
          <h3 class="fd-motion__name">Emphatic</h3>
          <div class="fd-motion__dot"></div>
          <span class="fd-motion__spec">400ms · cubic-bezier(.7,0,.3,1)</span>
          <span class="muted" style="font-size:13px;">Reveals, page intros, modals.</span>
        </div>
        <div class="fd-motion__col">
          <span class="fd-motion__role">Ambient · 5%</span>
          <h3 class="fd-motion__name">Loop</h3>
          <div class="fd-motion__dot"></div>
          <span class="fd-motion__spec">≥ 2s · linear</span>
          <span class="muted" style="font-size:13px;">Marquees, data tickers.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TOKEN DUMP -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Tokens (CSS)</h2>
        <p class="section-head__body">Copy-paste-ready CSS custom properties. The exact tokens this doc is built from. Developers: this is the handoff file.</p>
      </div>
      <pre class="fd-tokens"><span class="comment">/* Kilowott · Design System · v0.6 — complete */</span>
:root {
  <span class="comment">/* ---------- BRAND COLORS ---------- */</span>
  <span class="prop">--k-ink</span>:        #0B0F14;
  <span class="prop">--k-ink-2</span>:      #1A2230;
  <span class="prop">--k-ink-3</span>:      #2B3544;
  <span class="prop">--k-paper</span>:      #FFFFFF;
  <span class="prop">--k-paper-2</span>:    #F6F4F0;
  <span class="prop">--k-paper-3</span>:    #EDEAE3;
  <span class="prop">--k-red</span>:        #E4022D;
  <span class="prop">--k-red-soft</span>:   #FCE5EA;
  <span class="prop">--k-red-ink</span>:    #8A021B;
  <span class="prop">--k-rule</span>:       #1A2230;
  <span class="prop">--k-rule-soft</span>:  #E2DED6;
  <span class="prop">--k-muted</span>:      #5B6573;
  <span class="prop">--k-muted-dark</span>: #8A95A5;

  <span class="comment">/* ---------- SEMANTIC ---------- */</span>
  <span class="prop">--bg</span>:           var(--k-paper);
  <span class="prop">--bg-2</span>:         var(--k-paper-2);
  <span class="prop">--bg-3</span>:         var(--k-paper-3);
  <span class="prop">--fg</span>:           var(--k-ink);
  <span class="prop">--fg-2</span>:         var(--k-muted);
  <span class="prop">--accent</span>:       var(--k-red);
  <span class="prop">--accent-ink</span>:   var(--k-red-ink);
  <span class="prop">--rule</span>:         var(--k-rule-soft);
  <span class="prop">--rule-strong</span>:  var(--k-rule);

  <span class="comment">/* ---------- TYPE ---------- */</span>
  <span class="prop">--font-display</span>: "Newsreader", "Fraunces", ui-serif, Georgia, serif;
  <span class="prop">--font-sans</span>:    "DM Sans", "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  <span class="prop">--font-mono</span>:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

  <span class="prop">--fs-d1</span>:   clamp(3.5rem, 7vw, 6.25rem);   <span class="comment">/* 56–100 */</span>
  <span class="prop">--fs-d2</span>:   clamp(2.75rem, 5.2vw, 4.5rem); <span class="comment">/* 44–72 */</span>
  <span class="prop">--fs-d3</span>:   clamp(2rem, 3.6vw, 3rem);      <span class="comment">/* 32–48 */</span>
  <span class="prop">--fs-h1</span>:   2.25rem;    <span class="comment">/* 36 */</span>
  <span class="prop">--fs-h2</span>:   1.5rem;     <span class="comment">/* 24 */</span>
  <span class="prop">--fs-h3</span>:   1.125rem;   <span class="comment">/* 18 */</span>
  <span class="prop">--fs-body</span>: 1rem;       <span class="comment">/* 16 */</span>
  <span class="prop">--fs-sm</span>:   0.875rem;   <span class="comment">/* 14 */</span>
  <span class="prop">--fs-xs</span>:   0.75rem;    <span class="comment">/* 12 · eyebrow */</span>

  <span class="prop">--lh-tight</span>: 1.04;
  <span class="prop">--lh-snug</span>:  1.2;
  <span class="prop">--lh-body</span>:  1.55;

  <span class="prop">--tracking-eyebrow</span>: 0.18em;
  <span class="prop">--tracking-display</span>: -0.02em;

  <span class="comment">/* ---------- SPACING (8pt base) ---------- */</span>
  <span class="prop">--s-0</span>:  0;     <span class="prop">--s-1</span>:  4px;   <span class="prop">--s-2</span>:  8px;   <span class="prop">--s-3</span>:  12px;
  <span class="prop">--s-4</span>:  16px;  <span class="prop">--s-5</span>:  24px;  <span class="prop">--s-6</span>:  32px;  <span class="prop">--s-7</span>:  48px;
  <span class="prop">--s-8</span>:  64px;  <span class="prop">--s-9</span>:  96px;  <span class="prop">--s-10</span>: 128px;

  <span class="comment">/* ---------- RADII ---------- */</span>
  <span class="prop">--r-0</span>: 0;   <span class="prop">--r-1</span>: 2px;  <span class="prop">--r-2</span>: 4px;
  <span class="prop">--r-3</span>: 8px; <span class="prop">--r-4</span>: 12px; <span class="prop">--r-pill</span>: 999px;

  <span class="comment">/* ---------- SHADOWS ---------- */</span>
  <span class="prop">--shadow-0</span>: none;
  <span class="prop">--shadow-1</span>: 0 1px 0 rgba(11,15,20,0.06), 0 1px 2px rgba(11,15,20,0.04);
  <span class="prop">--shadow-2</span>: 0 2px 4px rgba(11,15,20,0.06), 0 8px 16px rgba(11,15,20,0.06);
  <span class="prop">--shadow-3</span>: 0 4px 8px rgba(11,15,20,0.08), 0 24px 48px rgba(11,15,20,0.10);

  <span class="comment">/* ---------- LAYOUT ---------- */</span>
  <span class="prop">--container</span>: 1280px;
  <span class="prop">--gutter</span>:    32px;

  <span class="comment">/* ---------- MOTION ---------- */</span>
  <span class="prop">--ease-standard</span>: cubic-bezier(.2, .8, .2, 1);
  <span class="prop">--ease-in</span>:       cubic-bezier(.4, 0, 1, 1);
  <span class="prop">--ease-out</span>:      cubic-bezier(0, 0, .2, 1);
  <span class="prop">--dur-fast</span>:      120ms;
  <span class="prop">--dur-standard</span>:  200ms;
  <span class="prop">--dur-slow</span>:      320ms;

  <span class="comment">/* ---------- BREAKPOINTS (reference — not CSS vars) ---------- */</span>
  <span class="comment">/* sm  600px  · tablet portrait */</span>
  <span class="comment">/* md  900px  · default collapse · grid → stacked */</span>
  <span class="comment">/* lg  1200px · desktop */</span>
  <span class="comment">/* xl  1440px · wide desktop */</span>
}

<span class="comment">/* Dark mode flips semantics, brand hexes stay anchored */</span>
[data-theme="dark"] {
  <span class="prop">--bg</span>:          var(--k-ink);
  <span class="prop">--bg-2</span>:        var(--k-ink-2);
  <span class="prop">--bg-3</span>:        var(--k-ink-3);
  <span class="prop">--fg</span>:          var(--k-paper);
  <span class="prop">--fg-2</span>:        var(--k-muted-dark);
  <span class="prop">--rule</span>:        #2B3544;
  <span class="prop">--rule-strong</span>: #3B4656;
}</pre>
    </div>
  </section>
  `;
};
