(function () {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setMenu(open) {
    if (!toggle || !links) return;
    toggle.classList.toggle("open", open);
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (overlay) {
      overlay.classList.toggle("show", open);
      overlay.setAttribute("aria-hidden", open ? "false" : "true");
    }
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!links.classList.contains("open"));
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      setMenu(false);
    });
  }

  if (links) {
    links.querySelectorAll("a").forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  document.querySelectorAll(".footer-location[href='#']").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
