import { configureStore } from '@reduxjs/toolkit'
import CurrencyReducer from '../slice/currency'

export default configureStore({
  reducer: {
    currency: CurrencyReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
})