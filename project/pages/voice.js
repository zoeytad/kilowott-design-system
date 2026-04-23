/* ============================================================
   VOICE & TONE — v0.6
   How Kilowott sounds. Principles, tone sliders, do/don't,
   vocabulary, and the register-shift matrix across contexts.
   ============================================================ */

window.renderVoice = function (root) {
  root.innerHTML = `
  <style>
    /* ---------- HERO ---------- */
    .vc-hero {
      padding: var(--s-9) 0 var(--s-7);
      border-bottom: 1px solid var(--rule);
    }
    .vc-hero h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 20ch;
    }
    .vc-hero h1 em { font-style: italic; color: var(--accent); }
    .vc-hero__lede {
      margin-top: 22px; max-width: 60ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }
    .vc-hero__meta {
      display: grid; grid-template-columns: repeat(4, auto);
      gap: var(--s-6); margin-top: var(--s-7);
      font-size: var(--fs-xs); letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--fg-2);
    }
    .vc-hero__meta > div b {
      display:block; color: var(--fg); font-weight: 500;
      margin-top: 4px; letter-spacing: 0.02em;
      text-transform: none; font-size: var(--fs-sm);
    }
    @media (max-width: 800px) { .vc-hero__meta { grid-template-columns: repeat(2, auto); } }

    /* ---------- PRINCIPLES ---------- */
    .vc-prin {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid var(--rule-strong);
      border-bottom: 1px solid var(--rule-strong);
      margin-top: var(--s-7);
    }
    @media (max-width: 1000px) { .vc-prin { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px)  { .vc-prin { grid-template-columns: 1fr; } }
    .vc-prin > div {
      padding: var(--s-6); border-right: 1px solid var(--rule);
    }
    .vc-prin > div:last-child { border-right: 0; }
    @media (max-width: 1000px) {
      .vc-prin > div:nth-child(2) { border-right: 0; }
      .vc-prin > div:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
    }
    .vc-prin__n {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--accent); letter-spacing: 0.16em;
    }
    .vc-prin b {
      display: block; font-family: var(--font-display);
      font-size: 26px; line-height: 1.15; letter-spacing: -0.01em;
      margin: 14px 0 10px;
    }
    .vc-prin p { font-size: 14px; line-height: 1.55; color: var(--fg-2); margin: 0; }

    /* ---------- TONE SLIDERS ---------- */
    .vc-sliders {
      display: grid; grid-template-columns: 1fr;
      gap: 0;
      border: 1px solid var(--rule); border-radius: var(--r-3);
      margin-top: var(--s-6); overflow: hidden;
    }
    .vc-slider {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0; padding: 0;
      border-top: 1px solid var(--rule);
    }
    .vc-slider:first-child { border-top: 0; }
    @media (max-width: 900px) { .vc-slider { grid-template-columns: 1fr; } }

    .vc-slider__meta {
      padding: var(--s-6);
      border-right: 1px solid var(--rule);
    }
    @media (max-width: 900px) {
      .vc-slider__meta { border-right: 0; border-bottom: 1px solid var(--rule); }
    }
    .vc-slider__ends {
      display: flex; justify-content: space-between;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .vc-slider__ends b { color: var(--fg); font-weight: 500; }
    .vc-slider__ends--us { color: var(--accent); }
    .vc-slider__track {
      height: 4px; background: var(--rule); margin: 18px 0 10px;
      position: relative; border-radius: 2px;
    }
    .vc-slider__dot {
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--accent);
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      box-shadow: 0 0 0 4px var(--bg);
    }
    .vc-slider__caption {
      font-size: 14px; line-height: 1.6; color: var(--fg-2);
      margin-top: 18px; max-width: 44ch;
    }
    .vc-slider__gloss {
      padding: var(--s-6);
      background: var(--bg-2);
      display: flex; align-items: center;
    }
    .vc-slider__gloss-inner {
      font-family: var(--font-display);
      font-size: 26px; line-height: 1.25; letter-spacing: -0.005em;
      max-width: 34ch;
    }
    .vc-slider__gloss-inner em { font-style: italic; color: var(--accent); }

    /* ---------- REGISTER MATRIX ---------- */
    .vc-reg {
      margin-top: var(--s-6);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    .vc-reg__row {
      display: grid; grid-template-columns: 220px 1fr 1fr 1fr;
      border-top: 1px solid var(--rule);
    }
    .vc-reg__row:first-child { border-top: 0; }
    @media (max-width: 1100px) {
      .vc-reg__row { grid-template-columns: 160px 1fr 1fr 1fr; }
    }
    @media (max-width: 850px) {
      .vc-reg__row { grid-template-columns: 1fr; }
    }
    .vc-reg__cell {
      padding: 22px 24px;
      border-right: 1px solid var(--rule);
      font-size: 14px; line-height: 1.55;
    }
    .vc-reg__cell:last-child { border-right: 0; }
    @media (max-width: 850px) {
      .vc-reg__cell { border-right: 0; border-bottom: 1px solid var(--rule); }
      .vc-reg__cell:last-child { border-bottom: 0; }
    }
    .vc-reg__head {
      background: var(--bg-2);
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2); padding: 14px 24px;
    }
    .vc-reg__label {
      font-family: var(--font-display);
      font-size: 20px; letter-spacing: -0.01em; line-height: 1.2;
    }
    .vc-reg__sub {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em;
      margin-top: 6px; text-transform: uppercase;
    }
    .vc-reg__tick {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--accent); font-weight: 500; margin-bottom: 6px;
    }

    /* ---------- DO / DON'T COPY PAIRS ---------- */
    .vc-copy {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: var(--s-5); margin-top: var(--s-6);
    }
    @media (max-width: 900px) { .vc-copy { grid-template-columns: 1fr; } }
    .vc-copy__card {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      padding: var(--s-6);
      display: flex; flex-direction: column; gap: 18px;
      position: relative;
    }
    .vc-copy__tag {
      font-family: var(--font-sans); font-size: 10px;
      letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 500; color: var(--bg);
      padding: 5px 10px; align-self: flex-start;
      background: var(--k-ink); border-radius: 2px;
    }
    .vc-copy__card--dont .vc-copy__tag { background: var(--accent); }
    .vc-copy__quote {
      font-family: var(--font-display);
      font-size: 22px; line-height: 1.3; letter-spacing: -0.005em;
      color: var(--fg);
    }
    .vc-copy__card--dont .vc-copy__quote { color: var(--fg-2); text-decoration: line-through; text-decoration-color: rgba(228,2,45,0.35); text-decoration-thickness: 1px; }
    .vc-copy__why {
      font-size: 13px; line-height: 1.6; color: var(--fg-2);
      padding-top: 14px; border-top: 1px solid var(--rule);
    }
    .vc-copy__why b { color: var(--fg); font-weight: 500; }

    /* ---------- VOCAB TABLE ---------- */
    .vc-vocab {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: var(--s-5); margin-top: var(--s-6);
    }
    @media (max-width: 900px) { .vc-vocab { grid-template-columns: 1fr; } }
    .vc-vocab__col {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    .vc-vocab__head {
      padding: 18px 22px;
      border-bottom: 1px solid var(--rule);
      display: flex; justify-content: space-between; align-items: baseline;
      background: var(--bg-2);
    }
    .vc-vocab__head b {
      font-family: var(--font-display); font-size: 22px;
      letter-spacing: -0.01em;
    }
    .vc-vocab__head--use b em { font-style: italic; color: var(--accent); }
    .vc-vocab__head span {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .vc-vocab__body { padding: 4px 0; }
    .vc-vocab__row {
      display: grid; grid-template-columns: 1fr 1fr;
      padding: 14px 22px; gap: 18px;
      border-top: 1px solid var(--rule);
      font-size: 14px;
    }
    .vc-vocab__row:first-child { border-top: 0; }
    .vc-vocab__row > :first-child { font-weight: 500; }
    .vc-vocab__row > :last-child { color: var(--fg-2); font-size: 13px; line-height: 1.5; }
    .vc-vocab__col--avoid .vc-vocab__row > :first-child {
      text-decoration: line-through;
      text-decoration-color: rgba(228,2,45,0.45);
      text-decoration-thickness: 1px;
      color: var(--fg-2);
    }

    /* ---------- MECHANICS ---------- */
    .vc-mech {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0; margin-top: var(--s-6);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    @media (max-width: 900px) { .vc-mech { grid-template-columns: 1fr; } }
    .vc-mech__cell {
      padding: var(--s-6);
      border-right: 1px solid var(--rule);
    }
    .vc-mech__cell:last-child { border-right: 0; }
    @media (max-width: 900px) {
      .vc-mech__cell { border-right: 0; border-bottom: 1px solid var(--rule); }
      .vc-mech__cell:last-child { border-bottom: 0; }
    }
    .vc-mech__head {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 18px;
    }
    .vc-mech h4 {
      font-family: var(--font-display); font-size: 24px;
      letter-spacing: -0.01em; font-weight: 400;
      margin: 0 0 14px;
    }
    .vc-mech__list {
      list-style: none; padding: 0; margin: 0;
    }
    .vc-mech__list li {
      display: grid; grid-template-columns: 1fr auto;
      gap: 16px; padding: 10px 0;
      border-top: 1px solid var(--rule);
      font-size: 13px; line-height: 1.55;
    }
    .vc-mech__list li:first-child { border-top: 0; padding-top: 0; }
    .vc-mech__list li b { font-weight: 500; }
    .vc-mech__list li span {
      font-family: var(--font-mono); font-size: 10px;
      color: var(--fg-2); letter-spacing: 0.08em;
      text-transform: uppercase; white-space: nowrap;
      align-self: center;
    }

    /* ---------- LENGTH LADDER ---------- */
    .vc-lad {
      display: grid; grid-template-columns: 140px 1fr;
      margin-top: var(--s-6);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
    }
    @media (max-width: 700px) { .vc-lad { grid-template-columns: 1fr; } }
    .vc-lad__meta {
      padding: 22px 24px;
      background: var(--bg-2);
      border-right: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2);
      display: flex; flex-direction: column; justify-content: center;
    }
    .vc-lad__meta b { color: var(--fg); font-size: 16px; font-family: var(--font-display); letter-spacing: -0.01em; font-weight: 400; display: block; text-transform: none; margin-top: 6px; }
    .vc-lad__body { padding: 22px 28px; font-size: 15px; line-height: 1.6; }
    .vc-lad__row { display: contents; }
    .vc-lad__row + .vc-lad__row .vc-lad__meta,
    .vc-lad__row + .vc-lad__row .vc-lad__body {
      border-top: 1px solid var(--rule);
    }
    @media (max-width: 700px) {
      .vc-lad__meta { border-right: 0; border-bottom: 1px solid var(--rule); }
      .vc-lad__row + .vc-lad__row .vc-lad__meta { border-top: 0; }
    }
    .vc-lad__body em { font-family: var(--font-display); font-style: italic; color: var(--accent); }
  </style>

  <!-- ============ HERO ============ -->
  <section class="vc-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">v0.6 · Voice &amp; tone</span>
      <h1>Scale faster. Deliver better. <em>Create impact.</em></h1>
      <p class="vc-hero__lede">
        Kilowott is a strategic partner that turns strategy and execution into measurable
        outcomes &mdash; while protecting margins, speed, and delivery confidence. Our voice
        has to do the same work: confident on the claim, specific on the proof, and short
        enough to read in a calendar invite. This page locks in the principles, the register
        shifts by audience, and the mechanics that separate a Kilowott sentence from a
        generic one.
      </p>

      <div class="vc-hero__meta">
        <div>Voice<b>Consistent always</b></div>
        <div>Tone<b>Shifts by context</b></div>
        <div>Reading level<b>Plain, not plain-brained</b></div>
        <div>Length<b>Shorter than feels safe</b></div>
      </div>
    </div>
  </section>

  <!-- ============ PRINCIPLES ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Four voice principles</h2>
        <p class="section-head__body">Voice stays constant across every surface. If a sentence fails one of these, rewrite it &mdash; don&rsquo;t &ldquo;soften&rdquo; it.</p>
      </div>

      <div class="vc-prin">
        <div>
          <span class="vc-prin__n">01 / Principle</span>
          <b>Outcome-driven</b>
          <p>We write about measurable results, not activity. Every claim ties back to ROI, growth, delivery, or a number a client can check. &ldquo;Transformation&rdquo; is a promise &mdash; we only use it when we can point to the receipt.</p>
        </div>
        <div>
          <span class="vc-prin__n">02 / Principle</span>
          <b>Strategic &amp; specific</b>
          <p>We sound like a partner in the room, not a vendor at the door. Name the industry, the tool, the region, the number. &ldquo;At scale&rdquo; is not a number &mdash; give the number.</p>
        </div>
        <div>
          <span class="vc-prin__n">03 / Principle</span>
          <b>Confident, not loud</b>
          <p>We say what we think and we don&rsquo;t hedge. No &ldquo;may,&rdquo; &ldquo;could,&rdquo; &ldquo;potentially.&rdquo; No exclamation marks either &mdash; the work and the result carry the weight.</p>
        </div>
        <div>
          <span class="vc-prin__n">04 / Principle</span>
          <b>Human, not corporate</b>
          <p>We write to a person, not &ldquo;the market.&rdquo; Contractions are fine; first person is fine. The tone is a senior partner explaining the work &mdash; precise, never sterile.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SERVICE LINES ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">The four service lines</h2>
        <p class="section-head__body">Kilowott ships under four named offerings. Always name the service &mdash; never &ldquo;our digital transformation practice&rdquo; or &ldquo;our AI services.&rdquo; Each line has its own angle on the same voice.</p>
      </div>

      <div class="vc-prin" style="margin-top: var(--s-6);">
        <div>
          <span class="vc-prin__n" style="color: var(--accent);">01 / Service</span>
          <b>Kilowott for <em style="font-style: italic; color: var(--accent);">Brands</em></b>
          <p style="margin: 0 0 12px;">Full operational ownership &mdash; brand, growth, digital, measured in ROI. Not &ldquo;end-to-end digital transformation.&rdquo;</p>
          <p style="margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);">
            <b style="color: var(--fg)">Write like:</b> Named client. Named sector. Named number.<br>
            <b style="color: var(--fg)">Avoid:</b> &ldquo;brand consulting,&rdquo; &ldquo;brand services.&rdquo;
          </p>
        </div>
        <div>
          <span class="vc-prin__n" style="color: var(--accent);">02 / Service</span>
          <b>Kilowott for <em style="font-style: italic; color: var(--accent);">Agencies</em></b>
          <p style="margin: 0 0 12px;">Embedded delivery partner for agencies &mdash; their brand forward, our specialists behind. Not &ldquo;white-label.&rdquo;</p>
          <p style="margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);">
            <b style="color: var(--fg)">Write like:</b> Partnership language. Shared wins. Named disciplines.<br>
            <b style="color: var(--fg)">Avoid:</b> &ldquo;agency partnership program,&rdquo; &ldquo;resource augmentation.&rdquo;
          </p>
        </div>
        <div>
          <span class="vc-prin__n" style="color: var(--accent);">03 / Service</span>
          <b>Kilowott <em style="font-style: italic; color: var(--accent);">Intelligence</em></b>
          <p style="margin: 0 0 12px;">AI with human oversight &mdash; smart systems where the outcome stays accountable. Not &ldquo;GenAI&rdquo; or &ldquo;our AI practice.&rdquo;</p>
          <p style="margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);">
            <b style="color: var(--fg)">Write like:</b> Workflow + oversight. Measurable lift. Named model class.<br>
            <b style="color: var(--fg)">Avoid:</b> &ldquo;cutting-edge AI,&rdquo; &ldquo;transformative GenAI.&rdquo;
          </p>
        </div>
        <div>
          <span class="vc-prin__n" style="color: var(--accent);">04 / Service</span>
          <b>Kilowott <em style="font-style: italic; color: var(--accent);">Workforce</em></b>
          <p style="margin: 0 0 12px;">Cross-functional teams that stand up inside a client&rsquo;s stack and ship. Not &ldquo;staff augmentation&rdquo; or &ldquo;nearshore resourcing.&rdquo;</p>
          <p style="margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--fg-2);">
            <b style="color: var(--fg)">Write like:</b> Team composition. First release date. Named sector.<br>
            <b style="color: var(--fg)">Avoid:</b> &ldquo;FTEs,&rdquo; &ldquo;resources,&rdquo; &ldquo;headcount.&rdquo;
          </p>
        </div>
      </div>

      <div class="card" style="margin-top: var(--s-6); padding: var(--s-6); background: var(--bg-2);">
        <span class="eyebrow eyebrow--accent">The one rule</span>
        <p style="margin-top: 12px; font-family: var(--font-display); font-size: 1.375rem; line-height: 1.3; max-width: 52ch;">
          Name the service, every time. &ldquo;Kilowott Intelligence&rdquo; &mdash; not &ldquo;our AI work.&rdquo; &ldquo;Kilowott for Brands&rdquo; &mdash; not &ldquo;our brand practice.&rdquo;
        </p>
        <p style="margin-top: 12px; color: var(--fg-2); font-size: var(--fs-sm);">The four names are the brand&rsquo;s load-bearing nouns. Generic equivalents erase the difference between Kilowott and the next consultancy.</p>
      </div>
    </div>
  </section>

  <!-- ============ TONE SLIDERS ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Where we sit on the dial</h2>
        <p class="section-head__body">On each axis below, Kilowott leans in one direction &mdash; not to the extreme, but distinctly off centre. These are the choices that shape every piece of copy we ship.</p>
      </div>

      <div class="vc-sliders">
        <!-- Slider 1 -->
        <div class="vc-slider">
          <div class="vc-slider__meta">
            <div class="vc-slider__ends">
              <b>Formal</b>
              <span>vs.</span>
              <b class="vc-slider__ends--us">Plainspoken</b>
            </div>
            <div class="vc-slider__track"><div class="vc-slider__dot" style="left: 82%;"></div></div>
            <p class="vc-slider__caption">Write like you speak at work &mdash; not the way you&rsquo;d address a court. Contractions are welcome. Semicolons, mostly not.</p>
          </div>
          <div class="vc-slider__gloss">
            <div class="vc-slider__gloss-inner">&ldquo;We <em>build teams</em> that extend your capabilities.&rdquo; &mdash; not &ldquo;Our workforce solutions facilitate capability augmentation.&rdquo;</div>
          </div>
        </div>

        <!-- Slider 2 -->
        <div class="vc-slider">
          <div class="vc-slider__meta">
            <div class="vc-slider__ends">
              <b>Cautious</b>
              <span>vs.</span>
              <b class="vc-slider__ends--us">Direct</b>
            </div>
            <div class="vc-slider__track"><div class="vc-slider__dot" style="left: 76%;"></div></div>
            <p class="vc-slider__caption">Say what you mean in the first sentence. The qualifier, if you need it, goes after &mdash; never before.</p>
          </div>
          <div class="vc-slider__gloss">
            <div class="vc-slider__gloss-inner">&ldquo;<em>This won&rsquo;t ship in Q2</em> &mdash; the data migration isn&rsquo;t ready, and we&rsquo;d rather tell you now.&rdquo; &mdash; not &ldquo;Given certain factors, timelines may need revisiting.&rdquo;</div>
          </div>
        </div>

        <!-- Slider 3 -->
        <div class="vc-slider">
          <div class="vc-slider__meta">
            <div class="vc-slider__ends">
              <b>Activity</b>
              <span>vs.</span>
              <b class="vc-slider__ends--us">Outcomes</b>
            </div>
            <div class="vc-slider__track"><div class="vc-slider__dot" style="left: 90%;"></div></div>
            <p class="vc-slider__caption">Describe the result, not the motion. What moved? By how much? Over what window? If you can&rsquo;t answer those three, rewrite.</p>
          </div>
          <div class="vc-slider__gloss">
            <div class="vc-slider__gloss-inner">&ldquo;Sales <em>up 44%</em> for a coffee brand after six months.&rdquo; &mdash; not &ldquo;We drove significant growth through targeted marketing.&rdquo;</div>
          </div>
        </div>

        <!-- Slider 4 -->
        <div class="vc-slider">
          <div class="vc-slider__meta">
            <div class="vc-slider__ends">
              <b>Vendor</b>
              <span>vs.</span>
              <b class="vc-slider__ends--us">Partner</b>
            </div>
            <div class="vc-slider__track"><div class="vc-slider__dot" style="left: 86%;"></div></div>
            <p class="vc-slider__caption">We don&rsquo;t pitch from across the table; we sit at it. Language owns the outcome: &ldquo;we,&rdquo; &ldquo;together,&rdquo; &ldquo;the partnership.&rdquo; Never &ldquo;the client.&rdquo;</p>
          </div>
          <div class="vc-slider__gloss">
            <div class="vc-slider__gloss-inner">&ldquo;We take full operational <em>ownership</em>.&rdquo; &mdash; not &ldquo;We provide end-to-end solutions.&rdquo;</div>
          </div>
        </div>

        <!-- Slider 5 -->
        <div class="vc-slider">
          <div class="vc-slider__meta">
            <div class="vc-slider__ends">
              <b>Abstract</b>
              <span>vs.</span>
              <b class="vc-slider__ends--us">Concrete</b>
            </div>
            <div class="vc-slider__track"><div class="vc-slider__dot" style="left: 86%;"></div></div>
            <p class="vc-slider__caption">Every abstraction earns a concrete next to it. Name the service, the region, the industry, the number. &ldquo;Across Nordics, EU, APAC, EMEA&rdquo; beats &ldquo;globally.&rdquo;</p>
          </div>
          <div class="vc-slider__gloss">
            <div class="vc-slider__gloss-inner">&ldquo;<em>Kilowott for Brands</em> &mdash; full operational ownership, measured in ROI.&rdquo; &mdash; not &ldquo;End-to-end digital transformation.&rdquo;</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ REGISTER MATRIX ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Register shifts by context</h2>
        <p class="section-head__body">Voice is constant; register (warmth, length, permission to be dry) shifts with the audience. Here&rsquo;s the same idea written five ways.</p>
      </div>

      <div class="vc-reg">
        <div class="vc-reg__row">
          <div class="vc-reg__cell vc-reg__head">Context</div>
          <div class="vc-reg__cell vc-reg__head">Tone settings</div>
          <div class="vc-reg__cell vc-reg__head">Example &mdash; agency partnership pitch</div>
          <div class="vc-reg__cell vc-reg__head">Length</div>
        </div>

        <div class="vc-reg__row">
          <div class="vc-reg__cell">
            <div class="vc-reg__label">Sales deck</div>
            <div class="vc-reg__sub">Prospect &middot; first meeting</div>
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__tick">Confident &middot; partner-register</div>
            Lead with the thesis. One claim per slide. Name the service by name &mdash; Kilowott for Brands, Intelligence, Workforce. Pair every abstract with a number.
          </div>
          <div class="vc-reg__cell" style="font-family: var(--font-display); font-size: 20px; letter-spacing: -0.01em; line-height: 1.25;">
            &ldquo;Your team ships faster when our specialists plug into yours. We&rsquo;ll take full operational ownership of the delivery.&rdquo;
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__sub" style="margin-top:0;">10&ndash;14 words<br>per deck headline</div>
          </div>
        </div>

        <div class="vc-reg__row">
          <div class="vc-reg__cell">
            <div class="vc-reg__label">Website hero</div>
            <div class="vc-reg__sub">Stranger &middot; 3 seconds</div>
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__tick">Sharp &middot; thesis-first</div>
            One sentence, one idea. Verbs up front. The website uses three-beat taglines &mdash; &ldquo;Scale faster. Deliver better. Create impact.&rdquo; &mdash; that pattern is the default.
          </div>
          <div class="vc-reg__cell" style="font-family: var(--font-display); font-size: 20px; letter-spacing: -0.01em; line-height: 1.25;">
            &ldquo;Built for what comes next.&rdquo;
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__sub" style="margin-top:0;">4&ndash;9 words<br>per hero line</div>
          </div>
        </div>

        <div class="vc-reg__row">
          <div class="vc-reg__cell">
            <div class="vc-reg__label">Case study</div>
            <div class="vc-reg__sub">Reader has time &middot; wants detail</div>
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__tick">Narrative &middot; ROI-specific</div>
            Situation &rarr; decision &rarr; result, in that order. Name the sector (Telecom, Fintech, Retail, Travel &amp; Hospitality). Every claim cites a number, and every number cites a window.
          </div>
          <div class="vc-reg__cell" style="font-family: var(--font-display); font-size: 18px; letter-spacing: -0.01em; line-height: 1.3;">
            &ldquo;Elevated brand presence and optimised marketing &mdash; sales up <em>44%</em> for a coffee brand over six months.&rdquo;
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__sub" style="margin-top:0;">600&ndash;900 words<br>max</div>
          </div>
        </div>

        <div class="vc-reg__row">
          <div class="vc-reg__cell">
            <div class="vc-reg__label">Product UI</div>
            <div class="vc-reg__sub">User in flow &middot; low patience</div>
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__tick">Instructive &middot; forgiving</div>
            Second person. Active voice. Verbs at the front of buttons. Write the smallest sentence that still answers the question. No exclamation marks.
          </div>
          <div class="vc-reg__cell" style="font-family: var(--font-display); font-size: 18px; letter-spacing: -0.01em; line-height: 1.3;">
            &ldquo;Save a copy before you reset &mdash; this can&rsquo;t be undone.&rdquo;
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__sub" style="margin-top:0;">&lt;15 words<br>per string</div>
          </div>
        </div>

        <div class="vc-reg__row">
          <div class="vc-reg__cell">
            <div class="vc-reg__label">Social / LinkedIn</div>
            <div class="vc-reg__sub">Scroll context &middot; peers &amp; prospects</div>
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__tick">Partnered &middot; proof-led</div>
            Hook in line one &mdash; usually a number or a real outcome. Argument in lines two-to-four. One observation per post, not &ldquo;7 ways to&hellip;&rdquo;. Tag the real partner when it&rsquo;s their win too.
          </div>
          <div class="vc-reg__cell" style="font-family: var(--font-display); font-size: 18px; letter-spacing: -0.01em; line-height: 1.3;">
            &ldquo;Six months, a 44% lift in sales, and a new brand presence a founder can point at. Here&rsquo;s how we got there with the team at [partner].&rdquo;
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__sub" style="margin-top:0;">60&ndash;120 words<br>per post</div>
          </div>
        </div>

        <div class="vc-reg__row">
          <div class="vc-reg__cell">
            <div class="vc-reg__label">Internal / Slack</div>
            <div class="vc-reg__sub">Colleague &middot; high trust</div>
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__tick">Casual &middot; precise</div>
            Drop the throat-clearing. State the question or the answer. &ldquo;Hey team&rdquo; and &ldquo;just checking in&rdquo; cost nothing to skip.
          </div>
          <div class="vc-reg__cell" style="font-family: var(--font-display); font-size: 18px; letter-spacing: -0.01em; line-height: 1.3;">
            &ldquo;Kicking off the Sandnes review Thursday. Two open items &mdash; both on me.&rdquo;
          </div>
          <div class="vc-reg__cell">
            <div class="vc-reg__sub" style="margin-top:0;">2&ndash;4 lines<br>max</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ DO / DON'T COPY ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">The same idea, twice</h2>
        <p class="section-head__body">For every piece of copy, there&rsquo;s a Kilowott version and a generic one. Knowing which is which is the whole job.</p>
      </div>

      <div class="vc-copy">
        <!-- Pair 1 -->
        <div class="vc-copy__card vc-copy__card--dont">
          <div class="vc-copy__tag">Generic</div>
          <p class="vc-copy__quote">Leveraging cutting-edge AI solutions to empower enterprise transformation at scale.</p>
          <p class="vc-copy__why"><b>Problem.</b> Four filler moves in one line &mdash; leverage, cutting-edge, empower, at scale. Nothing the reader can check, nothing the reader can act on.</p>
        </div>
        <div class="vc-copy__card">
          <div class="vc-copy__tag">Kilowott</div>
          <p class="vc-copy__quote">Kilowott Intelligence pairs smart systems with human oversight, so the workflow scales and the outcome stays accountable.</p>
          <p class="vc-copy__why"><b>Why it works.</b> Names the service. Says what it does in one clause. Earns the word &ldquo;scale&rdquo; by pairing it with &ldquo;accountable.&rdquo;</p>
        </div>

        <!-- Pair 2 -->
        <div class="vc-copy__card vc-copy__card--dont">
          <div class="vc-copy__tag">Generic</div>
          <p class="vc-copy__quote">Our innovative platform delivers unparalleled value through seamless integrations and best-in-class UX.</p>
          <p class="vc-copy__why"><b>Problem.</b> Adjective stack. &ldquo;Innovative,&rdquo; &ldquo;unparalleled,&rdquo; &ldquo;seamless,&rdquo; &ldquo;best-in-class&rdquo; are claims the reader has to accept on faith.</p>
        </div>
        <div class="vc-copy__card">
          <div class="vc-copy__tag">Kilowott</div>
          <p class="vc-copy__quote">Sales up 44% for a coffee brand over six months &mdash; brand refresh, paid search, and a rebuilt DTC funnel, in one engagement.</p>
          <p class="vc-copy__why"><b>Why it works.</b> The number is specific, the window is bounded, and the three levers are named. Trust is built from detail, not adjectives.</p>
        </div>

        <!-- Pair 3 -->
        <div class="vc-copy__card vc-copy__card--dont">
          <div class="vc-copy__tag">Generic</div>
          <p class="vc-copy__quote">We are excited to announce a strategic partnership with a leading enterprise client!</p>
          <p class="vc-copy__why"><b>Problem.</b> Exclamation. &ldquo;Excited.&rdquo; &ldquo;Strategic.&rdquo; &ldquo;Leading.&rdquo; Four tells of marketing copy doing the emotional work for the reader.</p>
        </div>
        <div class="vc-copy__card">
          <div class="vc-copy__tag">Kilowott</div>
          <p class="vc-copy__quote">A new engagement, starting today &mdash; Kilowott Workforce is standing up a cross-functional team with a Nordic logistics partner. First release in Q3.</p>
          <p class="vc-copy__why"><b>Why it works.</b> Says what&rsquo;s happening, which service, which sector, which region, and when. No adjectives needed.</p>
        </div>

        <!-- Pair 4 -->
        <div class="vc-copy__card vc-copy__card--dont">
          <div class="vc-copy__tag">Generic</div>
          <p class="vc-copy__quote">Hey team, just circling back on the above &mdash; any thoughts when you have a sec?</p>
          <p class="vc-copy__why"><b>Problem.</b> Five words of weather before the question. No deadline. No ownership. The reader has to decode what&rsquo;s being asked.</p>
        </div>
        <div class="vc-copy__card">
          <div class="vc-copy__tag">Kilowott</div>
          <p class="vc-copy__quote">Need a call on the Sandnes rollout by Thursday &mdash; Priya owns the decision.</p>
          <p class="vc-copy__why"><b>Why it works.</b> The ask, the deadline, the decider, in one line. The reader knows within seconds what&rsquo;s expected of them.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ VOCAB ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Words we use &middot; words we don&rsquo;t</h2>
        <p class="section-head__body">Vocabulary is a shortcut. Two columns, one rule: when in doubt, the left column wins.</p>
      </div>

      <div class="vc-vocab">
        <div class="vc-vocab__col vc-vocab__col--use">
          <div class="vc-vocab__head vc-vocab__head--use">
            <b>Use <em>this</em></b>
            <span>The house word</span>
          </div>
          <div class="vc-vocab__body">
            <div class="vc-vocab__row"><div>partner</div><div>vendor, supplier, provider</div></div>
            <div class="vc-vocab__row"><div>deliver / ship</div><div>roll out, produce, operationalise</div></div>
            <div class="vc-vocab__row"><div>measurable</div><div>impactful, meaningful, significant</div></div>
            <div class="vc-vocab__row"><div>outcome / ROI</div><div>value, deliverable, output</div></div>
            <div class="vc-vocab__row"><div>ownership</div><div>accountability, responsibility</div></div>
            <div class="vc-vocab__row"><div>team / specialists</div><div>resources, headcount, FTEs</div></div>
            <div class="vc-vocab__row"><div>build</div><div>develop, engineer, productise</div></div>
            <div class="vc-vocab__row"><div>help / support</div><div>enable, empower, facilitate</div></div>
            <div class="vc-vocab__row"><div>use</div><div>leverage, utilise, harness</div></div>
            <div class="vc-vocab__row"><div>Kilowott Intelligence</div><div>our AI offering, GenAI, our AI practice</div></div>
            <div class="vc-vocab__row"><div>Kilowott for Brands</div><div>brand consulting, brand services</div></div>
            <div class="vc-vocab__row"><div>Kilowott for Agencies</div><div>white-label, agency partnership</div></div>
          </div>
        </div>

        <div class="vc-vocab__col vc-vocab__col--avoid">
          <div class="vc-vocab__head">
            <b>Avoid</b>
            <span>Consultant-speak</span>
          </div>
          <div class="vc-vocab__body">
            <div class="vc-vocab__row"><div>leverage</div><div>use. always just &ldquo;use.&rdquo;</div></div>
            <div class="vc-vocab__row"><div>empower</div><div>help. or &ldquo;let,&rdquo; even better.</div></div>
            <div class="vc-vocab__row"><div>unlock</div><div>make possible. or cut it.</div></div>
            <div class="vc-vocab__row"><div>synergy</div><div>never. ever.</div></div>
            <div class="vc-vocab__row"><div>best-in-class</div><div>the evidence, not the claim.</div></div>
            <div class="vc-vocab__row"><div>cutting-edge</div><div>the thing itself. name it.</div></div>
            <div class="vc-vocab__row"><div>at scale</div><div>a number. give the number.</div></div>
            <div class="vc-vocab__row"><div>seamless</div><div>a lie unless you&rsquo;ve watched someone use it.</div></div>
            <div class="vc-vocab__row"><div>end-to-end</div><div>&ldquo;from brief to launch,&rdquo; named stages.</div></div>
            <div class="vc-vocab__row"><div>tailored solutions</div><div>the engagement model by name.</div></div>
            <div class="vc-vocab__row"><div>excited to announce</div><div>just announce.</div></div>
            <div class="vc-vocab__row"><div>revolutionary / game-changing</div><div>the change, not the label.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ MECHANICS ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Mechanics &amp; house style</h2>
        <p class="section-head__body">The small choices that stack into consistency. When in doubt &mdash; AP style, with the overrides below.</p>
      </div>

      <div class="vc-mech">
        <div class="vc-mech__cell">
          <div class="vc-mech__head">Punctuation</div>
          <h4>Cleaner than it wants to be.</h4>
          <ul class="vc-mech__list">
            <li><b>Oxford comma</b><span>Yes</span></li>
            <li><b>Em dash</b><span>Unspaced &mdash;</span></li>
            <li><b>Semicolon</b><span>Almost never</span></li>
            <li><b>Exclamation</b><span>Never</span></li>
            <li><b>Ellipsis for drama</b><span>Never</span></li>
            <li><b>Curly quotes</b><span>Always</span></li>
            <li><b>Sentence case titles</b><span>Default</span></li>
          </ul>
        </div>
        <div class="vc-mech__cell">
          <div class="vc-mech__head">Numbers &amp; data</div>
          <h4>Specific beats impressive.</h4>
          <ul class="vc-mech__list">
            <li><b>One to nine</b><span>Spell out</span></li>
            <li><b>10+</b><span>Numerals</span></li>
            <li><b>Percentages</b><span>6%, not 6 percent</span></li>
            <li><b>Currency</b><span>$4.2M, not $4,200,000</span></li>
            <li><b>Large numbers</b><span>Round, never &ldquo;-ish&rdquo;</span></li>
            <li><b>Ranges</b><span>6&ndash;9, en dash</span></li>
            <li><b>Attribution</b><span>Every stat cites a source</span></li>
          </ul>
        </div>
        <div class="vc-mech__cell">
          <div class="vc-mech__head">Names &amp; terms</div>
          <h4>Write them the way they&rsquo;re said.</h4>
          <ul class="vc-mech__list">
            <li><b>Company</b><span>Kilowott (one word)</span></li>
            <li><b>People</b><span>First name, after first mention</span></li>
            <li><b>Product names</b><span>Title case, no The</span></li>
            <li><b>Clients</b><span>How they write themselves</span></li>
            <li><b>Acronyms</b><span>Spell on first use</span></li>
            <li><b>Job titles</b><span>Lowercase in prose</span></li>
            <li><b>Teams</b><span>&ldquo;Brand team,&rdquo; not &ldquo;Team Brand&rdquo;</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ LENGTH LADDER ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Length ladder</h2>
        <p class="section-head__body">A rough guide to how long things want to be. Shorter is almost always fine &mdash; longer needs a reason.</p>
      </div>

      <div class="vc-lad">
        <div class="vc-lad__row">
          <div class="vc-lad__meta">4&ndash;9 words<b>Hero line</b></div>
          <div class="vc-lad__body">One thought. One verb. Website hero, cover slide, ad creative. <em>Three-beat taglines are the default &mdash; &ldquo;Scale faster. Deliver better. Create impact.&rdquo;</em></div>
        </div>
        <div class="vc-lad__row">
          <div class="vc-lad__meta">10&ndash;14 words<b>Deck headline</b></div>
          <div class="vc-lad__body">One sentence per slide. Leads with the argument, not the topic. <em>Every slide should be screenshot-able into a post.</em></div>
        </div>
        <div class="vc-lad__row">
          <div class="vc-lad__meta">25&ndash;40 words<b>Subhead / lede</b></div>
          <div class="vc-lad__body">Expands the hero with proof, region, or sector. Never repeats the hero&rsquo;s verbs. <em>If you could cut it and lose nothing, cut it.</em></div>
        </div>
        <div class="vc-lad__row">
          <div class="vc-lad__meta">60&ndash;120 words<b>Social post</b></div>
          <div class="vc-lad__body">Hook &rarr; argument &rarr; evidence. One observation per post &mdash; not a list. <em>Paragraph breaks, not bullet lists.</em></div>
        </div>
        <div class="vc-lad__row">
          <div class="vc-lad__meta">250&ndash;400<b>Service blurb</b></div>
          <div class="vc-lad__body">What the service does, who it&rsquo;s for, what result. Name the service (Brands, Agencies, Intelligence, Workforce). <em>Numbers over adjectives.</em></div>
        </div>
        <div class="vc-lad__row">
          <div class="vc-lad__meta">600&ndash;900<b>Case study</b></div>
          <div class="vc-lad__body">Situation &rarr; decision &rarr; result, in that order. Name the sector. Include what didn&rsquo;t work. <em>Every number earns a window.</em></div>
        </div>
        <div class="vc-lad__row">
          <div class="vc-lad__meta">1,200&ndash;1,800<b>POV / essay</b></div>
          <div class="vc-lad__body">An argument worth making &mdash; usually from leadership, a principal, or a practice head. <em>Byline or it didn&rsquo;t happen.</em></div>
        </div>
      </div>
    </div>
  </section>
  `;
};
