export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  if (minutes === 0) return `${hours}ч`

  return `${hours}ч ${minutes}м`
}
