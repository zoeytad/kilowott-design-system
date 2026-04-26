/* ============================================================
   DECK TEMPLATE — v0.3
   7 canonical slide layouts in the locked-in Editorial register.
   Each slide is a real 16:9 miniature that can be screenshotted,
   plus rules + do/don't guidance.
   ============================================================ */

// When the hosted Google Slides template link is live, set this to the
// /copy URL (e.g. "https://docs.google.com/presentation/d/XXX/copy").
// Leaving it empty hides the Slides button and shows upload instructions instead.
const DECK_SLIDES_URL = '';
const DECK_PPTX_URL   = 'downloads/kilowott-deck-template.pptx';

window.renderDeck = function (root) {
  root.innerHTML = `
  <style>
    /* -------- DECK PAGE SCOPED STYLES -------- */
    .dk-hero {
      padding: var(--s-9) 0 var(--s-7);
      border-bottom: 1px solid var(--rule);
    }
    .dk-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .dk-hero h1 em { font-style: italic; color: var(--accent); }
    .dk-hero__lede {
      margin-top: 22px; max-width: 60ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }
    .dk-hero__meta {
      display: grid; grid-template-columns: repeat(4, auto);
      gap: var(--s-6);
      margin-top: var(--s-7);
      font-size: var(--fs-xs); letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--fg-2);
    }
    .dk-hero__meta > div b {
      display:block; color: var(--fg); font-weight: 500;
      margin-top: 4px; letter-spacing: 0.02em;
      text-transform: none; font-size: var(--fs-sm);
    }
    @media (max-width: 800px) { .dk-hero__meta { grid-template-columns: repeat(2, auto); } }

    /* -------- DOWNLOAD BLOCK -------- */
    .dk-downloads {
      margin-top: var(--s-7);
      padding: var(--s-6);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      background: var(--bg-2);
    }
    .dk-downloads__row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    }
    @media (max-width: 700px) { .dk-downloads__row { grid-template-columns: 1fr; } }
    .dk-dl {
      display: flex; align-items: center; justify-content: space-between;
      gap: 20px; padding: 20px 24px;
      background: var(--bg); border: 1px solid var(--rule);
      border-radius: var(--r-3);
      text-decoration: none;
      transition: border-color 120ms var(--ease-standard, ease), transform 120ms var(--ease-standard, ease);
    }
    .dk-dl:hover { border-color: var(--fg); transform: translateY(-1px); }
    .dk-dl--primary { background: var(--fg); border-color: var(--fg); }
    .dk-dl--primary:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-1px); }
    .dk-dl--primary .dk-dl__eyebrow,
    .dk-dl--primary .dk-dl__title,
    .dk-dl--primary .dk-dl__meta,
    .dk-dl--primary .dk-dl__icon { color: var(--bg); }
    .dk-dl--pending {
      border-style: dashed; opacity: 0.78; cursor: not-allowed;
    }
    .dk-dl__label { display: grid; gap: 2px; }
    .dk-dl__eyebrow {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.16em; text-transform: uppercase;
    }
    .dk-dl__title {
      font-family: var(--font-display); font-weight: 400;
      font-size: 22px; color: var(--fg); letter-spacing: -0.01em;
    }
    .dk-dl__meta { font-size: 12px; color: var(--fg-2); margin-top: 2px; }
    .dk-dl__icon { width: 28px; height: 28px; stroke-width: 1.5; color: var(--fg); flex-shrink: 0; }
    .dk-downloads__note {
      margin: 16px 0 0; font-size: 13px;
      color: var(--fg-2); line-height: 1.55;
    }

    /* -------- SLIDE FRAME -------- */
    /* Each slide is drawn at a fixed 1280x720 coordinate space, then scaled to fit its container */
    .dk-slide-wrap {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg-2);
    }
    .dk-slide-head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      background: var(--bg);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .dk-slide-head__title { color: var(--fg); letter-spacing: 0.12em; font-weight: 500; }
    .dk-slide-head__meta { display: flex; gap: 16px; }
    .dk-slide-head__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--fg-2); display: inline-block; margin-right: 6px; vertical-align: middle; }
    .dk-slide-head__dot--accent { background: var(--accent); }

    .dk-slide-stage {
      background: repeating-linear-gradient(45deg, var(--bg-2), var(--bg-2) 12px, var(--bg) 12px, var(--bg) 13px);
      padding: 32px;
      display: grid; place-items: center;
    }

    /* The actual slide at 1280x720 — scaled via CSS to fit. */
    .dk-slide {
      width: 1280px; height: 720px;
      transform-origin: top left;
      transform: scale(var(--dk-scale, 0.5));
      /* margin-bottom absorbs the scaled-down height so the stage isn't huge */
      margin-bottom: calc((720px * var(--dk-scale, 0.5)) - 720px);
      margin-right: calc((1280px * var(--dk-scale, 0.5)) - 1280px);
      position: relative;
      overflow: hidden;
      font-family: var(--font-sans);
      color: #0B0F14;
      background: #FFFFFF;
      box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
    }
    /* Dark slide */
    .dk-slide--ink { background: #0B0F14; color: #FFFFFF; }
    /* Warm slide */
    .dk-slide--warm { background: #F6F4F0; color: #0B0F14; }

    /* ------- common slide chrome ------- */
    .dk-chrome-logo {
      position: absolute; top: 48px; left: 56px;
      display: flex; align-items: center;
      width: 120px; height: 22px;
    }
    .dk-chrome-logo::before {
      content: ""; width: 100%; height: 100%;
      background: currentColor;
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat left center/contain;
              mask: url(assets/kilowott-logo.svg) no-repeat left center/contain;
    }
    .dk-chrome-footer {
      position: absolute; bottom: 36px; left: 56px; right: 56px;
      display: flex; justify-content: space-between; align-items: center;
      font-family: var(--font-sans);
      font-size: 13px; color: rgba(11,15,20,0.42);
      letter-spacing: 0.04em;
    }
    .dk-slide--ink .dk-chrome-footer { color: rgba(255,255,255,0.42); }
    .dk-slide--warm .dk-chrome-footer { color: rgba(11,15,20,0.5); }
    .dk-chrome-footer__page {
      font-family: var(--font-mono); font-size: 12px;
      letter-spacing: 0.08em;
    }

    .dk-eyebrow {
      font-family: var(--font-sans);
      font-size: 14px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 500;
      display: inline-flex; align-items: center; gap: 14px;
    }
    .dk-eyebrow::before {
      content: ""; width: 28px; height: 1px; background: currentColor;
    }
    .dk-eyebrow--accent { color: #E4022D; }

    .dk-rule { height: 1px; background: rgba(11,15,20,0.14); border: 0; margin: 0; }
    .dk-slide--ink .dk-rule { background: rgba(255,255,255,0.14); }
    .dk-slide--warm .dk-rule { background: rgba(11,15,20,0.18); }

    /* =====================================================
       SLIDE 01 · TITLE / COVER
       ===================================================== */
    .dk-01 .dk-01-body {
      position: absolute; left: 56px; right: 56px; top: 200px;
    }
    .dk-01 h1 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 120px; line-height: 1; letter-spacing: -0.025em;
      margin: 40px 0 0; max-width: 26ch;
    }
    .dk-01 h1 em { font-style: italic; color: #E4022D; }
    .dk-01 .dk-01-meta {
      position: absolute; bottom: 100px; left: 56px; right: 56px;
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 48px;
      font-size: 16px; color: rgba(11,15,20,0.55);
      letter-spacing: 0.04em;
    }
    .dk-01 .dk-01-meta b { display: block; color: #0B0F14; font-weight: 500; margin-top: 6px; letter-spacing: 0; }

    /* =====================================================
       SLIDE 02 · SECTION DIVIDER
       ===================================================== */
    .dk-02 { background: #0B0F14; color: #FFFFFF; }
    .dk-02 .dk-chrome-logo { color: #FFFFFF; }
    .dk-02 .dk-02-num {
      position: absolute; left: 56px; top: 96px;
      font-family: var(--font-mono);
      font-size: 12px; letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
    }
    .dk-02 .dk-02-num::before {
      content: ""; display: inline-block;
      width: 22px; height: 1px; background: #E4022D;
      vertical-align: middle; margin-right: 10px;
    }
    .dk-02 .dk-02-body {
      position: absolute; left: 56px; right: 56px; top: 50%;
      transform: translateY(-50%);
    }
    .dk-02 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 104px; line-height: 1; letter-spacing: -0.02em;
      margin: 24px 0 0; max-width: 16ch;
    }
    .dk-02 h2 em { font-style: italic; color: #E4022D; }
    .dk-02 p {
      font-size: 20px; color: rgba(255,255,255,0.66); line-height: 1.5;
      max-width: 46ch; margin-top: 40px;
    }

    /* =====================================================
       SLIDE 03 · CONTENT (2-COL)
       ===================================================== */
    .dk-03 .dk-03-grid {
      position: absolute; left: 56px; right: 56px; top: 128px; bottom: 88px;
      display: grid; grid-template-columns: 1.1fr 1fr;
      gap: 64px;
    }
    .dk-03 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 64px; line-height: 1.02; letter-spacing: -0.02em;
      margin: 22px 0 0; max-width: 14ch;
    }
    .dk-03 h2 em { font-style: italic; color: #E4022D; }
    .dk-03 .dk-03-lede {
      font-size: 17px; line-height: 1.5; color: rgba(11,15,20,0.62);
      margin-top: 22px; max-width: 40ch;
    }
    .dk-03 .dk-03-points { display: flex; flex-direction: column; gap: 14px; }
    .dk-03 .dk-03-point {
      display: grid; grid-template-columns: 40px 1fr; gap: 16px;
      padding: 14px 0; border-top: 1px solid rgba(11,15,20,0.14);
    }
    .dk-03 .dk-03-point:last-child { border-bottom: 1px solid rgba(11,15,20,0.14); }
    .dk-03 .dk-03-point__n {
      font-family: var(--font-mono);
      font-size: 12px; color: rgba(11,15,20,0.5);
      letter-spacing: 0.1em; padding-top: 4px;
    }
    .dk-03 .dk-03-point__body b {
      font-family: var(--font-display);
      font-weight: 400; font-size: 22px; letter-spacing: -0.01em;
      line-height: 1.15; display: block;
    }
    .dk-03 .dk-03-point__body p {
      font-size: 14px; line-height: 1.45; color: rgba(11,15,20,0.62);
      margin: 6px 0 0; max-width: 42ch;
    }

    /* =====================================================
       SLIDE 04 · STAT / HERO METRIC
       ===================================================== */
    .dk-04 { background: #F6F4F0; }
    .dk-04 .dk-04-body {
      position: absolute; left: 56px; right: 56px; top: 50%;
      transform: translateY(-50%);
      display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px;
      align-items: center;
    }
    .dk-04 .dk-04-num {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 320px; line-height: 0.85;
      letter-spacing: -0.05em;
      color: #E4022D;
    }
    .dk-04 .dk-04-num sup {
      font-size: 96px; vertical-align: top; letter-spacing: 0;
      top: 20px; position: relative; color: #E4022D;
      font-style: italic;
    }
    .dk-04 .dk-04-right h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 48px; line-height: 1.05; letter-spacing: -0.015em;
      margin: 24px 0 0;
    }
    .dk-04 .dk-04-right p {
      font-size: 18px; line-height: 1.6; color: rgba(11,15,20,0.65);
      margin-top: 24px; max-width: 34ch;
    }
    .dk-04 .dk-04-source {
      margin-top: 32px; padding-top: 20px;
      border-top: 1px solid rgba(11,15,20,0.18);
      font-family: var(--font-mono); font-size: 13px;
      color: rgba(11,15,20,0.5); letter-spacing: 0.06em;
    }

    /* =====================================================
       SLIDE 05 · QUOTE / TESTIMONIAL
       ===================================================== */
    .dk-05 .dk-05-body {
      position: absolute; left: 120px; right: 120px; top: 200px;
    }
    .dk-05 .dk-05-mark {
      font-family: var(--font-display); font-style: italic;
      font-size: 180px; line-height: 1;
      color: #E4022D; position: absolute; left: 56px; top: 160px;
    }
    .dk-05 blockquote {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 64px; line-height: 1.1;
      letter-spacing: -0.01em;
      margin: 0; max-width: 22ch;
    }
    .dk-05 blockquote em { font-style: italic; color: #E4022D; }
    .dk-05 .dk-05-cite {
      position: absolute; left: 120px; right: 120px; bottom: 120px;
      display: flex; gap: 24px; align-items: center;
    }
    .dk-05 .dk-05-avatar {
      width: 64px; height: 64px; border-radius: 50%;
      background: linear-gradient(135deg, #E4022D 0%, #8A021B 100%);
      display: grid; place-items: center;
      font-family: var(--font-display); color: #fff; font-size: 24px;
    }
    .dk-05 .dk-05-cite b { display:block; font-size: 18px; font-weight: 500; }
    .dk-05 .dk-05-cite span { font-size: 15px; color: rgba(11,15,20,0.58); }

    /* =====================================================
       SLIDE 06 · IMAGE / FULL-BLEED
       ===================================================== */
    .dk-06 {
      background: #0B0F14;
      color: #FFFFFF;
    }
    .dk-06 .dk-06-image {
      position: absolute; inset: 0;
      background-image: url(assets/photos/team-standing-discussion.jpg);
      background-size: cover;
      background-position: center;
      /* no filter — let the raw photo breathe */
    }
    .dk-06 .dk-06-scrim {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(11,15,20,0) 40%, rgba(11,15,20,0.85) 100%);
    }
    .dk-06 .dk-06-body {
      position: absolute; left: 56px; right: 56px; bottom: 100px;
    }
    .dk-06 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 84px; line-height: 1; letter-spacing: -0.02em;
      margin: 20px 0 0; max-width: 18ch;
      color: #FFFFFF;
    }
    .dk-06 h2 em { font-style: italic; color: #E4022D; }
    .dk-06 .dk-06-cap {
      font-size: 17px; color: rgba(255,255,255,0.7);
      margin-top: 20px; max-width: 48ch; line-height: 1.55;
    }
    .dk-06 .dk-chrome-logo { color: #FFFFFF; z-index: 2; }
    .dk-06 .dk-chrome-footer { color: rgba(255,255,255,0.55); z-index: 2; }

    /* =====================================================
       SLIDE 07 · CLOSING / CTA
       ===================================================== */
    .dk-07 .dk-07-body {
      position: absolute; left: 56px; right: 56px; top: 50%;
      transform: translateY(-50%);
      max-width: 820px;
    }
    .dk-07 h1 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 120px; line-height: 1; letter-spacing: -0.025em;
      margin: 32px 0 0;
    }
    .dk-07 h1 em { font-style: italic; color: #E4022D; }
    .dk-07 .dk-07-contact {
      position: absolute; left: 56px; right: 56px; bottom: 100px;
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      padding-top: 28px; border-top: 1px solid rgba(11,15,20,0.18);
      font-size: 15px; letter-spacing: 0.04em;
      color: rgba(11,15,20,0.6);
    }
    .dk-07 .dk-07-contact b {
      display:block; color: #0B0F14; font-weight: 500;
      font-family: var(--font-display); font-size: 22px;
      letter-spacing: -0.01em; margin-top: 6px;
    }

    /* =====================================================
       SLIDE 08 · AGENDA / TOC
       ===================================================== */
    .dk-08 .dk-08-grid {
      position: absolute; left: 56px; right: 56px; top: 160px; bottom: 120px;
      display: grid; grid-template-columns: 0.9fr 1.1fr;
      gap: 80px;
    }
    .dk-08 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 84px; line-height: 1; letter-spacing: -0.02em;
      margin: 28px 0 0; max-width: 10ch;
    }
    .dk-08 h2 em { font-style: italic; color: #E4022D; }
    .dk-08 .dk-08-lede {
      font-size: 17px; line-height: 1.55; color: rgba(11,15,20,0.58);
      margin-top: 28px; max-width: 28ch;
    }
    .dk-08 .dk-08-list {
      display: flex; flex-direction: column;
      border-top: 1px solid rgba(11,15,20,0.14);
    }
    .dk-08 .dk-08-item {
      display: grid; grid-template-columns: 64px 1fr;
      gap: 24px; padding: 18px 0;
      border-bottom: 1px solid rgba(11,15,20,0.14);
      align-items: baseline;
    }
    .dk-08 .dk-08-item__n {
      font-family: var(--font-mono);
      font-size: 13px; color: rgba(11,15,20,0.5);
      letter-spacing: 0.1em;
    }
    .dk-08 .dk-08-item__body b {
      font-family: var(--font-display);
      font-weight: 400; font-size: 28px; letter-spacing: -0.01em;
      line-height: 1.15; display: block;
    }
    .dk-08 .dk-08-item__body p {
      font-size: 15px; line-height: 1.5; color: rgba(11,15,20,0.58);
      margin: 6px 0 0; max-width: 48ch;
    }

    /* =====================================================
       SLIDE 09 · TEAM / BIOS
       ===================================================== */
    .dk-09 .dk-09-head {
      position: absolute; left: 56px; right: 56px; top: 120px;
    }
    .dk-09 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 64px; line-height: 1.02; letter-spacing: -0.02em;
      margin: 20px 0 0; max-width: 20ch;
    }
    .dk-09 h2 em { font-style: italic; color: #E4022D; }
    .dk-09 .dk-09-grid {
      position: absolute; left: 56px; right: 56px; top: 320px; bottom: 110px;
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 36px;
    }
    .dk-09 .dk-09-card { display: flex; flex-direction: column; }
    .dk-09 .dk-09-avatar {
      width: 96px; height: 96px; border-radius: 50%;
      background: linear-gradient(135deg, rgba(11,15,20,0.14) 0%, rgba(11,15,20,0.06) 100%);
      display: grid; place-items: center;
      font-family: var(--font-display); font-size: 34px;
      color: rgba(11,15,20,0.42);
      margin-bottom: 20px;
    }
    .dk-09 .dk-09-card--accent .dk-09-avatar {
      background: linear-gradient(135deg, #E4022D 0%, #8A021B 100%);
      color: #fff;
    }
    .dk-09 .dk-09-card b {
      font-family: var(--font-display);
      font-weight: 400; font-size: 24px;
      letter-spacing: -0.01em; line-height: 1.15;
      display: block;
    }
    .dk-09 .dk-09-card .dk-09-role {
      font-family: var(--font-sans);
      font-size: 11px; letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(11,15,20,0.5);
      margin-top: 8px;
    }
    .dk-09 .dk-09-card p {
      font-size: 14px; line-height: 1.5;
      color: rgba(11,15,20,0.6);
      margin: 14px 0 0;
    }

    /* =====================================================
       SLIDE 10 · TIMELINE / ROADMAP
       ===================================================== */
    .dk-10 .dk-10-head {
      position: absolute; left: 56px; right: 56px; top: 120px;
    }
    .dk-10 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 60px; line-height: 1.02; letter-spacing: -0.02em;
      margin: 20px 0 0; max-width: 22ch;
    }
    .dk-10 h2 em { font-style: italic; color: #E4022D; }
    .dk-10 .dk-10-track {
      position: absolute; left: 56px; right: 56px; top: 350px; bottom: 110px;
    }
    .dk-10 .dk-10-axis {
      position: absolute; left: 0; right: 0; top: 40px;
      height: 1px; background: rgba(11,15,20,0.18);
    }
    .dk-10 .dk-10-cols {
      display: grid; grid-template-columns: repeat(5, 1fr);
      gap: 24px; position: relative;
    }
    .dk-10 .dk-10-col { padding-top: 0; position: relative; }
    .dk-10 .dk-10-q {
      font-family: var(--font-mono);
      font-size: 12px; letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(11,15,20,0.55);
      display: block;
      padding-bottom: 24px;
      position: relative;
    }
    .dk-10 .dk-10-q::after {
      content: ""; position: absolute;
      left: 0; bottom: 12px;
      width: 9px; height: 9px; border-radius: 50%;
      background: #fff;
      border: 1px solid rgba(11,15,20,0.35);
    }
    .dk-10 .dk-10-col--now .dk-10-q { color: #E4022D; }
    .dk-10 .dk-10-col--now .dk-10-q::after {
      background: #E4022D; border-color: #E4022D;
    }
    .dk-10 .dk-10-milestones {
      display: flex; flex-direction: column; gap: 10px;
      padding-top: 18px;
    }
    .dk-10 .dk-10-m {
      font-family: var(--font-display);
      font-weight: 400; font-size: 18px;
      line-height: 1.3; letter-spacing: -0.005em;
      color: rgba(11,15,20,0.78);
    }
    .dk-10 .dk-10-m--accent {
      color: #E4022D;
      display: inline-flex; align-items: baseline; gap: 8px;
    }
    .dk-10 .dk-10-m--accent::before {
      content: ""; width: 6px; height: 6px; border-radius: 50%;
      background: #E4022D; display: inline-block;
      transform: translateY(-2px);
    }

    /* =====================================================
       SLIDE 11 · PRICING TIERS
       ===================================================== */
    .dk-11 .dk-11-head {
      position: absolute; left: 56px; right: 56px; top: 108px;
    }
    .dk-11 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 46px; line-height: 1.02; letter-spacing: -0.02em;
      margin: 14px 0 0; max-width: 24ch;
    }
    .dk-11 h2 em { font-style: italic; color: #E4022D; }
    .dk-11 .dk-11-tiers {
      position: absolute; left: 56px; right: 56px; top: 252px; bottom: 92px;
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .dk-11 .dk-11-tier {
      position: relative;
      border: 1px solid rgba(11,15,20,0.14);
      border-radius: 12px;
      padding: 22px 22px 18px;
      background: #FFFFFF;
      display: flex; flex-direction: column;
    }
    .dk-11 .dk-11-tier--featured {
      border: 1px solid #E4022D;
      box-shadow: 0 8px 30px rgba(228,2,45,0.08);
    }
    .dk-11 .dk-11-pill {
      position: absolute; top: -12px; left: 20px;
      background: #E4022D; color: #fff;
      font-family: var(--font-mono);
      font-size: 10px; letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 5px 10px; border-radius: 999px;
    }
    .dk-11 .dk-11-tier__name {
      font-family: var(--font-display);
      font-weight: 400; font-size: 22px;
      letter-spacing: -0.01em; line-height: 1;
    }
    .dk-11 .dk-11-tier__price {
      font-family: var(--font-display);
      font-weight: 400; font-size: 50px;
      letter-spacing: -0.025em; line-height: 1;
      margin-top: 14px;
    }
    .dk-11 .dk-11-tier__price sup {
      font-family: var(--font-sans);
      font-size: 12px; color: rgba(11,15,20,0.5);
      letter-spacing: 0.06em;
      vertical-align: top;
      top: 10px; position: relative;
      margin-left: 4px;
    }
    .dk-11 .dk-11-tier__price-note {
      font-size: 12px; color: rgba(11,15,20,0.5);
      letter-spacing: 0.04em; margin-top: 4px;
    }
    .dk-11 .dk-11-tier__features {
      list-style: none; padding: 0; margin: 14px 0 0;
      display: flex; flex-direction: column; gap: 7px;
      font-size: 12.5px; line-height: 1.4;
      color: rgba(11,15,20,0.72);
      border-top: 1px solid rgba(11,15,20,0.12);
      padding-top: 14px;
    }
    .dk-11 .dk-11-tier__features li {
      display: grid; grid-template-columns: 14px 1fr;
      gap: 10px; align-items: baseline;
    }
    .dk-11 .dk-11-tier__features li::before {
      content: "\\2713";
      font-size: 11px; color: #E4022D;
      line-height: 1;
    }
    .dk-11 .dk-11-tier__cta {
      margin-top: auto;
      padding: 10px 14px;
      border: 1px solid rgba(11,15,20,0.18);
      border-radius: 8px;
      text-align: center;
      font-family: var(--font-sans);
      font-size: 13px; font-weight: 500;
      letter-spacing: 0.04em;
      color: #0B0F14;
      background: transparent;
    }
    .dk-11 .dk-11-tier--featured .dk-11-tier__cta {
      background: #0B0F14; color: #fff;
      border-color: #0B0F14;
    }

    /* =====================================================
       SLIDE 12 · COMPARISON
       ===================================================== */
    .dk-12 .dk-12-head {
      position: absolute; left: 56px; right: 56px; top: 108px;
    }
    .dk-12 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 48px; line-height: 1.02; letter-spacing: -0.02em;
      margin: 14px 0 0; max-width: 22ch;
    }
    .dk-12 h2 em { font-style: italic; color: #E4022D; }
    .dk-12 .dk-12-table {
      position: absolute; left: 56px; right: 56px; top: 246px; bottom: 88px;
      display: grid; grid-template-columns: 150px 1fr 1fr;
    }
    .dk-12 .dk-12-col-head {
      font-family: var(--font-mono);
      font-size: 11px; letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(11,15,20,0.5);
      padding: 0 18px 10px;
      border-bottom: 1px solid rgba(11,15,20,0.14);
    }
    .dk-12 .dk-12-col-head--kw {
      color: #E4022D;
      border-bottom-color: #E4022D;
    }
    .dk-12 .dk-12-row-label,
    .dk-12 .dk-12-cell {
      padding: 12px 18px;
      border-bottom: 1px solid rgba(11,15,20,0.08);
      font-size: 14px; line-height: 1.4;
    }
    .dk-12 .dk-12-row-label {
      font-family: var(--font-mono);
      font-size: 11px; letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(11,15,20,0.55);
      padding-left: 0;
    }
    .dk-12 .dk-12-cell {
      color: rgba(11,15,20,0.62);
    }
    .dk-12 .dk-12-cell--kw {
      color: #0B0F14;
      background: rgba(228,2,45,0.04);
    }
    .dk-12 .dk-12-cell--kw b {
      font-family: var(--font-display);
      font-weight: 400; font-size: 16px;
      color: #0B0F14;
      display: inline;
    }

    /* =====================================================
       SLIDE 13 · LOGO WALL / CLIENTS
       ===================================================== */
    .dk-13 { background: #F6F4F0; }
    .dk-13 .dk-13-head {
      position: absolute; left: 56px; right: 56px; top: 120px;
    }
    .dk-13 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 60px; line-height: 1.02; letter-spacing: -0.02em;
      margin: 18px 0 0; max-width: 22ch;
    }
    .dk-13 h2 em { font-style: italic; color: #E4022D; }
    .dk-13 .dk-13-wall {
      position: absolute; left: 56px; right: 56px; top: 320px; bottom: 110px;
      display: grid; grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 0;
      border-top: 1px solid rgba(11,15,20,0.14);
      border-left: 1px solid rgba(11,15,20,0.14);
    }
    .dk-13 .dk-13-logo {
      display: grid; place-items: center;
      border-right: 1px solid rgba(11,15,20,0.14);
      border-bottom: 1px solid rgba(11,15,20,0.14);
      font-family: var(--font-display);
      font-weight: 500; font-size: 22px;
      letter-spacing: -0.01em;
      color: rgba(11,15,20,0.55);
      padding: 12px;
      text-align: center;
    }
    .dk-13 .dk-13-logo--caps {
      font-family: var(--font-sans);
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-size: 14px;
    }
    .dk-13 .dk-13-logo--mono {
      font-family: var(--font-mono);
      font-size: 14px; letter-spacing: 0.06em;
    }

    /* =====================================================
       SLIDE 14 · CHART SLIDE
       ===================================================== */
    .dk-14 .dk-14-grid {
      position: absolute; left: 56px; right: 56px; top: 160px; bottom: 120px;
      display: grid; grid-template-columns: 0.9fr 1.2fr;
      gap: 64px;
      align-items: center;
    }
    .dk-14 h2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 56px; line-height: 1.04; letter-spacing: -0.02em;
      margin: 20px 0 0; max-width: 16ch;
    }
    .dk-14 h2 em { font-style: italic; color: #E4022D; }
    .dk-14 .dk-14-lede {
      font-size: 16px; line-height: 1.55;
      color: rgba(11,15,20,0.6);
      margin-top: 22px; max-width: 34ch;
    }
    .dk-14 .dk-14-chart-wrap { position: relative; }
    .dk-14 .dk-14-chart { width: 100%; height: auto; display: block; }
    .dk-14 .dk-14-legend {
      display: flex; gap: 24px; margin-top: 18px;
      font-family: var(--font-mono);
      font-size: 11px; letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(11,15,20,0.6);
    }
    .dk-14 .dk-14-legend span { display: inline-flex; align-items: center; gap: 8px; }
    .dk-14 .dk-14-legend i {
      width: 14px; height: 2px; display: inline-block;
      background: #0B0F14;
    }
    .dk-14 .dk-14-legend i.is-accent { background: #E4022D; }

    /* =====================================================
       SLIDE 15 · THANK YOU / Q&A
       ===================================================== */
    .dk-15 { background: #0B0F14; color: #FFFFFF; }
    .dk-15 .dk-chrome-logo { color: #FFFFFF; }
    .dk-15 .dk-15-page {
      position: absolute; top: 56px; right: 56px;
      font-family: var(--font-mono);
      font-size: 12px; letter-spacing: 0.18em;
      color: rgba(255,255,255,0.55);
    }
    .dk-15 .dk-15-body {
      position: absolute; left: 56px; right: 56px; top: 50%;
      transform: translateY(-50%);
    }
    .dk-15 h1 {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 180px; line-height: 0.95; letter-spacing: -0.03em;
      margin: 20px 0 0;
    }
    .dk-15 h1 em { font-style: italic; color: #E4022D; }
    .dk-15 .dk-15-contact {
      position: absolute; left: 56px; right: 56px; bottom: 110px;
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      padding-top: 28px;
      border-top: 1px solid rgba(255,255,255,0.18);
      font-size: 14px; letter-spacing: 0.04em;
      color: rgba(255,255,255,0.55);
    }
    .dk-15 .dk-15-contact b {
      display: block; color: #FFFFFF; font-weight: 500;
      font-family: var(--font-display); font-size: 22px;
      letter-spacing: -0.01em; margin-top: 6px;
    }

    /* -------- SLIDE INDEX NAV -------- */
    .dk-index {
      display: flex; flex-wrap: wrap;
      gap: 8px;
      margin-top: var(--s-7);
      padding-top: var(--s-6);
      border-top: 1px solid var(--rule);
    }
    .dk-index__label {
      display: block; width: 100%;
      font-family: var(--font-mono);
      font-size: 11px; letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--fg-2);
      margin-bottom: 12px;
    }
    .dk-index__item {
      display: inline-flex; align-items: baseline; gap: 8px;
      padding: 8px 12px;
      border: 1px solid var(--rule);
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 12px;
      color: var(--fg);
      text-decoration: none;
      transition: border-color .15s ease, color .15s ease;
    }
    .dk-index__item:hover {
      border-color: var(--fg);
    }
    .dk-index__item b {
      font-family: var(--font-mono);
      font-size: 10px; letter-spacing: 0.1em;
      color: var(--fg-2);
      font-weight: 500;
    }

    /* -------- SLIDE GRID CARDS -------- */
    .dk-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--s-6);
      margin-top: var(--s-7);
    }
    @media (max-width: 1100px) { .dk-grid { grid-template-columns: 1fr; } }

    .dk-card__foot {
      padding: var(--s-5) var(--s-6);
      border-top: 1px solid var(--rule);
      background: var(--bg);
    }
    .dk-card__foot-head {
      display: flex; justify-content: space-between; align-items: baseline;
      margin-bottom: 10px;
    }
    .dk-card__foot-title {
      font-family: var(--font-display);
      font-size: 22px; letter-spacing: -0.01em;
    }
    .dk-card__foot-num {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.12em;
    }
    .dk-card__foot-body {
      font-size: var(--fs-sm); color: var(--fg-2); line-height: 1.55;
      max-width: 58ch;
    }
    .dk-card__rules {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: 12px 24px; margin-top: 16px;
      font-size: 12px;
    }
    .dk-card__rule {
      display: grid; grid-template-columns: auto auto 1fr; gap: 10px;
      align-items: baseline;
    }
    .dk-card__rule::before {
      content: ""; display: inline-block;
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--accent);
      transform: translateY(1px);
    }
    .dk-card__rule b { color: var(--fg); font-weight: 500; }
    .dk-card__rule span { color: var(--fg-2); }

    /* -------- RULES BAND -------- */
    .dk-rules-band {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: var(--s-7);
      background: var(--bg);
      margin-top: var(--s-8);
    }
    .dk-rules-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: var(--s-6);
      margin-top: var(--s-6);
    }
    @media (max-width: 1100px) { .dk-rules-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .dk-rules-grid { grid-template-columns: 1fr; } }
    .dk-rules-grid > div {
      padding-top: var(--s-4); border-top: 2px solid var(--fg);
    }
    .dk-rules-grid b {
      font-family: var(--font-display);
      font-size: 22px; letter-spacing: -0.01em; line-height: 1.2;
      display: block; margin-bottom: 10px;
    }
    .dk-rules-grid p { font-size: 14px; line-height: 1.55; color: var(--fg-2); margin: 0; }

    /* -------- SPECS TABLE -------- */
    .dk-specs {
      margin-top: var(--s-8);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
    }
    .dk-specs__row {
      display: grid; grid-template-columns: 200px 1fr;
      padding: 16px 24px; gap: 24px;
      border-top: 1px solid var(--rule);
      font-size: 14px;
    }
    .dk-specs__row:first-child { border-top: 0; }
    .dk-specs__row b { color: var(--fg); font-weight: 500; }
    .dk-specs__row span { color: var(--fg-2); font-family: var(--font-mono); font-size: 13px; }

    /* -------- CTA BAND -------- */
    .dk-cta {
      margin-top: var(--s-8);
      display: grid; grid-template-columns: 1fr auto;
      gap: var(--s-6); align-items: center;
      padding: var(--s-6) var(--s-7);
      background: var(--fg); color: var(--bg);
      border-radius: var(--r-3);
      border: 0;
      font: inherit; font-family: inherit;
      text-align: left;
      width: 100%;
      cursor: pointer;
      transition: background .2s ease, box-shadow .2s ease;
    }
    .dk-cta:hover { background: #1A2230; }
    [data-theme="dark"] .dk-cta:hover { background: #2B3544; }
    .dk-cta:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
    }
    .dk-cta h3 {
      font-family: var(--font-display);
      font-size: 28px; letter-spacing: -0.01em; margin: 0;
      line-height: 1.2;
      font-weight: 400;
    }
    .dk-cta h3 em { font-style: italic; color: var(--accent); }
    .dk-cta p { margin: 8px 0 0; opacity: 0.7; font-size: 14px; line-height: 1.55; }
    .dk-cta__arrow {
      font-size: 32px; font-family: var(--font-display);
      color: var(--accent);
      transition: transform .2s ease;
      display: inline-flex; align-items: center;
    }
    .dk-cta__arrow .lucide { width: 32px; height: 32px; stroke-width: 1.5; }
    .dk-cta:hover .dk-cta__arrow { transform: translateX(6px); }
    .dk-cta.is-requested { background: var(--accent); }
    .dk-cta.is-requested:hover { background: #B40224; }
    .dk-cta.is-requested .dk-cta__arrow { color: #fff; transform: none; font-size: 26px; }
    .dk-cta.is-requested .dk-cta__arrow .lucide { width: 26px; height: 26px; }
  </style>

  <!-- HERO -->
  <section class="dk-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">v0.3 · Slide deck template</span>
      <h1>Every deck, <em>same partnership voice</em>.</h1>
      <p class="dk-hero__lede">
        Fifteen canonical layouts in the locked-in editorial register. Use them as a starting kit for
        partnership pitches, case studies, service decks, and all-hands. Every slide uses the same type pairing,
        the same red-as-spotlight rule, and the same 56px outer margin.
      </p>

      <div class="dk-hero__meta">
        <div>Canvas<b>1920 × 1080 · 16:9</b></div>
        <div>Safe margin<b>56px outer</b></div>
        <div>Type<b>Newsreader + DM Sans</b></div>
        <div>Accent<b>Kilowott Red · one per slide</b></div>
      </div>

      <!-- Template downloads -->
      <div class="dk-downloads" role="group" aria-label="Download deck template">
        <div class="dk-downloads__row">
          <a class="dk-dl dk-dl--primary" href="${DECK_PPTX_URL}" download="Kilowott — Partnership Deck Template.pptx">
            <span class="dk-dl__label">
              <span class="dk-dl__eyebrow">Download</span>
              <span class="dk-dl__title">Deck template · .pptx</span>
              <span class="dk-dl__meta">634 KB · 15 slides · 1920 × 1080</span>
            </span>
            <i data-lucide="download" class="dk-dl__icon"></i>
          </a>
          ${DECK_SLIDES_URL ? `
          <a class="dk-dl" href="${DECK_SLIDES_URL}" target="_blank" rel="noopener">
            <span class="dk-dl__label">
              <span class="dk-dl__eyebrow">Open in</span>
              <span class="dk-dl__title">Google Slides</span>
              <span class="dk-dl__meta">Forces a copy &mdash; edit your own</span>
            </span>
            <i data-lucide="external-link" class="dk-dl__icon"></i>
          </a>
          ` : `
          <div class="dk-dl dk-dl--pending" aria-disabled="true">
            <span class="dk-dl__label">
              <span class="dk-dl__eyebrow">Coming</span>
              <span class="dk-dl__title">Google Slides copy</span>
              <span class="dk-dl__meta">Upload .pptx to Drive &rarr; Open with Slides &rarr; share</span>
            </span>
            <i data-lucide="upload-cloud" class="dk-dl__icon"></i>
          </div>
          `}
        </div>
        <p class="dk-downloads__note">
          The <b>.pptx</b> opens natively in Keynote, PowerPoint, and &mdash; once uploaded to Drive &mdash; Google Slides. Fonts <span class="mono">Newsreader</span> and <span class="mono">DM Sans</span> are Google Fonts, so Slides renders without substitution.
        </p>
      </div>

      <nav class="dk-index" aria-label="Slide index">
        <span class="dk-index__label">Jump to layout</span>
        <a class="dk-index__item" href="#dk-slide-01"><b>01</b> Title</a>
        <a class="dk-index__item" href="#dk-slide-02"><b>02</b> Section divider</a>
        <a class="dk-index__item" href="#dk-slide-03"><b>03</b> Content &middot; 2-col</a>
        <a class="dk-index__item" href="#dk-slide-04"><b>04</b> Stat</a>
        <a class="dk-index__item" href="#dk-slide-05"><b>05</b> Quote</a>
        <a class="dk-index__item" href="#dk-slide-06"><b>06</b> Image</a>
        <a class="dk-index__item" href="#dk-slide-07"><b>07</b> Closing</a>
        <a class="dk-index__item" href="#dk-slide-08"><b>08</b> Agenda</a>
        <a class="dk-index__item" href="#dk-slide-09"><b>09</b> Team</a>
        <a class="dk-index__item" href="#dk-slide-10"><b>10</b> Timeline</a>
        <a class="dk-index__item" href="#dk-slide-11"><b>11</b> Pricing</a>
        <a class="dk-index__item" href="#dk-slide-12"><b>12</b> Comparison</a>
        <a class="dk-index__item" href="#dk-slide-13"><b>13</b> Logo wall</a>
        <a class="dk-index__item" href="#dk-slide-14"><b>14</b> Chart</a>
        <a class="dk-index__item" href="#dk-slide-15"><b>15</b> Thank you</a>
      </nav>
    </div>
  </section>

  <!-- SLIDE GRID -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">The fifteen layouts</h2>
        <p class="section-head__body">Pick the layout that fits the idea — don&rsquo;t fight it. Covers open, section dividers break, content carries argument, stats earn weight, quotes borrow authority, images give air, and closings ask. Beyond the core seven: agendas, teams, timelines, pricing, comparisons, logo walls, charts, and the thank-you send-off.</p>
      </div>

      <div class="dk-grid">

        <!-- ================ 01 TITLE ================ -->
        <article class="dk-slide-wrap" id="dk-slide-01">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">01 · Title</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot dk-slide-head__dot--accent"></i>paper</span>
              <span>serif display</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-01">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-01-body">
                <div class="dk-eyebrow dk-eyebrow--accent">A partnership proposal &middot; May 2026</div>
                <h1>Scale faster. Deliver better. <em>Create impact.</em></h1>
              </div>
              <div class="dk-01-meta">
                <div>Prepared for<b>Acme Inc. · Leadership</b></div>
                <div>Prepared by<b>Kilowott · Sandnes</b></div>
                <div>Confidential<b>Internal draft v1</b></div>
              </div>
              <div class="dk-chrome-footer">
                <span>kilowott.com</span>
                <span class="dk-chrome-footer__page">01</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Title / Cover</span>
              <span class="dk-card__foot-num">01 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Open on paper with one confident headline. One emphasis word in italic red. Keep metadata small and truthful.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Headline</b><span>80–140px · serif · max 8 words</span></div>
              <div class="dk-card__rule"><b>Eyebrow</b><span>doc type + date</span></div>
              <div class="dk-card__rule"><b>Metadata</b><span>3 columns max, footer-anchored</span></div>
              <div class="dk-card__rule"><b>Red</b><span>one italic word only</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 02 SECTION DIVIDER ================ -->
        <article class="dk-slide-wrap" id="dk-slide-02">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">02 · Section divider</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>ink</span>
              <span>breathe</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-02">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-02-num">02 / Section</div>
              <div class="dk-02-body">
                <div class="dk-eyebrow" style="color:#E4022D;">Chapter two</div>
                <h2>How we <em>partner</em>, not how we pitch.</h2>
                <p>Four practices &mdash; Brands, Agencies, Intelligence, Workforce &mdash; under one accountable team.</p>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott · 2026</span>
                <span class="dk-chrome-footer__page">12</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Section divider</span>
              <span class="dk-card__foot-num">02 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              A hard break on ink. Use between major sections — never for subheadings. The only slide type that goes dark by default.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Canvas</b><span>#0B0F14 ink, always</span></div>
              <div class="dk-card__rule"><b>Counter</b><span>mono, top-left</span></div>
              <div class="dk-card__rule"><b>Title</b><span>90–110px · serif</span></div>
              <div class="dk-card__rule"><b>Supporting line</b><span>one sentence, optional</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 03 CONTENT 2-COL ================ -->
        <article class="dk-slide-wrap" id="dk-slide-03">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">03 · Content · 2-col</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>paper</span>
              <span>3–5 points</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-03">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-03-grid">
                <div>
                  <div class="dk-eyebrow dk-eyebrow--accent">The partnership model</div>
                  <h2>Four practices, <em>one</em> accountable team.</h2>
                  <p class="dk-03-lede">Every engagement pulls from the same four practices &mdash; so strategy, execution, and ownership sit inside one team, not across three contracts.</p>
                </div>
                <div class="dk-03-points">
                  <div class="dk-03-point">
                    <span class="dk-03-point__n">01</span>
                    <div class="dk-03-point__body">
                      <b>Kilowott for Brands</b>
                      <p>Strategy plus hands-on execution, with full operational ownership of the delivery.</p>
                    </div>
                  </div>
                  <div class="dk-03-point">
                    <span class="dk-03-point__n">02</span>
                    <div class="dk-03-point__body">
                      <b>Kilowott for Agencies</b>
                      <p>Embedded specialists integrated into your team &mdash; two flexible models, measured in ROI.</p>
                    </div>
                  </div>
                  <div class="dk-03-point">
                    <span class="dk-03-point__n">03</span>
                    <div class="dk-03-point__body">
                      <b>Kilowott Intelligence</b>
                      <p>AI systems paired with human oversight &mdash; reliable, goal-driven, accountable.</p>
                    </div>
                  </div>
                  <div class="dk-03-point">
                    <span class="dk-03-point__n">04</span>
                    <div class="dk-03-point__body">
                      <b>Kilowott Workforce</b>
                      <p>Cross-functional teams that extend your capability without the overhead of building from scratch.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott · Confidential</span>
                <span class="dk-chrome-footer__page">14</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Content · 2-column</span>
              <span class="dk-card__foot-num">03 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Argument on the left, evidence on the right. Maximum 5 points — if there are more, split across two slides. Never turn this into a bullet list.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Left column</b><span>headline + 1 lede paragraph</span></div>
              <div class="dk-card__rule"><b>Right column</b><span>3–5 titled points</span></div>
              <div class="dk-card__rule"><b>Counter</b><span>mono, 01/02/03 prefix</span></div>
              <div class="dk-card__rule"><b>Red</b><span>only on headline italic word</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 04 STAT / HERO METRIC ================ -->
        <article class="dk-slide-wrap" id="dk-slide-04">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">04 · Stat</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot dk-slide-head__dot--accent"></i>warm</span>
              <span>one number</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-04">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-04-body">
                <div class="dk-04-num">14<sup>&times;</sup></div>
                <div class="dk-04-right">
                  <div class="dk-eyebrow" style="color:#0B0F14;">The proof</div>
                  <h2>Faster delivery than an in-house baseline over a 12-month window.</h2>
                  <p>Across 9 enterprise programs run since 2022, measured against each client&rsquo;s pre-engagement internal velocity.</p>
                  <div class="dk-04-source">Source · Kilowott program ops · 2024 benchmark</div>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott · Proof</span>
                <span class="dk-chrome-footer__page">18</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Stat / hero metric</span>
              <span class="dk-card__foot-num">04 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              One number earns the whole slide. Warm canvas signals &ldquo;proof&rdquo; &mdash; distinct from argument slides. Always cite the source, never bury it.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Canvas</b><span>#F6F4F0 warm paper</span></div>
              <div class="dk-card__rule"><b>Number</b><span>240–320px · red · serif</span></div>
              <div class="dk-card__rule"><b>Unit</b><span>as italic superscript</span></div>
              <div class="dk-card__rule"><b>Source line</b><span>mono, mandatory</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 05 QUOTE ================ -->
        <article class="dk-slide-wrap" id="dk-slide-05">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">05 · Quote</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>paper</span>
              <span>borrowed voice</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-05">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-05-mark">&ldquo;</div>
              <div class="dk-05-body">
                <blockquote>[Pull quote — replace with a real client testimonial. <em>Italicise the accent word</em>. Two lines max.]</blockquote>
              </div>
              <div class="dk-05-cite">
                <div class="dk-05-avatar">—</div>
                <div>
                  <b>[Client name]</b>
                  <span>[Title · Company · Engagement context]</span>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott · Client voice</span>
                <span class="dk-chrome-footer__page">24</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Quote / testimonial</span>
              <span class="dk-card__foot-num">05 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Let someone else say the strong thing. Keep the quote under 20 words &mdash; if it&rsquo;s longer, you&rsquo;re quoting too much. The italic hit carries the red.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Quote</b><span>&lt;20 words · serif 60–72px</span></div>
              <div class="dk-card__rule"><b>Opening mark</b><span>display italic · red · 180px</span></div>
              <div class="dk-card__rule"><b>Attribution</b><span>name · role · org</span></div>
              <div class="dk-card__rule"><b>Avatar</b><span>monogram, not photo (default)</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 06 IMAGE ================ -->
        <article class="dk-slide-wrap" id="dk-slide-06">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">06 · Image · full-bleed</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>ink</span>
              <span>atmosphere</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-06">
              <div class="dk-06-image"></div>
              <div class="dk-06-scrim"></div>
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-06-body">
                <div class="dk-eyebrow" style="color:#E4022D;">Case study · Food &amp; Beverage</div>
                <h2>A coffee brand, <em>reshaped</em> in six months.</h2>
                <p class="dk-06-cap">Brand refresh, paid search, and a rebuilt DTC funnel &mdash; sales up 44% against pre-engagement baseline.</p>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott · Case study</span>
                <span class="dk-chrome-footer__page">28</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Image / full-bleed</span>
              <span class="dk-card__foot-num">06 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              An image should have a reason. Full-bleed with a dark gradient scrim from 40% down. Type sits on the bottom third, never the middle.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Image</b><span>full-bleed, no inset</span></div>
              <div class="dk-card__rule"><b>Scrim</b><span>180deg linear, #0B0F14 → transparent</span></div>
              <div class="dk-card__rule"><b>Headline</b><span>bottom-left third only</span></div>
              <div class="dk-card__rule"><b>Logo</b><span>white, top-left, always</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 07 CLOSING ================ -->
        <article class="dk-slide-wrap" id="dk-slide-07">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">07 · Closing · CTA</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot dk-slide-head__dot--accent"></i>paper</span>
              <span>one ask</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-07">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-07-body">
                <div class="dk-eyebrow dk-eyebrow--accent">Next</div>
                <h1>Let&rsquo;s build the <em>partnership</em>.</h1>
              </div>
              <div class="dk-07-contact">
                <div>Reach the team<b>hello@kilowott.com</b></div>
                <div>Visit<b>kilowott.com</b></div>
                <div>Proposal ref<b>KW-2026-0418</b></div>
              </div>
              <div class="dk-chrome-footer">
                <span>Thank you</span>
                <span class="dk-chrome-footer__page">32</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Closing / CTA</span>
              <span class="dk-card__foot-num">07 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              One ask, one sentence. Three contact points maximum. Never use this for &ldquo;thank you, questions?&rdquo; on its own &mdash; give the reader somewhere to go.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Headline</b><span>the ask, italic red verb</span></div>
              <div class="dk-card__rule"><b>Contacts</b><span>3 columns max</span></div>
              <div class="dk-card__rule"><b>Eyebrow</b><span>&ldquo;Next&rdquo; / &ldquo;Discuss&rdquo; / &ldquo;Start&rdquo;</span></div>
              <div class="dk-card__rule"><b>No &ldquo;Questions?&rdquo;</b><span>end on an action, not a prompt</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 08 AGENDA / TOC ================ -->
        <article class="dk-slide-wrap" id="dk-slide-08">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">08 · Agenda</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>paper</span>
              <span>5 items max</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-08">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-08-grid">
                <div>
                  <div class="dk-eyebrow dk-eyebrow--accent">Agenda</div>
                  <h2>What we&rsquo;ll <em>cover</em>.</h2>
                  <p class="dk-08-lede">Forty minutes, five sections, one recommendation at the end.</p>
                </div>
                <div class="dk-08-list">
                  <div class="dk-08-item">
                    <span class="dk-08-item__n">01</span>
                    <div class="dk-08-item__body">
                      <b>Where you are today</b>
                      <p>A short read of the market shift and the capability gap you&rsquo;ve flagged.</p>
                    </div>
                  </div>
                  <div class="dk-08-item">
                    <span class="dk-08-item__n">02</span>
                    <div class="dk-08-item__body">
                      <b>The partnership model</b>
                      <p>Four practices, one accountable team &mdash; how an engagement runs.</p>
                    </div>
                  </div>
                  <div class="dk-08-item">
                    <span class="dk-08-item__n">03</span>
                    <div class="dk-08-item__body">
                      <b>Proof from similar programs</b>
                      <p>Three comparable clients, their numbers, what shifted in month three.</p>
                    </div>
                  </div>
                  <div class="dk-08-item">
                    <span class="dk-08-item__n">04</span>
                    <div class="dk-08-item__body">
                      <b>A first 90-day plan</b>
                      <p>Specific workstreams, decision gates, and the team we&rsquo;d put on it.</p>
                    </div>
                  </div>
                  <div class="dk-08-item">
                    <span class="dk-08-item__n">05</span>
                    <div class="dk-08-item__body">
                      <b>Commercials &amp; next steps</b>
                      <p>Investment, governance, and what we&rsquo;d need from your side to start.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; 2026</span>
                <span class="dk-chrome-footer__page">08</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Agenda / TOC</span>
              <span class="dk-card__foot-num">08 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Promise the shape of the conversation so the room can relax. Maximum 5 sections &mdash; if there are more, you&rsquo;re over-scoping the meeting.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Items</b><span>5 max, numbered 01&ndash;05</span></div>
              <div class="dk-card__rule"><b>Left column</b><span>eyebrow + serif title + lede</span></div>
              <div class="dk-card__rule"><b>Item title</b><span>28px serif, one-line description</span></div>
              <div class="dk-card__rule"><b>Red</b><span>on headline italic verb only</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 09 TEAM / BIOS ================ -->
        <article class="dk-slide-wrap" id="dk-slide-09">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">09 · Team</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>paper</span>
              <span>4-up grid</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-09">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-09-head">
                <div class="dk-eyebrow dk-eyebrow--accent">The team on this</div>
                <h2>The people <em>accountable</em> for the outcome.</h2>
              </div>
              <div class="dk-09-grid">
                <div class="dk-09-card">
                  <div class="dk-09-avatar">A</div>
                  <b>Aaron Holm</b>
                  <span class="dk-09-role">Partnership Lead</span>
                  <p>Fifteen years shaping brand and growth programs for Nordic and US enterprises.</p>
                </div>
                <div class="dk-09-card dk-09-card--accent">
                  <div class="dk-09-avatar">M</div>
                  <b>Maya Ravn</b>
                  <span class="dk-09-role">Strategy Director</span>
                  <p>Turns messy business problems into shippable plans &mdash; and then ships them.</p>
                </div>
                <div class="dk-09-card">
                  <div class="dk-09-avatar">J</div>
                  <b>Jonas Kleiva</b>
                  <span class="dk-09-role">Engineering Principal</span>
                  <p>Builds the systems underneath the brand &mdash; data, platforms, and AI pipelines.</p>
                </div>
                <div class="dk-09-card">
                  <div class="dk-09-avatar">S</div>
                  <b>Sara Lindgren</b>
                  <span class="dk-09-role">Design Principal</span>
                  <p>Holds the editorial craft bar across every surface the partnership ships.</p>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; Team</span>
                <span class="dk-chrome-footer__page">09</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Team / bios</span>
              <span class="dk-card__foot-num">09 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Faces for the work. Four is the max before the grid stops breathing &mdash; split across two slides if the whole pod is bigger. One italic word on headline carries the red.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Grid</b><span>4-up, equal columns</span></div>
              <div class="dk-card__rule"><b>Avatar</b><span>96px circular, monogram default</span></div>
              <div class="dk-card__rule"><b>Role</b><span>sans caps, 11px, muted</span></div>
              <div class="dk-card__rule"><b>Bio</b><span>one sentence, 14px</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 10 TIMELINE / ROADMAP ================ -->
        <article class="dk-slide-wrap" id="dk-slide-10">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">10 · Timeline</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot dk-slide-head__dot--accent"></i>paper</span>
              <span>5 quarters</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-10">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-10-head">
                <div class="dk-eyebrow dk-eyebrow--accent">Roadmap &middot; 2026&ndash;2027</div>
                <h2>Fifteen months, <em>five</em> milestone gates.</h2>
              </div>
              <div class="dk-10-track">
                <div class="dk-10-axis"></div>
                <div class="dk-10-cols">
                  <div class="dk-10-col">
                    <span class="dk-10-q">Q2 &middot; 2026</span>
                    <div class="dk-10-milestones">
                      <span class="dk-10-m">Discovery &amp; audit</span>
                      <span class="dk-10-m">Brand platform draft</span>
                      <span class="dk-10-m">Team onboarding</span>
                    </div>
                  </div>
                  <div class="dk-10-col dk-10-col--now">
                    <span class="dk-10-q">Q3 &middot; 2026</span>
                    <div class="dk-10-milestones">
                      <span class="dk-10-m dk-10-m--accent">Launch phase 1 site</span>
                      <span class="dk-10-m">Editorial system ships</span>
                      <span class="dk-10-m">First campaign in-market</span>
                    </div>
                  </div>
                  <div class="dk-10-col">
                    <span class="dk-10-q">Q4 &middot; 2026</span>
                    <div class="dk-10-milestones">
                      <span class="dk-10-m">CRM + data layer</span>
                      <span class="dk-10-m">Partner program pilot</span>
                    </div>
                  </div>
                  <div class="dk-10-col">
                    <span class="dk-10-q">Q1 &middot; 2027</span>
                    <div class="dk-10-milestones">
                      <span class="dk-10-m">AI ops handover</span>
                      <span class="dk-10-m">Growth benchmark review</span>
                      <span class="dk-10-m">International rollout</span>
                    </div>
                  </div>
                  <div class="dk-10-col">
                    <span class="dk-10-q">Q2 &middot; 2027</span>
                    <div class="dk-10-milestones">
                      <span class="dk-10-m">Internal team takeover</span>
                      <span class="dk-10-m">Partnership renewal</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; Roadmap</span>
                <span class="dk-chrome-footer__page">10</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Timeline / roadmap</span>
              <span class="dk-card__foot-num">10 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Time across the x-axis, milestones stacked under each quarter. One red milestone per roadmap &mdash; it marks the current focus, not the grand finale.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Axis</b><span>horizontal, 5 quarters</span></div>
              <div class="dk-card__rule"><b>Milestones</b><span>2&ndash;3 per quarter max</span></div>
              <div class="dk-card__rule"><b>Current focus</b><span>red node + red milestone</span></div>
              <div class="dk-card__rule"><b>Labels</b><span>mono, uppercase, tracked</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 11 PRICING TIERS ================ -->
        <article class="dk-slide-wrap" id="dk-slide-11">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">11 · Pricing</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot dk-slide-head__dot--accent"></i>paper</span>
              <span>3 tiers</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-11">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-11-head">
                <div class="dk-eyebrow dk-eyebrow--accent">Partnership tiers</div>
                <h2>Commit to the <em>depth</em> that fits the work.</h2>
              </div>
              <div class="dk-11-tiers">
                <div class="dk-11-tier">
                  <div class="dk-11-tier__name">Starter</div>
                  <div class="dk-11-tier__price">12k<sup>/mo</sup></div>
                  <div class="dk-11-tier__price-note">For scoped engagements</div>
                  <ul class="dk-11-tier__features">
                    <li>Dedicated strategist</li>
                    <li>Up to 2 workstreams</li>
                    <li>Bi-weekly reviews</li>
                    <li>Shared delivery pod</li>
                    <li>Quarterly benchmarks</li>
                  </ul>
                  <div class="dk-11-tier__cta">Start here</div>
                </div>
                <div class="dk-11-tier dk-11-tier--featured">
                  <span class="dk-11-pill">Most partners</span>
                  <div class="dk-11-tier__name">Partnership</div>
                  <div class="dk-11-tier__price">28k<sup>/mo</sup></div>
                  <div class="dk-11-tier__price-note">Full team embedded</div>
                  <ul class="dk-11-tier__features">
                    <li>Partnership lead + pod</li>
                    <li>Unlimited workstreams</li>
                    <li>Weekly operating cadence</li>
                    <li>Full design + engineering</li>
                    <li>Executive governance</li>
                  </ul>
                  <div class="dk-11-tier__cta">Build the partnership</div>
                </div>
                <div class="dk-11-tier">
                  <div class="dk-11-tier__name">Enterprise</div>
                  <div class="dk-11-tier__price">Custom</div>
                  <div class="dk-11-tier__price-note">Multi-market programs</div>
                  <ul class="dk-11-tier__features">
                    <li>Multi-pod deployment</li>
                    <li>Dedicated AI &amp; data team</li>
                    <li>24/7 operational coverage</li>
                    <li>Regional legal &amp; compliance</li>
                    <li>Custom SLAs</li>
                  </ul>
                  <div class="dk-11-tier__cta">Talk to leadership</div>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; Commercials</span>
                <span class="dk-chrome-footer__page">11</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Pricing tiers</span>
              <span class="dk-card__foot-num">11 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Three tiers, one recommended. The accent border and pill pull the eye to the middle card without shouting. Never more than 5 feature checks per tier.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Tiers</b><span>3 max, middle featured</span></div>
              <div class="dk-card__rule"><b>Price</b><span>60px display serif</span></div>
              <div class="dk-card__rule"><b>Features</b><span>5 bullets, red checkmarks</span></div>
              <div class="dk-card__rule"><b>Pill</b><span>mono, red bg, top-left offset</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 12 COMPARISON ================ -->
        <article class="dk-slide-wrap" id="dk-slide-12">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">12 · Comparison</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot dk-slide-head__dot--accent"></i>paper</span>
              <span>5-row table</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-12">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-12-head">
                <div class="dk-eyebrow dk-eyebrow--accent">Old way vs. partnership</div>
                <h2>The difference is <em>ownership</em>, not headcount.</h2>
              </div>
              <div class="dk-12-table">
                <div></div>
                <div class="dk-12-col-head">The old way</div>
                <div class="dk-12-col-head dk-12-col-head--kw">The Kilowott way</div>

                <div class="dk-12-row-label">Time to first ship</div>
                <div class="dk-12-cell">6&ndash;9 months of RFPs, vendor onboarding, contract ping-pong.</div>
                <div class="dk-12-cell dk-12-cell--kw"><b>Six weeks</b> to a live first surface, measured against the same brief.</div>

                <div class="dk-12-row-label">Cost shape</div>
                <div class="dk-12-cell">Fixed-bid quotes that balloon on change orders and scope creep.</div>
                <div class="dk-12-cell dk-12-cell--kw"><b>Predictable monthly</b> investment, scaled by the work that actually lands.</div>

                <div class="dk-12-row-label">Ownership</div>
                <div class="dk-12-cell">You brief, approve, and absorb every handoff gap between agencies.</div>
                <div class="dk-12-cell dk-12-cell--kw"><b>One accountable</b> pod owns strategy through live operations.</div>

                <div class="dk-12-row-label">Risk</div>
                <div class="dk-12-cell">Failure modes surface at launch, when the cost of a pivot is highest.</div>
                <div class="dk-12-cell dk-12-cell--kw"><b>Weekly operating</b> cadence exposes risk before it gets expensive.</div>

                <div class="dk-12-row-label">Outcome</div>
                <div class="dk-12-cell">A deliverable. Maybe two. Handed over to the internal team to run.</div>
                <div class="dk-12-cell dk-12-cell--kw"><b>A running program</b> &mdash; and a team trained to take it in-house.</div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; Comparison</span>
                <span class="dk-chrome-footer__page">12</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Comparison</span>
              <span class="dk-card__foot-num">12 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Side-by-side contrast, five rows. The right column carries the red tint &mdash; small, not garish. Every row is a real trade-off, not a straw man.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Rows</b><span>5 max, mono row labels</span></div>
              <div class="dk-card__rule"><b>Columns</b><span>old way vs. Kilowott way</span></div>
              <div class="dk-card__rule"><b>Right column</b><span>red header + 4% red tint bg</span></div>
              <div class="dk-card__rule"><b>Emphasis</b><span>serif bold on lead phrase</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 13 LOGO WALL / CLIENTS ================ -->
        <article class="dk-slide-wrap" id="dk-slide-13">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">13 · Logo wall</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>warm</span>
              <span>5&times;2 grid</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-13">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-13-head">
                <div class="dk-eyebrow dk-eyebrow--accent">Working with</div>
                <h2>Some of the partnerships <em>behind</em> the work.</h2>
              </div>
              <!-- Real Kilowott clients per kilowott.com -->
              <div class="dk-13-wall">
                <div class="dk-13-logo">Marriott</div>
                <div class="dk-13-logo dk-13-logo--caps">Bosch</div>
                <div class="dk-13-logo">Pepe Jeans</div>
                <div class="dk-13-logo dk-13-logo--mono">NETFLIX</div>
                <div class="dk-13-logo">Radisson</div>
                <div class="dk-13-logo dk-13-logo--caps">Mazda</div>
                <div class="dk-13-logo">Nissan</div>
                <div class="dk-13-logo dk-13-logo--mono">STIHL</div>
                <div class="dk-13-logo">Craft</div>
                <div class="dk-13-logo dk-13-logo--caps">Showcar</div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; Clients</span>
                <span class="dk-chrome-footer__page">13</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Logo wall / clients</span>
              <span class="dk-card__foot-num">13 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              Proof at a glance. Ten logos, even grid, warm paper canvas. Keep wordmarks muted so no single client hijacks the wall.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Canvas</b><span>#F6F4F0 warm paper</span></div>
              <div class="dk-card__rule"><b>Grid</b><span>5&times;2 cells, thin rules</span></div>
              <div class="dk-card__rule"><b>Wordmarks</b><span>mixed serif/sans caps/mono</span></div>
              <div class="dk-card__rule"><b>Color</b><span>ink, 55% opacity &mdash; no full black</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 14 CHART SLIDE ================ -->
        <article class="dk-slide-wrap" id="dk-slide-14">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">14 · Chart</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot dk-slide-head__dot--accent"></i>paper</span>
              <span>2 series</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-14">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <div class="dk-14-grid">
                <div>
                  <div class="dk-eyebrow dk-eyebrow--accent">Run-rate growth</div>
                  <h2>Two years, the curve <em>bent</em>.</h2>
                  <p class="dk-14-lede">Monthly revenue against internal target, from the start of the partnership in Q1 2024 through today.</p>
                </div>
                <div class="dk-14-chart-wrap">
                  <svg class="dk-14-chart" viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet" aria-label="Growth chart">
                    <!-- grid rules -->
                    <g stroke="rgba(11,15,20,0.08)" stroke-width="1">
                      <line x1="40" y1="40" x2="620" y2="40"/>
                      <line x1="40" y1="110" x2="620" y2="110"/>
                      <line x1="40" y1="180" x2="620" y2="180"/>
                      <line x1="40" y1="250" x2="620" y2="250"/>
                      <line x1="40" y1="280" x2="620" y2="280"/>
                    </g>
                    <!-- y-axis labels -->
                    <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="10" fill="rgba(11,15,20,0.45)" text-anchor="end">
                      <text x="34" y="44">4.0x</text>
                      <text x="34" y="114">3.0x</text>
                      <text x="34" y="184">2.0x</text>
                      <text x="34" y="254">1.0x</text>
                      <text x="34" y="284">0</text>
                    </g>
                    <!-- x-axis labels (24 months, label every 4th) -->
                    <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="10" fill="rgba(11,15,20,0.45)" text-anchor="middle">
                      <text x="40" y="302">Q1 &apos;24</text>
                      <text x="136" y="302">Q3 &apos;24</text>
                      <text x="232" y="302">Q1 &apos;25</text>
                      <text x="328" y="302">Q3 &apos;25</text>
                      <text x="424" y="302">Q1 &apos;26</text>
                      <text x="520" y="302">Q3 &apos;26</text>
                      <text x="620" y="302">Now</text>
                    </g>
                    <!-- baseline (target) series - ink, dashed-ish light -->
                    <polyline fill="none" stroke="#0B0F14" stroke-width="1.5" stroke-opacity="0.5"
                      points="40,258 65,255 90,252 115,250 140,247 165,245 190,242 215,240 240,238 265,236 290,234 315,232 340,230 365,228 390,226 415,224 440,222 465,220 490,218 515,216 540,214 565,212 590,210 620,208"/>
                    <!-- actual (accent) series - red curve -->
                    <polyline fill="none" stroke="#E4022D" stroke-width="2.5"
                      points="40,260 65,255 90,248 115,244 140,238 165,230 190,222 215,214 240,204 265,192 290,178 315,164 340,148 365,132 390,118 415,104 440,92 465,80 490,72 515,66 540,60 565,54 590,48 620,42"/>
                    <!-- end-point dots -->
                    <circle cx="620" cy="208" r="3" fill="#0B0F14" fill-opacity="0.5"/>
                    <circle cx="620" cy="42" r="4" fill="#E4022D"/>
                  </svg>
                  <div class="dk-14-legend">
                    <span><i></i>Target run-rate</span>
                    <span><i class="is-accent"></i>Actual</span>
                  </div>
                </div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; Performance</span>
                <span class="dk-chrome-footer__page">14</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Chart slide</span>
              <span class="dk-card__foot-num">14 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              One chart, one point. Two series max &mdash; baseline and actual. Red for the line that matters, ink for the reference. Always label the end-points.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Series</b><span>2 max, ink + red</span></div>
              <div class="dk-card__rule"><b>Axis labels</b><span>mono, 10px, muted</span></div>
              <div class="dk-card__rule"><b>Endpoints</b><span>dots, red is larger</span></div>
              <div class="dk-card__rule"><b>Legend</b><span>mono caps, 11px</span></div>
            </div>
          </div>
        </article>

        <!-- ================ 15 THANK YOU / Q&A ================ -->
        <article class="dk-slide-wrap" id="dk-slide-15" style="grid-column: 1 / -1;">
          <div class="dk-slide-head">
            <span class="dk-slide-head__title">15 · Thank you</span>
            <span class="dk-slide-head__meta">
              <span><i class="dk-slide-head__dot"></i>ink</span>
              <span>one send-off</span>
            </span>
          </div>
          <div class="dk-slide-stage">
            <div class="dk-slide dk-15">
              <div class="dk-chrome-logo" aria-label="Kilowott"></div>
              <span class="dk-15-page">15 / 15</span>
              <div class="dk-15-body">
                <div class="dk-eyebrow" style="color:#E4022D;">Q&amp;A</div>
                <h1>Thank <em>you</em>.</h1>
              </div>
              <div class="dk-15-contact">
                <div>Email<b>hello@kilowott.com</b></div>
                <div>LinkedIn<b>/company/kilowott</b></div>
                <div>Next step<b>Book a working session</b></div>
              </div>
              <div class="dk-chrome-footer">
                <span>Kilowott &middot; 2026</span>
                <span class="dk-chrome-footer__page">15</span>
              </div>
            </div>
          </div>
          <div class="dk-card__foot">
            <div class="dk-card__foot-head">
              <span class="dk-card__foot-title">Thank you / Q&amp;A</span>
              <span class="dk-card__foot-num">15 / 15</span>
            </div>
            <p class="dk-card__foot-body">
              The closing grace note. Ink canvas signals end-of-deck. The italic red lands on a single word &mdash; usually &ldquo;you&rdquo; or the verb of the ask. Keep contacts to three lines.
            </p>
            <div class="dk-card__rules">
              <div class="dk-card__rule"><b>Canvas</b><span>#0B0F14 ink</span></div>
              <div class="dk-card__rule"><b>Headline</b><span>180px serif, italic red word</span></div>
              <div class="dk-card__rule"><b>Page counter</b><span>mono, top-right, &ldquo;15 / 15&rdquo;</span></div>
              <div class="dk-card__rule"><b>Contacts</b><span>3 columns: email, social, action</span></div>
            </div>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- HOUSE RULES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Four rules, every deck</h2>
        <p class="section-head__body">If a slide doesn&rsquo;t obey these, it isn&rsquo;t on-brand &mdash; it doesn&rsquo;t matter how pretty it is.</p>
      </div>

      <div class="dk-rules-band">
        <div class="dk-rules-grid">
          <div>
            <b>One red per slide</b>
            <p>The accent is a spotlight, not a wash. One italic word, one stat number, or one eyebrow &mdash; never all three.</p>
          </div>
          <div>
            <b>56px outer margin</b>
            <p>The safe margin is non-negotiable. Logo top-left, page number bottom-right, content everywhere in between.</p>
          </div>
          <div>
            <b>Never bullet lists</b>
            <p>If you need bullets, use the numbered 2-col content slide. A plain &bull; bulleted list is a design failure.</p>
          </div>
          <div>
            <b>Dark is for breaks</b>
            <p>Ink (#0B0F14) is reserved for section dividers and full-bleed image slides. Paper is the default canvas.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SPECS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Canvas &amp; specs</h2>
        <p class="section-head__body">The fixed grid every slide is built on. Keep to these numbers and the deck will hold together across decks, tools, and export formats.</p>
      </div>

      <div class="dk-specs">
        <div class="dk-specs__row"><b>Canvas</b><span>1920 × 1080px · 16:9 · 100% zoom</span></div>
        <div class="dk-specs__row"><b>Safe margin (outer)</b><span>56px on all sides</span></div>
        <div class="dk-specs__row"><b>Logo placement</b><span>Top-left, 48px from top, 56px from left, height 18–22px</span></div>
        <div class="dk-specs__row"><b>Page number</b><span>Bottom-right, mono, 12px, 36px from bottom</span></div>
        <div class="dk-specs__row"><b>Headline (cover)</b><span>Newsreader, 400 wt, 100–140px, letter-spacing -0.025em</span></div>
        <div class="dk-specs__row"><b>Headline (content)</b><span>Newsreader, 400 wt, 60–84px, letter-spacing -0.02em</span></div>
        <div class="dk-specs__row"><b>Eyebrow</b><span>DM Sans, 500 wt, 14px, tracking 0.22em, uppercase</span></div>
        <div class="dk-specs__row"><b>Body</b><span>DM Sans, 400 wt, 17–18px, line-height 1.5</span></div>
        <div class="dk-specs__row"><b>Canvas colors</b><span>Paper #FFFFFF · Ink #0B0F14 · Warm #F6F4F0</span></div>
        <div class="dk-specs__row"><b>Accent</b><span>Kilowott Red #E4022D · one instance per slide</span></div>
      </div>

      <button class="dk-cta" type="button" data-cta="starter-deck">
        <div>
          <h3>Want this as an <em>editable</em> starter deck?</h3>
          <p>v0.4 ships the same fifteen layouts as a Keynote + PowerPoint template with real content presets.</p>
        </div>
        <div class="dk-cta__arrow"><i data-lucide="arrow-right"></i></div>
      </button>
    </div>
  </section>
  `;

  // Fit slides to container widths.
  const fit = () => {
    const stages = root.querySelectorAll('.dk-slide-stage');
    stages.forEach(stage => {
      const slide = stage.querySelector('.dk-slide');
      if (!slide) return;
      const available = stage.clientWidth - 64; // padding
      const scale = Math.min(available / 1280, 1);
      slide.style.setProperty('--dk-scale', scale.toFixed(4));
    });
  };
  fit();
  window.addEventListener('resize', fit);
  // Re-fit after fonts load
  if (document.fonts) document.fonts.ready.then(fit);

  // Starter-deck CTA — swap to confirmed state on click
  const cta = root.querySelector('[data-cta="starter-deck"]');
  if (cta) {
    cta.addEventListener('click', () => {
      if (cta.classList.contains('is-requested')) return;
      cta.classList.add('is-requested');
      const h3 = cta.querySelector('h3');
      const p = cta.querySelector('p');
      const arrow = cta.querySelector('.dk-cta__arrow');
      if (h3) h3.innerHTML = 'Requested &mdash; <em>you&rsquo;re on the list.</em>';
      if (p)  p.textContent = 'We\u2019ll ping you when v0.4 lands. Meanwhile, every prototype above is yours to lift.';
      if (arrow) {
        arrow.innerHTML = '<i data-lucide="check"></i>';
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          try { window.lucide.createIcons({ root: arrow }); } catch (e) {}
        }
      }
    });
  }
};
