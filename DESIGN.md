# Design System

A personal job application tracker. The UI should feel calm, precise, and product-grade — designed to impress a technical recruiter who opens the repository.

Sections marked `<!-- EDIT -->` are not yet finalised. AI assistants must treat them as placeholders and apply the closest reasonable interpretation from surrounding context. All other sections are authoritative and must be followed exactly. Never use hardcoded hex values, arbitrary pixel values, or inline styles. Always implement both light and dark variants.

---

## Stack

- **Framework:** Next.js 14+ App Router + React + TypeScript
- **Styling:** Tailwind CSS, CSS variables in `app/globals.css`
- **Components:** shadcn/ui primitives in `components/ui` — never edited directly
- **Icons:** Lucide React only
- **Dark mode:** `next-themes`, class strategy, system default
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Drag and drop:** @dnd-kit
- **Utilities:** `cn()` from `@/lib/utils`, `date-fns` for all date formatting

---

## Visual Direction

<!-- EDIT -->

> Choose one option and delete the others. Then fill in the Tokens section to match.

**Option A — Minimal and Clean**

- Whitespace is the primary design element; borders are hairline or absent
- Colours are muted and desaturated; the interface steps back and lets data lead
- Reference products: Linear, Notion, Vercel dashboard
- Right for you if: you want the app to feel calm, mature, and focused

**Option B — Modern and Bold**

- Strong typographic hierarchy; a vivid accent colour used with intention
- Higher contrast between surfaces; cards have visible shadows or borders
- Reference products: Stripe dashboard, Loom, Raycast
- Right for you if: you want visual confidence and instant visual impact

**Option C — Professional and Corporate**

- Structured grid, clear section dividers, data-forward layout
- Subtle colour use with a blue primary; feels closer to enterprise tooling
- Reference products: Jira, Salesforce, GitHub
- Right for you if: you want to feel immediately familiar to non-technical recruiters

---

## Tokens

All tokens are CSS variables in `app/globals.css`. Dark values live inside `.dark {}`. Never reference raw palette values in component files — always go through a semantic token.

| Token                      | Light         | Dark          | Usage                              |
| -------------------------- | ------------- | ------------- | ---------------------------------- |
| `--background`             | <!-- EDIT --> | <!-- EDIT --> | Page canvas                        |
| `--foreground`             | <!-- EDIT --> | <!-- EDIT --> | Primary text                       |
| `--card`                   | <!-- EDIT --> | <!-- EDIT --> | Card and panel backgrounds         |
| `--card-foreground`        | <!-- EDIT --> | <!-- EDIT --> | Text on cards                      |
| `--popover`                | <!-- EDIT --> | <!-- EDIT --> | Popover and dropdown backgrounds   |
| `--popover-foreground`     | <!-- EDIT --> | <!-- EDIT --> | Text in popovers                   |
| `--primary`                | <!-- EDIT --> | <!-- EDIT --> | Primary buttons, active states     |
| `--primary-foreground`     | <!-- EDIT --> | <!-- EDIT --> | Text on primary backgrounds        |
| `--secondary`              | <!-- EDIT --> | <!-- EDIT --> | Secondary buttons, subtle surfaces |
| `--secondary-foreground`   | <!-- EDIT --> | <!-- EDIT --> | Text on secondary backgrounds      |
| `--muted`                  | <!-- EDIT --> | <!-- EDIT --> | Skeleton loaders, subdued surfaces |
| `--muted-foreground`       | <!-- EDIT --> | <!-- EDIT --> | Labels, captions, placeholders     |
| `--accent`                 | <!-- EDIT --> | <!-- EDIT --> | Hover and selected states          |
| `--accent-foreground`      | <!-- EDIT --> | <!-- EDIT --> | Text on accent backgrounds         |
| `--destructive`            | <!-- EDIT --> | <!-- EDIT --> | Errors, delete actions             |
| `--destructive-foreground` | <!-- EDIT --> | <!-- EDIT --> | Text on destructive backgrounds    |
| `--border`                 | <!-- EDIT --> | <!-- EDIT --> | All borders and dividers           |
| `--input`                  | <!-- EDIT --> | <!-- EDIT --> | Input field borders                |
| `--ring`                   | <!-- EDIT --> | <!-- EDIT --> | Focus rings                        |

### Status tokens

<!-- EDIT -->

