// ==========================
// Global State and Constants
// ==========================
let going = false;
let currentEl = null;
const GITHUB_USERNAME = "tusharmurali";
const colors = [
  "#e67e22",
  "#f1c40f",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#e74c3c",

  "#00cec9", 
  "#a29bfe",
  "#ff7675",

  "#74b9ff"
];
/*
colors[topLanguagesCount] is reserved for "more"
Remaining colors are used for research, blog, GitHub links, and finally TST time
*/
const topLanguagesCount = 5;

// ==========================
// DOM References
// ==========================
const lineDownSvg = document.querySelector("#linedown");
const lineDown = lineDownSvg.firstElementChild;
const left = document.querySelector("#rectleft");
const right = document.querySelector("#rectright");
const details = document.querySelector("#details");
const langHint = document.querySelector("#langhint");
const modal = document.querySelector("#modal");
const projectContainer = document.getElementById("projectContainer");
const linkElements = [
  document.getElementById("research"),
  document.getElementById("blog"),
  document.getElementById("github")
];
document.documentElement.style.setProperty("--tst-color", colors[topLanguagesCount + linkElements.length + 1]);

// ==========================
// Hint Setup
// ==========================
if (!localStorage.hideClickToLang) {
  langHint.langTimeout = setTimeout(() => {
    langHint.innerText = "(click to view details)";
    langHint.style.left = "50%";
    langHint.style.opacity = "0.5";
  }, 5000);
}

// ==========================
// Language Button Handling
// ==========================
function handleButtonClick(button) {
  if (going) return;
  going = true;

  clearTimeout(langHint.langTimeout);
  clearTimeout(langHint.exitTimeout);
  langHint.style.opacity = "0";
  localStorage.hideClickToLang = true;

  const isActive = button.classList.contains("active");

  if (isActive) {
    deactivateButton(button);
    return;
  }

  if (currentEl) currentEl.classList.remove("active");
  button.classList.add("active");
  currentEl = button;

  animateButtonClick(button);
  updateProjectDivHeights();
}

function deactivateButton(button) {
  button.classList.remove("active");
  undoPath(0.5);

  setTimeout(() => {
    details.classList.remove("gone");
    left.style.stroke = "transparent";
    right.style.stroke = "transparent";
    going = false;
  }, 500);

  langHint.style.opacity = "0";
  clearTimeout(langHint.exitTimeout);
  localStorage.hideClickToExit = true;
}

function animateButtonClick(button) {
  const x = button.offsetLeft + button.clientWidth / 2;

  Object.assign(lineDownSvg.style, { left: `${x}px`, opacity: "1" });
  Object.assign(lineDown.style, {
    transition: "stroke-dashoffset 0.5s linear",
    stroke: button.style.color,
    strokeDashoffset: "-100px",
  });

  langHint.style.left = `${x}px`;

  setUpPath();
  undoPath(0.25);
  setTimeout(() => doPath(button.style.color), 250);

  details.classList.add("gone");
  setTimeout(() => showLanguagePanel(button), 500);

  if (!localStorage.hideClickToExit) {
    langHint.exitTimeout = setTimeout(() => {
      langHint.innerText = "(click again to exit)";
      langHint.style.opacity = "0.5";
    }, 2500);
  }
}

// ==========================
// Path Drawing
// ==========================
function setUpPath() {
  const x = currentEl.offsetLeft + currentEl.clientWidth / 2 - 20;
  const h =
    window.innerHeight - left.parentElement.getBoundingClientRect().y - 20;
  const x2 = window.innerWidth - x - 40;

  left.setAttribute(
    "d",
    `
    M ${x + 2},0
    C 100,0 40,0 40,0
    40,0 0,0 0,40
    0,40 0,60 0,${h - 40}
    0,${h - 40} 0,${h} 40,${h}
    93.75,${h} 100,${h} ${x2},${h}
  `
  );

  right.setAttribute(
    "d",
    `
    M -2,0
    C -2,0 ${x2 - 40},0 ${x2 - 40},0
    ${x2 - 40},0 ${x2},0 ${x2},40
    ${x2},40 ${x2},60 ${x2},${h - 40}
    ${x2},${h - 40} ${x2},${h} ${x2 - 40},${h}
    ${x2 - x + 40},${h} ${x2 - x},${h} ${x2 - x},${h}
  `
  );

  right.style.transform = `translateX(${x + 1}px) translateY(1px)`;

  const len = left.getTotalLength();
  left.style.transition = right.style.transition = "initial";
  left.style.strokeDasharray = right.style.strokeDasharray = len;
}

function doPath(color) {
  [left, right].forEach((el) => {
    el.style.stroke = color;
    el.style.transition = "stroke-dashoffset .75s ease-in-out";
    el.style.strokeDashoffset = "0";
  });
}

