/* ============================================
   DRIVEN DEVELOPMENT — PAGES JAVASCRIPT
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

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll(
  '.service__card, .service-detail__inner, .project__card, .value__card, .process__step, .stat__card, .testimonial__card, .testimonial-featured__card, .role__card, .careers-why__card, .contact-method__card, .section__header, .about-story__inner, .quote-form__inner, .testimonial-stat'
);

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

// --- CURSOR GLOW ---
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

// --- PAGE HERO ANIMATION ---
window.addEventListener('load', () => {
  const pageHeroTitle = document.querySelector('.page-hero__title');
  const pageHeroSub = document.querySelector('.page-hero__sub');
  const pageHeroLabel = document.querySelector('.page-hero .section__label');

  if (pageHeroLabel) {
    pageHeroLabel.style.opacity = '0';
    pageHeroLabel.style.transform = 'translateY(10px)';
    pageHeroLabel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      pageHeroLabel.style.opacity = '1';
      pageHeroLabel.style.transform = 'translateY(0)';
    }, 100);
  }

  if (pageHeroTitle) {
    pageHeroTitle.style.opacity = '0';
    pageHeroTitle.style.transform = 'translateY(20px)';
    pageHeroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      pageHeroTitle.style.opacity = '1';
      pageHeroTitle.style.transform = 'translateY(0)';
    }, 250);
  }

  if (pageHeroSub) {
    pageHeroSub.style.opacity = '0';
    pageHeroSub.style.transform = 'translateY(10px)';
    pageHeroSub.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      pageHeroSub.style.opacity = '1';
      pageHeroSub.style.transform = 'translateY(0)';
    }, 450);
  }
});

// --- WORK PAGE FILTER ---
const filterBtns = document.querySelectorAll('.filter__btn');
const projectCards = document.querySelectorAll('.project__card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

// --- CAREERS ROLE ACCORDION ---
const roleCards = document.querySelectorAll('.role__card');

if (roleCards.length > 0) {
  roleCards.forEach(card => {
    const header = card.querySelector('.role__header');
    const toggleBtn = card.querySelector('.role__toggle');

    if (header) {
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');

        roleCards.forEach(c => c.classList.remove('open'));

        if (!isOpen) {
          card.classList.add('open');
        }
      });
    }
  });
}

// --- APPLY BUTTON SCROLL TO FORM ---
document.querySelectorAll('a[href="#apply"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- APPLICATION FORM SUBMIT ---
const applicationForm = document.getElementById('applicationForm');

if (applicationForm) {
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = applicationForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('visible');
      }
      applicationForm.reset();
    }, 1200);
  });
}

// --- CONTACT FORM SUBMIT ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('contactFormSuccess');

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('visible');
      }
      contactForm.reset();
    }, 1200);
  });
}

// --- CARD HOVER TILT ---
document.querySelectorAll('.value__card, .careers-why__card, .contact-method__card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});