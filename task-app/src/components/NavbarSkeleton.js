import { Skeleton } from "@/components/ui/skeleton"

export default function NavbarSkeleton() {
  return (
    <nav className="border-b bg-background px-6 py-3 flex items-center justify-between">
      <Skeleton className="h-5 w-24" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-8 w-20" />
      </div>
    </nav>
  )
}
