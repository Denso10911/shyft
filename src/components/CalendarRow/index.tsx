import React from "react"
import cn from "classnames"
import dayjs from "dayjs"

import AbsenceCard from "@/components/AbsenceCard"
import Draggable from "@/components/Draggable"
import Droppable from "@/components/Droppable"
import ShiftCard from "@/components/ShiftCard"
import UserCard from "@/components/UserCard"

import { fullUserInfoInterface } from "@/types"
import { DateNumberT } from "@/types/calendar"
import { ShiftVariant } from "@/types/enums"

type Props = {
  user: fullUserInfoInterface
  calendar: DateNumberT[]
  handleRightClick: (e: React.MouseEvent, id: string) => void
  isUnassigned?: boolean
}

const CalendarRow: React.FC<Props> = ({
  user: { shifts, ...userInfo },
  calendar,
  handleRightClick,
  isUnassigned,
}) => {
  return (
    <div className="grid min-h-[130px] min-w-[240px] shrink-0 grid-cols-[220px_repeat(7,_1fr)]">
      <div
        className={cn(
          "sticky left-0 z-20 flex shrink-0 items-center border-b border-r bg-[#f9f9f9] px-5"
        )}
      >
        {!isUnassigned && <UserCard data={userInfo} />}
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
            className={"flex min-w-[240px] flex-col gap-2 border-b border-r p-4"}
          >
            {userShifts.map(shift => {
              if (shift.status !== ShiftVariant.SHIFT) {
                return (
                  <Draggable id={`${userInfo.id}/${shift.id}`} key={`${userInfo.id}/${shift.id}`}>
                    <AbsenceCard
                      data={shift}
                      onContextMenu={handleRightClick}
                      salary={userInfo.salary}
                      currency={userInfo.currency}
                    />
                  </Draggable>
                )
              }
              return (
                <Draggable id={`${userInfo.id}/${shift.id}`} key={`${userInfo.id}/${shift.id}`}>
                  <ShiftCard
                    data={shift}
                    onContextMenu={handleRightClick}
                    salary={userInfo.salary}
                    currency={userInfo.currency}
                  />
                </Draggable>
              )
            })}
          </Droppable>
        )
      })}
    </div>
  )
}

export default CalendarRow