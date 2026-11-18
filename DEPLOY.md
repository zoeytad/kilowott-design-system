# Deploying the Kilowott brand kit

**Production:** https://brandkit.kilowott.com, hosted on Railway. **Deploying:** push to `main`.

## How it works

- Railway builds the repo with Nixpacks (`railway.json`) and starts it with
  `node server.mjs` (serve-handler + `serve.json`, plus agent detection — see `server.mjs`)
  The same command is in `Procfile`. It serves the **repo root**.
- Railway's health check requests `/llms.txt` (`railway.json → healthcheckPath`).
- `serve.json`:
  - **Redirect:** `/` returns a 302 to `/project/`, where the SPA lives.
  - **Rewrites:** `/project` and `/project/` serve `project/index.html`.
  - **Headers:**

    | Files | Content-Type |
    |---|---|
    | `**/*.txt` | `text/plain; charset=utf-8` |
    | `**/*.md` | `text/markdown; charset=utf-8` |
    | `**/*.json` | `application/json; charset=utf-8` |

    All of these, plus everything under `project/kit|styles|pages|assets|downloads/**`, also get `Access-Control-Allow-Origin: *` and a 5-minute cache, so agents can `fetch()` them and other sites can use `kit/kilowott.css` and its logo mask. The `.ase` swatch downloads as an attachment. `project/index.html` sends a `Link` header that points to `/llms.txt` and `/AGENTS.md`.
- There is no build step on Railway. Generated files are committed, so run `npm run build:tokens` locally before you push.

## Release checklist

1. If you changed tokens: edit `project/styles/tokens.css`, then run `npm run build:tokens`.
2. Run `npm run check`. It must pass, and CI runs the same check on the push.
3. Preview locally: run `python3 -m http.server 8723` from the repo root and open http://localhost:8723/project/. To test the production config (headers and redirect) as well, run `npm install && npm start`. It serves on `$PORT`, or 3000 if that isn't set.
4. Commit and push to `main`. Railway deploys within about a minute.
5. Smoke-test the live site:
   ```bash
   curl -sI https://brandkit.kilowott.com/ | grep -i location        # → /project/
   curl -sI https://brandkit.kilowott.com/llms.txt | grep -i content-type
   curl -s  https://brandkit.kilowott.com/AGENTS.md | head -3
   curl -sI https://brandkit.kilowott.com/project/kit/kilowott.css | grep -i access-control
   ```

## Domain

`brandkit.kilowott.com` is a custom domain on the Railway service. Its DNS is a CNAME to the target Railway shows under *Settings → Networking*. Railway's auto-generated `*.up.railway.app` URL is an internal alias. Don't publish it in docs; always use `https://brandkit.kilowott.com`.

## URLs to give people and agents

| URL | Use |
|---|---|
| https://brandkit.kilowott.com/project/ | Live kit, for people |
| https://brandkit.kilowott.com/AGENTS.md | Agent front door |
| https://brandkit.kilowott.com/llms.txt | llmstxt.org index |
| https://brandkit.kilowott.com/llms-full.txt | Everything in one file |
| https://brandkit.kilowott.com/project/kit/kilowott.css | Drop-in stylesheet |
| https://brandkit.kilowott.com/tokens.json | Design tokens |
| https://brandkit.kilowott.com/manifest.json | Machine-readable map |
| https://brandkit.kilowott.com/prompts/claude-code.md | Prompt for Claude Code (also: `claude-design.md`, `cowork.md`, `web-builders.md`) |
| https://brandkit.kilowott.com/project/#&lt;tab&gt; | A specific tab |

## Rollback

Revert the commit on `main` and push. You can also redeploy a previous deployment from Railway's *Deployments* tab.