> Fill in hex values once the aesthetic direction is chosen. Variable names are fixed.

```css
:root {
  --status-bookmarked: /* neutral gray, e.g. #6B7280 */;
  --status-bookmarked-bg: /* e.g. #F3F4F6 */;
  --status-applied: /* blue, e.g. #3B82F6 */;
  --status-applied-bg: /* e.g. #EFF6FF */;
  --status-interviewing: /* amber, e.g. #F59E0B */;
  --status-interviewing-bg: /* e.g. #FFFBEB */;
  --status-offer: /* green, e.g. #10B981 */;
  --status-offer-bg: /* e.g. #ECFDF5 */;
  --status-rejected: /* red, e.g. #EF4444 */;
  --status-rejected-bg: /* e.g. #FEF2F2 */;
  --status-withdrawn: /* light gray, e.g. #9CA3AF */;
  --status-withdrawn-bg: /* e.g. #F9FAFB */;
}
.dark {
  /* define dark equivalents for each */
}
```

Status colours are always accessed through `statusConfig` in `lib/config.ts`. Never reference these variables directly in component files.

```ts
export const statusConfig = {
  bookmarked: {
    label: "Bookmarked",
    color: "var(--status-bookmarked)",
    bg: "var(--status-bookmarked-bg)",
  },
  applied: {
    label: "Applied",
    color: "var(--status-applied)",
    bg: "var(--status-applied-bg)",
  },
  interviewing: {
    label: "Interviewing",
    color: "var(--status-interviewing)",
    bg: "var(--status-interviewing-bg)",
  },
  offer: {
    label: "Offer",
    color: "var(--status-offer)",
    bg: "var(--status-offer-bg)",
  },
  rejected: {
    label: "Rejected",
    color: "var(--status-rejected)",
    bg: "var(--status-rejected-bg)",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "var(--status-withdrawn)",
    bg: "var(--status-withdrawn-bg)",
  },
};
```

### Chart tokens

<!-- EDIT -->

> Define 5 chart colours once the palette is chosen. Must be visually distinct, readable in both modes, and not clash with status colours. Add to `globals.css` as `--chart-1` through `--chart-5`.

```ts
// lib/config.ts
export const chartColors = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  tertiary: "var(--chart-3)",
  quaternary: "var(--chart-4)",
  quinary: "var(--chart-5)",
};
```

---

## Typography

### Fonts

<!-- EDIT -->

> Choose one sans-serif option and delete the others. Load it alongside a monospace font for numeric data.

| Token         | Font                                                                             | Usage                                             |
| ------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- |
| `--font-sans` | **Option A:** Inter · **Option B:** Geist Sans · **Option C:** Plus Jakarta Sans | All UI text, labels, body copy                    |
| `--font-mono` | JetBrains Mono or Geist Mono                                                     | Salary figures, dates in dense contexts, metadata |

### Type scale

Only these sizes are used. Do not introduce intermediate values.

| Class       | Size | Weight          | Usage                                              |
| ----------- | ---- | --------------- | -------------------------------------------------- |
| `text-xs`   | 12px | `font-medium`   | Captions, timestamps, secondary metadata           |
| `text-sm`   | 14px | `font-normal`   | Body text, table cells, form labels — most UI text |
| `text-base` | 16px | `font-normal`   | Card descriptions, comfortable reading copy        |
| `text-lg`   | 18px | `font-semibold` | Section headings, dialog titles                    |
| `text-xl`   | 20px | `font-semibold` | Page subtitles                                     |
| `text-2xl`  | 24px | `font-bold`     | Page titles                                        |
| `text-3xl`  | 30px | `font-bold`     | Dashboard stat numbers                             |

### Line height

- Body text: `leading-relaxed`
- UI labels and table cells: `leading-normal`
- Headings: `leading-tight`

---

## Spacing

Comfortable and spacious density. When choosing between two Tailwind spacing values, choose the larger one.

### Permitted spacing values

`2` `4` `6` `8` `10` `12` `16` `20` `24` `32` `40` `48` `64`

### Padding rules

| Context            | Value                                    |
| ------------------ | ---------------------------------------- |
| Page content area  | `px-6 py-8` desktop · `px-4 py-6` mobile |
| Cards              | `p-6`                                    |
| Kanban cards       | `p-4`                                    |
| Dialog content     | `p-6`                                    |
| Table cells        | `px-4 py-3`                              |
| Buttons and inputs | shadcn defaults — do not override        |

