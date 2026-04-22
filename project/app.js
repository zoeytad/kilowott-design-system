/* ============================================================
   APP LOGIC — tabs, tweaks, render
   ============================================================ */

(function () {
  const pages = ['overview','logo','color','type','foundations','icons','components','landing','dashboards','deck','email','case-study','imagery','voice','social'];
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
    'case-study':  window.renderCaseStudy,
    imagery:       window.renderImagery,
    voice:         window.renderVoice,
    social:        window.renderSocial,
  };
  // Friendly labels for the topbar "you are here" indicator + categories
  const LABELS = {
    overview: 'Overview', logo: 'Logo', color: 'Color', type: 'Type',
    foundations: 'Foundations', icons: 'Icons', components: 'Components',
    landing: 'Landing', dashboards: 'Dashboards', deck: 'Deck',
    email: 'Email', 'case-study': 'Case study', imagery: 'Imagery',
    voice: 'Voice', social: 'Social',
  };
  const CATEGORIES = {
    overview: 'Brand', logo: 'Brand', color: 'Brand', type: 'Brand',
    voice: 'Brand', imagery: 'Brand',
    foundations: 'System', icons: 'System', components: 'System', dashboards: 'System',
    landing: 'Templates', deck: 'Templates', email: 'Templates',
    'case-study': 'Templates', social: 'Templates',
  };

  // ---------- DRAWER refs (declared early — closeDrawer runs inside showTab below) ----------
  const drawer = document.getElementById('drawer');
  const drawerScrim = document.getElementById('drawer-scrim');
  const drawerClose = document.getElementById('drawer-close');
  const menuBtn = document.getElementById('topbar-menu');

  // ---------- TAB ROUTING ----------
  function currentTab() {
    const h = location.hash.replace('#','');
    return pages.includes(h) ? h : 'overview';
  }
  function showTab(name) {
    pages.forEach(p => {
      const el = document.getElementById('page-' + p);
      el.hidden = (p !== name);
      if (p === name && !el.dataset.rendered) {
        if (renderers[p]) renderers[p](el);
        el.dataset.rendered = '1';
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

  // ---------- LUCIDE HYDRATE (topbar + drawer chrome) ----------
  function hydrateLucide() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: document.body }); } catch (e) {}
    }
  }
  hydrateLucide();
  // Retry if Lucide hasn't loaded yet
  if (!window.lucide) {
    const iv = setInterval(() => {
      if (window.lucide) { hydrateLucide(); clearInterval(iv); }
    }, 120);
    setTimeout(() => clearInterval(iv), 5000);
  }

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
