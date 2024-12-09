import React from "react"
import { FaCalendarPlus } from "react-icons/fa"
import cn from "classnames"
import dayjs from "dayjs"

import AbsenceCard from "@/components/AbsenceCard"
import Draggable from "@/components/Draggable"
import Droppable from "@/components/Droppable"
import ShiftCard from "@/components/ShiftCard"
import UserCard from "@/components/UserCard"

import { useCalendarStore } from "@/store/calendarStore"
import { useShiftStore } from "@/store/shiftStore"
import { fullUserInfoInterface } from "@/types"
import { ShiftModalTypes, ShiftVariant } from "@/types/enums"
type Props = {
  user: fullUserInfoInterface
  setIsModalOpen: (value: boolean) => void
}

const CalendarRow: React.FC<Props> = ({ user: { shifts, ...userInfo }, setIsModalOpen }) => {
  const calendar = useCalendarStore(state => state.calendar)
  const { setSelectedDate, setSelectedUser, setShiftModalType } = useShiftStore(state => state)

  const handleAddClick = (calendarDate: string) => {
    setSelectedDate(calendarDate)
    setSelectedUser(userInfo.id)
    setShiftModalType(ShiftModalTypes.CREATE)
    setIsModalOpen(true)
  }

  return (
    <div className="grid min-h-[130px] min-w-[240px] shrink-0 grid-cols-[220px_repeat(7,_1fr)]">
      <div
        className={cn(
          "sticky left-0 z-20 flex shrink-0 items-center border-b border-r bg-[#f9f9f9] px-5"
        )}
      >
        <UserCard
          role={userInfo.role}
          hoursWorked={userInfo.hoursWorked}
          profileImage={userInfo.profileImage}
          lastName={userInfo.lastName}
          firstName={userInfo.firstName}
        />
      </div>
      {calendar.map(date => {
        const calendarDate = `${date.year}-${date.month}-${date.day}`
        const userShifts = shifts.filter(
          shift => dayjs(shift.date).format("YYYY-MM-DD") === calendarDate
        )

        return (
          <Droppable
            key={`${userInfo.id}/${calendarDate}`}
            id={`${userInfo.id}/${calendarDate}`}
            className={"flex min-w-[240px] flex-col gap-2 border-b border-r p-4 transition"}
          >
            {userShifts.map(shift => {
              if (shift.shiftVariant !== ShiftVariant.SHIFT) {
                return (
                  <Draggable id={`${userInfo.id}/${shift.id}`} key={`${userInfo.id}/${shift.id}`}>
                    <AbsenceCard
                      data={shift}
                      salary={userInfo.salary}
                      currency={userInfo.currency}
                      setIsModalOpen={setIsModalOpen}
                    />
                  </Draggable>
                )
              }
              return (
                <Draggable id={`${userInfo.id}/${shift.id}`} key={`${userInfo.id}/${shift.id}`}>
                  <ShiftCard
                    data={shift}
                    salary={userInfo.salary}
                    currency={userInfo.currency}
                    setIsModalOpen={setIsModalOpen}
                  />
                </Draggable>
              )
            })}
            <div
              className={cn(
                "flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-[10px] text-color-gray opacity-0 transition hover:bg-color-light-gray hover:opacity-40"
              )}
              onClick={() => handleAddClick(calendarDate)}
            >
              <FaCalendarPlus />
            </div>
          </Droppable>
        )
      })}
    </div>
  )
}

export default CalendarRow
