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

Arguments may also include freeform instructions, e.g.:
- `and look at roster moves over the last 3 years`
- `and check MVP/FMVP players who left`
- `verify the date on sky-001`

## Steps

### 1. Read current state
Read `blunders-data.js` to get the current groups and their blunders.
Note the most recent date per group — search for anything newer.

### 2. Search for recent blunders
For each target group, run these web searches in parallel:

```
"[Group Name]" blunders [current year]
"[Group Name]" front office mistakes [current year]
"[Group Name]" [sport] controversy [current year]
```

Also run a historical sweep for anything not yet in the log:
```
"[Group Name]" biggest blunders history
"[Group Name]" worst decisions [sport]
"[Group Name]" roster moves [last 3 years]
"[Group Name]" MVP OR "Finals MVP" OR "award winner" traded OR departed OR left
```

The MVP/award winner search matters — losing a franchise cornerstone is almost always
a blunder worth logging, even if the return seemed reasonable at the time.

### 3. Validate existing entries
For **every** existing entry — regardless of `verified` status or whether `source` is set —
check the date and description for accuracy by searching for the event. Dates are the most
common error: entries can be `verified: true` and still have the wrong date.

For each entry:
1. Search for a source article confirming the event and its date.
2. If date is wrong: add to the "Date corrections" list in the summary.
3. If source is missing: add the URL and set `verified: true`.
4. If the description is materially inaccurate: flag it — don't silently rewrite.
5. If contradicted: note the discrepancy and flag it to the user before changing anything.
6. If the event appears fictional or unverifiable: flag for human review — do NOT delete automatically.

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
- **5** — Franchise-altering: star player lost for inadequate return, coaching hire/fire that
          accelerated a collapse, trading away a high pick for a one-year rental, major scandal
- **4** — Significant: wasted asset, costly cap mistake, re-signing then immediately trading a player,
          public embarrassment
- **3** — Meaningful but recoverable: poor draft position, minor PR stumble
- **2** — Minor: suboptimal roster move, small public misstep, forced departure where the return
          was reasonable (e.g., losing a player who demanded a trade but netting useful pieces)
- **1** — Marginal: nitpick, debatable

Calibration notes from past runs:
- Firing a coach mid-rebuild whose replacement performed worse → **5**
- Trading a top-3 pick for a one-year rental → **5**
- Losing a franchise player who demanded a trade but receiving solid draft capital → **2–3**
- Letting a veteran walk when the team was rebuilding anyway → **2**

### 5. Present for review
Output a full summary before writing anything:

```
## Refresh Results: [Group Name]

### Date corrections (N)
- [id]: [field] [old value] → [new value] | source: [url]

### New blunders found (N)
1. [date] — [description] (severity: N) → [source]
   Tags: [tags]

### Sources added to existing entries (N)
- [id]: [url]

### Flagged for review (N)
- [id]: [reason]

### No changes needed (N entries already current)
```

Ask for confirmation — including severity approval — before modifying `blunders-data.js`.
The user may adjust severities; wait for explicit approval before writing.

### 6. Update blunders-data.js
Only after explicit approval:
1. Read `blunders-data.js` (always re-read before editing).
2. Apply date corrections to existing entries.
3. Insert new entries into the correct group's `blunders` array.
4. Update `source` and `verified` on any existing entries that were sourced.
5. Preserve sort order — entries can be in any order (app.js sorts at render time).
6. Assign the next sequential `id` for the group (check existing ids to avoid collisions).

### 7. Verify and commit
Run the tests to confirm nothing broke:
```bash
/Users/pranava/.fnm/node-versions/v22.22.1/installation/bin/node tests/render.test.mjs
```

Then commit with a message like:
```
Refresh blunders: [group-name] — N new, N verified, N dates fixed

Date corrections: [ids]
Sources added for: [ids]
New entries: [ids]
```
