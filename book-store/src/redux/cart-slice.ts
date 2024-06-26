import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookDetailProps } from '../types/interfaces'
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorageUtils'

interface CartItem extends BookDetailProps {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: getFromLocalStorage<CartItem[]>('cart') || [] // Извлекаем данные из localStorage при инициализации
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<BookDetailProps>) => {
      const existingItem = state.items.find(item => item.isbn13 === action.payload.isbn13)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      setToLocalStorage('cart', state.items)
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.isbn13 !== action.payload)
      setToLocalStorage('cart', state.items)
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.isbn13 === action.payload)
      if (item) {
        item.quantity++
        setToLocalStorage('cart', state.items)
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.isbn13 === action.payload)
      if (item && item.quantity > 1) {
        item.quantity--
        setToLocalStorage('cart', state.items)
      }
    }
  }
})

export const { addItemToCart, removeItemFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export const cartReducer = cartSlice.reducer
