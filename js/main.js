(function () {

  // Mobile Nav Toggle
  var siteHeader = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".mobile-menu .main-nav__list a");

  if (navToggle && siteHeader) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteHeader.classList.toggle("is-menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));

      // Блокируем скролл страницы при открытом меню
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Закрываем меню при клике на любую ссылку в нем
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        siteHeader.classList.remove("is-menu-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Horizontal scroll & navigation for Directions (Mobile only)
  var directionsContainer = document.querySelector(".directions__grid");

  if (directionsContainer) {
    var dirNextButtons = directionsContainer.querySelectorAll(".direction-card__next");

    dirNextButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        if (window.innerWidth >= 1024) return;

        var cards = directionsContainer.querySelectorAll(".direction-card");
        var nextIndex = (index + 1) % cards.length; // Переход к следующей карточке или зацикливание на 1-ю

        cards[nextIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      });
    });
  }

// Horizontal scroll for Approach (Mobile only)
  var approachContainer = document.querySelector(".approach__steps");

  if (approachContainer) {
    var nextButtons = approachContainer.querySelectorAll(".approach-step__next");
    
    nextButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        // Проверяем, что мы на мобильном устройстве
        if (window.innerWidth >= 1024) return;

        var steps = approachContainer.querySelectorAll(".approach-step");
        var nextIndex = (index + 1) % steps.length; // Переход к следующему шагу или закольцовывание на 1-й
        
        steps[nextIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start"
        });
      });
    });
  }
  
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
  // var hero = document.querySelector(".hero");
  // var heroContent = document.querySelector(".hero__content");
  // var heroMedia = document.querySelector(".hero__media img");

  // if (hero && heroContent && heroMedia && !prefersReducedMotion) {
  //   // The raw scroll progress (0-1) updates instantly on every scroll tick,
  //   // which makes the drift/fade snap into place and barely register. We
  //   // ease a separate "displayed" value toward it each frame so the motion
  //   // trails behind the scroll for a noticeable, smooth duration (~0.5s to
  //   // catch up) instead of jumping straight to the target.
  //   var targetProgress = 0;
  //   var displayedProgress = 0;
  //   var easeFactor = 0.06;
  //   var rafId = null;

  //   var render = function () {
  //     heroContent.style.transform = "translateY(" + displayedProgress * -60 + "px)";
  //     heroContent.style.opacity = String(1 - displayedProgress * 0.7);
  //     heroMedia.style.transform =
  //       "translateY(" + displayedProgress * -30 + "px) scale(" + (1 + displayedProgress * 0.06) + ")";
  //   };

  //   var tick = function () {
  //     displayedProgress += (targetProgress - displayedProgress) * easeFactor;

  //     if (Math.abs(targetProgress - displayedProgress) < 0.001) {
  //       displayedProgress = targetProgress;
  //       render();
  //       rafId = null;
  //       return;
  //     }

  //     render();
  //     rafId = window.requestAnimationFrame(tick);
  //   };

  //   var updateParallax = function () {
  //     var rect = hero.getBoundingClientRect();
  //     var progress = -rect.top / rect.height;
  //     targetProgress = Math.min(Math.max(progress, 0), 1);

  //     if (rafId === null) {
  //       rafId = window.requestAnimationFrame(tick);
  //     }
  //   };

  //   window.addEventListener("scroll", updateParallax, { passive: true });
  //   window.addEventListener("resize", updateParallax);
  //   displayedProgress = targetProgress;
  //   render();
  // }

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
  // var revealSections = document.querySelectorAll(
  //   ".directions, .project-block, .priorities, .approach, .contact"
  // );

  // if (revealSections.length && !prefersReducedMotion) {
  //   document.documentElement.classList.add("has-js-reveal");

  //   var revealList = Array.prototype.slice.call(revealSections);
  //   var revealTicking = false;

  //   var updateReveal = function () {
  //     var viewportMid = window.innerHeight / 2;
  //     revealList.forEach(function (section) {
  //       if (section.classList.contains("in-view")) return;
  //       var rect = section.getBoundingClientRect();
  //       if (rect.top < viewportMid && rect.bottom > viewportMid) {
  //         section.classList.add("in-view");
  //       }
  //     });
  //     revealTicking = false;
  //   };

  //   var onRevealScroll = function () {
  //     if (!revealTicking) {
  //       window.requestAnimationFrame(updateReveal);
  //       revealTicking = true;
  //     }
  //   };

  //   window.addEventListener("scroll", onRevealScroll, { passive: true });
  //   window.addEventListener("resize", onRevealScroll);
  //   updateReveal();
  // }

  // // Full-page slide navigation: each full-screen block behaves like a
  // // slide — one wheel or Page Up/Down gesture animates smoothly to the
  // // next or previous block with our own easing, instead of relying on
  // // the browser's own (short, browser-dependent) scroll-snap timing.
  // // The footer sits outside this system and stays reachable by plain
  // // scrolling once the visitor scrolls past the last block.
  // var pages = Array.prototype.slice.call(
  //   document.querySelectorAll(".hero, .directions, .project-block, .priorities, .approach, .contact")
  // );
  // var siteFooter = document.querySelector(".site-footer");
  // var siteHeader = document.querySelector(".site-header");

  // var isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  // if (pages.length && !prefersReducedMotion && isDesktop) {
  //   var pageAnimating = false;
  //   // Trackpads keep sending "wheel" events for a while after the
  //   // physical gesture ends (inertia). Without a cooldown, that
  //   // trailing burst lands right after pageAnimating resets to false
  //   // and triggers a second, unintended page change — read by the
  //   // client as the scroll "jumping two blocks at once". Swallowing
  //   // wheel input for a short window after each transition fixes it.
  //   var cooldownUntil = 0;

  //   var headerOffset = function () {
  //     return siteHeader ? siteHeader.offsetHeight : 0;
  //   };

  //   var pageTop = function (page) {
  //     return page.getBoundingClientRect().top + window.pageYOffset - headerOffset();
  //   };

  //   var currentPageIndex = function () {
  //     var pos = window.pageYOffset;
  //     var closest = 0;
  //     var closestDist = Infinity;
  //     pages.forEach(function (page, i) {
  //       var dist = Math.abs(pageTop(page) - pos);
  //       if (dist < closestDist) {
  //         closestDist = dist;
  //         closest = i;
  //       }
  //     });
  //     return closest;
  //   };

  //   var footerInView = function () {
  //     if (!siteFooter) return false;
  //     return siteFooter.getBoundingClientRect().top < window.innerHeight;
  //   };

  //   var easeInOutQuad = function (t) {
  //     return t < 0.5 ? 4 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  //   };

  //   var animateTo = function (targetY) {
  //     var startY = window.pageYOffset;
  //     var distance = targetY - startY;
  //     if (Math.abs(distance) < 1) return;

  //     pageAnimating = true;
  //     var startTime = null;
  //     var duration = 800;

  //     var step = function (timestamp) {
  //       if (startTime === null) startTime = timestamp;
  //       var elapsed = timestamp - startTime;
  //       var t = Math.min(elapsed / duration, 1);
  //       window.scrollTo({ top: startY + distance * easeInOutQuad(t), left: 0, behavior: "auto" });

  //       if (t < 1) {
  //         window.requestAnimationFrame(step);
  //       } else {
  //         pageAnimating = false;
  //         cooldownUntil = Date.now() + 350;
  //       }
  //     };

  //     window.requestAnimationFrame(step);
  //   };

  //   var goToPage = function (index) {
  //     index = Math.max(0, Math.min(pages.length - 1, index));
  //     animateTo(pageTop(pages[index]));
  //   };

  //   // Returns true when this gesture is handled by the slide controller
  //   // (the caller should preventDefault), false to let the browser scroll
  //   // normally (used at the boundary with the footer).
  //   var navigate = function (direction) {
  //     if (pageAnimating || Date.now() < cooldownUntil) return true;

  //     var lastIndex = pages.length - 1;

  //     if (footerInView()) {
  //       if (direction < 0) {
  //         goToPage(lastIndex);
  //         return true;
  //       }
  //       return false;
  //     }

  //     var index = currentPageIndex();

  //     if (index === lastIndex && direction > 0) {
  //       return false;
  //     }

  //     goToPage(direction > 0 ? index + 1 : index - 1);
  //     return true;
  //   };

  //   window.addEventListener(
  //     "wheel",
  //     function (event) {
  //       if (window.innerWidth < 1024) return;

  //       if (!pageAnimating && Math.abs(event.deltaY) < 2) return;
  //       if (navigate(event.deltaY)) {
  //         event.preventDefault();
  //       }
  //     },
  //     { passive: false }
  //   );

  //   window.addEventListener("keydown", function (event) {
  //     if (event.key !== "PageDown" && event.key !== "PageUp") return;
  //     var target = event.target;
  //     var isFormField = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
  //     if (isFormField) return;

  //     if (navigate(event.key === "PageDown" ? 1 : -1)) {
  //       event.preventDefault();
  //     }
  //   });
  // }

  // // Active nav link: highlight whichever header link matches the
  // // section currently centred in the viewport.
  // var navLinks = Array.prototype.slice.call(
  //   document.querySelectorAll('.main-nav__list a[href^="#"]')
  // );
  // var navSections = navLinks
  //   .map(function (link) {
  //     var target = document.querySelector(link.getAttribute("href"));
  //     return target ? { link: link, el: target } : null;
  //   })
  //   .filter(Boolean);

  // if (navSections.length) {
  //   var updateActiveNav = function () {
  //     var centerY = window.innerHeight / 2;
  //     var current = null;
  //     navSections.forEach(function (entry) {
  //       var rect = entry.el.getBoundingClientRect();
  //       if (rect.top <= centerY && rect.bottom >= centerY) {
  //         current = entry;
  //       }
  //     });
  //     navSections.forEach(function (entry) {
  //       entry.link.classList.toggle("is-active", entry === current);
  //     });
  //   };

  //   var navTicking = false;
  //   var onNavScroll = function () {
  //     if (!navTicking) {
  //       window.requestAnimationFrame(function () {
  //         updateActiveNav();
  //         navTicking = false;
  //       });
  //       navTicking = true;
  //     }
  //   };

  //   window.addEventListener("scroll", onNavScroll, { passive: true });
  //   window.addEventListener("resize", onNavScroll);
  //   updateActiveNav();
  // }

  // // Back-to-top marks: fade out while the page is actively scrolling,
  // // fade back in once scrolling has settled.
  // var idleMarks = document.querySelectorAll(".screen-end__mark--active");
  // if (idleMarks.length) {
  //   var setIdle = function (isIdle) {
  //     idleMarks.forEach(function (mark) {
  //       mark.classList.toggle("is-idle", isIdle);
  //     });
  //   };

  //   if (prefersReducedMotion) {
  //     setIdle(true);
  //   } else {
  //     var idleTimer = null;
  //     var onIdleScroll = function () {
  //       setIdle(false);
  //       window.clearTimeout(idleTimer);
  //       idleTimer = window.setTimeout(function () {
  //         setIdle(true);
  //       }, 400);
  //     };
  //     window.addEventListener("scroll", onIdleScroll, { passive: true });
  //     idleTimer = window.setTimeout(function () {
  //       setIdle(true);
  //     }, 400);
  //   }
  // }

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
