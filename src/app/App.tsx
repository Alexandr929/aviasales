import { useEffect, useState } from 'react'
import { SortTabs } from '../features/sort-tickets'
import { TransplantFilter } from '../features/transplant-filter'
import logo from '../shared/assets/logo.svg'
import styles from './App.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { VirtualizedTicketsList } from '../widgets/tickets-list'
import type { AppDispatch, RootState } from './store'
import { fetchAllTickets } from './store'

const App = () => {
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'optimal'>('optimal')

  const [numberStops, setNumberStops] = useState<number[]>([0, 1, 2, 3])

  const { items: tickets, loading, error } = useSelector((state: RootState) => state.tickets)

  const filteredTickets = tickets.filter((ticket) => {
    const thereStops = ticket.segments[0].stops.length
    const backStops = ticket.segments[1].stops.length

    const setNumbers = new Set(numberStops)

    return setNumbers.has(thereStops) && setNumbers.has(backStops)
  })

  const sortingTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price
    }
    if (sortBy === 'optimal') {
      const getScore = (ticket) => {
        const duration = ticket.segments[0].duration + ticket.segments[1].duration
        return ticket.price + duration / 6
      }

      const scoreA = getScore(a)
      const scoreB = getScore(b)

      return scoreA - scoreB
    }

    const durationA = a.segments[0].duration + a.segments[1].duration
    const durationB = b.segments[0].duration + b.segments[1].duration

    return durationA - durationB
  })

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllTickets())
  }, [dispatch])

  if (tickets.length === 0 && loading) {
    return <div className={styles.loader}></div>
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  return (
    <div className={styles.app}>
      <div className={styles.logoAviasales}>
        <img src={logo} alt="Aviasales" />
      </div>
      <div className={styles.sortTabs}>
        <SortTabs sortBy={sortBy} onChange={setSortBy} />
      </div>
      <div className={styles.wrapperTickets}>
        {sortingTickets.length === 0 ? (
          <div className={styles.prompt}>Выберите количество пересадок!</div>
        ) : (
          <VirtualizedTicketsList tickets={sortingTickets.slice(0, 100)} />
        )}
      </div>
      <div className={styles.transplantFilter}>
        <TransplantFilter numberStops={numberStops} onChange={setNumberStops} />
      </div>
    </div>
  )
}

export default App
