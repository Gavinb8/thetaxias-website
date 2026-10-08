// Small helpers shared by every page. No libraries.

document.documentElement.classList.add("js");

// Mobile menu toggle. Closes on Escape and when a link is picked.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// Header gets a bottom border once the page is scrolled.
// Watches a 1px marker at the top of the page instead of using a scroll listener.
(function () {
  var header = document.querySelector(".site-header");
  if (!header || !("IntersectionObserver" in window)) return;
  var marker = document.createElement("div");
  marker.setAttribute("aria-hidden", "true");
  marker.style.cssText = "position:absolute;top:0;left:0;height:1px;width:1px;";
  document.body.prepend(marker);
  new IntersectionObserver(function (entries) {
    header.classList.toggle("scrolled", !entries[0].isIntersecting);
  }).observe(marker);
})();

// Fade sections in as they scroll into view. Also draws the bend stripe on .bend
// sections and builds [data-stagger] containers child by child. Reduced motion is handled in CSS.
(function () {
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  });
  var items = document.querySelectorAll(".reveal, .bend, [data-stagger]");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();

// Count-up numbers. The real value is written in the HTML (e.g. "$50K"), so it is correct
// without JS and for screen readers. This only animates from 0 up to that value, once.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll("[data-countup]");
  if (reduce || !("IntersectionObserver" in window) || !els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      var el = entry.target;
      var text = el.textContent;
      var match = text.match(/[\d,]+/);
      if (!match) return;
      var target = parseInt(match[0].replace(/,/g, ""), 10);
      var useCommas = match[0].indexOf(",") > -1;
      var start = null;
      el.setAttribute("aria-label", text);
      function frame(t) {
        if (!start) start = t;
        var p = Math.min((t - start) / 1200, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        var n = Math.round(target * eased);
        el.textContent = text.replace(match[0], useCommas ? n.toLocaleString("en-US") : String(n));
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = text;
      }
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.6 });
  els.forEach(function (el) { io.observe(el); });
})();

// Name ticker. Students only edit the one <ul> of names in the HTML. This copies it once
// (hidden from screen readers) so the loop is seamless, and wires up the pause button.
(function () {
  document.querySelectorAll(".ticker-track").forEach(function (track) {
    var list = track.querySelector("ul");
    if (!list) return;
    var copy = list.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);
    // Speed scales with list length so short and long lists move at the same pace
    track.style.setProperty("--ticker-speed", Math.max(25, list.children.length * 5) + "s");
  });
  document.querySelectorAll(".ticker-toggle").forEach(function (btn) {
    var section = btn.closest(".names");
    btn.addEventListener("click", function () {
      var paused = section.classList.toggle("paused");
      btn.setAttribute("aria-pressed", paused ? "true" : "false");
      btn.textContent = paused ? "Play" : "Pause";
    });
  });
})();

// Forms aren't connected to a service yet (RAIL item 20). Until they are, stop the
// submit and say so, instead of silently doing nothing.
// Remove data-pending from a form once its action points at a real endpoint.
(function () {
  document.querySelectorAll("form[data-pending]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) status.textContent = "This form isn't connected yet. Please email us using the address on this page.";
    });
  });
})();

// Keep the footer year current so it doesn't go stale
(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
