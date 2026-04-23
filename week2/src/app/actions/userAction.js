"use server"

import { createUser, editUser, removeUser } from "../services/userService"
import { revalidatePath } from "next/cache"

export async function createUserAction(prevState, formData) {
  const result = await createUser({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  })
  if (result.success) revalidatePath("/users")
  return result
}

export async function editUserAction(prevState, formData) {
  const id = Number(formData.get("id"))
  const result = await editUser(id, {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  })
  if (result.success) revalidatePath("/users")
  return result
}

export async function deleteUserAction(prevState, formData) {
  const id = Number(formData.get("id"))
  const result = await removeUser(id)
  if (result.success) revalidatePath("/users")
  return result
}
