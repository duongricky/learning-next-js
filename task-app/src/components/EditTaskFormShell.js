import { notFound } from "next/navigation"
import { requireSession } from "@/lib/session"
import { getTask } from "@/services/taskService"
import { updateTaskAction } from "@/actions/taskAction"
import TaskForm from "@/components/TaskForm"

export default async function EditTaskFormShell({ params }) {
  const session = await requireSession()
  const { id } = await params

  let task
  try {
    task = await getTask(session, id)
  } catch {
    notFound()
  }

  return <TaskForm action={updateTaskAction} task={task} />
}
