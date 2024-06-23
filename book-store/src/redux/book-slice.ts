import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { requestBooks, requestBooksSearch } from '../services/book'
import { BooksState, Book } from '../types/interfaces'

const initialState: BooksState = {
  list: [],
  isLoading: false,
  error: null
}

// export const fetchBooks = createAsyncThunk('book/fetchBooks', async (params = {}, { rejectWithValue }) => {
//   try {
//     const books = await requestBooks({ ...params })
//     return books.books
//   } catch (error) {
//     return rejectWithValue('Failed to fetch books')
//   }
// })

// export const fetchBooks = createAsyncThunk('book/fetchBooks', async (params = {}, { rejectWithValue }) => {
//   try {
//     // const data = await requestBooks({ ...params })
//     // return data.books
//     return await requestBooks({ ...params })
//   } catch (error) {
//     return rejectWithValue('Failed to fetch books')
//   }
// })

// interface FetchBooksParams {
//   search: string;
//   // page?: number;
// }

// export const fetchBooks = createAsyncThunk<Book[], FetchBooksParams, { rejectValue: string }>(
//   'books/fetchBooks',
//   async (params, { rejectWithValue }) => {
//     try {
//       const books = await requestBooks(params)
//       return books.books
//     } catch (error) {
//       return rejectWithValue('Failed to fetch books')
//     }
//   }
// )

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params = {}, { rejectWithValue }) => {
  try {
    const books = await requestBooks(params)
    return books.books // Возвращаем только массив книг
  } catch (error) {
    return rejectWithValue('Failed to fetch books')
  }
})

export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await requestBooksSearch(query)
      console.log(response)

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
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const bookReducer = bookSlice.reducer

// redux/bookSlice.js

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { requestBooks, requestBookDetails } from '../services/book'

// const initialState = {
//   books: [],
//   totalBooks: 0,
//   currentPage: 1,
//   isLoading: false,
//   error: null
// }

// // Асинхронный thunk для получения списка книг с пагинацией
// export const fetchBooks = createAsyncThunk(
//   'books/fetchBooks',
//   async (params, { rejectWithValue }) => {
//     try {
//       const { page = 1 } = params
//       const offset = (page - 1) * initialState.limit // У вас должно быть свое значение для limit
//       const response = await requestBooks({ limit: 10, offset, ...params })
//       return response
//     } catch (error) {
//       return rejectWithValue('Failed to fetch books')
//     }
//   }
// )

// export const bookSlice = createSlice({
//   name: 'books',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBooks.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(fetchBooks.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.books = action.payload.books
//         state.totalBooks = action.payload.total
//         state.currentPage = action.payload.page
//       })
//       .addCase(fetchBooks.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload || 'Unknown error'
//       })
//   }
// })

// export const bookReducer = bookSlice.reducer
