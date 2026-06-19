(function () {
  'use strict';

  var header = document.getElementById('header');

  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

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

  var sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    var scrollPos = window.scrollY + 200;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
        document.querySelectorAll('.nav__link').forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  // Sparkle particles in hero
  var particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (var i = 0; i < 20; i++) {
      var particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';
      var size = 2 + Math.random() * 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particlesContainer.appendChild(particle);
    }
  }

  // WhatsApp form submission
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
