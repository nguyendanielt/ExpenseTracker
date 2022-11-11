import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';

const CategoryForm = ({ editCategory, setEditCategory }) => {
    const initialForm = {
        label: ""
    };

    const token = Cookies.get('token');
    const user = useSelector((state) => state.auth.user || {});
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (editCategory._id !== undefined) {
            setForm(editCategory);
        }
    }, [editCategory]);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (editCategory._id === undefined) {
            // submit form details to server for category creation
            const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    'content-type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                const updatedUser = { 
                    ...user, 
                    categories: [...user.categories, { ...form }]
                };
                dispatch(setUser({ user: updatedUser }));
                alert("Submission successful");
                // setForm(initialForm);
                window.location.reload();
            }
        } else {
            // submit form details to server for category updating
            const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${editCategory._id}`, {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: {
                    'content-type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                const updatedUser = { 
                    ...user, 
                    categories: user.categories.map((category) => category._id == editCategory._id ? form : category) 
                };
                dispatch(setUser({ user: updatedUser }));
                alert("Update successful");
                // setForm(initialForm);
                // setEditCategory({});
                window.location.reload();
            }
        }
    }
    
    return (
        <Container>
            <Card sx={{ minWidth: 275, marginTop: 5 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Add/Edit Category</Typography>
                    <Box component="form" sx={{ display: "flex" }} onSubmit={handleSubmit}>
                        <TextField 
                            sx={{ marginRight: 2 }}
                            size="small"
                            id="outlined-basic" 
                            label="Label" 
                            variant="outlined"
                            name="label"
                            onChange={handleChange} 
                            value={form.label} 
                        />
                        {(editCategory._id === undefined) ? (
                            <Button type="submit" variant="contained" color="success">Submit</Button>
                        ) : (
                            <Button type="submit" variant="outlined" color="success">Update</Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CategoryForm;