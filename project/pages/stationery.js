/* ============================================================
   STATIONERY — print kit
   Business cards · letterhead · envelope · compliments slip ·
   notebook cover · presentation folder · stickers · print specs.
   All mocks at correct aspect ratios for the format. Real Kilowott
   offices, real address blocks (no New York), real tagline.
   ============================================================ */

window.renderStationery = function (root) {

  // Real Kilowott offices — pulled from kilowott.com
  const OFFICES = {
    norway1: { line1: 'Waterbear AS', line2: 'Haugstentunet 16', line3: '1637 Gamle Fredrikstad', country: 'Norway' },
    norway2: { line1: 'FOMO WORKS',    line2: 'Grenseveien 21',   line3: '4313 Sandnes',           country: 'Norway' },
    india:   { line1: 'Nordic Intent', line2: 'Lane 4, PDA Colony', line3: 'Porvorim, Goa',         country: 'India' },
    dubai:   { line1: 'Kilowott DXB',  line2: 'Meydan Grandstand', line3: '6th floor',              country: 'Dubai' },
  };

  root.innerHTML = `
  <style>
    /* ---- HERO ---- */
    .st-hero { padding: var(--s-9) 0 var(--s-7); border-bottom: 1px solid var(--rule); }
    .st-hero h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .st-hero h1 em { font-style: italic; color: var(--accent); }
    .st-hero__lede { margin-top: 22px; max-width: 62ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }

    /* ---- SECTION HEAD ---- */
    .st-sec {
      display: flex; align-items: baseline; gap: 16px;
      margin-bottom: var(--s-6);
    }
    .st-sec__h {
      font-family: var(--font-display);
      font-size: var(--fs-d3); line-height: 1.1; letter-spacing: -0.02em;
    }
    .st-sec__sub {
      margin-left: auto;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2);
    }

    /* ---- CARD WRAPPER ---- */
    .st-card {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden; background: var(--bg-2);
    }
    .st-card__stage {
      padding: 40px 32px;
      display: grid; place-items: center;
      min-height: 280px;
    }
    .st-card__cap {
      padding: 14px 20px; border-top: 1px solid var(--rule);
      font-size: 13px; color: var(--fg-2); line-height: 1.5;
      background: var(--bg);
    }
    .st-card__cap b { color: var(--fg); font-weight: 500; }

    /* ---- GRID ---- */
    .st-grid { display: grid; gap: var(--s-5); grid-template-columns: 1fr 1fr; }
    .st-grid--3 { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 1100px) { .st-grid--3 { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 720px)  { .st-grid, .st-grid--3 { grid-template-columns: 1fr; } }

    /* ============================================================
       BUSINESS CARD — 88×54mm at 1:1 ratio
       ============================================================ */
    .st-bc {
      width: 100%; max-width: 380px;
      aspect-ratio: 88/54;
      box-shadow: 0 4px 12px rgba(11,15,20,0.12), 0 0 0 1px rgba(11,15,20,0.04);
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    .st-bc--front {
      background: #FFFFFF;
      padding: 22px 28px 22px 24px;
      display: flex; flex-direction: column; justify-content: space-between;
      color: #0B0F14;
    }
    .st-bc__bolt-mark {
      width: 28px; height: 28px;
      background: #fff;
    }
    .st-bc__bolt-mark img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-bc__bottom {
      display: flex; justify-content: space-between; align-items: flex-end;
      gap: 16px;
    }
    .st-bc__id { min-width: 0; }
    .st-bc__name {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 19px; line-height: 1.1; letter-spacing: -0.01em;
      font-weight: 500; color: #0B0F14;
    }
    .st-bc__title {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #5B6573; margin-top: 4px;
    }
    .st-bc__contact {
      text-align: right;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px; line-height: 1.55;
      color: #1A2230;
      flex-shrink: 0;
    }
    .st-bc__contact b { color: #0B0F14; font-weight: 500; display: block; font-size: 9px; }
    .st-bc__rule {
      position: absolute; top: 0; right: 0;
      width: 4px; height: 100%; background: #E4022D;
    }
    .st-bc--back {
      background: #0B0F14;
      display: grid; place-items: center;
    }
    .st-bc--back .st-bc__bolt {
      width: 64px; height: 64px;
      filter: invert(1);
      opacity: 0.95;
    }
    .st-bc--back .st-bc__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-bc--alt {
      background: #E4022D;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 24px;
      color: #FFFFFF;
    }
    .st-bc--alt .st-bc__tag {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 22px; line-height: 1.05; letter-spacing: -0.015em;
      font-style: italic;
      max-width: 14ch;
    }
    .st-bc--alt .st-bc__url {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 10px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
    }

    /* ============================================================
       LETTERHEAD — A4 portrait at scale
       ============================================================ */
    .st-letter {
      width: 100%; max-width: 360px;
      aspect-ratio: 210/297;
      background: #FFFFFF; color: #0B0F14;
      box-shadow: 0 6px 20px rgba(11,15,20,0.12), 0 0 0 1px rgba(11,15,20,0.04);
      border-radius: 2px;
      padding: 28px 28px 24px;
      display: flex; flex-direction: column;
      font-family: 'DM Sans', Arial, sans-serif;
      position: relative;
    }
    .st-letter__head {
      display: flex; justify-content: space-between; align-items: flex-start;
      padding-bottom: 18px;
      border-bottom: 1px solid #E2DED6;
    }
    .st-letter__bolt { width: 22px; height: 22px; }
    .st-letter__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-letter__addr {
      text-align: right;
      font-size: 6px; line-height: 1.5; color: #5B6573;
      letter-spacing: 0.04em;
    }
    .st-letter__addr b { color: #0B0F14; font-weight: 500; display: block; }
    .st-letter__date {
      margin-top: 16px;
      font-size: 7px; color: #5B6573;
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .st-letter__greet {
      margin-top: 14px;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 12px;
      color: #0B0F14;
    }
    .st-letter__body {
      margin-top: 10px;
      font-size: 7px; line-height: 1.6;
      color: #1A2230;
      flex: 1;
    }
    .st-letter__body p { margin: 0 0 6px; }
    .st-letter__sign {
      font-family: 'Newsreader', Georgia, serif;
      font-style: italic;
      font-size: 11px;
      color: #0B0F14;
      margin-top: 8px;
    }
    .st-letter__sign-meta {
      font-size: 6px; color: #5B6573;
      letter-spacing: 0.08em; text-transform: uppercase;
      margin-top: 2px;
    }
    .st-letter__foot {
      margin-top: 12px; padding-top: 10px;
      border-top: 1px solid #E2DED6;
      display: flex; justify-content: space-between;
      font-size: 5px; color: #8A95A5;
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .st-letter__foot em { font-style: normal; color: #E4022D; }

    /* ============================================================
       ENVELOPE — DL 110×220mm (or US #10 105×242mm)
       ============================================================ */
    .st-env {
      width: 100%; max-width: 480px;
      aspect-ratio: 220/110;
      background: #F6F4F0;
      box-shadow: 0 4px 12px rgba(11,15,20,0.1), 0 0 0 1px rgba(11,15,20,0.04);
      border-radius: 2px;
      padding: 18px 22px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      position: relative;
      overflow: hidden;
    }
    .st-env::after {
      content: ""; position: absolute;
      top: 0; left: 50%; right: 0; bottom: 50%;
      background: linear-gradient(135deg, transparent 49.5%, rgba(11,15,20,0.05) 50%, transparent 50.5%);
      pointer-events: none;
    }
    .st-env__return {
      display: flex; gap: 8px;
      align-items: flex-start;
    }
    .st-env__bolt { width: 16px; height: 16px; flex-shrink: 0; }
    .st-env__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-env__return-text {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 7px; line-height: 1.55;
      color: #5B6573; letter-spacing: 0.04em;
    }
    .st-env__return-text b { color: #0B0F14; font-weight: 500; display: block; font-size: 8px; letter-spacing: 0.02em; }
    .st-env__to {
      align-self: end; justify-self: end;
      text-align: left;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 11px; line-height: 1.4;
      color: #0B0F14;
      max-width: 60%;
    }
    .st-env__to-meta {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 6px;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #5B6573;
      margin-top: 4px;
    }
    .st-env__rule {
      position: absolute;
      left: 0; bottom: 0;
      width: 100%; height: 4px;
      background: #E4022D;
    }

    /* ============================================================
       COMPLIMENTS SLIP — 1/3 A4 (210×99mm)
       ============================================================ */
    .st-slip {
      width: 100%; max-width: 480px;
      aspect-ratio: 210/99;
      background: #FFFFFF;
      box-shadow: 0 4px 12px rgba(11,15,20,0.1), 0 0 0 1px rgba(11,15,20,0.04);
      border-radius: 2px;
      padding: 20px 26px;
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative;
    }
    .st-slip__top { display: flex; justify-content: space-between; align-items: flex-start; }
    .st-slip__bolt { width: 22px; height: 22px; }
    .st-slip__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-slip__head {
      font-family: 'Newsreader', Georgia, serif;
      font-style: italic;
      font-size: 24px; line-height: 1.05; letter-spacing: -0.015em;
      color: #0B0F14;
    }
    .st-slip__head em { color: #E4022D; }
    .st-slip__from {
      text-align: right;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 8px; line-height: 1.5;
      color: #5B6573; letter-spacing: 0.04em;
    }
    .st-slip__from b { display: block; color: #0B0F14; font-weight: 500; font-size: 9px; }
    .st-slip__rule {
      width: 36px; height: 1px; background: #E4022D;
      margin-top: auto;
    }

    /* ============================================================
       NOTEBOOK — A5 cover (148×210mm)
       ============================================================ */
    .st-book {
      width: 100%; max-width: 240px;
      aspect-ratio: 148/210;
      background: #0B0F14;
      box-shadow: 0 8px 24px rgba(11,15,20,0.18), 0 0 0 1px rgba(11,15,20,0.06);
      border-radius: 4px;
      padding: 28px 24px;
      display: flex; flex-direction: column; justify-content: space-between;
      color: #FFFFFF;
      position: relative;
      overflow: hidden;
    }
    .st-book::before {
      /* spine line */
      content: ""; position: absolute;
      left: 8px; top: 0; bottom: 0;
      width: 1px; background: rgba(255,255,255,0.15);
    }
    .st-book__bolt { width: 80px; height: 80px; align-self: flex-start; filter: invert(1); }
    .st-book__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-book__head {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 26px; line-height: 1.05; letter-spacing: -0.015em;
      font-weight: 400;
    }
    .st-book__head em { font-style: italic; color: #E4022D; }
    .st-book__foot {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px; font-weight: 500;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: rgba(255,255,255,0.65);
    }

    /* ============================================================
       FOLDER — A4 pocket folder
       ============================================================ */
    .st-folder {
      width: 100%; max-width: 280px;
      aspect-ratio: 210/297;
      background: #1A2230;
      box-shadow: 0 8px 24px rgba(11,15,20,0.18), 0 0 0 1px rgba(11,15,20,0.06);
      border-radius: 4px;
      padding: 32px 26px 24px;
      display: flex; flex-direction: column; justify-content: space-between;
      color: #FFFFFF;
      position: relative;
      overflow: hidden;
    }
    .st-folder::after {
      /* pocket fold line */
      content: ""; position: absolute;
      left: 0; right: 0; bottom: 30%;
      height: 1px; background: rgba(255,255,255,0.18);
    }
    .st-folder__head {
      display: flex; justify-content: space-between; align-items: flex-start;
    }
    .st-folder__bolt { width: 26px; height: 26px; filter: invert(1); }
    .st-folder__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-folder__doc {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 8px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(255,255,255,0.65);
      text-align: right;
    }
    .st-folder__title {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 28px; line-height: 1.04; letter-spacing: -0.02em;
      max-width: 14ch;
      color: #FFFFFF;
    }
    .st-folder__title em { font-style: italic; color: #E4022D; }
    .st-folder__foot {
      display: flex; justify-content: space-between; align-items: end;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 8px;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(255,255,255,0.55);
    }
    .st-folder__pocket-text { font-style: italic; }

    /* ============================================================
       STICKERS
       ============================================================ */
    .st-stickers {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    @media (max-width: 720px) { .st-stickers { grid-template-columns: repeat(2, 1fr); } }
    .st-sticker {
      aspect-ratio: 1/1;
      display: grid; place-items: center;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(11,15,20,0.15), inset 0 0 0 2px rgba(255,255,255,0.4);
      position: relative;
    }
    .st-sticker--white { background: #FFFFFF; }
    .st-sticker--ink   { background: #0B0F14; }
    .st-sticker--red   { background: #E4022D; box-shadow: 0 4px 12px rgba(228,2,45,0.25), inset 0 0 0 2px rgba(255,255,255,0.45); }
    .st-sticker--die {
      border-radius: 8px;
      background: transparent;
      box-shadow: 0 4px 12px rgba(11,15,20,0.15);
      overflow: visible;
    }
    .st-sticker__bolt { width: 50%; height: 50%; }
    .st-sticker__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .st-sticker--ink .st-sticker__bolt { filter: invert(1); }
    .st-sticker--red .st-sticker__bolt { filter: invert(1); }
    .st-sticker--die .st-sticker__bolt { width: 80%; height: 80%; }

    /* ============================================================
       SPECS TABLE
       ============================================================ */
    .st-specs {
      list-style: none; padding: 0; margin: 0;
      border-top: 1px solid var(--rule);
    }

    /* ============================================================
       PRINT NOTES
       ============================================================ */
    .st-howto { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-5); margin-top: var(--s-7); }
    @media (max-width: 900px) { .st-howto { grid-template-columns: 1fr; } }
    .st-step { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 22px; background: var(--bg); }
    .st-step__num { font-family: var(--font-display); font-size: 28px; line-height: 1; color: var(--accent); letter-spacing: -0.02em; margin-bottom: 10px; font-style: italic; }
    .st-step__h { font-family: var(--font-display); font-size: 19px; line-height: 1.2; letter-spacing: -0.01em; color: var(--fg); margin-bottom: 8px; }
    .st-step__b { font-size: 13px; color: var(--fg-2); line-height: 1.55; }
    .st-step__b code {
      font-family: var(--font-mono); font-size: 12px;
      background: var(--bg-2); padding: 1px 6px; border-radius: 3px;
      color: var(--fg);
    }
  </style>

  <!-- HERO -->
  <section class="st-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">13 · Stationery</span>
      <h1>The kit that <em>arrives</em> in print.</h1>
      <p class="st-hero__lede">
        Business cards, letterhead, envelopes, compliments slips, notebooks, folders and stickers &mdash;
        the print system that follows the brand off-screen. All mocks at the correct paper size and
        ratio. Real Kilowott offices on every address block. Design files live alongside the SVG mark
        in <code style="font-family:var(--font-mono);font-size:13px;">/assets/</code>.
      </p>
    </div>
  </section>

  <!-- ============================================================
       BUSINESS CARDS
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="st-sec">
        <h2 class="st-sec__h">Business cards</h2>
        <span class="st-sec__sub">88×54mm · 350gsm uncoated · 4-edge cut</span>
      </div>

      <div class="st-grid st-grid--3">
        <div class="st-card">
          <div class="st-card__stage">
            <div class="st-bc st-bc--front">
              <div class="st-bc__rule"></div>
              <div class="st-bc__bolt-mark"><img src="assets/kilowott-bolt.jpg" alt="Kilowott"></div>
              <div class="st-bc__bottom">
                <div class="st-bc__id">
                  <div class="st-bc__name">Ola Nordmann</div>
                  <div class="st-bc__title">Senior Brand Strategist</div>
                </div>
                <div class="st-bc__contact">
                  <b>ola.nordmann@kilowott.com</b>
                  +47 925 11 386<br>
                  kilowott.com
                </div>
              </div>
            </div>
          </div>
          <div class="st-card__cap"><b>Front</b> &middot; bolt top-left, name in Newsreader, title in DM Sans uppercase, contact bottom-right, 4mm red rule along the right edge.</div>
        </div>

        <div class="st-card">
          <div class="st-card__stage">
            <div class="st-bc st-bc--back">
              <div class="st-bc__bolt"><img src="assets/kilowott-bolt.jpg" alt="Kilowott"></div>
            </div>
          </div>
          <div class="st-card__cap"><b>Back</b> &middot; ink black, bolt centered, white-on-ink (filter invert). No URL on the back &mdash; the front carries it.</div>
        </div>

        <div class="st-card">
          <div class="st-card__stage">
            <div class="st-bc st-bc--alt">
              <div class="st-bc__tag">Built for what comes next.</div>
              <div class="st-bc__url">kilowott.com</div>
            </div>
          </div>
          <div class="st-card__cap"><b>Tagline back · alt</b> &middot; red field, italic Newsreader tagline, URL in DM Sans uppercase. Use this back when the card is being handed to someone who already knows you.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       LETTERHEAD + COMPLIMENTS SLIP
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="st-sec">
        <h2 class="st-sec__h">Letterhead &amp; compliments</h2>
        <span class="st-sec__sub">A4 210×297mm · 100gsm uncoated · single-sided</span>
      </div>

      <div class="st-grid">
        <div class="st-card">
          <div class="st-card__stage">
            <div class="st-letter">
              <div class="st-letter__head">
                <div class="st-letter__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
                <div class="st-letter__addr">
                  <b>Kilowott · Sandnes</b>
                  ${OFFICES.norway2.line1}<br>
                  ${OFFICES.norway2.line2}<br>
                  ${OFFICES.norway2.line3}, ${OFFICES.norway2.country}
                </div>
              </div>
              <div class="st-letter__date">26 April 2026 · Sandnes</div>
              <div class="st-letter__greet">Dear Priya,</div>
              <div class="st-letter__body">
                <p>Following our conversation last week, I wanted to put a few things in writing — both as a
                summary and as the start of the engagement note we'll keep updated through Q2.</p>
                <p>The scope as we understood it: a brand audit running parallel to the SEO and content work
                already in flight. Two senior leads on our side, your team contributing one product reviewer
                per week, weekly read-outs every Thursday at 10:00 CET.</p>
                <p>If anything in the above doesn't match your read of it, send a note back before Friday and
                we'll redraft. Otherwise we'll consider this confirmation and start Monday.</p>
              </div>
              <div class="st-letter__sign">Ola Nordmann,</div>
              <div class="st-letter__sign-meta">Senior Brand Strategist · Kilowott</div>
              <div class="st-letter__foot">
                <span>Kilowott LLP</span>
                <span><em>Built for what comes next.</em></span>
                <span>kilowott.com</span>
              </div>
            </div>
          </div>
          <div class="st-card__cap"><b>Letterhead · A4</b> &middot; bolt top-left, sender address top-right (right-aligned), date in mono uppercase, body in DM Sans 10pt, signature in italic Newsreader. Footer line carries reg, tagline, URL.</div>
        </div>

        <div class="st-card">
          <div class="st-card__stage">
            <div class="st-slip">
              <div class="st-slip__top">
                <div class="st-slip__head">With <em>compliments</em>—</div>
                <div class="st-slip__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
              </div>
              <div class="st-slip__rule"></div>
              <div style="display:flex;justify-content:space-between;align-items:flex-end;">
                <div class="st-slip__from">
                  <b>Kilowott · Goa</b>
                  ${OFFICES.india.line1}, ${OFFICES.india.line2}<br>
                  ${OFFICES.india.line3}, ${OFFICES.india.country} &middot; kilowott.com
                </div>
              </div>
            </div>
          </div>
          <div class="st-card__cap"><b>Compliments slip · 1/3 A4 (210×99mm)</b> &middot; "With compliments—" in italic Newsreader, italic accent on the second word, bolt top-right, address footer left.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       ENVELOPE
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="st-sec">
        <h2 class="st-sec__h">Envelope</h2>
        <span class="st-sec__sub">DL 110×220mm · uncoated · printed return + 4mm red foot rule</span>
      </div>

      <div class="st-card">
        <div class="st-card__stage">
          <div class="st-env">
            <div class="st-env__return">
              <div class="st-env__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
              <div class="st-env__return-text">
                <b>Kilowott · Sandnes</b>
                ${OFFICES.norway2.line1}, ${OFFICES.norway2.line2}<br>
                ${OFFICES.norway2.line3}, ${OFFICES.norway2.country}
              </div>
            </div>
            <div></div>
            <div></div>
            <div class="st-env__to">
              Priya Mehta<br>
              Nordic Data Holdings AS<br>
              Karenslyst Allé 8<br>
              0278 Oslo, Norway
              <div class="st-env__to-meta">priority · do not bend</div>
            </div>
            <div class="st-env__rule"></div>
          </div>
        </div>
        <div class="st-card__cap"><b>DL envelope</b> &middot; return address top-left with bolt, recipient bottom-right in Newsreader (mailers parse this position best), 4mm red rule along the bottom edge as the brand cue. Window envelopes follow the same logic with a 90×40mm window cut at left.</div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       NOTEBOOK + FOLDER
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="st-sec">
        <h2 class="st-sec__h">Notebook &amp; folder</h2>
        <span class="st-sec__sub">A5 notebook · A4 pocket folder · debossed bolt</span>
      </div>

      <div class="st-grid">
        <div class="st-card">
          <div class="st-card__stage">
            <div class="st-book">
              <div class="st-book__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
              <div>
                <div class="st-book__head">Field <em>notes</em>.</div>
              </div>
              <div class="st-book__foot">Kilowott &middot; vol. 04</div>
            </div>
          </div>
          <div class="st-card__cap"><b>Notebook · A5 (148×210mm)</b> &middot; ink cover, debossed bolt top-left, italic title third-down, volume number footer. Section sewn binding, dot-grid interior, red bookmark ribbon.</div>
        </div>

        <div class="st-card">
          <div class="st-card__stage">
            <div class="st-folder">
              <div class="st-folder__head">
                <div class="st-folder__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
                <div class="st-folder__doc">Engagement<br>brief</div>
              </div>
              <div class="st-folder__title">Strategy + execution &mdash; <em>partnership</em>.</div>
              <div class="st-folder__foot">
                <span>Kilowott</span>
                <span class="st-folder__pocket-text">contains: brief · contract · invoice</span>
              </div>
            </div>
          </div>
          <div class="st-card__cap"><b>Pocket folder · A4</b> &middot; ink-on-ink with debossed bolt, title in Newsreader carries the project name, footer divider sits where the pocket fold lives. One folder per engagement, named on the spine.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       STICKERS
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="st-sec">
        <h2 class="st-sec__h">Stickers</h2>
        <span class="st-sec__sub">50×50mm round &middot; die-cut bolt &middot; matte vinyl</span>
      </div>

      <div class="st-card">
        <div class="st-card__stage" style="padding: 56px 32px;">
          <div class="st-stickers">
            <div class="st-sticker st-sticker--white">
              <div class="st-sticker__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
            </div>
            <div class="st-sticker st-sticker--ink">
              <div class="st-sticker__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
            </div>
            <div class="st-sticker st-sticker--red">
              <div class="st-sticker__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
            </div>
            <div class="st-sticker st-sticker--die">
              <div class="st-sticker__bolt"><img src="assets/kilowott-bolt.jpg" alt=""></div>
            </div>
          </div>
        </div>
        <div class="st-card__cap"><b>Sticker family</b> &middot; round on white, round on ink (white bolt), round on red (white bolt), die-cut bolt. Use the white version on dark surfaces, the ink version on light. Red sticker for events only &mdash; not as a standalone profile mark.</div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       PRINT SPECS
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Print specs</h2>
        <p class="section-head__body">The numbers. Send these to any printer &mdash; locally in Norway, India, or Dubai. CMYK conversion notes for the brand red are below.</p>
      </div>

      <ul class="st-specs">
        <li class="token-row"><span class="token-row__label">Business card</span><span class="token-row__meta">88 × 54 mm &middot; 350gsm uncoated &middot; 4-edge cut &middot; 3mm bleed</span></li>
        <li class="token-row"><span class="token-row__label">Letterhead</span><span class="token-row__meta">A4 210 × 297 mm &middot; 100gsm uncoated &middot; single-sided</span></li>
        <li class="token-row"><span class="token-row__label">Compliments slip</span><span class="token-row__meta">210 × 99 mm (1/3 A4) &middot; 100gsm uncoated</span></li>
        <li class="token-row"><span class="token-row__label">Envelope</span><span class="token-row__meta">DL 110 × 220 mm &middot; printed return &middot; 4mm red foot rule</span></li>
        <li class="token-row"><span class="token-row__label">Notebook</span><span class="token-row__meta">A5 148 × 210 mm &middot; section-sewn &middot; dot grid &middot; debossed bolt</span></li>
        <li class="token-row"><span class="token-row__label">Pocket folder</span><span class="token-row__meta">A4 closed &middot; debossed bolt &middot; ink-on-ink, no foil</span></li>
        <li class="token-row"><span class="token-row__label">Round sticker</span><span class="token-row__meta">50 mm dia &middot; matte vinyl &middot; kiss-cut on a sheet of 6</span></li>
        <li class="token-row"><span class="token-row__label">Brand red &mdash; CMYK</span><span class="token-row__meta">C 0 / M 100 / Y 87 / K 5 (Pantone 186 C nearest)</span></li>
        <li class="token-row"><span class="token-row__label">Ink black &mdash; CMYK</span><span class="token-row__meta">C 60 / M 50 / Y 50 / K 100 (rich black, never plain K)</span></li>
        <li class="token-row"><span class="token-row__label">Body type &mdash; print</span><span class="token-row__meta">DM Sans 10pt body / 8pt foot &middot; Newsreader 18pt+ display</span></li>
        <li class="token-row"><span class="token-row__label">Embellishments</span><span class="token-row__meta">Deboss the bolt where budget allows &middot; never foil &middot; never spot UV</span></li>
      </ul>
    </div>
  </section>

  <!-- ============================================================
       PRINT NOTES — three rules
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="st-howto">
        <div class="st-step">
          <div class="st-step__num">01</div>
          <div class="st-step__h">Uncoated stock, always.</div>
          <p class="st-step__b">Brand reads warmer on uncoated paper &mdash; the red softens, the ink looks less plastic. If a printer pushes silk or gloss, push back. 350gsm cards, 100gsm correspondence.</p>
        </div>
        <div class="st-step">
          <div class="st-step__num">02</div>
          <div class="st-step__h">Bolt &mdash; deboss, don't print.</div>
          <p class="st-step__b">Where budget allows, deboss the bolt instead of printing it. The mark earns more presence as a tactile shape than as a third color. Never foil it &mdash; the bolt isn't decorative.</p>
        </div>
        <div class="st-step">
          <div class="st-step__num">03</div>
          <div class="st-step__h">Real address, every time.</div>
          <p class="st-step__b">Stationery uses one of the four real offices &mdash; <code>Fredrikstad</code>, <code>Sandnes</code>, <code>Goa</code>, <code>Dubai</code>. Pick the office of the named sender, never the head office by default.</p>
        </div>
      </div>
    </div>
  </section>
  `;
};
