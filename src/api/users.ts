import { queryOptions } from "@tanstack/react-query"

import { BASE_URL } from "@/api/index"
import { mockUsersData } from "@/utiles/dummyContents"

export const usersApi = {
  getUsers: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      return mockUsersData
    }
    const response = await fetch(`${BASE_URL}/users`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return response.json()
  },
}

export const getUsersOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      return await usersApi.getUsers()
    },
    refetchOnMount: false,
  })
