import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiUpdateTicketById } from "../api/ticketService";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

/**
 * ======================================================
 * UpdateTicket component - Form for editing an existing event ticket.
 * Loads ticket data from localStorage, pre-fills form, and updates via API.
 * Only accessible to authenticated users.
 * ======================================================
 */

const UpdateTicket = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    const [ticket, setTicket] = useState(null);

  
  /**
   * Load ticket data from localStorage when component mounts.
   * Redirects to /list if ticket data is missing.
   */

    useEffect(() => {
        const storedTicket = JSON.parse(localStorage.getItem("editTicket"));
        if (storedTicket) {
            setTicket(storedTicket);
        } else {
            console.error("לא נמצא כרטיס ב-localStorage");
            navigate("/list");
        }
    }, [navigate]);

//   Converts a date string from dd.mm.yyyy to yyyy-mm-dd format for input[type="date"].
    const formatDate = (date) => {
        if (date) {
            const [day, month, year] = date.split(".");
            return `${year}-${month}-${day}`;
        }
        return "";
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

     /**
   * When ticket data is available, reset the form with existing values.
   */
    useEffect(() => {
        if (ticket) {
            reset({
                name: ticket.name || "",
                description: ticket.description || "",
                Image: ticket.Image || "",
                cost: ticket.cost || "",
                city: ticket.city || "",
                address: ticket.address || "",
                date: formatDate(ticket.date) || "",
                dayOnweek: ticket.dayOnweek || "",
                hour: ticket.hour || ""
            });
        }
    }, [ticket, reset]);

    const onSubmit = (data) => {
        const formattedDate = data.date.split("-").reverse().join(".");
        if (ticket) {
            data.date = formattedDate;
            apiUpdateTicketById(ticket._id, data,
                user.token
                //כאן צריך לשלוח את הטוקן
            )
                .then(() => {
                    localStorage.removeItem("editTicket");
                    alert("העדכון הצליח!");
                    navigate("/list");
                })
                .catch((err) => {
                    console.error(err);
                    alert("שגיאה בעדכון הנתונים");
                });
        }
    };

    const cancel = () => {
        localStorage.removeItem("editTicket");
        navigate("/list");
    };

    // // הצגת טעינה עד שהכרטיס נטען
    // if (!ticket) {
    //     return <Typography align="center">טוען נתונים...</Typography>;
    // }

    return (
        <Box sx={{ marginTop: "120px" }}>
            <Container maxWidth="sm">
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
                    <Typography variant="h4" gutterBottom>עדכון פרטי אירוע</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="שם המוצר"
                            variant="outlined"
                            {...register("name", { required: "שדה חובה" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="תיאור"
                            variant="outlined"
                            {...register("description", { required: "שדה חובה" })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="תמונה (URL)"
                            {...register("Image", { required: "שדה חובה" })}
                            error={!!errors.Image}
                            helperText={errors.Image?.message}
                            margin="normal"
                        />

                        {/* שורה: מחיר + עיר */}
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label="מחיר"
                                type="number"
                                {...register("cost", { required: "שדה חובה" })}
                                error={!!errors.cost}
                                helperText={errors.cost?.message}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="עיר"
                                {...register("city", { required: "שדה חובה" })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                                margin="normal"
                            />
                        </Box>

                        {/* שורה: כתובת + תאריך */}
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label="כתובת"
                                {...register("address", { required: "שדה חובה" })}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="תאריך"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                {...register("date", { required: "שדה חובה" })}
                                error={!!errors.date}
                                helperText={errors.date?.message}
                                margin="normal"
                            />
                        </Box>

                        {/* שורה: יום בשבוע + שעה */}
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label="יום בשבוע"
                                {...register("dayOnweek", { required: "שדה חובה" })}
                                error={!!errors.dayOnweek}
                                helperText={errors.dayOnweek?.message}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="שעה"
                                {...register("hour", { required: "שדה חובה" })}
                                error={!!errors.hour}
                                helperText={errors.hour?.message}
                                margin="normal"
                            />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: "#FFD700",
                                    color: "black",
                                    borderRadius: 2,
                                    width: "20%",
                                    "&:hover": { backgroundColor: "#FFC107" },
                                }} type="submit">
                                שמור
                            </Button>
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: "#FFD700",
                                    color: "black",
                                    borderRadius: 2,
                                    width: "20%",
                                    "&:hover": { backgroundColor: "#FFC107" },
                                }} onClick={cancel}>
                                ביטול
                            </Button>
                        </Box>
                    </form>

                </Box>
            </Container>
        </Box>
    );
};

export default UpdateTicket;
