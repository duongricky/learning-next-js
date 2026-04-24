import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClipboardList } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <ClipboardList className="w-12 h-12 text-muted-foreground" />
      <div>
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first task to get started
        </p>
      </div>
      <Button asChild>
        <Link href="/tasks/new">Create task</Link>
      </Button>
    </div>
  )
}
