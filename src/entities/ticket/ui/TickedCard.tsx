import styles from './TickedCard.module.scss'

interface TickedCardProps {
  ticket: {
    price: number
    carrier: string
    segments: {
      origin: string
      destination: string
      date: string
      stops: string[]
      duration: number
    }[]
  }
}

export const TicketCard = ({ ticket }: TickedCardProps) => {
  const priceFormatted = ticket.price.toLocaleString('ru-RU') + ' P'

  const segmentTo = ticket.segments[0]

  const segmentBack = ticket.segments[1]

  const formatDate = (date: string) => {
    const formatted = new Date(date)

    return formatted.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    if (minutes === 0) return `${hours}ч`

    return `${hours}ч ${minutes}м`
  }

  const formatStops = (stops: string[]) => {
    const count = stops.length

    if (count === 0) return 'Без пересадок'

    if (count === 1) return '1 Пересадка'

    if (count <= 4) return `${count} пересадки`

    return `${count} пересадок`
  }

  const getArrivalDate = (departureDate: string, duration: number) => {
    const date = new Date(departureDate)

    date.setMinutes(date.getMinutes() + duration)

    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }
  return (
    <div className={styles.ticketCard}>
      <div className={styles.header}>
        <span className={styles.price}>{priceFormatted}</span>
        <img
          src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
          alt={ticket.carrier}
          className={styles.logo}
        />
      </div>

      <div className={styles.segmentTo}>
        <div className={styles.directionAndtime}>
          <div className={styles.direction}>
            {segmentTo.origin} → {segmentTo.destination}
          </div>
          <div className={styles.time}>
            {formatDate(segmentTo.date)} → {getArrivalDate(segmentTo.date, segmentTo.duration)}
          </div>
        </div>

        <div className={styles.travelDuration}>
          <span className={styles.travel}>В ПУТИ</span>
          <div className={styles.duration}>{formatDuration(segmentTo.duration)}</div>
        </div>

        <div className={styles.numberStops}>
          <div className={styles.number}>{formatStops(segmentTo.stops)}</div>
          <div className={styles.stops}>{segmentTo.stops.join(', ')}</div>
        </div>
      </div>

      <div className={styles.segmentBack}>
        <div className={styles.directionAndtimeBack}>
          <div className={styles.directionBack}>
            {segmentBack.origin} → {segmentBack.destination}
          </div>
          <div className={styles.timeBack}>
            {formatDate(segmentBack.date)} →{' '}
            {getArrivalDate(segmentBack.date, segmentBack.duration)}
          </div>
        </div>

        <div className={styles.travelDurationBack}>
          <span className={styles.travelBack}>В ПУТИ</span>
          <div className={styles.durationBack}>{formatDuration(segmentBack.duration)}</div>
        </div>

        <div className={styles.numberStopsBack}>
          <div className={styles.numberBack}>{formatStops(segmentBack.stops)}</div>
          <div className={styles.stopsBack}>{segmentBack.stops.join(', ')}</div>
        </div>
      </div>
    </div>
  )
}
