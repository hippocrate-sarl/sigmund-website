// Sigmund — CookieConsent v3.1.0 configuation

import * as CookieConsent from './cookieconsent.esm.js';

const PRIVACY_URLS = {
  fr: '/politique-relative-aux-donnees-personnelles.html',
  en: '/en/privacy-policy.html',
  de: '/de/datenschutz.html'
};

const COOKIE_URLS = {
  fr: '/politique-en-matiere-de-cookies.html',
  en: '/en/cookie-policy.html',
  de: '/de/cookie-richtlinie.html'
};

// Get Privacy/Cookie URL for page language
const LANG = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
const PRIVACY_URL = PRIVACY_URLS[LANG] || PRIVACY_URLS.fr;
const COOKIE_URL = COOKIE_URLS[LANG] || COOKIE_URLS.fr;

// Bridge to Google Consent Mode v2
function updateGoogleConsent() {
  const ads = CookieConsent.acceptedCategory('advertisement');
  const ana = CookieConsent.acceptedCategory('analytics');

  gtag('consent', 'update', {
    ad_storage:         ads ? 'granted' : 'denied',
    ad_user_data:       ads ? 'granted' : 'denied',
    ad_personalization: ads ? 'granted' : 'denied',
    analytics_storage:  ana ? 'granted' : 'denied'
  });

  // Allow to trigger GTM tags on the consent update
  dataLayer.push({ event: 'cookie_consent_update' });
}

