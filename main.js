(() => {
  const D = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = (path) => path.split(".").reduce((o, k) => o?.[k], D);

  document.querySelectorAll("[data-bind]").forEach((n) => { n.textContent = get(n.dataset.bind); });
  document.title = `${D.name} | ${D.title}`;
  $("#year").textContent = new Date().getFullYear();

  // About
  $("#bio").innerHTML = D.about.bio.map((p) => `<p>${esc(p)}</p>`).join("");
  const e = D.about.education;
  $("#edu").innerHTML = `
    <strong>${esc(e.degree)}</strong>
    <p class="meta">${esc(e.school)}, ${esc(e.years)}</p>
    <p class="courses">Coursework: ${e.coursework.map(esc).join(", ")}</p>`;
  $("#focus").innerHTML = D.about.focus.map((f) => `
    <li><i class="ph ${esc(f.icon)}" aria-hidden="true"></i><b>${esc(f.name)}</b><span>${esc(f.text)}</span></li>`).join("");

  // Projects
  $("#project-list").innerHTML = D.projects.map((p) => `
    <article class="project${p.featured ? " featured" : ""}">
      <img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy" width="1200" height="750">
      <div class="project-body">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.summary)}</p>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="project-links">${p.links.map((l) =>
          `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}<i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>`).join("")}
        </div>
      </div>
    </article>`).join("");

  // Skills
  $("#skill-list").innerHTML = D.skills.map((g) => `
    <div class="skill-row"><dt>${esc(g.group)}</dt>
      <dd>${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</dd></div>`).join("");

  // Contact
  const c = D.contact;
  const email = $("#email-link");
  email.href = `mailto:${c.email}`;
  email.textContent = c.email;
  $("#socials").innerHTML = [
    ["ph-envelope-simple", "Email", `mailto:${c.email}`],
    ["ph-github-logo", "GitHub", c.github],
    ["ph-linkedin-logo", "LinkedIn", c.linkedin]
  ].map(([icon, label, href]) => `
    <li><a href="${esc(href)}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
      <i class="ph ${icon}" aria-hidden="true"></i>${label}</a></li>`).join("");

  // Theme toggle
  const root = document.documentElement;
  const toggle = $("#theme-toggle");
  const syncToggle = () => {
    const dark = root.dataset.theme !== "light";
    toggle.innerHTML = `<i class="ph ${dark ? "ph-sun" : "ph-moon"}" aria-hidden="true"></i>`;
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  };
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
    syncToggle();
    document.dispatchEvent(new Event("themechange"));
  });
  syncToggle();

  // Mobile menu
  const menuBtn = $("#menu-btn");
  const links = $("#nav-links");
  const setMenu = (open) => {
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.innerHTML = `<i class="ph ${open ? "ph-x" : "ph-list"}" aria-hidden="true"></i>`;
  };
  menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.addEventListener("click", (ev) => { if (ev.target.closest("a")) setMenu(false); });

  window.initDescent?.(document.getElementById("descent"));
})();
