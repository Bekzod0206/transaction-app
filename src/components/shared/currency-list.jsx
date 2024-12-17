import { useEffect, useState } from "react"
import CurrencySelect from "./currency-select"
import { Button } from "@mui/material"
import axios from "../../service"

function CurrencyList() {
  const [currencyGeneralObj, setCurrencyGeneralObj] = useState({})
  const [dataList, setDataList] = useState(['USD', 'EUR', 'JPY'])
  const [currentCurrency, setCurrentCurrency] = useState('USD')
  const [defaultTargetCurr, setDefaultTargetCurr] = useState('UZS')

  const addCurrency = () => {
    if(!dataList.includes(currentCurrency) && currentCurrency !== defaultTargetCurr){
      setDataList((prev) => {
        const updatedList = [...prev, currentCurrency];
        console.log('Updated dataList:', updatedList);
        updatedList.forEach((item) => {
          getCurrentCurrencyData(item, defaultTargetCurr);
        });
        return updatedList;
      });
    }
  }

  const getCurrentCurrencyData = async (base, target) => {
    try {
      const response = await axios.get(`/pair/${base}/${target}`)
      setCurrencyGeneralObj((prevData) => ({
        ...prevData,
        [base]: response.data.conversion_rate
      }))
    } catch (error) {
      console.log(error, 'error')
    }
  }

  useEffect(() => {
    dataList.forEach(item => {
      getCurrentCurrencyData(item, defaultTargetCurr);
    })
    
    const interval = setInterval(() => {
      dataList.forEach(item => {
        getCurrentCurrencyData(item, defaultTargetCurr);
      })
    }, 50000);

    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    dataList.forEach(item => {
      getCurrentCurrencyData(item, defaultTargetCurr);
    })
  }, [defaultTargetCurr])
  

  return (
    <div>

      <section className="d-flex gap-3 align-items-center">
        <CurrencySelect
          defaultCurrency={currentCurrency}
          changeDefaultCurrency={setCurrentCurrency}
        />
        <Button variant="contained" onClick={addCurrency}>Add currency</Button>

        <span className="ms-5">Target currency</span>
        <CurrencySelect
          defaultCurrency={defaultTargetCurr}
          changeDefaultCurrency={setDefaultTargetCurr}
        />
      </section>

      <section className="w-100">
        <div
          className="
            d-flex
            flex-column
            mt-5
            justify-content-center
            align-items-center
            border-bottom
            border-top
            fs-3
          "
        >
          {dataList.length > 0 ? dataList.map((item, index) => (
            <div key={index} className="d-flex gap-5 justify-content-between w-50">
              <section className="d-flex gap-2 w-40">
                <label>1</label>
                <p> { item } </p>
              </section>
              
              <div className="currency-divider-line w-10"></div>

              <section className="d-flex gap-2 w-50">
                <label>{ currencyGeneralObj[item] }</label>
                <p> { defaultTargetCurr } </p>
              </section>
            </div>
          )) : 'No data'}
        </div>
      </section>
    </div>
  )
}

export default CurrencyList