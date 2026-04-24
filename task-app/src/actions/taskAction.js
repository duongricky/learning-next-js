"use server"

import { requireSession } from "@/lib/session"
import { createTask, updateTask, deleteTask } from "@/services/taskService"
import { updateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function createTaskAction(prevState, formData) {
  const session = await requireSession()
  try {
    createTask(session, {
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      priority: formData.get("priority"),
    })
  } catch (e) {
    return { success: false, error: e.message }
  }
  updateTag("tasks")
  redirect("/tasks")
}

export async function updateTaskAction(prevState, formData) {
  const session = await requireSession()
  const id = formData.get("id")
  try {
    updateTask(session, id, {
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      priority: formData.get("priority"),
    })
  } catch (e) {
    return { success: false, error: e.message }
  }
  updateTag("tasks")
  updateTag(`task-${id}`)
  redirect("/tasks")
}

export async function deleteTaskAction(prevState, formData) {
  const session = await requireSession()
  const id = formData.get("id")
  try {
    deleteTask(session, id)
  } catch (e) {
    return { success: false, error: e.message }
  }
  updateTag("tasks")
  updateTag(`task-${id}`)
  redirect("/tasks")
}
