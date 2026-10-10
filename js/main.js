(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Preloader: hide once the page (including images/fonts) has
  // finished loading, then remove it from the flow entirely.
  var preloader = document.querySelector(".preloader");
  if (preloader) {
    var hidePreloader = function () {
      preloader.classList.add("is-hidden");
      window.setTimeout(function () {
        preloader.hidden = true;
      }, prefersReducedMotion ? 0 : 450);
    };
    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader);
    }
  }

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

  // Active nav link: highlight whichever header link matches the
  // section currently centred in the viewport.
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.main-nav__list a[href^="#"]')
  );
  var navSections = navLinks
    .map(function (link) {
      var target = document.querySelector(link.getAttribute("href"));
      return target ? { link: link, el: target } : null;
    })
    .filter(Boolean);

  if (navSections.length) {
    var updateActiveNav = function () {
      var centerY = window.innerHeight / 2;
      var current = null;
      navSections.forEach(function (entry) {
        var rect = entry.el.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom >= centerY) {
          current = entry;
        }
      });
      navSections.forEach(function (entry) {
        entry.link.classList.toggle("is-active", entry === current);
      });
    };

    var navTicking = false;
    var onNavScroll = function () {
      if (!navTicking) {
        window.requestAnimationFrame(function () {
          updateActiveNav();
          navTicking = false;
        });
        navTicking = true;
      }
    };

    window.addEventListener("scroll", onNavScroll, { passive: true });
    window.addEventListener("resize", onNavScroll);
    updateActiveNav();
  }

  // Back-to-top marks: fade out while the page is actively scrolling,
  // fade back in once scrolling has settled.
  var idleMarks = document.querySelectorAll(".screen-end__mark--active");
  if (idleMarks.length) {
    var setIdle = function (isIdle) {
      idleMarks.forEach(function (mark) {
        mark.classList.toggle("is-idle", isIdle);
      });
    };

    if (prefersReducedMotion) {
      setIdle(true);
    } else {
      var idleTimer = null;
      var onIdleScroll = function () {
        setIdle(false);
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(function () {
          setIdle(true);
        }, 400);
      };
      window.addEventListener("scroll", onIdleScroll, { passive: true });
      idleTimer = window.setTimeout(function () {
        setIdle(true);
      }, 400);
    }
  }

  // Approach steps: cycle the highlighted step automatically, pausing
  // while the visitor's mouse is over the row.
  var approachSteps = document.querySelectorAll(".approach-step");
  var approachRow = document.querySelector(".approach__steps");
  if (approachSteps.length && approachRow) {
    var activeIndex = 0;

    var setActiveStep = function (index) {
      approachSteps.forEach(function (step, i) {
        step.classList.toggle("is-active", i === index);
      });
    };

    setActiveStep(activeIndex);

    if (!prefersReducedMotion) {
      var approachInterval = null;

      var startApproachCycle = function () {
        approachInterval = window.setInterval(function () {
          activeIndex = (activeIndex + 1) % approachSteps.length;
          setActiveStep(activeIndex);
        }, 2400);
      };

      var stopApproachCycle = function () {
        window.clearInterval(approachInterval);
      };

      startApproachCycle();
      approachRow.addEventListener("mouseenter", stopApproachCycle);
      approachRow.addEventListener("mouseleave", startApproachCycle);
    }
  }
})();
