# Deploying the Kilowott Design System

Zero-config static deploy. Pick any host — the bundle is plain HTML/CSS/JS with no build step.

## Option A — Vercel (fastest)

```bash
cd "/Users/aaron/Claude Code/Kilowott Branding"

# one-time: install CLI + login
npm i -g vercel
vercel login

# deploy
vercel          # preview URL
vercel --prod   # production URL
```

Uses `vercel.json` at repo root. `/` rewrites to `project/index.html`. The key AI-facing files (`llms.txt`, `tokens.json`, `manifest.json`) are served with CORS + short cache so external tools can read them.

## Option B — Netlify

```bash
cd "/Users/aaron/Claude Code/Kilowott Branding"

npm i -g netlify-cli
netlify login

netlify deploy             # preview URL
netlify deploy --prod      # production URL
```

Uses `netlify.toml` at repo root (same rewrites + headers as Vercel config).

## Option C — Cloudflare Pages

```bash
cd "/Users/aaron/Claude Code/Kilowott Branding"

npm i -g wrangler
wrangler login
wrangler pages deploy . --project-name=kilowott-design-system
```

## Option D — GitHub Pages

```bash
cd "/Users/aaron/Claude Code/Kilowott Branding"
git init
git add .
git commit -m "Initial brand system"
git branch -M main
git remote add origin https://github.com/<org>/kilowott-design-system.git
git push -u origin main
```

Then in GitHub repo settings → Pages → deploy from `main` / `/ (root)`. URL will be `https://<org>.github.io/kilowott-design-system/project/`.

## After deploying

1. **Update `llms.txt`** — replace `_set this when deployed_` with the production URL.
2. **Update `manifest.json`** page URLs to absolute if desired (optional — relative works for agent traversal).
3. **Hand the URL to:**
   - **Claude Code:** paste `prompts/claude-code.md` + the URL into any session's system prompt.
   - **Claude Design:** same with `prompts/claude-design.md`.
   - **Cowork:** same with `prompts/cowork.md`.
   - **Team:** bookmark it. The brand ref is human-readable too.

## Custom domain (optional)

For all hosts above, add a custom domain (e.g. `brand.kilowott.com`) in the host's dashboard. DNS: CNAME pointing at the host's target (`cname.vercel-dns.com`, `<site>.netlify.app`, etc.).

## Local preview

Already running:

```bash
cd project && python3 -m http.server 8723
```

→ http://localhost:8723/

## AI-facing URLs once deployed

Let's assume production URL is `https://brand.kilowott.com`. External agents should hit:

- `https://brand.kilowott.com/llms.txt` — entry point (llmstxt.org format)
- `https://brand.kilowott.com/KILOWOTT_BRAND.md` — compact brand reference
- `https://brand.kilowott.com/tokens.json` — machine-readable tokens
- `https://brand.kilowott.com/manifest.json` — component catalog
- `https://brand.kilowott.com/prompts/claude-code.md` — Claude Code prompt
- `https://brand.kilowott.com/prompts/claude-design.md` — Claude Design prompt
- `https://brand.kilowott.com/prompts/cowork.md` — Cowork prompt
- `https://brand.kilowott.com/project/index.html#<tab>` — any specific page
