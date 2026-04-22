/* ============================================================
   EMAIL — transactional + newsletter templates
   Rendered inside a 600px canvas like a real inbox.
   Built with nested tables (email-safe) for the code samples,
   and a CSS preview for the doc itself.
   ============================================================ */

window.renderEmail = function (root) {
  root.innerHTML = `
  <style>
    .em-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .em-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .em-hero h1 em { font-style: italic; color: var(--accent); }
    .em-hero__lede {
      margin-top: 22px; max-width: 62ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    /* Spec card */
    .em-spec {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
    }
    .em-spec__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .em-spec__foot {
      padding: 14px 20px;
      border-top: 1px solid var(--rule);
      font-size: 14px; color: var(--fg-2); line-height: 1.55;
    }
    .em-spec__foot b { color: var(--fg); font-weight: 500; }

    /* Inbox frame — simulates an email client */
    .em-frame {
      background: var(--bg-2);
      padding: 32px 24px;
      display: flex; justify-content: center;
    }
    .em-canvas {
      width: 100%; max-width: 600px;
      background: #FFFFFF;
      box-shadow: var(--shadow-1);
      font-family: "DM Sans", Arial, sans-serif;
      color: #0B0F14;
      line-height: 1.55;
    }
    [data-theme="dark"] .em-canvas { box-shadow: 0 2px 6px rgba(0,0,0,0.5); }

    .em-from {
      padding: 10px 20px;
      border-bottom: 1px solid #E2DED6;
      font-size: 12px;
      color: #5B6573;
      display: flex; justify-content: space-between;
    }
    .em-from b { color: #0B0F14; font-weight: 500; }

    /* Email body */
    .em-body { padding: 40px 40px 32px; }

    .em-logo {
      width: 120px; height: 18px;
      background: #0B0F14;
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat left center / contain;
              mask: url(assets/kilowott-logo.svg) no-repeat left center / contain;
      margin-bottom: 28px;
    }
    .em-eyebrow {
      font-family: "DM Sans", Arial, sans-serif;
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: #0B0F14;
      display: inline-flex; align-items: center; gap: 10px;
      margin-bottom: 16px;
    }
    .em-eyebrow::before { content: ""; width: 20px; height: 1px; background: #E4022D; }

    .em-h1 {
      font-family: "Newsreader", Georgia, serif;
      font-size: 34px; line-height: 1.1; letter-spacing: -0.015em;
      font-weight: 400;
      margin: 0 0 20px;
      color: #0B0F14;
    }
    .em-h1 em { font-style: italic; color: #E4022D; }
    .em-p {
      font-size: 16px; line-height: 1.6; color: #1A2230;
      margin: 0 0 16px;
    }
    .em-p--muted { color: #5B6573; font-size: 14px; }

    .em-btn {
      display: inline-block;
      background: #0B0F14; color: #FFFFFF !important;
      text-decoration: none;
      font-family: "DM Sans", Arial, sans-serif;
      font-size: 14px; font-weight: 500;
      letter-spacing: 0.02em;
      padding: 14px 28px;
      border-radius: 999px;
      margin-top: 12px;
    }
    .em-btn--accent { background: #E4022D; }
    .em-btn__arrow { margin-left: 8px; }

    .em-divider { height: 1px; background: #E2DED6; margin: 32px 0; border: 0; }

    .em-data {
      background: #F6F4F0;
      padding: 20px 22px; border-radius: 4px;
      margin: 20px 0;
    }
    .em-data__row {
      display: flex; justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #E2DED6;
      font-size: 14px;
    }
    .em-data__row:last-child { border-bottom: 0; }
    .em-data__row span:first-child { color: #5B6573; }
    .em-data__row span:last-child {
      font-family: "JetBrains Mono", Menlo, monospace;
      font-size: 13px; color: #0B0F14;
      font-variant-numeric: tabular-nums;
    }
    .em-data__total {
      font-weight: 500 !important;
      border-top: 1px solid #1A2230 !important;
      margin-top: 4px; padding-top: 14px !important;
    }
    .em-data__total span:first-child { color: #0B0F14 !important; font-weight: 500; }

    .em-footer {
      padding: 24px 40px 40px;
      border-top: 1px solid #E2DED6;
      font-size: 12px; color: #5B6573;
      line-height: 1.6;
    }
    .em-footer a { color: #5B6573; }
    .em-footer__brand {
      font-family: "Newsreader", Georgia, serif;
      font-size: 14px;
      color: #0B0F14;
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }

    /* Newsletter specific */
    .em-story {
      padding: 24px 0; border-top: 1px solid #E2DED6;
    }
    .em-story:first-of-type { border-top: 0; padding-top: 0; }
    .em-story__eyebrow {
      font-family: "DM Sans", Arial, sans-serif;
      font-size: 10px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #5B6573;
      margin-bottom: 10px;
    }
    .em-story__title {
      font-family: "Newsreader", Georgia, serif;
      font-size: 22px; line-height: 1.2; letter-spacing: -0.01em;
      font-weight: 400;
      margin: 0 0 10px;
    }
    .em-story__title em { font-style: italic; color: #E4022D; }
    .em-story__body {
      font-size: 14px; line-height: 1.6; color: #1A2230;
      margin: 0 0 10px;
    }
    .em-story__link {
      font-family: "DM Sans", Arial, sans-serif;
      font-size: 13px; font-weight: 500;
      color: #0B0F14; text-decoration: none;
      border-bottom: 1px solid #0B0F14;
    }
    .em-story__stat {
      font-family: "Newsreader", Georgia, serif;
      font-size: 28px; color: #E4022D; letter-spacing: -0.02em;
      margin-right: 10px;
      font-variant-numeric: tabular-nums;
    }

    /* Two-up for side-by-side templates */
    .em-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media (max-width: 1100px) { .em-grid { grid-template-columns: 1fr; } }
  </style>

  <!-- HERO -->
  <section class="em-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">09 · Email</span>
      <h1>The same <em>voice</em> in the inbox.</h1>
      <p class="em-hero__lede">
        Kilowott email comes in two shapes &mdash; transactional (receipt, password, welcome,
        milestone) and newsletter (the quarterly note, launches, POV). Both share the same
        anatomy: brand mark, serif headline with one italic accent, muted body, one ink
        button, tight footer. 600px canvas. Email-safe fallbacks included.
      </p>
    </div>
  </section>

  <!-- RULES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Five email rules</h2>
        <p class="section-head__body">Inboxes strip flourish. These five rules are what&rsquo;s left when Gmail, Outlook, Apple Mail and mobile dark mode are done with your template.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; 600px canvas, single-column, nested-table layout for client compatibility.</span><span class="token-row__meta">Structure</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; One headline, one button, one call to action. If you need two, send two emails.</span><span class="token-row__meta">Hierarchy</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Serif webfont with Georgia fallback. Sans with Arial. Red only on the italic emphasis word and the footer legal line.</span><span class="token-row__meta">Type</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Preview text (preheader) 40&ndash;90 chars, writes like a subhead &mdash; never repeats the subject.</span><span class="token-row__meta">Deliverability</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">05</b> &nbsp; Plain-text version always. Unsubscribe + company address in footer. Mono for any data row (receipts, stats).</span><span class="token-row__meta">Compliance</span></li>
      </ul>
    </div>
  </section>

  <!-- TRANSACTIONAL — RECEIPT -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Transactional &middot; receipt</h2>
        <p class="section-head__body">Pattern for payment confirmations, contract accepts, milestone completes. One headline, one structured data block, one primary action, done.</p>
      </div>

      <div class="em-spec">
        <div class="em-spec__head"><span>Q4 engagement invoice &middot; paid</span><span>.em-canvas</span></div>
        <div class="em-frame">
          <div class="em-canvas">
            <div class="em-from">
              <div><b>Kilowott</b> &middot; billing@kilowott.com</div>
              <div>to priya@nordicdata.example</div>
            </div>
            <div class="em-body">
              <div class="em-logo" aria-label="Kilowott"></div>
              <div class="em-eyebrow">Payment &middot; received</div>
              <h1 class="em-h1">Q4 engagement &mdash; <em>paid in full</em>.</h1>
              <p class="em-p">
                We&rsquo;ve received $284,500 for the Q4 engagement (INV-4834).
                The receipt is below and a signed PDF is attached to this email.
              </p>

              <div class="em-data">
                <div class="em-data__row"><span>Invoice</span><span>INV-4834</span></div>
                <div class="em-data__row"><span>Date paid</span><span>22 Apr 2026</span></div>
                <div class="em-data__row"><span>Method</span><span>ACH &middot; Holvi</span></div>
                <div class="em-data__row"><span>Engagement</span><span>Brand + Intelligence</span></div>
                <div class="em-data__row em-data__total"><span>Total</span><span>$284,500</span></div>
              </div>

              <a class="em-btn" href="#" target="_blank" rel="noopener">View receipt<span class="em-btn__arrow">&rarr;</span></a>

              <hr class="em-divider">

              <p class="em-p em-p--muted">
                Questions on this invoice go to Aaron Bisht &mdash; aaron@kilowott.com.
                For engagement delivery, your partner lead Priya is copied.
              </p>
            </div>
            <div class="em-footer">
              <div class="em-footer__brand">Kilowott</div>
              <div>Panaji, India &middot; Oslo, Norway &middot; New York, US</div>
              <div style="margin-top:10px;">You&rsquo;re receiving this because you&rsquo;re a named contact on an active engagement. <a href="#">Manage notifications</a>.</div>
            </div>
          </div>
        </div>
        <div class="em-spec__foot"><b>Subject &mdash;</b> &ldquo;Q4 engagement &middot; paid in full (INV-4834)&rdquo;. &nbsp; <b>Preheader &mdash;</b> &ldquo;Receipt + signed PDF attached. Open for the data row.&rdquo;</div>
      </div>
    </div>
  </section>

  <!-- TRANSACTIONAL — WELCOME / MILESTONE -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Transactional &middot; welcome / milestone</h2>
        <p class="section-head__body">For kickoffs, welcomes, and engagement milestones. More voice, same anatomy. The italic word does the heavy lifting.</p>
      </div>

      <div class="em-spec">
        <div class="em-spec__head"><span>New engagement &middot; kickoff</span><span>.em-canvas</span></div>
        <div class="em-frame">
          <div class="em-canvas">
            <div class="em-from">
              <div><b>Kilowott</b> &middot; aaron@kilowott.com</div>
              <div>to priya@nordicdata.example</div>
            </div>
            <div class="em-body">
              <div class="em-logo" aria-label="Kilowott"></div>
              <div class="em-eyebrow">Kickoff &middot; Q2 2026</div>
              <h1 class="em-h1">Let&rsquo;s get to <em>work</em>.</h1>
              <p class="em-p">
                The paperwork&rsquo;s done and the team&rsquo;s stood up &mdash;
                Priya on engineering, Mira on brand, Jonas on delivery ops.
                We&rsquo;re kicking off Thursday at 10:00 CET.
              </p>
              <p class="em-p">
                Before then, we&rsquo;d love fifteen minutes with your ops lead to
                walk through access and the Q2 milestone map. The kickoff deck
                is below &mdash; the three decisions we need from you are on slide 4.
              </p>

              <a class="em-btn em-btn--accent" href="#" target="_blank" rel="noopener">Open the kickoff deck<span class="em-btn__arrow">&rarr;</span></a>

              <hr class="em-divider">

              <p class="em-p em-p--muted">
                Calendar links for Thursday &mdash; <a href="#">Add to Google</a> &middot; <a href="#">Add to Outlook</a>. <br>
                Reply here or ping Slack &mdash; whichever&rsquo;s faster.
              </p>
            </div>
            <div class="em-footer">
              <div class="em-footer__brand">Kilowott</div>
              <div>Partnership &mdash; not a vendor at the door.</div>
              <div style="margin-top:10px;"><a href="#">Update preferences</a> &middot; <a href="#">View in browser</a></div>
            </div>
          </div>
        </div>
        <div class="em-spec__foot"><b>When &mdash;</b> Engagement kickoff, onboarding complete, first release shipped. One italic accent word per email (&ldquo;work&rdquo;, &ldquo;live&rdquo;, &ldquo;shipped&rdquo;). Accent button for the primary forward-action.</div>
      </div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Newsletter &middot; the quarterly note</h2>
        <p class="section-head__body">Three stories, one stat, one POV link. A single newsletter should read like a well-edited editorial page &mdash; not a product changelog.</p>
      </div>

      <div class="em-spec">
        <div class="em-spec__head"><span>The Quarterly Note &middot; Q2 2026</span><span>.em-canvas</span></div>
        <div class="em-frame">
          <div class="em-canvas">
            <div class="em-from">
              <div><b>Kilowott</b> &middot; notes@kilowott.com</div>
              <div>to you@company.example</div>
            </div>
            <div class="em-body">
              <div class="em-logo" aria-label="Kilowott"></div>
              <div class="em-eyebrow">The quarterly note &middot; Q2 &rsquo;26</div>
              <h1 class="em-h1">Four stories from the <em>field</em>.</h1>
              <p class="em-p em-p--muted">
                Brand work shipped, an AI pilot out of beta, a hiring note, and one short POV.
                If you only have two minutes, read the first story.
              </p>

              <hr class="em-divider">

              <div class="em-story">
                <div class="em-story__eyebrow">Case study &middot; retail</div>
                <h3 class="em-story__title">
                  <span class="em-story__stat">+44%</span>
                  Sales <em>up</em> for a coffee brand &mdash; six months in.
                </h3>
                <p class="em-story__body">
                  Brand refresh, paid search, and a rebuilt DTC funnel &mdash; one engagement,
                  three levers, measurable result. The write-up names every decision.
                </p>
                <a class="em-story__link" href="#">Read the case &rarr;</a>
              </div>

              <div class="em-story">
                <div class="em-story__eyebrow">Product &middot; Intelligence</div>
                <h3 class="em-story__title">Kilowott Intelligence, <em>out of beta</em>.</h3>
                <p class="em-story__body">
                  After nine months with four design partners, Intelligence is generally available
                  &mdash; AI systems paired with human oversight, measured in real outcomes.
                </p>
                <a class="em-story__link" href="#">See what shipped &rarr;</a>
              </div>

              <div class="em-story">
                <div class="em-story__eyebrow">Team &middot; Oslo</div>
                <h3 class="em-story__title">Nine new faces, mostly <em>engineers</em>.</h3>
                <p class="em-story__body">
                  We added seven engineers, a senior PM, and one brand lead in Oslo this quarter.
                  If you&rsquo;re hiring in the Nordics, we can swap notes.
                </p>
                <a class="em-story__link" href="#">Read the hiring note &rarr;</a>
              </div>

              <div class="em-story">
                <div class="em-story__eyebrow">POV &middot; essay</div>
                <h3 class="em-story__title">The word &ldquo;at scale&rdquo; is not a <em>number</em>.</h3>
                <p class="em-story__body">
                  A short essay on why every abstraction in B2B writing earns a concrete next to it
                  &mdash; and what that costs when you miss it.
                </p>
                <a class="em-story__link" href="#">Read the essay &rarr;</a>
              </div>

              <hr class="em-divider">

              <p class="em-p em-p--muted">
                Forward this to a colleague. Reply with what you&rsquo;re working on.
                See you in Q3.
              </p>
            </div>
            <div class="em-footer">
              <div class="em-footer__brand">Kilowott</div>
              <div>Panaji &middot; Oslo &middot; New York</div>
              <div style="margin-top:10px;">
                You&rsquo;re getting this because you opted in at kilowott.com or a partner event.
                <a href="#">Update preferences</a> &middot; <a href="#">Unsubscribe</a>.
              </div>
            </div>
          </div>
        </div>
        <div class="em-spec__foot"><b>Cadence &mdash;</b> Quarterly only. Three to four stories, each 60&ndash;100 words, one outbound link. The stat is optional but earns attention when real.</div>
      </div>
    </div>
  </section>

  <!-- SPECS TABLE -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Email specs</h2>
        <p class="section-head__body">The numbers. Pass these to any email tool (Mailchimp, Postmark, Customer.io, Resend, Loops).</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label">Canvas width</span><span class="token-row__meta">600px &middot; single-column</span></li>
        <li class="token-row"><span class="token-row__label">Body padding</span><span class="token-row__meta">40px horizontal &middot; 40px top &middot; 32px bottom</span></li>
        <li class="token-row"><span class="token-row__label">Display font</span><span class="token-row__meta">Newsreader &middot; fallback Georgia, serif</span></li>
        <li class="token-row"><span class="token-row__label">Body font</span><span class="token-row__meta">DM Sans &middot; fallback Arial, sans-serif</span></li>
        <li class="token-row"><span class="token-row__label">Headline</span><span class="token-row__meta">34px / line-height 1.1 / letter-spacing -0.015em</span></li>
        <li class="token-row"><span class="token-row__label">Body</span><span class="token-row__meta">16px / line-height 1.6 / color #1A2230</span></li>
        <li class="token-row"><span class="token-row__label">Button</span><span class="token-row__meta">14px / 14×28px / radius 999px / ink default, accent for conversion</span></li>
        <li class="token-row"><span class="token-row__label">Brand mark</span><span class="token-row__meta">120×18px &middot; black or white only &middot; no color marks</span></li>
        <li class="token-row"><span class="token-row__label">Subject line</span><span class="token-row__meta">&lt; 55 chars &middot; sentence case &middot; no emoji in transactional</span></li>
        <li class="token-row"><span class="token-row__label">Preheader</span><span class="token-row__meta">40&ndash;90 chars &middot; second sentence, not subject echo</span></li>
        <li class="token-row"><span class="token-row__label">Plain-text alt</span><span class="token-row__meta">Required &middot; same content, no HTML</span></li>
        <li class="token-row"><span class="token-row__label">Dark mode</span><span class="token-row__meta">Force light background with <code>@media (prefers-color-scheme: dark)</code> meta override for consistent brand</span></li>
      </ul>
    </div>
  </section>
  `;
};
