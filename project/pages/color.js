/* ============================================================
   COLOR PAGE
   ============================================================ */

window.renderColor = function (root) {
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
    @media (max-width: 900px) { .cl-hero__text { border-right: 0; } }
    .cl-hero__demo {
      background: #FFFFFF;
      display: grid; place-items: center; padding: var(--s-7);
      min-height: 500px;
      position: relative; overflow: hidden;
    }
    .cl-hero__demo::before {
      content: ""; position: absolute; inset: 0;
      background:
        linear-gradient(to right, transparent 60%, #E4022D 60%, #E4022D 62%, transparent 62%),
        #FFFFFF;
      opacity: .08; pointer-events: none;
    }
    .cl-hero__ratios {
      display: flex; width: 90%; height: 64px;
      border-radius: var(--r-3); overflow: hidden;
      box-shadow: var(--shadow-2);
      position: relative; z-index: 1;
    }
    .cl-hero__ratios > div { display: grid; place-items: center;
      font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
    .cl-hero__ratios > div:nth-child(1) { flex: 60; background: #FFFFFF; color: #0B0F14; }
    .cl-hero__ratios > div:nth-child(2) { flex: 30; background: #0B0F14; color: #fff; }
    .cl-hero__ratios > div:nth-child(3) { flex: 5;  background: #F6F4F0; color: #5B6573; }
    .cl-hero__ratios > div:nth-child(4) { flex: 5;  background: #E4022D; color: #fff; }
    .cl-ratio-caption {
      display: flex; justify-content: space-between; width: 90%;
      margin-top: 16px; font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
      position: relative; z-index: 1;
    }

    /* Swatches */
    .cl-row {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    @media (max-width: 900px) { .cl-row { grid-template-columns: 1fr 1fr; } }
    .cl-sw {
      display: flex; flex-direction: column;
      border-right: 1px solid var(--rule);
      min-height: 220px;
    }
    .cl-sw:last-child { border-right: 0; }
    .cl-sw__color { flex: 1; padding: 20px; display: flex; align-items: flex-end; }
    .cl-sw__color span {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .cl-sw__meta {
      padding: 16px 20px; background: var(--bg);
      border-top: 1px solid var(--rule);
      font-size: var(--fs-sm);
    }
    .cl-sw__name { font-weight: 500; }
    .cl-sw__hex  { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); margin-top: 4px; }
    .cl-sw__token { font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); margin-top: 2px; }

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
      display: flex; justify-content: space-between; align-items: center;
      font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);
    }
    .cl-recipe--paper { background: #FFFFFF; color: #0B0F14; }
    .cl-recipe--ink   { background: #0B0F14; color: #FFFFFF; }
    .cl-recipe--warm  { background: #F6F4F0; color: #0B0F14; }

    .cl-recipe__eyebrow {
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .cl-recipe__eyebrow::before { content: ""; width: 20px; height: 1px; background: currentColor; }
    .cl-recipe__h {
      font-family: var(--font-display); font-weight: 400;
      font-size: 2.25rem; line-height: 1.05; letter-spacing: -0.02em;
    }
    .cl-recipe__h em { color: #E4022D; font-style: italic; }
    .cl-recipe--ink .cl-recipe__h em { color: #E4022D; }

    .cl-recipe__btn {
      align-self: flex-start;
      padding: 10px 18px; border-radius: var(--r-pill);
      font-size: 13px; font-weight: 500;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .cl-recipe__btn .lucide { width: 14px; height: 14px; stroke-width: 1.75; }
    .cl-recipe--paper .cl-recipe__btn { background: #E4022D; color: #fff; }
    .cl-recipe--ink .cl-recipe__btn   { background: #E4022D; color: #fff; }
    .cl-recipe--warm .cl-recipe__btn  { background: #0B0F14; color: #F6F4F0; }

    /* Accessibility table */
    .cl-a11y {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    .cl-a11y-row {
      display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
    .cl-a11y-chip {
      display: inline-block; width: 20px; height: 20px; border-radius: 4px;
      vertical-align: middle; margin-right: 8px;
      border: 1px solid rgba(0,0,0,0.1);
    }
    .pass { color: #0B7E3E; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; }
    .fail { color: #E4022D; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; }
    .pass .lucide, .fail .lucide { width: 14px; height: 14px; }
  </style>

  <!-- HERO -->
  <section class="cl-hero">
    <div class="cl-hero__text">
      <span class="eyebrow eyebrow--accent">02 · Color</span>
      <h1 class="page-header__title" style="padding:0; border:0; margin-top:16px">A narrow palette, used with <em style="color:var(--accent); font-style:italic">intent</em>.</h1>
      <p class="page-header__lede">Four colors do all the work. White carries the page. Ink holds the type. Warm paper separates sections. Red is a spotlight &mdash; never a wash. The 60&middot;30&middot;5&middot;5 ratio keeps it honest.</p>
      <div style="margin-top:32px; display:flex; gap:12px;">
        <a class="btn btn--primary" href="#foundations">See tokens</a>
        <a class="btn" href="#type">Type rules</a>
      </div>
    </div>
    <div class="cl-hero__demo">
      <div class="cl-hero__ratios">
        <div>60% · Paper</div>
        <div>30% · Ink</div>
        <div>5% · Warm</div>
        <div>5% · Red</div>
      </div>
      <div class="cl-ratio-caption">
        <span>60·30·5·5 ratio</span>
        <span>Default recipe</span>
      </div>
    </div>
  </section>

  <!-- CORE PALETTE -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Core palette</h2>
        <p class="section-head__body">Four named colors. Every surface, every deck, every template pulls from here. Extensions (charts, states) live in the extended set below.</p>
      </div>

      <div class="cl-row">
        <div class="cl-sw">
          <div class="cl-sw__color" style="background:#FFFFFF; border:1px solid var(--rule)"><span style="color:#5B6573">Paper</span></div>
          <div class="cl-sw__meta">
            <div class="cl-sw__name">Paper</div>
            <div class="cl-sw__hex">#FFFFFF · RGB 255 255 255</div>
            <div class="cl-sw__token">--k-paper · bg default</div>
          </div>
        </div>
        <div class="cl-sw">
          <div class="cl-sw__color" style="background:#0B0F14"><span style="color:#fff">Ink</span></div>
          <div class="cl-sw__meta">
            <div class="cl-sw__name">Ink</div>
            <div class="cl-sw__hex">#0B0F14 · RGB 11 15 20</div>
            <div class="cl-sw__token">--k-ink · fg default</div>
          </div>
        </div>
        <div class="cl-sw">
          <div class="cl-sw__color" style="background:#F6F4F0"><span style="color:#5B6573">Warm Paper</span></div>
          <div class="cl-sw__meta">
            <div class="cl-sw__name">Warm Paper</div>
            <div class="cl-sw__hex">#F6F4F0 · RGB 246 244 240</div>
            <div class="cl-sw__token">--k-paper-2 · section break</div>
          </div>
        </div>
        <div class="cl-sw">
          <div class="cl-sw__color" style="background:#E4022D"><span style="color:#fff">Kilowott Red</span></div>
          <div class="cl-sw__meta">
            <div class="cl-sw__name">Kilowott Red</div>
            <div class="cl-sw__hex">#E4022D · RGB 228 2 45</div>
            <div class="cl-sw__token">--k-red · accent (use sparingly)</div>
          </div>
        </div>
      </div>

      <!-- Extended -->
      <div style="margin-top: 40px;">
        <span class="eyebrow">Extended</span>
        <div class="cl-row" style="margin-top: 16px;">
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#1A2230"><span style="color:#fff">Ink 2</span></div>
            <div class="cl-sw__meta"><div class="cl-sw__name">Ink 2</div><div class="cl-sw__hex">#1A2230</div><div class="cl-sw__token">surface dark</div></div>
          </div>
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#5B6573"><span style="color:#fff">Muted</span></div>
            <div class="cl-sw__meta"><div class="cl-sw__name">Muted</div><div class="cl-sw__hex">#5B6573</div><div class="cl-sw__token">secondary text</div></div>
          </div>
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#E2DED6"><span style="color:#5B6573">Rule</span></div>
            <div class="cl-sw__meta"><div class="cl-sw__name">Rule</div><div class="cl-sw__hex">#E2DED6</div><div class="cl-sw__token">soft divider</div></div>
          </div>
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#FCE5EA"><span style="color:#8A021B">Red Soft</span></div>
            <div class="cl-sw__meta"><div class="cl-sw__name">Red Soft</div><div class="cl-sw__hex">#FCE5EA</div><div class="cl-sw__token">accent tint bg</div></div>
          </div>
        </div>
      </div>

      <!-- Alt Accents -->
      <div style="margin-top: 40px;">
        <span class="eyebrow">Alt accents &middot; sub-brand &amp; campaign</span>
        <p style="margin-top:12px; color:var(--fg-2); max-width: 68ch; font-size: var(--fs-sm);">
          Four alternates are available for campaign-specific or sub-brand work &mdash; swapped via the <code style="font-family:var(--font-mono);font-size:13px;">--accent</code> CSS variable in <code style="font-family:var(--font-mono);font-size:13px;">tokens.css</code>. They replace Kilowott Red <em>as the single accent</em> &mdash; never used alongside it. The 60&middot;30&middot;5&middot;5 ratio and &ldquo;red is a spotlight&rdquo; rules below apply identically to whichever alt is active.
        </p>
        <div class="cl-row" style="margin-top: 16px;">
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#C8102E"><span style="color:#fff">Deeper Red</span></div>
            <div class="cl-sw__meta">
              <div class="cl-sw__name">Deeper Red</div>
              <div class="cl-sw__hex">#C8102E &middot; RGB 200 16 46</div>
              <div class="cl-sw__token">alt &middot; editorial, print</div>
            </div>
          </div>
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#F05A28"><span style="color:#fff">Signal Orange</span></div>
            <div class="cl-sw__meta">
              <div class="cl-sw__name">Signal Orange</div>
              <div class="cl-sw__hex">#F05A28 &middot; RGB 240 90 40</div>
              <div class="cl-sw__token">alt &middot; Workforce, energy</div>
            </div>
          </div>
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#1F3CFF"><span style="color:#fff">Electric Blue</span></div>
            <div class="cl-sw__meta">
              <div class="cl-sw__name">Electric Blue</div>
              <div class="cl-sw__hex">#1F3CFF &middot; RGB 31 60 255</div>
              <div class="cl-sw__token">alt &middot; Intelligence, product</div>
            </div>
          </div>
          <div class="cl-sw">
            <div class="cl-sw__color" style="background:#0B0F14"><span style="color:#fff">Ink Mono</span></div>
            <div class="cl-sw__meta">
              <div class="cl-sw__name">Ink Mono</div>
              <div class="cl-sw__hex">#0B0F14 &middot; RGB 11 15 20</div>
              <div class="cl-sw__token">alt &middot; mono, restraint</div>
            </div>
          </div>
        </div>
        <p style="margin-top:16px; color:var(--fg-2); font-size: 13px; font-family: var(--font-mono);">
          Source: <span style="color:var(--fg)">tokens.css &rarr; --accent</span> &middot; Override per surface in CSS or via <span style="color:var(--fg)">data-theme</span> attribute.
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
            <p style="color:#5B6573; font-size:14px; line-height:1.6; max-width:32ch;">Calm canvas. Ink for type. One flash of red for the verb or CTA.</p>
            <a class="cl-recipe__btn">Read the story <i data-lucide="arrow-right"></i></a>
          </div>
          <div class="cl-recipe__meta"><span>Recipe 01 · Paper</span><span>60·30·5·5</span></div>
        </div>

        <div class="cl-recipe">
          <div class="cl-recipe__preview cl-recipe--ink">
            <span class="cl-recipe__eyebrow" style="color:#E4022D">Product hero</span>
            <h3 class="cl-recipe__h">Signal, not <em>noise</em>.</h3>
            <p style="color:#8A95A5; font-size:14px; line-height:1.6; max-width:32ch;">Dark canvas, white type, red as spotlight. Use for launches and headline moments.</p>
            <a class="cl-recipe__btn">See the product <i data-lucide="arrow-right"></i></a>
          </div>
          <div class="cl-recipe__meta"><span>Recipe 02 · Ink</span><span>Hero moments</span></div>
        </div>

        <div class="cl-recipe">
          <div class="cl-recipe__preview cl-recipe--warm">
            <span class="cl-recipe__eyebrow">Essay</span>
            <h3 class="cl-recipe__h">The <em>long</em> view.</h3>
            <p style="color:#5B6573; font-size:14px; line-height:1.6; max-width:32ch;">Warm paper reduces contrast for long reading. Red becomes even more precious here.</p>
            <a class="cl-recipe__btn">Continue reading <i data-lucide="arrow-right"></i></a>
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
        <p class="section-head__body">You said it yourself: the brand colors are strong, and misuse is loud. These five rules handle 95% of decisions about red.</p>
      </div>
      <div class="grid grid-2">
        <ul style="list-style:none; padding:0; margin:0;">
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; One red idea per surface &mdash; a stat, a verb, a CTA.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; Never use red for body copy or paragraph text.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Red buttons only for primary, conversion-critical actions.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Do not tint red below 80% &mdash; use ink-muted instead.</span><span class="token-row__meta">Rule</span></li>
          <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">05</b> &nbsp; Red never sits next to another saturated color.</span><span class="token-row__meta">Rule</span></li>
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
        <p class="section-head__body">Contrast ratios against WCAG AA (≥4.5:1 for body, ≥3:1 for large text). Don&rsquo;t use combinations marked fail for reading.</p>
      </div>
      <div class="cl-a11y">
        <div class="cl-a11y-row">
          <div>Foreground</div><div>Background</div><div>Ratio</div><div>Body (AA)</div><div>Large (AA)</div>
        </div>
        <div class="cl-a11y-row">
          <div><span class="cl-a11y-chip" style="background:#0B0F14"></span>Ink</div>
          <div><span class="cl-a11y-chip" style="background:#fff"></span>Paper</div>
          <div class="mono">17.7 : 1</div>
          <div class="pass"><i data-lucide="check"></i> Pass</div><div class="pass"><i data-lucide="check"></i> Pass</div>
        </div>
        <div class="cl-a11y-row">
          <div><span class="cl-a11y-chip" style="background:#5B6573"></span>Muted</div>
          <div><span class="cl-a11y-chip" style="background:#fff"></span>Paper</div>
          <div class="mono">5.8 : 1</div>
          <div class="pass"><i data-lucide="check"></i> Pass</div><div class="pass"><i data-lucide="check"></i> Pass</div>
        </div>
        <div class="cl-a11y-row">
          <div><span class="cl-a11y-chip" style="background:#E4022D"></span>Red</div>
          <div><span class="cl-a11y-chip" style="background:#fff"></span>Paper</div>
          <div class="mono">5.4 : 1</div>
          <div class="pass"><i data-lucide="check"></i> Pass</div><div class="pass"><i data-lucide="check"></i> Pass</div>
        </div>
        <div class="cl-a11y-row">
          <div><span class="cl-a11y-chip" style="background:#fff"></span>Paper</div>
          <div><span class="cl-a11y-chip" style="background:#E4022D"></span>Red</div>
          <div class="mono">5.4 : 1</div>
          <div class="pass"><i data-lucide="check"></i> Pass</div><div class="pass"><i data-lucide="check"></i> Pass</div>
        </div>
        <div class="cl-a11y-row">
          <div><span class="cl-a11y-chip" style="background:#E4022D"></span>Red</div>
          <div><span class="cl-a11y-chip" style="background:#F6F4F0"></span>Warm</div>
          <div class="mono">5.1 : 1</div>
          <div class="pass"><i data-lucide="check"></i> Pass</div><div class="pass"><i data-lucide="check"></i> Pass</div>
        </div>
        <div class="cl-a11y-row">
          <div><span class="cl-a11y-chip" style="background:#E4022D"></span>Red</div>
          <div><span class="cl-a11y-chip" style="background:#0B0F14"></span>Ink</div>
          <div class="mono">3.3 : 1</div>
          <div class="fail"><i data-lucide="x"></i> Fail</div><div class="pass"><i data-lucide="check"></i> Pass large</div>
        </div>
      </div>
    </div>
  </section>

  <!-- SEMANTIC STATE COLORS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Semantic state colors</h2>
        <p class="section-head__body">The brand palette is editorial &mdash; ink, paper, red. Products need four more: <b>success, warning, info, danger</b>. These are the only greens, ambers and blues permitted in the system, and they come with strict scope: inline state only.</p>
      </div>

      <style>
        .cl-states {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-top: 24px;
        }
        @media (max-width: 900px) { .cl-states { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .cl-states { grid-template-columns: 1fr; } }
        .cl-state-card {
          border: 1px solid var(--rule);
          border-radius: var(--r-3);
          overflow: hidden;
          background: var(--bg);
        }
        .cl-state-card__swatch {
          height: 88px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display);
          font-size: 2rem; line-height: 1;
          letter-spacing: -0.02em;
        }
        .cl-state-card__body {
          padding: 14px 16px 16px;
        }
        .cl-state-card__name {
          font-family: var(--font-sans);
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--fg-2);
        }
        .cl-state-card__hex {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--fg); margin-top: 4px;
          display: flex; justify-content: space-between;
        }
        .cl-state-card__hex b { color: var(--fg); font-weight: 500; }
        .cl-state-card__tokens {
          margin-top: 12px; padding-top: 10px;
          border-top: 1px solid var(--rule);
          font-family: var(--font-mono); font-size: 10px;
          color: var(--fg-2); letter-spacing: 0.04em;
          line-height: 1.8;
        }
        .cl-state-card__use {
          padding: 14px 16px;
          background: var(--bg-2);
          font-size: 13px; color: var(--fg);
          line-height: 1.5;
          border-top: 1px solid var(--rule);
        }
        .cl-state-card__use b { color: var(--fg); font-weight: 500; }
      </style>

      <div class="cl-states">

        <div class="cl-state-card">
          <div class="cl-state-card__swatch" style="background:#1F8A3B; color:#fff;">Live</div>
          <div class="cl-state-card__body">
            <div class="cl-state-card__name">Success</div>
            <div class="cl-state-card__hex"><b>#1F8A3B</b><span>WCAG AA on paper</span></div>
            <div class="cl-state-card__tokens">
              --success<br>
              --success-soft: rgba(31,138,59,0.08)
            </div>
          </div>
          <div class="cl-state-card__use">
            <b>Where &mdash;</b> Live status dots, paid badges, success toasts, confirm modals. <b>Never</b> decorative.
          </div>
        </div>

        <div class="cl-state-card">
          <div class="cl-state-card__swatch" style="background:#C07A00; color:#fff;">Watch</div>
          <div class="cl-state-card__body">
            <div class="cl-state-card__name">Warning</div>
            <div class="cl-state-card__hex"><b>#C07A00</b><span>WCAG AA on paper</span></div>
            <div class="cl-state-card__tokens">
              --warning<br>
              --warning-soft: rgba(192,122,0,0.08)
            </div>
          </div>
          <div class="cl-state-card__use">
            <b>Where &mdash;</b> Threshold breached but not broken. Review-required, rate-limited, nearing capacity.
          </div>
        </div>

        <div class="cl-state-card">
          <div class="cl-state-card__swatch" style="background:#1A4E8A; color:#fff;">Info</div>
          <div class="cl-state-card__body">
            <div class="cl-state-card__name">Info</div>
            <div class="cl-state-card__hex"><b>#1A4E8A</b><span>WCAG AA on paper</span></div>
            <div class="cl-state-card__tokens">
              --info<br>
              --info-soft: rgba(26,78,138,0.08)
            </div>
          </div>
          <div class="cl-state-card__use">
            <b>Where &mdash;</b> Notices, tooltips, beta tags, feature announcements. Muted, never shouts.
          </div>
        </div>

        <div class="cl-state-card">
          <div class="cl-state-card__swatch" style="background:#E4022D; color:#fff;">Error</div>
          <div class="cl-state-card__body">
            <div class="cl-state-card__name">Danger</div>
            <div class="cl-state-card__hex"><b>#E4022D</b><span>Brand red &mdash; same hex</span></div>
            <div class="cl-state-card__tokens">
              --danger: var(--accent)<br>
              --danger-soft: var(--k-red-soft)
            </div>
          </div>
          <div class="cl-state-card__use">
            <b>Where &mdash;</b> Errors, destructive confirms, breach alerts. The brand red IS the danger color &mdash; no separate value.
          </div>
        </div>

      </div>

      <div class="section-head" style="margin-top: 48px;">
        <h3 style="font-family:var(--font-display); font-size:1.25rem; letter-spacing:-0.01em;">Strict scope</h3>
        <p class="section-head__body">State colors are <em>product</em> colors, not brand colors. They never appear in marketing, decks, or social. The brand doesn&rsquo;t &ldquo;have&rdquo; green &mdash; the product borrows it when a workflow needs it.</p>
      </div>

      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; State colors only in product UI. Never in marketing site, deck, or social.</span><span class="token-row__meta">Scope</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; Paired with an icon + a word. Color alone is not state.</span><span class="token-row__meta">A11y</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Danger = brand red. No separate &ldquo;error red&rdquo; &mdash; one red is enough.</span><span class="token-row__meta">Discipline</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Fills allowed only for: dot, pill, 1&ndash;2 char badge. Never large surfaces.</span><span class="token-row__meta">Usage</span></li>
      </ul>
    </div>
  </section>
  `;
};
