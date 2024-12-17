import { useCallback, useEffect, useState } from "react";
import CurrencyConverter from "./shared/currency-converter";
import CurrencyList from "./shared/currency-list";
import { useSelector } from "react-redux";
import axios from "axios";

function CurrencyData() {
  const { isLoading, currencyData } = useSelector((state) => state.currency);
  console.log(currencyData, 'currencyData 11111')

  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [baseCurrencyValue, setBaseCurrencyValue] = useState(currencyData[baseCurrency] || 0);
  const [targetCurrency, setTargetCurrency] = useState("UZS");
  const [targetCurrencyValue, setTargetCurrencyValue] = useState(currencyData[targetCurrency] || 0);

  const getCurrencyValuePair = async () => {
    try {
      const response = await axios.get(`/pair/${baseCurrency}/${targetCurrency}`);
      const calculatedVal = +response.data.conversion_rate * baseCurrencyValue;
      setTargetCurrencyValue(calculatedVal);
    } catch (error) {
      console.error("Failed to fetch currency pair:", error);
      setTargetCurrencyValue(0);
    }
  };

  useEffect(() => {
    getCurrencyValuePair();
  }, [baseCurrency, targetCurrency, baseCurrencyValue]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if(!currencyData || !Object.keys(currencyData).length){
    return <p>Issues on fetching data...</p>;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <section className="d-flex m-5 w-100 justify-content-center">
        <CurrencyConverter
          currencyList={currencyData ?? {}}
          currency={baseCurrency ?? 'USD'}
          changeCurrency={setBaseCurrency}
          currencyValue={baseCurrencyValue ?? 1}
          changeCurrencyValue={setBaseCurrencyValue}
        />

        <div className="currency-divider-line"></div>

        <CurrencyConverter
          currencyList={currencyData ?? {}}
          currency={targetCurrency ?? 'UZS'}
          changeCurrency={setTargetCurrency}
          currencyValue={targetCurrencyValue ?? 12200}
          changeCurrencyValue={setTargetCurrencyValue}
        />
      </section>

      <section className="w-100">
        <CurrencyList />
      </section>
      hello
    </div>
  );
}

export default CurrencyData;
