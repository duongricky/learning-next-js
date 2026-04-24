import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Pagination({ page, total, pageSize, searchParams }) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  function buildUrl(p) {
    const params = new URLSearchParams(searchParams)
    params.set("page", p)
    return `/tasks?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} ({total} tasks)
      </p>
      <div className="flex gap-2">
        {page > 1 && (
          <Button variant="outline" size="sm" asChild>
            <Link href={buildUrl(page - 1)}>← Previous</Link>
          </Button>
        )}
        {page < totalPages && (
          <Button variant="outline" size="sm" asChild>
            <Link href={buildUrl(page + 1)}>Next →</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
