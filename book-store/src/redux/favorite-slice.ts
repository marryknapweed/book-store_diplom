// src/redux/cart-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookDetailProps } from '../types/interfaces'

interface FavoriteState {
  list: BookDetailProps[];
}

const initialState: FavoriteState = {
  list: []
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleItemInFavorites: (state, action: PayloadAction<BookDetailProps>) => {
      const existingItemIndex = state.list.findIndex(item => item.isbn13 === action.payload.isbn13)
      if (existingItemIndex >= 0) {
        state.list.splice(existingItemIndex, 1)
      } else {
        state.list.push(action.payload)
      }
    }
  }
})

export const { toggleItemInFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
