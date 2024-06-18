import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from './book-slice'
import { bookItemReducer } from './book-item-slice'

export const store = configureStore({
  reducer: {
    books: bookReducer,
    bookItem: bookItemReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
