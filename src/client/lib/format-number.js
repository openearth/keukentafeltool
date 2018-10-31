export const toNumber = (value) => {
  const number = Number(value)
  return isNaN(number) ? undefined : number
}

export const isNumber = (value) => {
  if (typeof value === undefined || typeof value === null) return false
  return !isNaN(Number(value))
}

export default function formatNumber({ value, digits = 2, locale = 'nl-NL' }) {
  if (!isNumber(value)) return ''
  return toNumber(value).toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}
