"use client"
import type * as React from "react"
import { ToastContainer } from "react-toastify"
import { QueryClientProvider } from "@tanstack/react-query"

import { getQueryClient } from "@/app/get-query-client"

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  )
}
