# Deploying the Wedding Invitation

This site is a static Next.js export. Deploy the **`out/`** folder after running **`npm run build`**.

---

## Netlify (recommended)

### Connect GitHub (automatic deploys)

1. Go to **https://app.netlify.com** and sign in (use **GitHub**).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** and select **`Nabeela0904/wedding-invitation`**.
4. Netlify reads `netlify.toml` automatically. Confirm these settings:

   | Setting | Value |
   |---------|--------|
   | Branch | `main` |
   | Build command | `npm run build` |
   | Publish directory | `out` |

5. Click **Deploy site**.
6. Wait 2–3 minutes. Your site will be live at a URL like **`https://random-name.netlify.app`**.

### After deploy

- **Rename site:** Site settings → Domain management → **Options** → **Edit site name**  
  Example: `shoaib-zeenath-wedding.netlify.app`
- **Custom domain:** Site settings → Domain management → **Add custom domain**

Every push to **`main`** redeploys automatically.

### Manual deploy (drag & drop)

```bash
npm install
npm run build
```

Then drag the **`out/`** folder onto **https://app.netlify.com/drop**.

---

## GitHub Pages

**URL:** https://nabeela0904.github.io/wedding-invitation/

1. Repo **Settings → Pages → Source:** **GitHub Actions**
2. Push to `main` runs the deploy workflow
3. Use `npm run build:pages` (includes `/wedding-invitation` base path)

---

## Vercel

1. **https://vercel.com** → Import **`wedding-invitation`**
2. Build command: `npm run build`
3. Output directory: `out`

---

## Local preview

```bash
npm install
npm run build
npx serve out
```

Open the URL shown (usually http://localhost:3000).

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Music not playing | Tap the envelope or page once (browser autoplay rules) |
| 404 on `/haldi` | Netlify redirects `/haldi` → `/haldi/` (in `netlify.toml`) |
| Build failed | Use Node 20; run `npm install` then `npm run build` locally |
| Old version | Netlify → **Deploys** → **Trigger deploy** → **Clear cache and deploy** |
