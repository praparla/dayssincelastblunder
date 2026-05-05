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
    theme: {
      blue: "#418FDE",
      yellow: "#FFCD00",
      navy: "#041E42",
      surface: "rgba(65, 143, 222, 0.04)",
    },
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
        severity: 2,
        source: "https://sky.wnba.com/news/chicago-sky-make-pair-of-deals-with-expansion-team",
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
        severity: 4,
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
      {
        id: "sky-010",
        date: "2026-01-28",
        description:
          "Minority owner Steven Rogers sued principal owner Michael Alter alleging 'unlawful self-dealing' — Alter allegedly diluted minority investors' stakes via a 2022 debt-to-equity conversion that inflated his own ownership share ahead of an $85M valuation round. Lawsuit pending in Cook County Circuit Court.",
        responsible: "Owner Michael Alter",
        severity: 3,
        source: "https://chicago.suntimes.com/chicago-sky/2026/02/05/sky-ownership-lawsuit-begins-at-a-pivotal-moment-for-the-franchise",
        verified: true,
        tags: ["ownership", "governance"],
      },
      {
        id: "sky-011",
        date: "2026-05-04",
        description:
          "Waived 2025 first-round pick Hailey Van Lith (No. 11 overall) after one season (3.5 ppg, 33.9% FG, 16.1% 3P in 29 games), citing 'style of play preference.' The Sky had surrendered their 2026 first-round pick to Minnesota to acquire this pick — a first-round asset traded for a player who didn't survive Year 2 training camp.",
        responsible: "GM Jeff Paglioca",
        severity: 3,
        source: "https://chicago.suntimes.com/chicago-sky/2026/05/04/sky-waive-guard-hailey-van-lith",
        verified: true,
        tags: ["draft", "roster", "player-management"],
      },
    ],
  },

  "milwaukee-bucks": {
    id: "milwaukee-bucks",
    name: "Milwaukee Bucks",
    sport: "NBA",
    theme: {
      blue: "#00471B",
      yellow: "#EEE1C6",
      navy: "#000000",
      surface: "rgba(0, 71, 27, 0.04)",
    },
    blunders: [
      {
        id: "bucks-001",
        date: "2026-04-13",
        description:
          "Posted a disastrous 32-50 record — worst since Giannis's rookie year — snapping a nine-year playoff streak. The NBA opened a tanking investigation after benching a healthy Giannis in the final weeks. Giannis called it 'disrespectful,' the NBPA filed a complaint, and Doc Rivers stepped down owing one more year on his deal.",
        responsible: "GM Jon Horst / Doc Rivers / Ownership",
        severity: 5,
        source: "https://www.espn.com/nba/story/_/id/48391034/nba-investigating-bucks-giannis-says-healthy",
        verified: true,
        tags: ["tanking", "coaching", "franchise-player"],
      },
      {
        id: "bucks-002",
        date: "2025-07-01",
        description:
          "Waived Damian Lillard after his Achilles tear and stretched the remaining ~$113M over five years — $22.6M/yr in dead money — to sign Myles Turner. The Lillard experiment yielded zero playoff series wins while costing Holiday, multiple picks, and now years of dead cap.",
        responsible: "GM Jon Horst",
        severity: 4,
        source: "https://www.theringer.com/2025/07/01/nba/milwaukee-bucks-damian-lillard-waived-myles-turner-signing-giannis-antetokounmpo",
        verified: true,
        tags: ["contract", "roster", "cap-management"],
      },
      {
        id: "bucks-003",
        date: "2024-05-02",
        description:
          "Eliminated in the first round by the 6th-seeded Indiana Pacers in six games despite acquiring Lillard to form a superteam. Game 6 was a 120-98 blowout. The roster depth sacrificed to get Lillard was exposed the moment Giannis went down with a calf injury.",
        responsible: "GM Jon Horst / Doc Rivers",
        severity: 3,
        source: "https://www.espn.com/nba/story/_/id/40061188/2024-nba-playoffs-milwaukee-bucks-season-ends-first-round-exit",
        verified: true,
        tags: ["playoffs", "roster"],
      },
      {
        id: "bucks-004",
        date: "2024-01-26",
        description:
          "Hired Doc Rivers — fired by Philadelphia months earlier after underachieving with a talented roster — on a reported 4-year, ~$40M deal. Rivers went 17-19 to close the season, lost in Round 1, lost in Round 1 again, then went 32-50 before stepping down.",
        responsible: "GM Jon Horst / Ownership",
        severity: 4,
        source: "https://www.nba.com/bucks/news/milwaukee-bucks-hire-doc-rivers-as-head-coach",
        verified: true,
        tags: ["coaching", "hiring"],
      },
      {
        id: "bucks-005",
        date: "2024-01-23",
        description:
          "Fired first-year head coach Adrian Griffin just 43 games into the season despite holding a 30-13 record — tied for second-best in the NBA. Griffin was the franchise's first Black head coach; the optics were terrible and the replacement was worse.",
        responsible: "GM Jon Horst / Ownership",
        severity: 4,
        source: "https://www.espn.com/nba/story/_/id/39371240/sources-bucks-firing-first-year-head-coach-adrian-griffin",
        verified: true,
        tags: ["coaching", "firing"],
      },
      {
        id: "bucks-006",
        date: "2023-09-27",
        description:
          "Traded championship-winning two-way guard Jrue Holiday as the centerpiece going out in the Damian Lillard deal. Holiday was flipped to Boston days later and immediately helped the Celtics win the 2024 title. The Lillard-Giannis pairing never won a playoff series.",
        responsible: "GM Jon Horst",
        severity: 5,
        source: "https://www.cbssports.com/nba/news/damian-lillard-trade-bucks-land-all-star-in-stunning-three-team-deal-jrue-holiday-deandre-ayton-also-moved/",
        verified: true,
        tags: ["trade", "player-management"],
      },
      {
        id: "bucks-007",
        date: "2021-08-02",
        description:
          "Let PJ Tucker walk in free agency just 13 days after he was a critical defensive piece in their first championship since 1971. Tucker signed a 2-year, $15M deal with Miami and later said the Bucks' handling felt 'disrespectful.' They never adequately replaced his switchable defense.",
        responsible: "GM Jon Horst / Ownership",
        severity: 3,
        source: "https://www.brewhoop.com/2021/8/2/22606901/report-pj-tucker-signing-with-miami-heat-on-2-year-15-million-deal",
        verified: true,
        tags: ["free-agency", "roster", "cost-cutting"],
      },
      {
        id: "bucks-008",
        type: "win",
        date: "2025-02-05",
        description:
          "Traded injury-prone, declining Khris Middleton (plus AJ Johnson, Delon Wright, a 2028 first-round pick swap) to Washington for Kyle Kuzma, Jericho Sims, and two second-rounders — shedding a $32M/yr contract that had become an albatross and creating cap flexibility to rebuild around Giannis.",
        responsible: "GM Jon Horst",
        severity: 3,
        source: "https://www.espn.com/nba/story/_/id/43704153/sources-bucks-trade-khris-middleton-wizards-kyle-kuzma",
        verified: true,
        tags: ["trade", "cap-management"],
      },
    ],
  },
};

// Node.js compatibility for tests
if (typeof module !== "undefined") module.exports = { GROUPS };
