import { Button, MenuItem, OutlinedInput, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { categoryArr, incomeCategoryArr } from "../../constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";

function TransactionModal({open, setOpen, onAddTransaction}) {

  const [categoryData, setCategoryData] = useState([])
  const [transactionType, setTransactionType] = useState('outcome')
  const [currDate, setCurrDate] = useState(null);
  const [currValue, setCurrValue] = useState(null);
  const [currCategory, setCurrCategory] = useState('');
  const [currDescription, setCurrDescription] = useState('');

  useEffect(() => {
    setCurrDate(dayjs());
  }, []);

  useEffect(() => {
    if(transactionType === 'income'){
      setCategoryData(incomeCategoryArr)
    }else{
      setCategoryData(categoryArr)
    }
  }, [transactionType])

  const handleClose = () => {
    setOpen(false);
  };

  const handleTypeChange = (e) => {
    setTransactionType(e.target.value)
  }
  
  const handleCategoryChange = (e) => {
    setCurrCategory(e.target.value)
  };
  const handleValueChange = (e) => {
    setCurrValue(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setCurrDescription(e.target.value);
  }

  const saveNewTransaction = () => {
    if(!currValue || !currCategory){
      toast.warn('Fill up value and category fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        theme: "light",
      });
      return false
    }else{

      const dataObj = {
        date: currDate.format('DD/MM/YYYY'),
        type: transactionType,
        category: currCategory,
        value: currValue,
        description: currDescription,
        id: Math.random()
      }
      onAddTransaction(dataObj)

      setTransactionType('outcome')
      setCurrCategory('')
      setCurrValue('')
      setCurrDescription('')
      setOpen(false);

    }
    console.log('hello after checking')
  }

  if(!open){
    return null
  }

  return (
    <section
      className="h-100 w-100 bg-gray position-absolute top-0 left-0 d-flex justify-content-center align-items-center z-3"
    >
      <Stack spacing={2} sx={{ backgroundColor: 'white', padding: '10px 20px', width: '400px', border: '1px solid gray', borderRadius: '15px' }}>
        <h3 style={{ color: 'gray', textAlign: 'center' }}>New Transaction</h3>
        <div>
          <label htmlFor="type-select" style={{ color: 'gray', fontSize: '1.2rem' }}>Transaction type</label>
          <br />
          <Select
            id="type-select"
            size="small"
            sx={{ width: '100%' }}
            value={transactionType}
            onChange={handleTypeChange}
          >
            <MenuItem value={'outcome'}>Outcome</MenuItem>
            <MenuItem value={'income'}>Income</MenuItem>
          </Select>
        </div>
        <div>
          <label htmlFor="date-picker" style={{ color: 'gray', fontSize: '1.2rem' }}>Date</label>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="date-picker"
              size="small"
              sx={{ width: '100%' }}
              value={currDate}
              format="DD/MM/YYYY"
              onChange={(newValue) => setCurrDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div>
          <label htmlFor="value-input" style={{ color: 'gray', fontSize: '1.2rem' }}>Value</label>
          <br />
          <OutlinedInput
            id="value-input"
            size="small"
            type="number"
            sx={{ width: '100%' }}
            onChange={handleValueChange}
          />
        </div>
        <div>
          <label htmlFor="category-select" style={{ color: 'gray', fontSize: '1.2rem' }}>Category</label>
          <br />
          <Select
            id="category-select"
            size="small"
            sx={{ width: '100%' }}
            value={currCategory}
            onChange={handleCategoryChange}
          >
            {categoryData.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="description-input" style={{ color: 'gray', fontSize: '1.2rem' }}>Description</label>
          <br />
          <TextField
            id="description-input"
            size="small"
            sx={{ width: '100%' }}
            value={currDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="d-flex justify-content-around">
          <Button color="error" variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={saveNewTransaction}>
            Save
          </Button>
        </div>
      </Stack>
    </section>
  )
}

export default TransactionModal