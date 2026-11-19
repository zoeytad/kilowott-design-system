/* ============================================================
   APP LOGIC — sidebar navigation, routing, page bar, search
   ============================================================ */

(function () {
  const pages = ['overview','downloads','logo','color','type','imagery','voice','social','posters','deck','email','newsletter','signature','stationery','case-study','magazine','foundations','components','icons','landing','dashboards','developers'];
  const renderers = {
    overview:      window.renderOverview,
    downloads:     window.renderDownloads,
    logo:          window.renderLogo,
    color:         window.renderColor,
    type:          window.renderType,
    imagery:       window.renderImagery,
    voice:         window.renderVoice,
    social:        window.renderSocial,
    posters:       window.renderPosters,
    deck:          window.renderDeck,
    email:         window.renderEmail,
    newsletter:    window.renderNewsletter,
    signature:     window.renderSignature,
    stationery:    window.renderStationery,
    'case-study':  window.renderCaseStudy,
    magazine:      window.renderMagazine,
    foundations:   window.renderFoundations,
    components:    window.renderComponents,
    icons:         window.renderIcons,
    landing:       window.renderLanding,
    dashboards:    window.renderDashboards,
    developers:    window.renderDevelopers,
  };

  /* ---------- NAVIGATION: one list drives the sidebar, page bar, and search ----------
     Grouped by what people come to do. An item with `sub` shows its pages as one
     entry (e.g. Email & newsletters = email + newsletter). */
  const NAV = [
    { label: 'Start', items: [
      { id: 'overview',  t: 'Home',      i: 'house',    d: 'Tasks, search, and the brand in 60 seconds' },
      { id: 'downloads', t: 'Downloads', i: 'download', d: 'Every file in the kit, in one place' } ] },
    { label: 'Brand basics', items: [
      { id: 'logo',    t: 'Logo',    i: 'badge',               d: 'Wordmark, bolt mark, clear space, sizes' },
      { id: 'color',   t: 'Colour',  i: 'palette',             d: 'Paper, ink, and one red: palette and ratios' },
      { id: 'type',    t: 'Type',    i: 'type',                d: 'Newsreader, DM Sans, JetBrains Mono' },
      { id: 'imagery', t: 'Imagery', i: 'image',               d: 'Photo style, treatments, approved photos' },
      { id: 'voice',   t: 'Voice',   i: 'message-square-text', d: 'How Kilowott writes: tone, words, taglines' } ] },
    { label: 'Make something', items: [
      { t: 'Social media', i: 'share-2', sub: [
        { id: 'social', t: 'Organic posts', d: 'LinkedIn, X, Facebook, and Instagram posts' },
        { id: 'posters', a: 'po-f-feed-1080', t: 'Paid social ads', d: 'Feed, Story, and LinkedIn ad sizes' } ] },
      { id: 'posters',    t: 'Posters & ads',       i: 'rectangle-horizontal', d: 'Print posters, roll-ups, billboards, display banners' },
      { id: 'deck',       t: 'Presentations',       i: 'presentation',         d: '15 slide layouts and the PowerPoint template' },
      { t: 'Email & newsletters', i: 'mail', sub: [
        { id: 'email',      t: 'Email templates',     d: 'Transactional and newsletter email' },
        { id: 'newsletter', t: 'Newsletter composer', d: 'Build a newsletter and copy Gmail-safe HTML' } ] },
      { id: 'signature',  t: 'Email signature',     i: 'pen-line',             d: 'Generate your signature and paste into Gmail' },
      { id: 'stationery', t: 'Print & stationery',  i: 'printer',              d: 'Business cards, letterhead, envelopes' },
      { t: 'Case studies & editorial', i: 'book-open', sub: [
        { id: 'case-study', t: 'Case study', d: 'Situation, decision, result template' },
        { id: 'magazine',   t: 'Magazine',   d: 'Framework cover and article spreads' } ] } ] },
    { label: 'Build for web', items: [
      { id: 'foundations', t: 'Foundations',     i: 'ruler',           d: 'Spacing, grid, radii, motion, tokens' },
      { id: 'components',  t: 'Components',      i: 'component',       d: 'Buttons, forms, cards, navigation, states' },
      { id: 'icons',       t: 'Icons',           i: 'shapes',          d: 'Lucide, 1.5 px stroke, starter set' },
      { id: 'landing',     t: 'Landing pages',   i: 'layout-template', d: 'Hero patterns and page sections' },
      { id: 'dashboards',  t: 'Dashboards',      i: 'chart-column',    d: 'KPI tiles, tables, charts, app shell' },
      { id: 'developers',  t: 'Developers & AI', i: 'code',            d: 'kilowott.css, Tailwind, tokens, AGENTS.md' } ] },
  ];
  // Flatten: page id -> { label, group, parent, desc, siblings }
  const INFO = {};
  NAV.forEach(g => g.items.forEach(it => {
    if (it.sub) it.sub.forEach(s => { if (!s.a && !INFO[s.id]) INFO[s.id] = { label: s.t, group: g.label, parent: it, desc: s.d }; });
    else if (!INFO[it.id]) INFO[it.id] = { label: it.t, group: g.label, parent: null, desc: it.d };
  }));
  const LABELS = Object.fromEntries(Object.entries(INFO).map(([k, v]) => [k, v.label]));
  window.KWNav = { NAV, INFO, pages };

  // ---------- SIDEBAR ----------
  const navEl = document.getElementById('tabs');
  const href = x => '#' + x.id + (x.a ? '/' + x.a : '');
  if (navEl) navEl.innerHTML = NAV.map(g => '<div class="kb-nav__group"><span class="kb-nav__label">' + g.label + '</span>' +
    g.items.map(it => it.sub
      ? '<a class="tab" href="' + href(it.sub[0]) + '" data-group="' + it.sub.filter(s => !s.a).map(s => s.id).join(' ') + '"><i data-lucide="' + it.i + '"></i>' + it.t + '</a>' +
        '<div class="kb-nav__sub">' + it.sub.map(s => '<a class="tab" href="' + href(s) + '" data-tab="' + s.id + '"' + (s.a ? ' data-anchor="' + s.a + '"' : '') + '>' + s.t + '</a>').join('') + '</div>'
      : '<a class="tab" href="' + href(it) + '" data-tab="' + it.id + '"><i data-lucide="' + it.i + '"></i>' + it.t + '</a>').join('') + '</div>').join('');

  const side = document.getElementById('kb-side');
  const scrim = document.getElementById('kb-scrim');
  const menuBtn = document.getElementById('kb-menu-open');
  function openMenu() { if (!side) return; side.classList.add('is-open'); scrim.classList.add('is-open'); document.body.classList.add('kb-menu-open'); menuBtn && menuBtn.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { if (!side) return; side.classList.remove('is-open'); scrim.classList.remove('is-open'); document.body.classList.remove('kb-menu-open'); menuBtn && menuBtn.setAttribute('aria-expanded', 'false'); }
  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  const mc = document.getElementById('kb-menu-close'); if (mc) mc.addEventListener('click', closeMenu);
  if (scrim) scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && side && side.classList.contains('is-open')) closeMenu(); });

  // ---------- LUCIDE HYDRATE helper ----------
  function hydrateLucide(root) {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: root || document.body }); } catch (e) {}
    }
  }

  // ---------- PAGE RENDER (fails loudly, never blank) ----------
  function renderPage(p) {
    const el = document.getElementById('page-' + p);
    if (!el || el.dataset.rendered) return el;
    try {
      if (typeof renderers[p] !== 'function') throw new Error('pages/' + p + '.js did not load (check the console for a syntax error)');
      renderers[p](el);
      if (window.KWGuide) window.KWGuide.inject(p, el);
    } catch (err) {
      console.error('[brand kit] ' + p + ':', err);
      el.innerHTML = '<section class="section"><div class="container"><span class="eyebrow eyebrow--accent">Page error</span>' +
        '<h1 class="page-header__title" style="padding:0;border:0;margin-top:16px">This page failed to load.</h1>' +
        '<p class="page-header__lede">' + String(err.message || err).replace(/</g, '&lt;') + '</p></div></section>';
    }
    el.dataset.rendered = '1';
    return el;
  }

  // ---------- DEMO LINKS ----------
  // Template mock-ups use href="#" for buttons that go nowhere. Without this,
  // clicking one empties the hash and the router jumps back to Home.
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href="#"]');
    if (a) e.preventDefault();
  });

  // ---------- PAGE BAR: breadcrumb, sibling pages, "On this page" ----------
  const bar = document.getElementById('kb-pagebar');
  function sectionsOf(el) {
    const out = [];
    el.querySelectorAll('section h2, .section-head__title').forEach(h => {
      if (h.closest('.kb-guide__col')) return;
      const t = (h.textContent || '').replace(/\s+/g, ' ').trim();
      if (!t || t.length > 90 || out.some(o => o.t === t)) return;
      if (!h.id) h.id = 'kb-s-' + out.length;
      out.push({ t, id: h.id });
    });
    return out;
  }
  function drawBar(name, el) {
    if (!bar) return;
    const info = INFO[name] || { label: name, group: '' };
    let html = name === 'overview' ? '<span class="kb-crumb"><b>Home</b></span>'
      : '<span class="kb-crumb"><a href="#overview">Home</a> / ' + info.group + ' / <b>' + (info.parent ? info.parent.t : info.label) + '</b></span>';
    if (info.parent) html += '<nav class="kb-sibs" aria-label="' + info.parent.t + '">' + info.parent.sub.map(s =>
      '<a href="' + href(s) + '"' + (s.id === name && !s.a ? ' aria-current="page"' : '') + '>' + s.t + '</a>').join('') + '</nav>';
    const secs = name === 'overview' ? [] : sectionsOf(el);
    if (secs.length > 1) html += '<div class="kb-jump"><button class="kb-jump__btn" type="button" aria-expanded="false" aria-haspopup="true">On this page<i data-lucide="chevron-down"></i></button>' +
      '<div class="kb-jump__menu" hidden>' + secs.map(s => '<a href="#' + name + '/' + s.id + '">' + s.t.replace(/</g, '&lt;') + '</a>').join('') + '</div></div>';
    bar.innerHTML = html;
    bar.hidden = name === 'overview';
    const btn = bar.querySelector('.kb-jump__btn'), menu = bar.querySelector('.kb-jump__menu');
    if (btn) {
      btn.addEventListener('click', e => { e.stopPropagation(); const open = menu.hidden; menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); });
      menu.addEventListener('click', () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); });
      document.addEventListener('click', () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); });
    }
    hydrateLucide(bar);
  }

  // ---------- TAB ROUTING ----------
  // #page or #page/anchor (anchor = an element id inside that page)
  function parseHash() {
    const h = location.hash.replace('#', '');
    const i = h.indexOf('/');
    const p = i < 0 ? h : h.slice(0, i), a = i < 0 ? '' : h.slice(i + 1);
    return { page: pages.includes(p) ? p : 'overview', anchor: a };
  }
  function currentTab() { return parseHash().page; }
  let shown = null;
  function showTab(name, anchor) {
    let justRenderedEl = null;
    pages.forEach(p => {
      const el = document.getElementById('page-' + p);
      el.hidden = (p !== name);
      if (p === name && !el.dataset.rendered) { renderPage(p); justRenderedEl = el; }
    });
    const anchoredHit = [...document.querySelectorAll('.kb-nav a[data-anchor]')].some(t => t.dataset.tab === name && t.dataset.anchor === anchor);
    document.querySelectorAll('.kb-nav a').forEach(t => {
      let on;
      if (t.dataset.group) on = t.dataset.group.split(' ').includes(name);
      else if (t.dataset.anchor) on = t.dataset.tab === name && t.dataset.anchor === anchor;
      else on = t.dataset.tab === name && !anchoredHit;
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    if (justRenderedEl) hydrateLucide(justRenderedEl);
    const el = document.getElementById('page-' + name);
    if (shown !== name) { drawBar(name, el); document.title = (name === 'overview' ? '' : (LABELS[name] || name) + ' · ') + 'Kilowott brand kit'; }
    shown = name;
    closeMenu();
    const target = anchor && document.getElementById(anchor);
    if (target) {
      const off = (bar && !bar.hidden ? bar.offsetHeight : 0) + (window.innerWidth < 1024 ? 56 : 0) + 16;
      setTimeout(() => window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - off), 30);
    } else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', () => { const r = parseHash(); showTab(r.page, r.anchor); });
  { const r = parseHash(); showTab(r.page, r.anchor); }

  // ---------- LUCIDE HYDRATE (sidebar chrome + any rendered page) ----------
  hydrateLucide();
  // Retry if Lucide hasn't loaded yet
  if (!window.lucide) {
    const iv = setInterval(() => {
      if (window.lucide) { hydrateLucide(); clearInterval(iv); }
    }, 120);
    setTimeout(() => clearInterval(iv), 5000);
  }

  // ---------- SEARCH (⌘K / Ctrl+K / "/") ----------
  // Indexes every tab plus every section heading inside it. Pages render
  // lazily, so the first open renders the rest of the kit in the background.
  const search = (function () {
    const wrap = document.createElement('div');
    wrap.className = 'ksearch'; wrap.hidden = true;
    wrap.innerHTML =
      '<div class="ksearch__scrim" data-ks-close></div>' +
      '<div class="ksearch__panel" role="dialog" aria-modal="true" aria-label="Search the brand kit">' +
        '<div class="ksearch__bar"><i data-lucide="search"></i>' +
        '<input class="ksearch__input" type="search" placeholder="Search pages, sections, tokens…" aria-label="Search" autocomplete="off" spellcheck="false">' +
        '<kbd>esc</kbd></div>' +
        '<ul class="ksearch__list" role="listbox"></ul>' +
        '<div class="ksearch__foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span>Agents: see <a href="../AGENTS.md">AGENTS.md</a></span></div>' +
      '</div>';
    document.body.appendChild(wrap);
    const input = wrap.querySelector('.ksearch__input');
    const list = wrap.querySelector('.ksearch__list');
    let items = [], shown = [], active = 0, built = false;

    function build() {
      if (built) return; built = true;
      items = [];
      pages.forEach(p => {
        const inf = INFO[p] || {};
        items.push({ page: p, title: LABELS[p] || p, sub: (inf.group || '') + (inf.desc ? ' · ' + inf.desc : ''), el: null });
        const el = renderPage(p);
        if (!el) return;
        el.querySelectorAll('h1, h2, .section-head__title').forEach(h => {
          const t = (h.textContent || '').replace(/\s+/g, ' ').trim();
          if (t && t.length < 120 && !items.some(i => i.page === p && i.title === t)) {
            items.push({ page: p, title: t, sub: LABELS[p] || p, el: h });
          }
        });
      });
      hydrateLucide();
    }
    function score(item, q) {
      const t = item.title.toLowerCase(), s = item.sub.toLowerCase();
      if (t.startsWith(q)) return 3; if (t.includes(q)) return 2; if (s.includes(q)) return 1; return 0;
    }
    function draw() {
      const q = input.value.trim().toLowerCase();
      shown = q ? items.map(i => [score(i, q), i]).filter(x => x[0]).sort((a, b) => b[0] - a[0]).map(x => x[1]).slice(0, 40)
                : items.filter(i => !i.el);
      active = Math.min(active, Math.max(shown.length - 1, 0));
      list.innerHTML = shown.length ? shown.map((i, n) =>
        '<li role="option" class="ksearch__item' + (n === active ? ' is-active' : '') + '" data-n="' + n + '" aria-selected="' + (n === active) + '">' +
        '<b>' + i.title.replace(/</g, '&lt;') + '</b><span>' + i.sub.replace(/</g, '&lt;') + '</span></li>').join('')
        : '<li class="ksearch__empty">No matches. Try “red”, “logo”, “deck” or “button”.</li>';
      const a = list.querySelector('.is-active'); if (a) a.scrollIntoView({ block: 'nearest' });
    }
    function go(i) {
      if (!i) return;
      close();
      if (currentTab() !== i.page) location.hash = i.page; else showTab(i.page);
      if (i.el) setTimeout(() => i.el.scrollIntoView({ block: 'start' }), 60);
    }
    function open() {
      wrap.hidden = false; document.body.classList.add('ksearch-open');
      input.value = ''; active = 0;
      build(); draw(); input.focus();
    }
    function close() { wrap.hidden = true; document.body.classList.remove('ksearch-open'); }
    input.addEventListener('input', () => { active = 0; draw(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { active = Math.min(active + 1, shown.length - 1); draw(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { active = Math.max(active - 1, 0); draw(); e.preventDefault(); }
      else if (e.key === 'Enter') { go(shown[active]); e.preventDefault(); }
      else if (e.key === 'Escape') { close(); }
    });
    list.addEventListener('click', e => { const li = e.target.closest('[data-n]'); if (li) go(shown[+li.dataset.n]); });
    wrap.addEventListener('click', e => { if (e.target.hasAttribute('data-ks-close')) close(); });
    document.addEventListener('keydown', e => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '') || (e.target && e.target.isContentEditable);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); wrap.hidden ? open() : close(); }
      else if (e.key === 'Escape' && !wrap.hidden) close();
    });
    document.querySelectorAll('[data-kb-search]').forEach(b => b.addEventListener('click', open));
    return { open, close };
  })();
  window.__kitSearch = search;

  // ---------- TWEAKS ----------
  const TWEAKS_FONT_PAIRS = {
    editorial:    { display: '"Fraunces", serif',            sans: '"Inter Tight", sans-serif' },
    newsreader:   { display: '"Newsreader", serif',          sans: '"DM Sans", sans-serif' },
    playfair:     { display: '"Playfair Display", serif',    sans: '"Manrope", sans-serif' },
    cormorant:    { display: '"Cormorant Garamond", serif',  sans: '"Work Sans", sans-serif' },
    ebgaramond:   { display: '"EB Garamond", serif',         sans: '"Inter Tight", sans-serif' },
    librecaslon:  { display: '"Libre Caslon Text", serif',   sans: '"IBM Plex Sans", sans-serif' },
    instrument:   { display: '"Instrument Serif", serif',    sans: '"IBM Plex Sans", sans-serif' },
    technical:    { display: '"Space Grotesk", sans-serif',  sans: '"IBM Plex Sans", sans-serif' },
    // legacy alias
    classic:      { display: '"Instrument Serif", serif',    sans: '"IBM Plex Sans", sans-serif' },
  };
  const TWEAKS_DENSITY = { compact: 0.7, comfortable: 1, spacious: 1.3 };

  function applyTweaks(t) {
    const root = document.documentElement;
    // Accent
    root.style.setProperty('--accent', t.accent);
    // Theme
    root.dataset.theme = t.theme;
    // Font pair
    const pair = TWEAKS_FONT_PAIRS[t.fontPair] || TWEAKS_FONT_PAIRS.editorial;
    root.style.setProperty('--font-display', pair.display);
    root.style.setProperty('--font-sans', pair.sans);
    // Density
    root.style.setProperty('--density', TWEAKS_DENSITY[t.density] ?? 1);
    // Reflect pressed states
    document.querySelectorAll('[data-tweak-group]').forEach(grp => {
      const key = grp.dataset.tweakGroup;
      grp.querySelectorAll('[data-value]').forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.value === t[key] ? 'true' : 'false');
      });
    });
  }
  applyTweaks(window.__tweaks);

  function setTweak(key, value) {
    window.__tweaks[key] = value;
    applyTweaks(window.__tweaks);
    try {
      window.parent.postMessage({
        type: '__edit_mode_set_keys',
        edits: { [key]: value }
      }, '*');
    } catch (e) {}
  }
  window.__setTweak = setTweak;

  document.querySelectorAll('[data-tweak-group]').forEach(grp => {
    grp.addEventListener('click', e => {
      const btn = e.target.closest('[data-value]');
      if (!btn) return;
      setTweak(grp.dataset.tweakGroup, btn.dataset.value);
    });
  });

  // ---------- EDIT-MODE PROTOCOL ----------
  const panel = document.getElementById('tweaks');
  const hint  = document.getElementById('tweaks-hint');
  let editMode = false;

  function showPanel() {
    panel.hidden = false;
    panel.classList.add('is-open');
    hint.classList.remove('is-visible');
  }
  function hidePanel() {
    panel.classList.remove('is-open');
    hint.classList.add('is-visible');
  }
  function closeAll() {
    panel.hidden = true;
    panel.classList.remove('is-open');
    hint.classList.remove('is-visible');
  }

  // Register message handler BEFORE announcing availability
  window.addEventListener('message', e => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') {
      editMode = true;
      showPanel();
    } else if (d.type === '__deactivate_edit_mode') {
      editMode = false;
      closeAll();
    }
  });

  document.getElementById('tweaks-close').addEventListener('click', hidePanel);
  hint.addEventListener('click', showPanel);

  // Announce
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (e) {}
})();
