// Smoke test for server.mjs: agents get AGENTS.md, browsers get the site.
// Run: npm run smoke   (needs `npm install` for serve-handler)
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 3000 + Math.floor(Math.random() * 2000);
const base = `http://127.0.0.1:${PORT}`;
const srv = spawn(process.execPath, ['server.mjs'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });

const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const CLAUDE_APP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Claude/5.1 Chrome/156.0.0.0 Safari/537.36';
const BROWSER_ACCEPT = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';

const cases = [
  // [label, path, headers, expect: 'md' | 'html' | 'redirect' | status number]
  ['curl at root',               '/',             { 'User-Agent': 'curl/8.4.0', Accept: '*/*' }, 'md'],
  ['ClaudeBot (Mozilla-style)',  '/',             { 'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)' }, 'md'],
  ['Claude-User fetch',          '/project/',     { 'User-Agent': 'Claude-User (claude-code/2.0; +https://support.anthropic.com/)' }, 'md'],
  ['ChatGPT-User',               '/',             { 'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot' }, 'md'],
  ['python-requests',            '/project/',     { 'User-Agent': 'python-requests/2.32' }, 'md'],
  ['no user agent',              '/',             {}, 'md'],
  ['Accept: text/markdown',      '/',             { 'User-Agent': CHROME, Accept: 'text/markdown, text/html;q=0.5' }, 'md'],
  ['?format=md in a browser',    '/?format=md',   { 'User-Agent': CHROME, Accept: BROWSER_ACCEPT }, 'md'],
  ['/index.md alias',            '/index.md',     { 'User-Agent': CHROME, Accept: BROWSER_ACCEPT }, 'md'],
  ['Chrome at root',             '/',             { 'User-Agent': CHROME, Accept: BROWSER_ACCEPT }, 'redirect'],
  ['Chrome at /project/',        '/project/',     { 'User-Agent': CHROME, Accept: BROWSER_ACCEPT }, 'html'],
  ['Claude desktop browser',     '/project/',     { 'User-Agent': CLAUDE_APP, Accept: BROWSER_ACCEPT }, 'html'],
  ['Googlebot gets HTML',        '/project/',     { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }, 'html'],
  ['curl ?format=html',          '/project/?format=html', { 'User-Agent': 'curl/8.4.0' }, 'html'],
  ['static file untouched',      '/tokens.json',  { 'User-Agent': 'curl/8.4.0' }, 200],
  ['health check',               '/llms.txt',     { 'User-Agent': 'RailwayHealthCheck/1.0' }, 200],
];

async function waitUp() {
  for (let i = 0; i < 50; i++) {
    try { await fetch(base + '/llms.txt'); return; } catch { await new Promise(r => setTimeout(r, 100)); }
  }
  throw new Error('server did not start');
}

let failed = 0;
try {
  await waitUp();
  for (const [label, p, headers, expect] of cases) {
    const res = await fetch(base + p, { headers, redirect: 'manual' });
    const type = res.headers.get('content-type') || '';
    const body = await res.text();
    let ok;
    if (expect === 'md') ok = res.status === 200 && type.startsWith('text/markdown') && body.startsWith('# AGENTS.md');
    else if (expect === 'html') ok = res.status === 200 && type.startsWith('text/html') && body.includes('id="page-overview"');
    else if (expect === 'redirect') ok = res.status >= 300 && res.status < 400 && (res.headers.get('location') || '').includes('/project/');
    else ok = res.status === expect;
    console.log(`${ok ? '✓' : '✗'} ${label} → ${res.status} ${type.split(';')[0]}`);
    if (!ok) failed++;
  }
} finally {
  srv.kill();
}
if (failed) { console.error(`\n${failed} smoke test(s) failed.`); process.exit(1); }
console.log('\nServer smoke tests passed.');
