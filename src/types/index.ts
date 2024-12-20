import { StaticImageData } from "next/image"

import { ShiftType, ShiftVariant, UserRoles } from "@/types/enums"

export interface userInterface {
  id: string
  firstName: string
  lastName: string
  role: UserRoles
  hoursWorked: number
  profileImage: string | StaticImageData | null
  currency: number
  salary: string
}

export interface shiftInterface {
  id: string
  userId: string
  competencies: string[]
  attributes: string[]
  date: string
  start: string
  end: string
  breakPaid: number | null
  breakUnpaid: number | null
  specialCode: string | null
  isShiftCompensated: boolean
  shiftType: ShiftType | null
  shiftVariant: ShiftVariant
  shiftLength: number | null
}

export interface fullUserInfoInterface extends userInterface {
  shifts: shiftInterface[]
}
