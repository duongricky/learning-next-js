import { requireSession } from "@/lib/session"
import { getTasks } from "@/services/taskService"
import TaskTable from "@/components/TaskTable"
import TaskFilters from "@/components/TaskFilters"
import Pagination from "@/components/Pagination"
import EmptyState from "@/components/EmptyState"
import { Alert, AlertDescription } from "@/components/ui/alert"

const PAGE_SIZE = 10

export default async function TaskListBoundary({ searchParams }) {
  const session = await requireSession()
  const p = await searchParams

  const filters = {
    search: p.search || "",
    status: p.status || "",
    priority: p.priority || "",
    page: Number(p.page) || 1,
    pageSize: PAGE_SIZE,
  }

  const { rows, total } = await getTasks(session, filters)

  return (
    <div className="space-y-4">
      {p.forbidden === "1" && (
        <Alert variant="destructive">
          <AlertDescription>You do not have permission to access that task.</AlertDescription>
        </Alert>
      )}

      <TaskFilters search={filters.search} status={filters.status} priority={filters.priority} />

      {rows.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {total} task{total !== 1 ? "s" : ""}{session.role === "admin" ? " (all users)" : ""}
          </p>
          <TaskTable tasks={rows} showOwner={session.role === "admin"} />
          <Pagination
            page={filters.page}
            total={total}
            pageSize={PAGE_SIZE}
            searchParams={p}
          />
        </>
      )}
    </div>
  )
}
