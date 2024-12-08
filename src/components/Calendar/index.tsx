"use client"

import { useState } from "react"
import dayjs from "dayjs"
import { useLocale } from "next-intl"

import "dayjs/locale/fr"

import CalendarMenu from "@/components/CalendarMenu"
import EmployeesCalendar from "@/components/EmployeesCalendar"

import { DateNumberT } from "@/types/calendar"

const Calendar = () => {
  const locale = useLocale()

  dayjs.locale(locale)

  const [calendar, setCalendar] = useState<DateNumberT[]>([])

  return (
    <div className="flex h-full flex-1 flex-col gap-6 rounded bg-color-white shadow">
      <CalendarMenu setCalendar={setCalendar} />

      {!!calendar.length && <EmployeesCalendar calendar={calendar} />}
    </div>
  )
}

export default Calendar
