import { BrowserRouter, Routes, Route } from "react-router";
import { CurrencyData, Graph, Navbar, Transaction } from "./components"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from './service'
import { getCurrencyDataStart, getCurrencyDataSuccess, getCurrencyDataFailure } from "./slice/currency";

function App(){

  const dispatch = useDispatch()
  const { isLoading, currencyData } = useSelector(state => state.currency)

  const getCurrencyData = async () => {

    dispatch(getCurrencyDataStart())

    try {
      const response = await axios.get('/latest/USD')
      dispatch(getCurrencyDataSuccess(response.data.conversion_rates))

    } catch (error) {
      console.log(error, 'error')
      dispatch(getCurrencyDataFailure(error.msg))
    }
  }

  useEffect(() => {
    getCurrencyData()
  }, [])

  return (
    <div className="container h-100">
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<CurrencyData />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </div>
  )
}

export default App