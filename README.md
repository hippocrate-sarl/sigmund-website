# sigmund-website

Static marketing website for **[www.sigmund.lu](https://www.sigmund.lu)** — an administrative management application for mental health professionals (psychiatrists, psychotherapists, psychologists) practising in Luxembourg.

Developed and maintained by **Hippocrate Sàrl** (Bertrange, Luxembourg).

---

## Overview

Sigmund is a SaaS product that handles the administrative side of a private mental health practice: appointment scheduling, patient records, invoicing, CNS-format billing, PID (Paiement Immédiat Direct) management, unpaid invoice reminders, waiting list, session notes, prescriptions, and more.

This repository is the **public-facing marketing website** only. The production application runs at `app.sigmund.lu` (FR + EN). Demo request forms are at `demo.sigmund.lu` (FR) and `demo-en.sigmund.lu` (EN).

---

## Running locally

No build step required. Open any HTML file directly in a browser.

---

## Pages

| FR | EN | Description |
|---|---|---|
| `index.html` | `en/index.html` | Homepage |
| `solution-administrative-psychiatre.html` | `en/administrative-solution-psychiatrist.html` | Psychiatrist landing page |
| `solution-administrative-psychotherapeute.html` | `en/administrative-solution-psychotherapist.html` | Psychotherapist landing page |
| `solution-administrative-psychologue.html` | `en/administrative-solution-psychologist.html` | Psychologist landing page |
| `tarifs.html` | `en/pricing.html` | Pricing + Sigmund vs Logicare comparison |
| `equipe.html` | `en/team.html` | Team page (E-E-A-T) |
| `facturation-cns.html` | `en/cns-invoicing.html` | CNS invoicing guide |
| `paiement-immediat-direct.html` | `en/immediate-direct-payment.html` | PID (Immediate Direct Payment) guide |
| — | — | — |
| `de/index.html` | — | Homepage (DE) |
| `de/psychiater.html` | — | Psychiatrist landing page (DE) |
| `de/psychotherapeut.html` | — | Psychotherapist landing page (DE) |
| `de/psychologe.html` | — | Psychologist landing page (DE) |
| `de/preise.html` | — | Pricing (DE) |
| `de/team.html` | — | Team page (DE) |
| `de/cns-abrechnung.html` | — | CNS invoicing guide (DE) |
| `de/direktzahlung.html` | — | PID guide (DE) |
| `de/cookie-richtlinie.html` | — | Cookie policy (DE) |
| `de/datenschutz.html` | — | Privacy policy (DE) |
| `de/impressum.html` | — | Legal notice (DE) |
| — | — | — |
| `politique-en-matiere-de-cookies.html` | `en/cookie-policy.html` | Cookie policy |
| `politique-relative-aux-donnees-personnelles.html` | `en/privacy-policy.html` | Privacy policy |
| `mentions-legales.html` | `en/legal-notice.html` | Legal notice |

Legal pages are excluded from search engine indexing (`robots.txt` + `<meta name="robots" content="noindex">`).

The cookie policy pages reflect that sigmund.lu is a static site with no cookies. The Sigmund application (app.sigmund.lu) may still use essential session cookies — this distinction is documented in both the cookie policy and privacy policy.

---

## Assets

```
assets/
├── css/
│   └── sigmund.css           All custom styles shared by every page
├── js/
│   └── main.js               Cookie consent initialisation + active nav-link highlight
└── images/
    ├── team-sylvain-perez.webp
    ├── team-franck-amouyal.webp
    ├── team-guillaume-desrat.webp
    └── ...                   All other images (webp for photos, svg for illustrations)
```

---

## Tech stack

All dependencies are loaded from CDN — nothing to install.

| Library | Version | Purpose |
|---|---|---|
| Bootstrap | 5.3.3 | Layout, navbar, grid, utilities |
| Bootstrap Icons | 1.11.3 | Icons (`bi bi-*`) |
| flag-icons | 7.2.3 | Language switcher flags (`fi fi-*`) |
| Google Fonts — Inter | — | Body font (300–800) |

Contact forms submit via POST to `https://rake.red/to/a1b2c3d4`.

---

## SEO / GEO

- `sitemap.xml` — all indexable pages with `hreflang` alternates
- `llms.txt` + `en/llms.txt` — AI crawler description files (ChatGPT, Perplexity)
- `robots.txt` — disallows legal/policy pages; points to sitemap
- Every page has `<link rel="canonical">` and `<link rel="alternate" hreflang="...">` tags
- Open Graph meta tags on the homepage
- JSON-LD schemas: `Organization`, `SoftwareApplication`, `AggregateRating`, `FAQPage` (profession pages), `Person` (team page), `Article` (guide pages)

---

## Deployment

The site is hosted on **GitHub Pages**. Deploy by pushing to the `main` branch — no build, no compilation.

---

## Legal

- **Publisher:** Hippocrate Sàrl — RCS Luxembourg B282221
- **Director of publication:** Sylvain Perez
- **VAT:** LU35353830
- **Registered office:** 11 rue des Aubépines, L-8052 Bertrange, Luxembourg
- **Hosting (website):** GitHub Pages — GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA (subject to CLOUD Act — GDPR DPA available, contact: dpo@github.com)
- **Image credits:** Freepik (premium licence) and iStock (licence agreement)
- **Design:** [studio e-conique](https://www.e-conique.com/)
- Copyright 2024–2026 © Hippocrate Sàrl — All rights reserved
