import { getUsers } from "../services/userService"
import { CreateForm, UserList } from "./UserForm"

export default function UsersPage() {
  const users = getUsers()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your users below</p>
        </div>
        <CreateForm />
        <UserList users={users} />
      </div>
    </div>
  )
}
