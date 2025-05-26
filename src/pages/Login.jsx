import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../api/userService';
import { userIn } from '../features/userSlice';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import Checkout from './Checkout';
import { color } from 'framer-motion';

//==============================================================================
// Login page - handles user login and redirects after successful authentication
//==============================================================================

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    

    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get("redirect") === "checkout" ? "/checkout" : "/list";
    const save = (data) => {
        loginUser(data.username, data.password).then(
            res => {
                console.log(res);
                alert("נכנסת בהצלחה");
                dispatch(userIn(res.data));
                navigate(redirect);
            }
        ).catch(err => {
            console.log(err);
            alert("שגיאה בהתחברות" + err.response?.data?.message);
        });
    };
   

    return (
        <Box sx={{marginTop:"120px"}}>
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>התחברות</Typography>
                <form onSubmit={handleSubmit(save)} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="שם משתמש"
                        variant="outlined"
                        margin="normal"
                        {...register('username', { required: 'שדה זה חובה' })}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                    />
                    <TextField
                        fullWidth
                        label="סיסמא"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        {...register('password', { required: 'שדה זה חובה' })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        
                        type="submit"
                        sx={{ margiFnTop: 2,backgroundColor: "#FFD700", color: "black" }}
                    >
                        התחבר
                    </Button>
                    <Link to="/signup" style={{color:"blue",textDecoration: "underline", cursor: "pointer"}}>צרו חשבון עכשיו</Link>
                </form>
            </Box>
        </Container>
        </Box>
    );
};

export default Login;
