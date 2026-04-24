"use client"

import { useActionState, useState } from "react"
import { deleteTaskAction } from "@/actions/taskAction"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DeleteButton({ taskId }) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(deleteTaskAction, null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete task</DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <form action={action}>
            <input type="hidden" name="id" value={taskId} />
            <Button variant="destructive" type="submit" disabled={pending}>
              {pending ? "Deleting..." : "Delete"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
