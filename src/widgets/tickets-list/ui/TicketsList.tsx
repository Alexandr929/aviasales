import { List, type RowComponentProps } from 'react-window'
import { TicketCard } from '../../../entities/ticket'

interface TickedListProps {
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

const RowComponent = ({
  index,
  tickets,
  style,
}: RowComponentProps<{ tickets: TickedListProps[] }>) => {
  return (
    <div style={style}>
      <TicketCard ticket={tickets[index]} />
      <div>{`${index + 1} of ${tickets.length}`}</div>
    </div>
  )
}

export const VirtualizedTicketsList = ({ tickets }: { tickets: TickedListProps[] }) => {
  return (
    <List
      rowComponent={RowComponent}
      rowCount={tickets.length}
      rowHeight={202}
      rowProps={{ tickets }}
    />
  )
}
