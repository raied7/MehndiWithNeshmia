// Mehndi with Neshmia — minimal interactivity

// Replace with the artist's real email before going live.
const INQUIRY_EMAIL = "neshmiamalik@@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Inquiry form — composes a mailto so it works with no backend.
  const form = document.getElementById("inquiryForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const occasion = (data.get("occasion") || "").toString().trim();
      const date = (data.get("date") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !email || !occasion || !message) {
        status.classList.add("error");
        status.textContent = "Please fill in the required fields.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.classList.add("error");
        status.textContent = "That email address doesn't look right.";
        return;
      }

      const subject = `Mehndi inquiry — ${occasion}${date ? " on " + date : ""}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Occasion: ${occasion}`,
        date ? `Event date: ${date}` : null,
        "",
        "Details:",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const href =
        `mailto:${INQUIRY_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = href;
      status.classList.add("success");
      status.textContent =
        "Opening your email app… if nothing happens, please email " +
        INQUIRY_EMAIL + " directly.";
    });
  }

  // Lightweight reveal-on-scroll
  if ("IntersectionObserver" in window) {
    const targets = document.querySelectorAll(".section, .card, .gallery-item");
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => obs.observe(el));
  }
});
