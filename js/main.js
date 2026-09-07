/* ==========================================================================
   Systemize TX — interactions
   Vanilla JS, no dependencies, no build step.
   Everything here is progressive: with JS off, the site is fully readable
   and every link and CTA still works.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Header: hairline appears once you scroll ------------------ */
  var headerEl = document.getElementById("siteHeader");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      if (headerEl) {
        headerEl.classList.toggle("is-scrolled", (window.scrollY || 0) > 8);
      }
      spy();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------------------------------------- */
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  function setNav(open) {
    if (!toggle || !mobileNav) return;
    mobileNav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });

    // Never leave the panel open when the desktop nav takes over.
    var wide = window.matchMedia("(min-width: 900px)");
    var onWide = function (e) { if (e.matches) setNav(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* ---------- Reveal on scroll (subtle, and optional) ------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function showAll() {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    showAll();
  } else {
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var siblings = Array.prototype.filter.call(parent.children, function (c) {
        return c.hasAttribute && c.hasAttribute("data-reveal");
      });
      if (siblings.length > 1) {
        var i = siblings.indexOf(el);
        el.style.setProperty("--rd", Math.min(i, 5) * 0.05 + "s");
      }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

    revealEls.forEach(function (el) { io.observe(el); });

    // Anything still hidden shortly after load gets shown regardless, so
    // content is never gated behind an animation that did not fire.
    window.addEventListener("load", function () { setTimeout(showAll, 1200); });
  }

  // If the user turns reduced motion on mid-session, stop hiding things.
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", function (e) { if (e.matches) showAll(); });
  }

  /* ---------- Scrollspy for the homepage anchor nav --------------------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]:not(.btn), .mobile-nav a[href^="#"]:not(.btn)')
  );
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href").split("#")[1];
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  function spy() {
    if (!sections.length) return;
    var line = window.scrollY + window.innerHeight * 0.32;
    var active = null;
    sections.forEach(function (s) {
      if (s.offsetTop <= line) active = s.id;
    });
    // At the very bottom, the last section wins.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      active = sections[sections.length - 1].id;
    }
    navLinks.forEach(function (a) {
      var id = a.getAttribute("href").split("#")[1];
      var on = !!active && id === active;
      a.classList.toggle("is-current", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  onScroll();
})();
