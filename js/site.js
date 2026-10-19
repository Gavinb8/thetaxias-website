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
// The final value is also kept as an invisible copy, so the number always takes up its full
// width and the text around it does not move while it counts (meeting note 10).
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll("[data-countup]");
  if (reduce || !("IntersectionObserver" in window) || !els.length) return;
  els.forEach(function (el) {
    var text = el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = '<span class="cu"><span class="cu-sizer" aria-hidden="true"></span><span class="cu-live"></span></span>';
    el.querySelector(".cu-sizer").textContent = text;
    el.querySelector(".cu-live").textContent = text;
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      var el = entry.target;
      var live = el.querySelector(".cu-live");
      var text = el.getAttribute("aria-label");
      var match = text.match(/[\d,]+/);
      if (!match || !live) return;
      var target = parseInt(match[0].replace(/,/g, ""), 10);
      var useCommas = match[0].indexOf(",") > -1;
      var start = null;
      function frame(t) {
        if (!start) start = t;
        var p = Math.min((t - start) / 1200, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        var n = Math.round(target * eased);
        live.textContent = text.replace(match[0], useCommas ? n.toLocaleString("en-US") : String(n));
        if (p < 1) requestAnimationFrame(frame);
        else live.textContent = text;
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

// About page navigation. Highlights the link for the section you are in and slides the marker to it
// (vertical on a computer, along the bottom on a phone). Also feeds the drifting background bars.
(function () {
  var nav = document.querySelector(".about-nav");
  if (!nav) return;
  var list = nav.querySelector("ol");
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var pairs = links.map(function (a) {
    return { a: a, sec: document.getElementById(a.getAttribute("href").slice(1)) };
  }).filter(function (p) { return p.sec; });
  if (!pairs.length) return;
  var current = null;
  var mqPhone = window.matchMedia("(max-width: 960px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function place(link) {
    if (mqPhone.matches) {
      list.style.setProperty("--ind-x", link.offsetLeft + "px");
      list.style.setProperty("--ind-w", link.offsetWidth + "px");
      var target = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
      nav.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
    } else {
      list.style.setProperty("--ind-y", link.offsetTop + "px");
      list.style.setProperty("--ind-h", link.offsetHeight + "px");
    }
  }
  function setActive(link) {
    if (link === current) return;
    links.forEach(function (l) {
      var on = l === link;
      l.classList.toggle("is-active", on);
      if (on) l.setAttribute("aria-current", "location"); else l.removeAttribute("aria-current");
    });
    current = link;
    place(link);
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      document.documentElement.style.setProperty("--sy", String(Math.round(window.scrollY)));
      // Active section = the last one whose top has passed a line a third of the way down the screen
      var line = window.innerHeight * 0.33;
      var active = pairs[0];
      pairs.forEach(function (p) {
        if (p.sec.getBoundingClientRect().top <= line) active = p;
      });
      // At the very bottom of the page, the last section wins even if it is short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = pairs[pairs.length - 1];
      setActive(active.a);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { if (current) place(current); onScroll(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (current) place(current); });
  onScroll();
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
