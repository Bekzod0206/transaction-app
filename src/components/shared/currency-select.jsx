import { FormControl, InputLabel, Select, MenuItem } from "@mui/material" 
import { useSelector } from "react-redux"

function CurrencySelect({defaultCurrency, changeDefaultCurrency}) {

  const { currencyData } = useSelector(state => state.currency)

  return (
    <div>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={defaultCurrency}
          sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' }, height: '40px' }}
          onChange={(event) => changeDefaultCurrency(event.target.value)}
        >
          {
            currencyData && Object.keys(currencyData).length > 0 ? Object.keys(currencyData).map(item => (
              <MenuItem value={item} key={item} >{item}</MenuItem>    
            )) : ''
          }
        </Select>
    </div>
  )
}

export default CurrencySelect