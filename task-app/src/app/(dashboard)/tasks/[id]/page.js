import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import EditTaskFormShell from "@/components/EditTaskFormShell"

export default function EditTaskPage({ params }) {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit task</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<FormSkeleton />}>
            <EditTaskFormShell params={params} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
      <Skeleton className="h-9 w-24" />
    </div>
  )
}
