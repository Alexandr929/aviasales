import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { addIdsToTicket, getSearchId, getTickets, type Ticket } from '../../../shared/api/aviasales'

type TicketsState = {
  items: Ticket[]
  loading: boolean
  error: string | null
}

const initialState: TicketsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchAllTickets = createAsyncThunk(
  'tickets/fetchAll',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(clearTickets())

      const searchId = await getSearchId()

      let stop = false

      while (!stop) {
        const { tickets, stop: isStop } = await getTickets(searchId)

        const ticketsWithIds = addIdsToTicket(tickets)

        stop = isStop

        dispatch(addTickets(ticketsWithIds))
      }
      return { success: true }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
    }
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    updateTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.items = action.payload
    },

    addTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.items.push(...action.payload)
    },

    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    clearTickets: (state) => {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllTickets.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { updateTickets, addTickets, updateLoading, setError, clearTickets } =
  ticketsSlice.actions

export const ticketsReducer = ticketsSlice.reducer
