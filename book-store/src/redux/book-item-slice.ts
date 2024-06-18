import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { requestBooksItem } from '../services/book'
import { BookDetailProps, BookItemState } from '../types/interfaces'

const initialState: BookItemState = {
  list: null,
  isLoading: false,
  error: null,
  activeTab: 'Description'

}

// Thunks
export const fetchBookById = createAsyncThunk('book/fetchBooks', async (isbn13: string, { rejectWithValue }) => {
  try {
    return await requestBooksItem(isbn13)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const bookItemSlice = createSlice({
  name: 'bookItem',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<BookDetailProps>) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchBookById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const { setActiveTab } = bookItemSlice.actions
export const bookItemReducer = bookItemSlice.reducer

// interface BookItemState {
//   list: BookDetailProps
//   isLoading: boolean
//   error: string | null
// }

// const initialState: BookItemState = {
//   list: [],
//   isLoading: false,
//   error: null
// }

// interface BookItemState {
//   list: BookDetailProps[]
//   isLoading: boolean
//   error: string | null
// }

// const initialState: BookItemState = {
//   list: [],
//   isLoading: false,
//   error: null
// }

// export const fetchBookById = createAsyncThunk('book/fetchBooks', async (isbn13: string, { rejectWithValue }) => {
//   try {
//     const response = await requestBooksItem(isbn13)
//     return response.data // Предположим, что requestBooksItem возвращает объект данных книги
//   } catch (error) {
//     return rejectWithValue((error as Error).message)
//   }
// })

// export const bookItemSlice = createSlice({
//   name: 'bookItem',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookById.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<BookDetailProps>) => {
//         state.isLoading = false
//         state.list = [action.payload] // Преобразование в массив с одним элементом
//         state.error = null // Сбрасываем ошибку при успешной загрузке
//       })
//       .addCase(fetchBookById.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.isLoading = false
//         state.error = action.payload || 'Unknown error'
//       })
//   }
// })

// export const bookItemReducer = bookItemSlice.reducer

// // Thunks
// export const fetchBookById = createAsyncThunk('book/fetchBooks', async (isbn13: string, { rejectWithValue }) => {
//   try {
//     return await requestBooksItem(isbn13)
//   } catch (error) { // TODO: fix any
//     return rejectWithValue((error as Error).message)
//   }
// })

// export const bookItemSlice = createSlice({
//   name: 'bookItem',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookById.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<BookDetailProps>) => {
//         state.isLoading = false
//         state.list = action.payload
//       })
//       .addCase(fetchBookById.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.isLoading = false
//         state.error = action.payload || 'Unknown error'
//       })
//   }
// })

// export const bookItemReducer = bookItemSlice.reducer

//
