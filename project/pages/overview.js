/* ============================================================
   OVERVIEW PAGE — what the kit is, how it's organised, where to start
   ============================================================ */

window.renderOverview = function (root) {
  root.innerHTML = `
  <style>
    /* ===== HERO ===== */
    .ov-hero {
      padding: var(--s-9) 0 var(--s-8);
      border-bottom: 1px solid var(--rule);
    }
    .ov-hero__grid {
      display: grid; grid-template-columns: 1.25fr 1fr; gap: var(--s-8);
      align-items: end;
    }
    @media (max-width: 900px) { .ov-hero__grid { grid-template-columns: 1fr; } }

    .ov-hero__headline {
      font-family: var(--font-display);
      font-size: var(--fs-d1);
      line-height: var(--lh-tight);
      letter-spacing: var(--tracking-display);
      margin-top: var(--s-6);
    }
    .ov-hero__headline em {
      font-style: italic;
      color: var(--accent);
    }
    .ov-hero__meta {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: var(--s-5); margin-top: var(--s-6);
      border-top: 1px solid var(--rule); padding-top: var(--s-5);
    }
    .ov-hero__meta > div {
      font-size: var(--fs-xs); letter-spacing: var(--tracking-eyebrow);
      text-transform: uppercase; color: var(--fg-2);
    }
    .ov-hero__meta b {
      display: block; color: var(--fg); font-size: var(--fs-sm);
      font-weight: 500; letter-spacing: 0; text-transform: none; margin-top: 6px;
      line-height: 1.4;
    }

    .ov-hero__aside {
      padding: var(--s-6);
      border: 1px solid var(--rule-strong);
      border-radius: var(--r-3);
      background: var(--bg-2);
    }
    .ov-hero__aside h3 {
      font-family: var(--font-display);
      font-size: 1.5rem; line-height: 1.2;
      margin-bottom: var(--s-3);
    }
    .ov-hero__aside p { color: var(--fg-2); font-size: var(--fs-sm); line-height: 1.6; }
    .ov-hero__aside ul { margin: var(--s-4) 0 0; padding: 0; list-style: none; font-size: var(--fs-sm); }
    .ov-hero__aside li {
      display: flex; justify-content: space-between;
      padding: 10px 0; border-bottom: 1px dashed var(--rule);
    }
    .ov-hero__aside li:last-child { border-bottom: 0; }
    .ov-hero__aside li span:last-child { color: var(--fg-2); font-family: var(--font-mono); font-size: 12px; }

    /* ===== PRINCIPLES STRIP ===== */
    .ov-principles {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 0;
      border-bottom: 1px solid var(--rule);
    }
    .ov-principle {
      padding: var(--s-7) var(--s-5);
      border-right: 1px solid var(--rule);
    }
    .ov-principle:last-child { border-right: 0; }
    .ov-principle__num {
      font-family: var(--font-mono);
      font-size: var(--fs-xs); color: var(--fg-2);
    }
    .ov-principle__title {
      font-family: var(--font-display);
      font-size: 1.75rem; line-height: 1.1;
      margin-top: var(--s-4); margin-bottom: var(--s-3);
    }
    .ov-principle__body { color: var(--fg-2); font-size: var(--fs-sm); line-height: 1.6; }
    @media (max-width: 900px) {
      .ov-principles { grid-template-columns: 1fr 1fr; }
      .ov-principle:nth-child(2n) { border-right: 0; }
      .ov-principle:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
    }

    /* ===== EDITORIAL SAMPLE ===== */
    .ov-dir-head {
      padding: var(--s-8) 0 var(--s-6);
    }
    .ov-dir-head h2 {
      font-family: var(--font-display);
      font-size: var(--fs-d3);
      letter-spacing: var(--tracking-display);
      line-height: var(--lh-tight);
      max-width: 22ch;
    }
    .ov-dir-head p {
      max-width: 62ch; margin-top: var(--s-4);
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    .ov-dirs {
      display: grid; grid-template-columns: 1fr;
      gap: 0;
      border-top: 1px solid var(--rule-strong);
      border-bottom: 1px solid var(--rule-strong);
    }

    .ov-dir {
      display: grid; grid-template-columns: 1.1fr 1fr;
      min-height: 560px;
    }
    @media (max-width: 900px) { .ov-dir { grid-template-columns: 1fr; } }

    .ov-dir__preview {
      padding: var(--s-7) var(--s-6);
      display: flex; flex-direction: column;
      justify-content: space-between;
      gap: var(--s-6);
    }
    .ov-dir__meta {
      padding: var(--s-7) var(--s-6);
      border-left: 1px solid var(--rule);
      font-size: var(--fs-sm); color: var(--fg-2);
      line-height: 1.6;
      display: flex; flex-direction: column; gap: var(--s-5);
    }
    @media (max-width: 900px) {
      .ov-dir__meta { border-left: 0; border-top: 1px solid var(--rule); }
    }
    .ov-dir__meta b { display:block; color: var(--fg); font-weight: 500; margin-bottom: 4px; }
    .ov-dir__tags {
      display: flex; gap: 8px; flex-wrap: wrap; margin-top: var(--s-4);
    }
    .ov-dir__tag {
      font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
      padding: 4px 10px; border: 1px solid var(--rule); border-radius: var(--r-pill);
    }
    .ov-dir__num {
      font-family: var(--font-mono);
      font-size: 11px; color: var(--fg-2); letter-spacing: 0.1em;
    }

    /* === Editorial sample card === */
    .dirA .ov-dir__preview { background: #FFFFFF; color: #0B0F14; }
    .dirA .ov-dir__headline {
      font-family: var(--font-display); font-weight: 400;
      font-size: 2.75rem; line-height: 1.02; letter-spacing: -0.02em;
    }
    .dirA .ov-dir__headline em {
      font-style: italic; color: #E4022D;
    }
    .dirA .ov-dir__eyebrow {
      font-family: var(--font-sans);
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: #0B0F14; display: inline-flex; align-items: center; gap: 10px;
    }
    .dirA .ov-dir__eyebrow::before { content: ""; width: 20px; height: 1px; background: currentColor; }
    .dirA .ov-dir__body {
      font-family: var(--font-sans);
      font-size: 14px; line-height: 1.6; color: #5B6573;
    }
    .dirA .ov-dir__stat {
      border-top: 1px solid #E2DED6; padding-top: 16px;
      display: flex; align-items: baseline; gap: 12px;
    }
    .dirA .ov-dir__stat-num {
      font-family: var(--font-display); font-size: 3rem; line-height: 1;
      color: #E4022D; letter-spacing: -0.03em;
    }
    .dirA .ov-dir__stat-num .x {
      font-family: var(--font-sans); font-weight: 400;
      font-size: 0.55em; vertical-align: 0.18em; margin-left: 0.04em;
      letter-spacing: 0;
    }
    .dirA .ov-dir__stat-cap {
      font-family: var(--font-sans); font-size: 12px;
      color: #5B6573; max-width: 14ch; line-height: 1.4;
    }

    .ov-dir__meta-block b {
      display:block; color: var(--fg); font-weight: 500; margin-bottom: 6px;
      font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    }
    .ov-dir__meta-block p { margin: 0; color: var(--fg-2); }

    /* ===== KIT MAP ===== */
    .ov-kit {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 0;
      border-top: 1px solid var(--rule-strong);
      border-bottom: 1px solid var(--rule-strong);
    }
    .ov-kit__col {
      padding: var(--s-7) var(--s-5);
      border-right: 1px solid var(--rule);
      display: flex; flex-direction: column; gap: var(--s-4);
    }
    .ov-kit__col:last-child { border-right: 0; }
    .ov-kit__cat {
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      letter-spacing: var(--tracking-eyebrow);
      text-transform: uppercase;
      color: var(--fg-2);
    }
    .ov-kit__h {
      font-family: var(--font-display);
      font-size: 1.5rem; line-height: 1.15;
      letter-spacing: -0.01em;
    }
    .ov-kit__list { list-style: none; padding: 0; margin: 0; }
    .ov-kit__list li {
      padding: 10px 0;
      border-top: 1px dashed var(--rule);
      font-size: var(--fs-sm);
      color: var(--fg);
      line-height: 1.5;
    }
    .ov-kit__list li:first-child { border-top: 0; padding-top: 0; }
    .ov-kit__list small {
      display: block;
      color: var(--fg-2);
      font-size: 12px;
      margin-top: 2px;
    }
    @media (max-width: 900px) {
      .ov-kit { grid-template-columns: 1fr 1fr; }
      .ov-kit__col:nth-child(2n) { border-right: 0; }
      .ov-kit__col:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
    }
    @media (max-width: 560px) {
      .ov-kit { grid-template-columns: 1fr; }
      .ov-kit__col { border-right: 0; border-bottom: 1px solid var(--rule); }
      .ov-kit__col:last-child { border-bottom: 0; }
    }

    /* ===== START HERE ===== */
    .ov-start {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: var(--s-5);
      margin-top: var(--s-6);
    }
    @media (max-width: 900px) { .ov-start { grid-template-columns: 1fr; } }
    .ov-start__card {
      padding: var(--s-6);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      background: var(--bg);
      display: flex; flex-direction: column; gap: var(--s-3);
    }
    .ov-start__num {
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      color: var(--fg-2);
      letter-spacing: var(--tracking-eyebrow);
    }
    .ov-start__h {
      font-family: var(--font-display);
      font-size: 1.625rem;
      line-height: 1.15;
      letter-spacing: -0.01em;
    }
    .ov-start__h em { font-style: italic; color: var(--accent); }
    .ov-start__body {
      color: var(--fg-2);
      font-size: var(--fs-sm);
      line-height: 1.6;
    }
  </style>

  <!-- HERO -->
  <section class="ov-hero">
    <div class="container">
      <div class="ov-hero__grid">
        <div>
          <span class="eyebrow eyebrow--accent">The Kilowott Design System</span>
          <h1 class="ov-hero__headline">
            One system.<br>
            <em>Every surface.</em><br>
            Built on what works.
          </h1>

          <div class="ov-hero__meta">
            <div>Version<b>1.0 &middot; Live</b></div>
            <div>Owner<b>Brand &amp; Design</b></div>
            <div>Primary source<b>kilowott.com</b></div>
            <div>Status<b>Live &middot; v1.0</b></div>
          </div>
        </div>

        <aside class="ov-hero__aside">
          <span class="eyebrow">What&rsquo;s inside</span>
          <h3 style="margin-top:16px">Foundations, parts bin, applied surfaces</h3>
          <p>Every layer ships in one kit. Foundations lock the rules. Components hold the parts bin. Applied surfaces &mdash; dashboards, decks, social, email &mdash; show the system doing real work.</p>
          <ul>
            <li><span>Logo &middot; wordmark + bolt mark</span><span>Ready</span></li>
            <li><span>Color system</span><span>Ready</span></li>
            <li><span>Typography</span><span>Ready</span></li>
            <li><span>Spacing &middot; grid &middot; radii</span><span>Ready</span></li>
            <li><span>UI components</span><span>Ready</span></li>
            <li><span>Dashboards &amp; data surfaces</span><span>Ready</span></li>
            <li><span>Deck templates</span><span>Ready</span></li>
            <li><span>Imagery &amp; photo treatments</span><span>Ready</span></li>
            <li><span>Voice &amp; tone</span><span>Ready</span></li>
            <li><span>Social platform simulations</span><span>Ready</span></li>
            <li><span>Email signature generator</span><span>Ready</span></li>
            <li><span>Newsletter block composer</span><span>Ready</span></li>
            <li><span>Stationery print kit</span><span>Ready</span></li>
            <li><span>Case-study template</span><span>Ready</span></li>
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <!-- PRINCIPLES -->
  <section>
    <div class="container" style="padding: 0;">
      <div class="ov-principles">
        <div class="ov-principle">
          <div class="ov-principle__num">01 / Principle</div>
          <h3 class="ov-principle__title">Calm by default</h3>
          <p class="ov-principle__body">Generous white space, a narrow palette, type doing the heavy lifting. Noise is a design failure, not a feature.</p>
        </div>
        <div class="ov-principle">
          <div class="ov-principle__num">02 / Principle</div>
          <h3 class="ov-principle__title">Red earns its place</h3>
          <p class="ov-principle__body">The signature red is a spotlight, not a wash. Use it for one idea per surface &mdash; the stat, the verb, the CTA.</p>
        </div>
        <div class="ov-principle">
          <div class="ov-principle__num">03 / Principle</div>
          <h3 class="ov-principle__title">Editorial over ornamental</h3>
          <p class="ov-principle__body">Serif display paired with a clean sans. Italics carry emphasis. No gradients, no glows, no filler iconography.</p>
        </div>
        <div class="ov-principle">
          <div class="ov-principle__num">04 / Principle</div>
          <h3 class="ov-principle__title">Technical &amp; human</h3>
          <p class="ov-principle__body">We build with engineers and for enterprise &mdash; but we write like people. Precise, never sterile. Confident, never loud.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- INSIDE THE SYSTEM — editorial sample -->
  <section>
    <div class="container">
      <div class="ov-dir-head">
        <span class="eyebrow">Inside the system</span>
        <h2 style="margin-top:16px">One register. Tuned for every surface.</h2>
        <p>A calm canvas, a serif headline, and one hit of red. Marketing site, deck, proposal, dashboard, social &mdash; everything pulls from the same register. Density and theme are the only knobs that change.</p>
      </div>
    </div>

    <div class="container" style="padding-left:0; padding-right:0;">
      <div class="ov-dirs">
        <article class="ov-dir dirA">
          <div class="ov-dir__preview">
            <div>
              <div class="ov-dir__eyebrow">Editorial register &middot; sample</div>
              <div class="ov-dir__headline" style="margin-top:24px">
                Engineering <em>brave</em><br>products.
              </div>
              <p class="ov-dir__body" style="margin-top:16px; max-width: 36ch;">Serif display for the idea, clean sans for the argument, red reserved for the one thing that matters most on the page.</p>
            </div>
            <div class="ov-dir__stat">
              <div class="ov-dir__stat-num">3.5<span class="x">&times;</span></div>
              <div class="ov-dir__stat-cap">Organic traffic for Paul John Caffeine &mdash; SEO + Meta ads</div>
            </div>
          </div>
          <div class="ov-dir__meta">
            <div class="ov-dir__meta-block">
              <b>Typography</b>
              <p>Newsreader for display &middot; DM Sans for UI &amp; body &middot; JetBrains Mono for metadata.</p>
            </div>
            <div class="ov-dir__meta-block">
              <b>Color</b>
              <p>Paper white, ink text, a single red accent per surface.</p>
            </div>
            <div class="ov-dir__meta-block">
              <b>Where it lives</b>
              <p>Marketing site, landing pages, leadership decks, proposals, case studies, social, dashboards, email.</p>
            </div>
            <div class="ov-dir__tags">
              <span class="ov-dir__tag">Newsreader</span>
              <span class="ov-dir__tag">DM Sans</span>
              <span class="ov-dir__tag">Paper &middot; Ink &middot; Red</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- WHAT'S IN THE KIT -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">What&rsquo;s in the kit</h2>
        <p class="section-head__body">
          Eighteen tabs, four groups. Brand sets the register. System holds the parts bin. Surfaces and Communications show the system applied to the work.
        </p>
      </div>
    </div>

    <div class="container" style="padding-left:0; padding-right:0; margin-top: var(--s-6);">
      <div class="ov-kit">
        <div class="ov-kit__col">
          <span class="ov-kit__cat">01 / Brand</span>
          <h3 class="ov-kit__h">The register</h3>
          <ul class="ov-kit__list">
            <li>Logo<small>Wordmark, bolt mark, clear space</small></li>
            <li>Color<small>Palette, ratios, accessibility</small></li>
            <li>Type<small>Newsreader + DM Sans pairing</small></li>
            <li>Voice<small>Tone, vocabulary, mechanics</small></li>
            <li>Imagery<small>Photo style, treatments</small></li>
          </ul>
        </div>
        <div class="ov-kit__col">
          <span class="ov-kit__cat">02 / System</span>
          <h3 class="ov-kit__h">The parts bin</h3>
          <ul class="ov-kit__list">
            <li>Foundations<small>Spacing, grid, radii, motion, tokens</small></li>
            <li>Icons<small>Lucide library, 1,500+ glyphs</small></li>
            <li>Components<small>Buttons, inputs, cards, UI states</small></li>
          </ul>
        </div>
        <div class="ov-kit__col">
          <span class="ov-kit__cat">03 / Surfaces</span>
          <h3 class="ov-kit__h">The work</h3>
          <ul class="ov-kit__list">
            <li>Landing<small>Hero patterns and section blocks</small></li>
            <li>Dashboards<small>KPI tiles, tables, charts</small></li>
            <li>Deck<small>15 slide layouts &middot; .pptx download</small></li>
            <li>Case study<small>Situation &rarr; decision &rarr; result</small></li>
            <li>Social<small>LinkedIn, X, Instagram simulations</small></li>
          </ul>
        </div>
        <div class="ov-kit__col">
          <span class="ov-kit__cat">04 / Communications</span>
          <h3 class="ov-kit__h">The everyday</h3>
          <ul class="ov-kit__list">
            <li>Email<small>Transactional and newsletter templates</small></li>
            <li>Signature<small>Generator &middot; paste into Gmail</small></li>
            <li>Newsletter<small>Block composer &middot; paste into Gmail</small></li>
            <li>Stationery<small>Cards, letterhead, print kit</small></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- WHERE TO START -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Where to <em style="font-style:italic; color: var(--accent);">start</em></h2>
        <p class="section-head__body">
          Three routes through the kit, depending on what you&rsquo;re here to do.
        </p>
      </div>

      <div class="ov-start">
        <a class="ov-start__card" href="#logo" data-tab="logo">
          <span class="ov-start__num">Route 01</span>
          <h3 class="ov-start__h">Building something <em>on-brand</em></h3>
          <p class="ov-start__body">Start with Logo, Color, and Type to load the register. Then jump to the surface you&rsquo;re building &mdash; landing, deck, dashboard, social. Voice and Imagery are the polish layer.</p>
        </a>
        <a class="ov-start__card" href="#foundations" data-tab="foundations">
          <span class="ov-start__num">Route 02</span>
          <h3 class="ov-start__h">Shipping <em>product UI</em></h3>
          <p class="ov-start__body">Foundations sets the tokens &mdash; spacing, grid, radii, motion. Components is the parts bin. Icons covers the glyph library. Dashboards shows it in production.</p>
        </a>
        <a class="ov-start__card" href="#deck" data-tab="deck">
          <span class="ov-start__num">Route 03</span>
          <h3 class="ov-start__h">Pitching the <em>work</em></h3>
          <p class="ov-start__body">Deck has 15 layouts plus a downloadable .pptx. Case study templates the proof. Stationery and Signature handle the leave-behinds and the inbox.</p>
        </a>
      </div>
    </div>
  </section>
  `;
};