### Gap rules

| Context                      | Value   |
| ---------------------------- | ------- |
| Page-level sections          | `gap-8` |
| Card grids                   | `gap-6` |
| Form fields                  | `gap-4` |
| Icon + label inline          | `gap-2` |
| Kanban cards within a column | `gap-3` |

---

## Dark Mode

Dark mode is first-class, not an afterthought. Every component must be verified in both modes before it is considered done.

**Setup:** use `next-themes` with `attribute="class"` and `defaultTheme="system"`. Wrap in `providers.tsx` alongside `QueryClientProvider`.

**Rules:**

- Never use `bg-white` — use `bg-background` or `bg-card`
- Never use `text-black` or `text-gray-900` — use `text-foreground`
- Shadows are lighter in dark mode — use `shadow-sm` throughout, avoid `shadow-lg`
- All borders use `border-border` — the CSS variable adjusts automatically
- The theme toggle lives in the sidebar footer — sun / moon / monitor icons, `DropdownMenu`, tooltip labels

---

## Responsive Design

Desktop-first. Fully usable on mobile.

### Breakpoints

| Prefix | Width   | Role                        |
| ------ | ------- | --------------------------- |
| (none) | 0px+    | Mobile base                 |
| `sm`   | 640px+  | Minor adjustments           |
| `md`   | 768px+  | Sidebar collapses to drawer |
| `lg`   | 1024px+ | Full desktop layout         |
| `xl`   | 1280px+ | Wide desktop                |

### Per-section mobile behaviour

| Section              | Mobile                                             |
| -------------------- | -------------------------------------------------- |
| Sidebar              | Slide-over drawer, hamburger in topbar             |
| Table                | `overflow-x-auto`, minimum column widths preserved |
| Kanban board         | Single vertical column list, status shown as badge |
| Dashboard stat cards | 2-column grid (4-column on desktop)                |
| Dashboard charts     | Full width, height `200` (desktop `300`)           |
| Dialogs              | Full-screen `Sheet` on mobile instead of `Dialog`  |
| Detail page          | Sections stack vertically                          |

---

## Iconography

Lucide React only. No other icon library is used.

| Context                   | Class     | px  |
| ------------------------- | --------- | --- |
| Inline with text          | `size-4`  | 16  |
| Buttons                   | `size-4`  | 16  |
| Sidebar nav               | `size-5`  | 20  |
| Stat card icons           | `size-5`  | 20  |
| Empty state illustrations | `size-12` | 48  |

- Decorative icons (next to a text label): `aria-hidden="true"`
- Icon-only buttons: `aria-label` on the button or `<span className="sr-only">`
- Never use an icon as the sole status indicator — always pair with text
- Stroke width stays at the Lucide default `strokeWidth={1.5}`

---

## Motion

Animation is used sparingly. The interface should feel responsive, not theatrical.

- Hover lift: `hover:-translate-y-0.5 transition-transform duration-150`
- Focus ring: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Disabled: `disabled:pointer-events-none disabled:opacity-50`
- Page transitions: none — keep navigation instant
- Sidebar collapse: `transition-[width] duration-200 ease-out`
- Skeleton loaders: `animate-pulse`
- Dialogs, sheets, toasts: shadcn/Sonner built-in animations — do not override
- Kanban drag: dnd-kit built-in — do not add extra transitions
- Respect `prefers-reduced-motion` — use `motion-safe:` variant on any non-essential animation

---

## Components

### Buttons

| Variant       | Usage                                                        |
| ------------- | ------------------------------------------------------------ |
| `default`     | The single primary action per view. One at a time.           |
| `secondary`   | Common but optional supporting actions                       |
| `outline`     | Tertiary actions, cancel                                     |
| `destructive` | Permanent deletes only — always behind a confirmation dialog |
| `ghost`       | Icon-only actions, sidebar nav, table row actions            |

Size is always `default`. Use `sm` only inside table cells or compact card footers.

### Badges

Badges display application status. Always derive colour from `statusConfig` — never hardcode.

```tsx
<Badge
  style={{
    backgroundColor: statusConfig[status].bg,
    color: statusConfig[status].color,
    border: "none",
  }}
>
  {statusConfig[status].label}
</Badge>
```

