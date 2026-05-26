const API_BASE = 'https://aviasales-test-api.kata.academy'
// const API_BASE = 'http://localhost:3001'

export type Ticket = {
  id?: string
  price: number
  carrier: string
  segments: Array<{
    origin: string
    destination: string
    date: string
    stops: string[]
    duration: number
  }>
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getSearchId = async (): Promise<string> => {
  const response = await fetch(`${API_BASE}/search`)
  if (!response.ok) throw new Error('Failed to get searchId')
  const data = await response.json()
  return data.searchId
}

export const getTickets = async (
  searchId: string,
  retries = 3
): Promise<{ tickets: Ticket[]; stop: boolean }> => {
  try {
    const response = await fetch(`${API_BASE}/tickets?searchId=${searchId}`)

    if (response.status === 500 && retries > 0) {
      await wait(1000)
      return getTickets(searchId, retries - 1)
    }

    if (!response.ok) throw new Error(`Error ${response.status}`)

    const data = await response.json()

    return { tickets: data.tickets, stop: data.stop }
  } catch (error) {
    if (retries > 0) {
      await wait(1000)
      return getTickets(searchId, retries - 1)
    }
    throw error
  }
}

const generateId = () => Date.now().toString()

export const addIdsToTicket = (tickets: Ticket[]): Ticket[] => {
  return tickets.map((ticket) => {
    return { ...ticket, id: generateId() }
  })
}

// export const getTickets = async (): Promise<Ticket[]> => {
// const response = await fetch(`${API_BASE}/tickets`)
// const data = await response.json()
// return data
// }
