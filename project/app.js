/* ============================================================
   APP LOGIC — tabs, tweaks, render
   ============================================================ */

(function () {
  const pages = ['overview','logo','color','type','foundations','icons','components','landing','dashboards','deck','email','signature','newsletter','stationery','case-study','magazine','imagery','voice','social','posters'];
  const renderers = {
    overview:      window.renderOverview,
    logo:          window.renderLogo,
    color:         window.renderColor,
    type:          window.renderType,
    foundations:   window.renderFoundations,
    icons:         window.renderIcons,
    components:    window.renderComponents,
    landing:       window.renderLanding,
    dashboards:    window.renderDashboards,
    deck:          window.renderDeck,
    email:         window.renderEmail,
    signature:     window.renderSignature,
    newsletter:    window.renderNewsletter,
    stationery:    window.renderStationery,
    'case-study':  window.renderCaseStudy,
    magazine:      window.renderMagazine,
    imagery:       window.renderImagery,
    voice:         window.renderVoice,
    social:        window.renderSocial,
    posters:       window.renderPosters,
  };
  // Friendly labels for the topbar "you are here" indicator + categories
  const LABELS = {
    overview: 'Overview', logo: 'Logo', color: 'Color', type: 'Type',
    foundations: 'Foundations', icons: 'Icons', components: 'Components',
    landing: 'Landing', dashboards: 'Dashboards', deck: 'Deck',
    email: 'Email', signature: 'Signature', newsletter: 'Newsletter', stationery: 'Stationery', 'case-study': 'Case study', magazine: 'Magazine', imagery: 'Imagery',
    voice: 'Voice', social: 'Social', posters: 'Posters & banners',
  };
  const CATEGORIES = {
    overview: 'Brand', logo: 'Brand', color: 'Brand', type: 'Brand',
    voice: 'Brand', imagery: 'Brand',
    foundations: 'System', icons: 'System', components: 'System',
    landing: 'Surfaces', dashboards: 'Surfaces', deck: 'Surfaces',
    'case-study': 'Surfaces', magazine: 'Surfaces', social: 'Surfaces', posters: 'Surfaces',
    email: 'Communications', signature: 'Communications',
    newsletter: 'Communications', stationery: 'Communications',
  };

  // ---------- DRAWER refs (declared early — closeDrawer runs inside showTab below) ----------
  const drawer = document.getElementById('drawer');
  const drawerScrim = document.getElementById('drawer-scrim');
  const drawerClose = document.getElementById('drawer-close');
  const menuBtn = document.getElementById('topbar-menu');

  // ---------- LUCIDE HYDRATE helper (hoisted up for showTab) ----------
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
  // clicking one empties the hash and the router jumps back to Overview.
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href="#"]');
    if (a) e.preventDefault();
  });

  // ---------- TAB ROUTING ----------
  function currentTab() {
    const h = location.hash.replace('#','');
    return pages.includes(h) ? h : 'overview';
  }
  function showTab(name) {
    let justRenderedEl = null;
    pages.forEach(p => {
      const el = document.getElementById('page-' + p);
      el.hidden = (p !== name);
      if (p === name && !el.dataset.rendered) {
        renderPage(p);
        justRenderedEl = el;
      }
    });
    document.querySelectorAll('.tab').forEach(t => {
      t.setAttribute('aria-current', t.dataset.tab === name ? 'page' : 'false');
    });
    // Update "you are here" indicator in the topbar
    const here = document.getElementById('topbar-here');
    if (here) {
      const label = LABELS[name] || name;
      const cat = CATEGORIES[name] || '';
      here.innerHTML = cat ? (cat + '<b>' + label + '</b>') : ('<b>' + label + '</b>');
    }
    // Hydrate any Lucide icons the renderer just injected
    if (justRenderedEl) hydrateLucide(justRenderedEl);
    // Close drawer if open
    closeDrawer();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', () => showTab(currentTab()));
  showTab(currentTab());

  // ---------- DRAWER ----------
  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    // next frame so transition runs
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    document.body.classList.add('drawer-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    document.body.classList.remove('drawer-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    // hide after transition
    setTimeout(() => { if (!drawer.classList.contains('is-open')) drawer.hidden = true; }, 300);
  }
  if (menuBtn) menuBtn.addEventListener('click', () => {
    if (drawer && drawer.classList.contains('is-open')) closeDrawer(); else openDrawer();
  });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerScrim) drawerScrim.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeDrawer();
  });

  // ---------- LUCIDE HYDRATE (topbar + drawer chrome + any rendered page) ----------
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
        const link = document.querySelector('.drawer__link[data-tab="' + p + '"] span');
        items.push({ page: p, title: LABELS[p] || p, sub: (CATEGORIES[p] || '') + (link ? ' · ' + link.textContent : ''), el: null });
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
    const btn = document.getElementById('topbar-search');
    if (btn) btn.addEventListener('click', open);
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
