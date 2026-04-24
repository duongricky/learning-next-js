import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TaskListBoundary from "@/components/TaskListBoundary"
import TaskTableSkeleton from "@/components/TaskTableSkeleton"

export default function TasksPage({ searchParams }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button asChild>
          <Link href="/tasks/new">+ New task</Link>
        </Button>
      </div>

      <Suspense fallback={<TaskTableSkeleton />}>
        <TaskListBoundary searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
