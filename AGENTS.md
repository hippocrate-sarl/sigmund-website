# Sigmund Website

Static marketing website for **www.sigmund.lu** — an administrative management SaaS app for mental health professionals in Luxembourg (psychiatrists, psychotherapists, psychologists).

Developed by **Hippocrate Sàrl** (Bertrange, Luxembourg). Team: Sylvain Perez, Franck Amouyal, Guillaume Desrat.

## Tech stack

- Plain HTML/CSS/JS — no build tool, no framework, no bundler
- **Bootstrap 5.3** (CDN) — layout and components
- **Bootstrap Icons 1.11** (CDN) — icons via `<i class="bi bi-*">`
- **flag-icons 7.2** (CDN) — language switcher flags via `<span class="fi fi-*">`
- **Google Fonts** — Inter (300/400/500/600/700/800)
- Contact forms POST to Brevo (sibforms.com) via `fetch` + `mode: 'no-cors'`, handled by `assets/js/profession.js`
- **Google Tag Manager** (container `GTM-TZPN6B4R`) — loaded via two Jekyll includes on every page: `_includes/head.html` (script, first line inside `<head>`; also the place for any other shared `<head>` lines) and `_includes/body.html` (`<noscript>` fallback, first line inside `<body>`; also the place for any other shared lines right after `<body>`). GitHub Pages already builds the site with Jekyll (see `_config.yml`, used previously for the `jekyll-redirect-from` plugin), so every `.html` page now carries a front matter block (even if empty) so Jekyll processes these include tags. `AGENTS.md` and `README.md` are excluded from the Jekyll build (see `_config.yml`) — the Liquid syntax in this file's prose is never evaluated.
- **Google Consent Mode v2** — default state (all storage `denied` except `security_storage`) is set inline at the top of `_includes/head.html`, before the GTM snippet loads. `assets/js/cookieconsent-config.js` calls `gtag('consent', 'update', ...)` on `onFirstConsent`/`onConsent`/`onChange` to grant `analytics_storage`/`ad_storage`/`ad_user_data`/`ad_personalization` once the visitor opts in via the banner.
- **CookieConsent v3.1.0** (self-hosted, [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent)) — the cookie-consent banner. `assets/js/cookieconsent.esm.js` is the vendored library (do not hand-edit; replace wholesale to upgrade), `assets/js/cookieconsent-config.js` holds the `CookieConsent.run({...})` config with full FR/EN/DE translations, `assets/css/cookieconsent.css` is the library's own stylesheet, `assets/css/cookieconsent-sigmund.css` is the Sigmund brand override (all four loaded from `_includes/head.html`/`body.html`, see [What to watch out for](#what-to-watch-out-for) for known quirks).
- **Local dev tooling** — `Gemfile`/`Gemfile.lock` pin the same `github-pages` gem set GitHub Pages builds with; `serve.cmd` (Windows) / `serve.sh` (Linux/macOS) run `bundle exec jekyll serve` inside a `ruby:3.3` Docker container, so no local Ruby install is needed. These are local-only — `_config.yml`'s `exclude` list keeps them out of the actual Jekyll build.

## File structure

