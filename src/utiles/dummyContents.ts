import avatar1 from "../../public/avatars/avatar1.png"
import avatar2 from "../../public/avatars/avatar2.png"
import avatar3 from "../../public/avatars/avatar3.png"

import { shiftInterface, userInterface } from "@/types"
import { ShiftTimingOptions, ShiftType, UserRoles } from "@/types/enums"

export const mockShiftData: shiftInterface[] = [
  {
    id: "1",
    userId: "1",
    competencies: [],
    attributes: [],
    date: "2024-12-09",
    start: "07:00",
    end: "15:20",
    breakPaid: 0,
    breakUnpaid: 30,
    specialCode: "specialCode",
    isShiftCompensated: true,
    shiftVariant: 0,
    shiftType: 1,
    shiftLength: 0,
  },
  {
    id: "2",
    userId: "2",
    competencies: [],
    attributes: [],
    date: "2024-12-09",
    start: "07:00",
    end: "15:20",
    breakPaid: 0,
    breakUnpaid: 30,
    specialCode: "specialCode",
    isShiftCompensated: true,
    shiftVariant: 0,
    shiftType: 1,
    shiftLength: 0,
  },
]

export const shiftTypeOptions = [
  { value: ShiftType.CASH_REGISTER, label: "Cash register" },
  { value: ShiftType.CLOSURE, label: "Closure" },
  { value: ShiftType.TRUCK, label: "Truck" },
  { value: ShiftType.OPENING, label: "Opening" },
]

export const absenceTypeOptions = [
  { value: ShiftType.VACATION, label: "Vacation" },
  { value: ShiftType.RESTORATION, label: "Restoration" },
  { value: ShiftType.SICK_LEAVE, label: "Sick leave" },
]

export const competenciesOptions = [
  { value: "Competency 1", label: "Competency 1" },
  { value: "Competency 2", label: "Competency 2" },
  { value: "Competency 3", label: "Competency 3" },
  { value: "Competency 4", label: "Competency 4" },
  { value: "Competency 5", label: "Competency 5" },
  { value: "Competency 6", label: "Competency 6" },
  { value: "Competency 7", label: "Competency 7" },
]

export const attributesOptions = [
  { value: "Attribute 1", label: "Attribute 1" },
  { value: "Attribute 2", label: "Attribute 2" },
  { value: "Attribute 3", label: "Attribute 3" },
  { value: "Attribute 4", label: "Attribute 4" },
  { value: "Attribute 5", label: "Attribute 5" },
  { value: "Attribute 6", label: "Attribute 6" },
  { value: "Attribute 7", label: "Attribute 7" },
]

type startTimeOptionsType = {
  value: ShiftTimingOptions
  label: string
  start: string
  end: string
}

export const shiftTimingOptions: startTimeOptionsType[] = [
  { value: ShiftTimingOptions.MORNING_SHIFT, label: "Morning shift", start: "06:00", end: "14:00" },
  { value: ShiftTimingOptions.DAY_SHIFT, label: "Day shift", start: "11:00", end: "19:00" },
  { value: ShiftTimingOptions.EVENING_SHIFT, label: "Evening shift", start: "14:00", end: "22:00" },
]

export const specialCodeOptions = [
  { value: "Code 1", label: "Code 1" },
  { value: "Code 2", label: "Code 2" },
  { value: "Code 3", label: "Code 3" },
  { value: "Code 4", label: "Code 4" },
  { value: "Code 5", label: "Code 5" },
  { value: "Code 6", label: "Code 6" },
  { value: "Code 7", label: "Code 7" },
]

export const mockUsersData: userInterface[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Smith",
    role: UserRoles.EMPLOYEE,
    hoursWorked: 90,
    profileImage: null,
    currency: 974,
    salary: "123",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Johnson",
    role: UserRoles.STUDENT,
    hoursWorked: 20,
    profileImage: avatar1,
    currency: 974,
    salary: "123",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Williams",
    role: UserRoles.EMPLOYEE,
    hoursWorked: 35,
    profileImage: avatar3,
    currency: 974,
    salary: "123",
  },
  {
    id: "4",
    firstName: "Diana",
    lastName: "Brown",
    role: UserRoles.STUDENT,
    hoursWorked: 60,
    profileImage: avatar2,
    currency: 974,
    salary: "123",
  },
]

export const mockUserOptions = mockUsersData.map(user => ({
  value: user.id,
  label: `${user.firstName} ${user.lastName}`,
  hoursWorked: user.hoursWorked,
}))

export const emptyUserData = {
  id: "-1",
  firstName: "",
  lastName: "",
  role: 0,
  hoursWorked: 0,
  profileImage: null,
  currency: 0,
  salary: "",
}
