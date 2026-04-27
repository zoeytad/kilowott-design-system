/* ============================================================
   MAGAZINE — Framework redesign in the Kilowott register
   Cover + four article spread variations (opener, profile,
   stat, section divider). Real Framework #003 content used —
   the agencies, testimonials, and pillars are from the live
   issue at kilowott.com/framework-edition/.
   ============================================================ */

window.renderMagazine = function (root) {

  // Reusable photo paths
  const PHOTO = {
    teamGroup:    'assets/photos/team-portrait-group.jpg',
    teamLaugh:    'assets/photos/team-laughing-meeting.jpg',
    teamFocused:  'assets/photos/team-focused-laptop.jpg',
    teamWorkshop: 'assets/photos/team-seated-workshop.jpg',
    teamStanding: 'assets/photos/team-standing-discussion.jpg',
    leader:       'assets/photos/portrait-leader-window.jpg',
    portraitTab:  'assets/photos/portrait-woman-tablet.jpg',
    portraitPhone:'assets/photos/portrait-woman-phone.jpg',
    pairWarm:     'assets/photos/pair-working-warm.jpg',
    nordic:       'assets/photos/landscape-nordic.jpg',
    loungeWarm:   'assets/photos/lounge-coworking-warm.jpg',
    loungeDisc:   'assets/photos/lounge-discussion.jpg',
    atmoWarm:     'assets/photos/textural-atmosphere-warm.jpg',
    atmoCool:     'assets/photos/textural-atmosphere-cool.jpg',
  };

  root.innerHTML = `
  <style>
    /* ---- HERO ---- */
    .mg-hero { padding: var(--s-9) 0 var(--s-7); border-bottom: 1px solid var(--rule); }
    .mg-hero h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .mg-hero h1 em { font-style: italic; color: var(--accent); }
    .mg-hero__lede { margin-top: 22px; max-width: 62ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }
    .mg-hero__meta {
      display: grid; grid-template-columns: repeat(4, auto);
      gap: var(--s-6); margin-top: var(--s-7);
      font-size: var(--fs-xs); letter-spacing: var(--tracking-eyebrow);
      text-transform: uppercase; color: var(--fg-2);
    }
    .mg-hero__meta > div b { display:block; color: var(--fg); font-weight: 500; margin-top: 4px; letter-spacing: 0; text-transform: none; font-size: var(--fs-sm); }
    @media (max-width: 800px) { .mg-hero__meta { grid-template-columns: repeat(2, auto); } }

    /* ---- SECTION HEAD ---- */
    .mg-sec {
      display: flex; align-items: baseline; gap: 16px;
      margin-bottom: var(--s-6);
    }
    .mg-sec__h {
      font-family: var(--font-display);
      font-size: var(--fs-d3); line-height: 1.1; letter-spacing: -0.02em;
    }
    .mg-sec__sub {
      margin-left: auto;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2);
    }

    /* ---- CARD WRAPPER ---- */
    .mg-card {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden; background: var(--bg-2);
    }
    .mg-card__stage {
      padding: 36px 28px;
      display: flex; align-items: center; justify-content: center;
      min-height: 280px;
    }
    .mg-card__cap {
      padding: 14px 20px; border-top: 1px solid var(--rule);
      font-size: 13px; color: var(--fg-2); line-height: 1.5;
      background: var(--bg);
    }
    .mg-card__cap b { color: var(--fg); font-weight: 500; }

    /* ============================================================
       COVER — A4 portrait at scale (210×297mm, ratio 0.707)
       ============================================================ */
    .mg-cover {
      width: 100%; max-width: 380px;
      aspect-ratio: 210/297;
      background: #0B0F14;
      color: #FFFFFF;
      box-shadow: 0 10px 32px rgba(11,15,20,0.25), 0 0 0 1px rgba(11,15,20,0.06);
      border-radius: 2px;
      position: relative;
      overflow: hidden;
    }
    .mg-cover__bg {
      position: absolute; inset: 0;
      background-image: url(${PHOTO.atmoWarm});
      background-size: cover;
      background-position: center;
      opacity: 0.42;
      filter: grayscale(0.4) contrast(1.1);
    }
    .mg-cover__bg::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(11,15,20,0.55) 0%, rgba(11,15,20,0.35) 35%, rgba(11,15,20,0.85) 100%);
    }
    .mg-cover__inner {
      position: relative; z-index: 1;
      height: 100%;
      padding: 32px 28px 28px;
      display: flex; flex-direction: column;
    }
    .mg-cover__top {
      display: flex; justify-content: space-between; align-items: flex-start;
      gap: 16px;
    }
    .mg-cover__brand {
      display: flex; align-items: center; gap: 10px;
    }
    .mg-cover__bolt {
      width: 22px; height: 22px;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
    }
    .mg-cover__bolt img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .mg-cover__wordmark {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }
    .mg-cover__wordmark em { font-style: italic; color: #E4022D; }
    .mg-cover__issue {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.65);
      text-align: right;
    }
    .mg-cover__issue b { display: block; color: #fff; font-weight: 500; font-size: 11px; }
    .mg-cover__masthead {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 36px;
      font-weight: 500;
      letter-spacing: -0.015em;
      margin-top: 18px;
      line-height: 0.95;
      text-transform: uppercase;
    }
    .mg-cover__masthead em { font-style: italic; text-transform: none; color: #E4022D; font-weight: 400; letter-spacing: -0.02em; }
    .mg-cover__rule {
      width: 56px; height: 2px; background: #E4022D;
      margin-top: auto; margin-bottom: 14px;
    }
    .mg-cover__eyebrow {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px; font-weight: 500;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      margin-bottom: 8px;
    }
    .mg-cover__h {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 30px; line-height: 1.05; letter-spacing: -0.02em;
      font-weight: 400;
    }
    .mg-cover__h em { font-style: italic; color: #E4022D; }
    .mg-cover__deck {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 10px; line-height: 1.55;
      color: rgba(255,255,255,0.75);
      margin-top: 12px; max-width: 32ch;
    }
    .mg-cover__foot {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-top: 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px; letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
    }

    /* ============================================================
       SPREAD — two-page article view, A4 each, side by side
       ============================================================ */
    .mg-spread {
      width: 100%; max-width: 760px;
      aspect-ratio: 420/297;
      display: grid;
      grid-template-columns: 1fr 1fr;
      box-shadow: 0 10px 32px rgba(11,15,20,0.18), 0 0 0 1px rgba(11,15,20,0.06);
      background: #FFFFFF;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }
    .mg-spread::after {
      /* Spine shadow */
      content: ""; position: absolute;
      top: 0; bottom: 0; left: 50%;
      width: 14px; transform: translateX(-50%);
      background: linear-gradient(90deg, rgba(11,15,20,0) 0%, rgba(11,15,20,0.18) 50%, rgba(11,15,20,0) 100%);
      pointer-events: none;
      z-index: 2;
    }
    .mg-page {
      padding: 22px 24px 18px;
      position: relative;
      display: flex; flex-direction: column;
      font-family: 'DM Sans', Arial, sans-serif;
      color: #0B0F14;
    }
    .mg-page--photo {
      padding: 0;
      background: #0B0F14;
    }
    .mg-page--photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .mg-page__folio {
      position: absolute; bottom: 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px; letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(11,15,20,0.45);
      display: flex; align-items: center; gap: 10px;
    }
    .mg-page__folio--l { left: 24px; }
    .mg-page__folio--r { right: 24px; }
    .mg-page__folio em { font-style: italic; color: #E4022D; }

    /* ============================================================
       SPREAD 1 — OPENER (full-bleed photo left + masthead/lede right)
       ============================================================ */
    .mg-opener .mg-page--text {
      padding: 32px 28px 28px;
      justify-content: center;
    }
    .mg-opener__eyebrow {
      font-size: 9px; font-weight: 500;
      letter-spacing: 0.24em; text-transform: uppercase;
      color: #E4022D;
      display: inline-flex; align-items: center; gap: 8px;
      margin-bottom: 12px;
    }
    .mg-opener__eyebrow::before { content: ""; width: 16px; height: 1px; background: #E4022D; }
    .mg-opener__h {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 36px; line-height: 1.0; letter-spacing: -0.02em;
      font-weight: 400;
    }
    .mg-opener__h em { font-style: italic; color: #E4022D; }
    .mg-opener__deck {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 10px; line-height: 1.55; color: #5B6573;
      margin-top: 14px; max-width: 30ch;
    }
    .mg-opener__byline {
      margin-top: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px; letter-spacing: 0.16em;
      text-transform: uppercase; color: #5B6573;
    }
    .mg-opener__byline b { color: #0B0F14; font-weight: 500; }

    /* ============================================================
       SPREAD 2 — PROFILE (large portrait + Q&A body)
       ============================================================ */
    .mg-profile__name {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 22px; line-height: 1.05; letter-spacing: -0.015em;
      font-weight: 500;
    }
    .mg-profile__name em { font-style: italic; color: #E4022D; }
    .mg-profile__role {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px; letter-spacing: 0.18em;
      text-transform: uppercase; color: #5B6573;
      margin-top: 6px;
    }
    .mg-profile__rule {
      width: 32px; height: 1px; background: #E4022D; margin: 14px 0 12px;
    }
    .mg-profile__qa {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px; line-height: 1.55; color: #1A2230;
      flex: 1;
    }
    .mg-profile__qa p { margin: 0 0 8px; }
    .mg-profile__qa p b {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7px; letter-spacing: 0.18em; text-transform: uppercase;
      color: #E4022D; font-weight: 500; margin-bottom: 2px;
    }

    /* ============================================================
       SPREAD 3 — STAT (hero number left, supporting numbers right)
       ============================================================ */
    .mg-stat__eyebrow {
      font-size: 9px; font-weight: 500;
      letter-spacing: 0.24em; text-transform: uppercase;
      color: #5B6573;
      display: inline-flex; align-items: center; gap: 8px;
      margin-bottom: 14px;
    }
    .mg-stat__eyebrow::before { content: ""; width: 16px; height: 1px; background: #E4022D; }
    .mg-stat__num {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 110px; line-height: 0.92; letter-spacing: -0.04em;
      color: #E4022D;
      font-variant-numeric: tabular-nums;
      font-weight: 400;
    }
    .mg-stat__num em { font-style: italic; }
    .mg-stat__cap {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 16px; line-height: 1.2; letter-spacing: -0.005em;
      color: #0B0F14;
      max-width: 16ch;
      margin-top: 14px;
    }
    .mg-stat__cap em { font-style: italic; }
    .mg-stat__list {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 12px;
      flex: 1;
      justify-content: center;
    }
    .mg-stat__list li {
      padding-bottom: 10px;
      border-bottom: 1px solid #E2DED6;
    }
    .mg-stat__list li:last-child { border-bottom: 0; }
    .mg-stat__list-num {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 22px; line-height: 1; letter-spacing: -0.02em;
      color: #0B0F14;
      font-variant-numeric: tabular-nums;
    }
    .mg-stat__list-num em { font-style: italic; color: #E4022D; }
    .mg-stat__list-cap {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px; line-height: 1.5; color: #5B6573;
      margin-top: 4px;
    }

    /* ============================================================
       SPREAD 4 — DIVIDER (section opener — minimal display + photo)
       ============================================================ */
    .mg-divider .mg-page--text {
      justify-content: flex-end;
      padding: 32px 28px;
      background: #F6F4F0;
    }
    .mg-divider__sec {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 0.22em;
      text-transform: uppercase; color: #5B6573;
      margin-bottom: 14px;
    }
    .mg-divider__sec b { color: #E4022D; font-weight: 500; }
    .mg-divider__h {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 38px; line-height: 0.98; letter-spacing: -0.02em;
      font-weight: 400;
    }
    .mg-divider__h em { font-style: italic; color: #E4022D; }
    .mg-divider__lede {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 10px; line-height: 1.6; color: #5B6573;
      margin-top: 12px; max-width: 28ch;
    }

    /* ============================================================
       PILLARS — five publication pillars rail
       ============================================================ */
    .mg-pillars {
      display: grid; grid-template-columns: repeat(5, 1fr);
      gap: 0;
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
    }
    @media (max-width: 900px) { .mg-pillars { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 500px) { .mg-pillars { grid-template-columns: 1fr; } }
    .mg-pillar {
      padding: 24px 20px;
      border-right: 1px solid var(--rule);
      background: var(--bg);
    }
    .mg-pillar:last-child { border-right: 0; }
    @media (max-width: 900px) {
      .mg-pillar:nth-child(2n) { border-right: 0; }
      .mg-pillar { border-bottom: 1px solid var(--rule); }
      .mg-pillar:nth-last-child(-n+2) { border-bottom: 0; }
    }
    .mg-pillar__num {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--accent);
    }
    .mg-pillar__h {
      font-family: var(--font-display); font-size: 18px;
      letter-spacing: -0.01em; line-height: 1.2;
      margin-top: 10px; margin-bottom: 8px;
      color: var(--fg);
    }
    .mg-pillar__b {
      font-size: 12px; line-height: 1.55; color: var(--fg-2);
    }

    /* ---- HOWTO ---- */
    .mg-howto { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-5); margin-top: var(--s-7); }
    @media (max-width: 900px) { .mg-howto { grid-template-columns: 1fr; } }
    .mg-step { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 22px; background: var(--bg); }
    .mg-step__num { font-family: var(--font-display); font-size: 28px; line-height: 1; color: var(--accent); letter-spacing: -0.02em; margin-bottom: 10px; font-style: italic; }
    .mg-step__h { font-family: var(--font-display); font-size: 19px; line-height: 1.2; letter-spacing: -0.01em; color: var(--fg); margin-bottom: 8px; }
    .mg-step__b { font-size: 13px; color: var(--fg-2); line-height: 1.55; }
    .mg-step__b code { font-family: var(--font-mono); font-size: 12px; background: var(--bg-2); padding: 1px 6px; border-radius: 3px; color: var(--fg); }

    /* Two-up grid */
    .mg-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: var(--s-5);
    }
    @media (max-width: 900px) { .mg-grid { grid-template-columns: 1fr; } }
  </style>

  <!-- HERO -->
  <section class="mg-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">14 · Magazine</span>
      <h1>Framework, in the <em>house style</em>.</h1>
      <p class="mg-hero__lede">
        The Framework magazine redesigned in the Kilowott register &mdash; one cover, four article-spread variations
        (opener, profile, stat, section divider), and the print specs that hold the whole edition to one
        editorial voice. Sample content is the real Issue #003 (March 2026, &ldquo;Inside the Global Agency Network&rdquo;)
        from <a href="https://kilowott.com/framework-edition/" style="color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent);" target="_blank" rel="noopener">kilowott.com/framework-edition</a>.
      </p>
      <div class="mg-hero__meta">
        <div>Format<b>A4 · 210×297mm</b></div>
        <div>Cadence<b>Monthly</b></div>
        <div>Stock<b>120gsm uncoated</b></div>
        <div>Issue ref<b>#003 · Mar 2026</b></div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       COVER
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="mg-sec">
        <h2 class="mg-sec__h">Cover</h2>
        <span class="mg-sec__sub">A4 · masthead · feature line · issue meta</span>
      </div>

      <div class="mg-card">
        <div class="mg-card__stage" style="padding: 56px 32px;">
          <div class="mg-cover">
            <div class="mg-cover__bg"></div>
            <div class="mg-cover__inner">
              <div class="mg-cover__top">
                <div class="mg-cover__brand">
                  <div class="mg-cover__bolt"><img src="assets/kilowott-bolt.jpg" alt="Kilowott"></div>
                  <div class="mg-cover__wordmark">Framework</div>
                </div>
                <div class="mg-cover__issue">
                  Issue<b>#003</b>
                </div>
              </div>

              <div class="mg-cover__masthead">FRAME-<br>WORK</div>

              <div class="mg-cover__rule"></div>
              <div class="mg-cover__eyebrow">Cover feature &middot; March 2026</div>
              <h2 class="mg-cover__h">Inside the <em>global agency</em> network.</h2>
              <p class="mg-cover__deck">
                Eleven founders and owners from the digital agency sector &mdash; some building quietly,
                others redefining what an agency can achieve.
              </p>

              <div class="mg-cover__foot">
                <span>Kilowott Framework</span>
                <span>kilowott.com/framework</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mg-card__cap"><b>Anatomy</b> &middot; bolt + Framework wordmark top-left, issue # top-right, oversized masthead set in Newsreader caps with italic spill, 2mm red rule, eyebrow + headline + deck stacked above the foot. Photography sits at 42% opacity behind a top-bottom ink gradient so the type is always primary.</div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       ARTICLE SPREADS
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="mg-sec">
        <h2 class="mg-sec__h">Article spreads</h2>
        <span class="mg-sec__sub">4 variations &middot; opener · profile · stat · divider</span>
      </div>

      <!-- SPREAD 1 — OPENER -->
      <div class="mg-card" style="margin-bottom: var(--s-5);">
        <div class="mg-card__stage" style="padding: 48px 32px;">
          <div class="mg-spread mg-opener">
            <div class="mg-page mg-page--photo">
              <img src="${PHOTO.teamLaugh}" alt="Agency team in working session">
              <div class="mg-page__folio mg-page__folio--l" style="color:rgba(255,255,255,0.7);"><em>FW</em> &middot; 12 &middot; Mar 2026</div>
            </div>
            <div class="mg-page mg-page--text">
              <div class="mg-opener__eyebrow">Cover feature &middot; agencies</div>
              <h1 class="mg-opener__h">Inside the <em>global agency</em> network.</h1>
              <p class="mg-opener__deck">
                Eleven founders, eleven cities. Framework #003 sits down with the people building agencies
                that act like partners &mdash; not pitch shops &mdash; in a market where the word &ldquo;digital&rdquo;
                stopped meaning anything specific years ago.
              </p>
              <div class="mg-opener__byline">
                <b>Framework editorial</b> &middot; March 2026
              </div>
              <div class="mg-page__folio mg-page__folio--r">12 &middot; <em>13</em></div>
            </div>
          </div>
        </div>
        <div class="mg-card__cap"><b>Spread 01 &middot; Article opener</b> &middot; full-bleed photo on the verso (left page), eyebrow + headline + deck + byline on the recto (right page). Folio bottom corner &mdash; mono caps, italic accent on the live page number.</div>
      </div>

      <!-- SPREAD 2 — PROFILE -->
      <div class="mg-card" style="margin-bottom: var(--s-5);">
        <div class="mg-card__stage" style="padding: 48px 32px;">
          <div class="mg-spread">
            <div class="mg-page mg-page--photo">
              <img src="${PHOTO.leader}" alt="Agency founder portrait">
              <div class="mg-page__folio mg-page__folio--l" style="color:rgba(255,255,255,0.7);"><em>FW</em> &middot; 24 &middot; Mar 2026</div>
            </div>
            <div class="mg-page">
              <div class="mg-opener__eyebrow" style="color:#5B6573;">
                <span style="background:#E4022D;width:16px;height:1px;"></span> Profile · 04 of 11
              </div>
              <div class="mg-profile__name">Daniel Calbacho</div>
              <div class="mg-profile__role">Founder &amp; MD &middot; Red Marketing &middot; UK</div>
              <div class="mg-profile__rule"></div>

              <div class="mg-profile__qa">
                <p>
                  <b>On the agency model</b>
                  We were a content shop in 2018. Performance came in 2020. Strategy came last &mdash;
                  because clients started asking for it last. The order matters; if we&rsquo;d led with
                  strategy we&rsquo;d have closed.
                </p>
                <p>
                  <b>On the team</b>
                  Twelve people, four cities, one rule: every senior runs at least one client review
                  a quarter. The hierarchy flattens fast when the founder is on the call.
                </p>
                <p>
                  <b>On Framework</b>
                  &ldquo;The collaboration was very professional, with clear communication and a genuine
                  interest in the nuances of our work.&rdquo;
                </p>
              </div>
              <div class="mg-page__folio mg-page__folio--r">24 &middot; <em>25</em></div>
            </div>
          </div>
        </div>
        <div class="mg-card__cap"><b>Spread 02 &middot; Founder profile</b> &middot; portrait verso, name + role + Q&amp;A recto. Question labels in mono red caps, body in DM Sans 9pt. Sample uses a real Framework #003 profile (Daniel Calbacho, Red Marketing UK) with a real testimonial pull.</div>
      </div>

      <!-- SPREAD 3 — STAT -->
      <div class="mg-card" style="margin-bottom: var(--s-5);">
        <div class="mg-card__stage" style="padding: 48px 32px;">
          <div class="mg-spread">
            <div class="mg-page" style="background:#FFFFFF; padding: 36px 32px;">
              <div class="mg-stat__eyebrow">By the numbers &middot; #003</div>
              <div class="mg-stat__num">11<em></em></div>
              <p class="mg-stat__cap">
                Founders profiled across <em>six countries</em> in March&rsquo;s edition.
              </p>
              <div class="mg-page__folio mg-page__folio--l">36</div>
            </div>
            <div class="mg-page" style="padding: 36px 32px;">
              <ul class="mg-stat__list">
                <li>
                  <div class="mg-stat__list-num"><em>06</em> countries</div>
                  <div class="mg-stat__list-cap">UK, Netherlands, Turkey, Austria, Australia, France &mdash; one issue, six markets, no tourism.</div>
                </li>
                <li>
                  <div class="mg-stat__list-num"><em>05</em> pillars</div>
                  <div class="mg-stat__list-cap">Founder Profiles &middot; Strategy &amp; Growth &middot; Culture &amp; People &middot; Creative Spotlight &middot; Global Perspective.</div>
                </li>
                <li>
                  <div class="mg-stat__list-num">monthly</div>
                  <div class="mg-stat__list-cap">Editorial cadence held since launch &mdash; one issue, every month, on the first.</div>
                </li>
              </ul>
              <div class="mg-page__folio mg-page__folio--r"><em>37</em></div>
            </div>
          </div>
        </div>
        <div class="mg-card__cap"><b>Spread 03 &middot; By the numbers</b> &middot; one hero stat verso, supporting numbers stacked recto. Hero number set in Newsreader at 110px, accent red, italic punctuation. Each supporting row a number + 1-line caption, separated by hairline rules.</div>
      </div>

      <!-- SPREAD 4 — SECTION DIVIDER -->
      <div class="mg-card">
        <div class="mg-card__stage" style="padding: 48px 32px;">
          <div class="mg-spread mg-divider">
            <div class="mg-page mg-page--photo">
              <img src="${PHOTO.atmoCool}" alt="Section divider photography">
              <div class="mg-page__folio mg-page__folio--l" style="color:rgba(255,255,255,0.7);"><em>FW</em> &middot; 48</div>
            </div>
            <div class="mg-page mg-page--text">
              <div class="mg-divider__sec"><b>03</b> &middot; Culture &amp; People</div>
              <h1 class="mg-divider__h">The crew is the <em>company</em>.</h1>
              <p class="mg-divider__lede">
                Eight stories from inside the agencies of #003 &mdash; on hiring, retention, the
                first hard conversation, and the ones that stay.
              </p>
              <div class="mg-page__folio mg-page__folio--r">48 &middot; <em>49</em></div>
            </div>
          </div>
        </div>
        <div class="mg-card__cap"><b>Spread 04 &middot; Section divider</b> &middot; full-bleed atmosphere photo verso, warm-paper recto with section number, headline, lede. Marks the start of one of the five pillars; one divider per section, never inline.</div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       FIVE PILLARS
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Five pillars per issue</h2>
        <p class="section-head__body">Every Framework edition runs through the same five sections &mdash; the structure that holds an issue together no matter what's inside. Pulled from the live publication.</p>
      </div>

      <div class="mg-pillars">
        <div class="mg-pillar">
          <div class="mg-pillar__num">01</div>
          <div class="mg-pillar__h">Founder<br>profiles</div>
          <p class="mg-pillar__b">The people behind the work. One profile per agency, in their own words.</p>
        </div>
        <div class="mg-pillar">
          <div class="mg-pillar__num">02</div>
          <div class="mg-pillar__h">Strategy<br>&amp; growth</div>
          <p class="mg-pillar__b">How agencies build &mdash; pricing, positioning, the bets that paid off and the ones that didn't.</p>
        </div>
        <div class="mg-pillar">
          <div class="mg-pillar__num">03</div>
          <div class="mg-pillar__h">Culture<br>&amp; people</div>
          <p class="mg-pillar__b">Hiring, retention, the difficult conversations. The crew is the company.</p>
        </div>
        <div class="mg-pillar">
          <div class="mg-pillar__num">04</div>
          <div class="mg-pillar__h">Creative<br>spotlight</div>
          <p class="mg-pillar__b">One piece of work, taken apart. The decision tree that got it shipped.</p>
        </div>
        <div class="mg-pillar">
          <div class="mg-pillar__num">05</div>
          <div class="mg-pillar__h">Global<br>perspective</div>
          <p class="mg-pillar__b">Notes from the markets &mdash; where digital agencies are growing, where they're consolidating.</p>
        </div>
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
        <p class="section-head__body">The numbers. Pass these to any print partner &mdash; Norway, India, Dubai &mdash; for a faithful reproduction.</p>
      </div>

      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label">Format</span><span class="token-row__meta">A4 portrait &middot; 210 × 297 mm</span></li>
        <li class="token-row"><span class="token-row__label">Cover stock</span><span class="token-row__meta">300gsm uncoated &middot; soft-touch optional</span></li>
        <li class="token-row"><span class="token-row__label">Body stock</span><span class="token-row__meta">120gsm uncoated &middot; FSC-certified</span></li>
        <li class="token-row"><span class="token-row__label">Binding</span><span class="token-row__meta">Perfect-bound &middot; 4mm spine for typical 64-page issue</span></li>
        <li class="token-row"><span class="token-row__label">Bleed</span><span class="token-row__meta">3 mm on all four sides &middot; 5 mm safety from trim for type</span></li>
        <li class="token-row"><span class="token-row__label">Type &mdash; display</span><span class="token-row__meta">Newsreader &middot; 30&ndash;110pt cover &middot; 22&ndash;38pt spreads</span></li>
        <li class="token-row"><span class="token-row__label">Type &mdash; body</span><span class="token-row__meta">DM Sans 9&ndash;10pt body &middot; 8pt captions/folio &middot; 12pt drop cap</span></li>
        <li class="token-row"><span class="token-row__label">Type &mdash; mono</span><span class="token-row__meta">JetBrains Mono 7&ndash;9pt &middot; folio, eyebrows, datelines</span></li>
        <li class="token-row"><span class="token-row__label">Brand red &mdash; CMYK</span><span class="token-row__meta">C 0 / M 100 / Y 87 / K 5 (Pantone 186 C nearest)</span></li>
        <li class="token-row"><span class="token-row__label">Ink black &mdash; CMYK</span><span class="token-row__meta">C 60 / M 50 / Y 50 / K 100 (rich black)</span></li>
        <li class="token-row"><span class="token-row__label">Folio</span><span class="token-row__meta">Bottom-outside &middot; mono 8pt &middot; italic accent on the live page number</span></li>
        <li class="token-row"><span class="token-row__label">Grid</span><span class="token-row__meta">2-column body &middot; 24mm gutter &middot; 18mm margins outside, 22mm inside</span></li>
      </ul>
    </div>
  </section>

  <!-- ============================================================
       THREE RULES
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="mg-howto">
        <div class="mg-step">
          <div class="mg-step__num">01</div>
          <div class="mg-step__h">One issue, one register.</div>
          <p class="mg-step__b">Every spread reads from the same voice &mdash; serif headline, italic accent on a single word, sans body, mono for system labels. If a spread feels like a different magazine, it goes back.</p>
        </div>
        <div class="mg-step">
          <div class="mg-step__num">02</div>
          <div class="mg-step__h">Real people, real numbers.</div>
          <p class="mg-step__b">Profiles use real names with the founder&rsquo;s permission. Stats come from the source, never rounded for the headline. Quotes are pulled verbatim from the interview.</p>
        </div>
        <div class="mg-step">
          <div class="mg-step__num">03</div>
          <div class="mg-step__h">The photo carries the spread.</div>
          <p class="mg-step__b">Verso (left) is photo by default &mdash; portrait, environment, or atmosphere. Recto (right) is type. Photo selection follows <code>imagery</code> rules: warm, candid, no stock-actor handshakes.</p>
        </div>
      </div>
    </div>
  </section>
  `;
};
