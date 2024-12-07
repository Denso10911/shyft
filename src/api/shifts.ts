import { queryOptions } from "@tanstack/react-query"

import { BASE_URL } from "@/api/index"
import { updateShiftPayloadType } from "@/api/types"
import { mockShiftData } from "@/utiles/dummyContents"

export const shiftsApi = {
  getShifts: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      return mockShiftData
    }
    const response = await fetch(`${BASE_URL}/shifts`)
    return response.json()
  },

  updateShiftOwnerById: async (payload: updateShiftPayloadType) => {
    const response = await fetch(`${BASE_URL}/shifts/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.shift),
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return response.json()
  },
}

export const getShiftsOptions = () =>
  queryOptions({
    queryKey: ["shifts"],
    queryFn: async () => {
      return await shiftsApi.getShifts()
    },
  })
