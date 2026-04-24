import Database from "better-sqlite3"
import path from "path"
import bcrypt from "bcryptjs"

const db = new Database(path.join(process.cwd(), "database.sqlite"))

db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role          TEXT NOT NULL DEFAULT 'user',
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    status      TEXT NOT NULL DEFAULT 'todo',
    priority    TEXT NOT NULL DEFAULT 'medium',
    user_id     INTEGER NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
`)

const adminExists = db.prepare("SELECT id FROM users WHERE email = ?").get("admin@example.com")
if (!adminExists) {
  const hash = bcrypt.hashSync("admin123", 10)
  db.prepare(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
  ).run("Admin", "admin@example.com", hash, "admin")
}

const admin = db.prepare("SELECT id FROM users WHERE email = ?").get("admin@example.com")
const taskCount = db.prepare("SELECT COUNT(*) as n FROM tasks WHERE user_id = ?").get(admin.id)

if (taskCount.n === 0) {
  const insert = db.prepare(
    "INSERT INTO tasks (title, description, status, priority, user_id) VALUES (?, ?, ?, ?, ?)"
  )
  const seedTasks = db.transaction(() => {
    insert.run("Set up project repository", "Initialize Git, configure CI/CD pipeline and branch protection rules.", "done", "high", admin.id)
    insert.run("Design database schema", "Define tables for users, tasks, and relations. Add indexes for common queries.", "done", "high", admin.id)
    insert.run("Implement authentication", "JWT-based login and register with bcrypt password hashing.", "done", "high", admin.id)
    insert.run("Build task CRUD API", "Server actions for create, update, delete with ownership guard.", "done", "medium", admin.id)
    insert.run("Add role-based access control", "Admin can view and edit all tasks. Regular users see only their own.", "done", "medium", admin.id)
    insert.run("Create task list UI", "Paginated table with search and filter by status and priority.", "in_progress", "high", admin.id)
    insert.run("Add loading and error states", "Skeleton loaders via Suspense, per-segment error boundaries.", "in_progress", "medium", admin.id)
    insert.run("Implement cache layer", "Use 'use cache' directive with cacheTag and cacheLife for task queries.", "in_progress", "medium", admin.id)
    insert.run("Write middleware for resource ownership", "Block cross-user URL access at the middleware layer before route handlers.", "done", "high", admin.id)
    insert.run("Add task priority badges", "Color-coded badges for low / medium / high priority in the task table.", "todo", "low", admin.id)
    insert.run("Integrate dark mode", "Toggle light/dark theme using CSS variables and Tailwind dark variant.", "todo", "low", admin.id)
    insert.run("Add email notifications", "Send email on task assignment or status change using a transactional provider.", "todo", "medium", admin.id)
    insert.run("Write end-to-end tests", "Cover register, login, CRUD flow, and ownership checks with Playwright.", "todo", "high", admin.id)
    insert.run("Deploy to production", "Configure environment variables, SQLite persistence, and reverse proxy on VPS.", "todo", "high", admin.id)
    insert.run("Document API and architecture", "Write README covering setup, env vars, layer responsibilities, and data flow.", "todo", "medium", admin.id)
  })
  seedTasks()
}

export default db
