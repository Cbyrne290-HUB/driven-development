/* ============================================
   DRIVEN DEVELOPMENT — MAIN JAVASCRIPT
   ============================================ */

// --- NAV SCROLL EFFECT ---
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// --- MOBILE BURGER MENU ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');

  const spans = burger.querySelectorAll('span');
  if (burger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// --- SCROLL REVEAL — STAGGERED ENTRANCE ---
// Elements that fade + slide up individually
const revealSelectors = [
  '.service__card',
  '.why__item',
  '.testimonial__card',
  '.work__item',
  '.section__header',
  '.value__card',
  '.process__step',
  '.stat__card',
  '.project__card',
  '.testimonial-stat',
  '.practice__card',
  '.careers-why__card',
  '.role__card',
  '.contact-method__card',
  '.about-story__right',
  '.service-detail__left',
  '.service-detail__right',
  '.why__left',
  '.why__right',
  '.footer__brand',
  '.footer__links',
  '.footer__contact'
];

const revealElements = document.querySelectorAll(revealSelectors.join(', '));

revealElements.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// --- SCROLL REVEAL — SECTION HEADINGS (slide in from left) ---
const headingElements = document.querySelectorAll(
  '.page-hero__title, .about-story__title, .service-detail__title, .cta-banner__inner h2'
);

headingElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      headingObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

headingElements.forEach(el => headingObserver.observe(el));

// --- PARALLAX ON HERO GLOW ---
const heroGlow = document.querySelector('.hero__glow');
const heroVisual = document.querySelector('.hero__visual');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroGlow) {
    heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
  }
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

// --- PARALLAX ON IMAGE BREAKS ---
document.querySelectorAll('.img-break img').forEach(img => {
  window.addEventListener('scroll', () => {
    const rect = img.closest('.img-break').getBoundingClientRect();
    const scrolled = -rect.top * 0.2;
    img.style.transform = `translateY(${scrolled}px) scale(1.1)`;
  });
});

// --- COUNTER ANIMATION ON STATS ---
function animateCounter(el) {
  const target = el.innerText;
  const isPercent = target.includes('%');
  const isPlus = target.includes('+');
  const isInfinity = target.includes('∞');
  const hasSlash = target.includes('/');
  const hashr = target.includes('hr');

  if (isInfinity || hasSlash) return; // skip symbols

  const num = parseFloat(target.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return;

  const duration = 1800;
  const steps = 60;
  const increment = num / steps;
  let current = 0;
  let step = 0;

  el.innerText = '0' + (isPercent ? '%' : isPlus ? '+' : hashr ? 'hr' : '');

  const timer = setInterval(() => {
    step++;
    current += increment;
    if (step >= steps) {
      current = num;
      clearInterval(timer);
    }
    const display = Number.isInteger(num) ? Math.floor(current) : current.toFixed(1);
    el.innerText = display + (isPercent ? '%' : isPlus ? '+' : hashr ? 'hr' : '');
  }, duration / steps);
}

const statNums = document.querySelectorAll('.stat__num, .testimonial-stat__num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// --- SMOOTH HOVER TILT ON CARDS ---
document.querySelectorAll('.service__card, .project__card, .value__card, .testimonial__card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// --- CURSOR GLOW EFFECT ---
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(185, 217, 235, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

// --- HERO ENTRANCE ANIMATION ON LOAD ---
window.addEventListener('load', () => {
  const heroTag = document.querySelector('.hero__tag');
  if (heroTag) {
    heroTag.style.opacity = '0';
    heroTag.style.transform = 'translateY(10px)';
    heroTag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroTag.style.opacity = '1';
      heroTag.style.transform = 'translateY(0)';
    }, 100);
  }

  const heading = document.querySelector('.hero__heading');
  if (heading) {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(20px)';
    heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heading.style.opacity = '1';
      heading.style.transform = 'translateY(0)';
    }, 200);
  }

  const heroSub = document.querySelector('.hero__sub');
  if (heroSub) {
    heroSub.style.opacity = '0';
    heroSub.style.transform = 'translateY(10px)';
    heroSub.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroSub.style.opacity = '1';
      heroSub.style.transform = 'translateY(0)';
    }, 400);
  }

  const heroActions = document.querySelector('.hero__actions');
  if (heroActions) {
    heroActions.style.opacity = '0';
    heroActions.style.transform = 'translateY(10px)';
    heroActions.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroActions.style.opacity = '1';
      heroActions.style.transform = 'translateY(0)';
    }, 600);
  }

  // Stagger hero cards
  document.querySelectorAll('.hero__card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      card.style.opacity = '1';
    }, 800 + (i * 200));
  });

  // Page hero for inner pages
  const pageHeroTitle = document.querySelector('.page-hero__title');
  if (pageHeroTitle) {
    pageHeroTitle.style.opacity = '0';
    pageHeroTitle.style.transform = 'translateY(20px)';
    pageHeroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      pageHeroTitle.style.opacity = '1';
      pageHeroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  const pageHeroSub = document.querySelector('.page-hero__sub');
  if (pageHeroSub) {
    pageHeroSub.style.opacity = '0';
    pageHeroSub.style.transform = 'translateY(10px)';
    pageHeroSub.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      pageHeroSub.style.opacity = '1';
      pageHeroSub.style.transform = 'translateY(0)';
    }, 400);
  }
});

// --- MARQUEE PAUSE ON HOVER ---
const marqueeTrack = document.querySelector('.marquee__track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// --- ACTIVE NAV LINK HIGHLIGHT ON SCROLL (homepage) ---
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksList.forEach(link => {
    link.classList.remove('nav__scroll-active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav__scroll-active');
    }
  });
});
