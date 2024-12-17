import { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material'
import { useSelector } from 'react-redux'

function CurrencyConverter({currencyList, currency, changeCurrency, currencyValue, changeCurrencyValue}) {

  console.log(currencyList, 'currencyList')
  console.log(currency, 'currency')
  console.log(currencyValue, 'currencyValue')

  return (
    <div>
      <FormControl sx={{ m: 1, color: 'white' }} variant="standard">
        <InputLabel id="demo-customized-select-label" sx={{color: 'white'}}>Currency</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={currency}
          sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
          onChange={(event) => changeCurrency(event.target.value)}
        >
          {
            currencyList && Object.keys(currencyList).length > 0 ? Object.keys(currencyList).map(item => (
              <MenuItem value={item} key={item} >{item}</MenuItem>    
            )) : ''
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, color: 'white' }} variant="standard">
        <InputLabel
          htmlFor="demo-customized-textbox"
          sx={{ color: 'white' }}
        >
          Currency
        </InputLabel>
        <Input
          type="number"
          sx={{ color: 'white' }}
          value={currencyValue}
          onInput={(event) => changeCurrencyValue(event.target.value)}
        >

        </Input>
      </FormControl>
    </div>
  )
}

export default CurrencyConverter