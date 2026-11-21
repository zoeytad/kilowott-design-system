/* ============================================================
   DOWNLOADS — every file in the kit, grouped by what it's for.
   Paths are relative to /project/. Generated files (kit/*, tokens.json,
   colour swatches) come from `npm run build:tokens`.
   ============================================================ */

window.renderDownloads = function (root) {
  const G = [
    { h: 'Logo', p: 'Use the SVG wherever you can. The bolt mark is for avatars and spaces under 80 px.', items: [
      ['SVG', 'Wordmark, navy', 'The main logo. Vector. For paper and warm paper.', 'downloads/kilowott-logo.svg', 'badge'],
      ['SVG', 'Wordmark, white', 'Vector. For ink, red, and dark photos.', 'downloads/logo/kilowott-logo-white.svg', 'badge'],
      ['SVG', 'Wordmark, black', 'Vector. One-colour print only (stamps, fax, engraving).', 'downloads/logo/kilowott-logo-black.svg', 'badge'],
      ['PNG', 'Wordmark, navy', '1200 px wide, transparent. Also 300, 600, 2400 in the zip.', 'downloads/logo/kilowott-logo-navy-1200.png', 'image'],
      ['PNG', 'Wordmark, white', '1200 px wide, transparent. Also 300, 600, 2400 in the zip.', 'downloads/logo/kilowott-logo-white-1200.png', 'image'],
      ['PDF', 'Wordmark, navy', 'Vector PDF for print and Office documents.', 'downloads/logo/kilowott-logo-navy.pdf', 'file-text'],
      ['ZIP', 'Logo pack', 'Every logo file: SVG, PDF, PNG in four sizes, two link-preview cards.', 'downloads/kilowott-logo-pack.zip', 'package'],
      ['JPG', 'Bolt mark', '100 × 100 px. There is no vector bolt yet.', 'assets/kilowott-bolt.jpg', 'zap'] ] },
    { h: 'Colour', p: 'The same palette in the format your tool reads.', items: [
      ['ASE', 'Adobe swatches', 'Illustrator, InDesign, Photoshop.', 'downloads/kilowott-colors.ase', 'palette'],
      ['GPL', 'GIMP / Inkscape palette', 'Also works in Krita.', 'downloads/kilowott-colors.gpl', 'palette'],
      ['JSON', 'Colour list', 'Hex, RGB, and role for every colour.', 'downloads/kilowott-colors.json', 'braces'] ] },
    { h: 'Templates', p: 'Start from these instead of a blank file.', items: [
      ['PPTX', 'Presentation template', '15 slide layouts for PowerPoint and Keynote.', 'downloads/kilowott-deck-template.pptx', 'presentation'],
      ['HTML', 'Starter web page', 'An on-brand landing page to copy.', 'kit/starter/index.html', 'layout-template'] ] },
    { h: 'Code and design tokens', p: 'For developers and design tools. All generated from one token file.', items: [
      ['CSS', 'kilowott.css', 'The one stylesheet: fonts, tokens, base styles.', 'kit/kilowott.css', 'code'],
      ['JS', 'Tailwind v3 preset', 'Brand tokens as a Tailwind preset.', 'kit/tokens.tailwind.js', 'code'],
      ['CSS', 'Tailwind v4 theme', 'The @theme block for Tailwind v4.', 'kit/tokens.tailwind.css', 'code'],
      ['SCSS', 'Sass variables', 'Variables and light / dark theme maps.', 'kit/tokens.scss', 'code'],
      ['JSON', 'Design tokens', 'W3C format, for Style Dictionary and similar tools.', '../tokens.json', 'braces'],
      ['JSON', 'Figma tokens', 'Import with Tokens Studio.', 'kit/figma-tokens.json', 'figma'] ] },
    { h: 'For AI tools', p: 'Give these to Claude, ChatGPT, Cursor, v0, or Lovable before asking for anything on-brand.', items: [
      ['MD', 'AGENTS.md', 'Start here: rules, decision table, files, starter page.', '../AGENTS.md', 'bot'],
      ['TXT', 'llms-full.txt', 'The whole kit in one plain-text file.', '../llms-full.txt', 'file-text'],
      ['JSON', 'brand.json', 'Rules, facts, and resolved tokens in one file.', 'brand.json', 'braces'] ] },
  ];

  root.innerHTML = `
  <style>
    .dl-hero { padding: var(--s-8) 0 var(--s-6); border-bottom: 1px solid var(--rule); }
    .dl-hero h1 { font-family: var(--font-display); font-weight: 400; font-size: var(--fs-d3); letter-spacing: -0.02em; line-height: 1.05; margin: var(--s-4) 0 var(--s-3); }
    .dl-hero p { color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; max-width: 60ch; margin: 0; }
    .dl-sec { padding: var(--s-7) 0; border-bottom: 1px solid var(--rule); }
    .dl-sec:last-child { border-bottom: 0; }
    .dl-sec h2 { font-family: var(--font-display); font-weight: 400; font-size: 1.5rem; letter-spacing: -0.01em; margin: 0 0 4px; }
    .dl-sec > .container > p { color: var(--fg-2); margin: 0 0 var(--s-5); font-size: var(--fs-sm); }
    .dl-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .dl-card { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 20px; display: flex; flex-direction: column; gap: 8px; background: var(--bg); }
    .dl-card__top { display: flex; align-items: center; justify-content: space-between; }
    .dl-card__top .lucide { width: 20px; height: 20px; stroke-width: 1.5; color: var(--fg-2); }
    .dl-fmt { font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; padding: 3px 8px; border-radius: var(--r-pill); background: var(--bg-2); border: 1px solid var(--rule); color: var(--fg-2); }
    .dl-card b { font-weight: 500; }
    .dl-card p { margin: 0; font-size: 13px; color: var(--fg-2); line-height: 1.5; flex: 1; }
    .dl-card .btn { align-self: flex-start; margin-top: 8px; }
    .dl-card .btn .lucide { width: 14px; height: 14px; }
    @media (max-width: 1100px) { .dl-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 640px) { .dl-grid { grid-template-columns: minmax(0, 1fr); } }
  </style>
  <section class="dl-hero">
    <div class="container">
      <span class="eyebrow">Start</span>
      <h1>Downloads</h1>
      <p>Every file in the kit, in one place. Pick the format your tool uses.</p>
    </div>
  </section>
  ${G.map(g => `
  <section class="dl-sec">
    <div class="container">
      <h2>${g.h}</h2>
      <p>${g.p}</p>
      <div class="dl-grid">${g.items.map(x => `
        <div class="dl-card">
          <div class="dl-card__top"><span class="dl-fmt">${x[0]}</span><i data-lucide="${x[4]}"></i></div>
          <b>${x[1]}</b><p>${x[2]}</p>
          <a class="btn btn--sm" href="${x[3]}" download><i data-lucide="download"></i>Download</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`).join('')}
  `;
};
