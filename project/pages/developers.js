/* ============================================================
   DEVELOPERS & AI — how to get the brand into code and AI tools.
   Mirrors AGENTS.md §5 (tokens by format) and §7 (starter page).
   ============================================================ */

window.renderDevelopers = function (root) {
  const SITE = 'https://brandkit.kilowott.com';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const ROWS = [
    ['Plain HTML or any framework', `<link rel="stylesheet" href="${SITE}/project/kit/kilowott.css">`, 'Then use var(--bg), var(--fg), var(--accent), var(--s-5).'],
    ['Tailwind v3', `presets: [require('./tokens.tailwind.js')]`, 'Download kit/tokens.tailwind.js. Classes like bg-bg, text-fg, font-display, rounded-pill.'],
    ['Tailwind v4', `@import "tailwindcss";\n@import "${SITE}/project/kit/kilowott.css";\n@import "${SITE}/project/kit/tokens.tailwind.css";`, 'Or copy both files into your project.'],
    ['Sass', `@use "tokens";`, 'With kit/tokens.scss: $k-ink, $bg, $s-5, and theme maps.'],
    ['Design-token tools', `fetch('${SITE}/tokens.json')`, 'W3C DTCG format; dark overrides under theme.dark.'],
    ['Figma', 'Tokens Studio → import kit/figma-tokens.json', 'Swatches via downloads/kilowott-colors.ase.'],
    ['Dark theme', `<html data-theme="dark">`, 'Or wrap a band in .section--ink. Light is the default.'],
  ];
  const PROMPT = `Read ${SITE}/AGENTS.md first and follow it.\nBuild [what you need] for Kilowott.\nLink ${SITE}/project/kit/kilowott.css, use tokens not hex,\none red moment, and run the checklist in AGENTS.md §9 before you finish.`;

  root.innerHTML = `
  <style>
    .dv-hero { padding: var(--s-8) 0 var(--s-6); }
    .dv-hero h1 { font-family: var(--font-display); font-weight: 400; font-size: var(--fs-d3); letter-spacing: -0.02em; line-height: 1.05; margin: var(--s-4) 0 var(--s-3); }
    .dv-hero p { color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; max-width: 62ch; margin: 0; }
    .dv-hero .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: var(--s-5); }
    .dv-hero .btn .lucide { width: 16px; height: 16px; }
    .dv-sec { padding: var(--s-7) 0; border-top: 1px solid var(--rule); }
    .dv-sec h2 { font-family: var(--font-display); font-weight: 400; font-size: 1.75rem; letter-spacing: -0.015em; margin: 0 0 6px; }
    .dv-sec > .container > p { color: var(--fg-2); margin: 0 0 var(--s-5); max-width: 64ch; }
    .dv-table { width: 100%; border-collapse: collapse; font-size: var(--fs-sm); }
    .dv-table th, .dv-table td { text-align: left; vertical-align: top; padding: 14px 16px 14px 0; border-top: 1px solid var(--rule); }
    .dv-table th { width: 200px; font-weight: 500; }
    .dv-table td:last-child { color: var(--fg-2); }
    .dv-code { display: block; white-space: pre-wrap; word-break: break-word; font-family: var(--font-mono); font-size: 12px; line-height: 1.6;
      background: var(--bg-2); border: 1px solid var(--rule); border-radius: var(--r-2); padding: 8px 12px; color: var(--fg); }
    .dv-prompt { position: relative; background: var(--k-ink); color: var(--k-paper); border-radius: var(--r-3); padding: 20px 24px; font-family: var(--font-mono); font-size: 13px; line-height: 1.7; white-space: pre-wrap; max-width: 760px; }
    .dv-copy { margin-top: 12px; }
    .dv-copy .lucide { width: 14px; height: 14px; }
    .dv-files { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .dv-file { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 20px; display: flex; flex-direction: column; gap: 6px; }
    .dv-file b { font-weight: 500; }
    .dv-file p { margin: 0; font-size: 13px; color: var(--fg-2); line-height: 1.5; flex: 1; }
    .dv-file a { color: var(--link); font-size: 13px; margin-top: 6px; }
    @media (max-width: 900px) { .dv-files { grid-template-columns: minmax(0, 1fr); } .dv-table th { width: auto; } .dv-table, .dv-table tbody, .dv-table tr, .dv-table th, .dv-table td { display: block; } .dv-table td { padding-top: 0; border-top: 0; } }
  </style>

  <section class="dv-hero">
    <div class="container">
      <span class="eyebrow">Build for web</span>
      <h1>Developers &amp; AI</h1>
      <p>One stylesheet makes any web page on-brand. One file teaches any AI tool the rules. Everything here is generated from the same tokens, so it stays in step with the rest of the kit.</p>
      <div class="actions">
        <a class="btn btn--primary" href="kit/kilowott.css" download><i data-lucide="download"></i>kilowott.css</a>
        <a class="btn" href="kit/starter/index.html"><i data-lucide="layout-template"></i>Starter page</a>
        <a class="btn" href="../AGENTS.md"><i data-lucide="bot"></i>AGENTS.md</a>
      </div>
    </div>
  </section>

  <section class="dv-sec">
    <div class="container">
      <h2>Using an AI tool</h2>
      <p>Claude, ChatGPT, Cursor, v0, Lovable, and Bolt all do better when they read the rules first. Paste this at the start of your request.</p>
      <div class="dv-prompt" id="dv-prompt">${esc(PROMPT)}</div>
      <button class="btn btn--sm dv-copy" type="button" id="dv-copy"><i data-lucide="copy"></i><span>Copy prompt</span></button>
    </div>
  </section>

  <section class="dv-sec">
    <div class="container">
      <h2>Get the tokens in your format</h2>
      <p>Colours, type, spacing, radii, shadows, and motion, in whatever your stack reads.</p>
      <table class="dv-table"><tbody>
        ${ROWS.map(r => `<tr><th>${r[0]}</th><td><code class="dv-code">${esc(r[1])}</code></td><td>${r[2]}</td></tr>`).join('')}
      </tbody></table>
    </div>
  </section>

  <section class="dv-sec">
    <div class="container">
      <h2>Machine-readable files</h2>
      <p>For agents, scripts, and design-token pipelines.</p>
      <div class="dv-files">
        <div class="dv-file"><b>AGENTS.md</b><p>The brand in 60 seconds, hard rules, what to read for each task, and a starter page.</p><a href="../AGENTS.md">Open</a></div>
        <div class="dv-file"><b>llms-full.txt</b><p>AGENTS.md, the brand reference, and the build spec in one file.</p><a href="../llms-full.txt">Open</a></div>
        <div class="dv-file"><b>llms.txt</b><p>Build spec: render recipe, common mistakes, specs per surface.</p><a href="llms.txt">Open</a></div>
        <div class="dv-file"><b>brand.json</b><p>Rules, logo, real company facts, fictional demo content, resolved tokens.</p><a href="brand.json">Open</a></div>
        <div class="dv-file"><b>tokens.json</b><p>W3C design tokens with light and dark themes.</p><a href="../tokens.json">Open</a></div>
        <div class="dv-file"><b>manifest.json</b><p>Every page of the kit with its purpose and source file.</p><a href="../manifest.json">Open</a></div>
      </div>
    </div>
  </section>
  `;
  const btn = root.querySelector('#dv-copy');
  btn.addEventListener('click', () => {
    const done = () => { btn.querySelector('span').textContent = 'Copied'; setTimeout(() => { btn.querySelector('span').textContent = 'Copy prompt'; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(PROMPT).then(done, done); else done();
  });
};
