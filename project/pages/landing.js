/* ============================================================
   LANDING PAGES — hero patterns + marketing sections
   ============================================================ */

window.renderLanding = function (root) {
  root.innerHTML = `
  <style>
    /* -- scoped to the landing page -- */

    .lp-hero {
      padding: var(--s-9) 0 var(--s-7);
      border-bottom: 1px solid var(--rule);
    }
    .lp-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .lp-hero h1 em { font-style: italic; color: var(--accent); }
    .lp-hero__lede {
      margin-top: 22px; max-width: 60ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    /* Index nav grid */
    .lp-index {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      margin-top: 32px;
    }
    @media (max-width: 800px) { .lp-index { grid-template-columns: 1fr 1fr; } }
    .lp-index a {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 20px;
      border: 1px solid var(--rule);
      text-decoration: none; color: var(--fg);
      font-size: 14px; font-weight: 500;
      transition: background .15s, border-color .15s;
    }
    .lp-index a:hover { background: var(--bg-2); border-color: var(--rule-strong); }
    .lp-index a::after { content: "↓"; color: var(--fg-2); font-weight: 400; }
    .lp-index__num {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em;
      margin-right: 12px;
    }

    /* Specimen frame — wraps each hero/section pattern */
    .lp-spec {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
      margin-bottom: var(--s-6);
    }
    .lp-spec__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .lp-spec__stage {
      padding: var(--s-8) var(--s-7);
      background: var(--bg);
      position: relative;
    }
    .lp-spec__stage--flush { padding: 0; }
    .lp-spec__stage--ink { background: var(--k-ink); color: #F7F5EF; }
    .lp-spec__stage--warm { background: var(--bg-2); }
    .lp-spec__foot {
      padding: 14px 20px;
      border-top: 1px solid var(--rule);
      font-size: var(--fs-sm); color: var(--fg-2);
      line-height: 1.6;
    }
    .lp-spec__foot b { color: var(--fg); font-weight: 500; }

    /* Inline CTA button set (re-uses token semantics) */
    .lp-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 24px;
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 15px; font-weight: 500;
      letter-spacing: 0.01em;
      border: 1px solid transparent;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      transition: all .18s ease;
    }
    .lp-btn__arrow { transition: transform .18s ease; display: inline-flex; align-items: center; }
    .lp-btn__arrow .lucide { width: 16px; height: 16px; stroke-width: 1.75; }
    .lp-btn:hover .lp-btn__arrow { transform: translateX(3px); }
    .lp-btn--primary { background: var(--k-ink); color: #fff; border-color: var(--k-ink); }
    .lp-btn--primary:hover { background: var(--accent); border-color: var(--accent); }
    .lp-btn--accent { background: var(--accent); color: #fff; border-color: var(--accent); }
    .lp-btn--accent:hover { background: #B40224; border-color: #B40224; }
    .lp-btn--ghost {
      background: transparent; color: var(--k-ink); border-color: transparent;
      padding: 14px 6px;
    }
    .lp-btn--ghost:hover { color: var(--accent); }
    /* On-ink variants */
    .lp-spec__stage--ink .lp-btn--primary,
    .lp-hero--ink .lp-btn--primary { background: #F7F5EF; color: var(--k-ink); border-color: #F7F5EF; }
    .lp-spec__stage--ink .lp-btn--primary:hover,
    .lp-hero--ink .lp-btn--primary:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
    .lp-spec__stage--ink .lp-btn--ghost,
    .lp-hero--ink .lp-btn--ghost { color: #F7F5EF; }
    .lp-spec__stage--ink .lp-btn--ghost:hover,
    .lp-hero--ink .lp-btn--ghost:hover { color: var(--accent); }

    .lp-ctas { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-top: 28px; }

    /* Editorial hero (pattern 1) */
    .lp-h1__display {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(3.5rem, 8vw, 6.25rem);
      line-height: 1.02; letter-spacing: -0.025em;
      max-width: 18ch;
      margin: 14px 0 0;
    }
    .lp-h1__display em { font-style: italic; color: var(--accent); }
    .lp-h1__lede {
      margin-top: 22px; max-width: 58ch;
      font-size: 1.1rem; line-height: 1.6; color: var(--fg-2);
    }
    .lp-h1__kicker {
      margin-top: 28px; padding-top: 20px;
      border-top: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 12px;
      letter-spacing: 0.08em; color: var(--fg-2);
      max-width: 48ch;
    }
    .lp-h1__kicker b { color: var(--fg); font-weight: 500; }

    /* Stat-led hero (pattern 2) */
    .lp-h2 { display: grid; grid-template-columns: 2fr 3fr; gap: var(--s-8); align-items: start; }
    @media (max-width: 900px) { .lp-h2 { grid-template-columns: 1fr; gap: var(--s-6); } }
    .lp-h2__stat {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(6rem, 14vw, 11rem);
      line-height: 0.9; letter-spacing: -0.04em;
      color: var(--fg);
      font-variant-numeric: tabular-nums;
    }
    .lp-h2__stat em { font-style: italic; color: var(--accent); }
    .lp-h2__statlabel {
      font-family: var(--font-mono); font-size: 12px;
      letter-spacing: 0.08em; color: var(--fg-2);
      text-transform: uppercase; margin-top: 8px;
    }
    .lp-h2__head {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(2.25rem, 4.4vw, 3.5rem);
      line-height: 1.06; letter-spacing: -0.02em;
      max-width: 20ch;
    }
    .lp-h2__head em { font-style: italic; color: var(--accent); }
    .lp-h2__lede { margin-top: 18px; max-width: 52ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }

    /* Image-right hero (pattern 3) */
    .lp-h3 { display: grid; grid-template-columns: 55fr 45fr; gap: 0; min-height: 520px; }
    @media (max-width: 900px) { .lp-h3 { grid-template-columns: 1fr; } }
    .lp-h3__text {
      padding: var(--s-8) var(--s-7);
      display: flex; flex-direction: column; justify-content: center;
    }
    .lp-h3__head {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(2.5rem, 4.8vw, 4rem);
      line-height: 1.04; letter-spacing: -0.02em;
      max-width: 16ch;
      margin-top: 14px;
    }
    .lp-h3__head em { font-style: italic; color: var(--accent); }
    .lp-h3__lede { margin-top: 18px; max-width: 44ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }
    .lp-h3__media {
      position: relative; background: var(--bg-2);
      min-height: 380px;
    }
    .lp-h3__media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }

    /* Full-bleed atmospheric (pattern 4) */
    .lp-h4 { position: relative; min-height: 560px; overflow: hidden; color: #F7F5EF; }
    .lp-h4__photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; z-index: 0; }
    .lp-h4__scrim {
      position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(180deg, rgba(11,15,20,0.4) 0%, rgba(11,15,20,0.65) 55%, rgba(11,15,20,0.85) 100%);
    }
    .lp-h4__content {
      position: relative; z-index: 2;
      padding: var(--s-9) var(--s-7);
      min-height: 560px;
      display: flex; flex-direction: column; justify-content: flex-end;
    }
    .lp-h4__head {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(3rem, 6vw, 5rem);
      line-height: 1.04; letter-spacing: -0.02em;
      max-width: 18ch;
      margin-top: 14px;
      color: #F7F5EF;
    }
    .lp-h4__head em { font-style: italic; color: var(--accent); }
    .lp-h4__lede { margin-top: 18px; max-width: 52ch; color: rgba(247,245,239,0.78); font-size: 1.0625rem; line-height: 1.6; }

    /* Proof hero (pattern 5) */
    .lp-h5__logos {
      margin-top: var(--s-7);
      padding-top: var(--s-6);
      border-top: 1px solid var(--rule);
    }
    .lp-h5__logorow {
      display: grid; grid-template-columns: repeat(6, 1fr);
      gap: var(--s-5); margin-top: var(--s-5);
      align-items: center;
    }
    @media (max-width: 900px) { .lp-h5__logorow { grid-template-columns: repeat(3, 1fr); } }
    .lp-h5__logo {
      font-family: var(--font-display);
      font-style: italic; font-weight: 400;
      font-size: 1.375rem; line-height: 1;
      color: var(--fg-2);
      letter-spacing: -0.01em;
      padding: 14px 0;
      text-align: center;
      opacity: 0.78;
      border-left: 1px solid var(--rule);
    }
    .lp-h5__logo:first-child { border-left: 0; }
    @media (max-width: 900px) {
      .lp-h5__logo { border-left: 0; border-top: 1px solid var(--rule); padding: 18px 0; }
      .lp-h5__logo:first-child, .lp-h5__logo:nth-child(2), .lp-h5__logo:nth-child(3) { border-top: 0; }
    }

    /* Video-poster hero (pattern 6) */
    .lp-h6 { position: relative; min-height: 560px; overflow: hidden; color: #F7F5EF; background: var(--k-ink); }
    .lp-h6__photo {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; display: block; opacity: 0.45;
    }
    .lp-h6__scrim {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(11,15,20,0.55) 0%, rgba(11,15,20,0.85) 100%);
    }
    .lp-h6__content {
      position: relative; z-index: 2;
      padding: var(--s-9) var(--s-7);
      min-height: 560px;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      text-align: center;
    }
    .lp-h6__play {
      width: 88px; height: 88px;
      border-radius: 50%;
      border: 1.5px solid rgba(247,245,239,0.85);
      display: grid; place-items: center;
      margin-bottom: 28px;
      transition: transform .2s ease, background .2s ease;
      background: rgba(11,15,20,0.2);
    }
    .lp-h6__play::before {
      content: "";
      width: 0; height: 0;
      border-left: 22px solid #F7F5EF;
      border-top: 14px solid transparent;
      border-bottom: 14px solid transparent;
      margin-left: 6px;
    }
    .lp-h6__play:hover { background: var(--accent); border-color: var(--accent); transform: scale(1.04); }
    .lp-h6__head {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(2.5rem, 5vw, 4.25rem);
      line-height: 1.04; letter-spacing: -0.02em;
      max-width: 20ch;
      color: #F7F5EF;
    }
    .lp-h6__head em { font-style: italic; color: var(--accent); }
    .lp-h6__meta {
      margin-top: 18px;
      font-family: var(--font-mono);
      font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(247,245,239,0.7);
    }
    .lp-h6__meta::before { content: "●"; color: var(--accent); margin-right: 10px; }

    /* Three-up value prop (section 7) */
    .lp-s7 {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border-top: 1px solid var(--rule);
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .lp-s7 { grid-template-columns: 1fr; } }
    .lp-s7__col {
      padding: var(--s-7) var(--s-6);
      border-left: 1px solid var(--rule);
      display: flex; flex-direction: column; gap: 14px;
    }
    .lp-s7__col:first-child { border-left: 0; }
    @media (max-width: 900px) {
      .lp-s7__col { border-left: 0; border-top: 1px solid var(--rule); }
      .lp-s7__col:first-child { border-top: 0; }
    }
    .lp-s7__num {
      font-family: var(--font-mono);
      font-size: 12px; letter-spacing: 0.12em;
      color: var(--accent);
    }
    .lp-s7__title {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 1.75rem; line-height: 1.15;
      letter-spacing: -0.01em;
      max-width: 14ch;
    }
    .lp-s7__title em { font-style: italic; color: var(--accent); }
    .lp-s7__body { color: var(--fg-2); font-size: 15px; line-height: 1.6; max-width: 40ch; }
    .lp-s7__more {
      margin-top: auto;
      font-family: var(--font-sans);
      font-size: 14px; font-weight: 500;
      color: var(--fg);
      text-decoration: none;
      display: inline-flex; gap: 8px; align-items: center;
      padding-top: 8px;
    }
    .lp-s7__more:hover { color: var(--accent); }
    .lp-s7__more .lucide { width: 14px; height: 14px; stroke-width: 1.75; }

    /* Feature split (section 8) */
    .lp-s8 {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0;
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      margin-bottom: var(--s-6);
    }
    @media (max-width: 900px) { .lp-s8 { grid-template-columns: 1fr; } }
    .lp-s8--flip .lp-s8__text  { order: 2; }
    .lp-s8--flip .lp-s8__media { order: 1; }
    @media (max-width: 900px) {
      .lp-s8--flip .lp-s8__text  { order: 1; }
      .lp-s8--flip .lp-s8__media { order: 2; }
    }
    .lp-s8__text {
      padding: var(--s-7) var(--s-7);
      display: flex; flex-direction: column; justify-content: center;
      border-right: 1px solid var(--rule);
    }
    .lp-s8--flip .lp-s8__text { border-right: 0; border-left: 1px solid var(--rule); }
    @media (max-width: 900px) {
      .lp-s8__text, .lp-s8--flip .lp-s8__text { border: 0; border-bottom: 1px solid var(--rule); }
    }
    .lp-s8__title {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 2.125rem; line-height: 1.1;
      letter-spacing: -0.02em;
      margin-top: 12px;
      max-width: 16ch;
    }
    .lp-s8__title em { font-style: italic; color: var(--accent); }
    .lp-s8__bullets { list-style: none; padding: 0; margin: 22px 0 0; display: grid; gap: 12px; }
    .lp-s8__bullets li {
      position: relative; padding-left: 26px;
      font-size: 15px; line-height: 1.55; color: var(--fg);
    }
    .lp-s8__bullets li::before {
      content: ""; position: absolute;
      left: 0; top: 9px;
      width: 14px; height: 1px;
      background: var(--accent);
    }
    .lp-s8__bullets b { color: var(--fg); font-weight: 500; }
    .lp-s8__cta { margin-top: 28px; }
    .lp-s8__media {
      background: var(--bg-2);
      padding: var(--s-7) var(--s-7);
      display: flex; align-items: center; justify-content: center;
      min-height: 360px;
    }
    /* UI mock card used inside feature-split media */
    .lp-mock {
      width: 100%; max-width: 420px;
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      box-shadow: var(--shadow-2);
    }
    .lp-mock__head {
      padding: 12px 16px;
      border-bottom: 1px solid var(--rule);
      display: flex; align-items: center; justify-content: space-between;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .lp-mock__dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent); display: inline-block; margin-right: 6px;
      vertical-align: middle;
    }
    .lp-mock__body { padding: 20px; display: grid; gap: 14px; }
    .lp-mock__kpi {
      display: flex; justify-content: space-between; align-items: baseline;
      padding-bottom: 12px; border-bottom: 1px solid var(--rule);
    }
    .lp-mock__kpi:last-child { border-bottom: 0; padding-bottom: 0; }
    .lp-mock__kpi b {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 1.75rem;
      letter-spacing: -0.01em;
      font-variant-numeric: tabular-nums;
    }
    .lp-mock__kpi span {
      font-family: var(--font-sans);
      font-size: 12px; color: var(--fg-2);
      letter-spacing: 0.06em; text-transform: uppercase;
    }
    .lp-mock__kpi small {
      font-family: var(--font-mono); font-size: 12px;
      color: var(--accent); font-variant-numeric: tabular-nums;
    }

    /* Stat strip band (section 9) */
    .lp-s9 {
      background: var(--k-ink);
      color: #F7F5EF;
      padding: var(--s-8) 0;
      border-radius: var(--r-3);
    }
    .lp-s9__grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 0;
    }
    @media (max-width: 900px) { .lp-s9__grid { grid-template-columns: 1fr 1fr; gap: var(--s-5); } }
    .lp-s9__tile {
      padding: 12px var(--s-6);
      border-left: 1px solid rgba(247,245,239,0.12);
      display: flex; flex-direction: column; gap: 10px;
    }
    .lp-s9__tile:first-child { border-left: 0; }
    @media (max-width: 900px) { .lp-s9__tile { border-left: 0; } }
    .lp-s9__num {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(2.5rem, 5vw, 3.75rem);
      line-height: 1; letter-spacing: -0.02em;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
    }
    .lp-s9__label {
      font-family: var(--font-sans);
      font-size: 14px; line-height: 1.45;
      color: rgba(247,245,239,0.78);
      max-width: 26ch;
    }
    .lp-s9__tag {
      font-family: var(--font-mono);
      font-size: 11px; letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(247,245,239,0.5);
    }

    /* Final CTA block (section 10) */
    .lp-s10 {
      text-align: center;
      padding: var(--s-9) var(--s-6);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      background: var(--bg);
    }
    .lp-s10__head {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(2.5rem, 5.2vw, 4.25rem);
      line-height: 1.04; letter-spacing: -0.02em;
      max-width: 20ch;
      margin: 0 auto;
    }
    .lp-s10__head em { font-style: italic; color: var(--accent); }
    .lp-s10__ctas {
      margin-top: var(--s-6);
      display: inline-flex; flex-wrap: wrap; gap: 14px; align-items: center; justify-content: center;
    }

    /* Shared stage padding reduction on narrow */
    @media (max-width: 640px) {
      .lp-spec__stage { padding: var(--s-6) var(--s-5); }
      .lp-h3__text, .lp-s8__text, .lp-s8__media,
      .lp-h4__content, .lp-h6__content { padding: var(--s-6) var(--s-5); }
    }
  </style>

  <!-- ============ HERO ============ -->
  <section class="lp-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">14 · Landing pages</span>
      <h1>Pages that <em>ship</em>, not pages that decorate.</h1>
      <p class="lp-hero__lede">
        Six hero patterns and four marketing sections &mdash; the bricks for any landing page we put in the world. Fork
        the frame, keep the rules, let the claim do the work. Every block here uses the same tokens as the rest of the
        system.
      </p>

      <nav class="lp-index" aria-label="Landing page index">
        <a href="#lp-rules" data-lp-jump="lp-rules"><span><span class="lp-index__num">00</span>House rules</span></a>
        <a href="#lp-hero-1" data-lp-jump="lp-hero-1"><span><span class="lp-index__num">01</span>Editorial hero</span></a>
        <a href="#lp-hero-2" data-lp-jump="lp-hero-2"><span><span class="lp-index__num">02</span>Stat-led hero</span></a>
        <a href="#lp-hero-3" data-lp-jump="lp-hero-3"><span><span class="lp-index__num">03</span>Image-right hero</span></a>
        <a href="#lp-hero-4" data-lp-jump="lp-hero-4"><span><span class="lp-index__num">04</span>Full-bleed atmospheric</span></a>
        <a href="#lp-hero-5" data-lp-jump="lp-hero-5"><span><span class="lp-index__num">05</span>Proof hero</span></a>
        <a href="#lp-hero-6" data-lp-jump="lp-hero-6"><span><span class="lp-index__num">06</span>Video-poster hero</span></a>
        <a href="#lp-sec-7" data-lp-jump="lp-sec-7"><span><span class="lp-index__num">07</span>Three-up value prop</span></a>
        <a href="#lp-sec-8" data-lp-jump="lp-sec-8"><span><span class="lp-index__num">08</span>Feature split</span></a>
        <a href="#lp-sec-9" data-lp-jump="lp-sec-9"><span><span class="lp-index__num">09</span>Stat strip</span></a>
        <a href="#lp-sec-10" data-lp-jump="lp-sec-10"><span><span class="lp-index__num">10</span>Final CTA</span></a>
      </nav>
    </div>
  </section>

  <!-- ============ HOUSE RULES ============ -->
  <section class="section" id="lp-rules">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">House rules for landing pages</h2>
        <p class="section-head__body">
          The rules that let every block below play together. Break one and the page reads like an ad; keep them
          and it reads like Kilowott.
        </p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; One accent moment per surface. The italic red word, or the red button &mdash; never both.</span><span class="token-row__meta">Still the rule</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; Hero headline is 4&ndash;9 words. Sub-hero lede is 40 words or fewer.</span><span class="token-row__meta">Length</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Container max 1280px. Content column never exceeds 64ch.</span><span class="token-row__meta">Layout</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Vertical rhythm: <code style="font-family:var(--font-mono);font-size:12px;">--s-9</code> (96px) between sections, minimum.</span><span class="token-row__meta">Spacing</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">05</b> &nbsp; Every claim paired with proof &mdash; a stat, a client quote, or a logo.</span><span class="token-row__meta">Voice</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">06</b> &nbsp; Primary CTA is accent red only for conversion-critical moments. Otherwise ink default.</span><span class="token-row__meta">Action</span></li>
      </ul>
    </div>
  </section>

  <!-- ============ 1 · EDITORIAL HERO ============ -->
  <section class="section" id="lp-hero-1">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">01 &middot; Editorial hero</h2>
        <p class="section-head__body">
          The default. Newsroom register &mdash; eyebrow, serif display headline with an italic red accent word, a
          58-character lede, primary and ghost CTAs, and an optional kicker stat under the buttons.
        </p>
      </div>

      <div class="lp-spec">
        <div class="lp-spec__head"><span>Pattern 01 &middot; default</span><span>.lp-h1</span></div>
        <div class="lp-spec__stage">
          <span class="eyebrow eyebrow--accent">New &middot; Platform 2026</span>
          <h3 class="lp-h1__display">Software that <em>earns</em> its place on the team.</h3>
          <p class="lp-h1__lede">
            We build operations platforms for mid-market industrials &mdash; the companies that actually run the
            economy. Weeks to ship, not quarters. Proof in the first release.
          </p>
          <div class="lp-ctas">
            <a href="#" class="lp-btn lp-btn--primary">Book a walkthrough <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
            <a href="#" class="lp-btn lp-btn--ghost">Read the case study <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
          </div>
          <p class="lp-h1__kicker"><b>44% faster</b> &mdash; average cycle-time reduction across 18 shipped platforms since 2019.</p>
        </div>
        <div class="lp-spec__foot"><b>Use &mdash;</b> any landing page where the story leads. Most Kilowott campaigns start here.</div>
      </div>
    </div>
  </section>

  <!-- ============ 2 · STAT-LED HERO ============ -->
  <section class="section" id="lp-hero-2">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">02 &middot; Stat-led hero</h2>
        <p class="section-head__body">
          When the proof is the product. A single display figure on the left (40% of the width), headline, lede and
          CTAs to the right. Let the number do the talking.
        </p>
      </div>

      <div class="lp-spec">
        <div class="lp-spec__head"><span>Pattern 02 &middot; stat-led</span><span>.lp-h2</span></div>
        <div class="lp-spec__stage">
          <div class="lp-h2">
            <div>
              <div class="lp-h2__stat">14<em>&times;</em></div>
              <div class="lp-h2__statlabel">Faster order-to-cash, year one</div>
            </div>
            <div>
              <span class="eyebrow eyebrow--accent">Case &mdash; Nordic Freight</span>
              <h3 class="lp-h2__head">Replacing three SaaS tools with one <em>focused</em> build.</h3>
              <p class="lp-h2__lede">
                A shared operations platform &mdash; planning, dispatch, and invoicing in the same view. Six
                engineers, ten weeks, and a 14&times; improvement on the metric that pays the bills.
              </p>
              <div class="lp-ctas">
                <a href="#" class="lp-btn lp-btn--primary">Read the build <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
                <a href="#" class="lp-btn lp-btn--ghost">See all case studies <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="lp-spec__foot"><b>Use &mdash;</b> case-study landing pages, campaign pages anchored on one outcome.</div>
      </div>
    </div>
  </section>

  <!-- ============ 3 · IMAGE-RIGHT HERO ============ -->
  <section class="section" id="lp-hero-3">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">03 &middot; Image-right hero</h2>
        <p class="section-head__body">
          55/45 split. Text block on the left, full-bleed photo on the right. Good for service pages and anything
          that needs a human face or a room people recognise.
        </p>
      </div>

      <div class="lp-spec">
        <div class="lp-spec__head"><span>Pattern 03 &middot; 55/45</span><span>.lp-h3</span></div>
        <div class="lp-spec__stage lp-spec__stage--flush">
          <div class="lp-h3">
            <div class="lp-h3__text">
              <span class="eyebrow eyebrow--accent">Services &mdash; Platform build</span>
              <h3 class="lp-h3__head">A <em>small</em> team, the whole stack.</h3>
              <p class="lp-h3__lede">
                Product, design and engineering under one roof. We ship the first working slice in three weeks and
                iterate in public from week four.
              </p>
              <div class="lp-ctas">
                <a href="#" class="lp-btn lp-btn--primary">Start a project <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
                <a href="#" class="lp-btn lp-btn--ghost">How we work</a>
              </div>
            </div>
            <div class="lp-h3__media">
              <img src="assets/photos/pair-working-warm.jpg" alt="Two people working together in a warm, natural-light workspace" loading="lazy">
            </div>
          </div>
        </div>
        <div class="lp-spec__foot"><b>Use &mdash;</b> services, careers, about, anywhere an audience needs to see the humans.</div>
      </div>
    </div>
  </section>

  <!-- ============ 4 · FULL-BLEED ATMOSPHERIC ============ -->
  <section class="section" id="lp-hero-4">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">04 &middot; Full-bleed atmospheric</h2>
        <p class="section-head__body">
          Ink background, textural photo, a gradient scrim from 40% to 85%, content bottom-aligned. Paper-white
          headline, italic red accent word, CTAs below. The cinematic one.
        </p>
      </div>

      <div class="lp-spec">
        <div class="lp-spec__head"><span>Pattern 04 &middot; full-bleed</span><span>.lp-h4</span></div>
        <div class="lp-spec__stage lp-spec__stage--flush">
          <div class="lp-h4">
            <img class="lp-h4__photo" src="assets/photos/textural-atmosphere-warm.jpg" alt="Warm architectural close-up, raking light across wood beams" loading="lazy">
            <div class="lp-h4__scrim"></div>
            <div class="lp-h4__content">
              <span class="eyebrow eyebrow--accent" style="color:var(--accent)">Manifesto &mdash; 2026</span>
              <h3 class="lp-h4__head">Make <em>fewer</em> things, but make them land.</h3>
              <p class="lp-h4__lede">
                The work we&rsquo;re proudest of has one thing in common: a team that cut scope until only the
                honest parts survived. That&rsquo;s the whole method.
              </p>
              <div class="lp-ctas">
                <a href="#" class="lp-btn lp-btn--primary">Read the manifesto <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
                <a href="#" class="lp-btn lp-btn--ghost">Work with us <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="lp-spec__foot"><b>Use &mdash;</b> manifestos, year-openers, anything that needs to feel like a statement.</div>
      </div>
    </div>
  </section>

  <!-- ============ 5 · PROOF HERO ============ -->
  <section class="section" id="lp-hero-5">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">05 &middot; Proof hero</h2>
        <p class="section-head__body">
          Editorial hero with the client wall in the same frame. Six wordmarks under a tight &ldquo;Trusted by&rdquo;
          eyebrow. Anchors trust before the first scroll.
        </p>
      </div>

      <div class="lp-spec">
        <div class="lp-spec__head"><span>Pattern 05 &middot; proof</span><span>.lp-h5</span></div>
        <div class="lp-spec__stage">
          <span class="eyebrow eyebrow--accent">For operators, by operators</span>
          <h3 class="lp-h1__display">The platform teams <em>trust</em> with the quarter.</h3>
          <p class="lp-h1__lede">
            Live in eleven countries. Six million decisions made in-platform last month. If the workflow matters,
            we&rsquo;ve probably shipped something close.
          </p>
          <div class="lp-ctas">
            <a href="#" class="lp-btn lp-btn--primary">Book a demo <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
            <a href="#" class="lp-btn lp-btn--ghost">Customer stories <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
          </div>

          <div class="lp-h5__logos">
            <span class="eyebrow">Trusted by</span>
            <div class="lp-h5__logorow">
              <span class="lp-h5__logo">Nordic Freight</span>
              <span class="lp-h5__logo">Meridian Health</span>
              <span class="lp-h5__logo">Oslo Mar&iacute;time</span>
              <span class="lp-h5__logo">Kvist &amp; Co</span>
              <span class="lp-h5__logo">Grainbelt Capital</span>
              <span class="lp-h5__logo">Hovedstad Energi</span>
            </div>
          </div>
        </div>
        <div class="lp-spec__foot"><b>Use &mdash;</b> product and platform pages where buyer trust needs to arrive before the fold.</div>
      </div>
    </div>
  </section>

  <!-- ============ 6 · VIDEO-POSTER HERO ============ -->
  <section class="section" id="lp-hero-6">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">06 &middot; Video-poster hero</h2>
        <p class="section-head__body">
          Dark ink base, a muted photo behind, a circle-and-triangle play affordance, and a short meta line
          telling the reader how long the watch is. Earns its keep on product tours.
        </p>
      </div>

      <div class="lp-spec">
        <div class="lp-spec__head"><span>Pattern 06 &middot; video-poster</span><span>.lp-h6</span></div>
        <div class="lp-spec__stage lp-spec__stage--flush">
          <div class="lp-h6">
            <img class="lp-h6__photo" src="assets/photos/team-focused-laptop.jpg" alt="Team focused around a laptop, dim workspace" loading="lazy">
            <div class="lp-h6__scrim"></div>
            <div class="lp-h6__content">
              <button class="lp-h6__play" aria-label="Play the product tour"></button>
              <h3 class="lp-h6__head">See the platform run a real <em>week</em>.</h3>
              <div class="lp-h6__meta">2 min watch &middot; Product tour</div>
            </div>
          </div>
        </div>
        <div class="lp-spec__foot"><b>Use &mdash;</b> product tours, demo pages, anywhere a motion-piece does more than a static shot.</div>
      </div>
    </div>
  </section>

  <!-- ============ 7 · THREE-UP VALUE PROP ============ -->
  <section class="section" id="lp-sec-7">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">07 &middot; Three-up value prop</h2>
        <p class="section-head__body">
          Three columns, vertical rules between. Each column: accent number, serif title, body paragraph, and a
          &ldquo;Learn more &rarr;&rdquo; ghost link pinned to the bottom. The workhorse of any services page.
        </p>
      </div>

      <div class="lp-s7">
        <div class="lp-s7__col">
          <span class="lp-s7__num">01</span>
          <h3 class="lp-s7__title">Ship in <em>weeks</em>, not quarters.</h3>
          <p class="lp-s7__body">Working software in three weeks, not a deck and a Gantt chart. We size the first slice to ship, then iterate with the team in the room.</p>
          <a href="#" class="lp-s7__more">Learn more <i data-lucide="arrow-right" aria-hidden="true"></i></a>
        </div>
        <div class="lp-s7__col">
          <span class="lp-s7__num">02</span>
          <h3 class="lp-s7__title">One team, whole <em>stack</em>.</h3>
          <p class="lp-s7__body">Product, design, engineering and data science under the same roof. No hand-offs, no blame pass-throughs. The name on the work is the name that builds it.</p>
          <a href="#" class="lp-s7__more">Learn more <i data-lucide="arrow-right" aria-hidden="true"></i></a>
        </div>
        <div class="lp-s7__col">
          <span class="lp-s7__num">03</span>
          <h3 class="lp-s7__title">Own it from <em>day one</em>.</h3>
          <p class="lp-s7__body">Codebase, repos, docs and runbooks live in your tenancy from the first commit. When we hand over, there&rsquo;s nothing to hand over.</p>
          <a href="#" class="lp-s7__more">Learn more <i data-lucide="arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 8 · FEATURE SPLIT ============ -->
  <section class="section" id="lp-sec-8">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">08 &middot; Feature split</h2>
        <p class="section-head__body">
          Alternating 50/50. Text side: eyebrow, title, three bulleted outcomes, CTA. Media side: a component
          card, a UI mock, or a bordered block of proof. Stack two with flipped sides for rhythm.
        </p>
      </div>

      <!-- First split: text left, mock right -->
      <div class="lp-s8">
        <div class="lp-s8__text">
          <span class="eyebrow eyebrow--accent">Feature &mdash; Control tower</span>
          <h3 class="lp-s8__title">One screen, the whole <em>operation</em>.</h3>
          <ul class="lp-s8__bullets">
            <li><b>Live pipeline</b> &mdash; every order, from quote to invoice, on one canvas.</li>
            <li><b>Exceptions first</b> &mdash; we surface the 4% that need a human; the rest stays quiet.</li>
            <li><b>Built on your stack</b> &mdash; SAP, NetSuite, Snowflake, or whatever actually runs finance.</li>
          </ul>
          <div class="lp-s8__cta">
            <a href="#" class="lp-btn lp-btn--primary">See the control tower <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
          </div>
        </div>
        <div class="lp-s8__media">
          <div class="lp-mock">
            <div class="lp-mock__head">
              <span><span class="lp-mock__dot"></span>Control tower &middot; Today</span>
              <span>Q2 &middot; Week 18</span>
            </div>
            <div class="lp-mock__body">
              <div class="lp-mock__kpi">
                <span>Orders in-flight</span>
                <b>1,284</b>
                <small>+12%</small>
              </div>
              <div class="lp-mock__kpi">
                <span>Exceptions</span>
                <b>47</b>
                <small>−18%</small>
              </div>
              <div class="lp-mock__kpi">
                <span>DSO &middot; 30d</span>
                <b>22.4d</b>
                <small>−4.1d</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Second split: flipped — mock left, text right -->
      <div class="lp-s8 lp-s8--flip">
        <div class="lp-s8__text">
          <span class="eyebrow eyebrow--accent">Feature &mdash; Scenario planner</span>
          <h3 class="lp-s8__title">Model the <em>quarter</em> before you commit the headcount.</h3>
          <ul class="lp-s8__bullets">
            <li><b>Three scenarios</b> &mdash; base, best, worst &mdash; side by side on the same axis.</li>
            <li><b>Write-back to ERP</b> &mdash; the scenario that wins becomes the plan, no copy-paste.</li>
            <li><b>Share on a link</b> &mdash; CFO and board see the same numbers you do.</li>
          </ul>
          <div class="lp-s8__cta">
            <a href="#" class="lp-btn lp-btn--primary">Open a scenario <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
          </div>
        </div>
        <div class="lp-s8__media">
          <div class="lp-mock">
            <div class="lp-mock__head">
              <span><span class="lp-mock__dot"></span>Scenario &middot; Best case</span>
              <span>FY27</span>
            </div>
            <div class="lp-mock__body">
              <div class="lp-mock__kpi">
                <span>Revenue</span>
                <b>$18.4<small style="font-size:0.6em;">M</small></b>
                <small>+22% YoY</small>
              </div>
              <div class="lp-mock__kpi">
                <span>Burn &middot; Q2</span>
                <b>$1.9<small style="font-size:0.6em;">M</small></b>
                <small>−6%</small>
              </div>
              <div class="lp-mock__kpi">
                <span>Runway</span>
                <b>28<small style="font-size:0.6em;">mo</small></b>
                <small>at EoY burn</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 9 · STAT STRIP BAND ============ -->
  <section class="section" id="lp-sec-9">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">09 &middot; Stat strip band</h2>
        <p class="section-head__body">
          Full-width ink band, four numbers across. Paper-white labels, accent-red figures, mono caption tags.
          Use once per page &mdash; the proof bar under the fold.
        </p>
      </div>

      <div class="lp-s9">
        <div class="lp-s9__grid">
          <div class="lp-s9__tile">
            <div class="lp-s9__num">44%</div>
            <div class="lp-s9__label">Average cycle-time reduction across shipped platforms.</div>
            <div class="lp-s9__tag">Trailing 5 yrs</div>
          </div>
          <div class="lp-s9__tile">
            <div class="lp-s9__num">18</div>
            <div class="lp-s9__label">Platforms in production across eleven countries.</div>
            <div class="lp-s9__tag">Live today</div>
          </div>
          <div class="lp-s9__tile">
            <div class="lp-s9__num">3wk</div>
            <div class="lp-s9__label">First working slice, from kick-off to clickable.</div>
            <div class="lp-s9__tag">Typical</div>
          </div>
          <div class="lp-s9__tile">
            <div class="lp-s9__num">92</div>
            <div class="lp-s9__label">Net promoter, last twelve months of partners surveyed.</div>
            <div class="lp-s9__tag">NPS &middot; LTM</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 10 · FINAL CTA BLOCK ============ -->
  <section class="section" id="lp-sec-10">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">10 &middot; Final CTA block</h2>
        <p class="section-head__body">
          The close. One big serif line, one accent button for the conversion, one ghost link for the reader
          who needs one more touch before they commit.
        </p>
      </div>

      <div class="lp-s10">
        <h3 class="lp-s10__head">Let&rsquo;s build something that <em>ships</em>.</h3>
        <div class="lp-s10__ctas">
          <a href="#" class="lp-btn lp-btn--accent">Start a project <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
          <a href="#" class="lp-btn lp-btn--ghost">Read the case <span class="lp-btn__arrow"><i data-lucide="arrow-right"></i></span></a>
        </div>
      </div>
    </div>
  </section>
  `;

  // Smooth in-page jumps without tripping the hash router
  root.querySelectorAll('[data-lp-jump]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('data-lp-jump');
      const target = document.getElementById(id);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Prevent demo CTA anchors from scrolling to top / routing away
  root.querySelectorAll('.lp-spec a[href="#"], .lp-s7__more[href="#"], .lp-s8__cta a[href="#"], .lp-s10 a[href="#"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });
};
