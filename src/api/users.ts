import { BASE_URL } from "@/api/index"
import { queryOptions } from "@tanstack/react-query"

export const usersApi = {
  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/users`)
    return response.json()
  },
}

export const getUsersOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      return await usersApi.getUsers()
    },
  })
