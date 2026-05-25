# Deploying the Wedding Invitation

This site is a static Next.js export. You can deploy it for **free** on GitHub Pages or Vercel.

---

## Option 1: GitHub Pages (recommended — already configured)

**Live URL after deploy:**  
https://nabeela0904.github.io/wedding-invitation/

### One-time setup on GitHub

1. Open https://github.com/Nabeela0904/wedding-invitation/settings/pages
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Save

### Deploy

Every push to **`main`** automatically builds and deploys.

To deploy manually:
1. Go to **Actions** tab on GitHub
2. Open **Deploy to GitHub Pages**
3. Click **Run workflow**

### Build locally (same as CI)

```bash
npm install
npm run build:pages
```

The static site is in the `out/` folder.

---

## Option 2: Vercel (easiest — custom domain friendly)

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New Project**
3. Import **Nabeela0904/wedding-invitation**
4. Leave default settings (Framework: Next.js)
5. Click **Deploy**

Use **`npm run build`** (not `build:pages`) on Vercel — no base path needed.

Your site will be live at a URL like `wedding-invitation.vercel.app`.

---

## Option 3: Netlify

1. Go to https://netlify.com → **Add new site** → **Import from Git**
2. Connect the repo
3. Build command: `npm run build`
4. Publish directory: `out`
5. Deploy

---

## Local preview of production build

```bash
npm run build:pages   # GitHub Pages version
npx serve out
```

Open the URL shown (usually http://localhost:3000).

---

## Custom domain (optional)

- **GitHub Pages:** Settings → Pages → Custom domain
- **Vercel / Netlify:** Domain settings in project dashboard

After adding a custom domain, update `next.config.mjs` if you no longer use the `/wedding-invitation` subpath.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Music not playing | Tap the envelope or page once (browser autoplay rules) |
| 404 on event pages | Ensure GitHub Pages source is **GitHub Actions**, not a branch |
| Styles missing | Hard refresh (`Ctrl+Shift+R`) |
| Old version showing | Wait 2–3 minutes after deploy, then hard refresh |
