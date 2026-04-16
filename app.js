// === State ===
let currentGroupId = Object.keys(GROUPS)[0];
let highlightBlunderId = null;

// === Render Helpers ===
function daysSince(dateStr) {
  const blunderDate = new Date(dateStr + "T00:00:00");
  const now = new Date();
  return Math.max(0, Math.floor((now - blunderDate) / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function renderSeverity(level) {
  let label, tier;
  if (level <= 2) {
    label = "Fine. We're Fine.";
    tier = 1;
  } else if (level <= 4) {
    label = "The Group Chat is Not Okay";
    tier = 2;
  } else {
    label = "Erase the Tape";
    tier = 3;
  }
  return `<span class="severity-label tier-${tier}">${label}</span>`;
}

// === Permalink ===
function parsePermalink() {
  const params = new URLSearchParams(window.location.search);
  const blunderId = params.get("blunder");
  if (!blunderId) return;
  for (const [groupId, group] of Object.entries(GROUPS)) {
    if (group.blunders.some((b) => b.id === blunderId)) {
      currentGroupId = groupId;
      highlightBlunderId = blunderId;
      return;
    }
  }
}

function setPermalink(blunderId) {
  const url = new URL(window.location);
  url.searchParams.set("blunder", blunderId);
  history.replaceState(null, "", url);
}

// === Group Selector ===
function populateGroupSelector() {
  const container = document.getElementById("group-tabs");
  if (!container) return;
  container.innerHTML = Object.values(GROUPS)
    .map(
      (g) =>
        `<button class="group-tab${g.id === currentGroupId ? " active" : ""}" data-group="${g.id}" role="tab" aria-selected="${g.id === currentGroupId}">${g.name}</button>`
    )
    .join("");
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".group-tab");
    if (!btn) return;
    currentGroupId = btn.dataset.group;
    render();
  });
}

// === Theme ===
function applyTheme(group) {
  if (!group.theme || typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--sky-blue", group.theme.blue);
  root.style.setProperty("--sky-yellow", group.theme.yellow);
  root.style.setProperty("--sky-navy", group.theme.navy);
  root.style.setProperty("--surface", group.theme.surface);
}

// === Render ===
function render() {
  const group = GROUPS[currentGroupId];
  applyTheme(group);
  document.querySelectorAll(".group-tab").forEach((btn) => {
    const active = btn.dataset.group === currentGroupId;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  const sorted = [...group.blunders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const latest = sorted[0];
  document.getElementById("days-count").textContent = daysSince(latest.date);
  document.getElementById("latest-blunder").textContent =
    `Latest: ${latest.description}`;

  document.title = `Days Since Last Blunder — ${group.name}`;

  const tbody = document.getElementById("blunder-body");
  tbody.innerHTML = sorted
    .map(
      (b) => `
    <tr id="row-${b.id}"${highlightBlunderId === b.id ? ' class="highlight"' : ""}>
      <td>${formatDate(b.date)}</td>
      <td>${b.description}${
        b.source
          ? ` <a class="source-link" href="${b.source}" target="_blank" rel="noopener noreferrer" aria-label="View source">↗</a>`
          : ""
      } <button class="permalink-btn" data-id="${b.id}" title="Copy link to this blunder" aria-label="Copy link to this blunder">🔗</button></td>
      <td>${b.responsible}</td>
      <td>${renderSeverity(b.severity)}</td>
    </tr>
  `
    )
    .join("");

  // Scroll to highlighted row
  if (highlightBlunderId) {
    const row = document.getElementById("row-" + highlightBlunderId);
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      highlightBlunderId = null;
    }
  }
}

function init() {
  parsePermalink();
  populateGroupSelector();

  // Permalink copy handler (delegated, attached once)
  document.getElementById("blunder-body").addEventListener("click", (e) => {
    const btn = e.target.closest(".permalink-btn");
    if (!btn) return;
    const id = btn.dataset.id;
    const url = new URL(window.location);
    url.searchParams.set("blunder", id);
    navigator.clipboard.writeText(url.toString()).then(() => {
      btn.textContent = "✓";
      setTimeout(() => (btn.textContent = "🔗"), 1500);
    });
    setPermalink(id);
  });

  render();
}

// Node.js compatibility for tests
if (typeof module !== "undefined") {
  module.exports = { daysSince, formatDate, renderSeverity };
} else {
  init();
}
