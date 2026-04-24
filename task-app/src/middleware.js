import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import Database from "better-sqlite3"
import path from "path"

export const runtime = "nodejs"

function getTaskOwnerId(id) {
  try {
    const db = new Database(path.join(process.cwd(), "database.sqlite"), {
      readonly: true,
    })
    const row = db.prepare("SELECT user_id FROM tasks WHERE id = ?").get(id)
    db.close()
    return row?.user_id ?? null
  } catch {
    return null
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("session")?.value
  const session = token ? await verifyToken(token) : null

  // Auth routes: redirect logged-in users away
  if (pathname === "/login" || pathname === "/register") {
    if (session) return NextResponse.redirect(new URL("/tasks", request.url))
    return NextResponse.next()
  }

  // Root: redirect based on auth state
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(session ? "/tasks" : "/login", request.url)
    )
  }

  // Protected /tasks routes
  if (pathname.startsWith("/tasks")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Resource ownership check for /tasks/[numeric-id]
    const match = pathname.match(/^\/tasks\/(\d+)/)
    if (match) {
      const taskId = Number(match[1])
      const ownerId = getTaskOwnerId(taskId)

      if (ownerId === null) {
        return NextResponse.redirect(new URL("/tasks", request.url))
      }

      if (session.role !== "admin" && session.userId !== ownerId) {
        return NextResponse.redirect(
          new URL("/tasks?forbidden=1", request.url)
        )
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: ["/", "/login", "/register", "/tasks/:path*"],
}
