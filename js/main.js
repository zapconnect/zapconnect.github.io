/* =====================================================
   HEADER SHADOW ON SCROLL
===================================================== */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 60);
});

/* =====================================================
   INTERSECTION OBSERVER – SCROLL ANIMATIONS
===================================================== */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

// Elementos que terão animação ao scroll
document.querySelectorAll(`
  .hero > .container > div,
  .hero-mockup,
  .logos-grid span,
  .feature-box,
  .step-advanced,
  .testimonial-card,
  .platform-preview,
  .platform-card,
  .price-card,
  .faq-item,
  .newsletter-box,
  .cta-box,
  .footer-grid
`).forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* =====================================================
   FAQ ACCORDION
===================================================== */
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const icon = btn.querySelector(".icon");

    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".icon").textContent = "+";
      }
    });

    item.classList.toggle("active");
    icon.textContent = item.classList.contains("active") ? "−" : "+";
  });
});

/* =====================================================
   SMOOTH SCROLL (SE FUTURAMENTE USAR ÂNCORAS)
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
