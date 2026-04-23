import db from "../../lib/db"

export function getAllUsers() {
  return db.prepare("SELECT * FROM users ORDER BY created_at DESC").all()
}

export function findUserByEmail(email, excludeId = null) {
  if (excludeId) {
    return db.prepare("SELECT * FROM users WHERE email = ? AND id != ?").get(email, excludeId)
  }
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email)
}

export function findUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id)
}

export function insertUser(data) {
  return db.prepare(`
    INSERT INTO users (name, email, phone)
    VALUES (@name, @email, @phone)
  `).run(data)
}

export function updateUser(id, data) {
  return db.prepare(`
    UPDATE users SET name = @name, email = @email, phone = @phone
    WHERE id = @id
  `).run({ ...data, id })
}

export function deleteUser(id) {
  return db.prepare("DELETE FROM users WHERE id = ?").run(id)
}
