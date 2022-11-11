import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Container } from '@mui/system';
import Cookies from 'js-cookie';

const ExpenseForm = ({ getExpenses, editExpense, setEditExpense }) => {
    const initialForm = {
        description: "",
        amount: 0,
        date: new Date()
    };

    const token = Cookies.get('token');

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (editExpense.description !== undefined || editExpense.amount !== undefined) {
            setForm(editExpense);
        }
    }, [editExpense]);

    getExpenses();

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleDate = (newValue) => {
        setForm({ ...form, date: newValue });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (editExpense.description === undefined && editExpense.amount === undefined) {
            // submit form details to server for expense creation
            const res = await fetch(`${process.env.REACT_APP_API_URL}/expense`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    'content-type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert("Submission successful");
                setForm(initialForm);  // clear form
            }
        } else {
            // submit form details to server for expense updating
            const res = await fetch(`${process.env.REACT_APP_API_URL}/expense/${editExpense._id}`, {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: {
                    'content-type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert("Update successful");
                setForm(initialForm);
                setEditExpense({});      // to change button back to submit after update
            }
        }
    }
    
    return (
        <Container>
            <Card sx={{ minWidth: 275, marginTop: 5 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>New Expense</Typography>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="p">
                            <TextField 
                                sx={{ marginRight: 2 }}
                                size="small"
                                id="outlined-basic" 
                                label="Description" 
                                variant="outlined"
                                name="description"
                                onChange={handleChange} 
                                value={form.description} 
                            />
                            <TextField 
                                sx={{ marginRight: 2 }}
                                size="small"
                                id="outlined-basic" 
                                label="Amount ($)" 
                                variant="outlined" 
                                name="amount"
                                onChange={handleChange} 
                                value={form.amount} 
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Date of Expense"
                                    inputFormat="MM/DD/YYYY"
                                    onChange={handleDate}
                                    value={form.date}
                                    renderInput={(params) => <TextField sx={{ marginRight: 2 }} size="small" {...params} />}
                                />
                            </LocalizationProvider>
                            {(editExpense.description === undefined && editExpense.amount === undefined) ? (
                                <Button type="submit" variant="contained" color="success">Submit</Button>
                            ) : (
                                <Button type="submit" variant="outlined" color="success">Update</Button>
                            )}
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ExpenseForm;

