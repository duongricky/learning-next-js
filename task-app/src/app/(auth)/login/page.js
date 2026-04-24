"use client"

import { useActionState } from "react"
import Link from "next/link"
import { loginAction } from "@/actions/authAction"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SubmitButton from "@/components/SubmitButton"

export default function LoginPage() {
  const [state, action] = useActionState(loginAction, null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Default admin: admin@example.com / admin123
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <SubmitButton loadingText="Signing in...">Sign in</SubmitButton>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
