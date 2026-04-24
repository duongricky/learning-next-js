import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-muted-foreground">404</h1>
        <p className="text-xl font-medium">Page not found</p>
        <Button asChild>
          <Link href="/tasks">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
