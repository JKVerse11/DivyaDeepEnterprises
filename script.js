const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Close the mobile navigation after selecting a link or clicking outside it.
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenu) {
  mobileMenu.querySelectorAll(".mobile-menu-panel a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.open = false;
    });
  });

  document.addEventListener("click", (event) => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) {
      mobileMenu.open = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector("summary")?.focus();
    }
  });
}

const enquiryForm = document.getElementById("enquiryForm");
const formNote = document.getElementById("formNote");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const name = formData.get("name").trim();
    const organization = formData.get("organization").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Business / Organization: ${organization || "Not provided"}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    if (formNote) {
      formNote.textContent = "Opening your email app with the enquiry details…";
    }

    window.location.href =
      `mailto:divyadeepmlr@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Use the browser's native observer instead of scroll handlers for efficient reveals.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.body.classList.add("motion-ready");

  if ("IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
      ".section .container > *, .service-grid > *, .product-card, .map-frame, .map-directions, .contact-card"
    );

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12
    });

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal");
      if (element.classList.contains("product-card")) {
        element.style.transitionDelay = `${(index % 5) * 55}ms`;
      }
      revealObserver.observe(element);
    });
  }
}
