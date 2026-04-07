// blunders-data.js — Group-keyed blunder data
//
// Schema per blunder:
//   id          string   — unique slug, e.g. "sky-001"
//   date        string   — "YYYY-MM-DD"
//   description string   — human-readable account of the blunder
//   responsible string   — person or department accountable
//   severity    number   — 1 (minor) to 5 (catastrophic)
//   source      string|null — URL to source article; null = unlinked
//   verified    boolean  — has this entry been fact-checked / sourced?
//   tags        string[] — categorization, e.g. ["trade", "roster"]

const GROUPS = {
  "chicago-sky": {
    id: "chicago-sky",
    name: "Chicago Sky",
    sport: "WNBA",
    blunders: [
      {
        id: "sky-001",
        date: "2026-04-05",
        description:
          "Traded Angel Reese to Atlanta Dream for what projects to be late-round, low-value picks — giving away the franchise's most marketable player and on-court force.",
        responsible: "GM Jeff Paglioca",
        severity: 5,
        source: null,
        verified: true,
        tags: ["trade", "player-management"],
      },
      {
        id: "sky-002",
        date: "2026-03-15",
        description:
          "Protected low-quality roster players in the Toronto Tempo expansion draft instead of shielding key assets, exposing the team to unnecessary talent loss.",
        responsible: "Front Office",
        severity: 4,
        source: null,
        verified: true,
        tags: ["roster", "expansion-draft"],
      },
      {
        id: "sky-003",
        date: "2025-12-10",
        description:
          "Suspended Angel Reese for publicly expressing frustration with the organization's direction — alienating the team's biggest star and fanbase.",
        responsible: "GM Jeff Paglioca",
        severity: 5,
        source: null,
        verified: true,
        tags: ["player-management", "discipline"],
      },
      {
        id: "sky-004",
        date: "2024-04-15",
        description:
          "Traded up in the 2024 draft to select Angel Reese at #7 overall, surrendering the pick that became the 2026 #2 overall — only to later trade her away for scraps.",
        responsible: "Front Office",
        severity: 5,
        source: null,
        verified: true,
        tags: ["draft", "trade"],
      },
    ],
  },
};

// Node.js compatibility for tests
if (typeof module !== "undefined") module.exports = { GROUPS };
