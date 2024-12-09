import React from "react"

import CalendarRow from "@/components/CalendarRow"

import { fullUserInfoInterface, shiftInterface } from "@/types"
import { emptyUserData } from "@/utiles/dummyContents"

type Props = {
  unassignedShifts: shiftInterface[]
  usersListWithShifts: fullUserInfoInterface[]
  setIsModalOpen: (value: boolean) => void
}

const CalendarBody: React.FC<Props> = ({
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
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {usersListWithShifts.map(user => (
        <CalendarRow key={user.id} user={user} setIsModalOpen={setIsModalOpen} />
      ))}
    </>
  )
}

export default CalendarBody
