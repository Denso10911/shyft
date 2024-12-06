import React, { useState } from "react"
import cn from "classnames"
import { DateNumberT } from "@/types/calendar"
import { mockUsersData } from "@/utiles/dummyContents"
import UserCard from "@/components/UserCard"
import dayjs from "dayjs"
import { ShiftVariant } from "@/types/enums"
import AbsenceCard from "@/components/AbsenceCard"
import ShiftCard from "@/components/ShiftCard"
import Droppable from "@/components/Droppable"
import Draggable from "@/components/Draggable"
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import weekday from "dayjs/plugin/weekday"
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"
dayjs.extend(weekday)

interface Props {
  calendar: DateNumberT[]
}

const EmployeesCalendar: React.FC<Props> = ({ calendar }) => {
  const [users, setUsers] = useState(mockUsersData)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    const activeElementId = active.id as string
    const overElementId = over?.id as string

    if (!activeElementId || !overElementId) return

    const [activeUserId, activeShiftId] = activeElementId.split("/")
    const [overUserId, overDate] = overElementId.split("/")

    const activeUserIdNum = parseInt(activeUserId, 10)
    const activeShiftIdNum = parseInt(activeShiftId, 10)
    const overUserIdNum = parseInt(overUserId, 10)

    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === activeUserIdNum) {
          // If the same user then update shifts
          const updatedShifts = user.shifts.map(shift => {
            if (shift.id === activeShiftIdNum) {
              //  update the shift date if it is moved
              return {
                ...shift,
                date: overDate,
              }
            }
            return shift
          })

          // check if the shift was reassigned
          if (overUserIdNum === activeUserIdNum) {
            return {
              ...user,
              shifts: updatedShifts,
            }
          }

          // remove shift if we reassigned it
          return {
            ...user,
            shifts: user.shifts.filter(shift => shift.id !== activeShiftIdNum),
          }
        }

        // if this is the user receiving the shift
        if (user.id === overUserIdNum) {
          const activeUser = prevUsers.find(u => u.id === activeUserIdNum)
          const movedShift = activeUser?.shifts.find(shift => shift.id === activeShiftIdNum)

          if (movedShift) {
            return {
              ...user,
              shifts: [
                ...user.shifts,
                {
                  ...movedShift,
                  date: overDate,
                },
              ],
            }
          }
        }

        return user
      })
    })
  }

  return (
    <div
      data-component="EmployeesCalendar"
      className={cn("relative max-h-[calc(100vh-110px)] overflow-auto rounded-md bg-color-white")}
    >
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToFirstScrollableAncestor, restrictToWindowEdges]}
      >
        <div className="relative grid grid-cols-[220px_repeat(7,_1fr)]">
          <div
            className={cn(
              "sticky left-0 z-20 flex items-center justify-center border-b border-r border-color-light-blue bg-[#f9f9f9] py-4 "
            )}
          >
            <div className="sticky left-0 w-full px-4">Search</div>
          </div>
          {calendar.length > 0 &&
            calendar.map((el, i) => {
              const calendarDate = `${el.year}-${el.month}-${el.day}`
              const dayOfWeek = dayjs(calendarDate).format("ddd")
              const isToday = dayjs(calendarDate).isSame(dayjs(), "day") // Check if the date is today

              return (
                <div
                  className={cn(
                    "flex min-w-[240px] shrink-0 cursor-pointer flex-col items-center justify-center border-b border-r border-color-light-blue ",
                    isToday ? "bg-[#e3e6f1]" : "bg-[#f9f9f9]"
                  )}
                  key={i}
                >
                  <div className="font-bold capitalize">{`${dayOfWeek.replace(".", "")} ${el.day}`}</div>
                </div>
              )
            })}
        </div>

        {users.map(user => (
          <div
            key={user.id}
            className="grid min-h-[130px] min-w-[240px] shrink-0 grid-cols-[220px_repeat(7,_1fr)]"
          >
            <div
              className={cn(
                "border-color-border-gray_dark sticky left-0 z-20 flex shrink-0 items-center border-b border-r bg-[#f9f9f9] px-5"
              )}
            >
              <UserCard data={user} />
            </div>
            {calendar.map(date => {
              const calendarDate = `${date.year}-${date.month}-${date.day}`
              const userShifts = user.shifts.filter(
                shift => dayjs(shift.date).format("YYYY-MM-DD") === calendarDate
              )

              return (
                <Droppable
                  key={`${user.id}/${calendarDate}`}
                  id={`${user.id}/${calendarDate}`}
                  className={"flex min-w-[240px] flex-col gap-2 border-b border-r p-4"}
                >
                  {userShifts.map(shift => {
                    if (shift.status !== ShiftVariant.SHIFT) {
                      return (
                        <Draggable id={`${user.id}/${shift.id}`} key={`${user.id}/${shift.id}`}>
                          <AbsenceCard key={shift.id} data={shift} />
                        </Draggable>
                      )
                    }
                    return (
                      <Draggable id={`${user.id}/${shift.id}`} key={`${user.id}/${shift.id}`}>
                        <ShiftCard data={shift} />
                      </Draggable>
                    )
                  })}
                </Droppable>
              )
            })}
          </div>
        ))}
      </DndContext>
    </div>
  )
}
export default EmployeesCalendar
