import dayjs, { Dayjs } from "dayjs"
import { create } from "zustand"

import { DateNumberT } from "@/types/calendar"
import { getCalendarWeekPeriod } from "@/utiles/getInitialCalendarData"

type CalendarStore = {
  calendar: DateNumberT[]
  activeDate: Dayjs
  firstDate: Dayjs
  lastDate: Dayjs

  setNextWeek: () => void
  setPrevWeek: () => void
}

export const useCalendarStore = create<CalendarStore>(set => ({
  calendar: getCalendarWeekPeriod(dayjs()),
  activeDate: dayjs(),
  firstDate: dayjs().startOf("isoWeek"),
  lastDate: dayjs().startOf("isoWeek").add(6, "day"),

  setNextWeek: () => {
    set(state => ({
      calendar: getCalendarWeekPeriod(state.activeDate.add(7, "day")),
      activeDate: state.activeDate.add(7, "day"),
      firstDate: state.activeDate.add(7, "day"),
      lastDate: state.activeDate.add(7, "day").add(6, "day"),
    }))
  },
  setPrevWeek: () => {
    set(state => ({
      calendar: getCalendarWeekPeriod(state.activeDate.subtract(7, "day")),
      activeDate: state.activeDate.subtract(7, "day"),
      firstDate: state.activeDate.subtract(7, "day"),
      lastDate: state.activeDate.subtract(7, "day").add(6, "day"),
    }))
  },
}))
