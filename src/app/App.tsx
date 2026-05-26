import { TicketCard } from '../entities/ticket/ui/TickedCard'
import { SortTabs } from '../features/sort-tickets/ui/SortTabs'
import { TransplantFilter } from '../features/transplant-filter/ui/TransplantFilter'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import logo from '../shared/assets/logo.svg'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTickets } from './store/slices/ticketsSlice'
import type { RootState, AppDispatch } from './store/store'

const App = () => {
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price')

  const [numberStops, setNumberStops] = useState<number[]>([0, 1, 2, 3])

  const { items: tickets, loading, error } = useSelector((state: RootState) => state.tickets)

  const filteredTickets = tickets.filter((ticket) => {
    const thereStops = ticket.segments[0].stops.length
    const backStops = ticket.segments[1].stops.length

    return numberStops.includes(thereStops) && numberStops.includes(backStops)
  })

  const sortingTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price

    const durationA = a.segments[0].duration + a.segments[1].duration
    const durationB = b.segments[0].duration + b.segments[1].duration

    return durationA - durationB
  })

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllTickets())
  }, [dispatch])

  if (tickets.length === 0 && loading) {
    return <div>Загрузка билетов...</div>
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
      <div>
        {sortingTickets.slice(0, 5).map((ticket) => (
          <div className={styles.tickedCard}>
            <TicketCard key={ticket.id} ticket={ticket} />
          </div>
        ))}
      </div>
      <div className={styles.transplantFilter}>
        <TransplantFilter numberStops={numberStops} onChange={setNumberStops} />
      </div>
    </div>
  )
}

export default App
