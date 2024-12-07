import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { restrictToFirstScrollableAncestor, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import cn from "classnames"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { useTranslations } from "next-intl"

import AbsenceCard from "@/components/AbsenceCard"
import ContextMenuContainer from "@/components/ContextMenuContainer"
import Draggable from "@/components/Draggable"
import Droppable from "@/components/Droppable"
import ShiftCard from "@/components/ShiftCard"
import ShiftContextMenu from "@/components/ShiftContextMenu"
import UserCard from "@/components/UserCard"

import { getShiftsOptions, shiftsApi } from "@/api/shifts"
import { updateShiftPayloadType } from "@/api/types"
import { getUsersOptions } from "@/api/users"
import useCalendarShiftContextMenu from "@/hooks/useCalendarShiftContextMenu"
import useCalendarShiftSensors from "@/hooks/useCalendarShiftSensors"
import { fullUserInfoInterface, shiftInterface, userInterface } from "@/types"
import { DateNumberT } from "@/types/calendar"
import { ShiftVariant } from "@/types/enums"
dayjs.extend(weekday)

interface Props {
  calendar: DateNumberT[]
}

const EmployeesCalendar: React.FC<Props> = ({ calendar }) => {
  const t = useTranslations("EmployeesCalendar")
  const queryClient = useQueryClient()

  const [usersListWithShifts, setUsersListWithShifts] = useState<fullUserInfoInterface[]>([])

  const { data: usersList } = useSuspenseQuery<userInterface[]>(getUsersOptions())
  const { data: shiftsList } = useSuspenseQuery<shiftInterface[]>(getShiftsOptions())

  const mutation = useMutation({
    mutationFn: (payload: updateShiftPayloadType) => shiftsApi.updateShiftOwnerById(payload),

    onError: () => {
      toast.error(t("mutationError"))
      void queryClient.invalidateQueries({ queryKey: ["shifts"] })
    },
  })

  const sensors = useCalendarShiftSensors()
  const { contextMenu, handleRightClick, handleCloseContextMenu } = useCalendarShiftContextMenu()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeElementId = active.id as string
    const overElementId = over?.id as string

    if (!activeElementId || !overElementId) return

    const [activeUserId, activeShiftId] = activeElementId.split("/")
    const [overUserId, overDate] = overElementId.split("/")

    const payload = {
      id: activeShiftId,
      shift: {
        date: overDate,
        userId: overUserId,
      },
    }

    if (process.env.NEXT_PUBLIC_USE_MOCK !== "true") {
      mutation.mutate(payload)
    }

    setUsersListWithShifts(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === activeUserId) {
          // If the same user then update shifts
          const updatedShifts = user.shifts.map(shift => {
            if (shift.id === activeShiftId) {
              //  update the shift date if it is moved
              return {
                ...shift,
                date: overDate,
              }
            }
            return shift
          })

          // check if the shift was reassigned
          if (overUserId === activeUserId) {
            return {
              ...user,
              shifts: updatedShifts,
            }
          }

          // remove shift if we reassigned it
          return {
            ...user,
            shifts: user.shifts.filter(shift => shift.id !== activeShiftId),
          }
        }

        // if this is the user receiving the shift
        if (user.id === overUserId) {
          const activeUser = prevUsers.find(u => u.id === activeUserId)
          const movedShift = activeUser?.shifts.find(shift => shift.id === activeShiftId)

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

  useEffect(() => {
    const usersWithShifts = usersList.map(user => {
      return {
        ...user,
        shifts: shiftsList.filter(shift => shift.userId === user.id),
      }
    })
    setUsersListWithShifts(usersWithShifts)
  }, [shiftsList])

  return (
    <>
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

          {usersListWithShifts.map(user => (
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
                            <AbsenceCard
                              data={shift}
                              onContextMenu={handleRightClick}
                              salary={user.salary}
                              currency={user.currency}
                            />
                          </Draggable>
                        )
                      }
                      return (
                        <Draggable id={`${user.id}/${shift.id}`} key={`${user.id}/${shift.id}`}>
                          <ShiftCard
                            data={shift}
                            onContextMenu={handleRightClick}
                            salary={user.salary}
                            currency={user.currency}
                          />
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
      {contextMenu.visible && (
        <ContextMenuContainer
          top={contextMenu.y}
          left={contextMenu.x}
          handleClose={handleCloseContextMenu}
        >
          <ShiftContextMenu />
        </ContextMenuContainer>
      )}
    </>
  )
}
export default EmployeesCalendar
