import * as userRepo from "@/repositories/userRepository"
import { hashPassword, comparePassword, signToken } from "@/lib/auth"

export async function register({ name, email, password }) {
  if (!name?.trim() || !email?.trim() || !password) {
    return { success: false, error: "Please fill in all fields" }
  }
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" }
  }

  const existing = userRepo.findByEmail(email)
  if (existing) return { success: false, error: "Email already in use" }

  const passwordHash = hashPassword(password)
  const result = userRepo.create({ name: name.trim(), email: email.trim(), passwordHash })
  const user = userRepo.findById(result.lastInsertRowid)

  const token = await signToken({ userId: user.id, role: user.role })
  return { success: true, token }
}

export async function login({ email, password }) {
  if (!email?.trim() || !password) {
    return { success: false, error: "Please fill in all fields" }
  }

  const user = userRepo.findByEmail(email)
  if (!user) return { success: false, error: "Invalid email or password" }

  const valid = comparePassword(password, user.password_hash)
  if (!valid) return { success: false, error: "Invalid email or password" }

  const token = await signToken({ userId: user.id, role: user.role })
  return { success: true, token }
}
