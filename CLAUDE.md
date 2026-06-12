# Sigmund Website

Static marketing website for **www.sigmund.lu** — an administrative management SaaS app for mental health professionals in Luxembourg (psychiatrists, psychotherapists, psychologists).

Developed by **Hippocrate Sàrl** (Bertrange, Luxembourg). Team: Sylvain Perez, Franck Amouyal, Guillaume Desrat.

## Tech stack

- Plain HTML/CSS/JS — no build tool, no framework, no bundler
- **Bootstrap 5.3** (CDN) — layout and components
- **Bootstrap Icons 1.11** (CDN) — icons via `<i class="bi bi-*">`
- **flag-icons 7.2** (CDN) — language switcher flags via `<span class="fi fi-*">`
- **vanilla-cookieconsent 3** (CDN) — GDPR cookie banner
- **Google Fonts** — Inter (300/400/500/600/700/800)
- Contact forms POST to `https://rake.red/to/a1b2c3d4`

## File structure

```
index.html                                        Homepage (FR)
solution-administrative-psychiatre.html           Psychiatrist landing page (FR)
solution-administrative-psychotherapeute.html     Psychotherapist landing page (FR)
solution-administrative-psychologue.html          Psychologist landing page (FR)
tarifs.html                                       Pricing + Sigmund vs Logicare (FR)
equipe.html                                       Team page — E-E-A-T (FR)
facturation-cns.html                              CNS invoicing guide (FR)
paiement-immediat-direct.html                     PID guide (FR)
politique-en-matiere-de-cookies.html              Cookie policy (FR)
politique-relative-aux-donnees-personnelles.html  Privacy policy (FR)
mentions-legales.html                             Legal notice (FR)

en/index.html                                     Homepage (EN)
en/administrative-solution-psychiatrist.html
en/administrative-solution-psychotherapist.html
en/administrative-solution-psychologist.html
en/pricing.html                                   Pricing (EN)
en/team.html                                      Team page (EN)
en/cns-invoicing.html                             CNS invoicing guide (EN)
en/immediate-direct-payment.html                  PID guide (EN)
en/cookie-policy.html
en/privacy-policy.html
en/legal-notice.html

llms.txt                                          AI crawler description (FR)
en/llms.txt                                       AI crawler description (EN)
assets/css/sigmund.css                            All custom styles (shared by all pages)
assets/js/main.js                                 Cookie consent init + active nav-link highlight
assets/images/                                    All images (webp + svg)
  team-sylvain-perez.webp                         Team photo — downloaded from hippocrate.lu
  team-franck-amouyal.webp
  team-guillaume-desrat.webp
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

All custom classes use the `sg-` prefix. The three profession landing pages also include a `<style>` block inline for page-specific overrides — keep that pattern when adding new profession pages.

**Important CSS cascade note:** properties defined in `sigmund.css` apply to ALL pages including profession pages. The profession pages' inline `<style>` blocks only override properties they explicitly redeclare. If you add a new property to a shared class in `sigmund.css`, verify it doesn't unintentionally affect profession pages.

## Key components (sigmund.css)

- **`.sg-navbar`** — sticky top navbar; active link gets `class="nav-link active"`
- **`.btn-sg-primary`** / **`.btn-sg-outline`** — pill-shaped CTA buttons
- **`.sg-hero`** — gradient hero section; `.sg-hero-img` has `border-radius: 16px` (homepages only — profession pages override with `border-radius: 0`)
- **`.sg-feat-list`** — checkmark feature list (CSS `::before` content)
- **`.sg-picto-card`** — feature cards with icon + title + description
- **`.sg-carousel`** / **`.sg-carousel-track`** / **`.sg-carousel-slide`** — pure CSS scroll-snap carousel; JS inlined in each profession page
- **`.sg-pricing`** — pricing card (white box on gradient background)
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

## Bilingual structure

Every FR page has a matching EN counterpart. Language switcher in navbar and footer links between them. Cookie consent language is auto-detected from `<html lang="...">`.

FR pages: assets at `assets/`, links relative from root (e.g. `href="en/index.html"`).
EN pages: assets at `../assets/`, links relative from `en/` (e.g. `href="../index.html"`).

## SEO / GEO

- `llms.txt` (FR) + `en/llms.txt` (EN) — AI crawler files for ChatGPT, Perplexity
- JSON-LD on homepage: `Organization` + `SoftwareApplication` + `AggregateRating` (4.9/5, 8 reviews)
- JSON-LD on profession pages: `FAQPage` (6 Q&A each, adapted per profession for PID)
- JSON-LD on team page: `Person` × 3 (with LinkedIn `sameAs`)
- JSON-LD on tarifs/pricing: `SoftwareApplication` + `Offer` + `eligibleRegion: Luxembourg`
- JSON-LD on guide pages: `Article` (with `datePublished`, `dateModified`)
- E-E-A-T badges on homepage hero: "Fondé en 2013", "Données hébergées au Luxembourg", "+50 professionnels"
- GEO-citable openings on profession pages: 20% admin time stat (Ordre national des médecins)

## Important domain knowledge

- **CNS** = Caisse Nationale de Santé (Luxembourg national health fund)
- **PID** = Paiement Immédiat Direct (CNS pays practitioner directly). Psychiatrists: available now at +€45/month. Psychotherapists: coming soon. Psychologists: not applicable.
- **Psychotherapy reimbursement**: started in 2023 in Luxembourg — psychotherapists can now invoice CNS
- Base subscription: **€90/month**, no commitment, 15-day free trial
- Data stored in Luxembourg (Gandi SAS datacenter in Bissen), subject to Luxembourg law + GDPR
- Demo app FR: `https://demo.sigmund.lu/` — EN: `https://demo-en.sigmund.lu/`
- Competitor: **Logicare** (logicare.lu) — €83/month billed annually, multi-profession generalist, no PID

## What to watch out for

- Profession pages have a large inline `<style>` block — keep it, it's intentional
- When updating shared content (pricing, timeline, FAQ, footer, navbar) across profession pages, update all 3 FR pages AND their 3 EN counterparts
- The `facturation-cns.html` hero uses `gestion-simple-factures.svg` as a placeholder — replace with a real photo when available
- No build step — changes to HTML/CSS/JS files are deployed directly
- `robots.txt` disallows legal/policy pages — do not add guide/resource pages to the disallow list
