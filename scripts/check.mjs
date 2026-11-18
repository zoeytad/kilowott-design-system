#!/usr/bin/env node
// Kilowott brand kit — repo checks. `npm run check`. No dependencies, Node >= 18.
//
//  1. JS syntax        node --check on every project/**/*.js and scripts/**/*.mjs
//  2. Generated files  tokens.json, kit/*, llms-full.txt, token blocks… match a fresh in-memory build
//  3. Contrast         A11Y_PAIRS in project/pages/color.js + "N:1 on paper" claims in tokens.css
//  4. Router           manifest.json pages == app.js pages
//  5. Links            every local / brandkit.kilowott.com URL in the agent-facing docs exists
//  6. Escapes          no raw \NNN escapes in JS template strings or string literals
//  7. Versions         package.json / tokens.json / manifest.json / brand.json agree; no stale v0.x
//  8. Content          no personal booking links; no real client case studies in agent docs

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { buildAll, diffAgainstDisk, ROOT, BASE_URL } from './build-tokens.mjs';
import { contrast, isHex, normHex, makeResolver, parseTokensCss } from './lib/tokens.mjs';

const results = [];
const warnings = [];
const check = (name, fn) => {
  try {
    const problems = fn() || [];
    results.push({ name, problems });
  } catch (e) {
    results.push({ name, problems: [`crashed: ${e.message}`] });
  }
};
const rel = p => path.relative(ROOT, p).split(path.sep).join('/');
const read = r => fs.readFileSync(path.join(ROOT, r), 'utf8');
const exists = r => fs.existsSync(path.join(ROOT, r));

function walk(dir, test, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, test, out);
    else if (test(p)) out.push(p);
  }
  return out;
}

const projectJs = walk(path.join(ROOT, 'project'), p => p.endsWith('.js'));
const scriptJs = walk(path.join(ROOT, 'scripts'), p => /\.(m?js)$/.test(p));

// ------------------------------------------------------------
check('JS syntax (node --check)', () => {
  const problems = [];
  for (const f of [...projectJs, ...scriptJs]) {
    const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
    if (r.status !== 0) problems.push(`${rel(f)}: ${(r.stderr || '').trim().split('\n').slice(0, 5).join(' | ')}`);
  }
  return problems;
});

// ------------------------------------------------------------
check('Generated files in sync with tokens.css', () => {
  const { files } = buildAll();
  return diffAgainstDisk(files).map(f => `${f} is stale — run \`npm run build:tokens\``);
});

// ------------------------------------------------------------
const tokensCss = read('project/styles/tokens.css');
const { root: rootDecls, dark: darkDecls } = parseTokensCss(tokensCss);
const light = makeResolver(rootDecls);
const ALIASES = { warm: '--k-paper-2', 'warm paper': '--k-paper-2', white: '#FFFFFF' };

function resolveColour(v) {
  if (v == null) return null;
  const s = String(v).trim();
  if (isHex(s)) return normHex(s);
  const key = s.toLowerCase();
  if (ALIASES[key]) return resolveColour(ALIASES[key]);
  const varMatch = /^var\((--[a-z0-9-]+)\)$/i.exec(s);
  const candidates = varMatch ? [varMatch[1]] : [s, `--${key}`, `--k-${key}`, `--k-${key.replace(/[\s_]+/g, '-')}`];
  for (const c of candidates) {
    const r = light.get(c);
    if (r && isHex(r)) return normHex(r);
  }
  return null;
}

function extractArrayLiteral(src, startIdx) {
  let depth = 0, i = startIdx, quote = null;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === '\\') { i++; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '[') depth++;
    if (ch === ']') { depth--; if (depth === 0) return src.slice(startIdx, i + 1); }
  }
  throw new Error('unterminated array literal');
}

const passFlag = v => {
  if (typeof v === 'boolean') return v;
  if (v == null) return undefined;
  const s = String(v).toLowerCase();
  if (/fail|✗|no\b/.test(s)) return false;
  if (/pass|✓|yes\b|aa/.test(s)) return true;
  return undefined;
};
const claimedRatio = v => {
  if (v == null) return undefined;
  const m = /([\d.]+)/.exec(String(v));
  return m ? parseFloat(m[1]) : undefined;
};

