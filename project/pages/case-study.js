/* ============================================================
   CASE STUDY — canonical template
   Situation → decision → result. Every number paired with a window.
   Fork this whole page as the starting kit.
   ============================================================ */

window.renderCaseStudy = function (root) {
  root.innerHTML = `
  <style>
    /* ---------- SCOPED DOC STYLES ---------- */
    .cs-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .cs-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .cs-hero h1 em { font-style: italic; color: var(--accent); }
    .cs-hero__lede {
      margin-top: 22px; max-width: 62ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    .cs-spec {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
    }
    .cs-spec__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .cs-spec__foot {
      padding: 14px 20px;
      border-top: 1px solid var(--rule);
      font-size: 14px; color: var(--fg-2); line-height: 1.55;
    }
    .cs-spec__foot b { color: var(--fg); font-weight: 500; }

    /* ---------- THE ACTUAL CASE STUDY DOCUMENT ---------- */
    .cs-doc {
      background: var(--bg);
    }

    /* Header strip */
    .cs-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: end;
      padding: 64px 56px 48px;
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 900px) {
      .cs-header { grid-template-columns: 1fr; padding: 40px 32px; gap: 32px; }
    }
    .cs-header__eyebrow {
      font-family: var(--font-sans);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--accent);
      display: inline-flex; align-items: center; gap: 10px;
    }
    .cs-header__eyebrow::before {
      content: ""; width: 24px; height: 1px; background: currentColor;
    }
    .cs-header__title {
      font-family: var(--font-display);
      font-size: clamp(2.25rem, 4vw, 3.5rem);
      line-height: 1.04; letter-spacing: -0.02em;
      font-weight: 400;
      margin: 16px 0 0;
      max-width: 18ch;
    }
    .cs-header__title em { font-style: italic; color: var(--accent); }
    .cs-header__meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      font-size: 12px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .cs-header__meta b {
      display: block; color: var(--fg); font-weight: 500;
      margin-top: 6px; letter-spacing: 0;
      text-transform: none; font-size: 15px;
      line-height: 1.4;
      font-family: var(--font-sans);
    }

    /* Hero image */
    .cs-hero-img {
      height: 420px;
      background: var(--k-ink) center/cover no-repeat;
      position: relative;
    }
    .cs-hero-img::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(11,15,20,0) 60%, rgba(11,15,20,0.35) 100%);
    }

    /* Outcomes band */
    .cs-outcomes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 900px) { .cs-outcomes { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 500px) { .cs-outcomes { grid-template-columns: 1fr; } }
    .cs-outcome {
      padding: 36px 28px;
      border-right: 1px solid var(--rule);
    }
    .cs-outcome:last-child { border-right: 0; }
    @media (max-width: 900px) {
      .cs-outcome:nth-child(2) { border-right: 0; }
      .cs-outcome:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
    }
    .cs-outcome__num {
      font-family: var(--font-display);
      font-size: 3.25rem; line-height: 1; letter-spacing: -0.03em;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
      font-weight: 400;
    }
    .cs-outcome__num small {
      font-size: 0.45em; color: var(--fg-2); margin-left: 4px; letter-spacing: 0;
    }
    .cs-outcome__label {
      margin-top: 12px;
      font-size: 13px; line-height: 1.5;
      color: var(--fg); max-width: 20ch;
    }
    .cs-outcome__window {
      margin-top: 8px;
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--fg-2);
    }

    /* Body layout — 8-col grid */
    .cs-body {
      padding: 64px 56px;
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 56px;
    }
    @media (max-width: 900px) {
      .cs-body { grid-template-columns: 1fr; padding: 40px 32px; gap: 24px; }
    }
    .cs-aside {
      position: sticky; top: 24px;
      align-self: start;
    }
    .cs-aside__label {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2);
      margin-bottom: 10px;
    }
    .cs-aside__list {
      list-style: none; padding: 0; margin: 0;
      font-size: 13px; line-height: 1.6;
    }
    .cs-aside__list li {
      padding: 8px 0;
      border-top: 1px solid var(--rule);
      color: var(--fg-2);
    }
    .cs-aside__list li:first-child { border-top: 0; padding-top: 0; }
    .cs-aside__list li b { color: var(--fg); display: block; font-weight: 500; }

    .cs-article {
      max-width: 64ch;
    }
    .cs-article h2 {
      font-family: var(--font-display);
      font-size: 1.75rem; line-height: 1.2; letter-spacing: -0.01em;
      font-weight: 400;
      margin: 48px 0 16px;
      color: var(--fg);
    }
    .cs-article h2:first-child { margin-top: 0; }
    .cs-article h2 em { font-style: italic; color: var(--accent); }
    .cs-article p {
      font-size: 1.0625rem; line-height: 1.7;
      color: var(--fg);
      margin: 0 0 16px;
    }
    .cs-article p.lede {
      font-size: 1.25rem; line-height: 1.55;
      color: var(--fg);
      margin-bottom: 24px;
    }
    .cs-article p.lede em { font-style: italic; color: var(--accent); }

    /* Pull quote */
    .cs-pullquote {
      margin: 48px -24px;
      padding: 32px 24px;
      border-top: 1px solid var(--rule-strong);
      border-bottom: 1px solid var(--rule-strong);
    }
    .cs-pullquote blockquote {
      font-family: var(--font-display);
      font-size: 1.625rem; line-height: 1.3; letter-spacing: -0.01em;
      font-weight: 400;
      margin: 0 0 16px;
      color: var(--fg);
    }
    .cs-pullquote blockquote::before { content: "\u201C"; color: var(--accent); margin-right: 4px; }
    .cs-pullquote blockquote::after  { content: "\u201D"; color: var(--accent); }
    .cs-pullquote cite {
      display: flex; gap: 12px; align-items: center;
      font-style: normal;
      font-family: var(--font-sans); font-size: 13px;
      color: var(--fg-2);
    }
    .cs-pullquote cite b { color: var(--fg); font-weight: 500; }

    /* Inline stat */
    .cs-inline-stat {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 16px; align-items: baseline;
      padding: 20px 0;
      border-top: 1px solid var(--rule);
      border-bottom: 1px solid var(--rule);
      margin: 24px 0;
    }
    .cs-inline-stat b {
      font-family: var(--font-display);
      font-size: 2.5rem; line-height: 1; letter-spacing: -0.03em;
      color: var(--accent); font-weight: 400;
      font-variant-numeric: tabular-nums;
    }
    .cs-inline-stat span {
      color: var(--fg-2); font-size: 14px; line-height: 1.5;
    }

    /* Body image */
    .cs-body-img {
      margin: 32px 0;
      height: 320px;
      background: var(--bg-3) center/cover no-repeat;
      border-radius: var(--r-3);
    }
    .cs-body-img__cap {
      margin-top: 10px;
      font-size: 12px; color: var(--fg-2);
      letter-spacing: 0.02em;
    }

    /* Timeline */
    .cs-timeline {
      margin: 32px 0;
      border-top: 1px solid var(--rule);
    }
    .cs-timeline__row {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 20px;
      padding: 18px 0;
      border-bottom: 1px solid var(--rule);
    }
    .cs-timeline__when {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--accent);
    }
    .cs-timeline__what b {
      display: block; font-weight: 500; margin-bottom: 4px; color: var(--fg);
    }
    .cs-timeline__what span {
      color: var(--fg-2); font-size: 14px; line-height: 1.5;
    }

    /* Team strip */
    .cs-team {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin: 40px 0;
      padding: 28px 0;
      border-top: 1px solid var(--rule);
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 700px) { .cs-team { grid-template-columns: 1fr 1fr; } }
    .cs-team__person b { display: block; color: var(--fg); font-weight: 500; font-size: 14px; }
    .cs-team__person span { color: var(--fg-2); font-size: 12px; }

    /* CTA footer */
    .cs-cta {
      padding: 56px 56px;
      background: var(--fg); color: var(--bg);
      display: grid; grid-template-columns: 1fr auto;
      gap: 32px; align-items: center;
    }
    @media (max-width: 700px) { .cs-cta { grid-template-columns: 1fr; padding: 40px 32px; } }
    .cs-cta h3 {
      font-family: var(--font-display);
      font-size: 1.75rem; line-height: 1.2; letter-spacing: -0.01em;
      font-weight: 400;
      margin: 0;
    }
    .cs-cta h3 em { font-style: italic; color: var(--accent); }
    .cs-cta p {
      margin: 8px 0 0; opacity: 0.7; font-size: 14px;
    }
    .cs-cta a {
      background: var(--accent); color: #fff; text-decoration: none;
      padding: 14px 28px; border-radius: var(--r-pill);
      font-size: 14px; font-weight: 500; letter-spacing: 0.02em;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .cs-cta a .lucide { width: 16px; height: 16px; stroke-width: 1.75; }
    .cs-cta a:hover { background: #B40224; }
  </style>

  <!-- HERO (doc intro) -->
  <section class="cs-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">10 · Case study</span>
      <h1>One template. <em>Every</em> engagement.</h1>
      <p class="cs-hero__lede">
        Situation &rarr; decision &rarr; result, in that order. Every claim pairs with a number; every
        number pairs with a window. The template below is the one you fork &mdash; for brand work,
        engineering rebuilds, AI pilots, workforce engagements. Same shape, different content.
      </p>
    </div>
  </section>

  <!-- RULES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Seven rules of a Kilowott case</h2>
        <p class="section-head__body">If a case study violates any of these, it doesn&rsquo;t ship &mdash; it gets rewritten.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; Name the sector, the region, the engagement model. &ldquo;A Nordic retail brand&rdquo; beats &ldquo;a client&rdquo;.</span><span class="token-row__meta">Specificity</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; Every stat cites a source and a time window. &ldquo;+44%&rdquo; is half a number without &ldquo;over six months&rdquo;.</span><span class="token-row__meta">Evidence</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Situation paragraph names what wasn&rsquo;t working &mdash; not only what the client wanted.</span><span class="token-row__meta">Honesty</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; One pull quote from the client. Attributed, real, current role.</span><span class="token-row__meta">Voice</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">05</b> &nbsp; Include what didn&rsquo;t work. Trust is built from the dip, not the summit.</span><span class="token-row__meta">Honesty</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">06</b> &nbsp; Team strip at the bottom &mdash; named specialists, their role, and the client lead.</span><span class="token-row__meta">Partnership</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">07</b> &nbsp; Length 600&ndash;900 words. Shorter is almost always fine; longer needs a reason.</span><span class="token-row__meta">Discipline</span></li>
      </ul>
    </div>
  </section>

  <!-- FULL RENDERED CASE STUDY -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">The template, fully rendered</h2>
        <p class="section-head__body">A complete case study using the Kilowott stack. Fork it &mdash; the structure is the point, the content is the placeholder.</p>
      </div>

      <div class="cs-spec">
        <div class="cs-spec__head"><span>Retail &middot; coffee brand &middot; 6 months</span><span>.cs-doc</span></div>
        <div class="cs-doc">

          <!-- Header -->
          <header class="cs-header">
            <div>
              <span class="cs-header__eyebrow">Case study &middot; retail</span>
              <h1 class="cs-header__title">Sales <em>up 44%</em> for a coffee brand &mdash; six months in.</h1>
            </div>
            <div class="cs-header__meta">
              <div>Sector<b>Retail &middot; DTC</b></div>
              <div>Region<b>Nordics</b></div>
              <div>Engagement<b>Kilowott for Brands</b></div>
              <div>Window<b>Oct 2025 &mdash; Mar 2026</b></div>
            </div>
          </header>

          <!-- Hero image -->
          <div class="cs-hero-img" style="background-image: url(assets/photos/pair-working-warm.jpg);"></div>

          <!-- Outcomes band -->
          <div class="cs-outcomes">
            <div class="cs-outcome">
              <div class="cs-outcome__num">+44<small>%</small></div>
              <div class="cs-outcome__label">Lift in sales across DTC and retail</div>
              <div class="cs-outcome__window">Trailing 6 months</div>
            </div>
            <div class="cs-outcome">
              <div class="cs-outcome__num">3<small>&times;</small></div>
              <div class="cs-outcome__label">Organic search traffic on category pages</div>
              <div class="cs-outcome__window">Month 1 vs. month 6</div>
            </div>
            <div class="cs-outcome">
              <div class="cs-outcome__num">21<small>%</small></div>
              <div class="cs-outcome__label">Drop in CAC after funnel rebuild</div>
              <div class="cs-outcome__window">Paid search &middot; month 4+</div>
            </div>
            <div class="cs-outcome">
              <div class="cs-outcome__num">2<small>x</small></div>
              <div class="cs-outcome__label">Average order value on subscription SKUs</div>
              <div class="cs-outcome__window">After bundle redesign</div>
            </div>
          </div>

          <!-- Body -->
          <div class="cs-body">
            <aside class="cs-aside">
              <div class="cs-aside__label">Engagement</div>
              <ul class="cs-aside__list">
                <li><b>Brand refresh</b>Visual identity + voice</li>
                <li><b>Paid search</b>Google + Meta, full ownership</li>
                <li><b>DTC rebuild</b>Shopify Plus + new funnel</li>
                <li><b>Team</b>4 specialists, 26 weeks</li>
              </ul>
            </aside>

            <article class="cs-article">
              <p class="lede">
                A Nordic coffee brand with strong retail shelf presence couldn&rsquo;t convert that brand equity
                into <em>direct</em> revenue. The DTC site looked modern, traffic was decent, and nothing was
                working. We rebuilt three things at once &mdash; and the results came from the connective tissue
                between them.
              </p>

              <h2>The situation</h2>
              <p>
                Strong wholesale, weak DTC. The brand had 36% market share in Nordic specialty retail but
                less than 4% of its revenue came through kilowott-coffee-example.com. The previous agency
                had shipped a polished visual update two years earlier, but the funnel underneath was
                a 2019 Shopify theme with plugin buildup, the paid search account was running 340 keywords
                split across six ad groups, and the brand voice had drifted into coffee-shop clich&eacute; over time.
              </p>
              <p>
                The founder wanted &ldquo;more growth.&rdquo; We translated that: <em>double DTC revenue inside two
                quarters without adding headcount.</em> The measurable version was the only version we worked from.
              </p>

              <h2>The decision</h2>
              <p>
                Three levers, one engagement, one team. Rebuild the brand voice so the story matched the
                product. Restructure paid search around the four sub-brands, not the keyword count.
                Rebuild the DTC funnel around subscription &mdash; where the lifetime value actually was &mdash;
                with a paid fallback for first-time visitors.
              </p>

              <div class="cs-inline-stat">
                <b>340 &rarr; 58</b>
                <span>Active paid-search keywords after restructure. The ones that stayed tripled in efficiency within eight weeks.</span>
              </div>

              <p>
                We ran brand and growth in parallel, not in sequence. The brand lead and the paid-search
                specialist shared a Friday review where every page change needed a measurable goal attached
                to it. Nothing shipped if it didn&rsquo;t have a number it was trying to move.
              </p>

              <div class="cs-pullquote">
                <blockquote>
                  They didn&rsquo;t pitch us a playbook. They sat inside our ops, argued with us about what was actually broken, and shipped the fixes in the same week. That&rsquo;s not how an agency usually works.
                </blockquote>
                <cite><b>Signe Halvorsen</b><span>&middot; Founder &middot; Nordic coffee brand</span></cite>
              </div>

              <h2>What didn&rsquo;t work</h2>
              <p>
                The first subscription bundle we launched, a $29 monthly &ldquo;discovery box,&rdquo; converted
                at half the rate we&rsquo;d modelled. The problem wasn&rsquo;t price &mdash; it was choice. Customers
                wanted to pick <em>their</em> coffee, not ours. We rebuilt the bundle around a four-SKU
                selector in week 11, and the bundle page converted 3.2&times; better on the same traffic.
              </p>

              <div class="cs-body-img" style="background-image: url(assets/photos/lounge-coworking-warm.jpg);"></div>
              <div class="cs-body-img__cap">Week 11 working session, Oslo &mdash; rebuilding the subscription bundle after the first version underperformed.</div>

              <h2>Timeline</h2>
              <div class="cs-timeline">
                <div class="cs-timeline__row">
                  <div class="cs-timeline__when">Week 1&ndash;4</div>
                  <div class="cs-timeline__what"><b>Audit + brand diagnostic</b><span>Paid-search forensics, funnel session replay, voice audit. Three decisions locked.</span></div>
                </div>
                <div class="cs-timeline__row">
                  <div class="cs-timeline__when">Week 5&ndash;10</div>
                  <div class="cs-timeline__what"><b>Brand ship + paid restructure</b><span>New voice, new key visuals, paid-search rebuild. First uplift visible by week 8.</span></div>
                </div>
                <div class="cs-timeline__row">
                  <div class="cs-timeline__when">Week 11&ndash;16</div>
                  <div class="cs-timeline__what"><b>DTC funnel rebuild</b><span>Shopify re-theme, bundle v2, subscription selector live. AOV doubled on subscription SKUs.</span></div>
                </div>
                <div class="cs-timeline__row">
                  <div class="cs-timeline__when">Week 17&ndash;26</div>
                  <div class="cs-timeline__what"><b>Hand-off + compound</b><span>In-house team trained, playbooks handed over, sales compounded through Q1.</span></div>
                </div>
              </div>

              <h2>The result</h2>
              <p>
                Sales up 44% over six months, tracked against an agreed baseline. Organic search traffic
                tripled on category pages after the rebrand and canonical cleanup. Paid CAC dropped 21%
                once the keyword set narrowed. Subscription AOV doubled after the bundle rebuild. And the
                in-house team that inherited the work on week 26 has kept the trend line up.
              </p>
              <p>
                The partnership continues &mdash; not as a retainer, but as quarterly reviews with the founder
                and the head of ops. The brand does the work now; we check the instruments.
              </p>

              <!-- Team strip -->
              <div class="cs-team">
                <div class="cs-team__person"><b>Ola Nordmann</b><span>Partnership lead</span></div>
                <div class="cs-team__person"><b>Mira Lindqvist</b><span>Brand + voice</span></div>
                <div class="cs-team__person"><b>Priya Rao</b><span>Growth engineering</span></div>
                <div class="cs-team__person"><b>Jonas Kielland</b><span>Delivery ops</span></div>
              </div>
            </article>
          </div>

          <!-- CTA -->
          <div class="cs-cta">
            <div>
              <h3>Thinking about a similar <em>rebuild</em>?</h3>
              <p>We run a 30-minute diagnostic with founders and heads of growth &mdash; no deck, no pitch, just the three questions.</p>
            </div>
            <a href="#">Book the diagnostic <i data-lucide="arrow-right"></i></a>
          </div>
        </div>

        <div class="cs-spec__foot"><b>Structure &mdash;</b> Header &middot; hero image &middot; 4 outcomes &middot; aside + article (situation &rarr; decision &rarr; result &middot; with pull-quote, timeline, what-didn&rsquo;t-work, inline stat) &middot; team strip &middot; CTA. This IS the template &mdash; everything else is copy.</div>
      </div>
    </div>
  </section>

  <!-- WHAT MAKES IT WORK -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">What makes the template work</h2>
        <p class="section-head__body">A checklist for reviewing a case study before it ships.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label">Outcomes strip has 3&ndash;4 numbers, each with a time window</span><span class="token-row__meta">Required</span></li>
        <li class="token-row"><span class="token-row__label">Aside lists engagement shape + team size + duration</span><span class="token-row__meta">Required</span></li>
        <li class="token-row"><span class="token-row__label">Article follows situation &rarr; decision &rarr; result order</span><span class="token-row__meta">Required</span></li>
        <li class="token-row"><span class="token-row__label">Pull quote attributed to a named person with role + company</span><span class="token-row__meta">Required</span></li>
        <li class="token-row"><span class="token-row__label">One &ldquo;what didn&rsquo;t work&rdquo; moment, bounded and honest</span><span class="token-row__meta">Required</span></li>
        <li class="token-row"><span class="token-row__label">Timeline spans the full engagement, week ranges</span><span class="token-row__meta">Optional</span></li>
        <li class="token-row"><span class="token-row__label">Team strip lists Kilowott specialists + client lead</span><span class="token-row__meta">Required</span></li>
        <li class="token-row"><span class="token-row__label">CTA offers a small next step &mdash; never &ldquo;get in touch&rdquo;</span><span class="token-row__meta">Required</span></li>
        <li class="token-row"><span class="token-row__label">Total length 600&ndash;900 words</span><span class="token-row__meta">Discipline</span></li>
      </ul>
    </div>
  </section>
  `;
};
