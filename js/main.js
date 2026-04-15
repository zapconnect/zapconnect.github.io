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

function registerReveal(selector, stagger = 0) {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add("reveal");

    if (stagger) {
      el.style.setProperty("--reveal-delay", `${index * stagger}s`);
    }

    revealObserver.observe(el);
  });
}

// Elementos que terão animação ao scroll
registerReveal(".section-head, .compare-head, .testimonials-head, .platform-head, .faq-head");
registerReveal(".trust-bar-grid span", 0.08);
registerReveal(".logos-grid span", 0.06);
registerReveal(".features-grid-advanced .feature-box", 0.08);
registerReveal(".steps-timeline .step-advanced", 0.08);
registerReveal(".steps-note, .compare-note, .platform-preview, .lead-whatsapp-box, .cta-box, .footer-grid");
registerReveal(".compare-grid .compare-col", 0.1);
registerReveal(".testimonials-grid .testimonial-card", 0.08);
registerReveal(".platform-features .platform-card", 0.08);
registerReveal(".pricing-grid .price-card", 0.08);
registerReveal(".faq-list .faq-item", 0.06);

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
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
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
  if (slides.length <= 1) return;

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
/* =====================================================
   FORM GOOGLE FORMS — SUCESSO IMEDIATO (FIX FINAL)
===================================================== */
const form = document.querySelector(".newsletter-form");
const successBox = document.querySelector(".form-success");
const iframe = document.getElementById("hidden_iframe");
const submitBtn = form?.querySelector("button");

if (form && iframe && successBox && submitBtn) {
  let submitted = false;

  /* AO ENVIAR */
  form.addEventListener("submit", () => {
    submitted = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
  });

  /* QUANDO O GOOGLE FORM RESPONDER */
  iframe.addEventListener("load", () => {
    if (!submitted) return;

    form.style.display = "none";
    successBox.style.display = "block";
  });
}


/* ================================
   MÁSCARA WHATSAPP (CORRIGIDA)
================================ */
const phoneInput = document.querySelector('.newsletter-form input[type="tel"]');

if (phoneInput) {
  phoneInput.addEventListener("input", e => {
    let value = e.target.value.replace(/\D/g, "");

    // limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) {
      value = `(${value}`;
    } else if (value.length <= 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }

    e.target.value = value;
  });
}


