# // JOB TRACKER

> **Live Demo →** [Add link here] _(coming soon)_

A modern, full-featured job application tracker built with **Next.js 16** and **Supabase**. Manage your entire job hunt in one place — from bookmarking interesting positions to tracking interview rounds and analyzing your pipeline with data-driven insights.

---

## Features

- **Kanban Board** — Drag-and-drop pipeline workflow with `@dnd-kit/react`. Move applications through stages (Bookmarked → Applied → Interviewing → Offer / Rejected).
- **Table View** — Sortable, filterable table of all applications for quick scanning and bulk actions.
- **Interview Round Tracking** — Attach multiple rounds (phone screen, technical, behavioral, take-home, final) per application with outcomes and scheduling.
- **Dashboard** — Stats cards, funnel chart, timeline chart, and upcoming interviews widget for a bird's-eye view of your pipeline.
- **Resume Uploads** — Upload and manage multiple resumes via Supabase Storage; attach them to individual applications.
- **Activity Logging** — Every status change, round addition, and note update is tracked as timeline activity.
- **Contacts** — Store recruiter / hiring manager contacts per application.
- **Dark / Light Theme** — System-aware theming via `next-themes`.

---

## Tech Stack

| Tool                                                                             | Rationale                                                                                                        |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [Next.js 16](https://nextjs.org/) (App Router)                                   | React framework with file-based routing, React Server Components, and RSC data fetching patterns                 |
| [Supabase](https://supabase.com/)                                                | Backend-as-a-service — provides Postgres DB, authentication, row-level security, and file storage out of the box |
| [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS 4](https://tailwindcss.com/) | Copy-paste component library built on Base UI primitives with a consistent design token system                   |
| [TypeScript](https://www.typescriptlang.org/)                                    | End-to-end type safety from the database schema (via `supabase gen types`) to the UI layer                       |
| [TanStack React Query](https://tanstack.com/query)                               | Declarative server-state management — caching, background refetching, and optimistic updates                     |
| [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/)        | Performant, uncontrolled form handling with schema-based validation on both client and server                    |
| [Recharts](https://recharts.org/)                                                | Lightweight, composable charting library for the dashboard's funnel, timeline, and stat charts                   |
| [@dnd-kit/react](https://dnd-kit.com/)                                           | Accessible, customizable drag-and-drop for the Kanban board                                                      |
| [date-fns](https://date-fns.org/)                                                | Lightweight date formatting and manipulation                                                                     |
| [Lucide React](https://lucide.dev/)                                              | Consistent, tree-shakeable icon set                                                                              |
| [Sonner](https://sonner.emilkowal.ski/)                                          | Minimal, accessible toast notifications                                                                          |
| [Vitest](https://vitest.dev/)                                                    | Unit and integration test runner aligned with the modern Vite/Next.js toolchain                                  |

---

## Local Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd job-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set environment variables** — copy the following into `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   > Get `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your Supabase project dashboard under **Settings → API**.

4. **Start Supabase** (local or remote):

   ```bash
   npx supabase start        # local development
   # or point .env.local to your hosted Supabase project
   ```

5. **Run database migrations:**

   ```bash
   npx supabase db push
   ```

6. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Screenshots / Walkthrough

### Landing Page

![Landing Page](https://i.imgur.com/DbbZIAy.png)

### Dashboard Analytics

![Dashboard Analytics](https://i.imgur.com/zwrLOKP.png)

---

## Key Technical Decisions

### 1. Server Actions over API Routes

**Decision**: All data mutations use Next.js Server Actions (`"use server"`) instead of REST API routes.

**Alternative considered**: Traditional `app/api/*/route.ts` handlers with `fetch` calls from the client.

**Rationale**:

- **Reduced boilerplate** — No separate route files, request parsing, or manual cookie/header handling
- **Type-safe end-to-end** — Direct TypeScript types from server to client; Zod validation runs on the server
- **Automatic cache revalidation** — `revalidatePath()` integrates seamlessly with Next.js cache
- **Progressive enhancement** — Works with `<form action={serverAction}>` for no-JS support
- **Colocation** — Mutation logic lives next to the components that call it

---

### 2. Fractional Indexing for Kanban Order (Planned Migration)

**Decision**: Replace integer `kanban_order` with fractional indexing (Lexorank-style strings) for drag-and-drop ordering.

**Current approach**: Integer-based ordering (0, 1, 2...) where `buildUpdates()` reassigns sequential integers to ALL items in a column on every move.

**Rationale for migration**:

- **Current pain point**: Moving one card between columns triggers updates to every card in both source and target columns (N+M writes)
- **Fractional indexing** lets you insert between two items by computing a midpoint — only the moved card gets a new order value
- **O(1) writes per move** vs O(N) currently; critical as columns grow
- **Conflict-resistant** — Midpoint calculation handles concurrent moves gracefully

---

### 3. Database Triggers for Activity Logs

**Decision**: Use PostgreSQL triggers to automatically populate `activity_logs` on relevant table changes.

**Alternative considered**: Manual `insert into activity_logs` calls in each Server Action.

**Rationale**:

- **Guaranteed audit trail** — Logs created at DB level; impossible to bypass via application bugs or direct DB access
- **Single source of truth** — All mutations (Server Actions, future API routes, admin tools) automatically generate logs
- **Transactional safety** — Log insert runs in same transaction as the source change; rollback on failure
- **Cleaner application code** — No scattered `insert into activity_logs` calls across 6+ server action files
