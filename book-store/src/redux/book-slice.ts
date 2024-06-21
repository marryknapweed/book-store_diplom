import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { requestBooks } from '../services/book'
import { BooksState, Book } from '../types/interfaces'

const initialState: BooksState = {
  list: [],
  isLoading: false,
  error: null
  // favorites: []
}

// export const fetchBooks = createAsyncThunk('book/fetchBooks', async (params = {}, { rejectWithValue }) => {
//   try {
//     // const data = await requestBooks({ ...params })
//     // return data.books
//     return await requestBooks({ ...params })
//   } catch (error) {
//     return rejectWithValue('Failed to fetch books')
//   }
// })

interface FetchBooksParams {
  search: string;
}

export const fetchBooks = createAsyncThunk<Book[], FetchBooksParams, { rejectValue: string }>(
  'books/fetchBooks',
  async (params, { rejectWithValue }) => {
    try {
      const books = await requestBooks(params)
      return books.books
    } catch (error) {
      return rejectWithValue('Failed to fetch books')
    }
  }
)

// export const fetchBooks = createAsyncThunk('book/fetchBooks', async (params = {}, { rejectWithValue }) => {
//   try {
//     const books = await requestBooks({ ...params })
//     return books.books
//   } catch (error) {
//     return rejectWithValue('Failed to fetch books')
//   }
// })

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // addToFavorites: (state, action: PayloadAction<BookDetailProps>) => {
    //   state.favorites.push(action.payload)
    // },

    // removeFromFavorites: (state, action: PayloadAction<string>) => {
    //   state.favorites = state.favorites.filter(book => book.isbn13 !== action.payload)
    // }

  },
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
  }
})

// export const { addToFavorites, removeFromFavorites } = bookSlice.actions
export const bookReducer = bookSlice.reducer
