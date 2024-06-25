import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { requestBooks, requestBooksSearch } from '../services/book'
import { BooksState, Book } from '../types/interfaces'

const initialState: BooksState = {
  list: [],
  isLoading: false,
  error: null,
  pagesCount: 1 // Инициализируем с 1 страницей по умолчанию
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params = {}, { rejectWithValue }) => {
  try {
    const data = await requestBooks(params)
    return data.books // Возвращаем только массив книг
  } catch (error) {
    return rejectWithValue('Failed to fetch books')
  }
})

// like
export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await requestBooksSearch(query, page)
      return response
    } catch (error) {
      return rejectWithValue('Failed to fetch books')
    }
  }
)

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
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false
        state.error = action.payload || 'Unknown error'
      })

      .addCase(searchBooks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.books
        state.pagesCount = Math.ceil(action.payload.total / 10)
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const bookReducer = bookSlice.reducer
