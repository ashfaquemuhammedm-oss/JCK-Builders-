(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const i of t.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (t.credentials = "omit")
          : (t.credentials = "same-origin"),
      t
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = o(e);
    fetch(e.href, t);
  }
})();
const m = [
    ["Home", "index.html", "home"],
    ["About", "about.html", "about"],
    ["Services", "services.html", "services"],
    ["Projects", "projects.html", "projects"],
    ["Process", "process.html", "process"],
    ["Real Estate", "real-estate.html", "real-estate"],
    ["Contact", "contact.html", "contact"],
  ],
  c =
    '<a class="brand" href="index.html" aria-label="JCK Builders & Interior LLP home"><span>JCK</span><small>BUILDERS &amp; INTERIOR LLP</small></a>',
  d = (r) =>
    m
      .map(
        ([a, o, s]) =>
          `<a href="${o}" ${r === s ? 'aria-current="page"' : ""}>${a}</a>`,
      )
      .join("");
function p() {
  const r = document.body.dataset.page;
  (document
    .querySelectorAll("[data-site-header]")
    .forEach(
      (a) =>
        (a.innerHTML = `<header class="site-header"><div class="shell nav-wrap">${c}<nav class="desktop-nav" aria-label="Primary navigation">${d(r)}</nav><a class="button button--gold nav-cta" href="contact.html">Get a quote</a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav"><i></i><i></i><i></i></button></div><div class="mobile-panel" id="mobile-nav" aria-hidden="true"><div class="shell mobile-panel__inner">${d(r)}<a class="button button--gold" href="contact.html">Get a quote</a></div></div></header>`),
    ),
    document
      .querySelectorAll("[data-site-footer]")
      .forEach(
        (a) =>
          (a.innerHTML = `<footer class="site-footer"><div class="shell footer-grid"><div>${c}<p>Construction, interiors, engineering and property solutions delivered with thoughtful execution.</p></div><div><p class="footer-label">Explore</p><a href="services.html">Services</a><a href="projects.html">Projects</a><a href="process.html">Our process</a><a href="franchise.html">Franchise</a></div><div><p class="footer-label">Office</p><address>No. 76, Ward 6, Cherukunnu,<br>Kurichakam P.O, Velome,<br>Kozhikode, Kerala – 673507, India.</address><p>Kuttiady · Calicut Hilite Business Park</p></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} JCK Builders & Interior LLP</span><span>Built for lasting work.</span></div></footer>`),
      ),
    f(),
    u(),
    window.addEventListener("jck:content-ready", u),
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.documentElement.classList.add("is-ready"),
      ),
    ));
}
function f() {
  const r = document.querySelector(".site-header"),
    a = document.querySelector(".menu-toggle"),
    o = document.querySelector(".mobile-panel");
  if (!r) return;
  const s = () => r.classList.toggle("is-scrolled", window.scrollY > 24);
  (s(),
    window.addEventListener("scroll", s, { passive: !0 }),
    a?.addEventListener("click", () => {
      const e = a.getAttribute("aria-expanded") === "true";
      (a.setAttribute("aria-expanded", String(!e)),
        o.setAttribute("aria-hidden", String(e)),
        document.body.classList.toggle("menu-open", !e));
    }),
    o
      ?.querySelectorAll("a")
      .forEach((e) => e.addEventListener("click", () => a?.click())));
}
function u() {
  const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .querySelectorAll(
      ".capability, .project-item, .service-group, .process-list article, .timeline-item, .leader, .industry-grid span",
    )
    .forEach((e, t) => {
      (e.classList.add("reveal"),
        e.style.setProperty("--reveal-delay", `${Math.min(t % 6, 4) * 70}ms`));
    });
  const o = [
    ...document.querySelectorAll(
      ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .timeline",
    ),
  ].filter((e) => !e.dataset.revealObserved);
  if (r || !("IntersectionObserver" in window)) {
    o.forEach((e) => e.classList.add("is-visible"));
    return;
  }
  const s = new IntersectionObserver(
    (e) =>
      e.forEach((t) => {
        t.isIntersecting &&
          (t.target.classList.add("is-visible"), s.unobserve(t.target));
      }),
    { threshold: 0.12, rootMargin: "0px 0px -36px" },
  );
  o.forEach((e) => {
    ((e.dataset.revealObserved = "true"), s.observe(e));
  });
}
const n = [
    {
      title: "Residence study",
      category: "residential",
      type: "Residential",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      alt: "Contemporary residential architecture",
    },
    {
      title: "Workplace study",
      category: "commercial",
      type: "Commercial",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
      alt: "Modern commercial interior",
    },
    {
      title: "Interior study",
      category: "interiors",
      type: "Interiors",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      alt: "Refined living room interior",
    },
    {
      title: "Facade study",
      category: "exteriors",
      type: "Exteriors",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      alt: "Modern exterior facade",
    },
    {
      title: "Infrastructure study",
      category: "infrastructure",
      type: "Infrastructure",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
      alt: "Construction site structure",
    },
    {
      title: "Property study",
      category: "real-estate",
      type: "Real Estate",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      alt: "Contemporary villa exterior",
    },
  ],
  v = [
    [
      "01",
      "Interiors",
      "Residential and commercial interiors, fit-outs, furnishings and modular décor.",
    ],
    [
      "02",
      "Construction",
      "Planning and execution for built environments with measured site coordination.",
    ],
    [
      "03",
      "Technical services",
      "Electrical, plumbing, solar, CCTV, air conditioning, lifts and fire safety.",
    ],
    [
      "04",
      "Real estate",
      "Villas, apartments, townships, commercial complexes and property management.",
    ],
    [
      "05",
      "Manufacturing",
      "Waterproofing systems, gypsum products, laminated furnishings and building materials.",
    ],
    [
      "06",
      "Infrastructure",
      "Civil works and support for practical, durable infrastructure delivery.",
    ],
  ];
