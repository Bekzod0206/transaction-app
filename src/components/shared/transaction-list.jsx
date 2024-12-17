import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

function TransactionList({transactionFilteredList, onDeleteRow}) {
  console.log(transactionFilteredList, 'transactionFilteredList')

  const rowDeleteHandler = (row) => {
    onDeleteRow(row)
  }

  if(!transactionFilteredList || !transactionFilteredList.length){
    return <p>No transactions available.</p>;
  }
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440, overflow: 'auto' }}>
      <Table sx={{ width: '100%', backgroundColor: 'aqua' }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}}>Date</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Transaction type</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Value</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Category</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Description</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionFilteredList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {row.date}
              </TableCell>
              <TableCell align="right">
                <Chip label={row.type} color={row.type === 'income' ? 'primary' : 'error'} />
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="error" size="small" onClick={() => rowDeleteHandler(row)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionList