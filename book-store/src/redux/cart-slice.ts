// src/redux/cart-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookDetailProps } from '../types/interfaces'

// interface CartState {
//   items: BookDetailProps[];
// }

interface CartState {
  items: (BookDetailProps & { quantity: number })[];
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItemToCart: (state, action: PayloadAction<BookDetailProps>) => {
    //   state.items.push(action.payload)
    // },
    // removeItemFromCart: (state, action: PayloadAction<string>) => {
    //   state.items = state.items.filter(item => item.isbn13 !== action.payload)
    // }
    addItemToCart: (state, action: PayloadAction<BookDetailProps>) => {
      const existingItem = state.items.find(item => item.isbn13 === action.payload.isbn13)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.isbn13 !== action.payload)
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.isbn13 === action.payload)
      if (item) {
        item.quantity++
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.isbn13 === action.payload)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    }
  }
})

export const { addItemToCart, removeItemFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export const cartReducer = cartSlice.reducer
