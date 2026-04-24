import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TaskForm from "@/components/TaskForm"
import { createTaskAction } from "@/actions/taskAction"

export default function NewTaskPage() {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>New task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm action={createTaskAction} />
        </CardContent>
      </Card>
    </div>
  )
}
