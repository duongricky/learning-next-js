import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyToken } from "./auth"

export const SESSION_COOKIE = "session"

export async function setSessionCookie(token) {
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function getSession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return await verifyToken(token)
}

export async function requireSession() {
  const session = await getSession()
  if (!session) redirect("/login")
  return session
}