check('Contrast: A11Y_PAIRS in project/pages/color.js', () => {
  const src = read('project/pages/color.js');
  const m = /(?:const|let|var)\s+A11Y_PAIRS\s*=\s*\[/.exec(src);
  if (!m) return ['project/pages/color.js has no `const A11Y_PAIRS = [...]` array yet (expected [{ fg, bg, label, … }])'];
  const literal = extractArrayLiteral(src, src.indexOf('[', m.index));
  let pairs;
  try { pairs = vm.runInNewContext('(' + literal + ')', {}, { timeout: 1000 }); }
  catch (e) { return [`A11Y_PAIRS is not a plain data literal: ${e.message}`]; }
  if (!Array.isArray(pairs) || !pairs.length) return ['A11Y_PAIRS is empty'];
  const problems = [];
  pairs.forEach((p, i) => {
    const label = p.label || (p.fgName && p.bgName ? `${p.fgName} on ${p.bgName}` : `#${i + 1}`);
    const fg = resolveColour(p.fg), bg = resolveColour(p.bg);
    if (!fg || !bg) { problems.push(`${label}: cannot resolve colour fg=${p.fg} bg=${p.bg}`); return; }
    const r = contrast(fg, bg);
    const claim = claimedRatio(p.ratio ?? p.claimed ?? p.contrast);
    if (claim !== undefined && Math.abs(claim - r) > 0.1) problems.push(`${label}: claims ${claim}:1 but ${fg} on ${bg} is ${r.toFixed(2)}:1`);
    const body = passFlag(p.body ?? p.aa ?? p.bodyAA ?? p.normal);
    if (body !== undefined && body !== (r >= 4.5)) problems.push(`${label}: body text marked ${body ? 'pass' : 'fail'} but ratio ${r.toFixed(2)}:1 ${r >= 4.5 ? 'passes' : 'fails'} 4.5:1`);
    const large = passFlag(p.large ?? p.largeAA);
    if (large !== undefined && large !== (r >= 3)) problems.push(`${label}: large text marked ${large ? 'pass' : 'fail'} but ratio ${r.toFixed(2)}:1 ${r >= 3 ? 'passes' : 'fails'} 3:1`);
    // A pair recommended for normal-size text must pass 4.5:1; "large/display only" pairs must pass 3:1.
    if (typeof p.use === 'string') {
      const largeOnly = /large|display|decorative|non-text/i.test(p.use);
      if (!largeOnly && r < 4.5) problems.push(`${label}: use "${p.use}" implies body-size text but ratio is ${r.toFixed(2)}:1 (< 4.5:1) — mark it large/display only`);
      if (largeOnly && r < 3) problems.push(`${label}: use "${p.use}" but ratio is ${r.toFixed(2)}:1 (< 3:1)`);
    }
  });
  return problems;
});

check('Contrast: "N:1 on paper" claims in tokens.css', () => {
  const problems = [];
  const paper = resolveColour('--k-paper');
  [...rootDecls, ...darkDecls].forEach(d => {
    const m = /([\d.]+):1 on paper/.exec(d.comment || '');
    if (!m || !isHex(d.value)) return;
    const r = contrast(normHex(d.value), paper);
    if (Math.abs(parseFloat(m[1]) - r) > 0.1) problems.push(`${d.name}: comment says ${m[1]}:1, actual ${r.toFixed(2)}:1`);
  });
  return problems;
});

// ------------------------------------------------------------
check('Router: manifest.json pages == app.js pages', () => {
  const app = read('project/app.js');
  const m = /const pages\s*=\s*\[([^\]]*)\]/.exec(app);
  if (!m) return ['project/app.js: cannot find `const pages = [...]`'];
  const appPages = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(x => x[1]);
  const manifest = JSON.parse(read('manifest.json'));
  const manPages = (manifest.pages || []).map(p => p.id);
  const problems = [];
  appPages.filter(p => !manPages.includes(p)).forEach(p => problems.push(`app.js tab "${p}" missing from manifest.json`));
  manPages.filter(p => !appPages.includes(p)).forEach(p => problems.push(`manifest.json page "${p}" not routed in app.js`));
  appPages.forEach(p => { if (!exists(`project/pages/${p}.js`)) problems.push(`project/pages/${p}.js does not exist`); });
  const html = read('project/index.html');
  appPages.forEach(p => { if (!html.includes(`id="page-${p}"`)) problems.push(`project/index.html has no #page-${p} container`); });
  return problems;
});

