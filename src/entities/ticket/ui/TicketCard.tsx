import { formatDate, formatTimeZoneDiff, getArrivalDate } from '../lib/dateUtils'
import { formatDuration } from '../lib/durationUtils'
import { getLocalLogos } from '../lib/logoManager'
import { priceFormatted } from '../lib/priceUtils'
import { formatStops } from '../lib/stopsUtils'
import styles from './TicketCard.module.scss'

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
  const segmentTo = ticket.segments[0]
  const segmentBack = ticket.segments[1]

  const timeDiffTo = formatTimeZoneDiff(segmentTo.origin, segmentTo.destination)

  return (
    <div className={styles.ticketCard}>
      <div className={styles.header}>
        <span className={styles.price}>{priceFormatted(ticket.price)}</span>
        <img src={getLocalLogos(ticket.carrier)} alt={ticket.carrier} className={styles.logo} />
      </div>

      <div className={styles.segmentTo}>
        <div className={styles.directionAndtime}>
          <div className={styles.direction}>
            {segmentTo.origin} → {segmentTo.destination}
          </div>
          <div className={styles.time}>
            {formatDate(segmentTo.date)} → {getArrivalDate(segmentTo.date, segmentTo.duration)}{' '}
            <span className={styles.diffTimeZone}>{timeDiffTo}ч</span>
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
