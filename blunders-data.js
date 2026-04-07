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
        date: "2026-04-06",
        description:
          "Traded Angel Reese to Atlanta Dream for what projects to be late-round, low-value picks — giving away the franchise's most marketable player and on-court force.",
        responsible: "GM Jeff Paglioca",
        severity: 5,
        source: "https://chicago.suntimes.com/chicago-sky/2026/04/06/sky-trade-angel-reese-to-atlanta-dream-for-2027-2028-draft-picks",
        verified: true,
        tags: ["trade", "player-management"],
      },
      {
        id: "sky-002",
        date: "2026-04-01",
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
        date: "2025-09-05",
        description:
          "Suspended Angel Reese for publicly expressing frustration with the organization's direction — alienating the team's biggest star and fanbase.",
        responsible: "GM Jeff Paglioca",
        severity: 5,
        source: "https://www.espn.com/wnba/story/_/id/46168942/sky-suspend-angel-reese-half-detrimental-comments",
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
        source: "https://chicago.suntimes.com/chicago-sky-and-wnba/2024/04/15/sky-select-angel-reese-with-the-no-7-overall-pick-in-the-2024-wnba-draft",
        verified: true,
        tags: ["draft", "trade"],
      },
      {
        id: "sky-005",
        date: "2017-02-02",
        description:
          "Traded reigning WNBA MVP Elena Delle Donne to Washington in a forced sign-and-trade after she threatened to sit out — receiving Stefanie Dolson, Kahleah Copper, and the 2017 #2 pick. Delle Donne won the 2019 WNBA title and Finals MVP with Washington.",
        responsible: "Front Office",
        severity: 2,
        source: "https://www.wnba.com/news/wnba-mvp-elena-delle-donne-trade-mystics",
        verified: true,
        tags: ["trade", "player-management"],
      },
      {
        id: "sky-006",
        date: "2024-02-06",
        description:
          "Traded 2021 Finals MVP Kahleah Copper to the Phoenix Mercury just months after re-signing her — ending the last remnant of the championship core and netting Michaela Onyenwere, Brianna Turner, and draft picks.",
        responsible: "GM Jeff Paglioca",
        severity: 4,
        source: "https://www.espn.com/wnba/story/_/id/39471363/sky-trades-kahleah-copper-mercury-wnba-draft-picks-players",
        verified: true,
        tags: ["trade", "player-management"],
      },
      {
        id: "sky-007",
        date: "2023-01-31",
        description:
          "Allowed franchise all-time assists leader and 2021 championship cornerstone Courtney Vandersloot to walk in free agency after 12 seasons; she signed with the rival New York Liberty.",
        responsible: "Front Office",
        severity: 2,
        source: "https://chicago.suntimes.com/chicago-sky-and-wnba/2023/1/31/23580647/courtney-vandersloot-will-not-re-sign-with-sky",
        verified: true,
        tags: ["roster", "free-agency"],
      },
      {
        id: "sky-008",
        date: "2024-09-26",
        description:
          "Fired coach Teresa Weatherspoon after a single 13-27 season despite having player support — replacement Tyler Marsh went 10-34 the following year, accelerating the franchise's collapse.",
        responsible: "Front Office",
        severity: 5,
        source: "https://chicago.suntimes.com/chicago-sky-and-wnba/2024/09/26/sky-fire-coach-teresa-weatherspoon-after-one-season",
        verified: true,
        tags: ["coaching", "player-management"],
      },
      {
        id: "sky-009",
        date: "2025-02-23",
        description:
          "Sent the 2025 #3 overall pick (became Sonia Citron, 2025 All-Star and All-Rookie), a 2027 first-round pick swap, and a 2027 second-round pick to Washington for veteran guard Ariel Atkins — a one-year rental.",
        responsible: "GM Jeff Paglioca",
        severity: 5,
        source: "https://chicago.suntimes.com/chicago-sky/2025/07/08/reevaluating-the-atkins-trade-as-mystics-citron-earns-all-star-nod",
        verified: true,
        tags: ["trade", "draft", "roster"],
      },
    ],
  },
};

// Node.js compatibility for tests
if (typeof module !== "undefined") module.exports = { GROUPS };
