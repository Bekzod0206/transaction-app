import {
  Button,
  ListItem,
  Skeleton,
  Stack,
} from "@mui/material"
import { useEffect, useState } from "react"
import TransactionModal from "./shared/transaction-modal";
import TransactionList from "./shared/transaction-list";
import TransactionFilter from "./shared/transaction-filter";
import dayjs from "dayjs";

function Transaction() {

  const [totalBalance, setTotalBalance] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalOutcome, setTotalOutcome] = useState(0)
  const [transationList, setTransactionList] = useState([])
  const [transactionFilteredList, setTransactionFilteredList] = useState([])
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddTransaction = (dataObj) => {
    console.log(dataObj, 'dataObj')
    setTransactionList((prev) => [...prev, dataObj]);
    console.log(transationList, 'transationList 1111')
  };

  const deleteRow = (dataObj) => {
    setTransactionList((prev) => prev.filter(item => item.id !== dataObj.id));
  }

  const filterTransactionList = (dataObj) => {
    console.log(dataObj, 'dataObj')

    setTransactionFilteredList(transationList)

    setTransactionFilteredList(prev => {
      return prev.filter(obj => {
        const startDate = dayjs(dataObj.startDate, 'DD/MM/YYYY')
        const endDate = dayjs(dataObj.endDate, 'DD/MM/YYYY')
        const currDate = dayjs(obj.date, 'DD/MM/YYYY')

        if(startDate.isSameOrBefore(currDate) && currDate.isSameOrBefore(endDate)){
          if(dataObj.categoryName && dataObj.categoryName.length > 0){
            if(dataObj.categoryName.includes(obj.category)){
              return obj
            }
          }else{
            return obj
          }
        }
      })
    })
  }

  useEffect(() => {
    let dataArr = localStorage.getItem('transactionList')
    if(dataArr && dataArr.length > 0){
      setTransactionList(JSON.parse(dataArr))
    }
  }, [])

  useEffect(() => {
    setTotalBalance(0)
    setTotalIncome(0)
    setTotalOutcome(0)
    if(transationList && transationList.length > 0){
      transationList.forEach(item => {
        setTotalBalance(prev => prev + +item.value)
        if(item.type === 'income'){
          setTotalIncome(prev => prev + +item.value)
        }
        if(item.type === 'outcome'){
          setTotalOutcome(prev => prev + +item.value)
        }
      })
      localStorage.setItem('transactionList', JSON.stringify(transationList))
      setTransactionFilteredList(transationList)
    }else{
      localStorage.removeItem('transactionList')
      setTransactionFilteredList([])
    }
  }, [transationList])

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">

      <section className="w-50">
        <Stack direction="row" spacing={2}>
          <ListItem>Balance: {totalBalance}</ListItem>
          <ListItem>Income: {totalIncome}</ListItem>
          <ListItem>Outcome: {totalOutcome}</ListItem>
        </Stack>
      </section>

      <section>
        {
          transationList && transationList.length > 0 && <TransactionFilter onFilterTransactionList={filterTransactionList} />
        }
      </section>

      <section className="" style={{maxHeight: '350px', width: '50%', overflow: 'auto', margin: '20px'}}>
        <Stack spacing={2}>
          {transationList && transationList.length ? (
            <TransactionList transactionFilteredList={transactionFilteredList} onDeleteRow={deleteRow} />
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} animation="wave" />
            ))
          )}
        </Stack>
      </section>

      <section>

        <Stack direction={'row'} spacing={2}>
          <Button color="success" variant="contained" onClick={handleClickOpen}>
            Add
          </Button>
        </Stack>

      </section>

      {open && (
        <TransactionModal open={open} setOpen={setOpen} onAddTransaction={handleAddTransaction} />
      )}

    </div>
  )
}

export default Transaction