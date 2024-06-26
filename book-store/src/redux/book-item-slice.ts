import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestBooksItem } from '../services/book'
import { BookItemState } from '../types/interfaces'

const initialState: BookItemState = {
  list: null,
  isLoading: false,
  error: null,
  activeTab: null
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
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Unknown error'
      })
  }
})

export const { setActiveTab } = bookItemSlice.actions
export const bookItemReducer = bookItemSlice.reducer
