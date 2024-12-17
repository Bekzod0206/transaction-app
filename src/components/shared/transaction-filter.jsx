import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { categoryArr, incomeCategoryArr } from '../../constants';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Card } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categoryData = [...categoryArr, ...incomeCategoryArr];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function TransactionFilter({onFilterTransactionList}) {
  const theme = useTheme();
  const [categoryName, setCategoryName] = useState([]);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
      setStartDate(dayjs());
      setEndDate(dayjs());
    }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleFilter = () => {
    const dataObj = {
      startDate: startDate.format('DD/MM/YYYY'),
      endDate: endDate.format('DD/MM/YYYY'),
      categoryName
    }
    onFilterTransactionList(dataObj)
  }

  return (
    <section
      className='d-flex flex-column justify-content-center align-items-center'
      style={{background: '#b4b4b4', borderRadius: '10px', padding: '5px 10px'}}
    >
      <div className='d-flex justify-content-center align-items-center'>
        <FormControl sx={{ m: 1, width: 300 }} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="date-picker"
              size="small"
              sx={{ width: '100%' }}
              value={startDate}
              format="DD/MM/YYYY"
              onChange={(newValue) => setStartDate(newValue)}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="date-picker"
              size="small"
              sx={{ width: '100%' }}
              value={endDate}
              format="DD/MM/YYYY"
              onChange={(newValue) => setEndDate(newValue)}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }} size='small'>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={categoryName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {categoryData.map((category) => (
              <MenuItem
                key={category}
                value={category}
                style={getStyles(category, categoryName, theme)}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button color="primary" variant="contained" onClick={handleFilter}>
        Filter
      </Button>
    </section>
  );
}

export default TransactionFilter