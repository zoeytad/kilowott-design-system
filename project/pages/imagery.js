/* ============================================================
   IMAGERY & PHOTOGRAPHY — v0.4
   ============================================================ */

window.renderImagery = function (root) {
  root.innerHTML = `
  <style>
    .im-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .im-hero h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .im-hero h1 em { font-style: italic; color: var(--accent); }
    .im-hero__lede {
      margin-top: 22px; max-width: 60ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }
    .im-hero__meta {
      display: grid; grid-template-columns: repeat(4, auto);
      gap: var(--s-6); margin-top: var(--s-7);
      font-size: var(--fs-xs); letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--fg-2);
    }
    .im-hero__meta > div b {
      display:block; color: var(--fg); font-weight: 500;
      margin-top: 4px; letter-spacing: 0.02em;
      text-transform: none; font-size: var(--fs-sm);
    }
    @media (max-width: 800px) { .im-hero__meta { grid-template-columns: repeat(2, auto); } }

    /* Principles */
    .im-prin {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid var(--rule-strong);
      border-bottom: 1px solid var(--rule-strong);
      margin-top: var(--s-7);
    }
    @media (max-width: 900px) { .im-prin { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .im-prin { grid-template-columns: 1fr; } }
    .im-prin > div {
      padding: var(--s-6); border-right: 1px solid var(--rule);
    }
    .im-prin > div:last-child { border-right: 0; }
    @media (max-width: 900px) {
      .im-prin > div:nth-child(2) { border-right: 0; }
      .im-prin > div:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
    }
    .im-prin__n {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--accent); letter-spacing: 0.16em;
    }
    .im-prin b {
      display: block; font-family: var(--font-display);
      font-size: 26px; line-height: 1.15; letter-spacing: -0.01em;
      margin: 14px 0 10px;
    }
    .im-prin p { font-size: 14px; line-height: 1.55; color: var(--fg-2); margin: 0; }

    /* Category block */
    .im-cat {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0; border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden; margin-top: var(--s-6);
    }
    @media (max-width: 900px) { .im-cat { grid-template-columns: 1fr; } }
    .im-cat__visual {
      aspect-ratio: 4/3;
      position: relative; overflow: hidden;
      background: var(--bg-2);
    }
    .im-cat__visual--portrait {
      aspect-ratio: 3/4;
      align-self: stretch;
    }
    @media (max-width: 900px) {
      .im-cat__visual--portrait { aspect-ratio: 4/3; }
    }
    .im-cat__body {
      padding: calc(var(--s-6) * var(--density));
      border-left: 1px solid var(--rule);
      display: flex; flex-direction: column; gap: var(--s-4);
    }
    @media (max-width: 900px) {
      .im-cat__body { border-left: 0; border-top: 1px solid var(--rule); }
    }
    .im-cat__eyebrow {
      font-family: var(--font-sans); font-size: 11px;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--accent); font-weight: 500;
    }
    .im-cat h3 {
      font-family: var(--font-display); font-weight: 400;
      font-size: 32px; line-height: 1.1; letter-spacing: -0.01em;
      margin: 8px 0 0;
    }
    .im-cat h3 em { font-style: italic; color: var(--accent); }
    .im-cat__lede { font-size: 15px; line-height: 1.6; color: var(--fg-2); margin: 0; }
    .im-cat__rules { list-style: none; padding: 0; margin: 0; }
    .im-cat__rules li {
      display: grid; grid-template-columns: 80px 1fr; gap: 16px;
      padding: 12px 0; border-top: 1px solid var(--rule);
      font-size: 14px;
    }
    .im-cat__rules li:last-child { border-bottom: 1px solid var(--rule); }
    .im-cat__rules b {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg); letter-spacing: 0.1em;
      text-transform: uppercase; font-weight: 500;
    }
    .im-cat__rules span { color: var(--fg-2); line-height: 1.5; }

    /* Visual demos — SVG-based so they hold up */
    .vis {
      position: absolute; inset: 0;
      display: grid; place-items: center;
      overflow: hidden;
    }
    .vis svg { width: 100%; height: 100%; display: block; }
    .vis__tag {
      position: absolute; top: 16px; left: 16px;
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.2em; text-transform: uppercase;
      background: rgba(255,255,255,0.9); padding: 5px 9px;
      color: #0B0F14; border-radius: 2px;
    }
    .vis__tag--ink {
      background: rgba(11,15,20,0.85); color: #fff;
    }

    /* Treatment comparison */
    .im-treat {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: var(--s-5); margin-top: var(--s-6);
    }
    @media (max-width: 800px) { .im-treat { grid-template-columns: 1fr; } }
    .im-treat__card {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    .im-treat__vis {
      aspect-ratio: 4/3; position: relative; background: var(--bg-2);
      overflow: hidden;
    }
    .im-treat__photo {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
    }
    .im-treat__overlay {
      position: absolute; inset: 0;
      mix-blend-mode: multiply;
    }
    .im-treat__photo--house {
      filter: saturate(0.9) contrast(0.98);
    }
    .im-treat__photo--duo {
      filter: grayscale(1) contrast(1.15);
    }
    .im-treat__photo--duo + .im-treat__overlay {
      background: linear-gradient(135deg, #0B0F14 0%, #E4022D 100%);
      opacity: 0.55;
    }
    .im-treat__photo--mono {
      filter: grayscale(1);
    }
    .im-treat__meta {
      padding: 18px 20px 20px; border-top: 1px solid var(--rule);
    }
    .im-treat__name {
      font-family: var(--font-display); font-size: 20px;
      letter-spacing: -0.01em;
    }
    .im-treat__spec {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.1em;
      margin-top: 6px; text-transform: uppercase;
    }
    .im-treat__use {
      font-size: 13px; color: var(--fg-2); line-height: 1.5;
      margin-top: 10px;
    }

    /* Ratios grid */
    .im-ratios {
      display: grid; grid-template-columns: repeat(6, 1fr);
      gap: var(--s-4); margin-top: var(--s-6);
    }
    @media (max-width: 900px) { .im-ratios { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 560px) { .im-ratios { grid-template-columns: repeat(2, 1fr); } }
    .im-ratio {
      display: flex; flex-direction: column; gap: 10px;
    }
    .im-ratio__vis {
      background: var(--bg-2); border: 1px solid var(--rule);
      position: relative; overflow: hidden; border-radius: 4px;
    }
    .im-ratio__vis::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(135deg, var(--fg-2) 0%, transparent 60%);
      opacity: 0.15;
    }
    .im-ratio__vis.r-16x9 { aspect-ratio: 16/9; }
    .im-ratio__vis.r-4x5  { aspect-ratio: 4/5; }
    .im-ratio__vis.r-1x1  { aspect-ratio: 1/1; }
    .im-ratio__vis.r-3x2  { aspect-ratio: 3/2; }
    .im-ratio__vis.r-21x9 { aspect-ratio: 21/9; }
    .im-ratio__vis.r-9x16 { aspect-ratio: 9/16; }
    .im-ratio__lbl {
      font-family: var(--font-display); font-size: 18px;
      letter-spacing: -0.01em;
    }
    .im-ratio__use {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* Do / Don't gallery */
    .im-dodont {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: var(--s-5); margin-top: var(--s-6);
    }
    @media (max-width: 1000px) { .im-dodont { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .im-dodont { grid-template-columns: 1fr; } }
    .im-dd {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    .im-dd__vis { aspect-ratio: 3/2; position: relative; background: var(--bg-2); }
    .im-dd__vis::before {
      content: attr(data-tag); position: absolute; top: 14px; left: 14px;
      font-family: var(--font-sans); font-size: 10px;
      letter-spacing: 0.22em; text-transform: uppercase;
      padding: 5px 10px; color: #fff; font-weight: 500; z-index: 2;
    }
    .im-dd--do .im-dd__vis::before { background: #0B0F14; }
    .im-dd--dont .im-dd__vis::before { background: var(--accent); }
    .im-dd__cap {
      padding: 16px 20px 18px; border-top: 1px solid var(--rule);
      font-size: 14px; color: var(--fg-2); line-height: 1.5;
    }
    .im-dd__cap b { color: var(--fg); display: block; font-weight: 500; margin-bottom: 4px; font-size: 15px; }

    /* Placeholder system */
    .im-ph {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: var(--s-5); margin-top: var(--s-6);
    }
    @media (max-width: 900px) { .im-ph { grid-template-columns: 1fr; } }
    .im-ph__card {
      border: 1px solid var(--rule); border-radius: var(--r-3); overflow: hidden;
    }
    .im-ph__vis { aspect-ratio: 4/3; position: relative; }
    .im-ph__meta { padding: 16px 20px 18px; border-top: 1px solid var(--rule); }
    .im-ph__name {
      font-family: var(--font-display); font-size: 20px; letter-spacing: -0.01em;
    }
    .im-ph__spec {
      font-family: var(--font-mono); font-size: 11px; color: var(--fg-2);
      letter-spacing: 0.1em; margin-top: 6px; text-transform: uppercase;
    }
    .im-ph__use { font-size: 13px; color: var(--fg-2); line-height: 1.5; margin-top: 10px; }

    /* Sourcing table */
    .im-source {
      margin-top: var(--s-6);
      border: 1px solid var(--rule); border-radius: var(--r-3); overflow: hidden;
    }
    .im-source__row {
      display: grid; grid-template-columns: 200px 1fr auto;
      gap: 24px; padding: 18px 24px;
      border-top: 1px solid var(--rule);
      font-size: 14px; align-items: center;
    }
    .im-source__row:first-child { border-top: 0; }
    .im-source__row b { font-weight: 500; }
    .im-source__row p { margin: 0; color: var(--fg-2); font-size: 13px; line-height: 1.5; }
    .im-pill {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.16em; text-transform: uppercase;
      padding: 5px 10px; border-radius: 100px;
      white-space: nowrap;
    }
    .im-pill--yes  { background: rgba(11,15,20,0.1); color: var(--fg); }
    .im-pill--cond { background: rgba(228,2,45,0.1); color: var(--accent); }
    .im-pill--no   { background: var(--accent); color: #fff; }

    [data-theme="dark"] .im-pill--yes { background: rgba(255,255,255,0.1); }

    /* Approved library */
    .im-lib {
      display: grid; grid-template-columns: repeat(12, 1fr);
      grid-auto-rows: 130px; gap: 10px;
      margin-top: var(--s-6);
    }
    @media (max-width: 1100px) { .im-lib { grid-auto-rows: 110px; } }
    @media (max-width: 800px) { .im-lib { grid-auto-rows: 90px; gap: 6px; } }
    .im-lib__tile {
      position: relative; overflow: hidden;
      background: var(--bg-2);
      border-radius: 2px;
    }
    .im-lib__tile img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
      image-rendering: -webkit-optimize-contrast;
      transition: transform 500ms var(--ease-out);
    }
    .im-lib__tile:hover img { transform: scale(1.04); }
    .im-lib__tile::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(11,15,20,0.55) 0%, transparent 45%);
      opacity: 0; transition: opacity 220ms ease;
      pointer-events: none;
    }
    .im-lib__tile:hover::after { opacity: 1; }
    .im-lib__meta {
      position: absolute; left: 14px; right: 14px; bottom: 12px;
      color: #fff; font-family: var(--font-mono);
      font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
      opacity: 0; transform: translateY(6px);
      transition: opacity 220ms ease, transform 220ms ease;
      z-index: 2;
    }
    .im-lib__meta b { font-family: var(--font-display); font-size: 14px; font-weight: 400; display: block; text-transform: none; letter-spacing: -0.01em; margin-bottom: 2px; }
    .im-lib__tile:hover .im-lib__meta { opacity: 1; transform: translateY(0); }

    /* Span classes */
    .im-lib__tile--xl { grid-column: span 6; grid-row: span 2; }
    .im-lib__tile--lg { grid-column: span 4; grid-row: span 2; }
    .im-lib__tile--md { grid-column: span 4; grid-row: span 1; }
    .im-lib__tile--sm { grid-column: span 3; grid-row: span 1; }
    .im-lib__tile--tall { grid-column: span 3; grid-row: span 2; }

    @media (max-width: 1100px) {
      .im-lib__tile--xl { grid-column: span 8; }
      .im-lib__tile--lg { grid-column: span 4; }
      .im-lib__tile--md { grid-column: span 6; }
      .im-lib__tile--sm { grid-column: span 4; }
      .im-lib__tile--tall { grid-column: span 4; }
    }
    @media (max-width: 700px) {
      .im-lib { grid-template-columns: repeat(2, 1fr); }
      .im-lib__tile--xl, .im-lib__tile--lg, .im-lib__tile--md,
      .im-lib__tile--sm, .im-lib__tile--tall {
        grid-column: span 1; grid-row: span 1;
      }
    }

    .im-lib__meter {
      display: flex; gap: 20px; margin-top: var(--s-4);
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .im-lib__meter b { color: var(--fg); font-weight: 500; }
  </style>

  <!-- HERO -->
  <section class="im-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">v0.4 · Imagery &amp; photography</span>
      <h1>What a Kilowott <em>image</em> looks like.</h1>
      <p class="im-hero__lede">
        Photography is the fastest way to break the system &mdash; a single off-brand stock photo
        can undo an entire deck. This is the rulebook for what to shoot, what to use, what to
        reject, and what to do when you don&rsquo;t have the right image yet.
      </p>

      <div class="im-hero__meta">
        <div>Primary reference<b>kilowott.com photography</b></div>
        <div>Vibe<b>Editorial &middot; human &middot; warm</b></div>
        <div>AI imagery<b>Not permitted</b></div>
        <div>Stock<b>Treated only</b></div>
      </div>
    </div>
  </section>

  <!-- PRINCIPLES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Four image principles</h2>
        <p class="section-head__body">These hold across every category. If an image fails one of them, retake it or find another.</p>
      </div>

      <div class="im-prin">
        <div>
          <span class="im-prin__n">01 / Principle</span>
          <b>Real over rendered</b>
          <p>Real people, real offices, real products. No AI, no heavy composites, no polished stock actors in hard hats.</p>
        </div>
        <div>
          <span class="im-prin__n">02 / Principle</span>
          <b>Human gaze, not product shot</b>
          <p>People working, thinking, talking &mdash; not looking at the camera. Unposed beats posed every time.</p>
        </div>
        <div>
          <span class="im-prin__n">03 / Principle</span>
          <b>Warm, not saturated</b>
          <p>Natural light, warm white balance, softly desaturated. No cyan-and-orange grades, no blown highlights.</p>
        </div>
        <div>
          <span class="im-prin__n">04 / Principle</span>
          <b>Space for type</b>
          <p>Photos that will carry a headline need negative space, top-right or bottom-left. Composition reserves the canvas.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CATEGORIES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Five image categories</h2>
        <p class="section-head__body">Most of what you ship falls into one of these buckets. Each has its own rules &mdash; know which bucket an image is serving before you use it.</p>
      </div>

      <!-- A. People / portraits -->
      <div class="im-cat">
        <div class="im-cat__visual im-cat__visual--portrait">
          <img src="assets/photos/portrait-leader-window.jpg" alt="Portrait at window, natural light" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 15%;">
          <div class="vis__tag">Portrait &middot; natural light</div>
        </div>
        <div class="im-cat__body">
          <span class="im-cat__eyebrow">A &middot; People &amp; portraits</span>
          <h3>Human, <em>unposed</em>, natural light.</h3>
          <p class="im-cat__lede">Team members, speakers, clients. Captured while thinking or talking &mdash; not lined up against a wall.</p>
          <ul class="im-cat__rules">
            <li><b>Gaze</b><span>3/4 turn, off-camera. Rare direct-to-camera for leadership headshots only.</span></li>
            <li><b>Light</b><span>Window light or soft daylight. No ring lights, no harsh studio strobes.</span></li>
            <li><b>Crop</b><span>Tight on the face + shoulders, or medium with environmental context.</span></li>
            <li><b>Background</b><span>Real office, real street, real desk. Never seamless white.</span></li>
            <li><b>Wardrobe</b><span>What the person actually wears. No styled shoots.</span></li>
          </ul>
        </div>
      </div>

      <!-- B. Environmental / culture -->
      <div class="im-cat">
        <div class="im-cat__visual">
          <img src="assets/photos/lounge-coworking-warm.jpg" alt="Warm coworking lounge, team working" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          <div class="vis__tag">Environment &middot; workplace</div>
        </div>
        <div class="im-cat__body">
          <span class="im-cat__eyebrow">B &middot; Environmental &amp; culture</span>
          <h3>The <em>place</em> where the work happens.</h3>
          <p class="im-cat__lede">Desks mid-project. Whiteboards covered in marker. A meeting that&rsquo;s actually happening. These slides carry the &ldquo;how we work&rdquo; argument.</p>
          <ul class="im-cat__rules">
            <li><b>Focus</b><span>An activity, not a pose. Hands on keyboards, markers on boards, faces in conversation.</span></li>
            <li><b>Angle</b><span>Slightly above or at eye level. Never from below.</span></li>
            <li><b>Depth</b><span>Foreground + mid + background. Flat shots read as stock.</span></li>
            <li><b>Screens</b><span>Real work visible &mdash; blur sensitive content in post, don&rsquo;t hide it.</span></li>
          </ul>
        </div>
      </div>

      <!-- C. Product screenshots -->
      <div class="im-cat">
        <div class="im-cat__visual">
          <div class="vis">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <rect width="400" height="300" fill="#F6F4F0"/>
              <rect x="50" y="40" width="300" height="220" rx="8" fill="#FFFFFF" stroke="#E2DED6" stroke-width="1"/>
              <rect x="50" y="40" width="300" height="30" rx="8" fill="#0B0F14"/>
              <rect x="50" y="65" width="300" height="5" fill="#0B0F14"/>
              <circle cx="65" cy="55" r="4" fill="#FF5F57"/>
              <circle cx="80" cy="55" r="4" fill="#FEBC2E"/>
              <circle cx="95" cy="55" r="4" fill="#28C840"/>
              <rect x="70" y="90" width="90" height="10" fill="#0B0F14"/>
              <rect x="70" y="106" width="140" height="5" fill="#B5B0A7"/>
              <rect x="70" y="116" width="120" height="5" fill="#B5B0A7"/>
              <rect x="70" y="140" width="70" height="24" fill="#E4022D"/>
              <rect x="230" y="90" width="90" height="100" fill="#E8DFD1" rx="4"/>
              <rect x="70" y="180" width="120" height="5" fill="#E2DED6"/>
              <rect x="70" y="192" width="100" height="5" fill="#E2DED6"/>
              <rect x="70" y="204" width="110" height="5" fill="#E2DED6"/>
            </svg>
          </div>
          <div class="vis__tag">Product UI &middot; screenshot</div>
        </div>
        <div class="im-cat__body">
          <span class="im-cat__eyebrow">C &middot; Product &amp; UI</span>
          <h3>Show the real <em>screen</em>, not a mockup.</h3>
          <p class="im-cat__lede">Screenshots of shipping work. Framed in a device or browser chrome only when it clarifies context.</p>
          <ul class="im-cat__rules">
            <li><b>Resolution</b><span>Retina &mdash; minimum 2x. Never a stretched 1x capture.</span></li>
            <li><b>Data</b><span>Realistic (plausibly real), never lorem. Scrub client names when required.</span></li>
            <li><b>Chrome</b><span>macOS window for web, iPhone 15 frame for mobile &mdash; use the shared asset files.</span></li>
            <li><b>Shadow</b><span>Soft, 40px blur, 20% opacity. Never harsh drop shadows.</span></li>
            <li><b>Background</b><span>Paper (#FFFFFF) or warm (#F6F4F0). Never a gradient.</span></li>
          </ul>
        </div>
      </div>

      <!-- D. Abstract / textural -->
      <div class="im-cat">
        <div class="im-cat__visual">
          <div class="vis" style="position:relative;">
            <img src="assets/photos/textural-atmosphere-warm.jpg" alt="Warm architectural close-up &mdash; wood beam ceiling with raking natural light, used as textural background" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;">
            <div style="position:absolute; inset:0; background: linear-gradient(180deg, rgba(11,15,20,0.1) 0%, rgba(11,15,20,0.25) 55%, rgba(11,15,20,0.62) 100%); pointer-events:none;"></div>
          </div>
          <div class="vis__tag vis__tag--ink">Textural &middot; background</div>
        </div>
        <div class="im-cat__body">
          <span class="im-cat__eyebrow">D &middot; Abstract &amp; textural</span>
          <h3>Atmosphere, <em>not</em> illustration.</h3>
          <p class="im-cat__lede">For section breaks, hero backgrounds, quote slides. Subtle enough that the type wins.</p>
          <ul class="im-cat__rules">
            <li><b>Source</b><span>Macro photography &mdash; paper grain, glass reflection, brushed metal, architectural close-ups. The preview above simulates the grade; the real asset is always a photograph.</span></li>
            <li><b>Contrast</b><span>Low. A textural image should look like a mood, not a subject. Defocused &middot; near-monochrome &middot; one warm or cool cast.</span></li>
            <li><b>Use</b><span>Always with a scrim (linear gradient, 40&ndash;85% ink, top-to-bottom). Type goes over, never inside.</span></li>
            <li><b>Color</b><span>Dark + warm, or dark + cool. Never both in one image.</span></li>
          </ul>
        </div>
      </div>

      <!-- E. Diagrams & architecture -->
      <div class="im-cat">
        <div class="im-cat__visual">
          <div class="vis">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <rect width="400" height="300" fill="#F6F4F0"/>
              <g fill="none" stroke="#0B0F14" stroke-width="1.2">
                <rect x="60" y="70" width="100" height="50" rx="4"/>
                <rect x="240" y="70" width="100" height="50" rx="4"/>
                <rect x="60" y="180" width="100" height="50" rx="4"/>
                <rect x="240" y="180" width="100" height="50" rx="4"/>
              </g>
              <g stroke="#0B0F14" stroke-width="1" fill="none">
                <line x1="160" y1="95" x2="240" y2="95" marker-end="url(#arrowE)"/>
                <line x1="110" y1="120" x2="110" y2="180" marker-end="url(#arrowE)"/>
                <line x1="290" y1="120" x2="290" y2="180" marker-end="url(#arrowE)"/>
                <line x1="160" y1="205" x2="240" y2="205" marker-end="url(#arrowE)"/>
              </g>
              <defs>
                <marker id="arrowE" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#0B0F14"/>
                </marker>
              </defs>
              <rect x="60" y="70" width="100" height="6" fill="#E4022D"/>
              <text x="110" y="102" font-family="monospace" font-size="9" fill="#0B0F14" text-anchor="middle">service A</text>
              <text x="290" y="102" font-family="monospace" font-size="9" fill="#0B0F14" text-anchor="middle">gateway</text>
              <text x="110" y="212" font-family="monospace" font-size="9" fill="#0B0F14" text-anchor="middle">queue</text>
              <text x="290" y="212" font-family="monospace" font-size="9" fill="#0B0F14" text-anchor="middle">store</text>
            </svg>
          </div>
          <div class="vis__tag">Diagram &middot; architecture</div>
        </div>
        <div class="im-cat__body">
          <span class="im-cat__eyebrow">E &middot; Diagrams &amp; architecture</span>
          <h3>Drawn in the <em>system</em>, not in a corner.</h3>
          <p class="im-cat__lede">Every flow, architecture, timeline, matrix. Use the same vocabulary as the rest of the brand.</p>
          <ul class="im-cat__rules">
            <li><b>Stroke</b><span>1.2px, ink. No fills except for one red accent per diagram.</span></li>
            <li><b>Labels</b><span>Mono (JetBrains Mono), 10&ndash;12px, lowercase.</span></li>
            <li><b>Radii</b><span>4px on boxes. Never hard corners, never fully rounded.</span></li>
            <li><b>Arrows</b><span>Single triangle head. No thick arrows, no curves unless necessary.</span></li>
            <li><b>Canvas</b><span>Warm paper (#F6F4F0) preferred. Paper (#FFFFFF) acceptable.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- TREATMENT -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Color treatment</h2>
        <p class="section-head__body">Photography gets a light, consistent grade &mdash; not a filter. Same settings across a set so the deck feels like one story, not a scrapbook.</p>
      </div>

      <div class="im-treat">
        <div class="im-treat__card">
          <div class="im-treat__vis">
            <img class="im-treat__photo im-treat__photo--house" src="assets/photos/team-laughing-meeting.jpg" alt="Team meeting, house grade">
          </div>
          <div class="im-treat__meta">
            <div class="im-treat__name">House grade</div>
            <div class="im-treat__spec">Default &middot; all portraits &amp; environment</div>
            <p class="im-treat__use">Desaturate &minus;12, warmth +8, shadows lifted +15, highlights &minus;10. Never crush the blacks.</p>
          </div>
        </div>

        <div class="im-treat__card">
          <div class="im-treat__vis">
            <img class="im-treat__photo im-treat__photo--duo" src="assets/photos/team-laughing-meeting.jpg" alt="Team meeting, duotone treatment">
            <div class="im-treat__overlay"></div>
          </div>
          <div class="im-treat__meta">
            <div class="im-treat__name">Duotone &middot; ink &amp; red</div>
            <div class="im-treat__spec">Covers &middot; hero moments only</div>
            <p class="im-treat__use">Shadows &rarr; ink (#0B0F14), highlights &rarr; red (#E4022D). Reserve for book covers and case-study opens.</p>
          </div>
        </div>

        <div class="im-treat__card">
          <div class="im-treat__vis">
            <img class="im-treat__photo im-treat__photo--mono" src="assets/photos/team-laughing-meeting.jpg" alt="Team meeting, monochrome warm">
          </div>
          <div class="im-treat__meta">
            <div class="im-treat__name">Monochrome warm</div>
            <div class="im-treat__spec">Portraits &middot; leadership headshots</div>
            <p class="im-treat__use">Full desaturation, then a +10 warm tint across midtones. Produces the editorial portrait look.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- RATIOS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Crop ratios</h2>
        <p class="section-head__body">Decide the crop at export, not mid-design. These are the six you&rsquo;ll actually need.</p>
      </div>

      <div class="im-ratios">
        <div class="im-ratio"><div class="im-ratio__vis r-16x9"></div><div class="im-ratio__lbl">16:9</div><div class="im-ratio__use">Deck hero &middot; video thumb</div></div>
        <div class="im-ratio"><div class="im-ratio__vis r-21x9"></div><div class="im-ratio__lbl">21:9</div><div class="im-ratio__use">Website hero</div></div>
        <div class="im-ratio"><div class="im-ratio__vis r-3x2"></div><div class="im-ratio__lbl">3:2</div><div class="im-ratio__use">Editorial · article</div></div>
        <div class="im-ratio"><div class="im-ratio__vis r-4x5"></div><div class="im-ratio__lbl">4:5</div><div class="im-ratio__use">Social feed</div></div>
        <div class="im-ratio"><div class="im-ratio__vis r-1x1"></div><div class="im-ratio__lbl">1:1</div><div class="im-ratio__use">Square · avatar</div></div>
        <div class="im-ratio"><div class="im-ratio__vis r-9x16"></div><div class="im-ratio__lbl">9:16</div><div class="im-ratio__use">Stories · reels</div></div>
      </div>
    </div>
  </section>

  <!-- DO DONTS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Common mistakes</h2>
        <p class="section-head__body">The patterns we see repeatedly, and what to do instead.</p>
      </div>

      <div class="im-dodont">
        <div class="im-dd im-dd--dont">
          <div class="im-dd__vis" data-tag="Don't">
            <img src="assets/photos/dont-stock-actors.jpg" alt="Stock actors in hard hats &mdash; DON'T" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Stock actors in hard hats</b>Business-casual stock photography reads as inauthentic instantly. Use real team members or real clients.</div>
        </div>

        <div class="im-dd im-dd--dont">
          <div class="im-dd__vis" data-tag="Don't">
            <img src="assets/photos/dont-vaporwave-gradient.jpg" alt="Vaporwave AI gradient &mdash; DON'T" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Vaporwave AI gradients</b>Cyan-magenta-purple gradients or generated &ldquo;tech&rdquo; abstractions. Use real textures and macro photography instead.</div>
        </div>

        <div class="im-dd im-dd--dont">
          <div class="im-dd__vis" data-tag="Don't">
            <img src="assets/photos/dont-lined-up.jpg" alt="Lined-up staff directory shot &mdash; DON'T" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Lined up against a wall</b>Five people looking at the camera is a staff directory, not a photograph. Capture them working.</div>
        </div>

        <div class="im-dd im-dd--dont">
          <div class="im-dd__vis" data-tag="Don't">
            <img src="assets/photos/dont-handshake.jpg" alt="Handshake silhouette at sunset &mdash; DON'T" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Faceless handshake at sunset</b>Silhouettes shaking hands in front of skyscrapers is on every consulting website already. Show the work, not the metaphor.</div>
        </div>

        <div class="im-dd im-dd--dont">
          <div class="im-dd__vis" data-tag="Don't">
            <img src="assets/photos/dont-oversaturated-product.jpg" alt="Glossy product mock with lens flares &mdash; DON'T" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Glossy product mock with flares</b>Tilted UI screenshot on a reflective surface with rainbow lens flare. Over-rendered, over-coloured, over everything. Let the product itself read flat.</div>
        </div>

        <div class="im-dd im-dd--dont">
          <div class="im-dd__vis" data-tag="Don't">
            <img src="assets/photos/dont-brainstorm-stickies.jpg" alt="Rainbow post-it brainstorm cliché &mdash; DON'T" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Rainbow post-it brainstorm</b>&ldquo;Synergy&rdquo; on a pink note, &ldquo;disruption&rdquo; on a yellow one, hands pointing from every angle. Innovation-theatre. The real work doesn&rsquo;t look like this.</div>
        </div>

        <div class="im-dd im-dd--do">
          <div class="im-dd__vis" data-tag="Do">
            <img src="assets/photos/portrait-woman-phone.jpg" alt="Natural light portrait, 3/4 turn" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Natural light, 3/4 turn</b>Warm window light, eyes off-camera. This is the house portrait &mdash; every team member, same approach.</div>
        </div>

        <div class="im-dd im-dd--do">
          <div class="im-dd__vis" data-tag="Do">
            <img src="assets/photos/pair-working-warm.jpg" alt="Real work, mid-project" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="im-dd__cap"><b>Caught mid-work</b>Two people actually doing the thing &mdash; warm paper tones, natural depth, nobody looking at the lens.</div>
        </div>

        <div class="im-dd im-dd--do">
          <div class="im-dd__vis" data-tag="Do" style="position:relative;overflow:hidden;">
            <img src="assets/photos/team-standing-discussion.jpg" alt="Hero image with scrim and headline" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom, transparent 40%, rgba(11,15,20,0.85) 100%);"></div>
            <div style="position:absolute;left:24px;right:24px;bottom:22px;z-index:2;">
              <div style="width:44px;height:2px;background:#E4022D;margin-bottom:10px;"></div>
              <div style="font-family:var(--font-display);color:#fff;font-size:20px;line-height:1.15;letter-spacing:-0.01em;">Headline sits in the bottom third.</div>
            </div>
          </div>
          <div class="im-dd__cap"><b>Hero with scrim, type bottom</b>Real photography, dark scrim from 40% down, headline in the bottom third. Never across the middle.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- PLACEHOLDERS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">When you don&rsquo;t have the image yet</h2>
        <p class="section-head__body">A branded placeholder beats a bad photo. Use one of these three while the real image is in production &mdash; never a Google search screenshot.</p>
      </div>

      <div class="im-ph">
        <div class="im-ph__card">
          <div class="im-ph__vis">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
              <rect width="400" height="300" fill="#F6F4F0"/>
              <g stroke="#0B0F14" stroke-width="0.5" opacity="0.2">
                <line x1="0" y1="0" x2="400" y2="300"/>
                <line x1="400" y1="0" x2="0" y2="300"/>
              </g>
              <text x="200" y="155" font-family="serif" font-size="56" font-style="italic" fill="#E4022D" text-anchor="middle">image</text>
              <text x="200" y="200" font-family="monospace" font-size="10" letter-spacing="3" fill="#0B0F14" opacity="0.5" text-anchor="middle">4:3 &middot; 1200&times;900</text>
            </svg>
          </div>
          <div class="im-ph__meta">
            <div class="im-ph__name">Typographic</div>
            <div class="im-ph__spec">Default &middot; internal drafts</div>
            <p class="im-ph__use">Warm paper, crossed diagonals, italic serif label, dimensions in mono. For drafts where the image brief is clear.</p>
          </div>
        </div>

        <div class="im-ph__card">
          <div class="im-ph__vis">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
              <defs>
                <linearGradient id="ph2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#2B2018"/>
                  <stop offset="1" stop-color="#0B0F14"/>
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#ph2)"/>
              <g stroke="#3D2E20" stroke-width="0.5" opacity="0.6">
                <line x1="0" y1="70" x2="400" y2="100"/>
                <line x1="0" y1="160" x2="400" y2="190"/>
                <line x1="0" y1="250" x2="400" y2="280"/>
              </g>
              <circle cx="200" cy="150" r="3" fill="#E4022D"/>
              <text x="200" y="175" font-family="monospace" font-size="10" letter-spacing="3" fill="#FFFFFF" opacity="0.5" text-anchor="middle">PLACEHOLDER</text>
            </svg>
          </div>
          <div class="im-ph__meta">
            <div class="im-ph__name">Textural</div>
            <div class="im-ph__spec">For hero or scrim-ready slots</div>
            <p class="im-ph__use">Dark warm gradient with subtle lines, a red dot, mono caption. Drop in wherever a full-bleed image is planned.</p>
          </div>
        </div>

        <div class="im-ph__card">
          <div class="im-ph__vis">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
              <rect width="400" height="300" fill="#FFFFFF"/>
              <rect x="20" y="20" width="360" height="260" fill="none" stroke="#0B0F14" stroke-width="1" stroke-dasharray="4 4"/>
              <g transform="translate(200 150)">
                <circle r="24" fill="none" stroke="#0B0F14" stroke-width="1"/>
                <line x1="-24" y1="0" x2="24" y2="0" stroke="#0B0F14" stroke-width="1"/>
                <line x1="0" y1="-24" x2="0" y2="24" stroke="#0B0F14" stroke-width="1"/>
              </g>
              <text x="200" y="220" font-family="monospace" font-size="10" letter-spacing="3" fill="#0B0F14" opacity="0.5" text-anchor="middle">FOCAL POINT</text>
            </svg>
          </div>
          <div class="im-ph__meta">
            <div class="im-ph__name">Focal-point guide</div>
            <div class="im-ph__spec">Briefs &middot; photographer handoff</div>
            <p class="im-ph__use">Dashed frame + crosshair. Use when briefing a photographer &mdash; marks where the subject should land.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- APPROVED LIBRARY -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Approved library</h2>
        <p class="section-head__body">The current set of cleared images. Everything here has been commissioned, graded, and released for public use &mdash; pull from this pool first.</p>
      </div>

      <div class="im-lib">
        <a class="im-lib__tile im-lib__tile--xl" href="assets/photos/team-laughing-meeting.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/team-laughing-meeting.jpg" alt="Team laughing in meeting">
          <div class="im-lib__meta"><b>Team &middot; mid-laugh</b>Environment &middot; 16:9 &middot; hero-ready</div>
        </a>
        <a class="im-lib__tile im-lib__tile--lg" href="assets/photos/portrait-leader-window.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/portrait-leader-window.jpg" alt="Leader at window, natural light">
          <div class="im-lib__meta"><b>Leader &middot; window light</b>Portrait &middot; 3:2</div>
        </a>

        <a class="im-lib__tile im-lib__tile--md" href="assets/photos/pair-working-warm.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/pair-working-warm.jpg" alt="Pair working together">
          <div class="im-lib__meta"><b>Pair &middot; mid-work</b>Environment &middot; 16:9</div>
        </a>
        <a class="im-lib__tile im-lib__tile--md" href="assets/photos/lounge-coworking-warm.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/lounge-coworking-warm.jpg" alt="Lounge coworking space">
          <div class="im-lib__meta"><b>Lounge &middot; coworking</b>Environment &middot; 16:9</div>
        </a>
        <a class="im-lib__tile im-lib__tile--md" href="assets/photos/team-focused-laptop.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/team-focused-laptop.jpg" alt="Team focused on laptop">
          <div class="im-lib__meta"><b>Focused &middot; on-screen</b>Environment &middot; 3:2</div>
        </a>

        <a class="im-lib__tile im-lib__tile--tall" href="assets/photos/portrait-woman-phone.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/portrait-woman-phone.jpg" alt="Woman on phone portrait">
          <div class="im-lib__meta"><b>Candid &middot; phone</b>Portrait &middot; 4:5</div>
        </a>
        <a class="im-lib__tile im-lib__tile--tall" href="assets/photos/portrait-woman-tablet.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/portrait-woman-tablet.jpg" alt="Woman with tablet">
          <div class="im-lib__meta"><b>Working &middot; tablet</b>Portrait &middot; 4:5</div>
        </a>
        <a class="im-lib__tile im-lib__tile--lg" href="assets/photos/team-seated-workshop.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/team-seated-workshop.jpg" alt="Team workshop seated">
          <div class="im-lib__meta"><b>Workshop &middot; seated</b>Environment &middot; 16:9</div>
        </a>

        <a class="im-lib__tile im-lib__tile--md" href="assets/photos/team-standing-discussion.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/team-standing-discussion.jpg" alt="Team standing discussion">
          <div class="im-lib__meta"><b>Standing &middot; discussion</b>Environment &middot; 16:9</div>
        </a>
        <a class="im-lib__tile im-lib__tile--md" href="assets/photos/lounge-discussion.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/lounge-discussion.jpg" alt="Lounge discussion">
          <div class="im-lib__meta"><b>Lounge &middot; discussion</b>Environment &middot; 16:9</div>
        </a>
        <a class="im-lib__tile im-lib__tile--md" href="assets/photos/team-portrait-group.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/team-portrait-group.jpg" alt="Team group portrait">
          <div class="im-lib__meta"><b>Group &middot; portrait</b>People &middot; 3:2</div>
        </a>
        <a class="im-lib__tile im-lib__tile--lg" href="assets/photos/textural-atmosphere-warm.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/textural-atmosphere-warm.jpg" alt="Warm architectural close-up &mdash; wood beam ceiling">
          <div class="im-lib__meta"><b>Textural &middot; warm</b>Atmosphere &middot; 16:9</div>
        </a>
        <a class="im-lib__tile im-lib__tile--md" href="assets/photos/textural-atmosphere-cool.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/textural-atmosphere-cool.jpg" alt="Cool Nordic atmosphere &mdash; village and fjord">
          <div class="im-lib__meta"><b>Textural &middot; cool</b>Atmosphere &middot; 4:3</div>
        </a>
        <a class="im-lib__tile im-lib__tile--xl" href="assets/photos/landscape-nordic.jpg" target="_blank" rel="noopener">
          <img src="assets/photos/landscape-nordic.jpg" alt="Nordic fjord landscape with red cabin">
          <div class="im-lib__meta"><b>Landscape &middot; Nordic</b>Hero &middot; 16:9</div>
        </a>
      </div>

      <div class="im-lib__meter">
        <span><b>14</b> &nbsp;images cleared</span>
        <span><b>v0.6</b> &nbsp;release</span>
        <span><b>Perpetual</b> &nbsp;license</span>
        <span><b>/brand/photography/</b></span>
      </div>
    </div>
  </section>

  <!-- SOURCING -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Sourcing &amp; rights</h2>
        <p class="section-head__body">Where images can come from, and where they can&rsquo;t. When in doubt, ask Brand.</p>
      </div>

      <div class="im-source">
        <div class="im-source__row">
          <b>Commissioned</b>
          <p>Shot for Kilowott by our photographer. The canonical source for portraits, environments, and clients. Always licensed perpetually.</p>
          <span class="im-pill im-pill--yes">Preferred</span>
        </div>
        <div class="im-source__row">
          <b>Client-provided</b>
          <p>Case-study imagery supplied by the client. Must have written permission for use in public materials.</p>
          <span class="im-pill im-pill--yes">Yes</span>
        </div>
        <div class="im-source__row">
          <b>Curated stock</b>
          <p>Unsplash+, Stocksy, Eyeem. Only if treated with the house grade and approved by Brand. Never used as-is.</p>
          <span class="im-pill im-pill--cond">Treated only</span>
        </div>
        <div class="im-source__row">
          <b>Free stock sites</b>
          <p>Unsplash free tier, Pexels. Often over-used and distinctive to the platform. Avoid &mdash; choose commissioned or curated instead.</p>
          <span class="im-pill im-pill--cond">Last resort</span>
        </div>
        <div class="im-source__row">
          <b>AI-generated</b>
          <p>Midjourney, DALL-E, Stable Diffusion. Not permitted in external materials. Allowed for internal ideation only.</p>
          <span class="im-pill im-pill--no">Not permitted</span>
        </div>
        <div class="im-source__row">
          <b>Competitor / pulled from web</b>
          <p>Screenshots of competitor sites, Google Image results, found imagery. Never.</p>
          <span class="im-pill im-pill--no">Never</span>
        </div>
      </div>
    </div>
  </section>
  `;
};
