export const getHHmmToMinutes = (hhmm: string): number => {
  const [hours, minutes] = hhmm.split(":").map(Number)
  return hours * 60 + minutes
}