function undoPath(seconds) {
  const len = left.getTotalLength();
  [left, right].forEach((el) => {
    el.style.transition = `stroke-dashoffset ${seconds}s ease-in-out`;
    el.style.strokeDashoffset = len;
  });

  const shownPanel = document.querySelector(".lang-panel.shown");
  if (shownPanel) {
    shownPanel.classList.remove("shown");
    shownPanel.querySelectorAll(".projects > .proj").forEach((c) => {
      c.className = "proj";
    });
  }
}

// ==========================
// Language Panel Display
// ==========================
function showLanguagePanel(button) {
  lineDownSvg.style.opacity = "0";
  lineDown.style.transition = "initial";
  lineDown.style.strokeDashoffset = "100px";

  const panel = document.getElementById(button.dataset.panel);
  panel.classList.add("shown");
  going = false;

  let timeout = 200;
  panel.querySelectorAll(".projects > .proj").forEach((div) => {
    setTimeout(() => div.classList.add("loaded"), timeout);
    timeout += 100;
  });
}

// ==========================
// Modal Display
// ==========================
function showModal(project, sourceElement, extraDescription) {
  modal.children[0].innerHTML = project.title;

  modal.children[1].innerHTML = project.description
    ? `${project.description} ${extraDescription}`
    : project.file
    ? `<a href="files/${project.file}" class="d" target="_blank" style="color:#949494;">
        ${project.title}<span class="underline" style="background-color:#949494;"></span></a><br>`
    : "";

  modal.children[1].style.textAlign = "center";

  // GitHub link
  const demoLink = modal.querySelector(".demo-link");
  if (project.demo) {
    demoLink.href = project.demo;
    demoLink.style.display = "inline-block";
  } else {
    demoLink.style.display = "none";
  }

  const githubLink = modal.querySelector(".github-link");
  if (project.github) {
    githubLink.href = project.github;
    githubLink.style.display = "inline-block";
  } else {
    githubLink.style.display = "none";
  }

  modal.classList = "shown";
  modal.openingElement = sourceElement;
  MathJax.typeset();
  drawModalBackground();
}

function drawModalBackground() {
  if (!modal.classList.contains("shown")) return;

  const oldCanvas = modal.querySelector("canvas.trianglify-bg");
  if (oldCanvas) oldCanvas.remove();

  const pattern = trianglify({
    width: modal.offsetWidth || 600,
    height: modal.offsetHeight || 400,
    xColors: ["#737373", "#525252", "#252525", "#000000"],
    yColors: ["#737373", "#525252", "#252525", "#000000"],
    variance: 0.9,
  });

  const canvas = pattern.toCanvas();
  canvas.classList.add("trianglify-bg");
  modal.appendChild(canvas);
}

modal.querySelector(".close").addEventListener("click", () => {
  modal.classList.remove("shown");
});

// ==========================
// Dynamic Sizing
// ==========================
function updateProjectDivHeights() {
  document.querySelectorAll(".projects").forEach((div) => {
    const height = window.innerHeight - div.getBoundingClientRect().y - 30;
    div.style.height = `${height}px`;
  });
}

function onResize() {
  if (currentEl) setUpPath();
  updateProjectDivHeights();
  drawModalBackground();
}

window.addEventListener("resize", onResize);
updateProjectDivHeights();

function loadAndRenderProjects() {
  Promise.all([
    fetch("github_projects.json").then((res) => res.json()),
    fetch("extra_projects.json").then((res) => res.json()),
    fetch("research_projects.json").then((res) => res.json()),
    fetch("extra_project_descriptions.json").then((res) => res.json()),
  ])
    .then(([githubProjects, extraProjects, researchProjects, descriptions]) => {
      const allProjects = [...githubProjects, ...extraProjects];
      const langGroups = groupProjectsByLanguage(allProjects);
      const { topLanguages, moreLanguages } = splitLanguages(langGroups);

      const detailsEl = document.getElementById("details");
      const langButtonsFragment = document.createElement("div");

      // Render top language panels
      topLanguages.forEach(([lang, projects], idx) => {
        const color = colors[idx % colors.length];
        const panelId = langToId(lang);

        const button = createLangButton(lang, color, panelId);
        const panel = createLangPanel(
          lang,
          panelId,
          projects,
          descriptions,
          color
        );

        langButtonsFragment.appendChild(button);
        langButtonsFragment.appendChild(
          document.createTextNode(idx < 4 ? ", " : ", and ")
        );
        detailsEl.parentNode.insertBefore(panel, detailsEl);
      });

      // Render "more" panel
      const color = colors[topLanguagesCount]
      const moreButton = createLangButton("more", color, "more");
      const morePanel = createLangPanel(
        moreLanguages.map(([lang]) => lang).join(", "),
        "more",
        moreLanguages.flatMap(([, projects]) => projects),
        descriptions,
        color
      );
      langButtonsFragment.appendChild(moreButton);
      detailsEl.parentNode.insertBefore(morePanel, detailsEl);

      // Inject heading
      const langHeading = document.createElement("h2");
      langHeading.innerHTML = `uses ${langButtonsFragment.innerHTML}.`;
      document
        .getElementById("linedown")
        .insertAdjacentElement("beforebegin", langHeading);

      // Assign colors to research, blog, and GitHub links using colors array
      linkElements.forEach((el, i) => {
        if (!el) return;
        const color = colors[(topLanguagesCount + 1 + i) % colors.length];
        el.style.color = color;
        const underline = el.querySelector(".underline");
        if (underline) underline.style.backgroundColor = color;
      });

      // Attach event listeners
      document.querySelectorAll(".lang-button").forEach((btn) => {
        btn.addEventListener("click", () => handleButtonClick(btn));
      });

      // Research modal setup
      document.getElementById("research").addEventListener("click", () => {
        modal.children[0].innerHTML = "Research";
        modal.children[1].innerHTML = researchProjects
          .map(
            (p) => `
            <a href="files/${p.file}" class="d" target="_blank" style="color:#949494;">
              ${p.title}<span class="underline" style="background-color:#949494;"></span>
            </a><br>`
          )
          .join("");
        modal.children[1].style.textAlign = "center";
        modal.children[2].style.display = "none";
        modal.classList = "shown";
        modal.openingElement = document.getElementById("research");
        MathJax.typeset();
        drawModalBackground();
      });
    })
    .catch((err) => console.error("Error loading projects:", err));
}

