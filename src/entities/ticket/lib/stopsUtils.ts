export const formatStops = (stops: string[]) => {
  const count = stops.length

  if (count === 0) return 'Без пересадок'

  if (count === 1) return '1 Пересадка'

  if (count <= 4) return `${count} пересадки`

  return `${count} пересадок`
}
