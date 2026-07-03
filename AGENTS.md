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
en/cookie-policy.html
en/privacy-policy.html
en/legal-notice.html
en/blog/index.html                                Blog index (EN)
en/blog/gdpr-patient-records-luxembourg.html      GDPR and patient records guide (EN)

llms.txt                                          AI crawler description (FR/EN/DE — trilingual, root only)
assets/css/sigmund.css                            All custom styles (shared by all pages)
assets/js/main.js                                 Active nav-link highlight
assets/js/profession.js                           Contact form handler (Brevo fetch, validation, i18n via data-attributes)
assets/images/                                    All images (webp + svg)
  team-sylvain-perez.webp                         Team photo — downloaded from hippocrate.lu
  team-franck-amouyal.webp
  team-guillaume-desrat.webp
blog/index.html                                   Blog index (FR)
blog/rgpd-dossiers-patients-luxembourg.html       RGPD et dossiers patients guide (FR)

de/index.html                                     Homepage (DE)
de/psychiater.html
de/psychotherapeut.html
de/psychologe.html
de/preise.html                                    Pricing (DE)
de/team.html                                      Team page (DE)
de/cns-abrechnung.html                            CNS invoicing guide (DE)
de/direktzahlung.html                             PID guide (DE)
de/cookie-richtlinie.html
de/datenschutz.html
de/impressum.html
de/blog/index.html                                Blog index (DE)
de/blog/dsgvo-patientenakten-luxemburg.html       DSGVO und Patientenakten guide (DE)

favicon.ico
robots.txt
sitemap.xml
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

- **`.sg-navbar`** — sticky top navbar; active link gets `class="nav-link active"`
- **`.btn-sg-primary`** / **`.btn-sg-outline`** — pill-shaped CTA buttons
- **`.sg-hero`** — gradient hero section; `.sg-hero-img` has `border-radius: 16px` (homepages only — profession pages override with `border-radius: 0`)
- **`.sg-feat-list`** — checkmark feature list (CSS `::before` content); on mobile, forced `text-align: left; display: inline-block` to counteract the `.sg-hero { text-align: center }` rule
- **`.sg-picto-card`** — feature cards with icon + title + description
- **`.sg-carousel`** / **`.sg-carousel-track`** / **`.sg-carousel-slide`** — pure CSS scroll-snap carousel; JS inlined in each profession page
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
- The cookie policy pages state that sigmund.lu sets no cookies. The Sigmund app (app.sigmund.lu) may use essential session cookies — that distinction is maintained in both the cookie policy and privacy policy pages
- Hero H1s on all main menu pages are in sentence case (not uppercase) — consistent with index.html
- Some HTML files previously had null bytes introduced by bulk PowerShell operations — stripped and resolved. All files are clean UTF-8

## Before proposing a commit

Always verify these files are up to date before staging a commit:

- **`sitemap.xml`** — add any new page (with full `hreflang` alternates). Do not add legal/policy pages (they are `noindex`).
- **`robots.txt`** — check that no new indexable page is accidentally disallowed, and that no new legal/policy page needs to be added to the disallow list.
- **`llms.txt`** — update if pricing, team, offer, or site structure changed. H2 sections are for file lists only (`[name](url)` format); informational content goes as plain paragraphs (no H2).
- **`AGENTS.md`** — update the file structure, DE URL mapping, or any section that describes the pages or conventions you just changed.
- **`README.md`** — update the pages table if a new page was added or removed.
