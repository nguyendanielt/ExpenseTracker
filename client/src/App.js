import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import AppBar from './components/AppBar';
import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlice';

const App = () => {
    const token = Cookies.get('token');
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    
    const getUser = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            const user = await res.json();
            dispatch(setUser(user)); 
        }

        setIsLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div>
            <AppBar />
            <Outlet />
        </div>
    );
}

export default App;