```
index.html                                        Homepage (FR)
psychiatre.html           Psychiatrist landing page (FR)
psychotherapeute.html     Psychotherapist landing page (FR)
psychologue.html          Psychologist landing page (FR)
tarifs.html                                       Pricing + Sigmund vs Logicare (FR)
equipe.html                                       Team page — E-E-A-T (FR)
facturation-cns.html                              CNS invoicing guide (FR)
paiement-immediat-direct.html                     PID guide (FR)
s-installer-psychologue-psychotherapeute-luxembourg.html  Installation guide for psychologists/psychotherapists (FR)
politique-en-matiere-de-cookies.html              Cookie policy (FR)
politique-relative-aux-donnees-personnelles.html  Privacy policy (FR)
mentions-legales.html                             Legal notice (FR)

en/index.html                                     Homepage (EN)
en/psychiatrist.html
en/psychotherapist.html
en/psychologist.html
en/pricing.html                                   Pricing (EN)
en/team.html                                      Team page (EN)
en/cns-invoicing.html                             CNS invoicing guide (EN)
en/immediate-direct-payment.html                  PID guide (EN)
en/setting-up-as-a-psychologist-in-luxembourg.html  Installation guide for psychologists/psychotherapists (EN)
en/cookie-policy.html
en/privacy-policy.html
en/legal-notice.html
en/blog/index.html                                Blog index (EN)

llms.txt                                          AI crawler description (FR/EN/DE — trilingual, root only)
_includes/head.html                               Shared <head> snippet (GTM + Consent Mode default + CookieConsent stylesheets + other head lines), included in <head> of every page
_includes/body.html                               Shared post-<body> snippet (GTM noscript fallback + CookieConsent script + other lines), included right after <body> of every page
assets/css/sigmund.css                            All custom styles (shared by all pages)
assets/css/cookieconsent.css                      CookieConsent v3.1.0 library stylesheet (vendored, do not hand-edit)
assets/css/cookieconsent-sigmund.css              Sigmund brand override for the CookieConsent banner (#cc-main scoped)
assets/js/main.js                                 Active nav-link highlight
assets/js/sg-carousel.js                          Shared CSS scroll-snap carousel logic (testimonials, etc.) — used on the homepage and all profession pages
assets/js/profession.js                           Contact form handler (Brevo fetch, validation, i18n via data-attributes)
assets/js/cookieconsent.esm.js                    CookieConsent v3.1.0 library (vendored, do not hand-edit)
assets/js/cookieconsent-config.js                 CookieConsent config: categories, FR/EN/DE translations, Google Consent Mode v2 bridge
assets/images/                                    All images (webp + svg)
  team-sylvain-perez.webp                         Team photo — downloaded from hippocrate.lu
  team-franck-amouyal.webp
  team-guillaume-desrat.webp
blog/index.html                                   Blog index (FR)

de/index.html                                     Homepage (DE)
de/psychiater.html
de/psychotherapeut.html
de/psychologe.html
de/preise.html                                    Pricing (DE)
de/team.html                                      Team page (DE)
de/cns-abrechnung.html                            CNS invoicing guide (DE)
de/direktzahlung.html                             PID guide (DE)
de/niederlassung-als-psychologe-in-luxemburg.html  Installation guide for psychologists/psychotherapists (DE)
de/cookie-richtlinie.html
de/datenschutz.html
de/impressum.html
de/blog/index.html                                Blog index (DE)

favicon.ico
robots.txt
sitemap.xml

Gemfile / Gemfile.lock                            Local Jekyll dev dependencies (matches GitHub Pages' gem set) — excluded from the Jekyll build itself
serve.cmd / serve.sh                              Run Jekyll locally via Docker (Windows / Linux-macOS) — excluded from the Jekyll build itself
```

## CSS conventions

Custom CSS lives exclusively in `assets/css/sigmund.css`. CSS variables are defined in `:root`:

```css
--sg-primary:    #6BA4FA
--sg-primary-lt: #92BCFB
--sg-dark:       #333333
--sg-light-bg:   #f0f6ff
--sg-hero-from:  #d6e8ff
--sg-hero-to:    #f8faff
--sg-white:      #ffffff
--sg-border:     #e2ecff
--sg-shadow:     0 4px 24px rgba(107,164,250,.15)
--sg-gradient:   linear-gradient(135deg, #6BA4FA 0%, #4a86e8 100%)
```

All custom classes use the `sg-` prefix. Profession landing pages have `<body class="sg-profession">` — all profession-specific overrides (hero, section titles, testimonials, pricing, coming-soon callout, contact form) are scoped to `.sg-profession` in the "Profession landing pages" section at the bottom of `sigmund.css`. The profession pages also include a `<style>` block inline for page-specific overrides (e.g. testimonials background image URL).

**Important CSS cascade note:** properties defined in `sigmund.css` apply to ALL pages. Profession-specific overrides use `.sg-profession` ancestor scoping so they never affect non-profession pages. If you add a new property to a shared class in `sigmund.css`, verify it doesn't unintentionally affect profession pages.

