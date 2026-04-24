import db from "@/lib/db"

export function findByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email)
}

export function findById(id) {
  return db
    .prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?")
    .get(id)
}

export function create({ name, email, passwordHash, role = "user" }) {
  return db
    .prepare(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
    )
    .run(name, email, passwordHash, role)
}
