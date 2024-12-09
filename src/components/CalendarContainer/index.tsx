import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { restrictToFirstScrollableAncestor, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import cn from "classnames"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { useTranslations } from "next-intl"

import AsideModal from "@/components/AsideModal"
import CalendarHeader from "@/components/CalendarHeader"
import CalendarRow from "@/components/CalendarRow"

import { getShiftsOptions, shiftsApi } from "@/api/shifts"
import { updateShiftPayloadType } from "@/api/types"
import { getUsersOptions } from "@/api/users"
import useCalendarShiftSensors from "@/hooks/useCalendarShiftSensors"
import { fullUserInfoInterface, shiftInterface, userInterface } from "@/types"
dayjs.extend(weekday)

const CalendarContainer = () => {
  const t = useTranslations("EmployeesCalendar")
  const queryClient = useQueryClient()

  const [usersListWithShifts, setUsersListWithShifts] = useState<fullUserInfoInterface[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || !active) return

    const activeElementId = `${active.id}`
    const overElementId = `${over.id}`

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
      const draggedShift = prevUsers
        .find(user => user.id === activeUserId)
        ?.shifts.find(shift => shift.id === activeShiftId)

      if (draggedShift) {
        const newShift = {
          ...draggedShift,
          date: overDate,
          userId: overUserId,
        }

        return prevUsers.map(user => {
          if (user.id === activeUserId) {
            user.shifts = user.shifts.filter(shift => shift.id !== activeShiftId)
          }
          if (user.id === overUserId) {
            user.shifts = [...user.shifts, newShift]
          }
          return user
        })
      }

      return prevUsers
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
      <div className={cn("max-h-[calc(100vh-110px)] overflow-auto bg-color-white")}>
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToFirstScrollableAncestor, restrictToWindowEdges]}
        >
          <CalendarHeader setIsModalOpen={setIsModalOpen} />

          {usersListWithShifts.map(user => (
            <CalendarRow key={user.id} user={user} setIsModalOpen={setIsModalOpen} />
          ))}
        </DndContext>
      </div>

      <AsideModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}
export default CalendarContainer
