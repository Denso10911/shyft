import React, { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import dayjs, { Dayjs } from "dayjs"
import { DateNumberT } from "@/types/calendar"

const dateNow = new Date()

type Props = {
  setCalendar: (data: DateNumberT[]) => void
}

const CalendarMenu: React.FC<Props> = ({ setCalendar }) => {
  const [firstDate, setFirstDate] = useState<Dayjs | null>(null)
  const [lastDate, setLastDate] = useState<Dayjs | null>(null)
  const [day, setDay] = useState(dateNow)

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
  )
}

export default CalendarMenu
