"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerAction } from "@/actions/authAction"
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

export default function RegisterPage() {
  const [state, action] = useActionState(registerAction, null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Sign up for a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" name="confirm" type="password" required />
          </div>
          <SubmitButton loadingText="Creating account...">Create account</SubmitButton>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
