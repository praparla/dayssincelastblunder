# /refresh-blunders

Search the web for blunders (recent and historical) for one or all groups,
then verify or add entries in `blunders-data.js`.

## Usage

```
/refresh-blunders [group-id|all]
```

- `chicago-sky` — search only that group
- `all` — loop over every group in GROUPS
- (no arg) — defaults to `all`

## Steps

### 1. Read current state
Read `blunders-data.js` to get the current groups and their blunders.
Note the most recent date per group — search for anything newer.

### 2. Search for recent blunders
For each target group, run these web searches:

```
"[Group Name]" blunders [current year]
"[Group Name]" front office mistakes [current year]
"[Group Name]" [sport] controversy [current year]
```

Also run a historical sweep for anything not yet in the log:
```
"[Group Name]" biggest blunders history
"[Group Name]" worst decisions [sport]
```

### 3. Validate existing entries
For each existing blunder with `verified: false` or `source: null`:

1. Search for a source article confirming the event.
2. If found: set `source` to the URL and `verified: true`.
3. If contradicted: note the discrepancy and flag it to the user before changing anything.
4. If the event appears fictional or unverifiable: flag for human review — do NOT delete automatically.

### 4. Prepare proposed changes
For each **new** blunder found, build a candidate entry:

```js
{
  id: "[group-id]-NNN",        // next sequential ID for the group
  date: "YYYY-MM-DD",
  description: "...",          // concise, factual, one sentence
  responsible: "Name / Role",  // most accountable party
  severity: N,                 // 1–5: 1=minor, 3=significant, 5=catastrophic
  source: "https://...",       // direct URL to primary source
  verified: true,
  tags: ["..."],               // pick from existing tags where possible
}
```

Severity guide:
- **5** — Franchise-altering: star player lost, major scandal, fired coach/GM mid-season
- **4** — Significant: wasted asset, costly cap mistake, public embarrassment
- **3** — Meaningful but recoverable: poor draft position, minor PR stumble
- **2** — Minor: suboptimal roster move, small public misstep
- **1** — Marginal: nitpick, debatable

### 5. Present for review
Output a summary before writing anything:

```
## Refresh Results: [Group Name]

### New blunders found (N)
1. [date] — [description] (severity: N) → [source]
   Tags: [tags]

### Existing entries verified (N)
- [id]: source found → [url]

### Flagged for review (N)
- [id]: [reason]

### No changes needed (N entries already current)
```

Ask for confirmation before modifying `blunders-data.js`.

### 6. Update blunders-data.js
Only after explicit approval:
1. Read `blunders-data.js` (always re-read before editing).
2. Insert new entries into the correct group's `blunders` array.
3. Update `source` and `verified` on any existing entries that were sourced.
4. Preserve sort order — entries can be in any order (app.js sorts at render time).
5. Assign the next sequential `id` for the group (check existing ids to avoid collisions).

### 7. Verify and commit
Run the tests to confirm nothing broke:
```bash
node tests/render.test.mjs
```

Then commit with a message like:
```
Refresh blunders: [group-name] — N new, N verified

Sources added for: [ids]
New entries: [ids]
```
