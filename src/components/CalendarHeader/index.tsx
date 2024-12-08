import React from "react"
import { FaPlus } from "react-icons/fa"
import cn from "classnames"
import dayjs from "dayjs"

import { useShiftStore } from "@/store/shiftStore"
import { DateNumberT } from "@/types/calendar"
import { ShiftModalTypes } from "@/types/enums"

type Props = {
  calendar: DateNumberT[]
  setIsModalOpen: (value: boolean) => void
}

const CalendarHeader: React.FC<Props> = ({ calendar, setIsModalOpen }) => {
  const { setSelectedDate, setShiftModalType } = useShiftStore(state => state)

  const handleCreateClick = (date: string) => {
    setSelectedDate(date)
    setShiftModalType(ShiftModalTypes.CREATE)
    setIsModalOpen(true)
  }

  return (
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
  )
}

export default React.memo(CalendarHeader)
