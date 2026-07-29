(function () {
  var current = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
  var browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
  var preferred = null;
  for (var i = 0; i < browserLangs.length; i++) {
    var code = String(browserLangs[i] || '').slice(0, 2).toLowerCase();
    if (code === 'fr' || code === 'en' || code === 'de') { preferred = code; break; }
  }
  if (!preferred || preferred === current) return;

  var banner = document.querySelector('.sg-lang-banner[data-lang="' + preferred + '"]');
  if (!banner) return;
  banner.classList.remove('d-none');

  banner.querySelectorAll('[data-sg-lang-dismiss]').forEach(function (el) {
    el.addEventListener('click', function () {
      banner.classList.add('d-none');
    });
  });
})();
