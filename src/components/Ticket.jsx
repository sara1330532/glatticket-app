import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ======================================================
// Ticket Component
// Renders a ticket card with details and actions based on user role.
// Supports add to cart, delete, update, and navigation to details page.
// ======================================================
const Ticket = ({ ticket, onAddToCart,deleteTicket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false); 
  const user = useSelector(state => state.user.currentUser);

// Handles navigation to update ticket page by storing ticket data locally.
  const MoveToUpdateTicket = () => {
    localStorage.setItem("editTicket", JSON.stringify(ticket)); // שמירת המוצר בלוקלסטורייג'
    navigate("/update-ticket");
  };
  return (
    <Card
      sx={{
        maxWidth: 300,
        m: 2,
        boxShadow: 3,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* תמונה */}
      <CardMedia
        component="img"
        sx={{ height: "80%", objectFit: "cover" }}
        image={ticket.Image}
        alt={ticket.name}
      />

      {/* כפתור לפרטים צף */}
      {hover && (<Link to={"details/" + ticket._id}>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "60%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFD700",
            color: "black",
            borderRadius: 5,
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#FFC107" },
            outline: 'none', 
        border: 'none',
          }}
        >
          לפרטים
        </Button></Link>
      )}

      {/* פרטי האירוע */}
      <CardContent sx={{ textAlign: "center", padding: "8px 16px" }}>
        <Typography variant="body2" color="text.secondary">
          {ticket.date} | {ticket.dayOnweek} | {ticket.hour}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginY: "4px" }}>
          {ticket.name}
        </Typography>

       
        {user&&user.role === "ADMIN" && (
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1, gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFD700", 
                color: "black",
                borderRadius: 2,
                width: "50%", 
                "&:hover": { backgroundColor: "#FFC107" },
              }}
              onClick={()=>deleteTicket(ticket._id )}
            >
              מחק
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFD700", 
                color: "black",
                borderRadius: 2,
                width: "50%", 
                "&:hover": { backgroundColor: "#FFC107" },
              }}
              onClick={MoveToUpdateTicket}
            >
              עדכן
            </Button>
          </Box>
        )}

        {(!user || user.role == "USER") && (<Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD700", 
              color: "black",
              borderRadius: 5,
              width: "70%",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
            onClick={() => onAddToCart(ticket)}
          >
            הזמן כעת
          </Button>
        </Box>)}

      </CardContent>
    </Card>
  );
};

export default Ticket;
