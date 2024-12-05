const currencyList: Record<number, string> = {
  840: "USD",
  974: "EUR",
}

export const getFormatedSalaryAmount = (number: number, currency: number) => {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currencyList[currency],
    minimumFractionDigits: 0,
  })

  return formatter.format(number)
}
