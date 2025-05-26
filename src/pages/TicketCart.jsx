import { useSelector } from "react-redux";
import TicketInCart from "../components/TicketInCart";
import { useNavigate } from 'react-router-dom';
import Checkout from "./Checkout";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
//==================================================================
// TicketCart component - displays tickets in cart and order summary
//==================================================================

const TicketCart = () => {

  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cart.arr); 

  // Calculate total number of tickets in the cart
  const totalTickets = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price of all tickets in the cart
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const navigate = useNavigate();

  const MoveToFinishOrder = () => {
    navigate("/checkout");
  };

  return (      
      <Box sx={{marginTop:"120px"}}>
    <div>
      <h2>הכרטיסים שהזמנת</h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", background: "#f9f9f9" }}>
          <h3>עדיין לא הזמנת כרטיסים </h3>
          <p>בחר כרטיסים מהמבחר שלנו והוסף אותם לסל!</p>
        </div>
      ) : (
        <>
          <ul style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 5,
            listStyleType: "none"
          }}>
            {cartItems.map(item => (
              <li key={item._id}><TicketInCart ticket={item} /></li>
            ))}
          </ul>

          {/* סיכום ההזמנה המעוצב */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Card
              sx={{
                width: 380,
                boxShadow: 3,
                borderRadius: 3,
                backgroundColor: "#f0f0f0",
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  סיכום ההזמנה
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  סך כל הכרטיסים: {totalTickets}
                </Typography>
                <Typography variant="h6" sx={{  mb: 2 }}>
                  סה"כ לתשלום: ₪{totalCartPrice}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFD700",
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: 3,
                    "&:hover": { backgroundColor: "#FFC107" },
                  }}
                  onClick={MoveToFinishOrder}
                >
                  סיים הזמנה
                </Button>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </div>
    </Box>
  );
};

export default TicketCart;
