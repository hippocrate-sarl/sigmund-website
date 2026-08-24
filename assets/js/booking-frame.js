(function () {
  var frame = document.querySelector('[data-sg-booking-src]');
  if (!frame) return;

  var src = frame.getAttribute('data-sg-booking-src');
  var title = frame.getAttribute('data-sg-booking-title') || '';
  var loaded = false;

  function loadIframe() {
    if (loaded) return;
    loaded = true;
    var iframe = document.createElement('iframe');
    iframe.className = 'sg-booking-iframe';
    iframe.src = src;
    iframe.scrolling = 'yes';
    iframe.title = title;
    frame.innerHTML = '';
    frame.appendChild(iframe);
    frame.classList.add('is-loaded');
  }

  function isAccepted() {
    return !!(window.CookieConsent && window.CookieConsent.acceptedService('bookings', 'thirdparty'));
  }

  var loadBtn = frame.querySelector('[data-sg-booking-load]');
  if (loadBtn) {
    loadBtn.addEventListener('click', function () {
      loadIframe();
      if (window.CookieConsent) window.CookieConsent.acceptService('bookings', 'thirdparty');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'bookings_calendar_load' });
    });
  }

  // Listen first: if CookieConsent's own module hasn't run yet, these events
  // (fired once it restores/records consent) still reach us once it does.
  ['cc:onFirstConsent', 'cc:onConsent', 'cc:onChange'].forEach(function (evt) {
    window.addEventListener(evt, function () {
      if (isAccepted()) loadIframe();
    });
  });

  // Covers the case where CookieConsent already ran before this script did.
  if (isAccepted()) loadIframe();
})();
