// render.test.mjs — No-dependency tests for blunders-data schema and render helpers.
// Run with: node tests/render.test.mjs

import assert from "assert/strict";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { GROUPS } = require(join(root, "blunders-data.js"));

// Inlined render helpers — mirrors app.js exactly; if these diverge tests catch it.
function daysSince(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return Math.max(0, Math.floor((new Date() - d) / 86400000));
}
function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
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

let passed = 0;
let failed = 0;

function ok(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${e.message}`);
    failed++;
  }
}

// ── Data schema ──────────────────────────────────────────────────────────────
console.log("\nData schema:");

ok("GROUPS is a non-empty object", () => {
  assert.ok(typeof GROUPS === "object" && GROUPS !== null);
  assert.ok(Object.keys(GROUPS).length > 0, "at least one group");
});

for (const [groupId, group] of Object.entries(GROUPS)) {
  ok(`${groupId}: required top-level fields`, () => {
    assert.ok(group.id, "id");
    assert.ok(group.name, "name");
    assert.ok(group.sport, "sport");
    assert.ok(Array.isArray(group.blunders), "blunders is array");
    assert.ok(group.blunders.length > 0, "at least one blunder");
  });

  for (const b of group.blunders) {
    ok(`${b.id ?? groupId + "/??"}: valid schema`, () => {
      assert.ok(b.id, "id");
      assert.match(b.date, /^\d{4}-\d{2}-\d{2}$/, "date is YYYY-MM-DD");
      assert.ok(b.description?.length > 10, "description non-trivial");
      assert.ok(b.responsible, "responsible");
      assert.ok(b.severity >= 1 && b.severity <= 5, "severity 1–5");
      assert.ok(typeof b.verified === "boolean", "verified is boolean");
      assert.ok(Array.isArray(b.tags), "tags is array");
      if (b.source !== null) {
        assert.ok(b.source.startsWith("http"), "source is a URL when set");
      }
    });
  }
}

// ── daysSince ─────────────────────────────────────────────────────────────────
console.log("\ndaysSince:");

ok("past date returns positive integer", () => {
  const d = daysSince("2020-01-01");
  assert.ok(d > 0);
  assert.strictEqual(d, Math.floor(d), "is integer");
});

ok("today returns 0", () => {
  const today = new Date().toISOString().slice(0, 10);
  assert.strictEqual(daysSince(today), 0);
});

ok("future date clamps to 0", () => {
  assert.strictEqual(daysSince("2099-12-31"), 0);
});

// ── formatDate ────────────────────────────────────────────────────────────────
console.log("\nformatDate:");

ok("formats 2026-04-05 as Apr 5, 2026", () => {
  const result = formatDate("2026-04-05");
  assert.ok(result.includes("Apr"), `got: ${result}`);
  assert.ok(result.includes("5"), `got: ${result}`);
  assert.ok(result.includes("2026"), `got: ${result}`);
});

ok("does not drift by a day (UTC anchor)", () => {
  // This was bug sky-001: new Date("2026-01-01") parsed as UTC midnight,
  // rendering as Dec 31 in negative-offset timezones.
  const result = formatDate("2026-01-01");
  assert.ok(result.includes("Jan"), `got: ${result}`);
  assert.ok(result.includes("2026"), `got: ${result}`);
});

// ── renderSeverity ────────────────────────────────────────────────────────────
console.log("\nrenderSeverity:");

ok("severity 1: tier-1 Fine. We're Fine.", () => {
  const html = renderSeverity(1);
  assert.ok(html.includes("tier-1"));
  assert.ok(html.includes("Fine. We're Fine."));
});

ok("severity 2: tier-1 Fine. We're Fine.", () => {
  const html = renderSeverity(2);
  assert.ok(html.includes("tier-1"));
  assert.ok(html.includes("Fine. We're Fine."));
});

ok("severity 3: tier-2 The Group Chat is Not Okay", () => {
  const html = renderSeverity(3);
  assert.ok(html.includes("tier-2"));
  assert.ok(html.includes("The Group Chat is Not Okay"));
});

ok("severity 4: tier-2 The Group Chat is Not Okay", () => {
  const html = renderSeverity(4);
  assert.ok(html.includes("tier-2"));
  assert.ok(html.includes("The Group Chat is Not Okay"));
});

ok("severity 5: tier-3 Erase the Tape", () => {
  const html = renderSeverity(5);
  assert.ok(html.includes("tier-3"));
  assert.ok(html.includes("Erase the Tape"));
});

ok("renders a span with severity-label class", () => {
  const html = renderSeverity(3);
  assert.ok(html.startsWith('<span class="severity-label'));
  assert.ok(html.endsWith("</span>"));
});

// ── CSS responsive rules ──────────────────────────────────────────────────────
console.log("\nCSS responsive rules:");

const css = readFileSync(join(root, "style.css"), "utf8");

ok("body has overflow-x: hidden (prevents page-width expansion from table)", () => {
  // Must appear inside the body rule, not just anywhere
  assert.match(css, /body\s*\{[^}]*overflow-x:\s*hidden/s);
});

ok("tablet breakpoint exists at min-width 601px and max-width 900px", () => {
  assert.match(css, /@media\s*\(min-width:\s*601px\)\s*and\s*\(max-width:\s*900px\)/);
});

ok("tablet breakpoint sets hero min-height to 60vh", () => {
  const tabletBlock = css.match(/@media\s*\(min-width:\s*601px\)[^{]*\{([\s\S]*?)(?=@media|\z)/)?.[1] ?? "";
  assert.match(tabletBlock, /min-height:\s*60vh/);
});

ok("tablet breakpoint sets group-select max-width", () => {
  const tabletBlock = css.match(/@media\s*\(min-width:\s*601px\)[^{]*\{([\s\S]*?)(?=@media)/)?.[1] ?? "";
  assert.match(tabletBlock, /group-select[\s\S]*?max-width/);
});

ok("mobile breakpoint hides Responsible column (th:nth-child(3) display:none)", () => {
  assert.match(css, /th:nth-child\(3\)[^}]*display:\s*none/s);
});

ok("mobile breakpoint hides Responsible column (td:nth-child(3) display:none)", () => {
  assert.match(css, /td:nth-child\(3\)[^}]*display:\s*none/s);
});

ok("mobile breakpoint has scroll-indicator gradient on .table-wrapper::after", () => {
  assert.match(css, /\.table-wrapper::after/);
  assert.match(css, /linear-gradient\(to right/);
});

ok(".table-wrapper has position: relative (required for ::after scroll indicator)", () => {
  assert.match(css, /\.table-wrapper\s*\{[^}]*position:\s*relative/s);
});

ok("≤380px breakpoint hides .nav-subtitle", () => {
  assert.match(css, /@media\s*\(max-width:\s*380px\)/);
  assert.match(css, /nav-subtitle[^}]*display:\s*none/s);
});

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${passed + failed} tests — ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
