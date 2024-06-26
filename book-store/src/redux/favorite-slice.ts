import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookDetailProps } from '../types/interfaces'
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorageUtils'

interface FavoriteState {
  list: BookDetailProps[];
}

const initialState: FavoriteState = {
  list: getFromLocalStorage<BookDetailProps[]>('favorites') || [] // Извлекаем данные из localStorage при инициализации
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
      setToLocalStorage('favorites', state.list) // Сохраняем данные в localStorage при обновлении
    }
  }
})

export const { toggleItemInFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
