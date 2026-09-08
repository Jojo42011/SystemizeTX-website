/* ==========================================================================
   Systemize TX
   Vanilla JS, no dependencies, no build step.
   Everything here is progressive: with JavaScript off the site is fully
   readable and every link, CTA and email fallback still works.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var CONTACT = "devon@systemizetx.com";

  /* ======================================================================
     1. HEADER: scroll progress, shadow, dropdowns, mobile panel
     The desktop/mobile breakpoint is CSS only (max-width: 900px). Deciding
     it here from matchMedia is what made desktop viewports render the
     mobile header; do not reintroduce that.
     ====================================================================== */
  var header = document.getElementById("stxHeader");
  var progress = document.getElementById("stxProgress");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset || 0;
      if (header) header.classList.toggle("is-scrolled", y > 8);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progress.style.transform = "scaleX(" + p + ")";
      }
      checkReveals();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---- Dropdowns ------------------------------------------------------ */
  var drops = Array.prototype.slice.call(document.querySelectorAll(".stx-drop"));
  var closeTimer = null;

  function closeAllDrops() {
    drops.forEach(function (d) {
      d.classList.remove("is-open");
      var t = d.querySelector(".stx-drop__trigger");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  }
  function openDrop(drop) {
    clearTimeout(closeTimer);
    closeAllDrops();
    drop.classList.add("is-open");
    var t = drop.querySelector(".stx-drop__trigger");
    if (t) t.setAttribute("aria-expanded", "true");
  }
  function scheduleClose() {
    clearTimeout(closeTimer);
    // A short delay so the pointer can travel from trigger to panel.
    closeTimer = setTimeout(closeAllDrops, 240);
  }

  drops.forEach(function (drop) {
    var trigger = drop.querySelector(".stx-drop__trigger");
    if (!trigger) return;
    drop.addEventListener("mouseenter", function () { openDrop(drop); });
    drop.addEventListener("mouseleave", scheduleClose);
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      if (drop.classList.contains("is-open")) closeAllDrops();
      else openDrop(drop);
    });
    drop.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeAllDrops);
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".stx-drop")) closeAllDrops();
  });

  /* ---- Mobile panel --------------------------------------------------- */
  var burger = document.getElementById("stxBurger");

  function setMenu(open) {
    if (!header || !burger) return;
    header.classList.toggle("is-menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    var mobileNav = document.getElementById("stx-mobile-menu");
    if (mobileNav) {
      mobileNav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
      });
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeAllDrops();
    if (burger && burger.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      burger.focus();
    }
  });

  /* ======================================================================
     2. SCROLL REVEALS
     Deliberately slow. Guaranteed to resolve: an interval sweep plus a
     safety timer, so content is never left behind an animation.
     ====================================================================== */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  function checkReveals() {
    if (reduceMotion.matches) return revealAll();
    var vh = window.innerHeight || 800;
    for (var i = 0; i < revealEls.length; i++) {
      var el = revealEls[i];
      if (el.classList.contains("is-in")) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("is-in");
    }
  }

  if (reduceMotion.matches) {
    revealAll();
  } else {
    checkReveals();
    var sweep = setInterval(checkReveals, 250);
    setTimeout(function () { clearInterval(sweep); }, 8000);
    // If nothing has fired by then, show everything regardless.
    setTimeout(function () {
      if (!document.querySelector("[data-reveal].is-in")) revealAll();
    }, 1500);
    window.addEventListener("load", function () { setTimeout(revealAll, 4000); });
  }
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", function (e) { if (e.matches) revealAll(); });
  }

  /* ======================================================================
     3. STEP RING
     Rotation is pure CSS. This only drives the caption below the ring.
     ====================================================================== */
  Array.prototype.slice.call(document.querySelectorAll(".stx-ringwrap")).forEach(function (wrap) {
    var label = wrap.querySelector(".stx-ringcaption__label");
    var body = wrap.querySelector(".stx-ringcaption__body");
    if (!label || !body) return;
    var hint = body.getAttribute("data-hint") || "";

    function show(card) {
      label.textContent = card.getAttribute("data-step-label") || "";
      body.textContent = card.getAttribute("data-step-body") || "";
    }
    function clear() {
      label.textContent = "";
      body.textContent = hint;
    }

    wrap.querySelectorAll(".stx-ringcard").forEach(function (card) {
      card.addEventListener("mouseenter", function () { show(card); });
      card.addEventListener("focus", function () { show(card); });
      card.addEventListener("mouseleave", clear);
      card.addEventListener("blur", clear);
    });
  });

  /* ======================================================================
     4. FAQ ACCORDION, one panel open at a time
     ====================================================================== */
  var faqButtons = Array.prototype.slice.call(document.querySelectorAll(".stx-faq__q"));
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      faqButtons.forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        var panel = document.getElementById(other.getAttribute("aria-controls"));
        if (panel) panel.hidden = true;
      });
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        var own = document.getElementById(btn.getAttribute("aria-controls"));
        if (own) own.hidden = false;
      }
    });
  });

  /* ======================================================================
     5. BOOKING DIALOG
     Intercepts every [data-book] CTA. Step 1 routes to an industry page,
     step 2 is a contact form that composes a mailto. With JavaScript off,
     each CTA falls through to its href (the on-page booking section).
     ====================================================================== */
  var dialog = document.getElementById("stxBookDialog");
  if (dialog) {
    var panel = dialog.querySelector(".stx-dialog__panel");
    var stepPick = document.getElementById("stxBookPick");
    var stepForm = document.getElementById("stxBookForm");
    var form = dialog.querySelector("form");
    var lastFocus = null;

    function focusFirst() {
      var step = stepPick.hidden ? stepForm : stepPick;
      var f = step.querySelector('a, button:not([data-dialog-close]), input, textarea');
      if (f) f.focus();
    }
    function setStep(name) {
      stepPick.hidden = name !== "pick";
      stepForm.hidden = name !== "form";
      requestAnimationFrame(focusFirst);
    }
    function openDialog(trigger) {
      lastFocus = trigger || document.activeElement;
      dialog.hidden = false;
      document.body.style.overflow = "hidden";
      setStep("pick");
    }
    function closeDialog() {
      dialog.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-book]");
      if (trigger) {
        e.preventDefault();
        openDialog(trigger);
        return;
      }
      if (e.target.closest("[data-dialog-close]") || e.target === dialog) closeDialog();
    });

    document.addEventListener("keydown", function (e) {
      if (dialog.hidden) return;
      if (e.key === "Escape") { closeDialog(); return; }
      if (e.key !== "Tab") return;
      // Keep focus inside the panel.
      var focusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      var visible = Array.prototype.filter.call(focusable, function (el) {
        return el.offsetParent !== null;
      });
      if (!visible.length) return;
      var first = visible[0], last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    dialog.querySelectorAll("[data-dialog-step]").forEach(function (btn) {
      btn.addEventListener("click", function () { setStep(btn.getAttribute("data-dialog-step")); });
    });
    dialog.querySelectorAll("[data-dialog-route]").forEach(function (a) {
      a.addEventListener("click", function () { dialog.hidden = true; document.body.style.overflow = ""; });
    });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = form.elements.name.value.trim();
        var email = form.elements.email.value.trim();
        var company = form.elements.company.value.trim();
        var detail = form.elements.detail.value.trim();
        if (!name || !email || !detail) {
          var firstEmpty = Array.prototype.filter.call(
            form.querySelectorAll("input, textarea"),
            function (el) { return el.name !== "company" && !el.value.trim(); }
          )[0];
          if (firstEmpty) firstEmpty.focus();
          return;
        }
        var body = [
          "Name: " + name,
          "Email: " + email,
          "Company: " + (company || "(not given)"),
          "",
          "What the business does and where the bottleneck is:",
          detail
        ].join("\n");
        window.location.href = "mailto:" + CONTACT +
          "?subject=" + encodeURIComponent("Profit and operations review request") +
          "&body=" + encodeURIComponent(body);
        closeDialog();
      });
    }
  }

  onScroll();
})();
