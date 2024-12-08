import React from "react"

import CalendarRow from "@/components/CalendarRow"

import { fullUserInfoInterface, shiftInterface } from "@/types"
import { DateNumberT } from "@/types/calendar"
import { emptyUserData } from "@/utiles/dummyContents"

type Props = {
  calendar: DateNumberT[]
  unassignedShifts: shiftInterface[]
  usersListWithShifts: fullUserInfoInterface[]
  setIsModalOpen: (value: boolean) => void
}

const CalendarBody: React.FC<Props> = ({
  calendar,
  unassignedShifts,
  usersListWithShifts,
  setIsModalOpen,
}) => {
  return (
    <>
      {unassignedShifts.length > 0 && (
        <CalendarRow
          key="empty row"
          user={{
            ...emptyUserData,
            shifts: unassignedShifts,
          }}
          isUnassigned
          calendar={calendar}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {usersListWithShifts.map(user => (
        <CalendarRow
          key={user.id}
          user={user}
          calendar={calendar}
          setIsModalOpen={setIsModalOpen}
        />
      ))}
    </>
  )
}

export default CalendarBody
