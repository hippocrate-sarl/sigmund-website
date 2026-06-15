(function () {
  // Desktop sidebar: highlight active section via IntersectionObserver
  var sidebarLinks = document.querySelectorAll('.sg-sidebar-toc a[href^="#"]');
  if (sidebarLinks.length) {
    var sections = Array.from(sidebarLinks).map(function (a) {
      return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sidebarLinks.forEach(function (a) { a.classList.remove('sg-toc-active'); });
          var active = document.querySelector('.sg-sidebar-toc a[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('sg-toc-active');
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Mobile TOC: close accordéon after clicking a link
  var mobileToc = document.getElementById('mobileToc');
  if (mobileToc) {
    mobileToc.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        var bsCollapse = bootstrap.Collapse.getInstance(mobileToc);
        if (bsCollapse) bsCollapse.hide();
      });
    });
  }
})();
