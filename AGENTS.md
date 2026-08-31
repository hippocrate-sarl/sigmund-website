# Sigmund Website

Static marketing website for **www.sigmund.lu** — an administrative management SaaS app for mental health professionals in Luxembourg (psychiatrists, psychotherapists, psychologists).

Developed by **Hippocrate Sàrl** (Bertrange, Luxembourg). Team: Sylvain Perez, Franck Amouyal, Guillaume Desrat.

## Tech stack

- Plain HTML/CSS/JS — no build tool, no framework, no bundler
- **Bootstrap 5.3** (CDN) — layout and components
- **Bootstrap Icons 1.11** (CDN) — icons via `<i class="bi bi-*">`
- **flag-icons 7.2** (CDN) — language switcher flags via `<span class="fi fi-*">`
- **Google Fonts** — Inter (300/400/500/600/700/800)
- Lead-capture forms (the profession-page contact forms, and the `reserver.html` fallback form) POST natively to Brevo (sibforms.com) into a hidden iframe, handled by the shared `assets/js/lead-form.js` (validation, iframe-load success/error detection, `generate_lead` dataLayer push)
- **Google Tag Manager** (container `GTM-TZPN6B4R`) — loaded via two Jekyll includes on every page: `_includes/head.html` (script, first line inside `<head>`; also the place for any other shared `<head>` lines) and `_includes/body.html` (`<noscript>` fallback, first line inside `<body>`; also the place for any other shared lines right after `<body>`). GitHub Pages already builds the site with Jekyll (see `_config.yml`, used previously for the `jekyll-redirect-from` plugin), so every `.html` page now carries a front matter block (even if empty) so Jekyll processes these include tags. `AGENTS.md` and `README.md` are excluded from the Jekyll build (see `_config.yml`) — the Liquid syntax in this file's prose is never evaluated.
- **`_includes/footer-contact.html`** — the footer's "Contact" column (email, phones, address, social links), included on all 42 pages that have a full 3-column footer via `{%- include footer-contact.html lang="fr|en|de" -%}`. `lang` picks the FR/EN "Contact" vs. DE "Kontakt" heading. Only this column is an include — the rest of the footer (language switcher, "Ressources"/nav links) varies too much per page (different relative depth *and* a different target filename per language per page) to genericize the same way without a lot of extra Liquid parameters, so it's still hand-duplicated per page. The Qwice link uses `bi-globe2` (a generic Bootstrap Icons glyph) followed by the text "Qwice", matching the LinkedIn/Facebook/Instagram pattern exactly — there's no Bootstrap Icons brand glyph for Qwice, and an earlier attempt at self-hosting Qwice's own logo (as a plain `<img>`, then as a CSS mask) was abandoned as visually inconsistent with the rest of the column.
- **Google Consent Mode v2** — default state (all storage `denied` except `security_storage`) is set inline at the top of `_includes/head.html`, before the GTM snippet loads. `assets/js/cookieconsent-config.js` calls `gtag('consent', 'update', ...)` on `onFirstConsent`/`onConsent`/`onChange` to grant `analytics_storage`/`ad_storage`/`ad_user_data`/`ad_personalization` once the visitor opts in via the banner.
- **CookieConsent v3.1.0** (self-hosted, [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent)) — the cookie-consent banner. `assets/js/cookieconsent.esm.js` is the vendored library (do not hand-edit; replace wholesale to upgrade), `assets/js/cookieconsent-config.js` holds the `CookieConsent.run({...})` config with full FR/EN/DE translations, `assets/css/cookieconsent.css` is the library's own stylesheet, `assets/css/cookieconsent-sigmund.css` is the Sigmund brand override (all four loaded from `_includes/head.html`/`body.html`, see [What to watch out for](#what-to-watch-out-for) for known quirks).
- **Local dev tooling** — `Gemfile`/`Gemfile.lock` pin the same `github-pages` gem set GitHub Pages builds with; `serve.sh` runs `bundle exec jekyll serve` inside a `ruby:3.3` Docker container, so no local Ruby install is needed. This is local-only — `_config.yml`'s `exclude` list keeps it out of the actual Jekyll build. (The repo was developed on Windows via a `serve.cmd` counterpart; now that the dev environment is WSL2, `serve.cmd` was removed and `serve.sh` is the only local runner.)

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
reserver.html                                      Demo booking page — embeds Microsoft Bookings via iframe (FR; see en/book.html and de/buchen.html for EN/DE)
politique-en-matiere-de-cookies.html              Cookie policy (FR)
politique-relative-aux-donnees-personnelles.html  Privacy policy (FR)
mentions-legales.html                             Legal notice (FR)
slp-2026.html                                     SLP 2026 newsletter campaign landing page (FR; see en/slp-2026.html and de/slp-2026.html for EN/DE) — standalone, not in navbar/footer, noindex, not in sitemap.xml, disallowed in robots.txt, offer expires 2026-10-31

