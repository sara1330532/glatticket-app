import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, reductionFromCart, addToCart } from "../features/cartSlice";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

// ======================================================
// TicketInCart Component
// Displays a ticket inside the shopping cart with quantity controls and total price.
// ======================================================

const TicketInCart = ({ ticket }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const totalPrice = ticket.quantity * ticket.cost; //calculate the total price

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
    >
      {/* תמונה */}
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "cover" }}
        image={ticket.Image}
        alt={ticket.name}
      />

      <CardContent sx={{ textAlign: "center", padding: "8px 16px" }}>
        <Typography variant="body2" color="text.secondary">
          {ticket.date} | {ticket.dayOnweek} | {ticket.hour}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginY: "4px" }}>
          {ticket.name}
        </Typography>
        <Typography variant="body1">
          מחיר לכרטיס: ₪{ticket.cost}
        </Typography>
        <Typography variant="body1">
          כמות: {ticket.quantity}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          סה"כ: ₪{totalPrice}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2, gap: 1 }}>
          {/* button for increas quentity*/ }
          <Button
            onClick={() => dispatch(addToCart(ticket))}
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "black",
              borderRadius: 2,
              minWidth: "32%",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
          >
            +
          </Button>
          {/*button for decrease quentity*/ }
          <Button
            onClick={() => dispatch(reductionFromCart(ticket))}
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "black",
              borderRadius: 2,
              minWidth: "32%",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
          >
            -
          </Button>
          {/*button for remove ticket  */}
          <Button
            onClick={() => dispatch(removeFromCart(ticket))}
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "black",
              borderRadius: 2,
              minWidth: "32%",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
          >
            🗑️
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketInCart;
