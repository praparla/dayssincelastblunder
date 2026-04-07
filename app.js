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
  let html = '<div class="severity">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="severity-dot${i <= level ? " active" : ""}"></span>`;
  }
  return html + "</div>";
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

// === Render ===
function render() {
  const group = GROUPS[currentGroupId];
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
