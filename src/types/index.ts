import { ShiftType, ShiftVariant, UserRoles } from "@/types/enums"

export interface userInterface {
  id: number
  firstName: string
  lastName: string
  role: UserRoles
  hoursWorked: string
  profileImage?: string
}

export interface shiftInterface {
  id: number
  user: userInterface
  competencies: string[]
  attributes: string[]
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
