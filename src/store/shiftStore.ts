import { create } from "zustand"

import { shiftInterface } from "@/types"
import { ShiftModalTypes } from "@/types/enums"

type ShiftStore = {
  selectedShift: shiftInterface | null
  selectedDate: string | null
  shiftModalType: ShiftModalTypes

  setSelectedShift: (shift: shiftInterface) => void
  setSelectedDate: (date: string) => void

  cleanSelectedShift: () => void
  cleanSelectedDate: () => void
}

export const useShiftStore = create<ShiftStore>(set => ({
  selectedShift: null,
  selectedDate: null,
  shiftModalType: ShiftModalTypes.CREATE,

  setSelectedShift: (shift: shiftInterface) => set({ selectedShift: shift }),
  setSelectedDate: (date: string) => set({ selectedDate: date }),

  cleanSelectedShift: () => set({ selectedShift: null }),
  cleanSelectedDate: () => set({ selectedDate: null }),
}))
