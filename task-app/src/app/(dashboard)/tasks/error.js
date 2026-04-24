"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function TasksError({ error, reset }) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>{error.message || "Failed to load tasks."}</AlertDescription>
      </Alert>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
