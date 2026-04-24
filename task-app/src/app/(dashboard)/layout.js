import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import NavbarSkeleton from "@/components/NavbarSkeleton"
import { requireSession } from "@/lib/session"
import { getCachedUserById } from "@/services/userService"

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarShell />
      </Suspense>
      <main className="flex-1 container mx-auto max-w-5xl px-6 py-8">
        {children}
      </main>
    </div>
  )
}

async function NavbarShell() {
  const session = await requireSession()
  const user = await getCachedUserById(session.userId)
  return <Navbar session={session} userName={user?.name ?? "User"} />
}