en/index.html                                     Homepage (EN)
en/psychiatrist.html
en/psychotherapist.html
en/psychologist.html
en/pricing.html                                   Pricing (EN)
en/team.html                                      Team page (EN)
en/cns-invoicing.html                             CNS invoicing guide (EN)
en/immediate-direct-payment.html                  PID guide (EN)
en/setting-up-as-a-psychologist-in-luxembourg.html  Installation guide for psychologists/psychotherapists (EN)
en/book.html                               Demo booking page — embeds Microsoft Bookings via iframe (EN)
en/cookie-policy.html
en/privacy-policy.html
en/legal-notice.html
en/slp-2026.html                                  SLP 2026 newsletter campaign landing page (EN) — standalone, see slp-2026.html
en/blog/index.html                                Blog index (EN)

llms.txt                                          AI crawler description (FR/EN/DE — trilingual, root only)
_includes/head.html                               Shared <head> snippet (GTM + Consent Mode default + CookieConsent stylesheets + other head lines), included in <head> of every page
_includes/body.html                               Shared post-<body> snippet (GTM noscript fallback + CookieConsent script + other lines), included right after <body> of every page
_includes/footer-contact.html                     Shared footer "Contact" column (email, phones, address, social links incl. Qwice), included on all pages with a full footer, parameterized by lang ("fr"/"en"/"de") and rel (relative path prefix to assets/)
assets/css/sigmund.css                            All custom styles (shared by all pages)
assets/css/slp-2026.css                           Styles used only by slp-2026.html/en/slp-2026.html/de/slp-2026.html (.sg-slp-* classes) — kept out of sigmund.css so no other page loads them
assets/css/cookieconsent.css                      CookieConsent v3.1.0 library stylesheet (vendored, do not hand-edit)
assets/css/cookieconsent-sigmund.css              Sigmund brand override for the CookieConsent banner (#cc-main scoped)
assets/js/main.js                                 Active nav-link highlight
assets/js/sg-carousel.js                          Shared CSS scroll-snap carousel logic (testimonials, etc.) — used on the homepage and all profession pages
assets/js/lead-form.js                            Shared lead-capture form handler (Brevo, validation, i18n via data-attributes) — used by the profession-page contact forms (data-form-id="contact") and the reserver.html fallback form (data-form-id="secours")
assets/js/cookieconsent.esm.js                    CookieConsent v3.1.0 library (vendored, do not hand-edit)
assets/js/cookieconsent-config.js                 CookieConsent config: categories, FR/EN/DE translations, Google Consent Mode v2 bridge
assets/js/booking-frame.js                        Click-to-load Microsoft Bookings iframe, gated on the "bookings" service (thirdparty category) — used on reserver.html/en/book.html/de/buchen.html
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
de/buchen.html                               Demo booking page — embeds Microsoft Bookings via iframe (DE)
de/cookie-richtlinie.html
de/datenschutz.html
de/impressum.html
de/slp-2026.html                                  SLP 2026 newsletter campaign landing page (DE) — standalone, see slp-2026.html
de/blog/index.html                                Blog index (DE)

favicon.ico
robots.txt
sitemap.xml

Gemfile / Gemfile.lock                            Local Jekyll dev dependencies (matches GitHub Pages' gem set) — excluded from the Jekyll build itself
serve.sh                                           Run Jekyll locally via Docker (Linux/macOS/WSL2) — excluded from the Jekyll build itself
```

## CSS conventions

Custom CSS lives in `assets/css/sigmund.css`. The one exception is `assets/css/slp-2026.css`, which holds the `.sg-slp-*` classes used only by `slp-2026.html`, `en/slp-2026.html` and `de/slp-2026.html` — split out into its own file (loaded only on those 3 pages) so the other ~40 pages of the site don't pull in CSS they never use for a temporary campaign page. If a class is ever needed by more pages beyond this trio, move it back into `sigmund.css`. CSS variables are defined in `:root`:

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
3. **Contact** — email, phones, address, social links (LinkedIn, Facebook, Instagram, Qwice) — rendered via the `_includes/footer-contact.html` include (see Tech stack / file structure above), not hand-duplicated per page

When adding a new resource page, add its link to the "Ressources" sub-section in the footer of **all** existing pages (FR and EN separately).

When adding a new footer social link, add it once to `_includes/footer-contact.html` instead of editing every page.

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

Every demo-booking CTA, across FR/EN/DE, now points to an on-site page embedding the Microsoft Bookings iframe (`reserver.html` / `en/book.html` / `de/buchen.html`) instead of the old external `demo(-en/-de).sigmund.lu` forms, with `target`/`rel` dropped since these are internal links now. Every one of these links carries `data-cta="book"` plus a `data-cta-pos` describing where on the page it sits, for GTM click tracking:

- `nav-mobile` / `nav-desktop` — navbar CTA (compact mobile version / full desktop version)
- `hero` — hero section button
- `social-proof` — homepage-only banner ("Vos consœurs et confrères...")
- `mid-cta` — profession-page-only banner after the picto features, before testimonials
- `pricing` — button inside the pricing/options card
- `final-cta` — last CTA banner before the contact form (profession pages, tarifs/pricing, guide pages)
- `summary` — inline text link inside the installation guide's "En résumé" paragraph (kept as an inline link, not a button)
- `slp-2026` — the final CTA button on `slp-2026.html`/`en/slp-2026.html`/`de/slp-2026.html` (SLP newsletter campaign landing page); its earlier hero-section CTA on the same pages uses the existing `hero` value

When adding a new demo-booking link anywhere on the site, tag it with both attributes following this taxonomy, across all 3 languages.

## GTM tracking on contact form submissions

`assets/js/lead-form.js` pushes a `generate_lead` event to `window.dataLayer` once a Brevo lead form (`#sg-form`) confirms success (iframe `load`), with `form_id` taken from the form's `data-form-id` attribute — every `#sg-form` on the site must set this attribute explicitly (`"contact"` on the profession-page contact forms, `"secours"` on the `reserver.html` fallback form); there is no default fallback, so a form that omits it pushes `form_id: undefined`, which is meant to surface as a visible bug in GTM/GA4 rather than being silently miscategorized as `"contact"`. This feeds a GA4 event via the existing GTM container — no new cookies are set, it rides on the `analytics_storage` consent already granted through Consent Mode.

## Important domain knowledge

- **CNS** = Caisse Nationale de Santé (Luxembourg national health fund)
- **PID** = Paiement Immédiat Direct (CNS pays practitioner directly). Psychiatrists: available now, offered free of charge. Psychotherapists: coming soon, will also be offered free of charge once the CNS opens the service. Psychologists: not applicable.
- **Psychotherapy reimbursement**: started in 2023 in Luxembourg — psychotherapists can now invoice CNS
- Base subscription: **€90/month**, no commitment, 15-day free trial
- Data stored in Luxembourg (Gandi SAS datacenter in Bissen), subject to Luxembourg law + GDPR
- Demo booking, on-site in all 3 languages, each with its own Microsoft Bookings calendar/iframe — FR: `reserver.html` (`.../book/DmoSigmund@sigmund.lu/...`) — EN: `en/book.html` (`.../book/SigmundbyHippocrate@sigmund.lu/...`) — DE: `de/buchen.html` (`.../book/SigmundvonHippocrate1@sigmund.lu/...`). CTA buttons throughout the site.
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
- `slp-2026.html` / `en/slp-2026.html` / `de/slp-2026.html` — standalone, trilingual campaign landing page for the SLP (Société Luxembourgeoise de Psychologie) 2026 newsletter offer (3 months free, code `SLP-2026`, expires 2026-10-31). `noindex` on all 3, not in `sitemap.xml`, disallowed in `robots.txt` (same treatment as the trilingual cookie-policy/privacy-policy/legal-notice noindex pages — not the single-language `lb`/`pt` treatment, which skips `robots.txt`), no navbar/footer links on the rest of the site pointing to them — accessible only via the URL shared in the newsletter (or, for EN/DE, via the language switcher on the FR page). Unlike the `lb`/`pt` legal pages they keep the full standard navbar/footer (not a minimal header) since the page is designed to "stand alone" when forwarded between colleagues who never saw the newsletter — and, being fully trilingual, they DO carry the normal FR/EN/DE language switcher (navbar + footer) and `hreflang` alternates between the three, same as any other trilingual page. Its visual system (`.sg-slp-*` classes in `assets/css/slp-2026.css`, loaded only on these 3 pages) intentionally does not use the site's `--sg-primary` blue — it matches the newsletter's own palette (`#1A1A2E` navy, `#F5A623` gold, `#2E6FD9` blue) for immediate recognition by someone arriving from the email. Each language's two testimonials reuse the official translations already published elsewhere on the site (homepage/profession pages) rather than being freshly translated, and were deliberately chosen to not duplicate the ones already on `reserver.html`/`en/book.html`/`de/buchen.html` (Magali Cahen, Catherine Hausherr), since both CTAs on this page send the visitor straight to the localized booking page next. It intentionally has exactly two CTA buttons per language (same label in that language, both `data-cta="book"`): one right under the offer card in the hero for visitors already convinced by the newsletter who just want the booking link, one at the very end for those who read the whole page — plus the sticky navbar CTA present on every page. Don't add more; on a page aimed at a skeptical professional audience, repeating the CTA further reads as pushy rather than persuasive. Consider removing or archiving the pages after the offer expires.
- Every `.html` page now starts with a Jekyll front matter block (`---\n---`, empty unless the page also has `redirect_from`). Opening a page directly in a browser (no `bundle exec jekyll serve`) will show the raw front matter and the `{% include head.html %}` / `{% include body.html %}` tags as literal text — same known limitation that already existed for the 8 pages using `redirect_from`. Use a Jekyll build (or trust the GitHub Pages build) to see the real rendered output.
- The cookie policy pages (FR/EN/DE) and privacy policy pages (FR/EN/DE + the standalone LB/PT pages) have all been rewritten to describe actual cookie/analytics/ads usage (GTM, Consent Mode, CookieConsent banner, Google Ireland Limited as sub-processor) — this was previously stale (pages claimed no cookies/no analytics) and the LB/PT pages were initially missed when FR/EN/DE were fixed, so double-check LB/PT specifically whenever this content changes again (see the checklist item below).
- **CookieConsent quirks found while styling the banner** (see `assets/css/cookieconsent-sigmund.css`): (1) `guiOptions.equalWeightButtons: true` makes the library apply the *same* class (and therefore color) to "Accept all" and "Reject all" — the `--cc-btn-secondary-*` tokens only reach "Personnaliser"/"Enregistrer mes choix", not "Reject all", regardless of `[data-role]`. (2) `--cc-link-color` only applies to elements with the library's own `.cc__link` class — plain `<a>` tags (like the footer privacy-policy link built in `cookieconsent-config.js`) don't get it automatically. (3) the library defaults `hideFromBots: true`, which checks `navigator.webdriver` and silently no-ops the entire banner (no error, promise resolves) in any automated/headless browser (e.g. Playwright) — pass `hideFromBots: false` or neutralize `navigator.webdriver` when testing it.
- Hero H1s on all main menu pages are in sentence case (not uppercase) — consistent with index.html
- Some HTML files previously had null bytes introduced by bulk PowerShell operations — stripped and resolved. All files are clean UTF-8
- `reserver.html` (FR), `en/book.html` (EN) and `de/buchen.html` (DE) are the only pages on the site that embed a third-party iframe (Microsoft Bookings). The iframe is click-gated: the page shows a `.sg-booking-placeholder` (icon + button + a small italic `.sg-booking-consent-note` explaining the cookies, below the button) instead of the iframe until the visitor clicks the button ("Réserver mon créneau maintenant" / "Book my slot now" / "Termin jetzt buchen") — `assets/js/booking-frame.js` then injects it and calls `CookieConsent.acceptService('bookings', 'thirdparty')`. Returning visitors who already accepted that service get the iframe loaded automatically (no re-click). This exists because a real cookie audit of the Bookings widget turned up 3 cookies (`MC1`, `MS0`, `MSFPC`) that are Microsoft's own cross-site analytics cookies, not scoped to the booking function — not defensible as "strictly necessary," hence the opt-in `thirdparty` category + `bookings` service in `cookieconsent-config.js` rather than the `necessary` category used elsewhere. The cookie policy and privacy policy pages in all 3 languages, plus the standalone LB/PT privacy pages, disclose this (with a dated cookie snapshot, since Microsoft can change these without notice) — keep all of them in sync if the booking mechanism or its cookies change.
- Page layout on all 3 booking pages, top to bottom: `.sg-legal-header` (H1 states the demo length and the 15-day trial up front, e.g. "Réservez votre démonstration — 60 minutes, puis 15 jours d'essai gratuit"), a `.sg-contact-heading` ("Ce qu'il faut savoir avant de réserver" / "What to know before you book" / "Was Sie vor der Buchung wissen sollten") followed by a 3-item `.sg-feat-list.sg-booking-reassurance` (what the demo covers / who runs it / what happens next), the `.sg-booking-wrap` widget itself (full-bleed, sibling of the surrounding `.container`s so it isn't squeezed to column width) — all inside one `.sg-section` — then a separate `.sg-section.sg-section-alt` section for the two named testimonials in `.sg-booking-testimonials` (`.sg-carousel-slide` cards reused outside the carousel) — Magali Cahen and Catherine Hausherr, with the exact translated quotes already used in the EN/DE homepage carousels, kept in sync if those quotes ever change — and finally a fallback contact form (see below, plain white `.sg-section`) for visitors who'd rather be called back than pick a slot themselves. The testimonials section uses `sg-section-alt` (the same light-blue `--sg-light-bg` band used behind the FAQ section on profession pages) specifically so the white fallback-form section right after it reads as a distinct, standalone block rather than blending into the page.
- **Fallback contact form on `reserver.html`/`en/book.html`/`de/buchen.html`** (FR/EN/DE, same as any other trilingual page) — sits in its own `.sg-section` after the testimonials, reusing the exact same markup/classes as the profession-page contact form (`sg-contact-form`, `sg-form-panel`, `form__entry`, `sg-field-error`, `sg-honeypot`) and the shared `assets/js/lead-form.js` handler, but with only 3 fields instead of 5: `NOM` (required), `EMAIL` (required — using `id="EMAIL"` means `lead-form.js`'s email-format check applies here too, same as on the profession-page contact forms), and `MESSAGE` (optional, "Votre message"/"Your message"/"Ihre Nachricht"). `data-form-id="secours"` (kept untranslated across all 3 languages, like `data-form-id="contact"` on the profession pages) distinguishes its `generate_lead` events from the profession pages' `data-form-id="contact"`. All 3 language variants POST to the same Brevo form action URL, distinguished only by the existing hidden `locale` field — same pattern as the profession-page contact forms sharing one Brevo list across FR/EN/DE.
- The Microsoft Bookings iframe on these three booking pages refuses to load over plain HTTP — `bundle exec jekyll serve` alone isn't enough to preview it locally. Tunnel it through `cloudflared` first (see README.md's "Testing the Microsoft Bookings iframe" section for install + usage instructions on Windows/Ubuntu). This isn't an issue in production since GitHub Pages serves the site over HTTPS.
- `.sg-booking-frame`'s height (in `sigmund.css`) is a hand-tuned fixed pixel value (desktop and a taller one under the mobile breakpoint), not something computed automatically. Because the Bookings iframe is cross-origin, there's no JS API to read its actual content height and auto-size the frame — the values were picked by visually checking, through the `cloudflared` tunnel, that the widget's own internal scrollbar disappears without leaving a big empty gap at the bottom. Re-check both breakpoints visually if you touch this again. This also means the short confirmation screen shown after a successful booking leaves a large empty gap below it inside the fixed-height frame, and there's no way to shrink the frame dynamically for it: confirmed by testing that Bookings sends no `postMessage` to the parent window, and swaps in the confirmation screen via client-side routing rather than a full navigation, so the iframe's own `load` event never re-fires either. Reducing the fixed height would shrink the gap but reintroduce an internal scrollbar during the normal multi-step slot selection — a trade-off deliberately left as-is for now.

## Before proposing a commit

Always verify these files are up to date before staging a commit:

- **`sitemap.xml`** — add any new page (with full `hreflang` alternates). Do not add legal/policy pages (they are `noindex`). Also, for any *existing* indexable page whose content you modified (not just non-indexable pages), bump its `<lastmod>` to today's date — do this even if the change came from a shared file like `sigmund.css` and only touches how certain pages render. Always propose this update to the user before staging the commit, don't wait to be asked.
- **`robots.txt`** — check that no new indexable page is accidentally disallowed, and that no new legal/policy page needs to be added to the disallow list. **Rule of thumb: any new page carrying `<meta name="robots" content="noindex">` needs a matching `Disallow` entry in `robots.txt`, one per language variant it has (FR/EN/DE).** The only exception is a page that is deliberately single-language and outside the trilingual structure (the `lb`/`pt` standalone privacy pages) — those rely on `noindex` alone, with no `robots.txt` entry, precisely because there's no sibling-language version to keep in sync. A page that starts single-language and later gains EN/DE siblings (as happened with `slp-2026.html`) needs its `robots.txt` entries added at that point — don't assume the original single-language noindex setup is still complete once siblings exist.
- **`llms.txt`** — update if pricing, team, offer, or site structure changed. H2 sections are for file lists only (`[name](url)` format); informational content goes as plain paragraphs (no H2).
- **`AGENTS.md`** — update the file structure, DE URL mapping, or any section that describes the pages or conventions you just changed.
- **`README.md`** — update the pages table if a new page was added or removed.

Some categories of change tend to get missed because they don't touch a page's visible content — check for these explicitly:

- **New shared `<head>`/`<body>` line** (script, meta tag, stylesheet, etc. meant to apply site-wide) — add it to `_includes/head.html` / `_includes/body.html`, never by editing individual pages one by one. Update the "Tech stack" and file-structure sections of `AGENTS.md` to describe what was added and why.
- **New or modified third-party script that sets cookies, tracks users, or loads analytics/ads** (GTM tags, consent tooling, embeds, etc.) — check whether the cookie policy and privacy policy pages (FR/EN/DE, **and** the standalone `lb/politik-iwwer-perseinlech-donneeen.html` + `pt/politica-relativa-aos-dados-pessoais.html` privacy pages) still accurately describe what the site does. LB/PT are easy to miss since they carry no navbar/footer links and aren't part of the trilingual FR/EN/DE structure — they were missed the first time this section was rewritten. If any of them don't match, say so explicitly before proposing the commit rather than shipping a mismatch silently.
- **New local-only dev tooling** (build scripts, linters, Docker configs, etc.) — add it to `_config.yml`'s `exclude` list so it isn't pulled into the Jekyll build, and document it in both `AGENTS.md` (Tech stack / file structure) and `README.md` (Running locally).
- **A `noindex` page gaining EN/DE siblings** — when a single-language `noindex` page (like `slp-2026.html` originally was) gets translated and becomes a trilingual set, its de-indexing setup needs re-checking as a whole, not just extended by analogy. This was missed once already: `slp-2026.html`'s `robots.txt` entry was never added in the first place (the single-language version correctly skipped it, following the `lb`/`pt` pattern), and when EN/DE siblings were added, the gap wasn't caught until the user asked why the pages didn't look de-indexed — at which point all 3 needed `Disallow` entries added retroactively, matching the treatment already used for the cookie-policy/privacy-policy/legal-notice noindex pages. Whenever `noindex` and "not linked from nav/footer" are both true for a page, treat `sitemap.xml` exclusion, `robots.txt` disallow, and the absence of nav/footer links as one bundle to verify together — not three separate, easy-to-partially-do checks.
