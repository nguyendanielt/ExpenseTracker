import * as React from 'react';
import { useState } from 'react';
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
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import SortByMenu from './SortByMenu';
import Box from '@mui/material/Box';

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
    const token = Cookies.get('token');
    const user = useSelector((state) => state.auth.user || {});

    const [sortBy, setSortBy] = useState("");
    const leastRecentExpenses = [...expenses].reverse();
    const highToLowExpenses = [...expenses].sort((a, b) => (a.amount < b.amount) ? 1 : -1); // return of 1 is a swap
    const lowToHighExpenses = [...expenses].sort((a, b) => (a.amount > b.amount) ? 1 : -1);

    const deleteExpense = async (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/expense/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert("Deletion successful");
            }
        }
    }

    const formatDate = (date) => {
        return dayjs(date).format('MMM D, YYYY');
    }

    const getCategoryName = (id) => {
        const category = (user.categories)?.find((category) => category._id === id);
        return category ? category.label : "N/A";
    }

    const findTotal = () => {
        let total = 0;
        expenses?.map((expense) => {
            total += expense.amount;
        });
        return total;
    }

    return (
        <Container>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography variant="h6" sx={{ marginTop: 6, marginRight: 4 }}>
                    Your Current Expenses
                </Typography>
                <SortByMenu sortBy={sortBy} setSortBy={setSortBy} />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Amount ($)</StyledTableCell>
                            <StyledTableCell align="center">Category</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(sortBy === "Date: Most Recent" || sortBy === "") &&
                            expenses?.map((expense) => (
                                <StyledTableRow key={expense._id}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {expense.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{expense.amount}</StyledTableCell>
                                    <StyledTableCell align="center">{getCategoryName(expense.categoryId)}</StyledTableCell>
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
                            ))
                        }
                        {sortBy === "Date: Least Recent" &&
                            leastRecentExpenses?.map((leastRecent) => (
                                <StyledTableRow key={leastRecent._id}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {leastRecent.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{leastRecent.amount}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getCategoryName(leastRecent.categoryId)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{formatDate(leastRecent.date)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton 
                                            color="primary" 
                                            component="label"
                                            onClick={() => setEditExpense(leastRecent)} 
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            color="error" 
                                            component="label" 
                                            onClick={() => deleteExpense(leastRecent._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                        {sortBy === "Amount ($): High to Low" &&
                            highToLowExpenses?.map((highToLow) => (
                                <StyledTableRow key={highToLow._id}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {highToLow.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{highToLow.amount}</StyledTableCell>
                                    <StyledTableCell align="center">{getCategoryName(highToLow.categoryId)}</StyledTableCell>
                                    <StyledTableCell align="center">{formatDate(highToLow.date)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton 
                                            color="primary" 
                                            component="label"
                                            onClick={() => setEditExpense(highToLow)} 
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            color="error" 
                                            component="label" 
                                            onClick={() => deleteExpense(highToLow._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                        {sortBy === "Amount ($): Low to High" &&
                            lowToHighExpenses?.map((lowToHigh) => (
                                <StyledTableRow key={lowToHigh._id}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {lowToHigh.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{lowToHigh.amount}</StyledTableCell>
                                    <StyledTableCell align="center">{getCategoryName(lowToHigh.categoryId)}</StyledTableCell>
                                    <StyledTableCell align="center">{formatDate(lowToHigh.date)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton 
                                            color="primary" 
                                            component="label"
                                            onClick={() => setEditExpense(lowToHigh)} 
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            color="error" 
                                            component="label" 
                                            onClick={() => deleteExpense(lowToHigh._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                        <StyledTableRow>
                            <StyledTableCell align="center">
                                <b>Total:</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>{findTotal()}</b>
                            </StyledTableCell>
                            <StyledTableCell />
                            <StyledTableCell />
                            <StyledTableCell />
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ExpensesTable;
