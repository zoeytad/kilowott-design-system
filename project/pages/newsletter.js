/* ============================================================
   NEWSLETTER — block composer (text · image · video · button etc.)
   Live 600px email canvas + copy-as-HTML / copy-rich for Gmail body.
   Email-safe: nested <table> / inline styles / Newsreader→Georgia,
   DM Sans→Arial fallbacks. No external CSS in output.
   ============================================================ */

window.renderNewsletter = function (root) {

  // ----------- BLOCK TYPES -----------
  const BLOCK_DEFS = {
    eyebrow:   { label: 'Eyebrow',     icon: 'tag' },
    heading:   { label: 'Heading',     icon: 'heading-1' },
    heading2:  { label: 'Sub-heading', icon: 'heading-2' },
    paragraph: { label: 'Paragraph',   icon: 'pilcrow' },
    image:     { label: 'Image',       icon: 'image' },
    video:     { label: 'Video',       icon: 'play-circle' },
    button:    { label: 'Button',      icon: 'square-mouse-pointer' },
    divider:   { label: 'Divider',     icon: 'minus' },
    quote:     { label: 'Pull quote',  icon: 'quote' },
    stat:      { label: 'Stat',        icon: 'trending-up' },
    spacer:    { label: 'Spacer',      icon: 'move-vertical' },
  };
  const BLOCK_ORDER = ['heading','heading2','paragraph','eyebrow','image','video','button','quote','stat','divider','spacer'];

  let nextId = 1;
  const uid = () => 'b' + (nextId++);

  // ----------- DEFAULT STATE -----------
  // All sample content uses real Kilowott facts (offices, case studies, URLs)
  // pulled from kilowott.com. Edit freely — these are just defaults.
  const STATE = {
    subject:   'Stories from the field — recent client work',
    preheader: 'Paul John Caffeine 3.5× organic traffic. Plus a few notes from the team.',
    issue:     'Field notes',
    fromName:  'Kilowott',
    fromEmail: 'sales@kilowott.com',
    address:   'Fredrikstad · Sandnes · Goa · Dubai',
    accent:    '#E4022D',
    blocks: [
      { id: uid(), type: 'eyebrow',   text: 'Field notes · recent work' },
      { id: uid(), type: 'heading',   text: 'Built for what <em>comes next</em>.' },
      { id: uid(), type: 'paragraph', text: 'A short note on a recent piece of work — SEO-led content strategy and targeted Meta ads for a premium Indian coffee brand entering the U.S. market. Real numbers, no rounding.' },
      { id: uid(), type: 'divider' },
      { id: uid(), type: 'heading2',  text: '<em>3.5×</em> organic traffic for Paul John Caffeine.' },
      { id: uid(), type: 'paragraph', text: 'Premium Indian coffee brand entering the U.S. market. We led with SEO content strategy and Meta ads — Domain Authority moved from 1 to 20, organic users grew 111%, engaged sessions 98%, and impressions hit 256,000. The full breakdown names every decision.' },
      { id: uid(), type: 'image',     url: 'https://kilowott-design-system-production.up.railway.app/assets/photos/textural-atmosphere-warm.jpg', alt: 'Coffee brand reference photography', caption: 'Replace this with the case-study hero image when you compose your own newsletter.', link: '' },
      { id: uid(), type: 'button',    label: 'Read the case study', url: 'https://kilowott.com/case-studies/driving-3-5x-higher-organic-traffic-for-paul-john-caffeine/', style: 'ink' },
      { id: uid(), type: 'divider' },
      { id: uid(), type: 'stat',      number: '3.5×', caption: 'Organic traffic growth for Paul John Caffeine — SEO + Meta ads, U.S. market entry.' },
      { id: uid(), type: 'quote',     text: 'Scale faster. Deliver better. Create impact.', cite: 'Kilowott' },
      { id: uid(), type: 'divider' },
      { id: uid(), type: 'paragraph', text: 'Want to talk through a project? Pick a slot — link below — or reply to this email and we’ll route you to the right person.' },
      { id: uid(), type: 'button',    label: 'Book a call', url: 'https://meetings.hubspot.com/pphadtare', style: 'accent' },
    ],
  };

  // ----------- HTML SHELL -----------
  root.innerHTML = `
  <style>
    .nl-hero { padding: var(--s-9) 0 var(--s-7); border-bottom: 1px solid var(--rule); }
    .nl-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .nl-hero h1 em { font-style: italic; color: var(--accent); }
    .nl-hero__lede {
      margin-top: 22px; max-width: 62ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    /* Studio split */
    .nl-studio {
      display: grid;
      grid-template-columns: 460px 1fr;
      gap: var(--s-7);
      align-items: start;
    }
    @media (max-width: 1180px) { .nl-studio { grid-template-columns: 1fr; } }

    /* Composer */
    .nl-comp {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      background: var(--bg);
      position: sticky; top: 90px;
      max-height: calc(100vh - 110px);
      display: flex; flex-direction: column;
    }
    .nl-comp__head {
      padding: 14px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--fg-2);
      display: flex; justify-content: space-between; align-items: center;
    }
    .nl-comp__body { padding: 16px 20px 18px; overflow-y: auto; flex: 1; }
    .nl-meta {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--rule);
      margin-bottom: 16px;
    }
    .nl-meta__h {
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--fg);
      margin: 0 0 10px;
      display: flex; align-items: center; gap: 10px;
    }
    .nl-meta__h::before { content: ""; width: 18px; height: 1px; background: var(--accent); }
    .nl-field { margin-bottom: 10px; }
    .nl-field label {
      display: block;
      font-size: 11px; color: var(--fg-2);
      letter-spacing: 0.04em; text-transform: uppercase;
      margin-bottom: 4px; font-weight: 500;
    }
    .nl-field input, .nl-field textarea, .nl-field select {
      width: 100%;
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      padding: 8px 11px;
      font-family: var(--font-sans);
      font-size: 13px; line-height: 1.5;
      background: var(--bg); color: var(--fg);
      transition: border-color 0.15s ease;
      resize: vertical;
    }
    .nl-field input:focus, .nl-field textarea:focus, .nl-field select:focus {
      outline: none; border-color: var(--fg);
    }
    .nl-field textarea { min-height: 60px; }
    .nl-field--row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

    /* Block list */
    .nl-blocks { list-style: none; padding: 0; margin: 0; }
    .nl-block {
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      margin-bottom: 8px;
      background: var(--bg);
    }
    .nl-block__head {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 10px;
      border-bottom: 1px solid var(--rule);
      background: var(--bg-2);
      border-radius: var(--r-2) var(--r-2) 0 0;
    }
    .nl-block__type {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--fg-2);
      flex: 1;
    }
    .nl-block__type b { color: var(--fg); font-weight: 500; }
    .nl-block__ctrl {
      display: inline-flex; align-items: center; justify-content: center;
      width: 24px; height: 24px;
      border: 1px solid transparent;
      border-radius: var(--r-2);
      background: transparent;
      color: var(--fg-2);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .nl-block__ctrl:hover { color: var(--fg); border-color: var(--rule); background: var(--bg); }
    .nl-block__ctrl--del:hover { color: var(--accent); border-color: var(--accent); }
    .nl-block__ctrl[disabled] { opacity: 0.3; cursor: not-allowed; }
    .nl-block__ctrl .lucide { width: 13px; height: 13px; stroke-width: 1.75; }
    .nl-block__body { padding: 10px; }

    /* Add block bar */
    .nl-add {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 12px;
      padding-top: 14px;
      border-top: 1px solid var(--rule);
    }
    .nl-add__h {
      grid-column: 1 / -1;
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--fg);
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 4px;
    }
    .nl-add__h::before { content: ""; width: 18px; height: 1px; background: var(--accent); }
    .nl-add button {
      display: inline-flex; align-items: center; justify-content: center; gap: 6px;
      padding: 9px 4px;
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      background: var(--bg);
      font-family: var(--font-sans);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.04em;
      color: var(--fg);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .nl-add button:hover { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .nl-add button .lucide { width: 13px; height: 13px; stroke-width: 1.75; }

    /* Preview */
    .nl-preview {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
    }
    .nl-preview__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .nl-preview__stage {
      background: var(--bg-2);
      padding: 32px 24px;
      display: flex; justify-content: center;
    }
    .nl-canvas {
      width: 100%; max-width: 600px;
      background: #FFFFFF;
      box-shadow: var(--shadow-1);
    }
    [data-theme="dark"] .nl-canvas { box-shadow: 0 2px 6px rgba(0,0,0,0.5); }

    .nl-actions {
      padding: 16px 20px;
      border-top: 1px solid var(--rule);
      display: flex; justify-content: space-between; align-items: center;
      gap: var(--s-4); flex-wrap: wrap;
    }
    .nl-actions__hint { font-size: 12px; color: var(--fg-2); max-width: 60ch; line-height: 1.5; }
    .nl-actions__hint b { color: var(--fg); font-weight: 500; }
    .nl-btns { display: inline-flex; gap: 8px; flex-wrap: wrap; }
    .nl-btn {
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
    .nl-btn:hover { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .nl-btn--primary { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .nl-btn--primary:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
    .nl-btn--copied { background: #16a34a !important; border-color: #16a34a !important; color: #fff !important; }
    .nl-btn .lucide { width: 14px; height: 14px; stroke-width: 1.75; }

    /* HOWTO */
    .nl-howto {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-5);
      margin-top: var(--s-7);
    }
    @media (max-width: 900px) { .nl-howto { grid-template-columns: 1fr; } }
    .nl-step { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 22px; background: var(--bg); }
    .nl-step__num {
      font-family: var(--font-display); font-size: 28px; line-height: 1;
      color: var(--accent); letter-spacing: -0.02em;
      margin-bottom: 10px; font-style: italic;
    }
    .nl-step__h {
      font-family: var(--font-display); font-size: 19px; line-height: 1.2;
      letter-spacing: -0.01em; color: var(--fg); margin-bottom: 8px;
    }
    .nl-step__b { font-size: 13px; color: var(--fg-2); line-height: 1.55; }
    .nl-step__b code {
      font-family: var(--font-mono); font-size: 12px;
      background: var(--bg-2); padding: 1px 6px; border-radius: 3px;
      color: var(--fg);
    }
  </style>

  <!-- HERO -->
  <section class="nl-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">11 · Newsletter</span>
      <h1>Compose a <em>newsletter</em> in blocks.</h1>
      <p class="nl-hero__lede">
        Block composer for one-off newsletters and updates. Stack heading, paragraph,
        image, video link, button, divider, quote and stat blocks. Live 600px preview
        renders email-safe table HTML. Hit copy &mdash; paste straight into Gmail body.
      </p>
    </div>
  </section>

  <!-- STUDIO -->
  <section class="section">
    <div class="container">
      <div class="nl-studio">

        <aside class="nl-comp" aria-label="Composer">
          <div class="nl-comp__head">
            <span>Composer</span>
            <button class="nl-btn" id="nl-reset" style="padding:4px 10px;font-size:10px;letter-spacing:0.06em;">Reset</button>
          </div>
          <div class="nl-comp__body">

            <div class="nl-meta">
              <div class="nl-meta__h">Header</div>
              <div class="nl-field"><label>Subject line</label><input data-meta="subject" type="text"></div>
              <div class="nl-field"><label>Preheader (40–90 chars, second sentence)</label><input data-meta="preheader" type="text"></div>
              <div class="nl-field"><label>Issue eyebrow (top of email)</label><input data-meta="issue" type="text"></div>
              <div class="nl-field nl-field--row">
                <div><label>From name</label><input data-meta="fromName" type="text"></div>
                <div><label>From email</label><input data-meta="fromEmail" type="email"></div>
              </div>
              <div class="nl-field"><label>Footer address</label><input data-meta="address" type="text"></div>
            </div>

            <div class="nl-meta__h">Blocks</div>
            <ul class="nl-blocks" id="nl-blocks"></ul>

            <div class="nl-add">
              <div class="nl-add__h">Add block</div>
              ${BLOCK_ORDER.map(t => `<button data-add="${t}" title="${BLOCK_DEFS[t].label}"><i data-lucide="${BLOCK_DEFS[t].icon}"></i> ${BLOCK_DEFS[t].label}</button>`).join('')}
            </div>

          </div>
        </aside>

        <div>
          <div class="nl-preview">
            <div class="nl-preview__head">
              <span>600px canvas · inbox preview</span>
              <span id="nl-blockCount">0 blocks</span>
            </div>
            <div class="nl-preview__stage">
              <div class="nl-canvas" id="nl-canvas"></div>
            </div>
            <div class="nl-actions">
              <div class="nl-actions__hint">
                Click <b>Copy newsletter</b> &mdash; paste into Gmail compose with <b>⌘V</b>. Rich-text formatting carries through. For source HTML or a plain-text fallback, use the other buttons.
              </div>
              <div class="nl-btns">
                <button class="nl-btn" id="nl-copyText" title="Plain text fallback"><i data-lucide="type"></i> Plain text</button>
                <button class="nl-btn" id="nl-copyHtml" title="Raw HTML source"><i data-lucide="code-2"></i> HTML source</button>
                <button class="nl-btn nl-btn--primary" id="nl-copyRich"><i data-lucide="clipboard-copy"></i> Copy newsletter</button>
              </div>
            </div>
          </div>

          <div class="nl-howto">
            <div class="nl-step">
              <div class="nl-step__num">01</div>
              <div class="nl-step__h">Stack blocks.</div>
              <p class="nl-step__b">Add heading, paragraph, image, video, button, quote, stat, divider, spacer. Reorder with the up/down arrows. Delete with the &times; button. Inline edit — preview updates as you type.</p>
            </div>
            <div class="nl-step">
              <div class="nl-step__num">02</div>
              <div class="nl-step__h">Paste media URLs.</div>
              <p class="nl-step__b">Image and video blocks take a URL — host the file somewhere public (Cloudinary, S3, your CMS) and paste the link. Video shows as a click-through poster since Gmail strips embeds.</p>
            </div>
            <div class="nl-step">
              <div class="nl-step__num">03</div>
              <div class="nl-step__h">Copy &amp; paste into Gmail.</div>
              <p class="nl-step__b">Hit <b>Copy newsletter</b>, open Gmail compose, paste in the body with <code>⌘V</code>. Subject and preheader are shown in the composer for reference — type them into Gmail&rsquo;s subject field.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  `;

  // ----------- DOM REFS -----------
  const blocksEl    = root.querySelector('#nl-blocks');
  const canvasEl    = root.querySelector('#nl-canvas');
  const blockCountEl = root.querySelector('#nl-blockCount');
  const metaInputs  = root.querySelectorAll('[data-meta]');
  const addBtns     = root.querySelectorAll('[data-add]');
  const resetBtn    = root.querySelector('#nl-reset');
  const copyRich    = root.querySelector('#nl-copyRich');
  const copyHtmlBtn = root.querySelector('#nl-copyHtml');
  const copyTextBtn = root.querySelector('#nl-copyText');

  // ----------- HYDRATE META FIELDS -----------
  metaInputs.forEach(i => { i.value = STATE[i.dataset.meta] || ''; });
  metaInputs.forEach(i => {
    i.addEventListener('input', () => {
      STATE[i.dataset.meta] = i.value;
      renderPreview();
    });
  });

  // ----------- BLOCK EDITORS -----------
  function blockEditor(b, idx, total) {
    const def = BLOCK_DEFS[b.type];
    const fields = blockFields(b);
    return `
      <li class="nl-block" data-id="${b.id}">
        <div class="nl-block__head">
          <span class="nl-block__type"><b>${def.label}</b></span>
          <button class="nl-block__ctrl" data-act="up" ${idx === 0 ? 'disabled' : ''} title="Move up"><i data-lucide="chevron-up"></i></button>
          <button class="nl-block__ctrl" data-act="down" ${idx === total - 1 ? 'disabled' : ''} title="Move down"><i data-lucide="chevron-down"></i></button>
          <button class="nl-block__ctrl nl-block__ctrl--del" data-act="del" title="Delete"><i data-lucide="x"></i></button>
        </div>
        ${fields ? `<div class="nl-block__body">${fields}</div>` : ''}
      </li>`;
  }

  function blockFields(b) {
    switch (b.type) {
      case 'eyebrow':
      case 'heading':
      case 'heading2':
        return `<div class="nl-field"><label>Text (use &lt;em&gt;word&lt;/em&gt; for italic accent)</label><input data-prop="text" type="text" value="${escAttr(b.text || '')}"></div>`;
      case 'paragraph':
        return `<div class="nl-field"><label>Body</label><textarea data-prop="text" rows="3">${escHtml(b.text || '')}</textarea></div>`;
      case 'image':
        return `
          <div class="nl-field"><label>Image URL</label><input data-prop="url" type="url" value="${escAttr(b.url || '')}" placeholder="https://..."></div>
          <div class="nl-field"><label>Alt text</label><input data-prop="alt" type="text" value="${escAttr(b.alt || '')}"></div>
          <div class="nl-field"><label>Caption (optional)</label><input data-prop="caption" type="text" value="${escAttr(b.caption || '')}"></div>
          <div class="nl-field"><label>Link URL (optional)</label><input data-prop="link" type="url" value="${escAttr(b.link || '')}"></div>`;
      case 'video':
        return `
          <div class="nl-field"><label>Video link (YouTube / Vimeo / file URL)</label><input data-prop="link" type="url" value="${escAttr(b.link || '')}" placeholder="https://youtu.be/..."></div>
          <div class="nl-field"><label>Poster image URL</label><input data-prop="poster" type="url" value="${escAttr(b.poster || '')}" placeholder="https://..."></div>
          <div class="nl-field"><label>Caption (optional)</label><input data-prop="caption" type="text" value="${escAttr(b.caption || '')}"></div>`;
      case 'button':
        return `
          <div class="nl-field nl-field--row">
            <div><label>Label</label><input data-prop="label" type="text" value="${escAttr(b.label || '')}"></div>
            <div><label>Style</label><select data-prop="style"><option value="ink"${b.style === 'ink' ? ' selected' : ''}>Ink (default)</option><option value="accent"${b.style === 'accent' ? ' selected' : ''}>Accent (red)</option><option value="ghost"${b.style === 'ghost' ? ' selected' : ''}>Outline</option></select></div>
          </div>
          <div class="nl-field"><label>URL</label><input data-prop="url" type="url" value="${escAttr(b.url || '')}"></div>`;
      case 'quote':
        return `
          <div class="nl-field"><label>Quote text</label><textarea data-prop="text" rows="2">${escHtml(b.text || '')}</textarea></div>
          <div class="nl-field"><label>Citation (optional)</label><input data-prop="cite" type="text" value="${escAttr(b.cite || '')}"></div>`;
      case 'stat':
        return `
          <div class="nl-field nl-field--row">
            <div><label>Number</label><input data-prop="number" type="text" value="${escAttr(b.number || '')}"></div>
          </div>
          <div class="nl-field"><label>Caption</label><input data-prop="caption" type="text" value="${escAttr(b.caption || '')}"></div>`;
      case 'spacer':
        return `<div class="nl-field"><label>Height (px)</label><input data-prop="height" type="number" min="8" max="80" value="${escAttr(b.height || 24)}"></div>`;
      case 'divider':
      default:
        return '';
    }
  }

  function escAttr(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function escHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // ----------- COMPOSER RENDER -----------
  function renderComposer() {
    const total = STATE.blocks.length;
    blocksEl.innerHTML = STATE.blocks.map((b, i) => blockEditor(b, i, total)).join('');
    if (window.lucide) window.lucide.createIcons({ root: blocksEl });
    blockCountEl.textContent = total + ' block' + (total === 1 ? '' : 's');
  }

  // ----------- WIRE BLOCK INTERACTIONS (event delegation) -----------
  blocksEl.addEventListener('input', (e) => {
    const li = e.target.closest('.nl-block'); if (!li) return;
    const id = li.dataset.id;
    const block = STATE.blocks.find(b => b.id === id); if (!block) return;
    const prop = e.target.dataset.prop; if (!prop) return;
    let val = e.target.value;
    if (e.target.type === 'number') val = Number(val);
    block[prop] = val;
    renderPreview();
  });
  blocksEl.addEventListener('change', (e) => {
    if (e.target.tagName === 'SELECT') {
      const li = e.target.closest('.nl-block'); if (!li) return;
      const id = li.dataset.id;
      const block = STATE.blocks.find(b => b.id === id); if (!block) return;
      const prop = e.target.dataset.prop; if (!prop) return;
      block[prop] = e.target.value;
      renderPreview();
    }
  });
  blocksEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]'); if (!btn) return;
    const li = btn.closest('.nl-block'); if (!li) return;
    const id = li.dataset.id;
    const idx = STATE.blocks.findIndex(b => b.id === id); if (idx < 0) return;
    const act = btn.dataset.act;
    if (act === 'del') STATE.blocks.splice(idx, 1);
    if (act === 'up' && idx > 0)   [STATE.blocks[idx-1], STATE.blocks[idx]] = [STATE.blocks[idx], STATE.blocks[idx-1]];
    if (act === 'down' && idx < STATE.blocks.length - 1) [STATE.blocks[idx+1], STATE.blocks[idx]] = [STATE.blocks[idx], STATE.blocks[idx+1]];
    renderAll();
  });

  // ----------- ADD BLOCK -----------
  const DEFAULTS = {
    eyebrow:   () => ({ text: 'Eyebrow label' }),
    heading:   () => ({ text: 'A new <em>heading</em>.' }),
    heading2:  () => ({ text: 'A sub-heading.' }),
    paragraph: () => ({ text: 'Body copy. Edit me.' }),
    image:     () => ({ url: '', alt: '', caption: '', link: '' }),
    video:     () => ({ link: '', poster: '', caption: '' }),
    button:    () => ({ label: 'Button label', url: 'https://kilowott.com', style: 'ink' }),
    divider:   () => ({}),
    quote:     () => ({ text: 'A short pull-quote.', cite: '' }),
    stat:      () => ({ number: '+44%', caption: 'What it measures.' }),
    spacer:    () => ({ height: 24 }),
  };
  addBtns.forEach(b => {
    b.addEventListener('click', () => {
      const t = b.dataset.add;
      STATE.blocks.push({ id: uid(), type: t, ...DEFAULTS[t]() });
      renderAll();
      // scroll to the new block
      requestAnimationFrame(() => {
        const last = blocksEl.lastElementChild;
        if (last) last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    });
  });

  resetBtn.addEventListener('click', () => {
    if (!confirm('Reset newsletter to defaults? Your edits will be lost.')) return;
    location.reload();
  });

  // ============================================================
  // EMAIL HTML BUILDERS — table-based, inline styles, email-safe.
  // ============================================================
  function escE(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  // Allow only <em>, <strong>, <br> inline within heading/paragraph text
  function inline(s) {
    if (!s) return '';
    return escE(s)
      .replace(/&lt;em&gt;/g, '<em style="font-style:italic;color:' + escE(STATE.accent) + ';">')
      .replace(/&lt;\/em&gt;/g, '</em>')
      .replace(/&lt;strong&gt;/g, '<strong style="font-weight:500;color:#0B0F14;">')
      .replace(/&lt;\/strong&gt;/g, '</strong>')
      .replace(/&lt;br\s*\/?&gt;/g, '<br>');
  }
  function urlOk(u) {
    if (!u) return '';
    return /^(https?:|mailto:|tel:)/i.test(u) ? u : 'https://' + u;
  }

  function blockHtml(b) {
    const accent = escE(STATE.accent);
    switch (b.type) {
      case 'eyebrow':
        return `<tr><td style="padding:0 40px 14px;"><div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#0B0F14;display:inline-block;border-top:1px solid ${accent};padding-top:8px;">${inline(b.text)}</div></td></tr>`;
      case 'heading':
        return `<tr><td style="padding:0 40px 14px;"><h1 style="margin:0;font-family:'Newsreader',Georgia,serif;font-size:34px;line-height:1.1;letter-spacing:-0.015em;font-weight:400;color:#0B0F14;">${inline(b.text)}</h1></td></tr>`;
      case 'heading2':
        return `<tr><td style="padding:8px 40px 12px;"><h2 style="margin:0;font-family:'Newsreader',Georgia,serif;font-size:22px;line-height:1.2;letter-spacing:-0.01em;font-weight:400;color:#0B0F14;">${inline(b.text)}</h2></td></tr>`;
      case 'paragraph':
        return `<tr><td style="padding:0 40px 14px;"><p style="margin:0;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;color:#1A2230;">${inline(b.text)}</p></td></tr>`;
      case 'image': {
        if (!b.url) return `<tr><td style="padding:0 40px 14px;"><div style="border:1px dashed #E2DED6;padding:32px;text-align:center;font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#8A95A5;">Image URL not set</div></td></tr>`;
        const img = `<img src="${escE(b.url)}" alt="${escE(b.alt || '')}" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:none;text-decoration:none;">`;
        const wrapped = b.link ? `<a href="${escE(urlOk(b.link))}" style="text-decoration:none;">${img}</a>` : img;
        const caption = b.caption ? `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#5B6573;margin-top:8px;font-style:italic;line-height:1.5;">${escE(b.caption)}</div>` : '';
        return `<tr><td style="padding:6px 40px 18px;">${wrapped}${caption}</td></tr>`;
      }
      case 'video': {
        if (!b.link) return `<tr><td style="padding:0 40px 14px;"><div style="border:1px dashed #E2DED6;padding:32px;text-align:center;font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#8A95A5;">Video link not set</div></td></tr>`;
        const poster = b.poster
          ? `<img src="${escE(b.poster)}" alt="${escE(b.caption || 'Watch video')}" style="display:block;width:100%;max-width:520px;height:auto;border:0;">`
          : `<div style="background:#0B0F14;color:#FFFFFF;padding:80px 20px;text-align:center;font-family:'DM Sans',Arial,sans-serif;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;">Watch video</div>`;
        const playBadge = `<div style="position:relative;display:block;">${poster}<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;"><div style="background:${accent};color:#FFFFFF;width:64px;height:64px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:22px;font-family:Arial,sans-serif;">▶</div></div></div>`;
        const caption = b.caption ? `<div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#5B6573;margin-top:8px;font-style:italic;line-height:1.5;">${escE(b.caption)}</div>` : '';
        return `<tr><td style="padding:6px 40px 18px;"><a href="${escE(urlOk(b.link))}" style="text-decoration:none;color:inherit;display:block;">${playBadge}</a>${caption}</td></tr>`;
      }
      case 'button': {
        if (!b.label || !b.url) return '';
        const styles = {
          ink:    'background:#0B0F14;color:#FFFFFF;border:1px solid #0B0F14;',
          accent: `background:${accent};color:#FFFFFF;border:1px solid ${accent};`,
          ghost:  'background:transparent;color:#0B0F14;border:1px solid #0B0F14;',
        };
        return `<tr><td style="padding:8px 40px 22px;"><a href="${escE(urlOk(b.url))}" style="display:inline-block;${styles[b.style] || styles.ink}text-decoration:none;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:500;letter-spacing:0.02em;padding:14px 28px;border-radius:999px;">${escE(b.label)} →</a></td></tr>`;
      }
      case 'divider':
        return `<tr><td style="padding:8px 40px;"><hr style="height:1px;background:#E2DED6;border:0;margin:0;"></td></tr>`;
      case 'quote':
        return `<tr><td style="padding:14px 40px 18px;"><blockquote style="margin:0;border-left:2px solid ${accent};padding:6px 0 6px 18px;"><p style="margin:0 0 6px;font-family:'Newsreader',Georgia,serif;font-style:italic;font-size:20px;line-height:1.35;color:#0B0F14;letter-spacing:-0.01em;">${inline(b.text)}</p>${b.cite ? `<cite style="font-family:'DM Sans',Arial,sans-serif;font-style:normal;font-size:12px;color:#5B6573;letter-spacing:0.04em;">— ${escE(b.cite)}</cite>` : ''}</blockquote></td></tr>`;
      case 'stat':
        return `<tr><td style="padding:8px 40px 22px;"><div style="font-family:'Newsreader',Georgia,serif;font-size:48px;line-height:1;letter-spacing:-0.03em;color:${accent};font-variant-numeric:tabular-nums;">${escE(b.number || '')}</div>${b.caption ? `<div style="margin-top:8px;font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#5B6573;line-height:1.5;max-width:42ch;">${escE(b.caption)}</div>` : ''}</td></tr>`;
      case 'spacer':
        return `<tr><td style="padding:0 40px;line-height:0;font-size:0;"><div style="height:${Number(b.height) || 24}px;line-height:${Number(b.height) || 24}px;">&nbsp;</div></td></tr>`;
      default:
        return '';
    }
  }

  function buildEmail() {
    const headerRow = `
    <tr><td style="padding:32px 40px 8px;">
      <div style="font-family:'Newsreader',Georgia,serif;font-size:20px;letter-spacing:-0.01em;color:#0B0F14;">${escE(STATE.fromName || 'Kilowott')}</div>
    </td></tr>
    ${STATE.issue ? `<tr><td style="padding:0 40px 24px;"><div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#5B6573;">${escE(STATE.issue)}</div></td></tr>` : ''}
    `;
    const bodyRows = STATE.blocks.map(blockHtml).join('\n');
    const footerRow = `
    <tr><td style="padding:24px 40px 36px;border-top:1px solid #E2DED6;">
      <div style="font-family:'Newsreader',Georgia,serif;font-size:14px;color:#0B0F14;letter-spacing:-0.01em;">${escE(STATE.fromName || 'Kilowott')}</div>
      <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#5B6573;margin-top:6px;line-height:1.6;">${escE(STATE.address || '')}</div>
      <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#8A95A5;margin-top:10px;line-height:1.6;">
        You&rsquo;re receiving this because you opted in. <a href="#" style="color:#5B6573;">Update preferences</a> · <a href="#" style="color:#5B6573;">Unsubscribe</a>.
      </div>
    </td></tr>`;
    return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" align="center" style="border-collapse:collapse;width:100%;max-width:600px;background:#FFFFFF;font-family:'DM Sans',Arial,sans-serif;color:#0B0F14;line-height:1.55;">
${headerRow}${bodyRows}${footerRow}
</table>`;
  }

  function buildPlain() {
    const lines = [];
    if (STATE.issue) lines.push(STATE.issue.toUpperCase());
    STATE.blocks.forEach(b => {
      switch (b.type) {
        case 'eyebrow':   lines.push((b.text || '').toUpperCase()); break;
        case 'heading':   lines.push('\n' + stripHtml(b.text)); break;
        case 'heading2':  lines.push('\n' + stripHtml(b.text)); break;
        case 'paragraph': lines.push(stripHtml(b.text)); break;
        case 'image':     if (b.url) lines.push('[Image: ' + (b.alt || b.url) + ']' + (b.caption ? '\n' + b.caption : '')); break;
        case 'video':     if (b.link) lines.push('[Video: ' + b.link + ']' + (b.caption ? '\n' + b.caption : '')); break;
        case 'button':    if (b.label && b.url) lines.push(b.label + ' — ' + urlOk(b.url)); break;
        case 'divider':   lines.push('\n——————\n'); break;
        case 'quote':     lines.push('\n“' + stripHtml(b.text) + '”' + (b.cite ? '\n— ' + b.cite : '')); break;
        case 'stat':      lines.push('\n' + (b.number || '') + (b.caption ? ' — ' + b.caption : '')); break;
        case 'spacer':    lines.push(''); break;
      }
    });
    if (STATE.fromName) lines.push('\n—\n' + STATE.fromName);
    if (STATE.address)  lines.push(STATE.address);
    return lines.join('\n');
  }
  function stripHtml(s) { return String(s == null ? '' : s).replace(/<[^>]+>/g, ''); }

  // ----------- PREVIEW RENDER -----------
  function renderPreview() {
    canvasEl.innerHTML = buildEmail();
  }
  function renderAll() {
    renderComposer();
    renderPreview();
  }
  renderAll();

  // ----------- COPY HANDLERS -----------
  function flash(btn, label, ok) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="' + (ok ? 'check' : 'alert-triangle') + '"></i> ' + label;
    if (ok) btn.classList.add('nl-btn--copied');
    if (window.lucide) window.lucide.createIcons({ root: btn });
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('nl-btn--copied');
      if (window.lucide) window.lucide.createIcons({ root: btn });
    }, 1800);
  }

  copyRich.addEventListener('click', async () => {
    const html = buildEmail();
    const plain = buildPlain();
    try {
      const item = new ClipboardItem({
        'text/html':  new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([item]);
      flash(copyRich, 'Copied', true);
    } catch (_) {
      // fallback — select canvas
      try {
        const range = document.createRange();
        range.selectNodeContents(canvasEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        const ok = document.execCommand('copy');
        sel.removeAllRanges();
        flash(copyRich, ok ? 'Copied' : 'Failed', ok);
      } catch (__) { flash(copyRich, 'Failed', false); }
    }
  });

  copyHtmlBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(buildEmail());
      flash(copyHtmlBtn, 'HTML copied', true);
    } catch (_) { flash(copyHtmlBtn, 'Failed', false); }
  });

  copyTextBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(buildPlain());
      flash(copyTextBtn, 'Text copied', true);
    } catch (_) { flash(copyTextBtn, 'Failed', false); }
  });
};
