"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"

export default function TaskFilters({ search, status, priority }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const update = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams)
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")
      router.push(`/tasks?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Input
        placeholder="Search tasks..."
        defaultValue={search}
        className="w-56"
        onChange={(e) => {
          clearTimeout(window._searchTimer)
          window._searchTimer = setTimeout(() => update("search", e.target.value), 400)
        }}
      />
      <Select defaultValue={status || "all"} onValueChange={(v) => update("status", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue={priority || "all"} onValueChange={(v) => update("priority", v)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      {(search || status || priority) && (
        <Button variant="ghost" size="sm" onClick={() => router.push("/tasks")}>
          Clear filters
        </Button>
      )}
    </div>
  )
}
