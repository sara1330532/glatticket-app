import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiAddOrder } from "../api/orderService";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { clearCart } from "../features/cartSlice";

//=================================================================
// Checkout - order summary form with payment and shipping details.
//=================================================================

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const cartItems = useSelector(state => state.cart.arr);
    const totalCartPrice = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const today = new Date().toISOString().split("T")[0];
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    const targetDateString = targetDate.toISOString().split("T")[0];

    useEffect(() => {
        if (!user) {
            navigate("/login?redirect=checkout");
        }
    }, [user, navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.username || "",
            email: user?.email || "",
            finallCost: totalCartPrice,
            creditNumber: "",
            threeDigits: "",
            address: "",
            validity: "",
            orderDate: today,
            targetDate: targetDateString
        }
    });

    // Handles order submission, calls API, clears cart, and navigates on success

    const onSubmit = (data) => {
        apiAddOrder({
            date: data.orderDate,
            dateDeadline: data.targetDate,
            addressSent: data.address,
            userId: user._id,
            products: cartItems.map(item => ({
                product: item,
                quantity: item.quantity
            })),
            finallCost: data.finallCost,
            pay: {
                creditNumber: data.creditNumber,
                threeDigits: data.threeDigits,
                validity: data.validity,
            },
        }, user.token)
            .then(() => {
                dispatch(clearCart());
                navigate("/thank-you?redirect=checkout");
            })
            .catch(err => {
                console.error(err);
                alert(`שגיאה בשמירת ההזמנה\n${err.message}`);
            });
    };

    return (
        <Box sx={{ marginTop: "100px" }}>
            <Container maxWidth="sm">
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
                    <Typography variant="h4" gutterBottom>הזמנת מוצרים</Typography>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="שם"
                            variant="outlined"
                            margin="normal"
                            {...register("name", { required: "שם הוא שדה חובה" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            disabled
                        />

                        <TextField
                            fullWidth
                            label="אימייל"
                            variant="outlined"
                            margin="normal"
                            type="email"
                            {...register("email", { required: "אימייל הוא שדה חובה" })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            disabled
                        />

                        <TextField
                            fullWidth
                            label="כתובת למשלוח"
                            variant="outlined"
                            margin="normal"
                            {...register("address", { required: "כתובת היא שדה חובה" })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label="תאריך הזמנה"
                                variant="outlined"
                                margin="normal"
                                type="date"
                                {...register("orderDate")}
                                InputLabelProps={{ shrink: true }}
                                disabled
                            />

                            <TextField
                                fullWidth
                                label="תאריך יעד"
                                variant="outlined"
                                margin="normal"
                                type="date"
                                {...register("targetDate")}
                                InputLabelProps={{ shrink: true }}
                                disabled
                            />
                        </Box>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label={'סה"כ לתשלום'}

                                variant="outlined"
                                margin="normal"
                                type="number"
                                {...register("finallCost", { required: "סכום הוא שדה חובה" })}
                                error={!!errors.finallCost}
                                helperText={errors.finallCost?.message}
                                disabled
                            />

                            <TextField
                                fullWidth
                                label="מספר כרטיס אשראי"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                {...register("creditNumber", {
                                    required: "מספר כרטיס אשראי הוא חובה",
                                    minLength: { value: 16, message: "מספר כרטיס חייב להיות 16 ספרות" },
                                    maxLength: { value: 16, message: "מספר כרטיס חייב להיות 16 ספרות" }
                                })}
                                error={!!errors.creditNumber}
                                helperText={errors.creditNumber?.message}
                            />
                        </Box>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label="תוקף (MM/YY)"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                {...register("validity", {
                                    required: "תוקף הוא שדה חובה",
                                    pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "תוקף חייב להיות בפורמט MM/YY" }
                                })}
                                error={!!errors.validity}
                                helperText={errors.validity?.message}
                            />

                            <TextField
                                fullWidth
                                label="3 ספרות בגב הכרטיס"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                {...register("threeDigits", {
                                    required: "קוד CVV הוא חובה",
                                    minLength: { value: 3, message: "חייב להיות 3 ספרות" },
                                    maxLength: { value: 3, message: "חייב להיות 3 ספרות" }
                                })}
                                error={!!errors.threeDigits}
                                helperText={errors.threeDigits?.message}
                            />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    backgroundColor: "#FFD700",
                                    color: "black",
                                    borderRadius: 2,
                                    width: "100%",
                                    "&:hover": { backgroundColor: "#FFC107" }
                                }}
                            >
                                שלם עכשיו
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default Checkout;