function g(r) {
  if (!r) return;
  let a = "all",
    o = 0;
  const s = () => {
    const t = n.filter((i) => a === "all" || i.category === a);
    ((r.innerHTML = `<div class="project-filter" role="toolbar" aria-label="Filter projects">${["all", "residential", "commercial", "interiors", "exteriors", "infrastructure", "real-estate"].map((i) => `<button class="${i === a ? "is-active" : ""}" data-filter="${i}">${i === "all" ? "All" : i.replace("-", " ")}</button>`).join("")}</div><div class="project-grid">${t.map((i, l) => `<button class="project-item project-item--${l + 1}" data-project="${n.indexOf(i)}"><img src="${i.image}" alt="${i.alt}" loading="lazy"><span class="project-caption"><em>${i.type}</em><strong>${i.title}</strong></span></button>`).join("")}</div><dialog class="lightbox" aria-label="Project image viewer"><button class="lightbox-close" aria-label="Close image viewer">×</button><button class="lightbox-prev" aria-label="Previous image">←</button><figure><img src="" alt=""><figcaption></figcaption></figure><button class="lightbox-next" aria-label="Next image">→</button></dialog>`),
      e());
  };
  function e() {
    r.querySelectorAll("[data-filter]").forEach(
      (l) =>
        (l.onclick = () => {
          ((a = l.dataset.filter), s());
        }),
    );
    const t = r.querySelector("dialog"),
      i = () => {
        const l = n[o];
        ((t.querySelector("img").src = l.image),
          (t.querySelector("img").alt = l.alt),
          (t.querySelector("figcaption").textContent =
            `${l.type} — ${l.title}`));
      };
    (r.querySelectorAll("[data-project]").forEach(
      (l) =>
        (l.onclick = () => {
          ((o = Number(l.dataset.project)), i(), t.showModal());
        }),
    ),
      (t.querySelector(".lightbox-close").onclick = () => t.close()),
      (t.querySelector(".lightbox-prev").onclick = () => {
        ((o = (o - 1 + n.length) % n.length), i());
      }),
      (t.querySelector(".lightbox-next").onclick = () => {
        ((o = (o + 1) % n.length), i());
      }),
      t.addEventListener("click", (l) => {
        l.target === t && t.close();
      }));
  }
  s();
}
function h(r) {
  r &&
    r.addEventListener("submit", (a) => {
      a.preventDefault();
      let o = !0;
      (r.querySelectorAll("[required]").forEach((s) => {
        const e = s.closest(".field").querySelector(".field-error"),
          t = s.validity.valueMissing
            ? "This field is required."
            : s.validity.typeMismatch
              ? "Enter a valid email address."
              : "";
        ((e.textContent = t),
          s.setAttribute("aria-invalid", !!t),
          o && (o = !t));
      }),
        o &&
          ((r.querySelector(".form-status").textContent =
            "Your details are ready to send. Connect this form to your preferred enquiry endpoint to receive submissions."),
          r.reset()));
    });
}
g(document.querySelector("[data-projects]"));
p();
h(document.querySelector("[data-contact-form]"));
export { v as d };
