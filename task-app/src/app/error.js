"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
