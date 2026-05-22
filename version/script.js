const counters = document.querySelectorAll('.metric-card');
const observerOptions = {
  threshold: 0.4,
};

function animateCounter(card) {
  const target = Number(card.getAttribute('data-counter')) || 0;
  const valueElm = card.querySelector('.metric-value');
  let current = 0;
  const duration = 2200;
  const stepTime = Math.max(Math.floor(duration / target), 10);

  const interval = setInterval(() => {
    current += 1;
    valueElm.textContent = current;
    if (current >= target) {
      clearInterval(interval);
      valueElm.textContent = `${target}+`;
    }
  }, stepTime);
}

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach((card) => counterObserver.observe(card));

const appears = document.querySelectorAll('.service-card, .case-panel, .process-step, .testimonial-card, .contact-copy, .contact-card');

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      entry.target.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      appearObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

appears.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(24px)';
  appearObserver.observe(element);
});

window.addEventListener('scroll', () => {
  const heroLayer = document.querySelector('.hero-layer--depth');
  const offset = window.scrollY * 0.08;
  if (heroLayer) {
    heroLayer.style.transform = `translateY(${offset}px)`;
  }
});
