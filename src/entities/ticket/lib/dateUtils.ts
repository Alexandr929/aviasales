export const formatDate = (date: string): string => {
  const formatted = new Date(date)

  return formatted.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

export const getArrivalDate = (departureDate: string, duration: number): string => {
  const date = new Date(departureDate)

  date.setMinutes(date.getMinutes() + duration)

  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

const citysTimeZones = {
  MOW: 3,
  HKT: 7,
  HKG: 8,
  DXB: 4,
  JNB: 2,
  IST: 3,
  DEL: 5,
  DOH: 3,
}

const getTimeZonesOffset = (city: string): number => {
  return citysTimeZones[city] || 0
}

const getTimeZoneDiff = (fromCity: string, toCity: string): number => {
  const fromOffset = getTimeZonesOffset(fromCity)

  const toOffset = getTimeZonesOffset(toCity)

  return toOffset - fromOffset
}

export const formatTimeZoneDiff = (fromCity: string, toCity: string): string => {
  const diff = getTimeZoneDiff(fromCity, toCity)
  if (diff === 0) return ''

  return diff > 0 ? `+${diff}` : `${diff}`
}
