# sigmund-website

Static marketing website for **[www.sigmund.lu](https://www.sigmund.lu)** — an administrative management application for mental health professionals (psychiatrists, psychotherapists, psychologists) practising in Luxembourg.

Developed and maintained by **Hippocrate Sàrl** (Bertrange, Luxembourg).

---

## Overview

Sigmund is a SaaS product that handles the administrative side of a private mental health practice: appointment scheduling, patient records, invoicing, CNS-format billing, PID (Paiement Immédiat Direct) management, unpaid invoice reminders, waiting list, session notes, prescriptions, and more.

This repository is the **public-facing marketing website** only. The production application runs at `app.sigmund.lu` (FR + EN). Demo request forms are at `demo.sigmund.lu` (FR), `demo-en.sigmund.lu` (EN) and `demo-de.sigmund.lu` (DE).

---

## Running locally

No build step required. Open any HTML file directly in a browser.

---

## Pages

| FR | EN | DE | Description |
|---|---|---|---|
| `index.html` | `en/index.html` | `de/index.html` | Homepage |
| `psychiatre.html` | `en/psychiatrist.html` | `de/psychiater.html` | Psychiatrist landing page |
| `psychotherapeute.html` | `en/psychotherapist.html` | `de/psychotherapeut.html` | Psychotherapist landing page |
| `psychologue.html` | `en/psychologist.html` | `de/psychologe.html` | Psychologist landing page |
| `tarifs.html` | `en/pricing.html` | `de/preise.html` | Pricing + Sigmund vs Logicare comparison |
| `equipe.html` | `en/team.html` | `de/team.html` | Team page (E-E-A-T) |
| `facturation-cns.html` | `en/cns-invoicing.html` | `de/cns-abrechnung.html` | CNS invoicing guide |
| `paiement-immediat-direct.html` | `en/immediate-direct-payment.html` | `de/direktzahlung.html` | PID (Immediate Direct Payment) guide |
| `blog/index.html` | `en/blog/index.html` | `de/blog/index.html` | Blog index |
| `blog/rgpd-dossiers-patients-luxembourg.html` | `en/blog/gdpr-patient-records-luxembourg.html` | `de/blog/dsgvo-patientenakten-luxemburg.html` | GDPR and patient records guide |
| `politique-en-matiere-de-cookies.html` | `en/cookie-policy.html` | `de/cookie-richtlinie.html` | Cookie policy |
| `politique-relative-aux-donnees-personnelles.html` | `en/privacy-policy.html` | `de/datenschutz.html` | Privacy policy |
| `mentions-legales.html` | `en/legal-notice.html` | `de/impressum.html` | Legal notice |

### Standalone pages

Not linked from the navbar or footer — accessible only via a direct link (e.g. sent by email).

| Page | Description |
|---|---|
| `lb/politik-iwwer-perseinlech-donneeen.html` | Privacy policy (LB) |
| `pt/politica-relativa-aos-dados-pessoais.html` | Privacy policy (PT) |

Legal pages are excluded from search engine indexing (`robots.txt` + `<meta name="robots" content="noindex">`).

The cookie policy pages reflect that sigmund.lu is a static site with no cookies. The Sigmund application (app.sigmund.lu) may still use essential session cookies — this distinction is documented in both the cookie policy and privacy policy.

---

## Assets

```
assets/
├── css/
│   └── sigmund.css           All custom styles shared by every page (profession overrides scoped under body.sg-profession)
├── js/
│   ├── main.js                Active nav-link highlight
│   ├── profession.js          Contact form handler (Brevo fetch, validation, i18n via data-attributes)
│   └── legal-toc.js           Auto-generated table of contents on legal/guide pages
└── images/
    ├── logo-sigmund.webp                                                       Logo
    ├── made-in-luxembourg-blanc.webp                                          "Made in Luxembourg" footer badge
    ├── sigmund-application-hero.webp / -1200.webp / -mobile.webp              Homepage hero (responsive srcset)
    ├── sigmund-application-og.webp                                            Open Graph share image
    ├── psychiatre-hero.svg / psychotherapeute-hero.svg / psychologue-hero.svg Homepage profession medallions
    ├── picto-accessible.webp / picto-evolutif.webp / picto-intuitif.webp /
    │   picto-securise.webp                                                    Feature pictos (homepage)
    ├── dashboard.webp / adresses.webp / codes.webp / export.webp /
    │   facture.webp / facture-un-clic.webp / notes-de-seance.webp /
    │   patients.webp / prescription-medicaments.webp / PID.webp /
    │   certificat.webp                                                        Product screenshots (feature sections)
    ├── gestion-simple-factures.svg / gestion-cabinet-professionels-sante-tableau-de-bord.svg
    │                                                                          CNS invoicing guide hero composition
    ├── gestion-simple-agenda-psychologue-Luxembourg.webp /
    │   secretaire-virtuel-pour-psychologues-Sigmund-Luxembourg.webp /
    │   sigmund-abonnement-sans-engagement-psychotherapeute-Grand-Duche-de-Luxembourg.webp /
    │   sigmund-solution-tout-en-un-psychotherapeute.webp /
    │   sigmund-assistant-abonnement-psychiatre-Luxembourg.webp /
    │   sigmund-assistant-administratif-medecin-psychiatre.webp /
    │   protection-dossiers-patients-rgpd-luxembourg.webp                      Profession landing page & blog illustrations
    ├── team-sylvain-perez.webp
    ├── team-franck-amouyal.webp
    └── team-guillaume-desrat.webp                                             Team page photos
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

Contact forms on profession pages POST to Brevo (sibforms.com) via `fetch` with `mode: 'no-cors'`.

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
