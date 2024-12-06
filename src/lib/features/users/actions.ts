import { createAsyncThunk } from "@reduxjs/toolkit"
import { mockUsersData } from "@/utiles/dummyContents"
import { userInterface } from "@/types"

export const getUsersAction = createAsyncThunk<userInterface[], void, { rejectValue: string }>(
  "users/getShiftsAction",
  async (_, { rejectWithValue }) => {
    try {
      return mockUsersData
    } catch {
      return rejectWithValue("Server Error!")
    }
  }
)
