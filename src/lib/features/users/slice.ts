import { createSlice } from "@reduxjs/toolkit"
import { getUsersAction } from "@/lib/features/users/actions"
import { userInterface } from "@/types"

interface InitialState {
  users: userInterface[]
  isLoading: boolean
}

const initialState: InitialState = {
  users: [],
  isLoading: false,
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsersAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(getUsersAction.rejected, state => {
        state.users = []
        state.isLoading = false
      })
  },
})

export default usersSlice.reducer
