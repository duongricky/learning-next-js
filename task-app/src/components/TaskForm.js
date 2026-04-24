"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SubmitButton from "@/components/SubmitButton"

export default function TaskForm({ action, task }) {
  const [state, formAction] = useActionState(action, null)

  return (
    <form action={formAction} className="space-y-5">
      {task?.id && <input type="hidden" name="id" value={task.id} />}

      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={task?.title}
          placeholder="Enter task title..."
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={task?.description}
          placeholder="Optional description..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select name="status" defaultValue={task?.status || "todo"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Priority</Label>
          <Select name="priority" defaultValue={task?.priority || "medium"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <SubmitButton loadingText={task?.id ? "Saving..." : "Creating..."}>
          {task?.id ? "Save changes" : "Create task"}
        </SubmitButton>
        <Button variant="outline" type="button" asChild>
          <Link href="/tasks">Cancel</Link>
        </Button>
      </div>
    </form>
  )
}