Use: `rounded-full`, informational only, always text + colour together.  
Avoid: interactive badges, colour-only status indicators, custom sizes.

### Cards

Use:

```tsx
<Card className="p-6 rounded-lg border border-border bg-card">
```

Avoid: plain white or hardcoded gray backgrounds, nested cards, `shadow-lg` in dark mode.

### Forms

Use:

```tsx
// Label above field, error below on blur
<FormItem>
  <FormLabel>
    Company{" "}
    <span className="text-muted-foreground font-normal">(optional)</span>
  </FormLabel>
  <FormControl>
    <Input />
  </FormControl>
  <FormMessage /> {/* text-sm text-destructive */}
</FormItem>
```

- Labels always visible — never use placeholder as the only label
- Optional fields marked `(optional)` in `text-muted-foreground` — required fields unmarked
- Validation errors appear on blur, not on keystroke
- Submit at bottom right, Cancel to its left
- Field gap: `gap-4`. Section gap: `gap-6`

### Dialogs

- Simple forms: `max-w-lg`. Multi-section forms: `max-w-2xl`
- Title describes the action: "Add Application", "Edit Contact", "Delete Resume"
- Destructive confirm button: "Delete [thing]", not "Confirm" or "Delete"
- Close on overlay click unless the form is dirty

### Tables

Use:

```tsx
// Column header
<th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
// Row
<tr className="hover:bg-muted/50">
// Cell
<td className="px-4 py-3 text-sm text-foreground">
// Secondary cell info
<span className="text-xs text-muted-foreground">
```

- Numeric columns (salary): right-aligned
- Action columns: right-aligned, icon-only ghost buttons, visible on row hover
- No striped rows
- Empty table: show empty state component, not an empty `<tbody>`

### Kanban cards

```tsx
<div className="p-4 rounded-lg border border-border bg-card">
  {/* Status badge — top right */}
  <p className="text-sm font-semibold">{company}</p>
  <p className="text-sm text-muted-foreground">{role}</p>
  <p className="text-xs text-muted-foreground font-mono">{salary}</p>
  {/* Applied date — bottom, text-xs text-muted-foreground */}
</div>
```

On drag: `opacity-50` + visible drop shadow.

---

## Layout

### Global shell

```
┌───────────────────────────────────────────────┐
│  Sidebar w-64 (fixed)   │  Main content flex-1 │
│                         │                       │
│  Logo                   │  Topbar h-16          │
│  ───────                │  border-b border-border│
│  Nav items              │                       │
│                         │  px-6 py-8            │
│  ───────                │  max-w-7xl mx-auto    │
│  User + theme toggle    │                       │
└───────────────────────────────────────────────┘
```

### Sidebar nav order

1. Dashboard
2. Kanban Board
3. Applications
4. Resumes
5. _(divider)_
6. Settings _(bottom)_

Active item: `bg-accent text-accent-foreground font-medium`  
Inactive item: `text-muted-foreground hover:bg-accent/50 hover:text-foreground`

### Topbar

- Height: `h-16`, `border-b border-border`
- Left: current page title (`text-lg font-semibold`)
- Right: primary action button for the current page

### Dashboard layout

<!-- EDIT -->

> Exact widget positioning not yet decided. Fill this section once the layout is finalised.

**Widgets (placement TBD):**

- Stat cards row (4 cards): Total Applications, Active, Offers, Response Rate — always at the top
- Application funnel bar chart (count per status)
- Applications over time area chart (per week using `applied_at`)
- Upcoming interviews list
- Average time-in-stage metric

**Constraints:**

- Stat cards always form a single full-width row at the top
- Charts take at least half the viewport width
- Upcoming interviews widget is narrow enough to sit alongside a chart
- Aim to show the most important data above the fold on a 1080p screen

---

## Data Visualisation

All charts use Recharts. These rules apply to every chart in the project.

```tsx
// Required wrapper on every chart
<ResponsiveContainer width="100%" height={300}> {/* 200 on mobile */}
```

- `<Tooltip>`: custom content component matching `bg-card` and `border-border`
- `<Legend>`: present on all multi-series charts; omit on single-series
- Grid lines: `stroke="var(--border)" strokeDasharray="4 4"`
- Axis ticks: `fill="var(--muted-foreground)" fontSize={12}`
- Max 6 series per chart — combine smaller categories into "Other"
- Loading: `rounded-lg bg-muted animate-pulse` block at the chart's expected height
- Empty: "No data yet — start adding applications to see your stats."
- Charts must be rendered inside Client Components

