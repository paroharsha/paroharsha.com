# CLAUDE.md

Guidance for working in this repo. **paroharsha.com** is Paro Harsha's personal art/writing studio site ("Marginalia").

## What this is

A **single-page static site** with no build step. The browser does everything:

- `index.html` loads **React 18** (UMD) and **Babel Standalone** from unpkg via `<script>` tags, then loads the app's `.jsx` files as `<script type="text/babel">` so Babel transpiles JSX **in the browser at runtime**.
- There is **no bundler, no node_modules, no package.json**. Don't add a build pipeline unless explicitly asked — keep it deployable as plain static files.
- Because JSX is fetched at runtime, the site **must be served over HTTP** (not opened as `file://`).

## File map

| File | Role |
|------|------|
| `index.html` | Shell: `<head>` styles + CSS variables (palette, fonts), inline canvas "stardust" animation, and the `<script>` tags that load React/Babel and every `.jsx`. **Load order matters** — see below. |
| `app.jsx` | Main shell. Wires Nav + pages + the Tweaks panel. Holds `TWEAK_DEFAULTS`, `FONT_PAIRS`, and page routing. |
| `data.jsx` | Content: the `PIECES` array (each art/writing piece — id, title, date, palette, image path, excerpt, `story` paragraphs). **Edit here to add/change art and writing.** |
| `hero.jsx` | Home hero, cursor-reactive floating elements. |
| `gallery.jsx` | Art archive grid (flavors: `gallery` / `mosaic` / `list`), hover star-burst effects. |
| `story.jsx` | Story detail view (art + writing side-by-side) and the tarot-card overlay. |
| `about.jsx` | About page. |
| `tweaks-panel.jsx` | Reusable Tweaks UI shell + form controls (sliders, toggles, radios, etc.). Owns the edit-mode host protocol. |
| `image-slot.js` | `<image-slot>` web component — drag-to-fill image placeholders (mostly for the host editing runtime; read-only when served normally). |
| `assets/` | Curated artwork (`.avif`, `.png`, `.jpeg`) referenced by `PIECES`. |
| `uploads/` | Raw/original image uploads. |
| `CNAME` | `paroharsha.com` — custom domain for GitHub Pages deploy. |

### Script load order (in `index.html`)
React → ReactDOM → Babel → `image-slot.js` → `tweaks-panel.jsx` → `data.jsx` → `hero.jsx` → `gallery.jsx` → `story.jsx` → `about.jsx` → `app.jsx`. `app.jsx` loads **last** because it depends on everything else. If you add a new `.jsx`, add a matching `<script type="text/babel" src="...">` in the right spot.

## Conventions

- **Globals, not modules.** There's no ESM/import system here. Components and data (`PIECES`, `FONT_PAIRS`, etc.) are plain top-level globals shared across files via `window`. To avoid React-hook name collisions across files loaded into one scope, files alias destructured hooks (e.g. `const { useState: useStateG } = React` in gallery, `useStateS` in story). Follow that pattern in new files.
- **Styling is inline + CSS variables.** Most styling is inline `style={{...}}` objects plus the CSS custom properties defined in `index.html`'s `:root` (palette like `--ink`, `--gold`, `--wine`; fonts `--font-display` / `--font-body` / `--font-mono`; `--motion` multiplier). Reuse these variables rather than hardcoding colors.
- **Respect `--motion`.** Animations check the `--motion` multiplier (0 = reduced motion). Keep that contract for new motion.
- **`TWEAK_DEFAULTS`** in `app.jsx` is wrapped in `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/` markers used by the host editor — don't remove those markers.

## Running locally

Serve over HTTP with live reload (auto-refreshes on file changes):

```bash
npx --yes live-server --port=8080 --no-browser
```

Then open **http://localhost:8080**. Any static server works (`python3 -m http.server` etc.), but `live-server` gives auto-reload. Edits to `.jsx`/`.html`/`assets` reflect on reload.

## Deploying

Hosted on **GitHub Pages** (custom domain via `CNAME`). Deploy = push to `main`:

```bash
git add -A
git commit -m "…"
git push
```

Auth is via the `gh` CLI over HTTPS (account: `paroharsha`). Commit identity: Paromita Harsha <paromita.harsha@gmail.com>. Only commit/push when asked.

## Editing tips

- **Add or edit a piece of art/writing:** edit the `PIECES` array in `data.jsx`. Put the image in `assets/` and reference it as `assets/<file>`. Include `story` (array of paragraph strings) for pieces with writing.
- Keep the no-build, static-file nature intact — if a change seems to need a bundler or npm dependency, flag it first rather than introducing tooling.
