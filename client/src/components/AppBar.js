import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';

const ButtonAppBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        Cookies.remove('token');
        dispatch(logoutUser());
        navigate('/login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={'/'} style={{ textDecoration: "none", color: "inherit" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Expense Tracker
                    </Typography>
                    <Link to={'/login'} style={{ textDecoration: "none", color: "inherit" }}>
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link to={'/register'} style={{ textDecoration: "none", color: "inherit" }}>
                        <Button color="inherit">Register</Button>
                    </Link>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonAppBar;
