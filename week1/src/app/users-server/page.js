export default async function UsersServer() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await res.json()

  return (
    <div>
      <h1>Users (Server)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