---

## States

Every list, table, chart, and board column must implement all four states. A component is not complete until all four are done.

### Loading

```tsx
// Inside a <Suspense> boundary
{
  Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex gap-4 px-4 py-3" aria-busy="true">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-16 rounded-full" />
    </div>
  ));
}
```

### Empty

```tsx
<div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
  <Briefcase
    className="size-12 text-muted-foreground/40"
    strokeWidth={1}
    aria-hidden="true"
  />
  <div>
    <p className="text-sm font-medium text-foreground">No applications yet</p>
    <p className="text-sm text-muted-foreground mt-1">
      Add your first application to get started.
    </p>
  </div>
  <Button onClick={onAdd}>
    <Plus className="size-4 mr-2" aria-hidden="true" />
    Add Application
  </Button>
</div>
```

Icon: always `text-muted-foreground/40`, `strokeWidth={1}`. Heading: factual statement. CTA: resolves the empty state.

### Error

```tsx
<div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
  <AlertCircle
    className="size-12 text-destructive/40"
    strokeWidth={1}
    aria-hidden="true"
  />
  <div>
    <p className="text-sm font-medium text-foreground">Something went wrong</p>
    <p className="text-sm text-muted-foreground mt-1">
      Could not load your applications. Please try again.
    </p>
  </div>
  <Button variant="outline" onClick={onRetry}>
    Try again
  </Button>
</div>
```

### Mutation feedback (toasts via Sonner)

- Success: `toast.success('Application saved')` — past tense, brief
- Error: `toast.error('Failed to save. Please try again.')` — plain English, no technical detail
- No toast for read operations
- Max duration: 4 seconds
- No action buttons inside toasts

---

## Accessibility

- **Contrast:** body text minimum 4.5:1; large text minimum 3:1; status badge text 4.5:1 against its background. Verify with WebAIM Contrast Checker.
- **Focus rings:** never suppress `outline` or `ring` without an equivalent replacement. shadcn/ui applies rings by default — do not override.
- **Focus management:** dialog open → focus moves to first interactive element; dialog close → focus returns to trigger.
- **Keyboard:** all mouse actions achievable by keyboard. `KeyboardSensor` in dnd-kit must not be removed. `Escape` closes all dialogs, dropdowns, and popovers.
- **Semantic HTML:** `<h1>` page title → `<h2>` sections → `<h3>` card titles, no skipped levels. Tables use `<table>/<thead>/<th scope="col">/<tbody>/<tr>/<td>`. Navigation uses `<nav aria-label="...">`. Never use `<div onClick>` for buttons or links.
- **Screen readers:** decorative icons `aria-hidden="true"`; icon-only buttons need `aria-label`; loading containers need `aria-busy="true"`; status never conveyed by colour alone.

---

## Writing Style

### Voice

- Direct and clear — no filler words
- Friendly but not casual: "Add Application", not "Add a New Application!" or "New App"
- Action-oriented: buttons describe what happens, not what they are

### Capitalisation

| Case          | Used for                                                             |
| ------------- | -------------------------------------------------------------------- |
| Title Case    | Page titles, dialog titles, nav items, button labels, column headers |
| Sentence case | Descriptions, placeholders, toasts, empty state body, tooltips       |
| ALL CAPS      | Never in strings — use `uppercase` CSS class if visually needed      |

### Tense and phrasing

| Context             | Pattern            | Example                                                                                 |
| ------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| Button labels       | Imperative present | "Add", "Save", "Delete", "Cancel"                                                       |
| Success toasts      | Past tense         | "Application saved", "Resume deleted"                                                   |
| Error toasts        | Present + retry    | "Failed to save. Please try again."                                                     |
| Empty states        | Factual present    | "No applications yet"                                                                   |
| Delete confirmation | Consequence-first  | "This will permanently delete the application and all its data. This cannot be undone." |

### Numbers and dates

- Absolute dates: `MMM d, yyyy` — "Jun 3, 2026"
- Relative dates: `formatDistanceToNow(date, { addSuffix: true })` — "3 days ago"
- Salary: `$95,000 – $110,000` · single bound: `From $95,000` or `Up to $110,000`
- Percentages: whole numbers only — "47%", not "47.3%"

---

_Last updated: June 2026_
