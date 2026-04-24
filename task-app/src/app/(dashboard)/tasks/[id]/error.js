"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function EditTaskError({ error, reset }) {
  return (
    <div className="max-w-2xl space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Could not load task</AlertTitle>
        <AlertDescription>{error.message || "Task not found or access denied."}</AlertDescription>
      </Alert>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/tasks">Back to tasks</Link>
        </Button>
      </div>
    </div>
  )
}
