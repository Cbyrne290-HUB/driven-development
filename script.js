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

// Close menu when a link is clicked
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

// --- SCROLL REVEAL ANIMATIONS ---
const revealElements = document.querySelectorAll(
  '.service__card, .why__item, .testimonial__card, .work__item, .section__header'
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
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// --- SMOOTH HOVER TILT ON SERVICE CARDS ---
document.querySelectorAll('.service__card').forEach(card => {
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

// --- HERO HEADING WORD ANIMATION ON LOAD ---
window.addEventListener('load', () => {
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
});
```

Once pasted, now we commit everything. Here's exactly what to do:

Open the terminal at the bottom of your Codespace (it should already be open, you can see it in your screenshot). Type these commands one at a time and hit enter after each:
```
git add .
```
```
git commit -m "Initial commit — homepage HTML, CSS and JS"
```
```
git push