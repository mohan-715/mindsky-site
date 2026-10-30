# MindSky (static website)

Plain HTML, CSS and JavaScript. No server, no build step, no database.
Open `index.html` through any web host and it works. (Double-clicking the file also works, but the
offline install and the service worker need `http://localhost` or `https://`.)

## Put it online for free

**Option A: Netlify (fastest, about 2 minutes)**
1. Go to app.netlify.com/drop and sign in.
2. Drag this whole folder onto the page. You get a public link straight away.
3. To update later, drag the folder again onto the same site's "Deploys" tab.

**Option B: Cloudflare Pages**
1. Cloudflare dashboard > Workers & Pages > Create > Pages > Upload assets.
2. Upload this folder. Build command: none. Output folder: the folder itself.

**Option C: GitHub Pages**
1. Make a new public repository and upload everything in this folder to its main branch.
2. Repository Settings > Pages > Deploy from a branch > main, folder "/ (root)".
3. Your site appears at `https://<your-username>.github.io/<repository-name>/`.

All three give you HTTPS, which the offline install needs. A custom domain (for example mindsky.in)
can be added later from the same settings page.

## How the site is organised

| Path | What it is |
|---|---|
| `index.html` | The page and the list of scripts |
| `css/style.css` | All styling |
| `data/lessons-*.js` | The lessons: one file per subject (physics, maths, india, chemistry) |
| `js/sims-*.js` | The experiments, one file per subject area |
| `js/engine.js`, `quiz.js`, `app.js`, `lab.js` | The app itself |
| `js/router.js` | Links for every view and topic (`#/chemistry/atoms`) |
| `js/backup.js` | Progress backup and restore code |
| `js/pwa.js`, `sw.js`, `manifest.webmanifest` | Offline use and installing as an app |

Links look like `https://your-site/#/chemistry/atoms`. The part after `#` is handled in the browser,
so this works on every host with no extra setup.

## Changing things

Edit the files, then upload the folder again. If you change any file, also change the version name
near the top of `sw.js` (the line `const CACHE="mindsky-..."`) to anything new, for example `mindsky-8`.
Without that, students who already installed the app may keep seeing the old copy for a while.

## Good to know

* Progress is saved in each student's own browser. There are no accounts. The Profile page has a
  backup code for moving between devices.
* The fonts (Fraunces, Inter, IBM Plex Mono) load from Google Fonts on the first visit and are
  kept for offline use afterwards. Without them the site falls back to ordinary system fonts.
  To avoid contacting Google at all, download those fonts as .woff2 files, add `@font-face` rules
  to `css/style.css`, and remove the three Google Fonts lines from `index.html`.
* Add your own contact line (for reporting a mistake in a lesson) to the About view in `index.html`.
