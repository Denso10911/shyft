"use client"

import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import { useLocale } from "next-intl"

import "dayjs/locale/fr"
import EmployeesCalendar from "@/components/EmployeesCalendar"
import { DateNumberT } from "@/types/calendar"
dayjs.extend(isoWeek)

const Calendar = () => {
  const locale = useLocale()
  dayjs.locale(locale)

  const dateNow = new Date()

  const [day, setDay] = useState(dateNow)
  const [calendar, setCalendar] = useState<DateNumberT[]>([])
  const [firstDate, setFirstDate] = useState<Dayjs | null>(null)
  const [lastDate, setLastDate] = useState<Dayjs | null>(null)

  const handleBackClick = () => {
    setDay(dayjs(day).subtract(7, "day").toDate())
  }

  const handleNextClick = () => {
    setDay(dayjs(day).add(7, "day").toDate())
  }

  useEffect(() => {
    const today = dayjs()
    setDay(today.toDate())
  }, [])

  useEffect(() => {
    const currentPeriodDays = []
    const startOfCurrentWeek = dayjs(day).startOf("isoWeek")

    setFirstDate(startOfCurrentWeek)
    setLastDate(startOfCurrentWeek.add(6, "day"))

    for (let i = 0; i <= 6; i++) {
      const currentDate = startOfCurrentWeek.add(i, "day")
      currentPeriodDays.push({
        day: currentDate.format("DD"),
        month: currentDate.format("MM"),
        year: currentDate.format("YYYY"),
      })
    }
    setCalendar(currentPeriodDays)
  }, [day])

  return (
    <div
      data-page="Calendar"
      className="flex h-full flex-1 flex-col gap-6 rounded bg-color-white shadow"
    >
      <div className="mt-4 flex items-center">
        <div className="flex w-full items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-2">
            <div className="cursor-pointer" onClick={handleBackClick}>
              <IoIosArrowBack />
            </div>
            <div className="rounded border border-[#eae8ec] bg-[#f6f8fc] px-10 py-1 text-sm lowercase">
              {dayjs(firstDate).format("DD MMM")} - {dayjs(lastDate).format("DD MMM")}
            </div>
            <div className="cursor-pointer" onClick={handleNextClick}>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>

      <EmployeesCalendar calendar={calendar} />
    </div>
  )
}

export default Calendar
