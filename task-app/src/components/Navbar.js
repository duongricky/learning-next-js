import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { logoutAction } from "@/actions/authAction"
import { CheckSquare } from "lucide-react"

export default function Navbar({ session, userName }) {
  return (
    <nav className="border-b bg-background px-6 py-3 flex items-center justify-between">
      <Link href="/tasks" className="flex items-center gap-2 font-semibold">
        <CheckSquare className="w-5 h-5" />
        TaskApp
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{userName}</span>
        <Badge variant={session.role === "admin" ? "default" : "secondary"}>
          {session.role}
        </Badge>
        <form action={logoutAction}>
          <Button variant="outline" size="sm" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </nav>
  )
}
