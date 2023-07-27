import dayjs from 'dayjs'
export function formatMonthDay(date, dateFormat="MM月DD日") {
  return dayjs(date).format(dateFormat)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}