const toNumber = (value) => {
  const number = Number(value)
  return isNaN(number) ? undefined : number
}
const isNumber = (value) => {
  if (typeof value === undefined || typeof value === null) return false
  return !isNaN(Number(value))
}

export function formatCmAsMeter(value) {
  if (!isNumber(value)) return ''
  const valueInCm = toNumber(value)
  const valueInMeter = valueInCm / 100
  return this.formatNumber(valueInMeter)
}

export function formatNumber(value) {
  if (!isNumber(value)) return ''
  return toNumber(value).toLocaleString(this.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
