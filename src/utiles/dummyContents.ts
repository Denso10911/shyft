import { fullUserInfoInterface, shiftInterface, userInterface } from "@/types"
import avatar1 from "../../public/avatars/avatar1.png"
import avatar2 from "../../public/avatars/avatar2.png"
import avatar3 from "../../public/avatars/avatar3.png"

export const mockShiftData: shiftInterface[] = [
  {
    id: 1,
    userId: 1,
    competencies: [],
    attributes: [],
    date: "2024-12-04",
    start: "2024-12-04T07:00:00",
    end: "2024-12-04T15:20:00",
    breakPaid: "0",
    breakUnpaid: "30",
    specialCode: "specialCode",
    isShiftCompensated: true,
    currency: 974,
    salary: "123",
    exceedsMaxHours: true,
    status: 0,
    shiftType: 1,
  },
  {
    id: 2,
    userId: 2,
    competencies: [],
    attributes: [],
    date: "2024-12-04",
    start: "2024-12-04T07:00:00",
    end: "2024-12-04T15:20:00",
    breakPaid: "0",
    breakUnpaid: "30",
    specialCode: "specialCode",
    isShiftCompensated: true,
    currency: 974,
    salary: "123",
    exceedsMaxHours: true,
    status: 0,
    shiftType: 1,
  },
]

export const mockUsersData: userInterface[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    role: 0,
    hoursWorked: 24,
    profileImage: avatar1,
  },
  {
    id: 2,
    firstName: "Sara",
    lastName: "Root",
    role: 0,
    hoursWorked: 38,
    profileImage: avatar2,
  },
  {
    id: 3,
    firstName: "Lera",
    lastName: "Charlton",
    role: 1,
    hoursWorked: 38,
    profileImage: avatar3,
  },
  {
    id: 4,
    firstName: "Ben",
    lastName: "Doe",
    role: 1,
    hoursWorked: 38,
    profileImage: null,
  },
]

export const mockFullUserData: fullUserInfoInterface[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    role: 0,
    hoursWorked: 24,
    profileImage: avatar1,
    shifts: [mockShiftData[0]],
  },
  {
    id: 2,
    firstName: "Sara",
    lastName: "Root",
    role: 0,
    hoursWorked: 38,
    profileImage: avatar2,
    shifts: [mockShiftData[1]],
  },
  {
    id: 3,
    firstName: "Lera",
    lastName: "Charlton",
    role: 1,
    hoursWorked: 38,
    profileImage: avatar3,
    shifts: [],
  },
  {
    id: 4,
    firstName: "Ben",
    lastName: "Doe",
    role: 1,
    hoursWorked: 38,
    profileImage: null,
    shifts: [],
  },
]
