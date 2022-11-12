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

    // don't render anything if expenses haven't been fetched
    if (expenses.length === 0) {
        return <div />;
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