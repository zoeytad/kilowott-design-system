/* ============================================================
   LOGO PAGE
   ============================================================ */

window.renderLogo = function (root) {
  root.innerHTML = `
  <style>
    .lg-hero {
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .lg-hero { grid-template-columns: 1fr; } }
    .lg-hero__text {
      padding: calc(var(--s-9) * var(--density)) var(--s-7) calc(var(--s-8) * var(--density));
      border-right: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .lg-hero__text { border-right: 0; border-bottom: 1px solid var(--rule); } }
    .lg-hero__canvas {
      min-height: 480px;
      background: var(--bg-2);
      display: grid; place-items: center;
      position: relative;
    }
    .lg-hero__canvas::before {
      content: ""; position: absolute; inset: 24px;
      border: 1px dashed var(--rule-strong); opacity: 0.35;
      pointer-events: none;
    }
    .lg-hero__logo {
      width: 70%; max-width: 420px;
      color: var(--fg);
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
              mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
      aspect-ratio: 313/41;
      background: currentColor;
    }

    /* Anatomy */
    .lg-anatomy {
      position: relative;
      padding: var(--s-8) var(--s-7);
      background: var(--bg-2);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
    }
    .lg-anatomy__logo {
      width: 100%; max-width: 520px; margin: 0 auto;
      aspect-ratio: 313/41;
      background: var(--fg);
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
              mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
    }
    .lg-anatomy__notes {
      display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-6);
      margin-top: var(--s-7);
    }
    .lg-anatomy__note {
      padding-top: var(--s-4); border-top: 1px solid var(--rule);
      font-size: var(--fs-sm); color: var(--fg-2); line-height: 1.6;
    }
    .lg-anatomy__note b { color: var(--fg); display: block; font-weight: 500; margin-bottom: 6px; }

    /* Clear space */
    .lg-clear {
      padding: var(--s-8);
      background: var(--bg-2);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      display: grid; place-items: center;
      position: relative;
    }
    .lg-clear__box {
      position: relative; padding: 40px;
      display: grid; place-items: center;
    }
    .lg-clear__box::before {
      content: ""; position: absolute; inset: 0;
      border: 1px dashed var(--accent);
    }
    .lg-clear__logo {
      width: 300px; aspect-ratio: 313/41;
      background: var(--fg);
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
              mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
    }
    .lg-clear__k {
      position: absolute; width: 32px; height: 32px;
      border: 1px solid var(--accent); color: var(--accent);
      display: grid; place-items: center;
      font-family: var(--font-mono); font-size: 12px;
    }
    .lg-clear__k--tl { top: 4px; left: 4px; }
    .lg-clear__k--br { bottom: 4px; right: 4px; }

    /* Sizes */
    .lg-sizes {
      display: grid; grid-template-columns: repeat(3, 1fr);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    @media (max-width: 900px) { .lg-sizes { grid-template-columns: 1fr; } }
    .lg-size {
      padding: var(--s-7) var(--s-5);
      border-right: 1px solid var(--rule);
      display: flex; flex-direction: column; gap: var(--s-5);
      align-items: flex-start;
    }
    .lg-size:last-child { border-right: 0; }
    @media (max-width: 900px) { .lg-size { border-right: 0; border-bottom: 1px solid var(--rule); } }
    .lg-size__logo {
      background: var(--fg);
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
              mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
      aspect-ratio: 313/41;
    }
    .lg-size__logo--lg { width: 280px; }
    .lg-size__logo--md { width: 160px; }
    .lg-size__logo--sm { width: 100px; }
    .lg-size__cap {
      font-size: var(--fs-sm); color: var(--fg-2);
      font-family: var(--font-mono);
    }

    /* Placement variants */
    .lg-variants {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: var(--s-4);
    }
    @media (max-width: 900px) { .lg-variants { grid-template-columns: 1fr 1fr; } }
    .lg-var {
      aspect-ratio: 4/3;
      border-radius: var(--r-3);
      display: grid; place-items: center;
      overflow: hidden;
      position: relative;
    }
    .lg-var__logo {
      width: 65%; aspect-ratio: 313/41;
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
              mask: url(assets/kilowott-logo.svg) no-repeat center/contain;
    }
    .lg-var__cap {
      position: absolute; bottom: 12px; left: 16px;
      font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .lg-var--paper { background: #fff; }
    .lg-var--paper .lg-var__logo { background: #0B0F14; }
    .lg-var--paper .lg-var__cap { color: #5B6573; }

    .lg-var--ink { background: #0B0F14; }
    .lg-var--ink .lg-var__logo { background: #fff; }
    .lg-var--ink .lg-var__cap { color: #8A95A5; }

    .lg-var--red { background: #E4022D; }
    .lg-var--red .lg-var__logo { background: #fff; }
    .lg-var--red .lg-var__cap { color: rgba(255,255,255,0.7); }

    .lg-var--warm { background: #F6F4F0; }
    .lg-var--warm .lg-var__logo { background: #0B0F14; }
    .lg-var--warm .lg-var__cap { color: #5B6573; }

    /* Don'ts */
    .lg-dont .lg-var__logo { background: #0B0F14; }
    .lg-dont--stretch .lg-var__logo {
      width: 75%; transform: scaleY(2.2);
    }
    .lg-dont--rotate .lg-var__logo { transform: rotate(-8deg); }
    .lg-dont--noise {
      background: repeating-linear-gradient(45deg, #fff, #fff 8px, #F6F4F0 8px, #F6F4F0 16px);
    }
    .lg-dont--bg-red { background: #E4022D; }
    .lg-dont--bg-red .lg-var__logo { background: #0B0F14; }
    .lg-dont--shadow .lg-var__logo {
      filter: drop-shadow(4px 6px 0 rgba(0,0,0,0.3));
    }
  </style>

  <!-- HERO -->
  <section class="lg-hero">
    <div class="lg-hero__text">
      <span class="eyebrow eyebrow--accent">01 · Logo</span>
      <h1 class="page-header__title" style="padding:0; border:0; margin-top:16px">The wordmark is the brand.</h1>
      <p class="page-header__lede">Kilowott is carried almost entirely by a single wordmark. That means every placement, every crop, every color is load-bearing. These rules keep it behaving consistently across decks, the site, social posts and partner collateral.</p>
      <div style="display:flex; gap:12px; margin-top: 32px;">
        <a class="btn btn--primary" href="assets/kilowott-logo.svg" download>Download SVG<span class="btn__arrow">→</span></a>
        <a class="btn" href="#color">Color rules</a>
      </div>
    </div>
    <div class="lg-hero__canvas">
      <div class="lg-hero__logo"></div>
    </div>
  </section>

  <!-- ANATOMY -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Anatomy</h2>
        <p class="section-head__body">The Kilowott wordmark is built from geometric letterforms with two intentional deviations. Know them, preserve them.</p>
      </div>
      <div class="lg-anatomy">
        <div class="lg-anatomy__logo"></div>
        <div class="lg-anatomy__notes">
          <div class="lg-anatomy__note">
            <b>Custom &ldquo;K&rdquo; &amp; &ldquo;W&rdquo;</b>
            The opening K and the paired W carry the energy of the mark. Do not re-typeset the logo in a similar sans &mdash; it won&rsquo;t match.
          </div>
          <div class="lg-anatomy__note">
            <b>Dotted i &amp; proportions</b>
            The dotted &ldquo;i&rdquo; and the cap-height ratio are fixed. Always use the supplied vector file &mdash; never redraw.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CLEAR SPACE & SIZES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Clear space &amp; sizing</h2>
        <p class="section-head__body">Give the mark room to breathe. The minimum clear space on all sides equals the height of the capital &ldquo;K&rdquo;. Below 80&nbsp;px wide on screen or 20&nbsp;mm in print, use the monogram (coming in v0.2).</p>
      </div>
      <div class="grid grid-2">
        <div class="lg-clear">
          <div class="lg-clear__box">
            <span class="lg-clear__k lg-clear__k--tl">K</span>
            <span class="lg-clear__k lg-clear__k--br">K</span>
            <div class="lg-clear__logo"></div>
          </div>
        </div>
        <div class="lg-sizes" style="grid-template-columns: 1fr">
          <div class="lg-size">
            <div class="lg-size__logo lg-size__logo--lg"></div>
            <div class="lg-size__cap">Hero &middot; ≥ 240px / 60mm</div>
          </div>
          <div class="lg-size">
            <div class="lg-size__logo lg-size__logo--md"></div>
            <div class="lg-size__cap">Standard &middot; 120–240px</div>
          </div>
          <div class="lg-size">
            <div class="lg-size__logo lg-size__logo--sm"></div>
            <div class="lg-size__cap">Minimum &middot; 80px / 20mm</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PLACEMENTS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Approved placements</h2>
        <p class="section-head__body">Four sanctioned canvases. Anything else &mdash; photo backgrounds, patterned or gradient surfaces, or low-contrast colors &mdash; needs a solid color tint behind the mark.</p>
      </div>
      <div class="lg-variants">
        <div class="lg-var lg-var--paper"><div class="lg-var__logo"></div><span class="lg-var__cap">01 · Paper</span></div>
        <div class="lg-var lg-var--ink"><div class="lg-var__logo"></div><span class="lg-var__cap">02 · Ink</span></div>
        <div class="lg-var lg-var--red"><div class="lg-var__logo"></div><span class="lg-var__cap">03 · Red (rare)</span></div>
        <div class="lg-var lg-var--warm"><div class="lg-var__logo"></div><span class="lg-var__cap">04 · Warm paper</span></div>
      </div>
    </div>
  </section>

  <!-- DO / DON'T -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Don&rsquo;ts</h2>
        <p class="section-head__body">The most common violations we&rsquo;ve seen across decks and social templates. If you catch one, fix it.</p>
      </div>
      <div class="grid grid-4">
        <div class="lg-var lg-dont lg-dont--stretch"><div class="lg-var__logo"></div><span class="lg-var__cap accent-text">✕ Stretch</span></div>
        <div class="lg-var lg-dont lg-dont--rotate"><div class="lg-var__logo"></div><span class="lg-var__cap accent-text">✕ Rotate</span></div>
        <div class="lg-var lg-dont lg-dont--noise"><div class="lg-var__logo"></div><span class="lg-var__cap accent-text">✕ Busy bg</span></div>
        <div class="lg-var lg-dont lg-dont--shadow"><div class="lg-var__logo"></div><span class="lg-var__cap accent-text">✕ Drop shadow</span></div>
      </div>
    </div>
  </section>
  `;
};
