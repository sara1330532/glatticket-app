import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiAddTickets } from "../api/ticketservice";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

// ======================================================
// AddTicket component - Form for adding new event tickets.
// Handles form validation and submission to API with user authentication.
// ======================================================

const AddTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const save = (data) => {
    const formattedDate = data.date.split("-").reverse().join(".");
    apiAddTickets({
      name: data.ticketname,
      description: data.description,
      Image: data.Image,
      cost: data.cost,
      city: data.city,
      address: data.address,
      date: formattedDate,
      dayOnweek: data.dayOnweek,
      hour: data.hour
    }, user.token)
      .then(() => {
        navigate("/thank-you");
      })
      .catch(err => {
        console.error(err);
        alert(`שגיאה בהוספת המוצר \n${err.message}`);
      });
  };

  return (
    <Box sx={{ marginTop: "100px" }}>
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
          <Typography variant="h4" gutterBottom>הוסף אירוע</Typography>

          <form onSubmit={handleSubmit(save)} style={{ width: "100%" }}>

            <TextField
              fullWidth
              label="שם האירוע"
              variant="outlined"
              {...register("ticketname", { required: "שם האירוע הוא שדה חובה" })}
              error={!!errors.ticketname}
              helperText={errors.ticketname?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="תיאור"
              variant="outlined"
              {...register("description", { required: "תיאור הוא שדה חובה" })}
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="תמונה (URL)"
              variant="outlined"
              {...register("Image", { required: "שדה התמונה הוא חובה" })}
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
                variant="outlined"
                {...register("cost", { required: "מחיר הוא שדה חובה" })}
                error={!!errors.cost}
                helperText={errors.cost?.message}
                margin="normal"
              />
              <TextField
                fullWidth
                label="עיר"
                variant="outlined"
                {...register("city", { required: "עיר היא שדה חובה" })}
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
                variant="outlined"
                {...register("address", { required: "כתובת היא שדה חובה" })}
                error={!!errors.address}
                helperText={errors.address?.message}
                margin="normal"
              />
              <TextField
                fullWidth
                label="תאריך"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                {...register("date", { required: "תאריך הוא שדה חובה" })}
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
                variant="outlined"
                {...register("dayOnweek", { required: "יום בשבוע הוא שדה חובה" })}
                error={!!errors.dayOnweek}
                helperText={errors.dayOnweek?.message}
                margin="normal"
              />
              <TextField
                fullWidth
                label="שעה"
                variant="outlined"
                {...register("hour", { required: "שעה היא שדה חובה" })}
                error={!!errors.hour}
                helperText={errors.hour?.message}
                margin="normal"
              />
            </Box>

            {/* כפתור הוספה */}
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
                הוסף אירוע
              </Button>
            </Box>

          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AddTicket;
