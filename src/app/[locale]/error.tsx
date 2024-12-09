"use client"

import { useEffect } from "react"

import Button from "@/components/Button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <h2 className="text-2xl">Something went wrong!</h2>
      <p className="text-lg text-color-gray">Maybe you forgot to start a json-server</p>
      <Button variant="light" type="button" size="md" width="max" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
