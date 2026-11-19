/* ============================================================
   SOCIAL MEDIA — how to make a Kilowott post.
   Six post types (each a designed image + copy formula), a LinkedIn
   document carousel, an editor with PNG export, the posts inside each
   platform's feed, and the profile kit. Post images are drawn by the
   poster layout engine (window.KWPosters, pages/posters.js), so organic
   posts and paid ads share margins, type, and the one-red rule.
   Demo content is fictional: Nordhavn Coffee, Ola Nordmann, sample role
   and event. Platform chrome uses the platforms' own colours.
   ============================================================ */

window.renderSocial = function (root) {
  root.innerHTML = `
  <style>


  .sm-hero { padding: 64px 0 40px; }
  .sm-hero h1 { font-family: var(--font-display); font-weight: 400; font-size: var(--fs-d2); letter-spacing: -.025em; line-height: 1.02; margin: 16px 0; max-width: 16ch; }
  .sm-hero h1 em { font-style: italic; color: var(--accent); }
  .sm-hero p { color: var(--fg-2); font-size: 1.125rem; line-height: 1.55; max-width: 60ch; margin: 0; }

  .sm-sec { padding: 56px 0; border-top: 1px solid var(--rule); scroll-margin-top: 16px; }
  .sm-sec__head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 48px; margin-bottom: 32px; align-items: end; }
  .sm-sec__head h2 { font-family: var(--font-display); font-weight: 400; font-size: 2.25rem; letter-spacing: -.02em; line-height: 1.05; margin: 10px 0 0; }
  .sm-sec__head p { color: var(--fg-2); line-height: 1.6; margin: 0; max-width: 60ch; }
  .sm-muted { color: var(--fg-2); }
  .sm-mono { font-family: var(--font-mono); font-size: 12px; letter-spacing: .02em; }
  .sm-h3 { font-weight: 500; font-size: var(--fs-body); margin: 0; }

  /* rules */

  /* platforms */
  .sm-plats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .sm-plat { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .sm-plat--lead { background: var(--bg-2); }
  .sm-plat__top { display: flex; justify-content: space-between; align-items: baseline; }
  .sm-plat__name { font-family: var(--font-display); font-size: 1.5rem; letter-spacing: -.01em; }
  .sm-plat__role { font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-2); }
  .sm-plat dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 6px 12px; font-size: 13px; }
  .sm-plat dt { color: var(--fg-2); }
  .sm-plat dd { margin: 0; }

  /* post types */
  .sm-types { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .sm-type { border: 1px solid var(--rule); border-radius: var(--r-3); overflow: hidden; display: flex; flex-direction: column; background: var(--bg); }
  .sm-type__stage { background: var(--bg-2); padding: 20px; display: grid; place-items: center; }
  .sm-type__stage .sm-art { width: 100%; max-width: 300px; }
  .sm-art .po-svg { display: block; width: 100%; height: auto; box-shadow: var(--shadow-1); }
  .sm-type__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .sm-type__num { font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; color: var(--fg-2); }
  .sm-type__name { font-family: var(--font-display); font-size: 1.5rem; letter-spacing: -.01em; margin: 0; }
  .sm-type__use { font-size: 13px; color: var(--fg-2); margin: 0; line-height: 1.5; }
  .sm-formula { margin: 4px 0 0; padding: 0; list-style: none; display: grid; gap: 6px; font-size: 13px; counter-reset: f; }
  .sm-formula li { display: grid; grid-template-columns: 64px 1fr; gap: 8px; }
  .sm-formula b { font-family: var(--font-mono); font-weight: 500; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-2); padding-top: 2px; }
  .sm-caption { background: var(--bg-2); border-radius: var(--r-2); padding: 12px 14px; font-size: 13px; line-height: 1.55; white-space: pre-line; }
  .sm-caption__lbl { font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-2); display: block; margin-bottom: 6px; }
  .sm-type__foot { margin-top: auto; padding-top: 6px; display: flex; gap: 8px; flex-wrap: wrap; }
  .btn .lucide { width: 14px; height: 14px; }

  /* carousel */
  .sm-strip { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(200px, 1fr); gap: 12px; overflow-x: auto; padding-bottom: 8px; }
  .sm-strip figure { margin: 0; }
  .sm-strip figcaption { font-size: 12px; color: var(--fg-2); margin-top: 8px; }
  .sm-strip figcaption b { color: var(--fg); font-weight: 500; display: block; }

  /* editor */
  .sm-ed { display: grid; grid-template-columns: 340px minmax(0, 1fr); gap: 32px; align-items: start; }
  .sm-ed__form { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 20px; display: grid; gap: 14px; }
  .sm-ed__form label { display: grid; gap: 6px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-2); }
  .sm-ed__form input, .sm-ed__form select, .sm-ed__form textarea { font: inherit; font-family: var(--font-sans); font-size: var(--fs-sm); text-transform: none; letter-spacing: 0; color: var(--fg); background: var(--bg); border: 1px solid var(--rule); border-radius: var(--r-2); padding: 9px 10px; }
  .sm-ed__form textarea { min-height: 64px; resize: vertical; }
  .sm-ed__form input:focus, .sm-ed__form select:focus, .sm-ed__form textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; border-color: transparent; }
  .sm-seg { display: flex; flex-wrap: wrap; gap: 6px; }
  .sm-seg button { font: inherit; font-size: 13px; padding: 6px 12px; border-radius: var(--r-pill); border: 1px solid var(--rule); background: var(--bg); color: var(--fg); cursor: pointer; }
  .sm-seg button[aria-pressed="true"] { background: var(--fg); color: var(--bg); border-color: var(--fg); }
  .sm-ed__stage { background: var(--bg-2); border-radius: var(--r-3); padding: 32px; display: grid; place-items: center; min-height: 480px; }
  .sm-ed__stage .sm-art { width: 100%; }
  .sm-ed__meta { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 12px; font-size: 13px; color: var(--fg-2); }
  .sm-ed__warn { margin: 8px 0 0; padding: 0; list-style: none; font-size: 13px; color: var(--warning); }

  /* feed previews */


  /* platform previews (third-party chrome: platform hex colours allowed) */
  .sm-ptabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 24px; }
  .sm-ptabs button { font: inherit; font-size: 14px; padding: 8px 16px; border-radius: var(--r-pill); border: 1px solid var(--rule); background: var(--bg); color: var(--fg); cursor: pointer; }
  .sm-ptabs button[aria-selected="true"] { background: var(--fg); color: var(--bg); border-color: var(--fg); }
  .sm-ppanel { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; align-items: start; }
  .sm-ppanel[hidden] { display: none; }
  .sm-pv { display: flex; flex-direction: column; gap: 10px; }
  .sm-pv__cap { font-size: 13px; color: var(--fg-2); line-height: 1.5; }
  .sm-pv__cap b { color: var(--fg); font-weight: 500; }
  .sm-pf { background: #fff; color: #0f1419; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif; overflow: hidden; }
  .sm-pf .po-svg { display: block; width: 100%; height: auto; }
  .sm-pf__head { display: flex; gap: 10px; align-items: center; padding: 12px 14px 8px; }
  .sm-pf__av { width: 40px; height: 40px; flex: none; overflow: hidden; border: 1px solid #e6e6e6; }
  .sm-pf__av img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .sm-pf__name { font-weight: 600; font-size: 14px; line-height: 1.2; }
  .sm-pf__sub { font-size: 12px; color: #666; line-height: 1.3; }
  .sm-pf__body { padding: 0 14px 10px; font-size: 14px; line-height: 1.45; }
  .sm-pf__more { color: #666; }
  .sm-pf__bar { display: flex; justify-content: space-around; padding: 8px; border-top: 1px solid #ececec; font-size: 13px; font-weight: 600; color: #666; }
  .sm-pf__count { display: flex; justify-content: space-between; padding: 6px 14px; font-size: 12px; color: #666; }
  /* LinkedIn */
  .sm-pf--li { border: 1px solid #e0dfdc; border-radius: 10px; }
  .sm-pf--li .sm-pf__av { width: 48px; height: 48px; border-radius: 4px; }
  /* document viewer */
  .sm-doc { position: relative; background: #f3f2ef; }
  .sm-doc__nav { position: absolute; top: 50%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%; border: 0; background: rgba(0,0,0,.6); color: #fff; font-size: 18px; cursor: pointer; display: grid; place-items: center; }
  .sm-doc__nav--l { left: 8px; } .sm-doc__nav--r { right: 8px; }
  .sm-doc__count { position: absolute; right: 10px; top: 10px; background: rgba(0,0,0,.6); color: #fff; font-size: 12px; padding: 3px 8px; border-radius: 12px; }
  .sm-doc__title { padding: 8px 14px; font-size: 13px; font-weight: 600; border-top: 1px solid #ececec; }
  /* Instagram */
  .sm-pf--ig { border: 1px solid #dbdbdb; border-radius: 8px; }
  .sm-pf--ig .sm-pf__av { width: 32px; height: 32px; border-radius: 50%; }
  .sm-pf--ig .sm-pf__icons { display: flex; gap: 14px; padding: 10px 14px 4px; font-size: 13px; color: #262626; }
  .sm-pf--ig .sm-pf__icons .lucide { width: 22px; height: 22px; stroke-width: 1.75; }
  .sm-pf--ig .sm-pf__icons .sp { margin-left: auto; }
  .sm-dots { display: flex; justify-content: center; gap: 4px; padding: 8px 0 0; }
  .sm-dots i { width: 6px; height: 6px; border-radius: 50%; background: #c7c7c7; display: block; }
  .sm-dots i.on { background: #0095f6; }
  .sm-story { position: relative; border-radius: 14px; overflow: hidden; background: #000; max-width: 300px; width: 100%; }
  .sm-story .po-svg, .sm-pf .po-svg, .sm-art .po-svg { display: block; width: 100%; height: auto; max-height: none; max-width: none; }
  .sm-story::before, .sm-story::after { content: ""; position: absolute; left: 0; right: 0; height: 64px; z-index: 1; pointer-events: none; }
  .sm-story::before { top: 0; background: linear-gradient(rgba(0,0,0,.35), transparent); }
  .sm-story::after { bottom: 0; background: linear-gradient(transparent, rgba(0,0,0,.35)); }
  .sm-story__bars { position: absolute; top: 8px; left: 8px; right: 8px; display: flex; gap: 3px; z-index: 2; }
  .sm-story__bars i { flex: 1; height: 2px; background: rgba(255,255,255,.4); border-radius: 2px; }
  .sm-story__bars i.on { background: #fff; }
  .sm-story__user { position: absolute; top: 18px; left: 10px; display: flex; gap: 8px; align-items: center; color: #fff; font-size: 13px; font-weight: 600; z-index: 2; font-family: -apple-system, system-ui, sans-serif; }
  .sm-story__user img { width: 28px; height: 28px; border-radius: 50%; }
  .sm-story__reply { position: absolute; bottom: 10px; left: 10px; right: 10px; border: 1px solid rgba(255,255,255,.6); border-radius: 22px; color: rgba(255,255,255,.85); font-size: 13px; padding: 9px 14px; z-index: 2; font-family: -apple-system, system-ui, sans-serif; }
  .sm-ig-prof { max-width: 420px; }
  .sm-ig-prof .sm-pf__head { padding: 14px; gap: 14px; }
  .sm-ig-prof .sm-pf__av { width: 64px; height: 64px; border-radius: 50%; }
  .sm-ig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  /* X */
  .sm-pf--x { border: 1px solid #eff3f4; border-radius: 0; display: grid; grid-template-columns: 40px 1fr; gap: 10px; padding: 12px 14px; }
  .sm-pf--x .sm-pf__av { border-radius: 50%; }
  .sm-pf--x .sm-pf__line { font-size: 14px; } .sm-pf--x .sm-pf__line span { color: #536471; font-weight: 400; }
  .sm-pf--x .sm-pf__text { font-size: 15px; line-height: 1.4; margin: 2px 0 10px; }
  .sm-pf--x .sm-pf__media { border: 1px solid #cfd9de; border-radius: 16px; overflow: hidden; }
  .sm-pf--x .sm-pf__xbar { display: flex; justify-content: space-between; color: #536471; font-size: 13px; padding: 10px 6px 0; }
  /* Facebook */
  .sm-pf--fb { border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,.2); }
  .sm-pf--fb .sm-pf__av { border-radius: 50%; }

  /* profile kit */
  .sm-kit { display: grid; gap: 16px; }
  .sm-kit__row { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 24px; align-items: center; padding: 16px 0; border-top: 1px solid var(--rule); }
  .sm-kit__row:first-child { border-top: 0; }
  .sm-kit__row .sm-art .po-svg { box-shadow: none; outline: 1px solid var(--rule); }
  .sm-avatar { width: 96px; height: 96px; border-radius: 50%; overflow: hidden; outline: 1px solid var(--rule); }
  .sm-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .sm-bios { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .sm-bio { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 16px; font-size: 13px; line-height: 1.55; }
  .sm-bio b { display: block; font-weight: 500; margin-bottom: 4px; font-size: var(--fs-sm); }
  .sm-bio span { font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); display: block; margin-top: 8px; }


  @media (max-width: 1000px) {
    .sm-types { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .sm-plats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .sm-ed, .sm-sec__head { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  }
  @media (max-width: 640px) {
    .sm-types, .sm-plats, .sm-bios { grid-template-columns: minmax(0, 1fr); }
    .sm-kit__row { grid-template-columns: minmax(0, 1fr); gap: 10px; }
    .sm-ed__stage { padding: 16px; min-height: 0; }
  }

  </style>
  <section class="sm-hero"><div class="container">
    <span class="eyebrow">Social media</span>
    <h1>One idea per post, <em>proven</em>.</h1>
    <p>Six post types cover almost everything Kilowott shares. Pick the type, follow its copy formula, and make the image in the editor below. LinkedIn comes first; the other platforms reuse the same posts.</p>
  </div></section>
  <div class="container">

  

  <section class="sm-sec" id="sm-where">
    <div class="sm-sec__head"><div><span class="eyebrow">Where we post</span><h2>LinkedIn first.</h2></div><p>Kilowott sells to businesses, so LinkedIn carries the proof and the point of view. Instagram shows the people. X and Facebook reuse the LinkedIn post with shorter copy. Cadence is a suggestion to confirm with the team.</p></div>
    <div class="sm-plats">
      <div class="sm-plat sm-plat--lead"><div class="sm-plat__top"><span class="sm-plat__name">LinkedIn</span><span class="sm-plat__role">Primary</span></div><dl><dt>Carries</dt><dd>Proof, point of view, carousels, hiring</dd><dt>Sizes</dt><dd>4:5 · 1:1 · 1.91:1</dd><dt>Cadence</dt><dd>2–3 posts a week</dd></dl></div>
      <div class="sm-plat"><div class="sm-plat__top"><span class="sm-plat__name">Instagram</span><span class="sm-plat__role">Second</span></div><dl><dt>Carries</dt><dd>People, culture, events, end cards</dd><dt>Sizes</dt><dd>4:5 · 1:1 · 9:16</dd><dt>Cadence</dt><dd>1–2 posts, Stories as they happen</dd></dl></div>
      <div class="sm-plat"><div class="sm-plat__top"><span class="sm-plat__name">X</span><span class="sm-plat__role">Reuse</span></div><dl><dt>Carries</dt><dd>The LinkedIn post, cut to one line and a link</dd><dt>Sizes</dt><dd>1.91:1 · 1:1</dd><dt>Cadence</dt><dd>When LinkedIn posts</dd></dl></div>
      <div class="sm-plat"><div class="sm-plat__top"><span class="sm-plat__name">Facebook</span><span class="sm-plat__role">Reuse</span></div><dl><dt>Carries</dt><dd>Hiring, events, the LinkedIn post</dd><dt>Sizes</dt><dd>1:1 · 1.91:1</dd><dt>Cadence</dt><dd>When there’s news</dd></dl></div>
    </div>
  </section>

  <section class="sm-sec" id="sm-types">
    <div class="sm-sec__head"><div><span class="eyebrow">Six post types</span><h2>Pick the type, then the words.</h2></div><p>Each type has a fixed layout and a copy formula. Images are shown at 4:5, the size that takes the most room in a mobile feed. Open any of them in the editor to change the words or size.</p></div>
    <div class="sm-types" id="sm-types-grid"></div>
  </section>

  <section class="sm-sec" id="sm-carousel">
    <div class="sm-sec__head"><div><span class="eyebrow">Document carousel</span><h2>Six slides, one story.</h2></div><p>LinkedIn’s document post is the best way to tell a case. Upload the slides as one PDF. The cover must work alone; every slide after it makes one point. Five to eight slides, never more.</p></div>
    <div class="sm-strip" id="sm-strip"></div>
  </section>

  <section class="sm-sec" id="sm-editor">
    <div class="sm-sec__head"><div><span class="eyebrow">Make a post</span><h2>Edit, check, download.</h2></div><p>Choose a post type and a size, change the words, and download a PNG at full resolution. The layout keeps the margins, type sizes, and the one red moment for you, and warns when copy runs long.</p></div>
    <div class="sm-ed">
      <form class="sm-ed__form" id="sm-ed-form" autocomplete="off" onsubmit="return false">
        <label>Post type<select id="sm-ed-type"></select></label>
        <div><span class="sm-mono sm-muted" style="display:block;margin-bottom:6px;font-size:11px;letter-spacing:.06em">SIZE</span><div class="sm-seg" id="sm-ed-size"></div></div>
        <div id="sm-ed-fields" style="display:grid;gap:14px"></div>
        <button class="btn btn--primary" type="button" id="sm-ed-png"><i data-lucide="download"></i>Download PNG</button>
        <span class="sm-muted" style="font-size:12px" id="sm-ed-out" aria-live="polite"></span>
      </form>
      <div>
        <div class="sm-ed__stage"><div class="sm-art" id="sm-ed-art"></div></div>
        <div class="sm-ed__meta"><span id="sm-ed-dim"></span><span>Alt text: describe the photo and repeat the headline.</span></div>
        <ul class="sm-ed__warn" id="sm-ed-warn"></ul>
      </div>
    </div>
  </section>

  <section class="sm-sec" id="sm-feed">
    <div class="sm-sec__head"><div><span class="eyebrow">In the feed</span><h2>How it reads in passing.</h2></div><p>The same posts inside each platform, at the size people actually see them. Check the first lines of copy before the “…more” cut, and that nothing important sits under the platform’s own buttons. Platform chrome and numbers are sample data.</p></div>
    <div class="sm-ptabs" role="tablist" aria-label="Platform">
      <button role="tab" aria-selected="true" data-p="li">LinkedIn</button>
      <button role="tab" aria-selected="false" data-p="ig">Instagram</button>
      <button role="tab" aria-selected="false" data-p="x">X</button>
      <button role="tab" aria-selected="false" data-p="fb">Facebook</button>
    </div>
    <div class="sm-ppanel" data-panel="li" id="sm-panel-li"></div>
    <div class="sm-ppanel" data-panel="ig" id="sm-panel-ig" hidden></div>
    <div class="sm-ppanel" data-panel="x" id="sm-panel-x" hidden></div>
    <div class="sm-ppanel" data-panel="fb" id="sm-panel-fb" hidden></div>
  </section>

  <section class="sm-sec" id="sm-profile">
    <div class="sm-sec__head"><div><span class="eyebrow">Profile kit</span><h2>Same on every platform.</h2></div><p>The bolt is the avatar everywhere. Cover banners carry the tagline and nothing else. Bios lead with the tagline and list the offices.</p></div>
    <div class="sm-kit">
      <div class="sm-kit__row"><div><p class="sm-h3">Avatar</p><span class="sm-muted" style="font-size:13px">Bolt mark, 400 × 400</span></div><div class="sm-avatar"><img src="assets/kilowott-bolt.jpg" alt="Kilowott bolt mark"></div></div>
      <div class="sm-kit__row"><div><p class="sm-h3">LinkedIn cover</p><span class="sm-muted" style="font-size:13px">1584 × 396</span></div><div class="sm-art" id="sm-cov-li"></div></div>
      <div class="sm-kit__row"><div><p class="sm-h3">X header</p><span class="sm-muted" style="font-size:13px">1500 × 500</span></div><div class="sm-art" id="sm-cov-x" style="max-width:780px"></div></div>
      <div class="sm-kit__row"><div><p class="sm-h3">Facebook cover</p><span class="sm-muted" style="font-size:13px">820 × 312</span></div><div class="sm-art" id="sm-cov-fb" style="max-width:620px"></div></div>
      <div class="sm-kit__row"><div><p class="sm-h3">Bios</p><span class="sm-muted" style="font-size:13px">Copy and paste</span></div>
        <div class="sm-bios">
          <div class="sm-bio"><b>LinkedIn tagline</b>Ahead, by design. Strategy and execution for growing brands and agencies.<span>Fits the 120-character headline</span></div>
          <div class="sm-bio"><b>Instagram bio</b>Ahead, by design.<br>Fredrikstad · Sandnes · Goa · Dubai<br>kilowott.com<span>Three lines, no emoji</span></div>
          <div class="sm-bio"><b>X bio</b>Ahead, by design. We build ahead so you can scale faster, deliver better and create impact.<span>Long form, under 160 characters</span></div>
        </div>
      </div>
    </div>
  </section>

  </div>`;

  if (!window.KWPosters || !window.KWPosters.build) {
    root.insertAdjacentHTML('beforeend', '<div class="container"><p>The post designs need pages/posters.js, which did not load.</p></div>');
    return;
  }
(async function () {
    const root = document.getElementById("page-social");
    const K = window.KWPosters;
    await K.fontsReady();
    if (K.clearMeasure) K.clearMeasure(); // re-measure text now the web fonts are in
    const F = Object.fromEntries(K.FORMATS.map(f => [f.id, f]));
    const P = p => 'assets/photos/' + p + '.jpg';
    const SIZES = [
      { id: 'feed-1080x1350', t: '4:5' }, { id: 'feed-1080', t: '1:1' },
      { id: 'story-1080x1920', t: '9:16' }, { id: 'li-1200x627', t: '1.91:1' } ];
  
    /* ---------- the six post types (+ end card) ---------- */
    const TYPES = [
      { id: 'proof', n: '01', t: 'Proof', arch: 'stat', use: 'A result from client work. One number, one line, one source.',
        c: { eyebrow: 'Case study · Nordhavn Coffee', stat: '3.5×', headline: 'organic traffic in six months, from a standing start.', em: '', source: 'Nordhavn Coffee US launch, Jan–Jun 2026 · sample figures' },
        formula: [['Hook', 'The result, in the first line'], ['Proof', 'What changed and how long it took'], ['Next', 'Where to read more']],
        cap: 'Nordhavn Coffee came to the US with no search footprint. Six months later, organic traffic is up 3.5×.\n\nWe led with SEO content and used paid social to test which products to push. Full case in the comments.' },
      { id: 'pov', n: '02', t: 'Point of view', arch: 'statement', use: 'One opinion we can defend. Sharp enough to argue with.',
        c: { eyebrow: 'Point of view', headline: 'Most rebrands fix the logo and skip the offer.', em: 'skip the offer' },
        formula: [['Hook', 'The opinion, stated plainly'], ['Why', 'One example or number behind it'], ['Next', 'A question that invites replies']],
        cap: 'Most rebrands fix the logo and skip the offer.\n\nIf customers can’t say what you sell in one line, a new mark won’t help. Start with the sentence, then design around it.\n\nWhat did your last rebrand change first?' },
      { id: 'people', n: '03', t: 'People and culture', arch: 'photo', use: 'Real team members, real work. Name and role on the image.',
        c: { eyebrow: 'Ola Nordmann · Senior Strategist', headline: 'Good strategy fits on one page.', em: 'one page', photo: P('portrait-leader-window') },
        formula: [['Who', 'Name, role, office'], ['What', 'One thing they believe or did'], ['Next', 'Nothing, or a link to their work']],
        cap: 'Meet Ola Nordmann, Senior Strategist in Sandnes.\n\nOla’s rule: if the strategy doesn’t fit on one page, it isn’t finished yet.' },
      { id: 'hiring', n: '04', t: 'Hiring', arch: 'statement', use: 'An open role. Say what the job is, where, and how to apply.',
        c: { eyebrow: 'We’re hiring · Sandnes', headline: 'Senior Strategist, brand and growth.', em: 'brand and growth' },
        formula: [['Role', 'Title and office in the first line'], ['Work', 'Two lines on what they’ll do'], ['Apply', 'Link, and ask for work samples']],
        cap: 'We’re hiring a Senior Strategist in Sandnes. (Sample role for the kit.)\n\nYou’ll shape positioning for growing brands and turn it into campaigns that ship. Send us two pieces of work you’re proud of. Link in the comments.' },
      { id: 'event', n: '05', t: 'Event', arch: 'event', use: 'Talks, workshops, launches. Date and place do the work.',
        c: { eyebrow: 'Kilowott Signal Summit', date: '12 March 2027', place: 'Fredrikstad · Norway', headline: 'A day on search, social, and the signal in between.', em: 'signal' },
        formula: [['What', 'Event name and one-line promise'], ['When', 'Date, time, place'], ['Next', 'How to get a seat']],
        cap: 'Kilowott Signal Summit, 12 March 2027 in Fredrikstad. (Sample event.)\n\nA day on search, social, and the signal in between. Seats are limited; registration link in the comments.' },
      { id: 'endcard', n: '06', t: 'End card', arch: 'statement', use: 'Closes Reels, videos, and carousels. Tagline only.',
        c: { eyebrow: '', headline: 'Ahead, by design.', em: 'design' },
        formula: [['Use', 'Last frame of every video and carousel'], ['Hold', '2 seconds on video'], ['Copy', 'The tagline. Nothing else.']],
        cap: 'No caption of its own: it ends someone else’s post.' },
    ];
    const T = Object.fromEntries(TYPES.map(x => [x.id, x]));
  
    // organic posts are images: the platform supplies any button, so none is drawn
    const svg = (fmt, arch, c) => K.toSVG(K.build(F[fmt] || fmt, arch, c, { noCta: true }), {});
  
    /* types grid */
    document.getElementById('sm-types-grid').innerHTML = TYPES.map(x => `
      <article class="sm-type" id="sm-type-${x.id}">
        <div class="sm-type__stage"><div class="sm-art">${svg('feed-1080x1350', x.arch, x.c)}</div></div>
        <div class="sm-type__body">
          <span class="sm-type__num">${x.n}</span><h3 class="sm-type__name">${x.t}</h3><p class="sm-type__use">${x.use}</p>
          <ul class="sm-formula">${x.formula.map(f => `<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ul>
          <div class="sm-caption"><span class="sm-caption__lbl">Example caption</span>${x.cap.replace(/</g, '&lt;')}</div>
          <div class="sm-type__foot"><a class="btn btn--sm" href="#social/sm-editor" data-edit="${x.id}"><i data-lucide="pencil"></i>Open in editor</a></div>
        </div>
      </article>`).join('');
  
    /* carousel strip */
    const SLIDES = [
      ['Cover', 'statement', { eyebrow: 'Case study · Nordhavn Coffee', headline: 'How a coffee brand grew organic traffic 3.5×.', em: 'organic traffic' }],
      ['The situation', 'statement', { eyebrow: '01 · The situation', headline: 'A strong product with no search footprint in the US.', em: '' }],
      ['The decision', 'statement', { eyebrow: '02 · The decision', headline: 'SEO content first. Paid social to test what sells.', em: '' }],
      ['The result', 'stat', { eyebrow: '03 · The result', stat: '3.5×', headline: 'organic traffic in six months.', em: '', source: 'Jan–Jun 2026 · sample figures' }],
      ['What we’d change', 'statement', { eyebrow: '04 · What we’d change', headline: 'Start the paid tests a month earlier.', em: '' }],
      ['End card', 'statement', { eyebrow: '', headline: 'Ahead, by design.', em: 'design' }],
    ];
    document.getElementById('sm-strip').innerHTML = SLIDES.map((s, i) => `<figure><div class="sm-art">${svg('feed-1080x1350', s[1], s[2])}</div><figcaption><b>${i + 1} · ${s[0]}</b>${i === 0 ? 'Works alone in the feed' : i === SLIDES.length - 1 ? 'Tagline only' : 'One point per slide'}</figcaption></figure>`).join('');
  
    /* ---------- feeds: the same posts inside each platform ---------- */
    const AV = '<img src="assets/kilowott-bolt.jpg" alt="Kilowott">';
    const ic = n => `<i data-lucide="${n}"></i>`;
    const PEOPLE_ALT = Object.assign({}, T.people.c);
    const pv = (cap, inner) => `<div class="sm-pv">${inner}<div class="sm-pv__cap">${cap}</div></div>`;
  
    // LinkedIn
    const liHead = (meta) => `<div class="sm-pf__head"><div class="sm-pf__av">${AV}</div><div><div class="sm-pf__name">Kilowott</div><div class="sm-pf__sub">Strategy and execution for growing brands</div><div class="sm-pf__sub">${meta}</div></div></div>`;
    document.getElementById('sm-panel-li').innerHTML =
      pv('<b>Proof post · 4:5.</b> The first two lines show before “…more”, so the result goes first.',
        `<div class="sm-pf sm-pf--li">${liHead('2d · Edited')}<div class="sm-pf__body">Nordhavn Coffee came to the US with no search footprint. Six months later, organic traffic is up 3.5×. <span class="sm-pf__more">…more</span></div>${svg('feed-1080x1350', 'stat', T.proof.c)}<div class="sm-pf__count"><span>247 reactions</span><span>38 comments · 14 reposts</span></div><div class="sm-pf__bar"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div></div>`) +
      pv('<b>Document carousel · 4:5 slides as one PDF.</b> Use the arrows: each slide makes one point.',
        `<div class="sm-pf sm-pf--li">${liHead('1w · Document')}<div class="sm-pf__body">How Nordhavn Coffee grew organic traffic 3.5×, and what we’d change. Six slides. <span class="sm-pf__more">…more</span></div><div class="sm-doc" data-doc="li"><div class="doc__stage"></div><button class="sm-doc__nav sm-doc__nav--l" aria-label="Previous slide">‹</button><button class="sm-doc__nav sm-doc__nav--r" aria-label="Next slide">›</button><span class="sm-doc__count"></span></div><div class="sm-doc__title">Nordhavn Coffee case · 6 pages</div><div class="sm-pf__bar"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div></div>`) +
      pv('<b>Point of view · 1.91:1.</b> The wide size suits a link post or a quick opinion.',
        `<div class="sm-pf sm-pf--li">${liHead('4d')}<div class="sm-pf__body">Most rebrands fix the logo and skip the offer. What did your last rebrand change first? <span class="sm-pf__more">…more</span></div>${svg('li-1200x627', 'statement', T.pov.c)}<div class="sm-pf__count"><span>112 reactions</span><span>41 comments</span></div><div class="sm-pf__bar"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div></div>`);
  
    // Instagram
    const igHead = (sub) => `<div class="sm-pf__head"><div class="sm-pf__av">${AV}</div><div><div class="sm-pf__name">kilowott</div>${sub ? `<div class="sm-pf__sub">${sub}</div>` : ''}</div></div>`;
    const igIcons = `<div class="sm-pf__icons">${ic('heart')}${ic('message-circle')}${ic('send')}<span class="sp">${ic('bookmark')}</span></div>`;
    document.getElementById('sm-panel-ig').innerHTML =
      pv('<b>Feed post · 4:5.</b> Name and role on the image; the caption adds one line.',
        `<div class="sm-pf sm-pf--ig">${igHead('Sandnes, Norway')}${svg('feed-1080x1350', 'photo', PEOPLE_ALT)}${igIcons}<div class="sm-pf__body"><b>1,284 likes</b><br><b>kilowott</b> Meet Ola Nordmann, Senior Strategist in Sandnes. <span class="sm-pf__more">more</span></div></div>`) +
      pv('<b>Carousel · 4:5.</b> Swipe with the arrows. The last frame is the end card.',
        `<div class="sm-pf sm-pf--ig">${igHead('')}<div class="sm-doc" data-doc="ig"><div class="doc__stage"></div><button class="sm-doc__nav sm-doc__nav--l" aria-label="Previous slide">‹</button><button class="sm-doc__nav sm-doc__nav--r" aria-label="Next slide">›</button><span class="sm-doc__count"></span></div><div class="sm-dots" data-dots="ig"></div>${igIcons}<div class="sm-pf__body"><b>kilowott</b> The Nordhavn Coffee case in six frames. <span class="sm-pf__more">more</span></div></div>`) +
      pv('<b>Story · 9:16.</b> Keep type out of the top 250 px and bottom 340 px: the platform covers them.',
        `<div class="sm-story"><div class="sm-story__bars"><i class="on"></i><i></i><i></i></div><div class="sm-story__user"><img src="assets/kilowott-bolt.jpg" alt="">kilowott <span style="font-weight:400;opacity:.7">4h</span></div>${svg('story-1080x1920', 'event', T.event.c)}<div class="sm-story__reply">Send message</div></div>`) +
      pv('<b>Profile grid · 1:1 crops.</b> Alternate photo-led and type-led tiles so the grid reads as one brand.',
        `<div class="sm-pf sm-pf--ig sm-ig-prof"><div class="sm-pf__head"><div class="sm-pf__av">${AV}</div><div><div class="sm-pf__name">kilowott</div><div class="sm-pf__sub" style="color:#262626">Ahead, by design.<br>Fredrikstad · Sandnes · Goa · Dubai<br>kilowott.com</div></div></div><div class="sm-ig-grid" id="sm-ig-grid"></div></div>`);
    const GRID = [
      ['stat', T.proof.c], ['photo', { eyebrow: 'Goa studio', headline: 'Workshop week.', em: 'week', photo: P('team-seated-workshop') }], ['statement', T.pov.c],
      ['photo', T.people.c], ['statement', T.endcard.c], ['photo', { eyebrow: 'Fredrikstad', headline: 'New office, same view.', em: 'view', photo: P('landscape-nordic') }],
      ['event', T.event.c], ['photo', { eyebrow: 'Team', headline: 'Sandnes, Monday morning.', em: 'Monday', photo: P('team-laughing-meeting') }], ['statement', T.hiring.c],
    ];
    document.getElementById('sm-ig-grid').innerHTML = GRID.map(g => svg('feed-1080', g[0], g[1])).join('');
  
    // X
    const xPost = (time, text, media, n) => `<div class="sm-pf sm-pf--x"><div class="sm-pf__av">${AV}</div><div><div class="sm-pf__line"><b>Kilowott</b> <span>@kilowott · ${time}</span></div><div class="sm-pf__text">${text}</div><div class="sm-pf__media">${media}</div><div class="sm-pf__xbar"><span>${n[0]}</span><span>${n[1]}</span><span>${n[2]}</span><span>${n[3]}</span></div></div></div>`;
    document.getElementById('sm-panel-x').innerHTML =
      pv('<b>Post with image · 1.91:1.</b> One line and a link. The image carries the claim.',
        xPost('4h', 'Most rebrands fix the logo and skip the offer. Start with the sentence. kilowott.com', svg('li-1200x627', 'statement', T.pov.c), ['12 replies', '31 reposts', '204 likes', '9.1K views'])) +
      pv('<b>Proof · 1:1.</b> The number does the work; the text says where to read more.',
        xPost('1d', 'Nordhavn Coffee: organic traffic up 3.5× in six months. Sample case, full breakdown on kilowott.com', svg('feed-1080', 'stat', T.proof.c), ['8 replies', '22 reposts', '140 likes', '6.4K views']));
  
    // Facebook
    const fbHead = (time) => `<div class="sm-pf__head"><div class="sm-pf__av">${AV}</div><div><div class="sm-pf__name">Kilowott</div><div class="sm-pf__sub">${time} · Public</div></div></div>`;
    document.getElementById('sm-panel-fb').innerHTML =
      pv('<b>Event · 1:1.</b> Date and place on the image; the registration link goes in the post.',
        `<div class="sm-pf sm-pf--fb">${fbHead('2 hrs')}<div class="sm-pf__body">Kilowott Signal Summit, 12 March 2027 in Fredrikstad. Registration link below. (Sample event.)</div>${svg('feed-1080', 'event', T.event.c)}<div class="sm-pf__count"><span>86 reactions</span><span>12 comments · 9 shares</span></div><div class="sm-pf__bar"><span>Like</span><span>Comment</span><span>Share</span></div></div>`) +
      pv('<b>Hiring · 1.91:1.</b> Role and office first; ask for work samples, not CVs.',
        `<div class="sm-pf sm-pf--fb">${fbHead('5 days')}<div class="sm-pf__body">We’re hiring a Senior Strategist in Sandnes. Send us two pieces of work you’re proud of. (Sample role.)</div>${svg('li-1200x627', 'statement', T.hiring.c)}<div class="sm-pf__count"><span>54 reactions</span><span>19 comments</span></div><div class="sm-pf__bar"><span>Like</span><span>Comment</span><span>Share</span></div></div>`);
  
    // carousel viewers
    document.querySelectorAll('[data-doc]').forEach(d => {
      // each viewer gets its own SVGs: shared mask ids break when one copy is hidden
      const set = SLIDES.map(x => svg('feed-1080x1350', x[1], x[2])); let i = 0;
      const stage = d.querySelector('.doc__stage'), count = d.querySelector('.sm-doc__count');
      const dots = document.querySelector(`[data-dots="${d.dataset.doc}"]`);
      const draw = () => { stage.innerHTML = set[i]; count.textContent = `${i + 1} / ${set.length}`; if (dots) dots.innerHTML = set.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join(''); };
      d.querySelector('.sm-doc__nav--l').addEventListener('click', () => { i = (i + set.length - 1) % set.length; draw(); });
      d.querySelector('.sm-doc__nav--r').addEventListener('click', () => { i = (i + 1) % set.length; draw(); });
      draw();
    });
  
    // platform tabs
    document.querySelectorAll('.sm-ptabs [data-p]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('.sm-ptabs [data-p]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
      document.querySelectorAll('.sm-ppanel').forEach(p => { p.hidden = p.dataset.panel !== b.dataset.p; });
    }));
  
    /* covers: custom strip formats on the same engine */
    const cov = (id, w, h) => ({ id, name: id, group: 'social', unit: 'px', w, h, safe: { t: 0, r: 0, b: 0, l: 0 }, minPx: 24, arch: ['statement'] });
    document.getElementById('sm-cov-li').innerHTML = svg(cov('cover-li', 1584, 396), 'statement', T.endcard.c);
    document.getElementById('sm-cov-x').innerHTML = svg(cov('cover-x', 1500, 500), 'statement', T.endcard.c);
    document.getElementById('sm-cov-fb').innerHTML = svg(cov('cover-fb', 820, 312), 'statement', T.endcard.c);
  
    /* ---------- editor ---------- */
    const FIELDS = {
      stat: [['eyebrow', 'Eyebrow'], ['stat', 'Number'], ['headline', 'Label', 1], ['source', 'Source and time window']],
      statement: [['eyebrow', 'Eyebrow'], ['headline', 'Headline', 1], ['em', 'Italic phrase (the red moment)']],
      photo: [['eyebrow', 'Name · role, or place'], ['headline', 'Headline', 1], ['em', 'Italic phrase'], ['photo', 'Photo']],
      event: [['eyebrow', 'Event name'], ['date', 'Date'], ['place', 'Place'], ['headline', 'One-line promise', 1], ['em', 'Italic word']],
    };
    const PHOTOS = ['portrait-leader-window', 'team-seated-workshop', 'team-laughing-meeting', 'team-standing-discussion', 'pair-working-warm', 'team-focused-laptop', 'lounge-discussion', 'landscape-nordic'];
    const ed = { type: 'proof', size: 'feed-1080x1350', c: {} };
    TYPES.forEach(x => { ed.c[x.id] = Object.assign({}, x.c); });
    const sel = document.getElementById('sm-ed-type');
    sel.innerHTML = TYPES.map(x => `<option value="${x.id}">${x.n} · ${x.t}</option>`).join('');
    const sizeEl = document.getElementById('sm-ed-size');
    sizeEl.innerHTML = SIZES.map(s => `<button type="button" data-size="${s.id}">${s.t}</button>`).join('');
    const fieldsEl = document.getElementById('sm-ed-fields');
    function drawFields() {
      const x = T[ed.type], c = ed.c[ed.type];
      fieldsEl.innerHTML = FIELDS[x.arch].map(f => f[0] === 'photo'
        ? `<label>${f[1]}<select data-f="photo">${PHOTOS.map(p => `<option value="${P(p)}"${c.photo === P(p) ? ' selected' : ''}>${p.replace(/-/g, ' ')}</option>`).join('')}</select></label>`
        : f[2] ? `<label>${f[1]}<textarea data-f="${f[0]}">${(c[f[0]] || '').replace(/</g, '&lt;')}</textarea></label>`
               : `<label>${f[1]}<input data-f="${f[0]}" value="${(c[f[0]] || '').replace(/"/g, '&quot;')}"></label>`).join('');
      fieldsEl.querySelectorAll('[data-f]').forEach(el => el.addEventListener('input', () => { ed.c[ed.type][el.dataset.f] = el.value; drawArt(); }));
    }
    function layout() { return K.build(F[ed.size], T[ed.type].arch, ed.c[ed.type], { noCta: true }); }
    function drawArt() {
      const L = layout();
      const art = document.getElementById('sm-ed-art');
      art.innerHTML = K.toSVG(L, {});
      const f = F[ed.size];
      art.style.maxWidth = (f.h > f.w ? Math.round(440 * f.w / f.h * 1.25) : 640) + 'px';
      document.getElementById('sm-ed-dim').textContent = `${f.w} × ${f.h} px · ${SIZES.find(s => s.id === ed.size).t}`;
      document.getElementById('sm-ed-warn').innerHTML = L.warns.map(w => `<li>${w}</li>`).join('');
      sizeEl.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === ed.size)));
    }
    sel.addEventListener('change', () => { ed.type = sel.value; drawFields(); drawArt(); });
    sizeEl.addEventListener('click', e => { const b = e.target.closest('[data-size]'); if (!b) return; ed.size = b.dataset.size; drawArt(); });
    document.querySelectorAll('[data-edit]').forEach(a => a.addEventListener('click', () => { ed.type = a.dataset.edit; sel.value = ed.type; drawFields(); drawArt(); }));
    document.getElementById('sm-ed-png').addEventListener('click', async () => {
      const out = document.getElementById('sm-ed-out'); out.textContent = 'Rendering…';
      try {
        const cv = await K.toCanvas(layout(), 1);
        cv.toBlob(b => { const u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = `kilowott-${ed.type}-${F[ed.size].w}x${F[ed.size].h}.png`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); out.textContent = 'Downloaded.'; });
      } catch (e) { out.textContent = 'Export failed: ' + e.message; }
    });
    drawFields(); drawArt();
    if (window.lucide) lucide.createIcons({ root: root });
  })();
  
};
