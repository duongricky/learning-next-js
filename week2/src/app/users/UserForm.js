"use client"

import { useActionState, useState } from "react"
import { createUserAction, editUserAction, deleteUserAction } from "../actions/userAction"

function FormFields({ state, defaultValues = {} }) {
  return (
    <>
      {defaultValues.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      {state?.success && (
        <p className="px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm">{state.success}</p>
      )}

      {["name", "email", "phone"].map((field) => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            name={field}
            type={field === "email" ? "email" : "text"}
            defaultValue={defaultValues[field]}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
          />
          {state?.errors?.[field] && (
            <p className="text-red-500 text-xs">{state.errors[field][0]}</p>
          )}
        </div>
      ))}
    </>
  )
}

export function CreateForm() {
  const [state, action, isPending] = useActionState(createUserAction, null)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Create User</h2>
      <form action={action} className="flex flex-col gap-3">
        <FormFields state={state} />
        <button
          type="submit"
          disabled={isPending}
          className="mt-1 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  )
}

function UserAvatar({ name }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
  return (
    <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold shrink-0">
      {initials}
    </div>
  )
}

export function UserList({ users }) {
  const [editingUser, setEditingUser] = useState(null)
  const [editState, editAction, isEditPending] = useActionState(editUserAction, null)
  const [_, deleteAction, isDeletePending] = useActionState(deleteUserAction, null)

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">
          Users
          <span className="ml-2 text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {users.length}
          </span>
        </h2>
      </div>

      {users.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-gray-400">
          No users yet. Create one above.
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {users.map((user) => (
            <li key={user.id} className="px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <UserAvatar name={user.name} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email} · {user.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditingUser(editingUser?.id === user.id ? null : user)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                  >
                    {editingUser?.id === user.id ? "Cancel" : "Edit"}
                  </button>
                  <form action={deleteAction}>
                    <input type="hidden" name="id" value={user.id} />
                    <button
                      type="submit"
                      disabled={isDeletePending}
                      className="px-3 py-1.5 border border-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 disabled:opacity-50 transition-colors"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>

              {editingUser?.id === user.id && (
                <form action={editAction} className="mt-4 flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <FormFields state={editState} defaultValues={editingUser} />
                  <button
                    type="submit"
                    disabled={isEditPending}
                    className="bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    {isEditPending ? "Saving..." : "Update"}
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
