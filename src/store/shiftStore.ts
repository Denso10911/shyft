import { create } from "zustand"

import { shiftInterface } from "@/types"
import { ShiftModalTypes } from "@/types/enums"

type ShiftStore = {
  selectedShift: shiftInterface | null
  selectedDate: string | null
  selectedUser: string | null
  shiftModalType: ShiftModalTypes

  setSelectedShift: (shift: shiftInterface) => void
  setSelectedDate: (date: string) => void
  setSelectedUser: (user: string) => void
  setShiftModalType: (type: ShiftModalTypes) => void

  cleanSelectedShift: () => void
  cleanSelectedDate: () => void
  cleanSelectedUser: () => void
}

export const useShiftStore = create<ShiftStore>(set => ({
  selectedShift: null,
  selectedDate: null,
  selectedUser: null,
  shiftModalType: ShiftModalTypes.CREATE,

  setSelectedShift: (shift: shiftInterface) => set({ selectedShift: shift }),
  setSelectedDate: (date: string) => set({ selectedDate: date }),
  setSelectedUser: (user: string) => set({ selectedUser: user }),
  setShiftModalType: (type: ShiftModalTypes) => set({ shiftModalType: type }),

  cleanSelectedShift: () => set({ selectedShift: null }),
  cleanSelectedDate: () => set({ selectedDate: null }),
  cleanSelectedUser: () => set({ selectedUser: null }),
}))
