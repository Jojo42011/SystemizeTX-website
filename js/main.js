/* ============================================================
   SYSTEMIZE TX scroll choreography & interactions
   Vanilla JS, no dependencies. Everything degrades gracefully.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById("preloader");
  var hero = document.getElementById("hero");

  function finishLoading() {
    if (preloader) preloader.classList.add("is-done");
    if (hero) hero.classList.add("is-in");
    document.body.classList.add("is-loaded");
  }

  if (prefersReduced) {
    finishLoading();
  } else {
    // Let the star draw, then lift the curtain.
    var minShow = new Promise(function (res) { setTimeout(res, 1900); });
    var loaded = new Promise(function (res) {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", res, { once: true });
    });
    Promise.all([minShow, loaded]).then(finishLoading);
    // Hard fallback so nobody is ever stuck behind the curtain.
    setTimeout(finishLoading, 5000);
  }

  /* ---------- Nav state + scroll progress ---------- */
  var nav = document.getElementById("nav");
  var progressBar = document.getElementById("scrollProgress");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      if (nav) nav.classList.toggle("is-scrolled", y > 40);
      if (progressBar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
      }
      updateSystemScene();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      mobileMenu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Hero slideshow ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".hero__city-dot"));
  var cityBox = document.getElementById("heroCity");
  var cityName = document.getElementById("heroCityName");
  var cityLine = document.getElementById("heroCityLine");
  var SLIDE_MS = 7000;
  var current = 0;
  var slideTimer = null;

  function goToSlide(index, userInitiated) {
    if (!slides.length || index === current && !userInitiated) return;
    var prev = current;
    current = index % slides.length;

    slides[prev].classList.remove("is-active");
    slides[current].classList.add("is-active");

    dots.forEach(function (d, i) {
      d.classList.toggle("is-played", i < current);
      d.classList.remove("is-active");
      if (i === current) {
        // restart the CSS progress animation
        void d.offsetWidth;
        d.classList.add("is-active");
      }
    });

    if (cityBox && cityName && cityLine) {
      cityBox.classList.add("is-switching");
      setTimeout(function () {
        cityName.textContent = slides[current].getAttribute("data-city");
        cityLine.textContent = slides[current].getAttribute("data-line");
        cityBox.classList.remove("is-switching");
      }, 380);
    }

    restartSlideTimer();
  }

  function restartSlideTimer() {
    if (slideTimer) clearTimeout(slideTimer);
    if (prefersReduced) return;
    slideTimer = setTimeout(function () {
      goToSlide((current + 1) % slides.length, false);
    }, SLIDE_MS);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { goToSlide(i, true); });
  });

  if (slides.length) restartSlideTimer();

  // Pause the slideshow when the hero is off screen, no wasted work.
  if ("IntersectionObserver" in window && hero) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) restartSlideTimer();
        else if (slideTimer) clearTimeout(slideTimer);
      });
    }, { threshold: 0.1 }).observe(hero);
  }

  /* ---------- Generic reveal-on-scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if ("IntersectionObserver" in window && !prefersReduced) {
    var siblingDelay = {};
    revealEls.forEach(function (el) {
      // Stagger siblings that share a parent (cards, list items).
      var key = el.parentElement ? revealEls.indexOf(el.parentElement.firstElementChild) : -1;
      var siblings = el.parentElement
        ? Array.prototype.filter.call(el.parentElement.children, function (c) {
            return c.hasAttribute && c.hasAttribute("data-reveal");
          })
        : [];
      if (siblings.length > 1) {
        el.style.setProperty("--rd", (siblings.indexOf(el) * 0.09) + "s");
      }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- System scene: chips converge into the core ---------- */
  var systemScene = document.getElementById("systemScene");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var systemCore = document.getElementById("systemCore");

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function updateSystemScene() {
    if (!systemScene || prefersReduced) return;
    var rect = systemScene.getBoundingClientRect();
    var vh = window.innerHeight;
    var scrollable = rect.height - vh;
    if (scrollable <= 0) return;
    var progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    // Phase 1 (0 → 0.65): chips fly to center and fade.
    var p1 = easeInOut(Math.min(1, progress / 0.65));
    chips.forEach(function (chip, i) {
      // slight per-chip lag so they don't move as one rigid mass
      var lag = (i % 4) * 0.045;
      var t = Math.max(0, Math.min(1, (p1 - lag) / (1 - lag)));
      var remain = 1 - t;
      chip.style.transform =
        "translate(calc(var(--tx) * " + remain.toFixed(4) + "), calc(var(--ty) * " + remain.toFixed(4) + "))" +
        " rotate(calc(var(--r) * " + remain.toFixed(4) + "))" +
        " scale(" + (1 - 0.55 * t).toFixed(4) + ")";
      chip.style.opacity = String(1 - 0.92 * t);
    });

    // Phase 2 (0.45 → 0.85): the core arrives.
    var p2 = Math.max(0, Math.min(1, (progress - 0.45) / 0.4));
    var e2 = easeInOut(p2);
    if (systemCore) {
      systemCore.style.opacity = String(e2);
      systemCore.style.transform = "scale(" + (0.86 + 0.14 * e2).toFixed(4) + ")";
      systemCore.style.boxShadow = "0 0 " + Math.round(70 * e2) + "px " +
        Math.round(-8 * e2) + "px rgba(216, 18, 60, " + (0.45 * e2).toFixed(3) + ")";
    }
  }

  if (prefersReduced && systemCore) {
    chips.forEach(function (chip) { chip.style.opacity = "0.25"; });
    systemCore.style.opacity = "1";
    systemCore.style.transform = "none";
  }

  /* ---------- Count-up numbers ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cio.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        if (prefersReduced) { el.textContent = String(target); return; }
        var dur = 1600;
        var t0 = null;
        function tick(ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Texas map draw ---------- */
  var texasMap = document.querySelector(".texas__map");
  var texasPath = document.getElementById("texasPath");
  if (texasPath && texasPath.getTotalLength) {
    try {
      texasPath.style.setProperty("--pathlen", Math.ceil(texasPath.getTotalLength() + 2));
    } catch (e) { /* keep CSS fallback */ }
  }
  if (texasMap && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          texasMap.classList.add("is-visible");
          obs.unobserve(texasMap);
        }
      });
    }, { threshold: 0.35 }).observe(texasMap);
  }

  /* ---------- Initial paint ---------- */
  onScroll();
})();
