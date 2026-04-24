import { Skeleton } from "@/components/ui/skeleton"

export default function TaskTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="border rounded-lg overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 px-4 py-3 border-b last:border-0">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
