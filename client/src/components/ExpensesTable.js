import * as React from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ExpensesTable = ({ expenses, setEditExpense }) => {
    const deleteExpense = async (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/expense/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Deletion successful");
            }
        }
    }

    const formatDate = (date) => {
        return dayjs(date).format('MMM D, YYYY');
    }

    return (
        <Container>
            <Typography variant="h6" sx={{ marginTop: 5 }}>Your Current Expenses</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Amount ($)</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses?.map((expense) => (
                            <StyledTableRow key={expense._id}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {expense.description}
                                </StyledTableCell>
                                <StyledTableCell align="center">{expense.amount}</StyledTableCell>
                                <StyledTableCell align="center">{formatDate(expense.date)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton 
                                        color="primary" 
                                        component="label"
                                        onClick={() => setEditExpense(expense)} 
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        color="error" 
                                        component="label" 
                                        onClick={() => deleteExpense(expense._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ExpensesTable;