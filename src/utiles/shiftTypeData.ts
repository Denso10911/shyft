import { ColorsEnum, ShiftType } from "@/types/enums"

export const shiftTypeColors: Record<ShiftType, ColorsEnum> = {
  [ShiftType.CASH_REGISTER]: ColorsEnum.GREEN,
  [ShiftType.CLOSURE]: ColorsEnum.RED,
  [ShiftType.TRUCK]: ColorsEnum.BLUE,
  [ShiftType.OPENING]: ColorsEnum.YELLOW,
  [ShiftType.VACATION]: ColorsEnum.TRANSPARENT,
  [ShiftType.RESTORATION]: ColorsEnum.TRANSPARENT,
  [ShiftType.SICK_LEAVE]: ColorsEnum.TRANSPARENT,
}

export const shiftTypeLabels: Record<ShiftType, string> = {
  [ShiftType.CASH_REGISTER]: "cashRegister",
  [ShiftType.CLOSURE]: "closure",
  [ShiftType.TRUCK]: "truck",
  [ShiftType.OPENING]: "opening",
  [ShiftType.VACATION]: "vacation",
  [ShiftType.RESTORATION]: "restoration",
  [ShiftType.SICK_LEAVE]: "sickLeave",
}
