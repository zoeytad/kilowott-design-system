/* ============================================================
   EMAIL SIGNATURE — internal generator (HubSpot-style, Kilowott UI)
   Form on left, live preview on right, copy-as-HTML for Gmail paste.
   Renders email-safe table HTML with inline styles + brand fallbacks.
   ============================================================ */

window.renderSignature = function (root) {

  // ----------- DEFAULT FIELDS -----------
  const STATE = {
    template: 'classic',
    // Ola Nordmann is a fictional placeholder persona (the Norwegian "John Doe").
    // Replace with your own details. All Kilowott facts (offices, URLs, socials)
    // are real — pulled from kilowott.com.
    firstName:  'Ola',
    lastName:   'Nordmann',
    pronouns:   'he/him',
    title:      'Senior Brand Strategist',
    department: 'Kilowott',
    email:      'ola.nordmann@kilowott.com',
    phone:      '+47 925 11 386',
    mobile:     '',
    website:    'kilowott.com',
    websiteUrl: 'https://kilowott.com',
    address:    'Fredrikstad · Sandnes · Goa · Dubai',
    photo:      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    linkedin:   '',
    twitter:    '',
    instagram:  'https://www.instagram.com/kilowott/',
    youtube:    '',
    cta:        'Book a meeting',
    ctaUrl:     'https://meetings.hubspot.com/pphadtare',
    quote:      'Built for what comes next.',
    legal:      'This message and any attachments are confidential and intended solely for the named recipient. If you received this in error, please notify the sender and delete all copies.',
    accent:     '#E4022D',
  };

  // ----------- HTML SHELL -----------
  root.innerHTML = `
  <style>
    .sig-hero { padding: var(--s-9) 0 var(--s-7); border-bottom: 1px solid var(--rule); }
    .sig-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .sig-hero h1 em { font-style: italic; color: var(--accent); }
    .sig-hero__lede {
      margin-top: 22px; max-width: 62ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    /* Studio layout */
    .sig-studio {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: var(--s-7);
      align-items: start;
    }
    @media (max-width: 1100px) { .sig-studio { grid-template-columns: 1fr; } }

    /* Form panel */
    .sig-form {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      background: var(--bg);
      position: sticky; top: 90px;
      max-height: calc(100vh - 110px);
      overflow-y: auto;
    }
    .sig-form__head {
      padding: 14px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--fg-2);
      display: flex; justify-content: space-between; align-items: center;
    }
    .sig-form__body { padding: 18px 20px 22px; }
    .sig-group { margin-bottom: 18px; }
    .sig-group__h {
      font-family: var(--font-sans);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--fg);
      margin: 0 0 10px;
      display: flex; align-items: center; gap: 10px;
    }
    .sig-group__h::before {
      content: ""; width: 18px; height: 1px; background: var(--accent);
    }
    .sig-field { margin-bottom: 10px; }
    .sig-field label {
      display: block;
      font-size: 11px; color: var(--fg-2);
      letter-spacing: 0.04em; text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: 500;
    }
    .sig-field input {
      width: 100%;
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      padding: 9px 12px;
      font-family: var(--font-sans);
      font-size: 13px;
      background: var(--bg);
      color: var(--fg);
      transition: border-color 0.15s ease;
    }
    .sig-field input:focus {
      outline: none;
      border-color: var(--fg);
    }
    .sig-field textarea {
      width: 100%;
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      padding: 9px 12px;
      font-family: var(--font-sans);
      font-size: 13px;
      line-height: 1.5;
      background: var(--bg);
      color: var(--fg);
      resize: vertical;
      min-height: 70px;
      transition: border-color 0.15s ease;
    }
    .sig-field textarea:focus { outline: none; border-color: var(--fg); }
    .sig-field--row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

    /* Template chooser pills */
    .sig-templates {
      display: grid; grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin-bottom: 6px;
    }
    .sig-tpl {
      padding: 10px 6px;
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      background: transparent;
      font-family: var(--font-sans);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.06em; text-transform: uppercase;
      color: var(--fg-2);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .sig-tpl:hover { border-color: var(--fg); color: var(--fg); }
    .sig-tpl.is-active {
      background: var(--fg); color: var(--bg); border-color: var(--fg);
    }

    /* Preview panel */
    .sig-preview {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
    }
    .sig-preview__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .sig-preview__stage {
      background: var(--bg-2);
      padding: 32px 28px;
      min-height: 280px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .sig-preview__inner {
      background: #FFFFFF;
      padding: 28px 32px;
      box-shadow: var(--shadow-1);
      max-width: 100%;
      overflow-x: auto;
    }
    [data-theme="dark"] .sig-preview__inner { box-shadow: 0 2px 6px rgba(0,0,0,0.5); }

    /* Reply-thread mock above signature */
    .sig-preview__reply {
      font-family: "DM Sans", Arial, sans-serif;
      font-size: 14px;
      color: #1A2230;
      margin-bottom: 22px;
      line-height: 1.55;
    }
    .sig-preview__reply b { color: #0B0F14; font-weight: 500; }
    .sig-preview__reply em {
      font-family: "Newsreader", Georgia, serif; font-style: italic; color: #5B6573;
      font-size: 13px;
    }

    /* Action bar */
    .sig-actions {
      padding: 16px 20px;
      border-top: 1px solid var(--rule);
      display: flex; justify-content: space-between; align-items: center;
      gap: var(--s-4);
      flex-wrap: wrap;
    }
    .sig-actions__hint { font-size: 12px; color: var(--fg-2); }
    .sig-actions__hint b { color: var(--fg); font-weight: 500; }
    .sig-btns { display: inline-flex; gap: 8px; }
    .sig-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 18px;
      border: 1px solid var(--rule-strong);
      border-radius: var(--r-pill);
      background: transparent; color: var(--fg);
      font-family: var(--font-sans);
      font-size: 12px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .sig-btn:hover { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .sig-btn--primary { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .sig-btn--primary:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
    .sig-btn--copied { background: #16a34a !important; border-color: #16a34a !important; color: #fff !important; }
    .sig-btn .lucide { width: 14px; height: 14px; stroke-width: 1.75; }

    /* Howto block */
    .sig-howto {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-5);
      margin-top: var(--s-7);
    }
    @media (max-width: 900px) { .sig-howto { grid-template-columns: 1fr; } }
    .sig-step {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: 22px 22px 24px;
      background: var(--bg);
    }
    .sig-step__num {
      font-family: var(--font-display);
      font-size: 28px; line-height: 1;
      color: var(--accent);
      letter-spacing: -0.02em;
      margin-bottom: 10px;
      font-style: italic;
    }
    .sig-step__h {
      font-family: var(--font-display);
      font-size: 19px; line-height: 1.2;
      letter-spacing: -0.01em;
      color: var(--fg);
      margin-bottom: 8px;
    }
    .sig-step__b { font-size: 13px; color: var(--fg-2); line-height: 1.55; }
    .sig-step__b code {
      font-family: var(--font-mono); font-size: 12px;
      background: var(--bg-2); padding: 1px 6px; border-radius: 3px;
      color: var(--fg);
    }
  </style>

  <!-- HERO -->
  <section class="sig-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">10 · Email signature</span>
      <h1>One <em>signature</em> for the whole crew.</h1>
      <p class="sig-hero__lede">
        Internal generator. Fill the form, pick a layout, hit copy &mdash; paste straight into
        Gmail signature settings. Three brand-safe layouts, table-based HTML, inline styles,
        Newsreader and DM Sans with Georgia and Arial fallbacks. No tracking pixels, no clip art.
      </p>
    </div>
  </section>

  <!-- STUDIO -->
  <section class="section">
    <div class="container">
      <div class="sig-studio">

        <!-- FORM -->
        <aside class="sig-form" aria-label="Signature inputs">
          <div class="sig-form__head">
            <span>Fields</span>
            <button class="sig-btn" id="sig-reset" style="padding:4px 10px; font-size:10px; letter-spacing:0.06em;">Reset</button>
          </div>
          <div class="sig-form__body">

            <div class="sig-group">
              <div class="sig-group__h">Layout</div>
              <div class="sig-templates" id="sig-templates">
                <button class="sig-tpl is-active" data-tpl="classic">Classic</button>
                <button class="sig-tpl" data-tpl="compact">Compact</button>
                <button class="sig-tpl" data-tpl="editorial">Editorial</button>
              </div>
            </div>

            <div class="sig-group">
              <div class="sig-group__h">Identity</div>
              <div class="sig-field sig-field--row">
                <div><label>First name</label><input data-k="firstName" type="text"></div>
                <div><label>Last name</label><input data-k="lastName" type="text"></div>
              </div>
              <div class="sig-field"><label>Pronouns (optional)</label><input data-k="pronouns" type="text" placeholder="she/her"></div>
              <div class="sig-field"><label>Title</label><input data-k="title" type="text"></div>
              <div class="sig-field"><label>Department / company line</label><input data-k="department" type="text"></div>
            </div>

            <div class="sig-group">
              <div class="sig-group__h">Contact</div>
              <div class="sig-field"><label>Email</label><input data-k="email" type="email"></div>
              <div class="sig-field sig-field--row">
                <div><label>Direct</label><input data-k="phone" type="text"></div>
                <div><label>Mobile</label><input data-k="mobile" type="text"></div>
              </div>
              <div class="sig-field sig-field--row">
                <div><label>Website label</label><input data-k="website" type="text"></div>
                <div><label>Website URL</label><input data-k="websiteUrl" type="url"></div>
              </div>
              <div class="sig-field"><label>Address line</label><input data-k="address" type="text"></div>
            </div>

            <div class="sig-group">
              <div class="sig-group__h">Photo</div>
              <div class="sig-field"><label>Photo URL (square, ≥144px)</label><input data-k="photo" type="url" placeholder="https://..."></div>
            </div>

            <div class="sig-group">
              <div class="sig-group__h">Social</div>
              <div class="sig-field"><label>LinkedIn URL</label><input data-k="linkedin" type="url"></div>
              <div class="sig-field"><label>X / Twitter URL</label><input data-k="twitter" type="url"></div>
              <div class="sig-field"><label>Instagram URL</label><input data-k="instagram" type="url"></div>
              <div class="sig-field"><label>YouTube URL</label><input data-k="youtube" type="url"></div>
            </div>

            <div class="sig-group">
              <div class="sig-group__h">Call to action</div>
              <div class="sig-field"><label>CTA label</label><input data-k="cta" type="text"></div>
              <div class="sig-field"><label>CTA URL</label><input data-k="ctaUrl" type="url"></div>
              <div class="sig-field"><label>Tagline / quote (Editorial only)</label><input data-k="quote" type="text"></div>
            </div>

            <div class="sig-group">
              <div class="sig-group__h">Legal disclaimer</div>
              <div class="sig-field"><label>Confidentiality / company registration</label><textarea data-k="legal" rows="3"></textarea></div>
            </div>

          </div>
        </aside>

        <!-- PREVIEW -->
        <div>
          <div class="sig-preview">
            <div class="sig-preview__head">
              <span id="sig-tplName">Classic · table-safe HTML</span>
              <span>preview · 1× scale</span>
            </div>
            <div class="sig-preview__stage">
              <div class="sig-preview__inner" id="sig-stage">
                <div class="sig-preview__reply">
                  Best,<br>
                  <em>— signature renders below —</em>
                </div>
                <div id="sig-render"></div>
              </div>
            </div>
            <div class="sig-actions">
              <div class="sig-actions__hint">
                Click <b>Copy signature</b> &mdash; then in Gmail open <b>Settings → See all settings → Signature</b>, paste in the editor, save at the bottom.
              </div>
              <div class="sig-btns">
                <button class="sig-btn" id="sig-copyHtml" title="Copy raw HTML source"><i data-lucide="code-2"></i> Copy HTML source</button>
                <button class="sig-btn sig-btn--primary" id="sig-copy"><i data-lucide="clipboard-copy"></i> Copy signature</button>
              </div>
            </div>
          </div>

          <!-- HOW TO -->
          <div class="sig-howto">
            <div class="sig-step">
              <div class="sig-step__num">01</div>
              <div class="sig-step__h">Fill it in.</div>
              <p class="sig-step__b">Type your details in the form. Preview updates as you go. Leave any field blank and it disappears from the layout.</p>
            </div>
            <div class="sig-step">
              <div class="sig-step__num">02</div>
              <div class="sig-step__h">Hit copy.</div>
              <p class="sig-step__b">Click <b>Copy signature</b>. Your clipboard now holds rich-text HTML &mdash; the same thing Gmail's signature editor accepts.</p>
            </div>
            <div class="sig-step">
              <div class="sig-step__num">03</div>
              <div class="sig-step__h">Paste into Gmail.</div>
              <p class="sig-step__b"><code>Settings → See all settings → Signature → Create new</code>. Paste with <b>⌘V</b> (or <b>Ctrl+V</b>). Save changes at the bottom.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  `;

  // ----------- WIRE FORM -----------
  const stage     = root.querySelector('#sig-render');
  const tplName   = root.querySelector('#sig-tplName');
  const tplBtns   = root.querySelectorAll('.sig-tpl');
  const inputs    = root.querySelectorAll('[data-k]');
  const copyBtn   = root.querySelector('#sig-copy');
  const copyHtml  = root.querySelector('#sig-copyHtml');
  const resetBtn  = root.querySelector('#sig-reset');

  function hydrateInputs() {
    inputs.forEach(i => { i.value = STATE[i.dataset.k] || ''; });
  }
  hydrateInputs();

  function render() {
    const html = buildSignature(STATE);
    stage.innerHTML = html;
  }
  render();

  inputs.forEach(i => {
    i.addEventListener('input', () => {
      STATE[i.dataset.k] = i.value;
      render();
    });
  });

  tplBtns.forEach(b => {
    b.addEventListener('click', () => {
      tplBtns.forEach(x => x.classList.remove('is-active'));
      b.classList.add('is-active');
      STATE.template = b.dataset.tpl;
      const labels = { classic: 'Classic · table-safe HTML', compact: 'Compact · single row', editorial: 'Editorial · serif lede' };
      tplName.textContent = labels[STATE.template];
      render();
    });
  });

  resetBtn.addEventListener('click', () => {
    Object.assign(STATE, {
      firstName:'', lastName:'', pronouns:'', title:'', department:'',
      email:'', phone:'', mobile:'', website:'', websiteUrl:'', address:'',
      photo:'', linkedin:'', twitter:'', instagram:'', youtube:'',
      cta:'', ctaUrl:'', quote:'', legal:'',
    });
    hydrateInputs();
    render();
  });

  // ----------- COPY HELPERS -----------
  async function copyRich(html) {
    const plain = stage.innerText.replace(/\n{3,}/g, '\n\n').trim();
    try {
      const item = new ClipboardItem({
        'text/html':  new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([item]);
      return true;
    } catch (e) {
      // Fallback — select stage node and execCommand copy
      try {
        const range = document.createRange();
        range.selectNodeContents(stage);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        const ok = document.execCommand('copy');
        sel.removeAllRanges();
        return ok;
      } catch (_) { return false; }
    }
  }

  function flashCopied(btn, label) {
    const original = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check"></i> ${label}`;
    btn.classList.add('sig-btn--copied');
    if (window.lucide) window.lucide.createIcons({ root: btn });
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('sig-btn--copied');
      if (window.lucide) window.lucide.createIcons({ root: btn });
    }, 1800);
  }

  copyBtn.addEventListener('click', async () => {
    const ok = await copyRich(buildSignature(STATE));
    flashCopied(copyBtn, ok ? 'Copied' : 'Copy failed');
  });

  copyHtml.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(buildSignature(STATE));
      flashCopied(copyHtml, 'HTML copied');
    } catch (_) {
      flashCopied(copyHtml, 'Copy failed');
    }
  });

  // ============================================================
  // SIGNATURE BUILDERS — table-based, inline styles, email-safe.
  // Three layouts: classic · compact · editorial.
  // ============================================================
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function urlOk(u) {
    if (!u) return '';
    return /^(https?:|mailto:|tel:)/i.test(u) ? u : 'https://' + u;
  }
  function ifEl(val, html) { return val ? html : ''; }
  function buildSignature(s) {
    if (s.template === 'compact')   return tplCompact(s);
    if (s.template === 'editorial') return tplEditorial(s);
    return tplClassic(s);
  }

  // Inline social row — used by classic + compact
  function socialRow(s, color) {
    const ink = color || '#0B0F14';
    const items = [];
    if (s.linkedin)  items.push({ label: 'LinkedIn',  url: s.linkedin });
    if (s.twitter)   items.push({ label: 'X',         url: s.twitter });
    if (s.instagram) items.push({ label: 'Instagram', url: s.instagram });
    if (s.youtube)   items.push({ label: 'YouTube',   url: s.youtube });
    if (!items.length) return '';
    return items.map(i =>
      `<a href="${esc(urlOk(i.url))}" style="color:${ink};text-decoration:none;font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border-bottom:1px solid ${esc(s.accent)};padding-bottom:1px;margin-right:14px;">${esc(i.label)}</a>`
    ).join('');
  }

  // Legal disclaimer block — bottom of every signature
  function legalHtml(s) {
    if (!s.legal) return '';
    const lines = String(s.legal).split(/\n+/).map(l => esc(l.trim())).filter(Boolean).join('<br>');
    return `<div style="margin-top:16px;padding-top:10px;border-top:1px solid #E2DED6;font-family:'DM Sans',Arial,sans-serif;font-size:10.5px;color:#8A95A5;line-height:1.5;max-width:520px;">${lines}</div>`;
  }

  // ---------- CLASSIC ----------
  function tplClassic(s) {
    const fullName = [s.firstName, s.lastName].filter(Boolean).join(' ');
    const pron = s.pronouns ? ` <span style="color:#5B6573;font-style:italic;font-size:13px;">(${esc(s.pronouns)})</span>` : '';
    const photoCell = s.photo
      ? `<td style="padding:0 22px 0 0;vertical-align:top;width:84px;"><img src="${esc(s.photo)}" width="84" height="84" alt="${esc(fullName)}" style="display:block;width:84px;height:84px;border-radius:50%;object-fit:cover;border:1px solid #E2DED6;"></td>`
      : '';
    const contactBits = [];
    if (s.phone)  contactBits.push(`<a href="tel:${esc(s.phone.replace(/\s+/g,''))}" style="color:#1A2230;text-decoration:none;">${esc(s.phone)}</a>`);
    if (s.mobile) contactBits.push(`<a href="tel:${esc(s.mobile.replace(/\s+/g,''))}" style="color:#1A2230;text-decoration:none;">m. ${esc(s.mobile)}</a>`);
    if (s.email)  contactBits.push(`<a href="mailto:${esc(s.email)}" style="color:#1A2230;text-decoration:none;">${esc(s.email)}</a>`);
    const contactRow = contactBits.length
      ? `<div style="margin:10px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#1A2230;line-height:1.6;">${contactBits.join(' &nbsp;·&nbsp; ')}</div>`
      : '';
    const webRow = (s.website || s.address)
      ? `<div style="margin:2px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#5B6573;line-height:1.6;">${ifEl(s.website, `<a href="${esc(urlOk(s.websiteUrl||s.website))}" style="color:#1A2230;text-decoration:none;">${esc(s.website)}</a>`)}${(s.website && s.address) ? ' &nbsp;·&nbsp; ' : ''}${esc(s.address)}</div>`
      : '';
    const social = socialRow(s);
    const socialRowEl = social ? `<div style="margin-top:14px;">${social}</div>` : '';
    const ctaEl = (s.cta && s.ctaUrl)
      ? `<div style="margin-top:14px;"><a href="${esc(urlOk(s.ctaUrl))}" style="display:inline-block;background:#0B0F14;color:#FFFFFF;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.04em;padding:9px 18px;border-radius:999px;">${esc(s.cta)} &rarr;</a></div>`
      : '';
    return `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;font-family:'DM Sans',Arial,sans-serif;color:#0B0F14;">
  <tr>
    ${photoCell}
    <td style="padding:0 0 0 ${s.photo ? '22px' : '0'};border-left:${s.photo ? '0' : '2px solid '+esc(s.accent)};${s.photo ? '' : 'padding-left:18px;'}vertical-align:top;">
      <div style="font-family:'Newsreader',Georgia,serif;font-size:20px;font-weight:500;color:#0B0F14;letter-spacing:-0.01em;line-height:1.2;">${esc(fullName) || '&nbsp;'}${pron}</div>
      ${ifEl(s.title || s.department, `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#5B6573;margin-top:3px;">${esc(s.title)}${(s.title && s.department) ? ' &nbsp;·&nbsp; ' : ''}<span style="color:#0B0F14;">${esc(s.department)}</span></div>`)}
      ${contactRow}
      ${webRow}
      ${ctaEl}
      ${socialRowEl}
      ${legalHtml(s)}
    </td>
  </tr>
</table>`.trim();
  }

  // ---------- COMPACT ----------
  function tplCompact(s) {
    const fullName = [s.firstName, s.lastName].filter(Boolean).join(' ');
    const pron = s.pronouns ? ` <span style="color:#5B6573;font-style:italic;font-size:12px;">(${esc(s.pronouns)})</span>` : '';
    const titleLine = [s.title, s.department].filter(Boolean).join(' · ');
    const contactBits = [];
    if (s.phone)   contactBits.push(`<a href="tel:${esc(s.phone.replace(/\s+/g,''))}" style="color:#1A2230;text-decoration:none;">${esc(s.phone)}</a>`);
    if (s.email)   contactBits.push(`<a href="mailto:${esc(s.email)}" style="color:#1A2230;text-decoration:none;">${esc(s.email)}</a>`);
    if (s.website) contactBits.push(`<a href="${esc(urlOk(s.websiteUrl||s.website))}" style="color:#1A2230;text-decoration:none;">${esc(s.website)}</a>`);
    const contactLine = contactBits.length
      ? `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#1A2230;margin-top:2px;line-height:1.6;">${contactBits.join(' &nbsp;·&nbsp; ')}</div>`
      : '';
    const social = socialRow(s);
    const photoCell = s.photo
      ? `<td style="padding:0 14px 0 0;vertical-align:top;width:56px;"><img src="${esc(s.photo)}" width="56" height="56" alt="${esc(fullName)}" style="display:block;width:56px;height:56px;border-radius:50%;object-fit:cover;border:1px solid #E2DED6;"></td>`
      : '';
    const content = `
      <div style="font-family:'Newsreader',Georgia,serif;font-size:18px;font-weight:500;color:#0B0F14;letter-spacing:-0.01em;line-height:1.2;">${esc(fullName) || '&nbsp;'}${pron}${ifEl(titleLine, `<span style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;font-weight:400;color:#5B6573;">&nbsp; — &nbsp;${esc(titleLine)}</span>`)}</div>
      ${contactLine}
      ${ifEl(s.address, `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#5B6573;margin-top:2px;">${esc(s.address)}</div>`)}
      ${ifEl(social, `<div style="margin-top:10px;">${social}</div>`)}`;
    return `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;font-family:'DM Sans',Arial,sans-serif;color:#0B0F14;">
  <tr>
    <td style="padding:0;border-top:2px solid ${esc(s.accent)};padding-top:10px;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
        <tr>
          ${photoCell}
          <td style="vertical-align:top;">${content}</td>
        </tr>
      </table>
      ${legalHtml(s)}
    </td>
  </tr>
</table>`.trim();
  }

  // ---------- EDITORIAL ----------
  function tplEditorial(s) {
    const fullName = [s.firstName, s.lastName].filter(Boolean).join(' ');
    const titleLine = [s.title, s.department].filter(Boolean).join(' · ');
    const contactBits = [];
    if (s.phone)   contactBits.push(`<a href="tel:${esc(s.phone.replace(/\s+/g,''))}" style="color:#1A2230;text-decoration:none;">${esc(s.phone)}</a>`);
    if (s.mobile)  contactBits.push(`<a href="tel:${esc(s.mobile.replace(/\s+/g,''))}" style="color:#1A2230;text-decoration:none;">m. ${esc(s.mobile)}</a>`);
    if (s.email)   contactBits.push(`<a href="mailto:${esc(s.email)}" style="color:#1A2230;text-decoration:none;">${esc(s.email)}</a>`);
    if (s.website) contactBits.push(`<a href="${esc(urlOk(s.websiteUrl||s.website))}" style="color:#1A2230;text-decoration:none;">${esc(s.website)}</a>`);
    const meta = contactBits.join(' &nbsp;·&nbsp; ');
    const social = socialRow(s);
    const nameBlock = `
      <div style="font-family:'Newsreader',Georgia,serif;font-size:24px;font-weight:500;color:#0B0F14;letter-spacing:-0.015em;line-height:1.15;">${esc(fullName) || '&nbsp;'}${ifEl(s.pronouns, ` <span style="font-style:italic;font-size:14px;color:#5B6573;">(${esc(s.pronouns)})</span>`)}</div>
      ${ifEl(titleLine, `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#5B6573;margin-top:6px;">${esc(titleLine)}</div>`)}
      ${ifEl(meta, `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#1A2230;margin-top:12px;line-height:1.6;">${meta}</div>`)}
      ${ifEl(s.address, `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#5B6573;margin-top:2px;">${esc(s.address)}</div>`)}
      ${ifEl((s.cta && s.ctaUrl), `<div style="margin-top:14px;"><a href="${esc(urlOk(s.ctaUrl))}" style="display:inline-block;background:${esc(s.accent)};color:#FFFFFF;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.04em;padding:9px 18px;border-radius:999px;">${esc(s.cta)} &rarr;</a></div>`)}
      ${ifEl(social, `<div style="margin-top:14px;">${social}</div>`)}`;
    const photoCell = s.photo
      ? `<td style="padding:0 0 0 18px;vertical-align:top;width:64px;"><img src="${esc(s.photo)}" width="64" height="64" alt="${esc(fullName)}" style="display:block;width:64px;height:64px;border-radius:50%;object-fit:cover;border:1px solid #E2DED6;"></td>`
      : '';
    return `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;font-family:'DM Sans',Arial,sans-serif;color:#0B0F14;max-width:520px;">
  ${ifEl(s.quote, `<tr>
    <td style="padding:0 0 14px;">
      <div style="font-family:'Newsreader',Georgia,serif;font-style:italic;font-size:15px;color:${esc(s.accent)};letter-spacing:0.01em;">&mdash; ${esc(s.quote || '')}</div>
    </td>
  </tr>`)}
  <tr>
    <td style="padding:14px 0 0;border-top:1px solid #1A2230;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="vertical-align:top;">${nameBlock}</td>
          ${photoCell}
        </tr>
      </table>
      ${legalHtml(s)}
    </td>
  </tr>
</table>`.trim();
  }
};
