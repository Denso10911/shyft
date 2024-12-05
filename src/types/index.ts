import { ShiftType, UserRoles, UserStatus } from "@/types/enums"

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
  breakPaid: string
  breakUnpaid: string
  specialCode: string
  isShiftCompensated: boolean
  currency: number
  salary: string
  exceedsMaxHours: boolean
  status?: UserStatus
  shiftType: ShiftType
}
