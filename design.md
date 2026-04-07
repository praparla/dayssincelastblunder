# DESIGN.md — Days Since Last Blunder

> Design system for the DSLB multi-group blunder tracker. Follows the awesome-design-md format.
> Reference: https://github.com/VoltAgent/awesome-design-md

---

## 1. Visual Theme & Atmosphere

The tracker aims for **clean editorial energy** — the aesthetic of a sports journalism site, not a scoreboard. Bold, legible, and unapologetic. The hero number should feel as large and confident as a jersey number on a Jumbotron.

Key characteristics:
- **White background** — pure `#ffffff`, maximizing contrast and readability
- **Yellow + blue on the hero number** — fill in `--sky-yellow`, stroked with `--sky-blue`; both brand colors visible simultaneously
- **Blue as a supporting accent** — labels, headers, interactive states in `--sky-blue`
- **Navy for structure** — nav logo badge, "Erase the Tape" severity pill, section underline
- **Glassmorphism nav** — sticky bar with `backdrop-filter: blur(20px)` and subtle border
- **Tabular numerics** — all dates and counts use `font-variant-numeric: tabular-nums` for visual alignment
- **Inter font** — chosen for its excellent legibility at large display sizes and tight letter-spacing

---

## 2. Color Palette & Roles

### Official Chicago Sky Brand Colors

