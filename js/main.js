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

  // Page-by-page switching (Pageable, MIT): on desktop (>= 1024px) each
  // full-screen block is a page, one wheel tick / swipe / key press moves
  // to the next one. Below 1024px — and with reduced motion — the page
  // scrolls normally.
  //
  // Pageable tracks the current page, draws the dots and handles the
  // keyboard and #anchor links. What it can't do is added here:
  //  - "cover" transition: the container Pageable slides is pinned in CSS
  //    and the pages are stacked instead; .is-shown / .is-covered set here
  //    make the next page slide up over the current one;
  //  - wheel: content taller than a low screen scrolls inside its page
  //    first, and one gesture (including trackpad inertia) flips only one
  //    page;
  //  - touch: swipes are handled here, since Pageable cancels touchstart,
  //    which would break taps on links and buttons.
  // Pages are the elements with data-anchor; it must equal their id,
  // because Pageable rewrites the id from it.
  var PAGE_SPEED = 900;
  var PAGE_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
  var pageContainer = document.querySelector("#main");
  var desktopQuery = window.matchMedia("(min-width: 1024px)");
  var pager = null;

  if (pageContainer && typeof window.Pageable === "function" && !prefersReducedMotion) {
    var pages = Array.prototype.slice.call(pageContainer.querySelectorAll("[data-anchor]"));

    pages.forEach(function (page, i) {
      page.style.zIndex = String(i + 1); // later pages lie on top
    });
    pageContainer.style.setProperty("--pg-speed", PAGE_SPEED + "ms");
    pageContainer.style.setProperty("--pg-ease", PAGE_EASE);

    var setCoverState = function (activeIndex) {
      var activeIsFooter = pages[activeIndex].classList.contains("site-footer");
      if (activeIsFooter) {
        pageContainer.style.setProperty("--pg-footer-height", pages[activeIndex].offsetHeight + "px");
      }
      pages.forEach(function (page, i) {
        var isAboveFooter = activeIsFooter && i === activeIndex - 1;
        page.classList.toggle("is-shown", i <= activeIndex);
        // The footer doesn't cover the last block: that block moves up by
        // the footer's height instead, like a regular scroll to the end.
        page.classList.toggle("is-covered", i < activeIndex && !isAboveFooter);
        page.classList.toggle("is-lifted", isAboveFooter);
        // Pages still below always slide in from their top.
        if (i > activeIndex) page.scrollTop = 0;
      });
    };

    // Whether the page's own content can still scroll that way. Overflow
    // that fits into the bottom padding doesn't count: it's visible anyway.
    var canScrollInside = function (page, direction) {
      var max = page.scrollHeight - page.clientHeight;
      if (max <= (parseFloat(window.getComputedStyle(page).paddingBottom) || 0)) return false;
      return direction > 0 ? page.scrollTop < max - 1 : page.scrollTop > 1;
    };

    var flip = function (direction) {
      if (direction > 0) {
        pager.next();
      } else {
        pager.prev();
      }
    };

    var enablePager = function () {
      if (pager) return;
      pager = new window.Pageable("#main", {
        animation: PAGE_SPEED,
        pips: true,
        // Wheel and touch are handled below; mouse dragging is off.
        events: { wheel: false, mouse: false, touch: false, keydown: true },
        onBeforeStart: function () {
          setCoverState(this.index);
        }
      });
      setCoverState(pager.index);
      document.body.classList.add("pg-cover");
    };

    var disablePager = function () {
      if (!pager) return;
      pager.destroy();
      pager = null;
      document.body.classList.remove("pg-cover");
      pages.forEach(function (page) {
        page.classList.remove("is-shown", "is-covered", "is-lifted");
      });
    };

    // Wheel: a pause, a change of direction or a stronger push starts a
    // new gesture; the fading tail of trackpad inertia doesn't. Each
    // gesture either scrolls inside the page or flips one page — never
    // both, so reaching the end of a long page doesn't overshoot.
    var lastWheelAt = 0;
    var lastWheelDelta = 0;
    var gestureUsed = false;

    pageContainer.addEventListener("wheel", function (event) {
      if (!pager) return;
      // Pageable's own wheel handler always cancels native scrolling.
      event.stopPropagation();

      var delta = event.deltaY;
      if (!delta) return;

      var direction = delta > 0 ? 1 : -1;
      var now = Date.now();
      var newGesture = now - lastWheelAt > 200 ||
        direction !== (lastWheelDelta > 0 ? 1 : -1) ||
        Math.abs(delta) > Math.abs(lastWheelDelta) + 15;
      lastWheelAt = now;
      lastWheelDelta = delta;
      if (newGesture) gestureUsed = false;

      if (canScrollInside(pages[pager.index], direction)) {
        gestureUsed = true;
        return;
      }

      event.preventDefault();
      if (gestureUsed || pager.scrolling) {
        gestureUsed = true;
        return;
      }
      gestureUsed = true;
      flip(direction);
    }, { passive: false });

    // Touch: a vertical swipe flips the page unless the page's content
    // could still scroll that way when the swipe began.
    var touchStartY = null;
    var touchCouldScroll = null;

    pageContainer.addEventListener("touchstart", function (event) {
      if (!pager) return;
      event.stopPropagation();
      var page = pages[pager.index];
      touchStartY = event.touches[0].clientY;
      touchCouldScroll = { down: canScrollInside(page, 1), up: canScrollInside(page, -1) };
    }, { passive: true });

    pageContainer.addEventListener("touchend", function (event) {
      if (!pager || touchStartY === null) return;
      var distance = touchStartY - event.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(distance) < 50 || pager.scrolling) return;
      var direction = distance > 0 ? 1 : -1;
      if (direction > 0 ? touchCouldScroll.down : touchCouldScroll.up) return;
      flip(direction);
    });

    var syncPager = function () {
      if (desktopQuery.matches) {
        enablePager();
      } else {
        disablePager();
      }
    };

    syncPager();
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", syncPager);
    } else {
      desktopQuery.addListener(syncPager);
    }
  }

  // With Pageable active go to the page that is or holds the target;
  // otherwise scroll natively (scroll-margin-top keeps the section clear
  // of the sticky header).
  var scrollToTarget = function (target) {
    var page = pager && (target.closest("[data-anchor]") || target.querySelector("[data-anchor]"));
    if (page) {
      pager.scrollToAnchor("#" + page.id);
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  // Section divider buttons scroll to their target (default: top)
  document.querySelectorAll(".section-divider, .js-scroll-top").forEach(function (button) {
    button.addEventListener("click", function () {
      var targetSelector = button.getAttribute("data-target") || "#top";
      var target = document.querySelector(targetSelector);
      if (target) {
        scrollToTarget(target);
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