// ------------------------------------------------------------
const LINK_DOCS = [
  'llms.txt', 'project/llms.txt', 'AGENTS.md', 'README.md', 'KILOWOTT_BRAND.md', 'DEPLOY.md',
  'manifest.json', 'project/brand.json', 'project/kit/starter/index.html',
  ...fs.readdirSync(path.join(ROOT, 'prompts')).filter(f => f.endsWith('.md')).map(f => `prompts/${f}`),
].filter(exists);

function localTarget(p) {
  p = decodeURIComponent(p.split('#')[0].split('?')[0]).replace(/[.,;:]+$/, '');
  if (p === '' || p === '/') return true; // serve.json redirects / → /project/
  const clean = p.replace(/^\//, '');
  if (exists(clean) && fs.statSync(path.join(ROOT, clean)).isDirectory()) return true;
  return exists(clean);
}

check('Links: local and brandkit.kilowott.com URLs exist', () => {
  const problems = [];
  for (const doc of LINK_DOCS) {
    const text = read(doc);
    const dir = path.posix.dirname(doc);
    for (const m of text.matchAll(/https:\/\/brandkit\.kilowott\.com(\/[^\s)"'<>`\]*\\]*)?/g)) {
      const p = m[1] || '/';
      if (/[<{]/.test(p)) continue;
      if (!localTarget(p)) problems.push(`${doc}: ${m[0]} → not found in repo`);
    }
    const relLinks = [
      ...[...text.matchAll(/\]\(([^)\s]+)\)/g)].map(x => x[1]),
      ...(doc.endsWith('.html') ? [...text.matchAll(/(?:href|src)="([^"]+)"/g)].map(x => x[1]) : []),
    ];
    for (const l of relLinks) {
      if (/^(https?:|mailto:|tel:|#|data:|\/\/)/.test(l) || /[<{$]/.test(l)) continue;
      const target = l.startsWith('/') ? l : '/' + path.posix.normalize(path.posix.join(dir, l));
      if (!localTarget(target)) problems.push(`${doc}: relative link ${l} → not found`);
    }
  }
  return problems;
});

// ------------------------------------------------------------
// Scan JS for backslash-digit escapes inside string and template literals.
// (`\\201C` in source is fine; `\201C` is an octal escape: a SyntaxError in templates,
// silent corruption in sloppy-mode strings.)
function scanEscapes(src) {
  const hits = [];
  const n = src.length;
  const stack = []; // 'tpl' | 'brace'
  let i = 0, line = 1, prevSig = '';
  const esc = () => {
    const nx = src[i + 1], nx2 = src[i + 2];
    if (/[1-9]/.test(nx || '') || (nx === '0' && /[0-9]/.test(nx2 || ''))) hits.push({ line, text: src.slice(i, i + 6) });
    if (nx === '\n') line++;
    i += 2;
  };
  const templateBody = () => {
    while (i < n) {
      const ch = src[i];
      if (ch === '\\') { esc(); continue; }
      if (ch === '\n') { line++; i++; continue; }
      if (ch === '`') { i++; return; }
      if (ch === '$' && src[i + 1] === '{') { stack.push('tpl'); i += 2; return; }
      i++;
    }
  };
  const quoted = q => {
    i++;
    while (i < n) {
      const ch = src[i];
      if (ch === '\\') { esc(); continue; }
      if (ch === q) { i++; return; }
      if (ch === '\n') return;
      i++;
    }
  };
  while (i < n) {
    const ch = src[i];
    if (ch === '\n') { line++; i++; continue; }
    if (ch === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (ch === '/' && src[i + 1] === '*') {
      const e = src.indexOf('*/', i + 2), end = e < 0 ? n : e + 2;
      line += (src.slice(i, end).match(/\n/g) || []).length; i = end; continue;
    }
    if (ch === '"' || ch === "'") { quoted(ch); prevSig = 'a'; continue; }
    if (ch === '`') { i++; templateBody(); prevSig = 'a'; continue; }
    if (ch === '/' && (prevSig === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prevSig))) {
      i++;
      let inClass = false;
      while (i < n && src[i] !== '\n') {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === '[') inClass = true;
        else if (src[i] === ']') inClass = false;
        else if (src[i] === '/' && !inClass) { i++; break; }
        i++;
      }
      while (/[a-z]/i.test(src[i] || '')) i++;
      prevSig = 'a';
      continue;
    }
    if (ch === '{') { stack.push('brace'); prevSig = '{'; i++; continue; }
    if (ch === '}') {
      const top = stack.pop(); i++;
      if (top === 'tpl') { templateBody(); prevSig = 'a'; } else prevSig = '}';
      continue;
    }
    if (!/\s/.test(ch)) prevSig = ch;
    i++;
  }
  return hits;
}

check('Escapes: no raw \\NNN in JS strings / template strings', () => {
  const problems = [];
  for (const f of projectJs) {
    for (const h of scanEscapes(fs.readFileSync(f, 'utf8'))) problems.push(`${rel(f)}:${h.line} raw escape "${h.text}" — write \\\\${h.text.slice(1)} inside template strings`);
  }
  return problems;
});

// ------------------------------------------------------------
check('Versions agree (1.x everywhere)', () => {
  const problems = [];
  const pkg = JSON.parse(read('package.json')).version;
  const v = pkg.split('.').slice(0, 2).join('.');
  const tokens = JSON.parse(read('tokens.json'));
  const got = {
    'tokens.json': tokens.$extensions?.['com.kilowott']?.version,
    'manifest.json': JSON.parse(read('manifest.json')).version,
    'project/brand.json': JSON.parse(read('project/brand.json')).version,
  };
  Object.entries(got).forEach(([f, val]) => { if (val !== v) problems.push(`${f} version "${val}" ≠ package.json "${v}"`); });
  for (const doc of LINK_DOCS.filter(d => /\.(md|txt)$/.test(d))) {
    const m = /\bv0\.\d+\b/.exec(read(doc));
    if (m) problems.push(`${doc}: stale version "${m[0]}"`);
  }
  return problems;
});

// ------------------------------------------------------------
check('Content: dummy-data policy', () => {
  const problems = [];
  const everywhere = [/meetings\.hubspot\.com/i, /calendly\.com\//i];
  const agentDocsOnly = [/paul[\s-]?john/i, /big[\s-]?banyan/i, /noma[\s-]?norge/i, /showcar/i, /up\.railway\.app/i, /fabricated_names/i];
  const textFiles = [...LINK_DOCS, ...projectJs.map(rel), 'project/index.html', 'llms-full.txt'].filter(exists);
  for (const f of textFiles) {
    const t = read(f);
    everywhere.forEach(re => { if (re.test(t)) problems.push(`${f}: contains ${re} (personal booking links are not allowed)`); });
    const isAgentDoc = LINK_DOCS.includes(f) && f !== 'DEPLOY.md' || f === 'llms-full.txt';
    agentDocsOnly.forEach(re => {
      if (!re.test(t)) return;
      if (isAgentDoc) problems.push(`${f}: contains ${re} — demo content must be fictional / use brandkit.kilowott.com`);
      else if (!/railway/.test(String(re))) warnings.push(`${f}: contains ${re} (real third-party content in demo — replace with Nordhavn Coffee)`);
    });
  }
  return problems;
});

// ------------------------------------------------------------
let failed = 0;
for (const r of results) {
  const ok = r.problems.length === 0;
  if (!ok) failed++;
  console.log(`${ok ? '✓' : '✗'} ${r.name}`);
  r.problems.forEach(p => console.log(`    - ${p}`));
}
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s) (not failing):`);
  [...new Set(warnings)].forEach(w => console.log(`    - ${w}`));
}
console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
