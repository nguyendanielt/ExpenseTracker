import { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Cookies from 'js-cookie';

const Home = () => {
    const [expenses, setExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState({});

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        const token = Cookies.get('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/expense`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        setExpenses(data);
    }

    return (
        <div>
            <ExpenseForm 
                getExpenses={getExpenses} 
                editExpense={editExpense} 
                setEditExpense={setEditExpense} 
            />
            <ExpensesTable 
                expenses={expenses} 
                setEditExpense={setEditExpense} 
            />
        </div>
    );
}

export default Home;