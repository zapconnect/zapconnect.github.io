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
document.getElementById("year").textContent = new Date().getFullYear();
/* =====================================================
   PLATFORM PREVIEW SLIDER — AUTOPLAY + FADE
===================================================== */
let currentSlide = 0;
const slides = document.querySelectorAll(".preview-slider img");
let sliderInterval = null;
const SLIDE_TIME = 4000; // 4 segundos

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  resetAutoplay();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  resetAutoplay();
}

function startAutoplay() {
  sliderInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, SLIDE_TIME);
}

function resetAutoplay() {
  clearInterval(sliderInterval);
  startAutoplay();
}

/* inicia automaticamente */
startAutoplay();
