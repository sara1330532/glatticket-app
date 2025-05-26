import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiAddUser } from '../api/userService';
import { userIn } from '../features/userSlice';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
//=============================================================
// SignUp page - handles user registration with form validation
//=============================================================

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const save = (data) => {
        apiAddUser(data).then(res => {
            
            dispatch(userIn(res.data.user));
            console.log("User after signup:", res.data);
            alert("המשתמש נרשם בהצלחה!");
            navigate("/list");
        })
        .catch(err => {
            console.log(err);
            alert("שגיאה בהרשמה");
        });
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Box sx={{marginTop:"120px"}}>
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>הרשמה</Typography>
                <form onSubmit={handleSubmit(save)} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="שם משתמש"
                        variant="outlined"
                        margin="normal"
                        {...register("username", { required: "שם משתמש הוא שדה חובה" })}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                    />
                    <TextField
                        fullWidth
                        label="סיסמא"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        {...register("password", {
                            required: "סיסמא היא שדה חובה",
                            pattern: { value: /[a-zA-Z0-9]{5,}/, message: "הסיסמא חייבת להיות לפחות 5 תווים/ספרות" }
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    <TextField
                        fullWidth
                        label="טלפון"
                        variant="outlined"
                        margin="normal"
                        {...register("phone", { required: "טלפון הוא שדה חובה" })}
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ''}
                    />
                    <TextField
                        fullWidth
                        label="אימייל"
                        variant="outlined"
                        margin="normal"
                        {...register("email", {
                            required: "אימייל הוא שדה חובה",
                            pattern: { value: /[a-zA-Z0-9]{2,7}@gmail.com$/, message: "האימייל חייב להיות בפורמט נכון" }
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                    <Button 
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ marginTop: 2,backgroundColor: "#FFD700", color: "black" }}
                    >
                        הרשמה
                    </Button>
                </form>
            </Box>
        </Container>
        </Box>
    );
};

export default SignUp;