Source: [TruColor WNBA Official Colors](https://www.trucolor.net/portfolio/womens-national-basketball-association-official-colors-1997-through-present/) · [Team Color Codes](https://teamcolorcodes.com/chicago-sky-color-codes/)

| Color | Pantone | Hex | RGB | CMYK |
|-------|---------|-----|-----|------|
| Sky Blue | PMS 279 C | `#418FDE` | 65, 143, 222 | 69, 34, 0, 0 |
| Sky Yellow | PMS 116 C | `#FFCD00` | 255, 205, 0 | 0, 15, 94, 0 |
| Sky Navy | — | `#041E42` | 4, 30, 66 | — |

### CSS Variables

```css
:root {
  --sky-blue:        #418FDE;  /* PMS 279 C — labels, headers, focus rings */
  --sky-yellow:      #FFCD00;  /* PMS 116 C — accent badges, future highlights */
  --sky-navy:        #041E42;  /* Deep brand color — hero number, nav logo */
  --sky-navy-light:  #0a2a52;  /* Secondary navy — reserved for future use */
  --text-primary:    #0d0d0d;  /* Main text — headings and body */
  --text-secondary:  rgba(0, 0, 0, 0.45); /* Muted text — dates, subtitles, meta */
  --bg:              #ffffff;  /* Page background */
  --surface:         rgba(65, 143, 222, 0.04); /* Table & card backgrounds */
  --border:          rgba(0, 0, 0, 0.08); /* All dividers and borders */
}
```

### Semantic Color Map

| Role | Token | Hex / Value |
|------|-------|-------------|
| Page background | `--bg` | `#ffffff` |
| Card / table surface | `--surface` | `rgba(65,143,222,0.04)` |
| Primary text | `--text-primary` | `#0d0d0d` |
| Secondary / muted text | `--text-secondary` | `rgba(0,0,0,0.45)` |
| Brand primary (labels, headers) | `--sky-blue` | `#418FDE` (PMS 279 C) |
| Brand yellow (accent) | `--sky-yellow` | `#FFCD00` (PMS 116 C) |
| Brand navy (hero number, logo) | `--sky-navy` | `#041E42` |
| All borders and dividers | `--border` | `rgba(0,0,0,0.08)` |
| Nav background | — | `rgba(255,255,255,0.9)` |
| Table row hover | — | `rgba(65,143,222,0.04)` |

### Do Not Use
- Do not hardcode any hex values in CSS or JS. Always reference a `--token`.
- Do not add new colors without adding them as a CSS variable in `:root`.
- Do not use black (`#000000`) as a text color — `--text-primary` (`#0d0d0d`) is the approved near-black.

---

## 3. Typography Rules

**Font family:** `'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif`

Loaded from Google Fonts. System font fallbacks ensure no layout shift before load.

### Type Scale

| Role | Element | Size | Weight | Line Height | Letter Spacing | Notes |
|------|---------|------|--------|-------------|----------------|-------|
| Nav logo | `.nav-logo` | 15px | 800 | — | +0.08em | Uppercase implied by visual weight |
| Nav subtitle | `.nav-subtitle` | 13px | 400 | — | −0.01em | Muted secondary |
| Hero eyebrow | `.hero-label` | 14px | 600 | — | +0.12em | `text-transform: uppercase` |
| Hero number | `.hero-number` | clamp(96px, 20vw, 200px) | 900 | 1 | −0.04em | The focal point of the entire page |
| Hero description | `.hero-blunder` | 17px | 400 | 1.47 | −0.02em | Max-width 520px, centered |
| Section heading | `.section-title` | 28px | 700 | — | −0.02em | Left-aligned |
| Section subheading | `.section-subtitle` | 14px | 400 | — | — | Muted, below heading |
| Table header | `thead th` | 12px | 600 | — | +0.06em | `text-transform: uppercase`, `--sky-blue` |
| Table body | `tbody td` | 15px | 400 | 1.45 | −0.01em | |
| Date / meta cells | `td:nth-child(1,3)` | 14px | 400 | — | — | `tabular-nums`, `--text-secondary` |
| Footer | `.footer` | 12px | 400 | — | — | Centered, muted |

### Typography Principles

1. **Tight tracking at large sizes.** The hero number at 200px uses `−0.04em` letter-spacing. Without this, Inter looks loose and amateurish at display sizes.
2. **Upcase sparingly.** Only two elements are uppercased: the hero eyebrow label and table headers. Both pair uppercase with increased letter-spacing (+0.06–0.12em) — never uppercase without also opening the tracking.
3. **Weight 900 is reserved for the hero number only.** Weight 800 for the logo. Weight 700 for section headings. Everything else is 600 or below. This creates a clear visual hierarchy.
4. **Anti-aliasing is mandatory.** Always set `-webkit-font-smoothing: antialiased` on `html`. Without it, Inter looks heavy on macOS.
5. **Tabular numerics for all dates and counts.** Use `font-variant-numeric: tabular-nums` on any column that shows numbers so they align vertically.

---

## 4. Component Stylings

### Nav Bar

```css
.nav {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; gap: 12px;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--border);
}
```

The nav uses `flex` with a `.nav-spacer` (flex: 1) to push the group selector to the far right.

States: always visible, always sticky. No mobile collapse — all elements fit on one line at ≥320px.

### Group Selector

```css
.group-select {
  appearance: none; -webkit-appearance: none;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
  padding: 5px 28px 5px 12px;
  /* chevron via inline SVG background-image */
}
.group-select:hover  { border-color: rgba(65, 143, 222, 0.3); }
.group-select:focus  { outline: 2px solid var(--sky-blue); outline-offset: 2px; }
```

Use a pill shape (`border-radius: 20px`) consistent with the badge style in §9. The custom chevron arrow uses `--text-secondary` stroke so it blends with the muted palette. The selector is populated by `app.js` from `GROUPS` keys — never hardcode options in HTML.

### Source Link

```css
.source-link {
  color: var(--sky-blue);
  font-size: 12px; opacity: 0.7; margin-left: 4px;
}
.source-link:hover { opacity: 1; }
```

Inline `↗` after blunder description. Only rendered when `blunder.source !== null`.

### Hero Number

```css
.hero-number {
  font-size: clamp(96px, 20vw, 200px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--sky-yellow);
  -webkit-text-stroke: 2px var(--sky-blue);
}
```

Yellow fill with a sky blue outline — uses both brand colors simultaneously, readable at display size due to the stroke providing contrast against the white background.

### Table

```css
.table-wrapper {
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  overflow-x: auto;
}

thead th {
  padding: 14px 20px;
  color: var(--sky-blue);
  border-bottom: 1px solid var(--border);
}

tbody tr:hover {
  background: rgba(65, 143, 222, 0.04);
}
```

### Severity Labels

Three-tier text badge system replacing the old 5-dot scale.

```css
.severity-label {
  display: inline-block;
  font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
  padding: 3px 8px;
  border-radius: 20px;
  white-space: nowrap;
}
.severity-label.tier-1 { background: rgba(0,0,0,0.06);          color: rgba(0,0,0,0.45); }
.severity-label.tier-2 { background: rgba(65,143,222,0.12);      color: var(--sky-blue);  }
.severity-label.tier-3 { background: var(--sky-navy);            color: #ffffff;          }
```

| Tier | Label | Numeric range | Treatment |
|------|-------|---------------|-----------|
| 1 | Fine. We're Fine. | severity 1–2 | Muted gray pill |
| 2 | The Group Chat is Not Okay | severity 3–4 | Sky blue pill |
| 3 | Erase the Tape | severity 5 | Navy filled pill, white text |

Data still stores numeric severity (1–5); `renderSeverity()` in `app.js` maps to tiers at render time.

---

## 5. Layout Principles

### Spacing Scale

Base unit: **4px**

| Name | Value | Usage |
|------|-------|-------|
| xs | 4px | Dot gap in severity row |
| sm | 12px | Nav logo/subtitle gap |
| md | 14px | Table cell padding (vertical) |
| lg | 20px | Table cell padding (horizontal) |
| xl | 24px | Nav padding, page gutters |
| 2xl | 28px | Hero label → number gap |
| 3xl | 32px | Subtitle → table gap |
| 4xl | 60–80px | Hero vertical padding |

### Grid & Containers

- **Max-width:** `900px` on the table section. No max-width on the hero — it spans full viewport.
- **Page gutter:** `24px` on both sides (reduces to `16px` below 600px breakpoint)
- **Hero:** `align-items: center; justify-content: center; min-height: 70vh` — the number is always vertically centered in the top portion of the viewport

### Border Radius Scale

| Name | Value | Usage |
|------|-------|-------|
| pill | 9999px | Severity dots (full circle: 50%) |
| card | 12px | Table wrapper |
| — | — | No other border-radius used |

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Page | `background: #ffffff` | Base layer |
| Surface | `background: rgba(65,143,222,0.04)` + `border: 1px solid rgba(0,0,0,0.08)` | Table card |
| Nav | `background: rgba(255,255,255,0.9)` + `backdrop-filter: blur(20px)` | Sticky overlay |
| Row hover | `background: rgba(65,143,222,0.04)` | Interactive feedback |

**Shadow philosophy:** This design uses subtle tinting and borders instead of traditional drop shadows. Blue-tinted surfaces on a white background create depth without introducing new colors. No text-shadows — the white background makes them unnecessary.

---

## 7. Do's and Don'ts

### Do
- Use `clamp()` for the hero number font-size. It must scale from 96px (mobile) to 200px (desktop) without breakpoints.
- Use `text-transform: uppercase` + `letter-spacing: +0.06em` together — never one without the other.
- Use `tabular-nums` on any column that contains dates or counts.
- Keep the hero section at `min-height: 70vh` — the number needs to breathe.
- Pair borders with `border-radius: 12px` on all card surfaces for visual softness.
- Always test new blunder entries with long description text (>150 chars) to ensure the table wraps cleanly.

### Don't
- Don't reduce the hero number below `clamp(96px, 20vw, 200px)`. It's the entire point of the page.
- Don't use `font-weight: bold` (700) on table body text — 400 only. Bolds compete with the hierarchy.
- Don't use color fills for row hover — only the approved `rgba(65,143,222,0.04)` tint.
- Don't introduce drop shadows on cards. The border + surface tint is the depth model.
- Don't use `#000000` (pure black) for text — always `--text-primary` (`#0d0d0d`).
- Don't add uppercase styling without also increasing `letter-spacing` to at least `+0.06em`.
- Don't use placeholder `alt=""` on any images added in the future.

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Very small mobile | ≤380px | Nav subtitle ("Blunder Tracker") hidden to protect group selector space |
| Mobile | ≤600px | Hero 55vh / 60px 20px 40px padding, `.hero-blunder` 15px, table cells 10px padding, section padding 16px, section title 22px; Responsible column hidden; severity pill compacted (10px / 2px 7px); fade gradient on table right edge |
| Tablet | 601px – 900px | Hero 60vh / 60px 24px 44px padding, section title 24px, group selector max-width 140px, table padding 20px side |
| Desktop | >900px | Default styles apply |

### Touch Targets
- All interactive elements (future buttons, links) must be minimum **44×44px** tap area.
- Table rows are passive (no tap target) — if row clicks are added, the entire `<tr>` must be the tap target.

### Collapsing Strategy

| Component | Mobile behavior | Tablet behavior |
|-----------|----------------|-----------------|
| Nav | `.nav-subtitle` hidden at ≤380px to protect selector; all elements fit at 375px+ | All elements visible; `max-width: 140px` on selector prevents overflow |
| Hero | `min-height: 55vh`; number scales via `clamp()` automatically | `min-height: 60vh`; reduced top padding |
| Table | Responsible column (`th/td:nth-child(3)`) hidden; Severity visible without scroll; fade gradient on right edge signals any remaining overflow | All 4 columns visible; no horizontal scroll |
| Footer | No change | No change |

### Table Column Priority (mobile)
When the viewport is too narrow to show all columns, Responsible is the first to go. Priority order: **Date → Blunder → Severity → Responsible**.

### Overflow Safety
- `body { overflow-x: hidden }` prevents table content from expanding page width and misaligning the sticky nav.
- `.table-wrapper { position: relative }` is required for the `::after` scroll-indicator pseudo-element to position correctly.

---

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:          #ffffff
Surface/card:        rgba(65,143,222,0.04)
Border:              rgba(0,0,0,0.08)
Text primary:        #0d0d0d
Text secondary:      rgba(0,0,0,0.45)
Brand blue (labels): #418FDE  — PMS 279 C
Brand yellow (acc):  #FFCD00  — PMS 116 C
Brand navy (hero):   #041E42
Nav background:      rgba(255,255,255,0.9)
```

### Example Component Prompts

**New badge/pill:**
> "Add a badge with `background: rgba(65,143,222,0.12)`, `color: #418FDE`, `border: 1px solid rgba(65,143,222,0.2)`, `border-radius: 9999px`, `padding: 3px 10px`, `font-size: 12px`, `font-weight: 600`, `letter-spacing: 0.04em`."

**New section heading:**
> "Use `font-size: 28px`, `font-weight: 700`, `letter-spacing: -0.02em`, `color: #f5f5f7`, with a subtitle at `font-size: 14px`, `color: rgba(245,245,247,0.6)`, spaced 6px below the heading."

**New stat card:**
> "Card with `background: rgba(65,143,222,0.06)`, `border: 1px solid rgba(65,143,222,0.12)`, `border-radius: 12px`, `padding: 24px`. Title in `--sky-blue` (#418FDE) at 12px 600 uppercase +0.06em. Value in `--sky-yellow` (#FFCD00) at 48px 900 −0.04em."

**Adding a new column to the blunder table:**
> "Match existing cell padding (16px 20px), font-size 15px, `color: var(--text-primary)`. If it's a date or number, add `font-variant-numeric: tabular-nums` and use `--text-secondary`. If it's a status badge, use the pill style above."

### Iteration Rules for AI Agents
1. Always read `style.css` before making any style change.
2. Never introduce a new hex color — extend the `:root` variable block instead.
3. When adding a new UI element, match the spacing scale (multiples of 4px).
4. Hero number font-size is off-limits — `clamp(96px, 20vw, 200px)` is fixed.
5. Run a visual check at 375px, 600px, and 1280px viewport widths after any CSS change.
