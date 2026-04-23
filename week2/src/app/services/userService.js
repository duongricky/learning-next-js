import { z } from "zod"
import { getAllUsers, findUserByEmail, findUserById, insertUser, updateUser, deleteUser } from "../repositories/userRepository"

const UserSchema = z.object({
  name: z.string().min(10, "Name must be at least 10 characters").max(30, "Name must be at most 30 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(9, "Phone must be at least 9 digits").max(10, "Phone must be at most 10 digits").regex(/^\d+$/, "Phone must contain numbers only"),
})

export function getUsers() {
  return getAllUsers()
}

export async function createUser(data) {
  const result = UserSchema.safeParse(data)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const existing = findUserByEmail(result.data.email)
  if (existing) {
    return { errors: { email: ["Email already exists"] } }
  }

  insertUser(result.data)
  return { success: "User created successfully" }
}

export async function editUser(id, data) {
  const result = UserSchema.safeParse(data)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const existing = findUserByEmail(result.data.email, id)
  if (existing) {
    return { errors: { email: ["Email already exists"] } }
  }

  updateUser(id, result.data)
  return { success: "User updated successfully" }
}

export async function removeUser(id) {
  const user = findUserById(id)
  if (!user) {
    return { error: "User not found" }
  }

  deleteUser(id)
  return { success: "User deleted successfully" }
}
