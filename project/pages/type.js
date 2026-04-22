/* ============================================================
   TYPOGRAPHY PAGE
   ============================================================ */

window.renderType = function (root) {
  root.innerHTML = `
  <style>
    .ty-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .ty-hero__headline {
      font-family: var(--font-display);
      font-size: clamp(3rem, 9vw, 8rem);
      line-height: 0.96; letter-spacing: -0.03em;
      margin-top: 32px;
    }
    .ty-hero__headline em {
      font-style: italic; color: var(--accent);
      font-variation-settings: "SOFT" 100, "WONK" 1;
    }
    .ty-hero__caption {
      display: flex; justify-content: space-between;
      border-top: 1px solid var(--rule); padding-top: 16px; margin-top: 40px;
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
      letter-spacing: 0.08em; text-transform: uppercase;
    }

    /* Pairing card */
    .ty-pair {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
      display: grid; grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 900px) { .ty-pair { grid-template-columns: 1fr; } }
    .ty-pair__col { padding: var(--s-7) var(--s-6); border-right: 1px solid var(--rule); }
    .ty-pair__col:last-child { border-right: 0; }
    .ty-pair__role {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
    }
    .ty-pair__name {
      font-size: 2rem; margin-top: 8px;
    }
    .ty-pair__sample-display {
      font-family: var(--font-display); font-weight: 400;
      font-size: 4.5rem; line-height: 1; letter-spacing: -0.02em;
      margin-top: var(--s-6);
    }
    .ty-pair__sample-display em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "WONK" 1; }
    .ty-pair__alpha {
      margin-top: 24px;
      font-family: var(--font-display); font-size: 24px; line-height: 1.2;
      color: var(--fg-2); word-spacing: 6px;
    }
    .ty-pair__sans-name {
      font-family: var(--font-sans); font-size: 2rem;
      margin-top: 8px; letter-spacing: -0.02em;
    }
    .ty-pair__sans-sample {
      font-family: var(--font-sans); font-size: 1.25rem;
      line-height: 1.55; margin-top: var(--s-6); color: var(--fg);
    }
    .ty-pair__specs {
      margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
    }
    .ty-pair__specs b { color: var(--fg); display: block; font-family: var(--font-sans); font-size: 13px; margin-top: 4px; }

    /* Scale */
    .ty-scale {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    .ty-scale__row {
      display: grid; grid-template-columns: 80px 1fr 200px 160px;
      align-items: center;
      padding: 20px 24px;
      border-top: 1px solid var(--rule);
      gap: 24px;
    }
    .ty-scale__row:first-child {
      border-top: 0;
      font-family: var(--font-mono); font-size: 11px; color: var(--fg-2);
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .ty-scale__token {
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
    }
    .ty-scale__spec {
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
    }
    .ty-scale__use { color: var(--fg-2); font-size: 13px; }
    .ty-scale__sample { line-height: 1; }
    @media (max-width: 900px) {
      .ty-scale__row { grid-template-columns: 1fr; }
      .ty-scale__sample { font-size: clamp(20px, 5vw, 40px) !important; }
    }

    /* Headline patterns */
    .ty-pat {
      padding: var(--s-7) var(--s-6);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      background: var(--bg);
    }
    .ty-pat__label {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
      margin-bottom: 20px;
    }
    .ty-pat h3 {
      font-family: var(--font-display); font-weight: 400;
      font-size: 2rem; line-height: 1.1; letter-spacing: -0.02em;
    }
    .ty-pat h3 em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "WONK" 1; }
    .ty-pat p { margin-top: 14px; color: var(--fg-2); font-size: 14px; line-height: 1.55; }

    /* Rules table */
    .ty-rules {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
  </style>

  <!-- HERO -->
  <section class="ty-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">03 · Typography</span>
      <h1 class="ty-hero__headline">Serif for <em>soul</em>,<br>sans for substance.</h1>
      <div class="ty-hero__caption">
        <span>Editorial pairing · Newsreader + DM Sans</span>
        <span>9 sizes · 4 weights</span>
      </div>
    </div>
  </section>

  <!-- PRIMARY PAIRING -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">The primary pairing</h2>
        <p class="section-head__body">A warm serif for display, a neutral geometric sans for everything else. The serif italic is the secret weapon &mdash; it turns any headline into a Kilowott headline.</p>
      </div>

      <div class="ty-pair">
        <div class="ty-pair__col">
          <span class="ty-pair__role">Display &middot; Headlines &middot; Editorial moments</span>
          <h3 class="ty-pair__name" style="font-family: var(--font-display); font-weight: 400;">Newsreader</h3>
          <div class="ty-pair__sample-display">Brave <em>products</em>.</div>
          <div class="ty-pair__alpha">AaBbCc 0123 &amp; ? !</div>
          <div class="ty-pair__specs">
            <div>Category<b>Variable serif (optical)</b></div>
            <div>Weights<b>400, 500</b></div>
            <div>Optical<b>6–72</b></div>
            <div>Axes<b>wght · ital · opsz</b></div>
          </div>
        </div>
        <div class="ty-pair__col">
          <span class="ty-pair__role">Text &middot; UI &middot; Everything else</span>
          <h3 class="ty-pair__sans-name">DM Sans</h3>
          <p class="ty-pair__sans-sample">A friendly geometric sans with a slightly soft terminal. Use for body, navigation, buttons, captions, labels and any dense information. Never use the serif below 20&nbsp;px &mdash; switch to the sans.</p>
          <div class="ty-pair__specs">
            <div>Category<b>Geometric sans</b></div>
            <div>Weights<b>400, 500</b></div>
            <div>Use for<b>Body, UI, captions</b></div>
            <div>Min size<b>12 px</b></div>
          </div>
        </div>
      </div>

      <p class="muted" style="margin-top: 24px; font-size: 14px;">Both families are free and open-source on Google Fonts — the same source we load in this doc. Alternate pairings (Technical, Classic) are available via the Tweaks panel.</p>
    </div>
  </section>

  <!-- SCALE -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">The type scale</h2>
        <p class="section-head__body">Nine sizes. Named, tokenized and responsive. Display sizes scale with viewport &mdash; UI sizes stay fixed. Don&rsquo;t introduce new sizes; compose instead.</p>
      </div>

      <div class="ty-scale">
        <div class="ty-scale__row">
          <div>Token</div><div>Sample</div><div>Spec</div><div>Use</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-d1</div>
          <div class="ty-scale__sample display" style="font-size: 64px;">Engineering</div>
          <div class="ty-scale__spec">56–100px · 1.04</div>
          <div class="ty-scale__use">Hero headline</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-d2</div>
          <div class="ty-scale__sample display" style="font-size: 48px;">Section title</div>
          <div class="ty-scale__spec">44–72px · 1.1</div>
          <div class="ty-scale__use">Page title</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-d3</div>
          <div class="ty-scale__sample display" style="font-size: 34px;">Section heading</div>
          <div class="ty-scale__spec">32–48px · 1.15</div>
          <div class="ty-scale__use">Section heading</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-h1</div>
          <div class="ty-scale__sample" style="font-family: var(--font-sans); font-weight: 500; font-size: 36px;">Block title</div>
          <div class="ty-scale__spec">36px · 1.2</div>
          <div class="ty-scale__use">Card title</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-h2</div>
          <div class="ty-scale__sample" style="font-family: var(--font-sans); font-weight: 500; font-size: 24px;">Sub-heading</div>
          <div class="ty-scale__spec">24px · 1.25</div>
          <div class="ty-scale__use">Sub-heading</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-h3</div>
          <div class="ty-scale__sample" style="font-family: var(--font-sans); font-weight: 500; font-size: 18px;">Label lead</div>
          <div class="ty-scale__spec">18px · 1.4</div>
          <div class="ty-scale__use">List lead / lede</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-body</div>
          <div class="ty-scale__sample" style="font-family: var(--font-sans); font-size: 16px;">Body copy — default.</div>
          <div class="ty-scale__spec">16px · 1.55</div>
          <div class="ty-scale__use">Body</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-sm</div>
          <div class="ty-scale__sample" style="font-family: var(--font-sans); font-size: 14px;">Captions and UI labels</div>
          <div class="ty-scale__spec">14px · 1.5</div>
          <div class="ty-scale__use">Meta, UI</div>
        </div>
        <div class="ty-scale__row">
          <div class="ty-scale__token">fs-xs</div>
          <div class="ty-scale__sample" style="font-family: var(--font-sans); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">Eyebrow label</div>
          <div class="ty-scale__spec">12px · 1.4 · 0.18em</div>
          <div class="ty-scale__use">Eyebrow</div>
        </div>
      </div>
    </div>
  </section>

  <!-- HEADLINE PATTERNS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Headline patterns</h2>
        <p class="section-head__body">Three approved headline recipes. Use the italic to carry emphasis &mdash; one word per headline, never two.</p>
      </div>
      <div class="grid grid-3">
        <div class="ty-pat">
          <div class="ty-pat__label">Pattern 01 · Italic emphasis</div>
          <h3>Engineering <em>brave</em> products.</h3>
          <p>Default. The italic carries one word — usually the verb or the adjective.</p>
        </div>
        <div class="ty-pat">
          <div class="ty-pat__label">Pattern 02 · Eyebrow + headline</div>
          <div style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); margin-bottom:12px;">— Partner success</div>
          <h3>Seven years. Four products. One partner.</h3>
          <p>Eyebrow sets context, headline stays punchy and declarative.</p>
        </div>
        <div class="ty-pat">
          <div class="ty-pat__label">Pattern 03 · Numeric lead</div>
          <h3 style="font-size: 4rem;">14<span style="color:var(--accent)">×</span></h3>
          <p style="margin-top: 4px;">Big number, tight label. Used for stats and outcome-led heroes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- RULES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">When to use what</h2>
        <p class="section-head__body">The most common confusion you flagged &mdash; which font for which heading. This covers 95% of cases.</p>
      </div>
      <div class="ty-rules">
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Page &amp; section titles</b></span><span class="token-row__meta">Newsreader · fs-d1 / fs-d2 / fs-d3</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Sub-headings inside a section</b></span><span class="token-row__meta">DM Sans 500 · fs-h2</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Eyebrows &amp; labels</b></span><span class="token-row__meta">DM Sans 500 · fs-xs · uppercase</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Body copy</b></span><span class="token-row__meta">DM Sans 400 · fs-body</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Stats &amp; big numbers</b></span><span class="token-row__meta">Newsreader 400 · red accent</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Code, technical values</b></span><span class="token-row__meta">JetBrains Mono · fs-sm</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Mobile body (below 600px)</b></span><span class="token-row__meta">DM Sans 400 · fs-body (unchanged)</span></div>
      </div>
    </div>
  </section>
  `;
};
