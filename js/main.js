(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var topbarInner = document.querySelector(".header-topbar__inner");

  if (navToggle && topbarInner) {
    navToggle.addEventListener("click", function () {
      var isOpen = topbarInner.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Language dropdown
  var langToggle = document.querySelector(".lang-switch__toggle");
  var langMenu = document.querySelector(".lang-switch__menu");

  if (langToggle && langMenu) {
    langToggle.addEventListener("click", function () {
      var isHidden = langMenu.hasAttribute("hidden");
      if (isHidden) {
        langMenu.removeAttribute("hidden");
        langToggle.setAttribute("aria-expanded", "true");
      } else {
        langMenu.setAttribute("hidden", "");
        langToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", function (event) {
      if (!langMenu.contains(event.target) && event.target !== langToggle) {
        langMenu.setAttribute("hidden", "");
        langToggle.setAttribute("aria-expanded", "false");
      }
    });

    langMenu.querySelectorAll("button[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        var lang = button.getAttribute("data-lang");
        langToggle.querySelector("span").textContent = lang.toUpperCase();
        langMenu.setAttribute("hidden", "");
        langToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Section divider buttons scroll to their target (default: top)
  document.querySelectorAll(".section-divider, .js-scroll-top").forEach(function (button) {
    button.addEventListener("click", function () {
      var targetSelector = button.getAttribute("data-target") || "#top";
      var target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Close mobile nav after choosing a link
  document.querySelectorAll(".main-nav__list a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (topbarInner && topbarInner.classList.contains("is-open")) {
        topbarInner.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
