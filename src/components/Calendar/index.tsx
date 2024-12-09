"use client"

import "dayjs/locale/fr"

import CalendarContainer from "@/components/CalendarContainer"
import CalendarMenu from "@/components/CalendarMenu"

const Calendar = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-6 rounded bg-color-white shadow">
      <CalendarMenu />
      <CalendarContainer />
    </div>
  )
}

export default Calendar
