import { ShiftType, ShiftVariant, UserRoles } from "@/types/enums"
import { StaticImageData } from "next/image"

export interface userInterface {
  id: number
  firstName: string
  lastName: string
  role: UserRoles
  hoursWorked: number
  profileImage: string | StaticImageData | null
}

export interface shiftInterface {
  id: number
  userId: number
  competencies: string[]
  attributes: string[]
  date: string
  start: string
  end: string
  breakPaid: string | null
  breakUnpaid: string | null
  specialCode: string
  isShiftCompensated: boolean
  currency: number | null
  salary: string | null
  exceedsMaxHours: boolean
  status: ShiftVariant
  shiftType: ShiftType
}

export interface fullUserInfoInterface extends userInterface {
  shifts: shiftInterface[]
}
