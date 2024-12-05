export const getFormatedBreakPeriod = (period: string) => {
  const hours = Math.floor(+period / 60)
  const minutes = +period - hours * 60

  return `${hours ? `${hours}h` : ""} ${minutes ? `${minutes}m` : ""}`
}
