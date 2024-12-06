import { configureStore } from "@reduxjs/toolkit"
import { shiftsSlice } from "@/lib/features/shifts/slice"
import { usersSlice } from "@/lib/features/users/slice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      shifts: shiftsSlice.reducer,
      users: usersSlice.reducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
