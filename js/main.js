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
      if (!langMenu.contains(event.target) && !langToggle.contains(event.target)) {
        langMenu.setAttribute("hidden", "");
        langToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Language selection itself (applying translations) is handled by
    // js/i18n.js; here we just close the dropdown after a choice is made.
    langMenu.querySelectorAll("button[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
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

  // Hero parallax: as the hero scrolls past the top of the viewport,
  // the text and photo drift upward at different speeds for depth.
  var hero = document.querySelector(".hero");
  var heroContent = document.querySelector(".hero__content");
  var heroMedia = document.querySelector(".hero__media img");
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (hero && heroContent && heroMedia && !prefersReducedMotion) {
    var ticking = false;

    var updateParallax = function () {
      var rect = hero.getBoundingClientRect();
      var progress = -rect.top / rect.height;
      progress = Math.min(Math.max(progress, 0), 1);

      heroContent.style.transform = "translateY(" + progress * -60 + "px)";
      heroContent.style.opacity = String(1 - progress * 0.7);
      heroMedia.style.transform =
        "translateY(" + progress * -30 + "px) scale(" + (1 + progress * 0.06) + ")";

      ticking = false;
    };

    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }
})();
