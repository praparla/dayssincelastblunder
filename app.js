// === State ===
let currentGroupId = Object.keys(GROUPS)[0];

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

// === Group Selector ===
function populateGroupSelector() {
  const select = document.getElementById("group-select");
  if (!select) return;
  select.innerHTML = Object.values(GROUPS)
    .map((g) => `<option value="${g.id}">${g.name}</option>`)
    .join("");
  select.value = currentGroupId;
  select.addEventListener("change", (e) => {
    currentGroupId = e.target.value;
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
    <tr>
      <td>${formatDate(b.date)}</td>
      <td>${b.description}${
        b.source
          ? ` <a class="source-link" href="${b.source}" target="_blank" rel="noopener noreferrer">↗</a>`
          : ""
      }</td>
      <td>${b.responsible}</td>
      <td>${renderSeverity(b.severity)}</td>
    </tr>
  `
    )
    .join("");
}

function init() {
  populateGroupSelector();
  render();
}

// Node.js compatibility for tests
if (typeof module !== "undefined") {
  module.exports = { daysSince, formatDate, renderSeverity };
} else {
  init();
}
