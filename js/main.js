(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
    // The raw scroll progress (0-1) updates instantly on every scroll tick,
    // which makes the drift/fade snap into place and barely register. We
    // ease a separate "displayed" value toward it each frame so the motion
    // trails behind the scroll for a noticeable, smooth duration (~0.5s to
    // catch up) instead of jumping straight to the target.
    var targetProgress = 0;
    var displayedProgress = 0;
    var easeFactor = 0.06;
    var rafId = null;

    var render = function () {
      heroContent.style.transform = "translateY(" + displayedProgress * -60 + "px)";
      heroContent.style.opacity = String(1 - displayedProgress * 0.7);
      heroMedia.style.transform =
        "translateY(" + displayedProgress * -30 + "px) scale(" + (1 + displayedProgress * 0.06) + ")";
    };

    var tick = function () {
      displayedProgress += (targetProgress - displayedProgress) * easeFactor;

      if (Math.abs(targetProgress - displayedProgress) < 0.001) {
        displayedProgress = targetProgress;
        render();
        rafId = null;
        return;
      }

      render();
      rafId = window.requestAnimationFrame(tick);
    };

    var updateParallax = function () {
      var rect = hero.getBoundingClientRect();
      var progress = -rect.top / rect.height;
      targetProgress = Math.min(Math.max(progress, 0), 1);

      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    displayedProgress = targetProgress;
    render();
  }

  // Reveal animation: the content of every full-screen block (besides the
  // hero, which has its own parallax) fades and slides into place the
  // first time that block reaches the middle of the viewport. Purely
  // progressive enhancement — .has-js-reveal is what actually hides the
  // elements in CSS, so without JS (or with reduced motion) everything
  // just stays visible.
  //
  // Deliberately not IntersectionObserver: a section that never gets its
  // callback fired (browser quirk, timing edge case) would stay invisible
  // forever, which is much worse than not animating at all. Instead we
  // reuse the same synchronous scroll-position check as the hero parallax
  // above. Once a section has been revealed it stays revealed — we never
  // remove the class again — so a transient scroll-position glitch can
  // only fail to show something a little late, never hide it again.
  var revealSections = document.querySelectorAll(
    ".directions, .project-block, .priorities, .approach, .contact"
  );

  if (revealSections.length && !prefersReducedMotion) {
    document.documentElement.classList.add("has-js-reveal");

    var revealList = Array.prototype.slice.call(revealSections);
    var revealTicking = false;

    var updateReveal = function () {
      var viewportMid = window.innerHeight / 2;
      revealList.forEach(function (section) {
        if (section.classList.contains("in-view")) return;
        var rect = section.getBoundingClientRect();
        if (rect.top < viewportMid && rect.bottom > viewportMid) {
          section.classList.add("in-view");
        }
      });
      revealTicking = false;
    };

    var onRevealScroll = function () {
      if (!revealTicking) {
        window.requestAnimationFrame(updateReveal);
        revealTicking = true;
      }
    };

    window.addEventListener("scroll", onRevealScroll, { passive: true });
    window.addEventListener("resize", onRevealScroll);
    updateReveal();
  }

  // Full-page slide navigation: each full-screen block behaves like a
  // slide — one wheel or Page Up/Down gesture animates smoothly to the
  // next or previous block with our own easing, instead of relying on
  // the browser's own (short, browser-dependent) scroll-snap timing.
  // The footer sits outside this system and stays reachable by plain
  // scrolling once the visitor scrolls past the last block.
  var pages = Array.prototype.slice.call(
    document.querySelectorAll(".hero, .directions, .project-block, .priorities, .approach, .contact")
  );
  var siteFooter = document.querySelector(".site-footer");
  var siteHeader = document.querySelector(".site-header");

  if (pages.length && !prefersReducedMotion) {
    var pageAnimating = false;

    var headerOffset = function () {
      return siteHeader ? siteHeader.offsetHeight : 0;
    };

    var pageTop = function (page) {
      return page.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    };

    var currentPageIndex = function () {
      var pos = window.pageYOffset;
      var closest = 0;
      var closestDist = Infinity;
      pages.forEach(function (page, i) {
        var dist = Math.abs(pageTop(page) - pos);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    };

    var footerInView = function () {
      if (!siteFooter) return false;
      return siteFooter.getBoundingClientRect().top < window.innerHeight;
    };

    var easeInOutQuad = function (t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    var animateTo = function (targetY) {
      var startY = window.pageYOffset;
      var distance = targetY - startY;
      if (Math.abs(distance) < 1) return;

      pageAnimating = true;
      var startTime = null;
      var duration = 800;

      var step = function (timestamp) {
        if (startTime === null) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var t = Math.min(elapsed / duration, 1);
        window.scrollTo({ top: startY + distance * easeInOutQuad(t), left: 0, behavior: "auto" });

        if (t < 1) {
          window.requestAnimationFrame(step);
        } else {
          pageAnimating = false;
        }
      };

      window.requestAnimationFrame(step);
    };

    var goToPage = function (index) {
      index = Math.max(0, Math.min(pages.length - 1, index));
      animateTo(pageTop(pages[index]));
    };

    // Returns true when this gesture is handled by the slide controller
    // (the caller should preventDefault), false to let the browser scroll
    // normally (used at the boundary with the footer).
    var navigate = function (direction) {
      if (pageAnimating) return true;

      var lastIndex = pages.length - 1;

      if (footerInView()) {
        if (direction < 0) {
          goToPage(lastIndex);
          return true;
        }
        return false;
      }

      var index = currentPageIndex();

      if (index === lastIndex && direction > 0) {
        return false;
      }

      goToPage(direction > 0 ? index + 1 : index - 1);
      return true;
    };

    window.addEventListener(
      "wheel",
      function (event) {
        if (!pageAnimating && Math.abs(event.deltaY) < 2) return;
        if (navigate(event.deltaY)) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    window.addEventListener("keydown", function (event) {
      if (event.key !== "PageDown" && event.key !== "PageUp") return;
      var target = event.target;
      var isFormField = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (isFormField) return;

      if (navigate(event.key === "PageDown" ? 1 : -1)) {
        event.preventDefault();
      }
    });
  }
})();
