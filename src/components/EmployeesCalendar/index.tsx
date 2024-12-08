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
import CalendarBody from "@/components/CalendarBody"
import CalendarHeader from "@/components/CalendarHeader"

import { getShiftsOptions, shiftsApi } from "@/api/shifts"
import { updateShiftPayloadType } from "@/api/types"
import { getUsersOptions } from "@/api/users"
import useCalendarShiftSensors from "@/hooks/useCalendarShiftSensors"
import { fullUserInfoInterface, shiftInterface, userInterface } from "@/types"
import { DateNumberT } from "@/types/calendar"
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
                shifts: [...user.shifts, { ...newShift, userId: overUserId, date: overDate }],
              }
            }
          }
          return user
        })
      })
    } else {
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
  }

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
      <div className={cn("max-h-[calc(100vh-110px)] overflow-auto bg-color-white")}>
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToFirstScrollableAncestor, restrictToWindowEdges]}
        >
          <CalendarHeader calendar={calendar} setIsModalOpen={setIsModalOpen} />

          <CalendarBody
            calendar={calendar}
            unassignedShifts={unassignedShifts}
            usersListWithShifts={usersListWithShifts}
            setIsModalOpen={setIsModalOpen}
          />
        </DndContext>
      </div>

      <AsideModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}
export default EmployeesCalendar
