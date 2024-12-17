import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currencyData: {},
  error: ''
}


export const authSlice = createSlice({
  name: 'currency',
  initialState,
  reducers:{
    getCurrencyDataStart(state){
      state.isLoading = true
    },
    getCurrencyDataSuccess(state, action){
      state.isLoading = false
      state.currencyData = action.payload
    },
    getCurrencyDataFailure(state, action){
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const { 
  getCurrencyDataStart,
  getCurrencyDataSuccess,
  getCurrencyDataFailure
} = authSlice.actions
export default authSlice.reducer