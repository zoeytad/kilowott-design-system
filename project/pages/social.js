/* ============================================================
   SOCIAL TEMPLATES — v0.6
   LinkedIn + X cover art, post frames, launch & quote
   templates using the Kilowott visual system.
   ============================================================ */

window.renderSocial = function (root) {
  root.innerHTML = `
  <style>
    .so-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .so-hero h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .so-hero h1 em { font-style: italic; color: var(--accent); }
    .so-hero__lede { margin-top: 22px; max-width: 60ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }
    .so-hero__meta {
      display: grid; grid-template-columns: repeat(4, auto);
      gap: var(--s-6); margin-top: var(--s-7);
      font-size: var(--fs-xs); letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--fg-2);
    }
    .so-hero__meta > div b {
      display:block; color: var(--fg); font-weight: 500;
      margin-top: 4px; letter-spacing: 0.02em;
      text-transform: none; font-size: var(--fs-sm);
    }
    @media (max-width: 800px) { .so-hero__meta { grid-template-columns: repeat(2, auto); } }

    /* ---- PLATFORM CALLOUTS ---- */
    .so-specs {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      margin-top: var(--s-6); overflow: hidden;
    }
    @media (max-width: 900px) { .so-specs { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 500px) { .so-specs { grid-template-columns: 1fr; } }
    .so-specs > div { padding: 24px; border-right: 1px solid var(--rule); }
    .so-specs > div:last-child { border-right: 0; }
    @media (max-width: 900px) {
      .so-specs > div:nth-child(2) { border-right: 0; }
      .so-specs > div:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
    }
    .so-specs__plat {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--accent);
    }
    .so-specs__dim {
      font-family: var(--font-display); font-size: 22px;
      letter-spacing: -0.01em; margin: 10px 0 6px;
    }
    .so-specs__ratio {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em;
    }

    /* ---- CANVAS SCALER ---- */
    .so-frame {
      position: relative;
      margin: 0 auto;
      background: #0B0F14;
      color: #fff;
      overflow: hidden;
      box-shadow: 0 2px 0 var(--rule), 0 20px 60px -30px rgba(0,0,0,0.35);
    }
    .so-frame--light { background: #F5F2EC; color: #0B0F14; }
    .so-frame--red   { background: var(--accent); color: #fff; }

    /* Card wrapper w/ caption */
    .so-card {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
    }
    .so-card__stage {
      background:
        linear-gradient(var(--bg-2), var(--bg-2)),
        repeating-linear-gradient(45deg, transparent 0 6px, rgba(0,0,0,0.035) 6px 7px);
      padding: 36px; display: grid; place-items: center;
      border-bottom: 1px solid var(--rule);
    }
    .so-card__caption {
      padding: 18px 22px; display: grid; grid-template-columns: 1fr auto; gap: 12px;
      font-size: 13px; line-height: 1.5;
    }
    .so-card__caption b { font-family: var(--font-display); font-size: 17px; letter-spacing: -0.005em; font-weight: 400; display:block; margin-bottom: 4px; }
    .so-card__caption p { margin: 0; color: var(--fg-2); }
    .so-card__caption .so-card__meta {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2); align-self: start;
      white-space: nowrap;
    }

    /* ===== LINKEDIN COVER (1584x396 -> scale ~0.42 to ~665w) ===== */
    .so-li-cover { width: 665px; height: 166px; position: relative; }
    @media (max-width: 720px) { .so-li-cover { width: 100%; height: auto; aspect-ratio: 1584/396; } }
    .so-li-cover__grid {
      position: absolute; inset: 0;
      display: grid; grid-template-columns: 1.2fr 1fr; gap: 0;
    }
    .so-li-cover__left {
      padding: 22px 28px; display: flex; flex-direction: column; justify-content: space-between;
    }
    .so-li-cover__mark {
      font-family: var(--font-mono); font-size: 9px;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: rgba(255,255,255,0.55);
    }
    .so-li-cover__h {
      font-family: var(--font-display); font-weight: 400;
      font-size: 30px; line-height: 1.08; letter-spacing: -0.015em;
      max-width: 15ch;
    }
    .so-li-cover__h em { font-style: italic; color: var(--accent); }
    .so-li-cover__foot {
      display: flex; gap: 22px; align-items: baseline;
      font-family: var(--font-mono); font-size: 9px;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(255,255,255,0.55);
    }
    .so-li-cover__right {
      background: var(--accent);
      padding: 22px 28px;
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative;
    }
    .so-li-cover__bignum {
      font-family: var(--font-display); font-weight: 400;
      font-size: 62px; line-height: 0.95; letter-spacing: -0.03em;
    }
    .so-li-cover__bignum sup { font-size: 22px; vertical-align: top; margin-left: 2px; }
    .so-li-cover__cap {
      font-family: var(--font-mono); font-size: 9px;
      letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.8;
    }
    .so-li-cover__corner {
      position: absolute; top: 0; right: 0;
      width: 0; height: 0;
      border-left: 40px solid transparent;
      border-top: 40px solid rgba(255,255,255,0.15);
    }

    /* ===== X / Twitter header (1500x500 -> scale ~0.44 -> 660x220) ===== */
    .so-x-cover { width: 660px; height: 220px; position: relative; padding: 28px 36px; display: grid; grid-template-rows: auto 1fr auto; }
    @media (max-width: 720px) { .so-x-cover { width: 100%; height: auto; aspect-ratio: 1500/500; padding: 22px 28px; } }
    .so-x-cover__top { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.55); }
    .so-x-cover__top b { color: #fff; font-weight: 500; letter-spacing: 0.28em; }
    .so-x-cover__h {
      font-family: var(--font-display); font-weight: 400;
      font-size: 34px; line-height: 1.1; letter-spacing: -0.015em;
      max-width: 22ch; align-self: end; margin-bottom: 4px;
    }
    .so-x-cover__h em { font-style: italic; color: var(--accent); }
    .so-x-cover__foot { display: flex; justify-content: space-between; align-items: baseline; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
    .so-x-cover__foot b { color: #fff; font-weight: 500; }

    /* ===== FEED POST — 1:1 SQUARE (rendered 560) ===== */
    .so-sq { width: 420px; height: 420px; position: relative; padding: 40px; display: grid; grid-template-rows: auto 1fr auto; }
    @media (max-width: 500px) { .so-sq { width: 100%; height: auto; aspect-ratio: 1/1; padding: 28px; } }
    .so-sq__top { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; }
    .so-sq__num { font-family: var(--font-display); font-size: 44px; line-height: 1; color: var(--accent); }
    .so-sq__h { font-family: var(--font-display); font-weight: 400; font-size: 36px; line-height: 1.12; letter-spacing: -0.015em; align-self: end; }
    .so-sq__h em { font-style: italic; color: var(--accent); }
    .so-sq__foot { display: flex; justify-content: space-between; align-items: baseline; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.7; }

    /* Square: pull-quote variant */
    .so-sq--quote { background: #F5F2EC; color: #0B0F14; }
    .so-sq--quote .so-sq__h { font-size: 28px; line-height: 1.25; font-family: var(--font-display); font-style: italic; font-weight: 400; align-self: center; padding-left: 18px; border-left: 2px solid var(--accent); }
    .so-sq--quote .so-sq__top { color: #6B6762; }
    .so-sq--quote .so-sq__foot { opacity: 0.6; }

    /* Square: all-red launch */
    .so-sq--red { background: var(--accent); color: #fff; }
    .so-sq--red .so-sq__h em { color: rgba(255,255,255,0.65); font-style: italic; }
    .so-sq--red .so-sq__num { color: rgba(255,255,255,0.65); font-family: var(--font-display); }

    /* ===== STORY 9:16 (rendered 240 wide) ===== */
    .so-st { width: 240px; height: 427px; position: relative; padding: 28px 24px; display: grid; grid-template-rows: auto 1fr auto; }
    @media (max-width: 360px) { .so-st { width: 100%; height: auto; aspect-ratio: 9/16; } }
    .so-st__top { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.6; }
    .so-st__h { font-family: var(--font-display); font-weight: 400; font-size: 30px; line-height: 1.1; letter-spacing: -0.015em; align-self: center; }
    .so-st__h em { font-style: italic; color: var(--accent); }
    .so-st__foot { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.6; }

    /* ===== GRID OF TEMPLATES ===== */
    .so-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: var(--s-5); margin-top: var(--s-6);
    }
    @media (max-width: 1000px) { .so-grid { grid-template-columns: 1fr; } }

    .so-grid--3 { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 1100px) { .so-grid--3 { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 700px)  { .so-grid--3 { grid-template-columns: 1fr; } }

    /* Carousel strip (linkedin 10-up carousel) */
    .so-strip {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden; margin-top: var(--s-6);
    }
    .so-strip__rail {
      display: flex; gap: 18px; padding: 36px;
      background:
        linear-gradient(var(--bg-2), var(--bg-2)),
        repeating-linear-gradient(45deg, transparent 0 6px, rgba(0,0,0,0.03) 6px 7px);
      overflow-x: auto;
    }
    .so-strip__rail > * { flex: 0 0 auto; }
    .so-strip__caption {
      padding: 18px 22px; display: grid; grid-template-columns: 1fr auto; gap: 12px;
      border-top: 1px solid var(--rule);
      font-size: 13px; line-height: 1.5; color: var(--fg-2);
    }
    .so-strip__caption b { font-family: var(--font-display); color: var(--fg); font-weight: 400; font-size: 17px; letter-spacing: -0.005em; display:block; margin-bottom: 4px; }
    .so-strip__caption span {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase;
      white-space: nowrap; align-self:start;
    }

    /* Carousel cell (square) - smaller */
    .so-cc {
      width: 260px; height: 260px; position: relative;
      padding: 22px; display: grid; grid-template-rows: auto 1fr auto;
    }
    .so-cc__i { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.55; }
    .so-cc__h { font-family: var(--font-display); font-weight: 400; font-size: 22px; line-height: 1.14; letter-spacing: -0.01em; align-self: end; }
    .so-cc__h em { font-style: italic; color: var(--accent); }
    .so-cc__foot { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.5; }

    /* ---- RULES CARD ---- */
    .so-rules {
      display: grid; grid-template-columns: repeat(3, 1fr);
      border: 1px solid var(--rule); border-radius: var(--r-3);
      margin-top: var(--s-6); overflow: hidden;
    }
    @media (max-width: 900px) { .so-rules { grid-template-columns: 1fr; } }
    .so-rules > div { padding: 26px; border-right: 1px solid var(--rule); }
    .so-rules > div:last-child { border-right: 0; }
    @media (max-width: 900px) {
      .so-rules > div { border-right: 0; border-bottom: 1px solid var(--rule); }
      .so-rules > div:last-child { border-bottom: 0; }
    }
    .so-rules__head {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 14px;
    }
    .so-rules h4 { font-family: var(--font-display); font-weight: 400; font-size: 22px; letter-spacing: -0.01em; margin: 0 0 10px; }
    .so-rules ul { list-style: none; margin: 0; padding: 0; font-size: 13px; line-height: 1.65; }
    .so-rules li { padding: 8px 0; border-top: 1px solid var(--rule); color: var(--fg-2); }
    .so-rules li:first-child { border-top: 0; }
    .so-rules li b { color: var(--fg); font-weight: 500; }
  </style>

  <!-- ============ HERO ============ -->
  <section class="so-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">v0.6 · Social templates</span>
      <h1>The brand, at <em>scroll speed</em>.</h1>
      <p class="so-hero__lede">
        A small set of frames &mdash; covers, posts, quotes, carousels, stories &mdash; that let
        anyone at Kilowott publish something that reads as Kilowott in the three seconds a
        feed gives them. Each template inherits the type ladder, colour rules, and voice from
        the rest of the system. Nothing new invented here; just a stage for the parts.
      </p>

      <div class="so-hero__meta">
        <div>Platforms<b>LinkedIn &middot; X &middot; IG</b></div>
        <div>Formats<b>4 aspect ratios</b></div>
        <div>Type<b>Newsreader + DM Sans</b></div>
        <div>Palette<b>Ink &middot; Paper &middot; Red</b></div>
      </div>
    </div>
  </section>

  <!-- ============ SPECS ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Canvases we design for</h2>
        <p class="section-head__body">Four aspect ratios cover 95% of what we post. Design once at the native size; the thumbnails below are scaled previews.</p>
      </div>

      <div class="so-specs">
        <div>
          <div class="so-specs__plat">LinkedIn cover</div>
          <div class="so-specs__dim">1584 &times; 396</div>
          <div class="so-specs__ratio">4 : 1 &middot; company header</div>
        </div>
        <div>
          <div class="so-specs__plat">X header</div>
          <div class="so-specs__dim">1500 &times; 500</div>
          <div class="so-specs__ratio">3 : 1 &middot; profile cover</div>
        </div>
        <div>
          <div class="so-specs__plat">Feed / carousel</div>
          <div class="so-specs__dim">1080 &times; 1080</div>
          <div class="so-specs__ratio">1 : 1 &middot; LinkedIn, IG, X</div>
        </div>
        <div>
          <div class="so-specs__plat">Story / Reel</div>
          <div class="so-specs__dim">1080 &times; 1920</div>
          <div class="so-specs__ratio">9 : 16 &middot; vertical</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ COVERS ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Profile covers</h2>
        <p class="section-head__body">The first surface a visitor sees. A single argument, one number, nothing to click on.</p>
      </div>

      <div class="so-grid">
        <!-- LinkedIn cover -->
        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-li-cover">
              <div class="so-li-cover__grid">
                <div class="so-li-cover__left">
                  <div class="so-li-cover__mark">Kilowott &middot; Product &amp; AI</div>
                  <div class="so-li-cover__h">We build software <em>that ships</em> on time.</div>
                  <div class="so-li-cover__foot">
                    <span>Goa &middot; Lisbon &middot; London</span>
                    <span>est. 2015</span>
                  </div>
                </div>
                <div class="so-li-cover__right">
                  <div class="so-li-cover__corner"></div>
                  <div class="so-li-cover__cap">On-time release rate</div>
                  <div class="so-li-cover__bignum">94<sup>%</sup></div>
                </div>
              </div>
            </div>
          </div>
          <div class="so-card__caption">
            <div>
              <b>LinkedIn cover &middot; argument + proof</b>
              <p>One editorial thesis on the left, a single number on the right. The split column is our house move for covers &mdash; it&rsquo;s readable at any scroll speed.</p>
            </div>
            <span class="so-card__meta">1584 &times; 396 &middot; 4:1</span>
          </div>
        </div>

        <!-- X cover -->
        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-frame--light so-x-cover">
              <div class="so-x-cover__top">
                <b>KILOWOTT</b>
                <span>@kilowott</span>
              </div>
              <div class="so-x-cover__h">A studio for teams <em>building the thing</em>,<br>not the roadmap about the thing.</div>
              <div class="so-x-cover__foot">
                <span>Product design &middot; AI &middot; eng</span>
                <b>kilowott.com</b>
              </div>
            </div>
          </div>
          <div class="so-card__caption">
            <div>
              <b>X / Twitter header &middot; single sentence</b>
              <p>Paper background, editorial headline, handle mark at top. No imagery &mdash; the sentence does the work.</p>
            </div>
            <span class="so-card__meta">1500 &times; 500 &middot; 3:1</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ FEED POSTS (1:1) ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Feed posts</h2>
        <p class="section-head__body">Three square templates &mdash; announcement, quote, launch &mdash; covering most of what we share in-feed.</p>
      </div>

      <div class="so-grid so-grid--3">

        <!-- Announcement -->
        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-sq">
              <div class="so-sq__top">
                <span>New work</span>
                <span>01 / 24</span>
              </div>
              <div class="so-sq__h">We rebuilt <em>Finley&rsquo;s</em><br>onboarding in six weeks.</div>
              <div class="so-sq__foot">
                <span>Case study &middot; link in bio</span>
                <span>Kilowott</span>
              </div>
            </div>
          </div>
          <div class="so-card__caption">
            <div>
              <b>Announcement</b>
              <p>Dark ink background, italic client name picked out in red. Eyebrow names the series; corner meta dates it.</p>
            </div>
            <span class="so-card__meta">1 : 1</span>
          </div>
        </div>

        <!-- Pull quote -->
        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-sq so-sq--quote">
              <div class="so-sq__top">
                <span>From the blog</span>
                <span>&bull;&bull;&bull;</span>
              </div>
              <div class="so-sq__h">&ldquo;Most rebuilds fail because the old thing still works &mdash; that&rsquo;s the trap.&rdquo;</div>
              <div class="so-sq__foot">
                <span>Arjun, Engineering</span>
                <span>kilowott.com/field-notes</span>
              </div>
            </div>
          </div>
          <div class="so-card__caption">
            <div>
              <b>Pull quote</b>
              <p>Paper background, italic serif set off with a red rule. The author and the source of the quote live in the footer, not the body.</p>
            </div>
            <span class="so-card__meta">1 : 1</span>
          </div>
        </div>

        <!-- Launch -->
        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-sq so-sq--red">
              <div class="so-sq__top">
                <span>Out today</span>
                <span class="so-sq__num">v1</span>
              </div>
              <div class="so-sq__h">Staging data that <em>looks real</em>,<br>because it is.</div>
              <div class="so-sq__foot">
                <span>Forge &middot; by Kilowott</span>
                <span>kilowott.com/forge</span>
              </div>
            </div>
          </div>
          <div class="so-card__caption">
            <div>
              <b>Product launch</b>
              <p>All-red background reserved for real moments &mdash; product releases, funding, milestones. No more than twice a quarter.</p>
            </div>
            <span class="so-card__meta">1 : 1</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ============ CAROUSEL ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Carousel &middot; 7-up</h2>
        <p class="section-head__body">The argument-in-motion format. One thought per card, numbered. First card hooks, middle cards build, last card lands.</p>
      </div>

      <div class="so-strip">
        <div class="so-strip__rail">
          <!-- 01 Hook -->
          <div class="so-frame so-cc" style="background:#0B0F14;">
            <div class="so-cc__i">01 &middot; The claim</div>
            <div class="so-cc__h">Most rebuilds fail. <em>Here&rsquo;s why they don&rsquo;t have to.</em></div>
            <div class="so-cc__foot">Kilowott &middot; swipe &rarr;</div>
          </div>
          <!-- 02 -->
          <div class="so-frame so-cc" style="background:#F5F2EC; color:#0B0F14;">
            <div class="so-cc__i">02 &middot; Why they fail</div>
            <div class="so-cc__h">The old thing still works. The new thing is <em>almost</em> working.</div>
            <div class="so-cc__foot">&rarr;</div>
          </div>
          <!-- 03 -->
          <div class="so-frame so-cc" style="background:#F5F2EC; color:#0B0F14;">
            <div class="so-cc__i">03 &middot; The fork</div>
            <div class="so-cc__h">Do you migrate, run parallel, or <em>cut over?</em></div>
            <div class="so-cc__foot">&rarr;</div>
          </div>
          <!-- 04 -->
          <div class="so-frame so-cc" style="background:#0B0F14;">
            <div class="so-cc__i">04 &middot; Rule</div>
            <div class="so-cc__h">Migrate only <em>what gets used weekly.</em></div>
            <div class="so-cc__foot">&rarr;</div>
          </div>
          <!-- 05 -->
          <div class="so-frame so-cc" style="background:#F5F2EC; color:#0B0F14;">
            <div class="so-cc__i">05 &middot; Evidence</div>
            <div class="so-cc__h">62% of the pages had <em>zero weekly reads.</em></div>
            <div class="so-cc__foot">&rarr;</div>
          </div>
          <!-- 06 -->
          <div class="so-frame so-cc" style="background:#0B0F14;">
            <div class="so-cc__i">06 &middot; Result</div>
            <div class="so-cc__h">Cut-over in <em>11 days</em>. Zero rollback.</div>
            <div class="so-cc__foot">&rarr;</div>
          </div>
          <!-- 07 End -->
          <div class="so-frame so-cc" style="background:var(--accent); color:#fff;">
            <div class="so-cc__i">07 &middot; End</div>
            <div class="so-cc__h">We do this for a living. <em>Kilowott &rarr;</em></div>
            <div class="so-cc__foot">kilowott.com &middot; follow</div>
          </div>
        </div>
        <div class="so-strip__caption">
          <div>
            <b>Carousel template &middot; argument-in-motion</b>
            <p>Alternating ink/paper for pacing; colour-break (red) reserved for the final card. Numbered eyebrow on every card; headline runs bottom-aligned to leave white space up top.</p>
          </div>
          <span>1080 &times; 1080 &middot; 7 cards</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ STORIES ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Stories &amp; reels (9:16)</h2>
        <p class="section-head__body">Vertical, quick. A headline, a number, a mark &mdash; no more. Stories are a glance, not a read.</p>
      </div>

      <div class="so-grid so-grid--3">
        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-st">
              <div class="so-st__top">Kilowott &middot; field notes</div>
              <div class="so-st__h">Shipping <em>Forge v1</em><br>next Thursday.</div>
              <div class="so-st__foot">Swipe up</div>
            </div>
          </div>
          <div class="so-card__caption">
            <div><b>Story &middot; drop</b><p>Short, ink, one verb. The date is the hook.</p></div>
            <span class="so-card__meta">9 : 16</span>
          </div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-st" style="background:#F5F2EC; color:#0B0F14;">
              <div class="so-st__top">Numbers we like</div>
              <div class="so-st__h" style="font-family:var(--font-display); font-size:60px; line-height:0.95; letter-spacing:-0.03em; color:var(--accent);">62<sup style="font-size:26px;">%</sup></div>
              <div class="so-st__foot" style="color:#6B6762;">Drop in support queue after the rebuild</div>
            </div>
          </div>
          <div class="so-card__caption">
            <div><b>Story &middot; single stat</b><p>One number, the smallest possible caption. Credit the stat or don&rsquo;t run it.</p></div>
            <span class="so-card__meta">9 : 16</span>
          </div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            <div class="so-frame so-st" style="background:var(--accent); color:#fff;">
              <div class="so-st__top">We&rsquo;re hiring</div>
              <div class="so-st__h">Senior<br><em>product engineer</em><br>&mdash; Goa or remote.</div>
              <div class="so-st__foot">kilowott.com/careers</div>
            </div>
          </div>
          <div class="so-card__caption">
            <div><b>Story &middot; hiring</b><p>Red reserved for the big asks. Role, location, one URL &mdash; no decoration.</p></div>
            <span class="so-card__meta">9 : 16</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ RULES ============ -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Rules of the road</h2>
        <p class="section-head__body">A short list that keeps the system from drifting into noise.</p>
      </div>

      <div class="so-rules">
        <div>
          <div class="so-rules__head">The grammar</div>
          <h4>Three surfaces, in order</h4>
          <ul>
            <li><b>Eyebrow.</b> What this is &mdash; small, mono, uppercase.</li>
            <li><b>Headline.</b> The argument &mdash; editorial serif, max 12 words.</li>
            <li><b>Foot.</b> The source &mdash; mono, small, attribution or URL.</li>
            <li>That&rsquo;s it. No body copy in-frame.</li>
          </ul>
        </div>
        <div>
          <div class="so-rules__head">The restraint</div>
          <h4>Colour is a budget</h4>
          <ul>
            <li><b>Ink</b> is the default. When unsure, go ink.</li>
            <li><b>Paper</b> for quotes, commentary, slower posts.</li>
            <li><b>Red</b> is reserved. Launches, hiring, real news &mdash; twice a quarter max.</li>
            <li>Never combine ink + red + paper in the same frame.</li>
          </ul>
        </div>
        <div>
          <div class="so-rules__head">The craft</div>
          <h4>Small things that matter</h4>
          <ul>
            <li><b>One italic</b> per headline, for the word that does the work.</li>
            <li><b>No emoji.</b> Not even one. Not even a rocket.</li>
            <li><b>No stock photos.</b> Type and grid only, until we have real photography.</li>
            <li><b>Mark the wordmark.</b> Small, in the footer &mdash; never the headline.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  `;
};
