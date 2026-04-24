"use server"

import { register, login } from "@/services/authService"
import { setSessionCookie, clearSessionCookie } from "@/lib/session"
import { redirect } from "next/navigation"

export async function registerAction(prevState, formData) {
  const password = formData.get("password")
  const confirm = formData.get("confirm")

  if (password !== confirm) {
    return { success: false, error: "Passwords do not match" }
  }

  const result = await register({
    name: formData.get("name"),
    email: formData.get("email"),
    password,
  })

  if (!result.success) return result

  await setSessionCookie(result.token)
  redirect("/tasks")
}

export async function loginAction(prevState, formData) {
  const result = await login({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!result.success) return result

  await setSessionCookie(result.token)
  redirect("/tasks")
}

export async function logoutAction() {
  await clearSessionCookie()
  redirect("/login")
}
