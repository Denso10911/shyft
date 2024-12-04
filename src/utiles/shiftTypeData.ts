import { ShiftType } from "@/types/enums"

export const shiftTypeColors = {
  [ShiftType.CASH_REGISTER]: "GREEN",
  [ShiftType.CLOSURE]: "RED",
  [ShiftType.TRUCK]: "BLUE",
  [ShiftType.OPENING]: "BLUE",
  [ShiftType.VACATION]: "TRANSPARENT",
  [ShiftType.RESTORATION]: "TRANSPARENT",
  [ShiftType.SICK_LEAVE]: "TRANSPARENT",
}
