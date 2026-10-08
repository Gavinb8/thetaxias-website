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

// Fade sections in as they scroll into view. Reduced motion is handled in CSS.
(function () {
  var items = document.querySelectorAll(".reveal");
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
