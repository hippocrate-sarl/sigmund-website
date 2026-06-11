# Sigmund Website

Static marketing website for **www.sigmund.lu** — an administrative management SaaS app for mental health professionals in Luxembourg (psychiatrists, psychotherapists, psychologists).

Developed by **Hippocrate Sàrl** (Bertrange, Luxembourg). Team: Guillaume, Sylvain, Franck.

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
index.html                                  Homepage (FR)
solution-administrative-psychiatre.html     Psychiatrist landing page (FR)
solution-administrative-psychotherapeute.html  Psychotherapist landing page (FR)
solution-administrative-psychologue.html    Psychologist landing page (FR)
politique-en-matiere-de-cookies.html        Cookie policy (FR)
politique-relative-aux-donnees-personnelles.html  Privacy policy (FR)
mentions-legales.html                       Legal notice (FR)

en/index.html                               Homepage (EN)
en/administrative-solution-psychiatrist.html
en/administrative-solution-psychotherapist.html
en/administrative-solution-psychologist.html
en/cookie-policy.html
en/privacy-policy.html
en/legal-notice.html

assets/css/sigmund.css      All custom styles (shared by all pages)
assets/js/main.js           Cookie consent init + active nav-link highlight
assets/images/              All images (webp + svg)
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

## Key components

- **`.sg-navbar`** — sticky top navbar; active link gets `class="nav-link active"`
- **`.btn-sg-primary`** / **`.btn-sg-outline`** — pill-shaped CTA buttons
- **`.sg-hero`** — gradient hero section
- **`.sg-feat-list`** — checkmark feature list (CSS `::before` content)
- **`.sg-picto-card`** — feature cards with icon + title + description
- **`.sg-carousel`** / **`.sg-carousel-track`** / **`.sg-carousel-slide`** — pure CSS scroll-snap carousel with dots and prev/next buttons; JS for the carousel is inlined in each profession page
- **`.sg-pricing`** — pricing card (white box on gradient background)
- **`.sg-soon-card`** — "coming soon" feature cards
- **`.sg-timeline`** — vertical timeline (company history)
- **`.sg-faq`** — native `<details>`/`<summary>` accordion
- **`.sg-footer`** — dark footer (`#1a1a2e`)

## Bilingual structure

Every FR page has a matching EN counterpart. Language switcher in navbar and footer links between them. Cookie consent language is auto-detected from `<html lang="...">`.

FR pages link to EN with relative paths (e.g. `href="en/index.html"`).
EN pages link back to FR with `href="../index.html"` etc.

## Important domain knowledge

- **CNS** = Caisse Nationale de Santé (Luxembourg national health fund)
- **PID** = Paiement Immédiat Direct (direct reimbursement from CNS to practitioner, bypassing patient advance payment). Psychiatrists: available now at €45/month. Psychotherapists: coming soon. Psychologists: not applicable.
- Base subscription: **€90/month**, no commitment, 15-day free trial
- Data stored in Luxembourg, subject to Luxembourg law + GDPR
- Demo app: `https://demo.sigmund.lu/`

## What to watch out for

- The profession pages duplicate a large `<style>` block and the carousel JS inline — this is intentional, each page is self-contained
- Do not use `var(--sg-border)` inside the inline `<style>` blocks of profession pages — that variable is defined in `sigmund.css` and available globally, but the inline blocks sometimes reference it without defining it locally (`.sg-soon-card` border uses it)
- When updating content that appears across all profession pages (pricing, timeline, FAQ, coming-soon features, footer), update all three FR pages and their three EN counterparts
- No build step — changes to HTML/CSS/JS files are deployed directly
