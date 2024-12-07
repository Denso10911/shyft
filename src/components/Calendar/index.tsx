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
import AsideModal from "@/components/AsideModal"
import CalendarMenu from "@/components/CalendarMenu"
dayjs.extend(isoWeek)

const Calendar = () => {
  const locale = useLocale()
  dayjs.locale(locale)

  const [calendar, setCalendar] = useState<DateNumberT[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const modalCloseHandler = () => {
    setIsModalOpen(false)
  }

  const modalOpenHandler = () => {
    setIsModalOpen(true)
  }

  return (
    <div
      data-page="Calendar"
      className="flex h-full flex-1 flex-col gap-6 rounded bg-color-white shadow"
    >
      <CalendarMenu setCalendar={setCalendar} />
      <EmployeesCalendar calendar={calendar} />

      <AsideModal isOpen={isModalOpen} closeHandler={modalCloseHandler} type="newShift" />
    </div>
  )
}

export default Calendar
