/* ============================================
   SIGMUND — main.js
   Open-source JS replacing Odoo bundles
   Uses: Bootstrap 5 (CDN), CookieConsent (CDN)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Cookie Consent (orestbida/cookieconsent) ----
  if (typeof CookieConsent !== 'undefined') {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'bar',
          position: 'bottom',
          equalWeightButtons: false
        }
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {
          enabled: false
        }
      },
      language: {
        default: document.documentElement.lang?.startsWith('en') ? 'en' : 'fr',
        translations: {
          fr: {
            consentModal: {
              title: 'Nous utilisons des cookies',
              description: 'Nous utilisons des cookies pour vous offrir une meilleure expérience sur ce site. <a href="politique-en-matiere-de-cookies.html">Politique de cookies</a>',
              acceptAllBtn: 'Je suis d\'accord',
              acceptNecessaryBtn: 'Que les essentiels',
              showPreferencesBtn: null
            },
            preferencesModal: {
              title: 'Préférences cookies',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Que les essentiels',
              savePreferencesBtn: 'Enregistrer',
              sections: [
                { title: 'Cookies essentiels', description: 'Nécessaires au fonctionnement du site.', linkedCategory: 'necessary' }
              ]
            }
          },
          en: {
            consentModal: {
              title: 'We use cookies',
              description: 'We use cookies to provide you a better experience. <a href="cookie-policy.html">Cookie Policy</a>',
              acceptAllBtn: 'I agree',
              acceptNecessaryBtn: 'Only essentials',
              showPreferencesBtn: null
            },
            preferencesModal: {
              title: 'Cookie preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Only essentials',
              savePreferencesBtn: 'Save',
              sections: [
                { title: 'Essential cookies', description: 'Required for the site to work.', linkedCategory: 'necessary' }
              ]
            }
          }
        }
      }
    });
  }

  // ---- Active nav link highlight ----
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.sg-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\/$/, '');
    if (href && path === href) {
      link.classList.add('active');
    }
  });

});
