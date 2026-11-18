// ============================================================
// Kilowott brand kit — production server (Railway)
// ------------------------------------------------------------
// Static files are served exactly as before (serve-handler, the
// engine behind `npx serve`, with serve.json). On top of that:
//
//   AI agents that open https://brandkit.kilowott.com (or /project/)
//   get AGENTS.md as markdown instead of the JavaScript app shell,
//   which they cannot run. People in browsers still get the site.
//
// An agent is detected by any of:
//   - ?format=md | ?format=markdown | ?agent=1   (explicit)
//   - Accept header preferring text/markdown or text/plain over HTML
//   - User-Agent of an AI assistant, crawler or HTTP library
// Force the human site with ?format=html.
// ============================================================

import http from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import handler from 'serve-handler';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const config = JSON.parse(readFileSync(path.join(ROOT, 'serve.json'), 'utf8'));
config.public = ROOT;

// Paths that are "the brand kit front door".
const ENTRY = new Set(['/', '/index.html', '/project', '/project/', '/project/index.html']);
// Paths that always return the agent guide as markdown.
const MD_ALIASES = new Set(['/index.md', '/project/index.md', '/project.md', '/agents', '/agents.md', '/.well-known/agents.md']);

// Who gets markdown:
//   1. Search engines (Googlebot, Bingbot…) → never; they get the HTML + <noscript> brief.
//   2. Named AI agents / LLM crawlers / headless browsers / HTTP libraries → markdown,
//      even when their UA also says "Mozilla/5.0 … Chrome" (ClaudeBot, ChatGPT-User, etc. do).
//   3. Any other UA that isn't a browser (no "Mozilla/") → markdown (CLIs, SDKs, agent tools).
//   4. Real browsers → the site. (Claude desktop's in-app browser says "Claude/x" next to
//      Chrome — it runs JS, so it is a browser and gets the site.)
const SEARCH_BOT = /(googlebot|google-inspectiontool|bingbot|adidxbot|duckduckbot|yandex|baiduspider|slurp|applebot(?!-extended)|facebookexternalhit|linkedinbot|twitterbot|slackbot|discordbot|whatsapp|telegrambot)/i;
const AGENT_UA = /(claudebot|claude-user|claude-searchbot|claude-web|claude-code|anthropic|chatgpt|gptbot|openai|oai-searchbot|perplexity|cohere|gemini|google-extended|mistral|deepseek|bytespider|ccbot|amazonbot|applebot-extended|meta-externalagent|youbot|duckassist|phindbot|v0bot|devin|manus|firecrawl|jina|diffbot|crawl4ai|headlesschrome|playwright|puppeteer|selenium|curl\/|wget\/|httpie|python|aiohttp|node-fetch|undici|axios|got \(|go-http-client|okhttp|java\/|libwww|scrapy|ruby|php\/|powershell|\bbot\b|crawler|spider)/i;

let guide = { body: '', mtime: 0 };
function agentGuide() {
  const file = path.join(ROOT, 'AGENTS.md');
  const m = statSync(file).mtimeMs;
  if (m !== guide.mtime) guide = { body: readFileSync(file, 'utf8'), mtime: m };
  return guide.body;
}

function wantsMarkdown(req, url) {
  const fmt = (url.searchParams.get('format') || '').toLowerCase();
  if (fmt === 'html') return false;
  if (fmt === 'md' || fmt === 'markdown' || fmt === 'text' || url.searchParams.has('agent')) return true;

  const accept = (req.headers['accept'] || '').toLowerCase();
  const q = (type) => {
    for (const part of accept.split(',')) {
      const [t, ...params] = part.trim().split(';');
      if (t.trim() === type) {
        const qp = params.find(p => p.trim().startsWith('q='));
        return qp ? parseFloat(qp.split('=')[1]) : 1;
      }
    }
    return -1;
  };
  const md = Math.max(q('text/markdown'), q('text/x-markdown'), q('text/plain'));
  const html = q('text/html');
  if (md >= 0 && md >= html) return true;

  const ua = req.headers['user-agent'] || '';
  if (!ua) return true;                      // no UA at all = a script
  if (SEARCH_BOT.test(ua)) return false;
  if (AGENT_UA.test(ua)) return true;
  return !/mozilla\//i.test(ua);              // non-browser clients
}

const LINK = [
  '</AGENTS.md>; rel="alternate"; type="text/markdown"; title="Agent guide"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-full.txt>; rel="alternate"; type="text/plain"',
  '</tokens.json>; rel="alternate"; type="application/json"',
].join(', ');

const server = http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, 'http://localhost'); } catch { res.statusCode = 400; return res.end(); }
  const p = decodeURIComponent(url.pathname);

  if ((ENTRY.has(p) || MD_ALIASES.has(p)) && (req.method === 'GET' || req.method === 'HEAD')) {
    res.setHeader('Vary', 'Accept, User-Agent');
    res.setHeader('Link', LINK);
    if (MD_ALIASES.has(p) || wantsMarkdown(req, url)) {
      const body = agentGuide();
      res.writeHead(200, {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
        'X-Kilowott-Agent-View': 'AGENTS.md',
      });
      return res.end(req.method === 'HEAD' ? undefined : body);
    }
  }

  try {
    await handler(req, res, config);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) res.statusCode = 500;
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Kilowott brand kit on http://0.0.0.0:${PORT}`);
});
