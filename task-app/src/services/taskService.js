import * as taskRepo from "@/repositories/taskRepository"
import { cacheTag, cacheLife } from "next/cache"

function guardOwnership(task, session) {
  if (!task) throw new Error("Task not found")
  if (session.role !== "admin" && task.user_id !== session.userId) {
    throw new Error("Access denied")
  }
}

async function getCachedTaskList(userId, role, filters) {
  "use cache"
  cacheTag("tasks")
  cacheLife("hours")
  return taskRepo.list({ ...filters, userId, role })
}

async function getCachedTaskById(id) {
  "use cache"
  cacheTag(`task-${id}`)
  cacheLife("hours")
  return taskRepo.findById(id)
}

export async function getTasks(session, filters) {
  return getCachedTaskList(session.userId, session.role, filters)
}

export async function getTask(session, id) {
  const task = await getCachedTaskById(Number(id))
  guardOwnership(task, session)
  return task
}

export function createTask(session, { title, description, status, priority }) {
  if (!title?.trim()) throw new Error("Title is required")
  return taskRepo.create({
    title: title.trim(),
    description: description?.trim() || null,
    status: status || "todo",
    priority: priority || "medium",
    userId: session.userId,
  })
}

export function updateTask(session, id, { title, description, status, priority }) {
  const task = taskRepo.findById(Number(id))
  guardOwnership(task, session)
  if (!title?.trim()) throw new Error("Title is required")
  return taskRepo.update(Number(id), {
    title: title.trim(),
    description: description?.trim() || null,
    status,
    priority,
  })
}

export function deleteTask(session, id) {
  const task = taskRepo.findById(Number(id))
  guardOwnership(task, session)
  return taskRepo.remove(Number(id))
}