**No inline styles, no `<style>` blocks:** never use `style="..."` attributes or `<style>` blocks when creating or modifying pages. All styles — including page-specific ones — must go in `sigmund.css`. Use a new, well-named class and add it there.

## Key components (sigmund.css)

- **`.sg-navbar`** — sticky top navbar; active link gets `class="nav-link active"`. Includes a demo-booking CTA (`.sg-nav-cta`): full-text version inside the collapse, shown only at `lg`+ (`d-none d-lg-inline-block`); compact version (`.sg-nav-cta-mobile`, added text "Réservez une démo" / "Book a demo" / "Demo buchen") sits between the logo and hamburger toggler, visible only below `lg` (`d-lg-none`) so mobile visitors always see it without opening the menu. Points to the locale-specific demo URL (`demo.sigmund.lu` / `demo-en.sigmund.lu` / `demo-de.sigmund.lu`)
- **`.btn-sg-primary`** / **`.btn-sg-outline`** — pill-shaped CTA buttons
- **`.sg-hero`** — gradient hero section; `.sg-hero-img` has `border-radius: 16px` (homepages only — profession pages override with `border-radius: 0`)
- **`.sg-feat-list`** — checkmark feature list (CSS `::before` content); on mobile, forced `text-align: left; display: inline-block` to counteract the `.sg-hero { text-align: center }` rule
- **`.sg-picto-card`** — feature cards with icon + title + description
- **`.sg-carousel`** / **`.sg-carousel-track`** / **`.sg-carousel-slide`** — pure CSS scroll-snap carousel; logic in shared `assets/js/sg-carousel.js`
- **`.sg-pricing`** — pricing card; on homepages: primary-color background; on profession pages (`.sg-profession`): white card on gradient background (inverted)
- **`.sg-soon-card`** — "coming soon" feature cards
- **`.sg-timeline`** — vertical timeline (company history)
- **`.sg-faq`** — native `<details>`/`<summary>` accordion
- **`.sg-footer`** — dark footer (`#1a1a2e`)

## Key components (inline `<style>` — page-specific)

These classes are defined inline in the pages that use them, not in `sigmund.css`:

- **`.sg-legal-header`** — gradient page header with icon (legal pages, team, tarifs, guides)
- **`.sg-team-card`** — circular photo + name + role + bio + LinkedIn button (equipe.html)
- **`.sg-price-card`** — gradient pricing card (tarifs.html)
- **`.sg-compare-table`** — Sigmund vs Logicare comparison table (tarifs.html)
- **`.sg-diff-card`** — differentiator cards (tarifs.html)
- **`.sg-guide-content`** — typography styles for long-form guide pages
- **`.sg-guide-hero-img`** — hero image on guide pages (border-radius 16px)
- **`.sg-info-box`** — blue left-border info callout (guide pages)
- **`.sg-steps`** — numbered step list with CSS counter (guide pages)
- **`.sg-profession-badge`** — pill badge indicating target profession (guide pages)

## Navbar

5 items across all pages: `Accueil | Psychiatre | Psychothérapeute | Psychologue | Tarifs` (FR) / `Home | Psychiatrist | Psychotherapist | Psychologist | Pricing` (EN). When adding new pages, do NOT add them to the navbar — use the footer "Ressources" section instead.

## Footer structure

Three columns on all pages:
1. **Liens utiles / Useful links** — navigation links + a "Ressources / Resources" sub-section (with `<h6 class="mt-3">`) for guide pages
2. **À propos de nous / About Us** — company description + Made in Luxembourg badge
3. **Contact** — email, phones, address, social links (LinkedIn, Facebook, Instagram)

When adding a new resource page, add its link to the "Ressources" sub-section in the footer of **all** existing pages (FR and EN separately).

When adding a new blog article, add its card to all 3 blog index pages (`blog/index.html`, `en/blog/index.html`, `de/blog/index.html`) and add all 3 article URLs to `sitemap.xml`.

## Trilingual structure

Every main page has FR, EN and DE counterparts. Language switcher in navbar and footer links between them. Cookie consent language is auto-detected from `<html lang="...">`.