// ==========================
// Helper Functions
// ==========================
function groupProjectsByLanguage(projects) {
  const groups = {};
  for (const proj of projects) {
    const lang = proj.language || "Unknown";
    if (!groups[lang]) groups[lang] = [];
    groups[lang].push(proj);
  }
  return groups;
}

function splitLanguages(langGroups) {
  const sorted = Object.entries(langGroups).sort(
    (a, b) => b[1].length - a[1].length
  );
  return {
    topLanguages: sorted.slice(0, topLanguagesCount),
    moreLanguages: sorted.slice(topLanguagesCount),
  };
}

function langToId(lang) {
  return lang.toLowerCase().replace(/\s+/g, "-");
}

function createLangButton(lang, color, panelId) {
  const button = document.createElement("span");
  button.className = "lang-button";
  button.dataset.panel = panelId;
  button.style.color = color;
  button.innerHTML = `${lang}<span class="underline" style="background-color:${color};"></span>`;
  return button;
}

function createLangPanel(title, id, projects, descriptions, color) {
  const panel = document.createElement("div");
  panel.id = id;
  panel.className = "lang-panel";
  panel.innerHTML = `<h2>${title}</h2>`;

  const projectWrapper = document.createElement("div");
  projectWrapper.className = `projects ${id}`;
  projectWrapper.dataset.cat = id;

  projects.forEach((project) => {
    const projDiv = document.createElement("div");
    projDiv.className = "proj";
    projDiv.dataset.proj = project.title;
    projDiv.style.backgroundImage = `url(images/${project.title}.png)`;
    projDiv.style.setProperty("--proj-border-color", color);

    const titleEl = document.createElement("h3");
    titleEl.textContent = project.title;

    projDiv.appendChild(titleEl);
    // Add project description below the title
    if (project.description) {
      const desc = document.createElement("p");
      desc.textContent = project.description;
      desc.className = "proj-desc";
      projDiv.appendChild(desc);
    }

    // Add links (GitHub/Demo) if available
    const links = document.createElement("div");
    links.className = "proj-links";

    if (project.demo) {
      const demoLink = document.createElement("a");
      demoLink.href = project.demo;
      demoLink.target = "_blank";
      demoLink.rel = "noopener noreferrer";
      demoLink.textContent = "Demo";
      demoLink.className = "proj-link demo-link";
      demoLink.style.position = "relative";
      demoLink.style.zIndex = "1";
      links.appendChild(demoLink);
    }

    if (project.github) {
      const githubLink = document.createElement("a");
      githubLink.href = project.github;
      githubLink.target = "_blank";
      githubLink.rel = "noopener noreferrer";
      githubLink.textContent = "GitHub";
      githubLink.className = "proj-link github-link";
      githubLink.style.position = "relative";
      githubLink.style.zIndex = "1";
      links.appendChild(githubLink);
    }

    // Append links if they exist
    if (links.childElementCount > 0) {
      projDiv.appendChild(links);
    }

    if (project.stars || project.forks) {
      const stats = document.createElement("div");
      stats.className = "proj-stats";

      if (project.stars) {
        const starSpan = document.createElement("span");
        starSpan.innerHTML = `⭐ ${project.stars}`;
        stats.appendChild(starSpan);
      }

      if (project.forks) {
        const forkSpan = document.createElement("span");
        forkSpan.innerHTML = `🍴 ${project.forks}`;
        forkSpan.style.marginLeft = "10px";
        stats.appendChild(forkSpan);
      }

      projDiv.appendChild(stats);
    }

    projDiv.addEventListener("click", () =>
      showModal(project, projDiv, descriptions[project.title] || "")
    );

    projectWrapper.appendChild(projDiv);
  });

  panel.appendChild(projectWrapper);
  return panel;
}

loadAndRenderProjects();
