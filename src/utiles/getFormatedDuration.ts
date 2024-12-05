import dayjs from "dayjs"

import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export const getFormatedDuration = (startDate: string, endDate: string) => {
  const startTime = dayjs(startDate)
  const endTime = dayjs(endDate)

  const diff = dayjs.duration(endTime.diff(startTime))

  const hours = diff.hours()
  const minutes = diff.minutes()

  const formattedMinutes = minutes < 10 ? "0" : ""

  let result = ""

  if (hours > 0) {
    result = `${hours}h`
  }
  if (!hours && minutes > 0) {
    result = `${formattedMinutes}${minutes}m`
  } else if (minutes > 0) {
    result = `${result}${formattedMinutes}${minutes}`
  }

  return result
}
