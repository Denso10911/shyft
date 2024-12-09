import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"

import { useCalendarStore } from "@/store/calendarStore"
dayjs.extend(isoWeek)

const CalendarMenu = () => {
  const { firstDate, lastDate, setNextWeek, setPrevWeek } = useCalendarStore(state => state)

  return (
    <div className="mt-4 flex items-center">
      <div className="flex w-full items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-2">
          <div className="cursor-pointer" onClick={() => setPrevWeek()}>
            <FaChevronLeft />
          </div>
          <div className="rounded border border-[#eae8ec] bg-[#f6f8fc] px-10 py-1 text-sm lowercase">
            {dayjs(firstDate).format("DD MMM")} - {dayjs(lastDate).format("DD MMM")}
          </div>
          <div className="cursor-pointer" onClick={() => setNextWeek()}>
            <FaChevronRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarMenu
