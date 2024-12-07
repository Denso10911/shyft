import Calendar from "@/components/Calendar"
import { getQueryClient } from "@/app/get-query-client"
import { getUsersOptions } from "@/api/users"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getShiftsOptions } from "@/api/shifts"

export default function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(getUsersOptions())
  void queryClient.prefetchQuery(getShiftsOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-[#f2f3f9] p-4 font-[family-name:var(--font-geist-sans)] accent-neutral-400">
        <Calendar />
      </div>
    </HydrationBoundary>
  )
}
