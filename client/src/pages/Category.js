import * as React from 'react';
import { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import CategoryForm from '../components/CategoryForm';

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

const Category = () => {
    const token = Cookies.get('token');
    const dispatch = useDispatch();
    const [editCategory, setEditCategory] = useState({});
    const user = useSelector((state) => state.auth.user || {});

    const deleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                const updatedUser = { 
                    ...user, 
                    categories: user.categories.filter((category) => category._id != id) 
                };
                dispatch(setUser({ user: updatedUser }));
                alert("Deletion successful");
            }
        }
    }

    return (
        <Container>
            <CategoryForm editCategory={editCategory} setEditCategory={setEditCategory} />
            <Typography variant="h6" sx={{ marginTop: 5 }}>List of Categories</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Label</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.categories?.map((category) => (
                            <StyledTableRow key={category._id}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {category.label}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton 
                                        color="primary" 
                                        component="label"
                                        onClick={() => setEditCategory(category)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        color="error" 
                                        component="label" 
                                        onClick={() => deleteCategory(category._id)}
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

export default Category;