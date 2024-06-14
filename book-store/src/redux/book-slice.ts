import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { requestBooks } from '../services/book'
import { BooksState, Book } from '../types/interfaces'

const initialState: BooksState = {
  list: [],
  isLoading: false,
  error: null
}

export const fetchBooks = createAsyncThunk('book/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const data = await requestBooks()
    return data.books
  } catch (error) {
    return rejectWithValue('Failed to fetch books')
  }
})

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const bookReducer = bookSlice.reducer
