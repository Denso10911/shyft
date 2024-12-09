import dayjs, { Dayjs } from "dayjs"

import { DateNumberT } from "@/types/calendar"

export const getCalendarWeekPeriod = (startDate: Dayjs): DateNumberT[] => {
  const currentPeriodDays = []
  const startOfCurrentWeek = dayjs(startDate).startOf("isoWeek")

  for (let i = 0; i <= 6; i++) {
    const currentDate = startOfCurrentWeek.add(i, "day")
    currentPeriodDays.push({
      day: currentDate.format("DD"),
      month: currentDate.format("MM"),
      year: currentDate.format("YYYY"),
    })
  }

  return currentPeriodDays
}
