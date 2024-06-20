// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from './book-slice'
import { bookItemReducer } from './book-item-slice'
import { cartReducer } from './cart-slice'
import { favoritesReducer } from './favorite-slice'

export const store = configureStore({
  reducer: {
    books: bookReducer,
    bookItem: bookItemReducer,
    cart: cartReducer,
    favorites: favoritesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
