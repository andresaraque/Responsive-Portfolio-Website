# AI Context — Responsive Portfolio Website

Concise reference for assistants working in this repository.

For **human-oriented** steps (Vercel deploy, public URLs, troubleshooting) see [`DEPLOYMENT.md`](DEPLOYMENT.md). When anything conflicts, **this file and the actual code** (`i18n.js`, `vercel.json`, `translations/*`) are authoritative.

## What this project is

- **Static portfolio site**: HTML, CSS, and vanilla JavaScript. No bundler or framework.
- **Shared UI** is implemented as **Web Components** (custom elements) under `js/components/`.
- **Internationalization** loads JSON translation bundles over HTTP; **Vercel** applies URL rewrites and cache headers for translation files.

## Key files and folders

| Path | Role |
|------|------|
| `index.html` | Main landing page; full sections (hero, about, skills, education, portfolio). |
| `projects/pj1.html`, `pj2.html`, `pj3.html` | Project detail pages; reuse header/footer/language; use `app-project.js`. |
| `404.html` | Error page (if customized, follow same patterns as other HTML). |
| `js/app.js` | Home-only: ScrollReveal, Mixitup portfolio filter, image modal, typewriter; expects `window.i18n`. |
| `js/app-project.js` | Project pages: mobile nav toggle only (no portfolio modal/typewriter). |
| `js/i18n.js` | `I18n` class; global `window.i18n` after `DOMContentLoaded`. |
| `js/components/header.js` | `<app-header>` — navbar and anchor links. |
| `js/components/footer.js` | `<app-footer>` — copyright (i18n) and social links. |
| `js/components/language.js` | `<app-language>` — language switcher; calls `window.i18n.changeLanguage()`. |
| `translations/en-v2.json`, `es-v2.json` | Translation payloads; keep keys in sync across locales. |
| `css/style.css`, `css/i18n.css` | Main styles; i18n-related UI (e.g. language dropdown). |
| `css/style-project.css` | Extra styles for project pages. |
| `vercel.json` | Rewrites for `/en` and `/es` paths; `Cache-Control` for `/translations/`; security headers. |

## Page structure and scripts

- Typical layout: `<app-header>`, `<main>`, `<app-language>`, `<app-footer>`.
- **`data-base` on `<app-header>` and `<app-footer>`**: Base path for links to `index.html` (e.g. `./` from root, `./../` from `projects/`).

### Script load order (do not reorder without checking `window.i18n` timing)

**`index.html` (body end):**

1. `js/components/header.js`
2. `js/i18n.js`
3. `js/components/footer.js`
4. `js/components/language.js`
5. `js/app.js` (plus CDN libs earlier in the file as already wired)

**`projects/pj*.html` (body end):**

1. `js/components/header.js`
2. `js/components/footer.js`
3. `js/components/language.js`
4. `js/i18n.js`
5. `js/app-project.js`

On project pages, `app-language` runs before `i18n.js` loads; language UI still works on interaction after `window.i18n` exists. When adding features, preserve a load order that does not assume `window.i18n` inside a custom element’s `connectedCallback` unless `i18n.js` has already run.

## Custom elements

| Tag | Attribute(s) | Notes |
|-----|--------------|--------|
| `<app-header>` | `data-base`, optional `data-scrolled="true"` | Injects `<header>` with `data-i18n` nav labels. Scrolled style on inner pages where the header should look “scrolled” on load. |
| `<app-footer>` | `data-base` | Injects `<footer>`; copyright uses `data-i18n="footer.copyright"`. |
| `<app-language>` | — | Floating selector; options `data-lang="en"` / `"es"`. |

Registered in their respective files via `customElements.define(...)`.

## i18n (`js/i18n.js`)

- **Supported locales**: `en`, `es` only.
- **Resolution order**: URL query `?lang=`, then `localStorage` key `portfolio-language`, then `navigator.language` prefix, then default **`en`**.
- **Bundles**: Fetched from `translations/{lang}-v{N}.json` where `N` is `I18N_TRANSLATION_BUNDLE_VERSION` in `js/i18n.js` (currently **2**). From URLs under `/projects/`, path resolves to `../translations/...`.
- **DOM**: Elements with `data-i18n="<dot.key.path>"` get `textContent` updated. Use `data-i18n-html` on an element if the value should be applied as HTML (support exists in `updateContent`).
- **Programmatic API**: `window.i18n.t('key', { param: 'value' })` for `{{param}}` placeholders in strings.
- **Meta**: `meta.title` and `meta.description` in JSON drive `document.title` and `<meta name="description">`.
- **Language change**: `changeLanguage(lang)` updates `localStorage`, `history` (`?lang=`), reloads JSON, refreshes DOM and meta.

### Adding or changing copy

1. Add the same key structure to **`en-v2.json` and `es-v2.json`** (or whatever version matches `I18N_TRANSLATION_BUNDLE_VERSION`).
2. Mark up HTML with `data-i18n` (or `data-i18n` + `data-i18n-html` if needed).
3. If clients may still cache an old JSON URL, bump the bundle: add `en-v3.json` / `es-v3.json`, increment `I18N_TRANSLATION_BUNDLE_VERSION` in `i18n.js`, and remove or stop shipping the old files.

## Vercel (`vercel.json`)

- **Rewrites**: Paths like `/en`, `/es`, `/en/...`, `/es/...` are rewritten to the same static file with `?lang=en` or `?lang=es` for locale-prefixed URLs.
- **Caching**: `Cache-Control: public, max-age=3600, must-revalidate` applies to **`/translations/(.*)`** only — good for CDN/browser caching; coordinate version bumps with translation file names when necessary.
- **Security headers**: Applied broadly to `/(.*)` (e.g. `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`).

## Conventions for code changes

- **English only** in code: comments, identifiers, and user-facing logic variable names (per project rules).
- Prefer **small, focused edits**; match existing patterns for custom elements and `data-i18n`.
- External libraries used from CDN include **Swiper**, **ScrollReveal**, **Typewriter**; verify APIs with current documentation when changing behavior.
