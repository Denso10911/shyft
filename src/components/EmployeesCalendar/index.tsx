import React, { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { restrictToFirstScrollableAncestor, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import cn from "classnames"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { useTranslations } from "next-intl"

import AsideModal from "@/components/AsideModal"
import CalendarRow from "@/components/CalendarRow"
import ContextMenuContainer from "@/components/ContextMenuContainer"
import ShiftContextMenu from "@/components/ShiftContextMenu"

import { getShiftsOptions, shiftsApi } from "@/api/shifts"
import { updateShiftPayloadType } from "@/api/types"
import { getUsersOptions } from "@/api/users"
import useCalendarShiftContextMenu from "@/hooks/useCalendarShiftContextMenu"
import useCalendarShiftSensors from "@/hooks/useCalendarShiftSensors"
import { useShiftStore } from "@/store/shiftStore"
import { fullUserInfoInterface, shiftInterface, userInterface } from "@/types"
import { DateNumberT } from "@/types/calendar"
import { emptyUserData } from "@/utiles/dummyContents"
dayjs.extend(weekday)

interface Props {
  calendar: DateNumberT[]
}

const EmployeesCalendar: React.FC<Props> = ({ calendar }) => {
  const t = useTranslations("EmployeesCalendar")
  const queryClient = useQueryClient()

  const [usersListWithShifts, setUsersListWithShifts] = useState<fullUserInfoInterface[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [unassignedShifts, setUnassignedShifts] = useState<shiftInterface[]>([])

  const setSelectedDate = useShiftStore(state => state.setSelectedDate)

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

    if (activeUserId === "-1") {
      setUsersListWithShifts(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === overUserId) {
            const newShift = unassignedShifts.find(shift => shift.id === activeShiftId)
            if (newShift) {
              setUnassignedShifts(prevShifts =>
                prevShifts.filter(shift => shift.id !== activeShiftId)
              )
              return {
                ...user,
                shifts: [...user.shifts, newShift],
              }
            }
          }
          return user
        })
      })
    } else {
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
  }

  const handleCreateClick = (date: string) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {}

  useEffect(() => {
    const usersWithShifts = usersList.map(user => {
      return {
        ...user,
        shifts: shiftsList.filter(shift => shift.userId === user.id),
      }
    })

    const unassignedShifts = shiftsList.filter(shift => !shift.userId)

    if (unassignedShifts.length) {
      setUnassignedShifts(unassignedShifts)
    }

    setUsersListWithShifts(usersWithShifts)
  }, [shiftsList])

  return (
    <>
      <div
        data-component="EmployeesCalendar"
        className={cn("relative max-h-[calc(100vh-110px)] overflow-auto bg-color-white")}
      >
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToFirstScrollableAncestor, restrictToWindowEdges]}
        >
          <div className="relative grid grid-cols-[220px_repeat(7,_1fr)]">
            <div
              className={cn(
                "sticky left-0 z-20 flex items-center justify-center border bg-[#f9f9f9] py-4 "
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
                      "d group relative flex min-w-[240px] shrink-0 cursor-pointer flex-col items-center justify-center border-b border-r border-t transition ",
                      isToday ? "bg-[#e3e6f1]" : "bg-[#f9f9f9]"
                    )}
                    key={i}
                    onClick={() => handleCreateClick(calendarDate)}
                  >
                    <div className="absolute right-2 top-2 text-sm text-color-gray opacity-0 transition group-hover:opacity-100">
                      <FaPlus />
                    </div>
                    <div className="font-bold capitalize transition group-hover:scale-105">{`${dayOfWeek.replace(".", "")} ${el.day}`}</div>
                  </div>
                )
              })}
          </div>
          {unassignedShifts.length > 0 && (
            <CalendarRow
              key="empty row"
              user={{
                ...emptyUserData,
                shifts: unassignedShifts,
              }}
              isUnassigned
              calendar={calendar}
              handleRightClick={handleRightClick}
            />
          )}

          {usersListWithShifts.map(user => (
            <CalendarRow
              key={user.id}
              user={user}
              calendar={calendar}
              handleRightClick={handleRightClick}
            />
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

      <AsideModal isOpen={isModalOpen} closeHandler={handleCloseModal} />
    </>
  )
}
export default EmployeesCalendar