// Configuration
CookieConsent.run({

  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom left',
      equalWeightButtons: true,
      flipButtons: false
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false
    }
  },

  categories: {
    necessary: {
      enabled: true,
      readOnly: true
    },
    analytics: {
      autoClear: {
        cookies: [
          { name: /^_ga/ },
          { name: '_gid' }
        ]
      }
    },
    advertisement: {
      autoClear: {
        cookies: [
          { name: /^_gcl/ },
          { name: 'IDE' },
          { name: 'test_cookie' }
        ]
      }
    }
  },

  onFirstConsent: updateGoogleConsent,
  onConsent:      updateGoogleConsent,
  onChange:       updateGoogleConsent,

  language: {
    default: 'fr',
    autoDetect: 'document',

    translations: {

      /* ============================== FRANÇAIS ============================== */
      fr: {
        consentModal: {
          title: 'Nous utilisons des cookies',
          description:
            'Sigmund utilise des cookies strictement nécessaires au fonctionnement du site, ' +
            'et — avec votre accord uniquement — des cookies de mesure d\'audience et de publicité. ' +
            'Vous pouvez accepter, refuser, ou choisir catégorie par catégorie. ' +
            'Votre choix est modifiable à tout moment.',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          showPreferencesBtn: 'Personnaliser',
          footer: '<a href="' + COOKIE_URL + '">Politique de cookies</a><a href="' + PRIVACY_URL + '">Politique de confidentialité</a>'
        },
        preferencesModal: {
          title: 'Préférences de confidentialité',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          savePreferencesBtn: 'Enregistrer mes choix',
          closeIconLabel: 'Fermer',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Votre choix compte',
              description:
                'Aucun cookie de mesure ou de publicité n\'est déposé avant votre accord. ' +
                'Si vous refusez, le site fonctionne normalement.'
            },
            {
              title: 'Strictement nécessaires <span class="pm__badge">Toujours actifs</span>',
              description:
                'Indispensables au fonctionnement du site et à la mémorisation de votre choix ' +
                'en matière de cookies. Ils ne peuvent pas être désactivés.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Mesure d\'audience',
              description:
                'Google Analytics, pour comprendre quelles pages sont consultées et améliorer le site. ' +
                'Les données sont agrégées : nous ne vous identifions pas.',
              linkedCategory: 'analytics'
            },
            {
              title: 'Publicité',
              description:
                'Google Ads, pour mesurer l\'efficacité de nos annonces et éviter de vous montrer ' +
                'une publicité si vous êtes déjà client ou si vous avez déjà pris rendez-vous.',
              linkedCategory: 'advertisement'
            },
            {
              title: 'Plus d\'informations',
              description:
                'Le détail des données traitées et de leur durée de conservation figure dans notre ' +
                '<a href="' + PRIVACY_URL + '">politique de confidentialité</a>.'
            }
          ]
        }
      },

      /* ============================== ENGLISH ============================== */
      en: {
        consentModal: {
          title: 'We use cookies',
          description:
            'Sigmund uses cookies that are strictly necessary for the site to work and — only with ' +
            'your consent — analytics and advertising cookies. You can accept, decline, or choose ' +
            'category by category. You can change your mind at any time.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Decline all',
          showPreferencesBtn: 'Customise',
          footer: '<a href="' + COOKIE_URL + '">Cookie policy</a><a href="' + PRIVACY_URL + '">Privacy policy</a>'
        },
        preferencesModal: {
          title: 'Privacy preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Decline all',
          savePreferencesBtn: 'Save my choices',
          closeIconLabel: 'Close',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Your choice matters',
              description:
                'No analytics or advertising cookie is set before you agree. ' +
                'If you decline, the site works normally.'
            },
            {
              title: 'Strictly necessary <span class="pm__badge">Always enabled</span>',
              description:
                'Required for the site to function and to remember your cookie choice. ' +
                'These cannot be disabled.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Analytics',
              description:
                'Google Analytics, to understand which pages are viewed and improve the site. ' +
                'Data is aggregated: we do not identify you.',
              linkedCategory: 'analytics'
            },
            {
              title: 'Advertising',
              description:
                'Google Ads, to measure how well our ads perform and to avoid showing you an ad ' +
                'if you are already a customer or have already booked a demo.',
              linkedCategory: 'advertisement'
            },
            {
              title: 'More information',
              description:
                'Details of the data processed and how long it is kept are set out in our ' +
                '<a href="' + PRIVACY_URL + '">privacy policy</a>.'
            }
          ]
        }
      },

      /* ============================== DEUTSCH ============================== */
      de: {
        consentModal: {
          title: 'Wir verwenden Cookies',
          description:
            'Sigmund verwendet Cookies, die für den Betrieb der Website unbedingt erforderlich sind, ' +
            'sowie — ausschließlich mit Ihrer Zustimmung — Cookies zur Reichweitenmessung und für Werbung. ' +
            'Sie können alles annehmen, ablehnen oder einzeln auswählen. Ihre Auswahl ist jederzeit änderbar.',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Alle ablehnen',
          showPreferencesBtn: 'Anpassen',
          footer: '<a href="' + COOKIE_URL + '">Cookie-Richtlinie</a><a href="' + PRIVACY_URL + '">Datenschutz</a>'
        },
        preferencesModal: {
          title: 'Datenschutz-Einstellungen',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Alle ablehnen',
          savePreferencesBtn: 'Auswahl speichern',
          closeIconLabel: 'Schließen',
          serviceCounterLabel: 'Dienst|Dienste',
          sections: [
            {
              title: 'Ihre Entscheidung zählt',
              description:
                'Vor Ihrer Zustimmung wird kein Cookie zur Messung oder Werbung gesetzt. ' +
                'Wenn Sie ablehnen, funktioniert die Website normal weiter.'
            },
            {
              title: 'Unbedingt erforderlich <span class="pm__badge">Immer aktiv</span>',
              description:
                'Notwendig für den Betrieb der Website und zum Speichern Ihrer Cookie-Auswahl. ' +
                'Sie können nicht deaktiviert werden.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Reichweitenmessung',
              description:
                'Google Analytics, um zu verstehen, welche Seiten aufgerufen werden, und die Website ' +
                'zu verbessern. Die Daten sind aggregiert: Wir identifizieren Sie nicht.',
              linkedCategory: 'analytics'
            },
            {
              title: 'Werbung',
              description:
                'Google Ads, um die Wirksamkeit unserer Anzeigen zu messen und Ihnen keine Werbung ' +
                'zu zeigen, wenn Sie bereits Kunde sind oder schon einen Termin gebucht haben.',
              linkedCategory: 'advertisement'
            },
            {
              title: 'Weitere Informationen',
              description:
                'Einzelheiten zu den verarbeiteten Daten und ihrer Speicherdauer finden Sie in unserer ' +
                '<a href="' + PRIVACY_URL + '">Datenschutz</a>.'
            }
          ]
        }
      }

    }
  }
});
