import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DeleteButton from "@/components/DeleteButton"

const STATUS_LABEL = { todo: "Todo", in_progress: "In Progress", done: "Done" }
const STATUS_VARIANT = { todo: "secondary", in_progress: "default", done: "outline" }
const PRIORITY_LABEL = { low: "Low", medium: "Medium", high: "High" }
const PRIORITY_VARIANT = { low: "outline", medium: "secondary", high: "destructive" }

export default function TaskTable({ tasks, showOwner }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          {showOwner && <TableHead>Owner</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium max-w-64 truncate">
              {task.title}
            </TableCell>
            {showOwner && (
              <TableCell className="text-muted-foreground text-sm">
                {task.user_name}
              </TableCell>
            )}
            <TableCell>
              <Badge variant={STATUS_VARIANT[task.status]}>
                {STATUS_LABEL[task.status]}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={PRIORITY_VARIANT[task.priority]}>
                {PRIORITY_LABEL[task.priority]}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(task.updated_at).toLocaleDateString("en-US")}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/tasks/${task.id}`}>Edit</Link>
                </Button>
                <DeleteButton taskId={task.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
