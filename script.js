// ─── Intersection Observer for reveal animations ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Active nav link highlighting ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
});

// ─── Nav scroll effect + reading progress bar ───
const nav = document.querySelector('nav');
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  if (progressBar) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
});

// ─── Mobile nav toggle ───
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// ─── Cursor glow effect ───
const cursorGlow = document.querySelector('.cursor-glow');
const cursorDot = document.querySelector('.cursor-dot');

if (cursorGlow && cursorDot) {
  let mouseX = -500, mouseY = -500;
  let glowX = -500, glowY = -500;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth lag for glow blob
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
}

// ─── Back to top button ───
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
