# Deploying the Wedding Invitation

This is a **static site**. Build with `npm run build` and publish the **`out/`** folder.

---

## Netlify (recommended)

### Important: use Netlify, NOT Cloudflare Workers

If your build log shows `npx wrangler deploy` or `OpenNext — Cloudflare`, you connected the repo to **Cloudflare Pages/Workers** by mistake. That will fail for this project.

Create the site on **https://app.netlify.com** instead.

### Step-by-step

1. Go to **https://app.netlify.com** → sign in with GitHub
2. **Add new site** → **Import an existing project**
3. Select **`Nabeela0904/wedding-invitation`**
4. Confirm settings (from `netlify.toml`):

   | Setting | Value |
   |---------|--------|
   | Branch | `main` |
   | Build command | `npm run build` |
   | Publish directory | `out` |

5. Click **Deploy site**

Netlify does **not** use a separate deploy command — it only publishes the `out/` folder after the build.

### If a previous deploy failed

1. Netlify dashboard → **Site configuration** → **Build & deploy**
2. Ensure **Build command** = `npm run build`
3. Ensure **Publish directory** = `out`
4. Remove any custom **Deploy command** if present
5. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### Custom domain

Site settings → **Domain management** → **Add custom domain**

---

## Cloudflare Pages (static — if you prefer Cloudflare)

Do **not** use Workers / Wrangler / OpenNext for this repo.

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select the repo
3. Settings:

   | Setting | Value |
   |---------|--------|
   | Framework preset | None (or Next.js Static) |
   | Build command | `npm run build` |
   | Build output directory | `out` |

4. **Do not** set deploy command to `wrangler deploy`

---

## GitHub Pages

**URL:** https://nabeela0904.github.io/wedding-invitation/

- Settings → Pages → Source: **GitHub Actions**
- Build uses `npm run build:pages`

---

## Local preview

```bash
npm install
npm run build
npx serve out
```

---

## Troubleshooting

| Error in log | Fix |
|--------------|-----|
| `npx wrangler deploy` | Wrong platform — use **Netlify** or Cloudflare **Pages** with output `out` |
| `OpenNext — Cloudflare` | Same — do not use Workers adapter |
| 404 on `/haldi` | Redirects in `netlify.toml` and `public/_redirects` |
| Envelope page missing | Build must run full `npm run build` (copies `index.html` to `out/`) |
| Music not playing | Tap envelope once (browser autoplay rules) |
