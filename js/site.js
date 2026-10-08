// Small helpers shared by every page.

// Mobile menu toggle
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// Keep the footer year current so it doesn't go stale
(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
