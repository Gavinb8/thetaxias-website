// Fills the editable parts of the site from the files in /data.
// Nobody edits this file to change content. People edit the data files (through the Pages CMS
// forms, or by hand), and this script turns them into the cards and lists on the page.
// See HOWTO.md. Everything is written with textContent, so odd characters in the data are safe.

(function () {
  var cache = {};

  function load(name) {
    if (!cache[name]) {
      cache[name] = fetch("data/" + name + ".json", { cache: "no-cache" }).then(function (r) {
        if (!r.ok) throw new Error(name + " " + r.status);
        return r.json();
      });
    }
    return cache[name];
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null && text !== "") n.textContent = text;
    return n;
  }
  function has(v) { return v != null && String(v).trim() !== ""; }
  // Accepts 2026-11-14, 2026-11-14T00:00:00Z or something a person typed like Nov 14 2026. Returns YYYY-MM-DD or "".
  function iso(v) {
    if (!has(v)) return "";
    var m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return m[1] + "-" + m[2] + "-" + m[3];
    var d = new Date(v);
    if (isNaN(d)) return "";
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function initials(name) {
    return String(name).split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
  }
  function photo(src, alt) {
    var wrap = el("div", "photo");
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    wrap.appendChild(img);
    return wrap;
  }
  function slot(label) {
    var s = el("div", "photo-slot");
    s.appendChild(el("span", "", label));
    return s;
  }
  function stagger(container) {
    Array.prototype.forEach.call(container.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  }

  // ---- renderers: each one gets the container and its data and returns nothing ----

  var renderers = {
    members: function (box, rows) {
      var group = box.getAttribute("data-group");
      rows.filter(function (m) { return m.group === group; }).forEach(function (m) {
        var exec = group === "Executive board";
        var card = el("article", "member " + (exec ? "exec" : "compact"));
        if (has(m.photo)) {
          card.appendChild(photo(m.photo, m.name));
        } else {
          var s = el("div", "photo-slot");
          s.setAttribute("aria-hidden", "true");
          s.appendChild(el("span", "initials", initials(m.name)));
          card.appendChild(s);
        }
        var plate = el("div", "member-plate");
        plate.appendChild(el("p", "member-role", m.role));
        plate.appendChild(el("h4", "", m.name));
        if (has(m.roll)) plate.appendChild(el("p", "meta", "ΑΣ " + m.roll));
        card.appendChild(plate);
        var year = [];
        if (has(m.standing)) year.push(m.standing);
        if (has(m.grad_year)) year.push("Class of " + m.grad_year);
        card.appendChild(el("p", "member-year", year.join(", ")));
        card.appendChild(el("p", "member-bio", m.bio));
        var dl = el("dl", "member-positions");
        var now = el("div"); now.appendChild(el("dt", "", "Now")); now.appendChild(el("dd", "", m.role));
        var before = el("div"); before.appendChild(el("dt", "", "Before")); before.appendChild(el("dd", "", m.past_positions));
        dl.appendChild(now); dl.appendChild(before);
        card.appendChild(dl);
        box.appendChild(card);
      });
    },

    alumniBoard: function (box, rows) {
      rows.forEach(function (r) {
        var d = el("div");
        d.appendChild(el("dt", "", r.title));
        d.appendChild(el("dd", "", r.name));
        box.appendChild(d);
      });
    },

    house: function (box, rows) {
      var section = box.getAttribute("data-section");
      rows.filter(function (r) { return r.section === section; }).forEach(function (r) {
        var fig = el("figure", "house-tile" + (r.featured ? " feature" : ""));
        fig.appendChild(has(r.photo) ? photo(r.photo, r.alt) : slot("Photo coming soon"));
        fig.appendChild(el("figcaption", "", r.caption));
        box.appendChild(fig);
      });
    },

    quotes: function (box, rows) {
      rows.forEach(function (q) {
        var fig = el("figure", "why-card");
        fig.appendChild(el("p", "why-kind", q.kind));
        var bq = el("blockquote");
        bq.appendChild(el("p", "", q.quote));
        fig.appendChild(bq);
        var cap = el("figcaption");
        cap.appendChild(el("span", "who", q.name));
        cap.appendChild(el("span", "what", q.detail));
        fig.appendChild(cap);
        box.appendChild(fig);
      });
    },

    events: function (box, rows) {
      var today = new Date();
      var todayKey = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
      var upcoming = rows.map(function (e) { e = Object.assign({}, e); e.date = iso(e.date); return e; })
        .filter(function (e) { return has(e.title) && e.date && e.date >= todayKey; })
        .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      var empty = document.getElementById(box.getAttribute("data-empty"));
      if (!upcoming.length) { if (empty) empty.hidden = false; box.hidden = true; return; }
      if (empty) empty.hidden = true;
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      upcoming.forEach(function (e) {
        var parts = e.date.split("-");
        var card = el("article", "event");
        var t = document.createElement("time");
        t.setAttribute("datetime", e.date);
        t.appendChild(el("b", "", String(parseInt(parts[2], 10))));
        t.appendChild(el("small", "", months[parseInt(parts[1], 10) - 1] || ""));
        card.appendChild(t);
        var body = el("div");
        body.appendChild(el("h3", "", e.title));
        var line = [e.time, e.place].filter(has).join(" · ");
        var text = [line, e.description].filter(has).join(". ");
        if (text) body.appendChild(el("p", "", text));
        card.appendChild(body);
        if (has(e.link) && /^https?:\/\//.test(e.link)) {
          var a = el("a", "text-link", "Details");
          a.href = e.link; a.target = "_blank"; a.rel = "noopener";
          card.appendChild(a);
        }
        box.appendChild(card);
      });
    },

    // Live Instagram feed from Behold (free plan). Only turns on when data/site.json has a feed ID.
    instagram: function (box, site) {
      var id = site && site.instagram_feed_id ? String(site.instagram_feed_id).trim() : "";
      if (!/^[A-Za-z0-9_-]{6,64}$/.test(id)) return;
      var widget = document.createElement("behold-widget");
      widget.setAttribute("feed-id", id);
      box.appendChild(widget);
      var fallback = document.getElementById("ig-fallback");
      if (fallback) fallback.hidden = true;
      var s = document.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      document.head.appendChild(s);
    },

    news: function (box, rows) {
      var posts = rows.map(function (n) { n = Object.assign({}, n); n.date = iso(n.date); return n; })
        .filter(function (n) { return has(n.title); })
        .sort(function (a, b) { return (a.date || "") < (b.date || "") ? 1 : -1; });
      var section = box.closest("section");
      if (!posts.length) { if (section) section.hidden = true; return; }
      var fmt = { year: "numeric", month: "long", day: "numeric" };
      posts.forEach(function (n) {
        var card = el("article", "award news-post");
        if (has(n.photo)) card.appendChild(photo(n.photo, n.photo_alt));
        if (has(n.date)) {
          var d = new Date(n.date + "T12:00:00");
          var when = el("p", "amount-note", isNaN(d) ? n.date : d.toLocaleDateString("en-US", fmt));
          card.appendChild(when);
        }
        card.appendChild(el("h3", "", n.title));
        if (has(n.summary)) card.appendChild(el("p", "", n.summary));
        if (has(n.link) && /^https?:\/\//.test(n.link)) {
          var a = el("a", "text-link", "Read more");
          a.href = n.link; a.target = "_blank"; a.rel = "noopener";
          card.appendChild(a);
        }
        box.appendChild(card);
      });
    }
  };

  // Which data file feeds which renderer
  var files = {
    members: "members", alumniBoard: "alumni-board", house: "house",
    quotes: "quotes", events: "events", news: "news", instagram: "site"
  };

  var targets = Array.prototype.slice.call(document.querySelectorAll("[data-render]"));
  if (!targets.length) return;

  var jobs = targets.map(function (box) {
    var kind = box.getAttribute("data-render");
    if (!renderers[kind]) return Promise.resolve();
    return load(files[kind]).then(function (rows) {
      renderers[kind](box, kind === "instagram" ? rows : (Array.isArray(rows) ? rows : []));
      stagger(box);
      box.removeAttribute("aria-busy");
    }).catch(function () {
      var note = el("p", "load-error", "We couldn't load this part of the page. Please refresh, or try again later.");
      box.appendChild(note);
      box.removeAttribute("aria-busy");
    });
  });

  // The page gets taller once the content is in. If someone arrived on a #section link,
  // scroll to it again so they land in the right place.
  Promise.all(jobs).then(function () {
    document.documentElement.classList.add("content-ready");
    if (location.hash && location.hash.length > 1) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
    window.dispatchEvent(new Event("resize"));
  });
})();
