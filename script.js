(function () {
  'use strict';

  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = document.querySelectorAll('section[id]');

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      header.classList.toggle('scrolled', window.scrollY > 60);

      var scrollPos = window.scrollY + 200;
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var top = section.offsetTop;
        if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
          var id = '#' + section.getAttribute('id');
          for (var j = 0; j < navLinks.length; j++) {
            navLinks[j].classList.toggle('active', navLinks[j].getAttribute('href') === id);
          }
          break;
        }
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  var isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  var particlesContainer = document.getElementById('particles');
  if (particlesContainer && !isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 12; i++) {
      var particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = 'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;animation-delay:' + (Math.random() * 6) + 's;animation-duration:' + (4 + Math.random() * 4) + 's;';
      var size = 2 + Math.random() * 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      frag.appendChild(particle);
    }
    particlesContainer.appendChild(frag);
  }

  var form = document.getElementById('buchungForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var telefon = document.getElementById('telefon').value.trim();
      var stadtteil = document.getElementById('stadtteil').value.trim();
      var service = document.getElementById('service').value;
      var wunschtermin = document.getElementById('wunschtermin').value.trim();
      var nachricht = document.getElementById('nachricht').value.trim();

      var message = 'Hallo NOVA Nails! 💅\n\n';
      message += '👤 Name: ' + name + '\n';
      message += '📱 Telefon: ' + telefon + '\n';
      message += '📍 Stadtteil: ' + stadtteil + '\n';
      message += '💎 Leistung: ' + service + '\n';

      if (wunschtermin) {
        message += '📅 Wunschtermin: ' + wunschtermin + '\n';
      }

      if (nachricht) {
        message += '💬 Nachricht: ' + nachricht + '\n';
      }

      message += '\nIch freue mich auf Ihre Rückmeldung!';

      var waUrl = 'https://wa.me/4915731292474?text=' + encodeURIComponent(message);
      window.open(waUrl, '_blank');
    });
  }
})();
