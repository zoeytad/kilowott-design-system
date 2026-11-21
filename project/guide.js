/* ============================================================
   RULES AT A GLANCE — one short do / never box under every page hero,
   plus that page's files. Edit the copy here; app.js injects it.
   Keep each list to three or four lines. Facts come from AGENTS.md
   and project/llms.txt, so update those too if a rule changes.
   ============================================================ */
(function () {
  'use strict';
  const D = 'downloads/', K = 'kit/';
  const F = {
    logoSvg:  { t: 'Wordmark · SVG', h: D + 'kilowott-logo.svg' },
    bolt:     { t: 'Bolt mark · JPG', h: 'assets/kilowott-bolt.jpg' },
    ase:      { t: 'Swatches · ASE', h: D + 'kilowott-colors.ase' },
    gpl:      { t: 'Palette · GPL', h: D + 'kilowott-colors.gpl' },
    colJson:  { t: 'Colours · JSON', h: D + 'kilowott-colors.json' },
    pptx:     { t: 'Deck template · PPTX', h: D + 'kilowott-deck-template.pptx' },
    css:      { t: 'kilowott.css', h: K + 'kilowott.css' },
    starter:  { t: 'Starter page · HTML', h: K + 'starter/index.html' },
    tokens:   { t: 'tokens.json', h: '../tokens.json' },
  };

  const RULES = {
    logo: { files: ['logoSvg', 'bolt'],
      do: ['Use the supplied files: navy on light grounds, white on dark.',
           'Leave clear space equal to the height of the K on every side.',
           'Keep it at least 80 px wide on screen or 20 mm in print. Smaller than that, use the bolt.',
           'Place it bottom-left. With a button: logo left, button right, on one line.'],
      no: ['Redraw it, type it out, or rebuild it in a font.',
           'Stretch, rotate, outline, or add a shadow.',
           'Colour it anything other than navy (on light) or white (on dark).',
           'Stack it on a button or drop it onto a busy photo.'] },
    color: { files: ['ase', 'gpl', 'colJson'],
      do: ['Paper first: 60 paper, 30 ink, 5 warm paper, 5 red.',
           'One red moment per surface: the italic word, one stat, the main button, or a thin rule.',
           'Small red text (links, labels) uses red-ink #8A021B, not brand red.'],
      no: ['Red body text, red backgrounds, or red gradients.',
           'Red next to another saturated colour.',
           'Success, warning, or info colours in marketing. They are for product UI only.'] },
    type: {
      do: ['Newsreader for headlines, weight 400, tight tracking.',
           'DM Sans for body text and buttons; JetBrains Mono for labels and numbers.',
           'At most one italic phrase per headline. On the surface, that phrase is the red moment.'],
      no: ['Any other font family.',
           'Bold serif headlines or all-caps headlines.',
           'Italic body text, or more than one emphasis per headline.'] },
    imagery: {
      do: ['Real photography of real people and places.',
           'Warm, natural grading with space left for type.',
           'Photos from assets/photos are cleared for kit use.'],
      no: ['AI-generated images in external work.',
           'Stock clichés: handshakes, hard hats, people lined up against a wall.',
           'Redistributing the licensed originals in uploads/.'] },
    voice: {
      do: ['Lead with the outcome. Be specific and confident.',
           'Sentence case, Oxford comma, curly quotes.',
           'Every number has a source and a time window.'],
      no: ['Exclamation marks.',
           'Leverage, empower, unlock, seamless, end-to-end, world-class, and the rest of the banned list.',
           'Claims you can’t back with a number or an example.'] },
    social: {
      do: ['One idea per post. If it needs two, make a carousel.',
           'Open with the outcome in the first line: it’s all people see before “…more”.',
           'Every number has a source and a time window.',
           'Write alt text for every image; caption every video.'],
      no: ['Emoji, exclamation marks, or hashtag walls (three at most).',
           'Two red moments on one image.',
           'Real client names, numbers, or quotes without written sign-off.',
           'Stock photos of people. Use real team photography.'] },
    posters: {
      do: ['Pick one archetype: Statement, Stat, Photo-led, or Event.',
           'Logo bottom-left; with a button, logo left and button right on one line.',
           'Use the editor at the bottom of the page to export PNG or print PDF.'],
      no: ['More than one message per poster.',
           'Two red moments, e.g. a red headline word and a red button.',
           'Type inside the bleed or the platform’s safe zones.'] },
    deck: { files: ['pptx'],
      do: ['Start from the PowerPoint template: 1920 × 1080, 56 px margins.',
           'Logo top-left; page number bottom-right.',
           'One red moment per slide; dark slides only for section breaks.'],
      no: ['Bullet-point walls. One idea per slide.',
           'Headlines longer than 14 words.',
           'Real client logos on demo slides.'] },
    email: {
      do: ['600 px single column, built with tables and inline styles.',
           'One headline, one button, one call to action.',
           'Preheader of 40–90 characters; subject under 55.'],
      no: ['CSS variables or external stylesheets. Email needs hex values.',
           'Emoji in transactional mail.',
           'Sending without a plain-text version, unsubscribe link, and postal address.'] },
    newsletter: {
      do: ['Build in the composer, then copy the Gmail-safe HTML.',
           'Three or four stories of 60–100 words each.',
           'Preheader of 40–90 characters.'],
      no: ['Pasting HTML into Gmail from anywhere else.',
           'More than one accent button.',
           'Images without alt text.'] },
    signature: {
      do: ['Fill in the form, copy, and paste into Gmail Settings → Signature.',
           'Use a square photo of at least 144 px.',
           'Use the company phone line and kilowott.com.'],
      no: ['Personal booking links (HubSpot, Calendly).',
           'Layouts other than the three in the generator.',
           'Tracking pixels.'] },
    stationery: { files: ['ase'],
      do: ['Print red as CMYK 0/100/87/5 (nearest Pantone 186 C).',
           'Uncoated stock; 3 mm bleed.',
           'Use the sender’s real office address.'],
      no: ['Foil or spot UV. Deboss the bolt instead.',
           'Screen RGB values in print files.',
           'Body type under 8 pt.'] },
    'case-study': {
      do: ['Situation → decision → result, in 600–900 words.',
           'Name the sector, region, and model; every stat has a source and window.',
           'Include what didn’t work.'],
      no: ['Real client details in demos. Use Nordhavn Coffee.',
           'Ending on “get in touch”.',
           'Stats without a time window.'] },
    magazine: {
      do: ['A4 trim, 3 mm bleed, two-column grid.',
           'Photo on the left page, type on the right.',
           'Real people and numbers only in live issues.'],
      no: ['Mixing registers within one issue.',
           'Body type outside 9–10 pt.',
           'Fictional people presented as real in a live issue.'] },
    foundations: { files: ['css', 'tokens'],
      do: ['Use tokens: var(--bg), var(--fg), var(--s-5), and so on.',
           '8 pt spacing, 1280 px container, 96 px between sections.',
           'Light theme by default; dark for breaks or on request.'],
      no: ['Raw hex in web code (email, print, and swatches excepted).',
           'Off-scale spacing values.',
           'Shadows on everything. Most cards need only a 1 px rule.'] },
    components: { files: ['css'],
      do: ['Check this page before inventing a component.',
           'Pill buttons; one accent per view.',
           'Visible focus: 2 px accent ring at 3 px offset.'],
      no: ['Two red buttons in one view.',
           'Removing focus outlines.',
           'Typing the logo as text in a nav. Use the SVG.'] },
    icons: {
      do: ['Lucide only, 1.5 px stroke, currentColor.',
           'Pair an icon with a word for anything that matters.',
           'Same size within a row.'],
      no: ['Mixing icon sets.',
           'Filled or duotone icons.',
           'Stroke widths other than 1.5 px.'] },
    landing: { files: ['starter', 'css'],
      do: ['Clone the starter page and link kilowott.css.',
           'Hero headline of 4–9 words; lede of 40 words or fewer.',
           'Pair every claim with proof.'],
      no: ['A red button and a red headline word together.',
           'Dark pages by default.',
           'Gradients, glows, or neon.'] },
    dashboards: { files: ['css'],
      do: ['One serif number per tile, with a time window.',
           'Tabular numerals; right-align numbers in columns.',
           'Positive changes in ink, not green.'],
      no: ['Red for anything except losses and alerts.',
           'State colours without an icon and a word.',
           'Left-aligned numbers in table columns.'] },
  };

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  function html(id) {
    const r = RULES[id]; if (!r) return '';
    const files = (r.files || []).map(k => F[k]).filter(Boolean);
    return '<section class="kb-guide" aria-label="Rules at a glance"><div class="container">' +
      '<div class="kb-guide__head"><h2>Rules at a glance</h2>' +
      (files.length ? '<div class="kb-guide__files">' + files.map(f => '<a class="btn btn--sm" href="' + f.h + '" download><i data-lucide="download"></i>' + esc(f.t) + '</a>').join('') + '</div>' : '') +
      '</div><div class="kb-guide__grid">' +
      '<div class="kb-guide__col kb-guide__col--do"><h2><i data-lucide="circle-check"></i>Do</h2><ul>' + r.do.map(x => '<li><i data-lucide="check"></i><span>' + esc(x) + '</span></li>').join('') + '</ul></div>' +
      '<div class="kb-guide__col kb-guide__col--no"><h2><i data-lucide="circle-x"></i>Never</h2><ul>' + r.no.map(x => '<li><i data-lucide="x"></i><span>' + esc(x) + '</span></li>').join('') + '</ul></div>' +
      '</div></div></section>';
  }
  function inject(id, root) {
    if (!RULES[id] || root.querySelector('.kb-guide')) return;
    const hero = root.querySelector('section');
    if (hero) hero.insertAdjacentHTML('afterend', html(id));
    else root.insertAdjacentHTML('afterbegin', html(id));
  }
  window.KWGuide = { RULES, FILES: F, inject };
})();