FR pages: assets at `assets/`, links relative from root (e.g. `href="en/index.html"`).
EN pages: assets at `../assets/`, links relative from `en/` (e.g. `href="../index.html"`).
DE pages: assets at `../assets/`, links relative from `de/` (e.g. `href="../index.html"`).

DE filenames are German translations, not transliterations, of the FR/EN names (e.g. `de/preise.html`, not `de/tarifs.html`) — see the FR | EN | DE table in `README.md` for the full page mapping.

## SEO / GEO

- `llms.txt` (FR) + `en/llms.txt` (EN) — AI crawler files for ChatGPT, Perplexity
- JSON-LD on homepage: `Organization` + `SoftwareApplication` + `AggregateRating` (4.9/5, 8 reviews)
- JSON-LD on profession pages: `FAQPage` (6 Q&A each, adapted per profession for PID)
- JSON-LD on team page: `Person` × 3 (with LinkedIn `sameAs`)
- JSON-LD on tarifs/pricing: `SoftwareApplication` + `Offer` + `eligibleRegion: Luxembourg`
- JSON-LD on guide pages: `Article` (with `datePublished`, `dateModified`)
- E-E-A-T badges on homepage hero: "En service depuis 2013" / "In service since 2013" / "In Betrieb seit 2013", "Données hébergées au Luxembourg", "+50 professionnels"
- GEO-citable openings on profession pages: 20% admin time stat (Ordre national des médecins)

## GTM tracking on demo-booking links

Every link to the Microsoft Bookings demo form (`demo.sigmund.lu` / `demo-en.sigmund.lu` / `demo-de.sigmund.lu`) carries `data-cta="book"` plus a `data-cta-pos` describing where on the page it sits, for GTM click tracking:

- `nav-mobile` / `nav-desktop` — navbar CTA (compact mobile version / full desktop version)
- `hero` — hero section button
- `social-proof` — homepage-only banner ("Vos consœurs et confrères...")
- `mid-cta` — profession-page-only banner after the picto features, before testimonials
- `pricing` — button inside the pricing/options card
- `final-cta` — last CTA banner before the contact form (profession pages, tarifs/pricing, guide pages)
- `summary` — inline text link inside the installation guide's "En résumé" paragraph (kept as an inline link, not a button)

When adding a new demo-booking link anywhere on the site, tag it with both attributes following this taxonomy, across all 3 languages.

## Important domain knowledge

- **CNS** = Caisse Nationale de Santé (Luxembourg national health fund)
- **PID** = Paiement Immédiat Direct (CNS pays practitioner directly). Psychiatrists: available now, offered free of charge. Psychotherapists: coming soon, will also be offered free of charge once the CNS opens the service. Psychologists: not applicable.
- **Psychotherapy reimbursement**: started in 2023 in Luxembourg — psychotherapists can now invoice CNS
- Base subscription: **€90/month**, no commitment, 15-day free trial
- Data stored in Luxembourg (Gandi SAS datacenter in Bissen), subject to Luxembourg law + GDPR
- Demo request form FR: `https://demo.sigmund.lu/` — EN: `https://demo-en.sigmund.lu/` — DE: `https://demo-de.sigmund.lu/` (CTA buttons throughout the site)
- Application URL (production): `https://app.sigmund.lu/` (FR + EN — same URL for both languages)
- Competitor: **Logicare** (logicare.lu) — €83/month billed annually, multi-profession generalist, no PID

## What to watch out for

