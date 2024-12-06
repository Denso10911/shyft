import { createSlice } from "@reduxjs/toolkit"
import { getShiftsAction } from "@/lib/features/shifts/actions"
import { fullUserInfoInterface } from "@/types"

interface InitialState {
  shifts: fullUserInfoInterface[]
  isLoading: boolean
}

const initialState: InitialState = {
  shifts: [],
  isLoading: false,
}

export const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getShiftsAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getShiftsAction.fulfilled, (state, action) => {
        state.shifts = action.payload
        state.isLoading = false
      })
      .addCase(getShiftsAction.rejected, state => {
        state.shifts = []
        state.isLoading = false
      })
  },
})

export default shiftsSlice.reducer
