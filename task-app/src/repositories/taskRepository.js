import db from "@/lib/db"

export function list({ userId, role, search, status, priority, page = 1, pageSize = 10 }) {
  const conditions = []
  const params = []

  if (role !== "admin") {
    conditions.push("t.user_id = ?")
    params.push(userId)
  }
  if (search) {
    conditions.push("t.title LIKE ?")
    params.push(`%${search}%`)
  }
  if (status) {
    conditions.push("t.status = ?")
    params.push(status)
  }
  if (priority) {
    conditions.push("t.priority = ?")
    params.push(priority)
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""
  const offset = (page - 1) * pageSize

  const rows = db
    .prepare(
      `SELECT t.*, u.name as user_name
       FROM tasks t
       JOIN users u ON t.user_id = u.id
       ${where}
       ORDER BY t.updated_at DESC
       LIMIT ? OFFSET ?`
    )
    .all(...params, pageSize, offset)

  const { count } = db
    .prepare(`SELECT COUNT(*) as count FROM tasks t ${where}`)
    .get(...params)

  return { rows, total: count }
}

export function findById(id) {
  return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id)
}

export function create({ title, description, status, priority, userId }) {
  const result = db
    .prepare(
      "INSERT INTO tasks (title, description, status, priority, user_id) VALUES (?, ?, ?, ?, ?)"
    )
    .run(title, description || null, status, priority, userId)
  return result.lastInsertRowid
}

export function update(id, { title, description, status, priority }) {
  return db
    .prepare(
      `UPDATE tasks
       SET title = ?, description = ?, status = ?, priority = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    .run(title, description || null, status, priority, id)
}

export function remove(id) {
  return db.prepare("DELETE FROM tasks WHERE id = ?").run(id)
}
