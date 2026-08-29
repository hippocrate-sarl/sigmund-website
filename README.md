# sigmund-website

Static marketing website for **[www.sigmund.lu](https://www.sigmund.lu)** — an administrative management application for mental health professionals (psychiatrists, psychotherapists, psychologists) practising in Luxembourg.

Developed and maintained by **Hippocrate Sàrl** (Bertrange, Luxembourg).

---

## Overview

Sigmund is a SaaS product that handles the administrative side of a private mental health practice: appointment scheduling, patient records, invoicing, CNS-format billing, PID (Paiement Immédiat Direct) management, unpaid invoice reminders, waiting list, session notes, prescriptions, and more.

This repository is the **public-facing marketing website** only. The production application runs at `app.sigmund.lu` (FR + EN). Visitors in all 3 languages book a demo on-site (`reserver.html` / `en/book.html` / `de/buchen.html`, all embedding Microsoft Bookings).

---

## Running locally

Every page carries a Jekyll front matter block and pulls in shared `<head>`/`<body>` snippets via `{% include %}` (see `_includes/`), so opening an HTML file directly in a browser shows that Liquid syntax as raw text instead of the real output. To preview the site as GitHub Pages actually builds it, run Jekyll locally via Docker (no local Ruby install needed):

```
./serve.sh
```

Then open `http://localhost:4000`. `Gemfile`/`Gemfile.lock` pin the same `github-pages` gem set GitHub Pages builds with.

### Testing the Microsoft Bookings iframe (reserver.html / en/book.html / de/buchen.html)

The Microsoft Bookings iframe embedded on `reserver.html`, `en/book.html` and `de/buchen.html` **does not load over plain HTTP**. `bundle exec jekyll serve` serves `http://localhost:4000`, so the iframe will silently fail to display when you preview it that way — this is expected, not a bug in the page. It only requires HTTPS; the tunnel's own hostname/certificate don't need to match `sigmund.lu`.

To test it locally, tunnel the local Jekyll server through [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/) (`cloudflared`), which gives you a real public HTTPS URL forwarding to `localhost:4000` — no certificates or browser trust setup needed:

1. Start Jekyll as usual (`./serve.sh`).
2. In another terminal, run:
   ```
   cloudflared tunnel --url http://localhost:4000
   ```
3. Open the `https://<random>.trycloudflare.com` URL it prints — the Bookings iframe will load there.

Stop the tunnel with `Ctrl+C` when done; it's a throwaway URL, regenerated each run.

#### Installing cloudflared

**Windows** (via [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/)):
```
winget install --id Cloudflare.cloudflared
```
Alternatively, via [Chocolatey](https://chocolatey.org/): `choco install cloudflared`, or download the `.exe` directly from the [cloudflared releases page](https://github.com/cloudflare/cloudflared/releases/latest).

**Ubuntu / Debian:**
```
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt-get update && sudo apt-get install cloudflared
```
(Or, for a one-off install without adding the apt repo: download the `.deb` directly from the [cloudflared releases page](https://github.com/cloudflare/cloudflared/releases/latest) and install it with `sudo dpkg -i cloudflared-linux-amd64.deb`.)

Verify with `cloudflared --version` on either platform.

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
| `s-installer-psychologue-psychotherapeute-luxembourg.html` | `en/setting-up-as-a-psychologist-in-luxembourg.html` | `de/niederlassung-als-psychologe-in-luxemburg.html` | Installation guide for psychologists/psychotherapists |
| `blog/index.html` | `en/blog/index.html` | `de/blog/index.html` | Blog index |
| `reserver.html` | `en/book.html` | `de/buchen.html` | Demo booking page (embeds Microsoft Bookings) |
| `politique-en-matiere-de-cookies.html` | `en/cookie-policy.html` | `de/cookie-richtlinie.html` | Cookie policy |
| `politique-relative-aux-donnees-personnelles.html` | `en/privacy-policy.html` | `de/datenschutz.html` | Privacy policy |
| `mentions-legales.html` | `en/legal-notice.html` | `de/impressum.html` | Legal notice |

### Standalone pages

Not linked from the navbar or footer — accessible only via a direct link (e.g. sent by email).

| Page | Description |
|---|---|
| `lb/politik-iwwer-perseinlech-donneeen.html` | Privacy policy (LB) |
| `pt/politica-relativa-aos-dados-pessoais.html` | Privacy policy (PT) |

The SLP 2026 newsletter campaign landing page is trilingual like the main pages above (with the usual language switcher and `hreflang` alternates between the three), but — like the pages in the table above it — it is not linked from any navbar or footer:

| FR | EN | DE | Description |
|---|---|---|---|
| `slp-2026.html` | `en/slp-2026.html` | `de/slp-2026.html` | SLP 2026 newsletter campaign landing page (offer expires 2026-10-31) |

Legal pages and the SLP campaign pages are excluded from search engine indexing (`<meta name="robots" content="noindex">`); the SLP pages are additionally kept out of `sitemap.xml` and disallowed in `robots.txt` since the offer they describe is time-limited.

---

## Assets

```
assets/
├── css/
│   ├── sigmund.css                  All custom styles shared by every page (profession overrides scoped under body.sg-profession)
│   ├── slp-2026.css                 Styles used only by the slp-2026.html/en/de pages — kept out of sigmund.css, loaded only there
│   ├── cookieconsent.css            CookieConsent v3.1.0 library stylesheet (vendored, don't hand-edit)
│   └── cookieconsent-sigmund.css    Sigmund brand override for the cookie-consent banner
├── js/
│   ├── main.js                Active nav-link highlight
│   ├── profession.js          Contact form handler (Brevo fetch, validation, i18n via data-attributes)
│   ├── legal-toc.js           Auto-generated table of contents on legal/guide pages
│   ├── cookieconsent.esm.js       CookieConsent v3.1.0 library (vendored, don't hand-edit)
│   └── cookieconsent-config.js    CookieConsent config: categories, FR/EN/DE translations, Consent Mode v2 bridge
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
    │   sigmund-assistant-administratif-medecin-psychiatre.webp                Profession landing page & blog illustrations
    ├── team-sylvain-perez.webp
    ├── team-franck-amouyal.webp
    └── team-guillaume-desrat.webp                                             Team page photos
```

---

## Tech stack

Most dependencies are loaded from CDN — nothing to install. CookieConsent is the one exception: it's vendored directly under `assets/` rather than loaded from a CDN.

| Library | Version | Purpose |
|---|---|---|
| Bootstrap | 5.3.3 | Layout, navbar, grid, utilities |
| Bootstrap Icons | 1.11.3 | Icons (`bi bi-*`) |
| flag-icons | 7.2.3 | Language switcher flags (`fi fi-*`) |
| Google Fonts — Inter | — | Body font (300–800) |
| Google Tag Manager | container `GTM-TZPN6B4R` | Tag/analytics management, loaded via `_includes/head.html` + `body.html` |
| CookieConsent (orestbida) | 3.1.0, self-hosted | Cookie-consent banner, bridged to Google Consent Mode v2 — see `assets/js/cookieconsent-config.js` |

Contact forms on profession pages POST to Brevo (sibforms.com) via `fetch` with `mode: 'no-cors'`.

Local Jekyll builds run via Docker (see "Running locally") — `Gemfile`/`Gemfile.lock` and `serve.sh` are dev-only and excluded from the actual Jekyll build (`_config.yml`).

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
