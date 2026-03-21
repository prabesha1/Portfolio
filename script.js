(function () {
  'use strict';

  const STAGGER_SELECTOR = '.stat-box, .cap-card, .work-card, .cred-card, .community-card, .req-item';

  // ─── Reveal animations with child stagger ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      const children = entry.target.querySelectorAll(STAGGER_SELECTOR);
      children.forEach((child, i) => {
        child.style.animationDelay = i * 80 + 'ms';
        child.classList.add('stagger-in');
        child.addEventListener('animationend', () => {
          child.classList.remove('stagger-in');
          child.style.animationDelay = '';
          child.style.opacity = '1';
        }, { once: true });
      });

      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ─── Cached DOM refs ───
  const nav = document.querySelector('nav');
  const progressBar = document.getElementById('progress-bar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const backToTop = document.querySelector('.back-to-top');

  // ─── Unified scroll handler with rAF throttle ───
  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    nav.classList.toggle('scrolled', scrollY > 50);

    if (progressBar && docHeight > 0) {
      progressBar.style.width = ((scrollY / docHeight) * 100) + '%';
    }

    let current = '';
    sections.forEach((s) => {
      if (scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 600);
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ─── Mobile nav toggle ───
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Cursor glow effect (pointer devices only) ───
  const cursorGlow = document.querySelector('.cursor-glow');
  const cursorDot = document.querySelector('.cursor-dot');

  if (cursorGlow && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }, { passive: true });

    (function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    })();

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  } else if (cursorGlow && cursorDot) {
    cursorGlow.style.display = 'none';
    cursorDot.style.display = 'none';
  }

  // ─── Back to top ───
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Set initial state ───
  onScroll();
})();
