const navItems = [
  ["Home", "index.html", "home"],
  ["About", "about.html", "about"],
  ["Services", "services.html", "services"],
  ["Projects", "projects.html", "projects"],
  ["Process", "process.html", "process"],
  ["Real Estate", "real-estate.html", "real-estate"],
  ["Contact", "contact.html", "contact"],
];
const mark = `
  <a 
    class="brand" 
    href="index.html" 
    aria-label="JCK Builders & Interior LLP home"
  >
    <img 
      src="/images/jck-logo.png.PNG"
      alt="JCK Builders & Interior LLP"
      class="brand-logo"
    >
  </a>
`;
const links = (active) =>
  navItems
    .map(
      ([label, href, key]) =>
        `<a href="${href}" ${active === key ? 'aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");

export function mountSite() {
  const page = document.body.dataset.page;
  document
    .querySelectorAll("[data-site-header]")
    .forEach(
      (slot) =>
        (slot.innerHTML = `<header class="site-header"><div class="shell nav-wrap">${mark}<nav class="desktop-nav" aria-label="Primary navigation">${links(page)}</nav><a class="button button--gold nav-cta" href="contact.html">Get a quote</a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav"><i></i><i></i><i></i></button></div><div class="mobile-panel" id="mobile-nav" aria-hidden="true"><div class="shell mobile-panel__inner">${links(page)}<a class="button button--gold" href="contact.html">Get a quote</a></div></div></header>`),
    );
  document
    .querySelectorAll("[data-site-footer]")
    .forEach(
      (slot) =>
        (slot.innerHTML = `<footer class="site-footer"><div class="shell footer-grid"><div>${mark}<p>Construction, interiors, engineering and property solutions delivered with thoughtful execution.</p></div><div><p class="footer-label">Explore</p><a href="services.html">Services</a><a href="projects.html">Projects</a><a href="process.html">Our process</a><a href="franchise.html">Franchise</a></div><div><p class="footer-label">Office</p><address>No. 76, Ward 6, Cherukunnu,<br>Kurichakam P.O, Velome,<br>Kozhikode, Kerala – 673507, India.</address><p>Kuttiady · Calicut Hilite Business Park</p></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} JCK Builders & Interior LLP</span><span>Built for lasting work.</span></div></footer>`),
    );
  setupNav();
  setupReveal();
  window.addEventListener("jck:content-ready", setupReveal);
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document.documentElement.classList.add("is-ready"),
    ),
  );
}

function setupNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const panel = document.querySelector(".mobile-panel");
  if (!header) return;
  const update = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  update();
  window.addEventListener("scroll", update, { passive: true });
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    panel.setAttribute("aria-hidden", String(open));
    document.body.classList.toggle("menu-open", !open);
  });
  panel
    ?.querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => toggle?.click()));
}
function setupReveal() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const groups =
    ".capability, .project-item, .service-group, .process-list article, .timeline-item, .leader, .industry-grid span";
  document.querySelectorAll(groups).forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index % 6, 4) * 70}ms`,
    );
  });
  const revealElements = [
    ...document.querySelectorAll(
      ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .timeline",
    ),
  ].filter((element) => !element.dataset.revealObserved);
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -36px" },
  );
  revealElements.forEach((el) => {
    el.dataset.revealObserved = "true";
    observer.observe(el);
  });
}
