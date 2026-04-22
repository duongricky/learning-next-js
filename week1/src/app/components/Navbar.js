import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "16px", padding: "16px", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/users-server">Users (Server)</Link>
      <Link href="/users-client">Users (Client)</Link>
    </nav>
  )
}
