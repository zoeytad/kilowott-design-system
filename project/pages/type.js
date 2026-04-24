/* ============================================================
   TYPOGRAPHY PAGE
   ============================================================ */

window.renderType = function (root) {
  root.innerHTML = `
  <style>
    .ty-hero {
      padding: var(--s-9) 0 var(--s-7);
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
    .ty-pair__sample-display em { font-style: italic; color: var(--accent); }
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
    .ty-pat h3 em { font-style: italic; color: var(--accent); }
    .ty-pat p { margin-top: 14px; color: var(--fg-2); font-size: 14px; line-height: 1.55; }

    /* Rules table */
    .ty-rules {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }

    /* ---------- MONO SPECIMEN ---------- */
    .ty-mono {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    .ty-mono__head {
      display: grid; grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .ty-mono__head { grid-template-columns: 1fr; } }
    .ty-mono__meta {
      padding: var(--s-7) var(--s-6);
      border-right: 1px solid var(--rule);
    }
    @media (max-width: 900px) {
      .ty-mono__meta { border-right: 0; border-bottom: 1px solid var(--rule); }
    }
    .ty-mono__role {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
    }
    .ty-mono__name {
      font-family: var(--font-sans); font-weight: 500;
      font-size: 2rem; margin-top: 8px; letter-spacing: -0.02em;
    }
    .ty-mono__lede {
      margin-top: var(--s-5); color: var(--fg-2);
      font-size: 14px; line-height: 1.6; max-width: 42ch;
    }
    .ty-mono__specs {
      margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
    }
    .ty-mono__specs b {
      color: var(--fg); display: block;
      font-family: var(--font-sans); font-size: 13px; margin-top: 4px;
    }

    /* Specimen: stacked glyph lines */
    .ty-mono__stage {
      padding: var(--s-7) var(--s-6);
      background: var(--bg-2);
      display: flex; flex-direction: column; justify-content: center;
      gap: 16px; min-height: 320px;
    }
    .ty-mono__line {
      font-family: var(--font-mono);
      color: var(--fg);
      line-height: 1.1;
    }
    .ty-mono__line--xl { font-size: 40px; font-weight: 500; letter-spacing: -0.01em; }
    .ty-mono__line--lg { font-size: 24px; font-weight: 400; }
    .ty-mono__line--md { font-size: 16px; font-weight: 400; }
    .ty-mono__line--sm {
      font-size: 12px; font-weight: 400;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
    }
    .ty-mono__line--kbd { font-size: 14px; color: var(--fg-2); }
    .ty-mono__line--kbd kbd {
      font-family: var(--font-mono); font-size: 11px;
      padding: 3px 8px; margin: 0 2px;
      border: 1px solid var(--rule-strong); border-radius: var(--r-2);
      background: var(--bg); color: var(--fg);
      box-shadow: inset 0 -1px 0 var(--rule);
    }
    .ty-mono__line--kbd .arrow { color: var(--accent); margin: 0 6px; }
    .ty-mono__line em { color: var(--accent); font-style: normal; }

    /* Weight demo */
    .ty-mono__weights {
      display: grid; grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 700px) { .ty-mono__weights { grid-template-columns: 1fr; } }
    .ty-mono__weight {
      padding: var(--s-6);
      border-right: 1px solid var(--rule);
    }
    .ty-mono__weight:last-child { border-right: 0; }
    @media (max-width: 700px) {
      .ty-mono__weight { border-right: 0; border-bottom: 1px solid var(--rule); }
      .ty-mono__weight:last-child { border-bottom: 0; }
    }
    .ty-mono__weight-label {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
    }
    .ty-mono__weight-sample {
      font-family: var(--font-mono); font-size: 22px;
      margin-top: 10px; color: var(--fg); line-height: 1.2;
    }
    .ty-mono__weight--400 .ty-mono__weight-sample { font-weight: 400; }
    .ty-mono__weight--500 .ty-mono__weight-sample { font-weight: 500; }
    .ty-mono__weight-note {
      margin-top: 8px; font-size: 13px; color: var(--fg-2); line-height: 1.5;
    }

    /* Size scale (small only — the sizes Mono is actually used at) */
    .ty-mono__sizes { }
    .ty-mono__size {
      display: grid; grid-template-columns: 80px 1fr 160px 200px;
      align-items: center; gap: 24px;
      padding: 16px 24px;
      border-top: 1px solid var(--rule);
    }
    .ty-mono__size:first-child {
      border-top: 0;
      font-family: var(--font-mono); font-size: 11px; color: var(--fg-2);
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .ty-mono__size-token { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); }
    .ty-mono__size-sample { font-family: var(--font-mono); color: var(--fg); line-height: 1; }
    .ty-mono__size-spec { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); }
    .ty-mono__size-use { color: var(--fg-2); font-size: 13px; }
    @media (max-width: 900px) {
      .ty-mono__size { grid-template-columns: 1fr; gap: 6px; }
    }

    /* Use-when two-column yes/no */
    .ty-mono__rules {
      display: grid; grid-template-columns: 1fr 1fr;
      border-top: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .ty-mono__rules { grid-template-columns: 1fr; } }
    .ty-mono__rules > div { padding: var(--s-6); border-right: 1px solid var(--rule); }
    .ty-mono__rules > div:last-child { border-right: 0; }
    @media (max-width: 900px) {
      .ty-mono__rules > div { border-right: 0; border-bottom: 1px solid var(--rule); }
      .ty-mono__rules > div:last-child { border-bottom: 0; }
    }
    .ty-mono__rules-head {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.16em; text-transform: uppercase;
      margin-bottom: 16px;
    }
    .ty-mono__rules-head--yes { color: var(--fg); }
    .ty-mono__rules-head--no  { color: var(--accent); }
    .ty-mono__rules ul { list-style: none; padding: 0; margin: 0; }
    .ty-mono__rules li {
      padding: 10px 0; font-size: 14px; line-height: 1.55; color: var(--fg);
      border-top: 1px solid var(--rule);
    }
    .ty-mono__rules li:first-child { border-top: 0; padding-top: 0; }
    .ty-mono__rules li code {
      font-family: var(--font-mono); font-size: 12px;
      padding: 2px 6px; background: var(--bg-2);
      border-radius: var(--r-2); color: var(--fg);
    }
    .ty-mono__rules--no li { color: var(--fg-2); }

    /* Relationship line */
    .ty-mono__relation {
      padding: var(--s-7) var(--s-6);
      background: var(--bg-2);
      border-top: 1px solid var(--rule);
    }
    .ty-mono__relation-eyebrow {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.16em; text-transform: uppercase; color: var(--fg-2);
    }
    .ty-mono__relation-line {
      margin-top: 16px;
      font-family: var(--font-display); font-weight: 400;
      font-size: 1.75rem; line-height: 1.25; letter-spacing: -0.01em;
      max-width: 36ch;
    }
    .ty-mono__relation-line em {
      font-style: italic; color: var(--accent);
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

      <p class="muted" style="margin-top: 24px; font-size: 14px;">Both families are free and open-source on Google Fonts — the same source we load in this doc.</p>
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

  <!-- MONO SPECIMEN -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">JetBrains Mono — the system talking</h2>
        <p class="section-head__body">The third family. Not display, not UI. This is the voice the system uses when it talks about itself &mdash; token names, hex codes, keyboard hints, code, meta. Small sizes only. Never prose.</p>
      </div>

      <div class="ty-mono">
        <!-- Head: meta left, stage right -->
        <div class="ty-mono__head">
          <div class="ty-mono__meta">
            <span class="ty-mono__role">System &middot; Technical &middot; Meta</span>
            <h3 class="ty-mono__name">JetBrains Mono</h3>
            <p class="ty-mono__lede">A fixed-width sans built for code. We use it anywhere a value is load-bearing &mdash; a token, a hex, a keystroke, a spec &mdash; so the reader knows the string is literal, not prose.</p>
            <div class="ty-mono__specs">
              <div>Category<b>Fixed-width sans</b></div>
              <div>Weights<b>400, 500</b></div>
              <div>Used at<b>10 &ndash; 13 px</b></div>
              <div>Fallback<b>ui-monospace · SF Mono</b></div>
            </div>
          </div>
          <div class="ty-mono__stage">
            <div class="ty-mono__line ty-mono__line--xl"><em>#E4022D</em></div>
            <div class="ty-mono__line ty-mono__line--lg">--space-16</div>
            <div class="ty-mono__line ty-mono__line--md">lucide.createIcons({ root })</div>
            <div class="ty-mono__line ty-mono__line--kbd">Press <kbd>Esc</kbd> <span class="arrow">&rarr;</span> close</div>
            <div class="ty-mono__line ty-mono__line--sm">01 &middot; Color</div>
          </div>
        </div>

        <!-- Weights: 400, 500 -->
        <div class="ty-mono__weights">
          <div class="ty-mono__weight ty-mono__weight--400">
            <span class="ty-mono__weight-label">Regular &middot; 400</span>
            <div class="ty-mono__weight-sample">#E4022D &middot; --s-6 &middot; 32px</div>
            <p class="ty-mono__weight-note">Default. Token names, hex codes, meta cells, code.</p>
          </div>
          <div class="ty-mono__weight ty-mono__weight--500">
            <span class="ty-mono__weight-label">Medium &middot; 500</span>
            <div class="ty-mono__weight-sample">#E4022D &middot; --s-6 &middot; 32px</div>
            <p class="ty-mono__weight-note">Emphasis only &mdash; a single value called out in a table or a caption.</p>
          </div>
        </div>

        <!-- Size scale (small only) -->
        <div class="ty-mono__sizes">
          <div class="ty-mono__size">
            <div>Size</div><div>Sample</div><div>Spec</div><div>Use</div>
          </div>
          <div class="ty-mono__size">
            <div class="ty-mono__size-token">10 px</div>
            <div class="ty-mono__size-sample" style="font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;">01 &middot; Token</div>
            <div class="ty-mono__size-spec">10 px &middot; 0.14em</div>
            <div class="ty-mono__size-use">Tiniest eyebrows, table sub-labels</div>
          </div>
          <div class="ty-mono__size">
            <div class="ty-mono__size-token">11 px</div>
            <div class="ty-mono__size-sample" style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;">Section eyebrow</div>
            <div class="ty-mono__size-spec">11 px &middot; 0.08em</div>
            <div class="ty-mono__size-use">Eyebrows, column heads, captions</div>
          </div>
          <div class="ty-mono__size">
            <div class="ty-mono__size-token">12 px</div>
            <div class="ty-mono__size-sample" style="font-size: 12px;">--space-16 &middot; #E4022D</div>
            <div class="ty-mono__size-spec">12 px &middot; 0 tracking</div>
            <div class="ty-mono__size-use">Token names, hex codes, specs</div>
          </div>
          <div class="ty-mono__size">
            <div class="ty-mono__size-token">13 px</div>
            <div class="ty-mono__size-sample" style="font-size: 13px;">token-row__meta</div>
            <div class="ty-mono__size-spec">13 px &middot; 0 tracking</div>
            <div class="ty-mono__size-use">Token-row meta cells, inline code</div>
          </div>
        </div>

        <!-- Use-when rules -->
        <div class="ty-mono__rules">
          <div>
            <div class="ty-mono__rules-head ty-mono__rules-head--yes">Use Mono for</div>
            <ul>
              <li>Eyebrows and section labels &mdash; <code>01 &middot; Color</code></li>
              <li>Design token names &mdash; <code>--space-16</code>, <code>--fs-body</code></li>
              <li>Hex codes and raw values &mdash; <code>#E4022D</code>, <code>1.04</code></li>
              <li>Keyboard hints &mdash; <code>&lt;kbd&gt;Esc&lt;/kbd&gt;</code></li>
              <li>Code snippets and HTML/CSS/JS examples</li>
              <li>Technical captions and spec lines (<code>32&ndash;48px &middot; 1.15</code>)</li>
              <li>Table meta columns and <code>.token-row__meta</code> cells</li>
            </ul>
          </div>
          <div>
            <div class="ty-mono__rules-head ty-mono__rules-head--no">Never use Mono for</div>
            <ul class="ty-mono__rules--no">
              <li>Body copy or running prose</li>
              <li>Display headlines or page titles</li>
              <li>Buttons, CTAs, or conversational UI labels</li>
              <li>Numerals inside stats (the <em style="font-family:var(--font-display); font-style:italic; color:var(--accent)">14&times;</em> stat uses Newsreader &mdash; keep it)</li>
              <li>Editorial copy, quotes, or emotional language</li>
              <li>Anything the reader should read, not parse</li>
            </ul>
          </div>
        </div>

        <!-- Relationship line -->
        <div class="ty-mono__relation">
          <span class="ty-mono__relation-eyebrow">How the three families sit together</span>
          <p class="ty-mono__relation-line">Newsreader carries the <em>idea</em>. DM Sans carries the argument. JetBrains Mono is the system talking about itself.</p>
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
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Eyebrows &amp; section labels</b></span><span class="token-row__meta">JetBrains Mono 400 · 11px · 0.08em</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Body copy</b></span><span class="token-row__meta">DM Sans 400 · fs-body</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Stats &amp; big numbers</b></span><span class="token-row__meta">Newsreader 400 · red accent</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Tokens, hex, code, kbd, meta</b></span><span class="token-row__meta">JetBrains Mono 400 · 10 – 13px</span></div>
        <div class="token-row" style="padding: 18px 24px;"><span class="token-row__label"><b>Mobile body (below 600px)</b></span><span class="token-row__meta">DM Sans 400 · fs-body (unchanged)</span></div>
      </div>
    </div>
  </section>
  `;
};
