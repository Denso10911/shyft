export const getFormatedBreakPeriod = (period: number) => {
  const hours = Math.floor(period / 60)
  const minutes = period - hours * 60

  return `${hours ? `${hours}h` : ""} ${minutes ? `${minutes}m` : ""}`
}
