export const mockTickets = [
  {
    id: '1',
    price: 13400,
    carrier: 'SU',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2024-05-15T10:45:00',
        stops: [],
        duration: 780,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2024-05-22T22:45:00',
        stops: ['SVO'],
        duration: 900,
      },
    ],
  },
]
