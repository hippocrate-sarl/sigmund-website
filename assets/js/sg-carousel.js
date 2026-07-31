/* ============================================
   SIGMUND — sg-carousel.js
   CSS scroll-snap carousel (testimonials, etc.)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.sg-carousel').forEach((car) => {
    const track = car.querySelector('.sg-carousel-track');
    const slides = car.querySelectorAll('.sg-carousel-slide');
    const dots = car.querySelectorAll('.sg-dot');
    let current = 0;
    let timer;

    function goTo(idx) {
      current = ((idx % slides.length) + slides.length) % slides.length;
      track.scrollTo({ left: current * track.clientWidth, behavior: 'smooth' });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() { timer = setInterval(() => goTo(current + 1), 6000); }
    function stopAuto() { clearInterval(timer); }

    car.querySelector('.sg-carousel-prev').addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    car.querySelector('.sg-carousel-next').addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));

    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      current = idx;
    });

    startAuto();
  });

});
