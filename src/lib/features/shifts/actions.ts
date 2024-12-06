import { createAsyncThunk } from "@reduxjs/toolkit"
import { mockFullUserData } from "@/utiles/dummyContents"
import { fullUserInfoInterface } from "@/types"

export const getShiftsAction = createAsyncThunk<
  fullUserInfoInterface[],
  void,
  { rejectValue: string }
>("shifts/getShiftsAction", async (_, { rejectWithValue }) => {
  try {
    return mockFullUserData
  } catch {
    return rejectWithValue("Server Error!")
  }
})
