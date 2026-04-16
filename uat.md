# UAT Baseline — Days Since Last Blunder

_Created: 2026-04-15_
_Last run: 2026-04-15_

## Project Info
- **Stack**: Static HTML/CSS/JS, no build step
- **Dev server**: `node serve.mjs` on port 8080
- **Entry point**: `index.html`
- **Key routes**: Single page, group switching via JS tabs

## Critical Flows (run every time)

1. **Default load (Chicago Sky)**: Load `/` — hero shows days-since count, latest blunder description, 9 rows in table sorted by date descending, all with source links and permalink buttons.
2. **Group switch to Milwaukee Bucks**: Click "Milwaukee Bucks" tab — theme changes to green/cream, hero updates, 7 rows in table, title updates to "Days Since Last Blunder — Milwaukee Bucks".
3. **Permalink deep link**: Load `/?blunder=bucks-006` — auto-switches to Bucks, highlights the Jrue Holiday row, scrolls to it.
4. **Invalid permalink**: Load `/?blunder=nonexistent` — gracefully falls back to default group, no errors, no highlight.
5. **Rapid tab switching**: Click between groups 10+ times rapidly — no console errors, final state is consistent (correct group, row count, theme).

## Sections & Last Tested

| Section | Last Tested | Notes |
|---------|-------------|-------|
| Nav (logo, subtitle, tabs) | 2026-04-15 | Stable across all breakpoints. Subtitle hides at ≤380px. |
| Hero (label, number, description) | 2026-04-15 | Stable. Number scales via clamp(). Theme colors apply. |
| Table (blunders, sources, severity) | 2026-04-15 | Stable. Responsible column hidden on mobile. |
| Permalink (URL params, highlight, scroll) | 2026-04-15 | Stable. Copy button works, highlight fades. |
| Footer | 2026-04-15 | Stable. |

## Viewport Coverage

| Viewport | Last Tested | Notes |
|----------|-------------|-------|
| Desktop (1280px) | 2026-04-15 | All 4 columns visible, full layout |
| Tablet (768px) | 2026-04-15 | All 4 columns visible, reduced hero/padding |
| Mobile (375px) | 2026-04-15 | Responsible hidden, severity pills wrap correctly |
| Very small (320px) | 2026-04-15 | Table overflows ~29px (expected, fade gradient signals scroll) |

## Known Stable Areas
- Nav glassmorphism + sticky behavior
- Hero number scaling via clamp()
- Theme switching between groups
- Source links (target="_blank", rel="noopener noreferrer")
- Date formatting and sort order
- Severity tier mapping (1-2 = tier-1, 3-4 = tier-2, 5 = tier-3)

## Known Flaky / Unstable Areas
- None currently identified.

## Exploration Notes
- At 320px the table overflows slightly (~29px). The fade gradient on the right edge signals horizontal scroll. This is the documented pattern per design.md.
- Permalink copy button uses `navigator.clipboard.writeText()` which requires HTTPS or localhost. Will fail on plain HTTP in production — consider fallback if deploying without HTTPS.
