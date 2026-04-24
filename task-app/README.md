# TaskApp

Full-stack task management app — Week 3 + Week 4 of the Next.js learning course.

**Live demo:** [learning-next-js-smoky-gamma.vercel.app](https://learning-next-js-smoky-gamma.vercel.app/)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Seeded admin account: `admin@example.com` / `admin123`

---

## Folder Structure

```
task-app/
├── .env.local                      # JWT_SECRET
├── database.sqlite                 # Auto-generated on first run
└── src/
    ├── middleware.js               # Auth guard + resource ownership check
    ├── lib/
    │   ├── db.js                   # SQLite singleton + schema + seed data
    │   ├── auth.js                 # bcrypt hash/compare, jose JWT sign/verify
    │   └── session.js              # Cookie read/write, getSession, requireSession
    ├── repositories/
    │   ├── userRepository.js       # Raw SQL: findByEmail, findById, create
    │   └── taskRepository.js       # Raw SQL: list (filter/pagination), findById, create, update, remove
    ├── services/
    │   ├── authService.js          # Business logic: register, login
    │   ├── taskService.js          # Business logic + ownership guard + cache wrappers
    │   └── userService.js          # getCachedUserById
    ├── actions/
    │   ├── authAction.js           # Server actions: registerAction, loginAction, logoutAction
    │   └── taskAction.js           # Server actions: createTaskAction, updateTaskAction, deleteTaskAction
    ├── components/
    │   ├── ui/                     # shadcn/ui components
    │   ├── Navbar.js               # Server component, logout form
    │   ├── NavbarSkeleton.js       # Skeleton fallback for Navbar
    │   ├── TaskForm.js             # Client component, useActionState
    │   ├── TaskTable.js            # Server component, renders task table
    │   ├── TaskFilters.js          # Client component, useRouter to push search params
    │   ├── TaskListBoundary.js     # Server component, reads session + searchParams, queries DB
    │   ├── TaskTableSkeleton.js    # Skeleton fallback for task table
    │   ├── EditTaskFormShell.js    # Server component, fetches task then renders TaskForm
    │   ├── Pagination.js           # Server component, link-based pagination
    │   ├── EmptyState.js           # Empty state UI
    │   ├── SubmitButton.js         # Client component, useFormStatus
    │   └── DeleteButton.js         # Client component, Dialog confirm
    └── app/
        ├── layout.js               # Root layout, fonts
        ├── page.js                 # Redirect → /tasks or /login
        ├── error.js                # Global error boundary
        ├── not-found.js
        ├── (auth)/
        │   ├── layout.js           # Centered card layout
        │   ├── login/page.js
        │   └── register/page.js
        └── (dashboard)/
            ├── layout.js           # Suspense(NavbarShell) + main wrapper
            └── tasks/
                ├── page.js         # Static shell + Suspense(TaskListBoundary)
                ├── error.js
                ├── new/page.js
                └── [id]/
                    ├── page.js     # Suspense(EditTaskFormShell)
                    └── error.js
```

---

## Week 3

### 1. Auth

**Login / Register**
- Form submits to a Server Action (`loginAction`, `registerAction`)
- Server Action calls `authService` to verify password → creates JWT → stores it in an httpOnly cookie
- httpOnly cookie = JS on the client cannot read it, safer than localStorage
- `jose` signs/verifies JWT (works on both Node and Edge runtime)
- `bcryptjs` hashes passwords before storing in DB
- Files: [src/lib/auth.js](src/lib/auth.js), [src/services/authService.js](src/services/authService.js), [src/actions/authAction.js](src/actions/authAction.js)

**Logout**
- Form with `action={logoutAction}` → Server Action clears the cookie → redirect to `/login`
- File: [src/components/Navbar.js](src/components/Navbar.js)

**Middleware — Protect Routes**
- `middleware.js` runs before every request
- Reads cookie → verifies JWT → redirects to `/login` if invalid
- Also checks **resource ownership**: if user A tries to access `/tasks/[id]` owned by user B → redirect to `/tasks`
- Uses `export const runtime = "nodejs"` because middleware needs to query SQLite (native module, cannot run on Edge)
- File: [src/middleware.js](src/middleware.js)

---

### 2. CRUD

**Layered architecture** (same pattern as Week 2):
```
Form (UI) → Server Action → Service → Repository → SQLite
```

- **Repository** — raw SQL only, no business logic
- **Service** — validation + ownership guard + calls repository
- **Action** — `"use server"`, receives `formData`, calls service, redirects on success

**List + filter + pagination**
- `taskRepository.list()` accepts `{ search, status, priority, page, pageSize }` and builds WHERE clauses dynamically
- Admin bypasses the `userId` filter and sees all tasks
- Pagination uses `LIMIT` + `OFFSET`; total row count comes from `COUNT(*)`
- File: [src/repositories/taskRepository.js](src/repositories/taskRepository.js)

**Defense in depth**
- Middleware blocks at the URL level (cross-user access via browser)
- Service layer guards again (cross-user access via direct Server Action calls)

---

### 3. Basic UI

**Form with error state**
- `useActionState(action, initialState)` receives `state` returned by the Server Action
- If the action returns `{ success: false, error: "..." }` → error renders below the form without a page reload
- File: [src/components/TaskForm.js](src/components/TaskForm.js)

**Loading state**
- `SubmitButton` uses `useFormStatus()` → `pending = true` while the form is submitting → disables the button and changes its text
- File: [src/components/SubmitButton.js](src/components/SubmitButton.js)

**Error state**
- `error.js` per route segment: an error in `/tasks` only crashes that segment, not the whole app
- Component receives `error` + `reset` props; clicking "Try again" calls `reset()` to retry
- File: [src/app/(dashboard)/tasks/error.js](src/app/(dashboard)/tasks/error.js)

---

## Week 4

### 1. Performance

**Caching with Cache Components (Next.js 16)**
- Opt-in with the `'use cache'` directive inside a function
- `cacheTag("tasks")` — attaches a tag so a group of cache entries can be invalidated together
- `cacheLife("hours")` — TTL preset (stale after a few hours)
- Each unique set of arguments is its own cache entry → `getCachedTaskList(userId, role, filters)` caches separately per user/filter combo
- Files: [src/services/taskService.js](src/services/taskService.js), [src/services/userService.js](src/services/userService.js)

**Revalidate**
- `updateTag("tasks")` is called after every mutation (create / update / delete)
- `updateTag` = immediately expires cache → user sees their own change right away (read-your-own-writes)
- Contrast with `revalidateTag` = stale-while-revalidate (background refresh, user may see stale data once)
- File: [src/actions/taskAction.js](src/actions/taskAction.js)

**Avoid unnecessary Client Components**
- Server Component is the default — queries DB directly, no API route needed
- `"use client"` only when truly necessary: `useActionState`, `useFormStatus`, `useRouter`, `useState`
- Client components in this project: `TaskForm`, `TaskFilters`, `SubmitButton`, `DeleteButton`
- Everything else (Navbar, TaskTable, TaskListBoundary, Pagination, layouts) is a Server Component

---

### 2. Error Handling

**Global error boundary**
- `app/error.js` — catches unhandled errors from any route
- Must be a Client Component (`"use client"`) because it uses a React error boundary
- File: [src/app/error.js](src/app/error.js)

**Fallback UI per segment**
- Each route segment has its own `error.js` → errors are isolated, the rest of the app stays up
- `tasks/error.js` → error in the list page
- `tasks/[id]/error.js` → error in the edit page

---

### 3. UX

**Skeleton loading**
- `<Suspense fallback={<Skeleton />}>` wraps async Server Components
- While the inner component fetches data, the skeleton fallback is shown
- `NavbarSkeleton` → fallback for Navbar (reads session + queries user)
- `TaskTableSkeleton` → fallback for TaskListBoundary (reads session + queries tasks)
- Partial Prerendering: static parts (heading, "New task" button) render immediately; dynamic parts stream in after
- Files: [src/components/NavbarSkeleton.js](src/components/NavbarSkeleton.js), [src/components/TaskTableSkeleton.js](src/components/TaskTableSkeleton.js)

**Empty state**
- When a query returns 0 tasks → renders `EmptyState` instead of an empty table
- File: [src/components/EmptyState.js](src/components/EmptyState.js)

---

### 4. Deploy (optional)

**Vercel**
- Push to GitHub → connect to Vercel → auto deploy
- Set `JWT_SECRET` in the Vercel dashboard environment variables
- Note: SQLite is file-based and not persistent on Vercel (serverless) → use Turso or PlanetScale for a real deployment

**Docker**
- Build image with a `Dockerfile`, mount a volume for `database.sqlite` to persist data
- Pass `JWT_SECRET` via env in `docker-compose.yml`