- Profession pages have a large inline `<style>` block — keep it, it's intentional
- When updating shared content (pricing, timeline, FAQ, footer, navbar) across profession pages, update all 3 FR + 3 EN + 3 DE pages (9 total)
- The CNS invoicing guide hero (FR/EN/DE) uses the two-image composition from the homepage: `gestion-simple-factures.svg` full-width with `gestion-cabinet-professionels-sante-tableau-de-bord.svg` overlaid bottom-left at 25%
- No build step — push to `main` branch deploys to GitHub Pages automatically
- `robots.txt` disallows legal/policy pages — do not add guide/resource pages to the disallow list
- `lb/politik-iwwer-perseinlech-donneeen.html` — standalone Luxembourgish privacy policy, accessible only via email link
- `pt/politica-relativa-aos-dados-pessoais.html` — standalone Portuguese privacy policy, accessible only via email link, no navbar/footer navigation links pointing to it. Uses minimal header (logo only) and sg-footer for copyright.
- Every `.html` page now starts with a Jekyll front matter block (`---\n---`, empty unless the page also has `redirect_from`). Opening a page directly in a browser (no `bundle exec jekyll serve`) will show the raw front matter and the `{% include head.html %}` / `{% include body.html %}` tags as literal text — same known limitation that already existed for the 8 pages using `redirect_from`. Use a Jekyll build (or trust the GitHub Pages build) to see the real rendered output.
- **STALE, needs fixing:** the cookie/privacy policy pages (FR/EN/DE) still state that sigmund.lu sets no cookies and uses no analytics. That was true before GTM + the CookieConsent banner were added — it no longer is. These pages need a rewrite to describe actual cookie/analytics/ads usage before the site can be considered compliant; do not treat their current wording as accurate.
- **CookieConsent quirks found while styling the banner** (see `assets/css/cookieconsent-sigmund.css`): (1) `guiOptions.equalWeightButtons: true` makes the library apply the *same* class (and therefore color) to "Accept all" and "Reject all" — the `--cc-btn-secondary-*` tokens only reach "Personnaliser"/"Enregistrer mes choix", not "Reject all", regardless of `[data-role]`. (2) `--cc-link-color` only applies to elements with the library's own `.cc__link` class — plain `<a>` tags (like the footer privacy-policy link built in `cookieconsent-config.js`) don't get it automatically. (3) the library defaults `hideFromBots: true`, which checks `navigator.webdriver` and silently no-ops the entire banner (no error, promise resolves) in any automated/headless browser (e.g. Playwright) — pass `hideFromBots: false` or neutralize `navigator.webdriver` when testing it.
- Hero H1s on all main menu pages are in sentence case (not uppercase) — consistent with index.html
- Some HTML files previously had null bytes introduced by bulk PowerShell operations — stripped and resolved. All files are clean UTF-8

## Before proposing a commit

Always verify these files are up to date before staging a commit:

- **`sitemap.xml`** — add any new page (with full `hreflang` alternates). Do not add legal/policy pages (they are `noindex`). Also, for any *existing* indexable page whose content you modified (not just non-indexable pages), bump its `<lastmod>` to today's date — do this even if the change came from a shared file like `sigmund.css` and only touches how certain pages render. Always propose this update to the user before staging the commit, don't wait to be asked.
- **`robots.txt`** — check that no new indexable page is accidentally disallowed, and that no new legal/policy page needs to be added to the disallow list.
- **`llms.txt`** — update if pricing, team, offer, or site structure changed. H2 sections are for file lists only (`[name](url)` format); informational content goes as plain paragraphs (no H2).
- **`AGENTS.md`** — update the file structure, DE URL mapping, or any section that describes the pages or conventions you just changed.
- **`README.md`** — update the pages table if a new page was added or removed.

Some categories of change tend to get missed because they don't touch a page's visible content — check for these explicitly:

- **New shared `<head>`/`<body>` line** (script, meta tag, stylesheet, etc. meant to apply site-wide) — add it to `_includes/head.html` / `_includes/body.html`, never by editing individual pages one by one. Update the "Tech stack" and file-structure sections of `AGENTS.md` to describe what was added and why.
- **New or modified third-party script that sets cookies, tracks users, or loads analytics/ads** (GTM tags, consent tooling, embeds, etc.) — check whether the cookie policy and privacy policy pages (FR/EN/DE) still accurately describe what the site does. If they don't, say so explicitly before proposing the commit rather than shipping a mismatch silently — see the "STALE, needs fixing" note under "What to watch out for" for the current known gap.
- **New local-only dev tooling** (build scripts, linters, Docker configs, etc.) — add it to `_config.yml`'s `exclude` list so it isn't pulled into the Jekyll build, and document it in both `AGENTS.md` (Tech stack / file structure) and `README.md` (Running locally).
