"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

export default function SubmitButton({ children, loadingText = "Processing..." }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? loadingText : children}
    </Button>
  )
}
