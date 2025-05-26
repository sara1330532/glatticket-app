import { useSelector } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";

// ======================================================
// ReducedCart Component
// This component displays a compact view of the user's cart,
// showing selected tickets with name, price, and quantity.
// Positioned fixed at the bottom-left corner of the screen.
// ======================================================

const ReducedCart = () => {
  const cartItems = useSelector((state) => state.cart.arr); // קבלת המוצרים בסל מרידקס

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        width: 250,
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
        : הכרטיסים שהזמנתם
      </Typography>

      <Box sx={{ maxHeight: 300,maxWidth:500, overflowY: "auto" }}>
        {cartItems.map((item) => (
          <Box
            key={item._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 2,
              borderBottom: "1px solid #ddd",
              paddingBottom: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {item.name}
            </Typography>
            <Typography variant="body2">מחיר: ₪{item.cost}</Typography>
            <Typography variant="body2">כמות: {item.quantity}</Typography>
          </Box>
        ))}
      </Box>

      {/* אם הסל ריק */}
      {cartItems.length === 0 && (
        <Typography variant="body2" sx={{ textAlign: "center", marginTop: 2 }}>
          הסל ריק
        </Typography>
      )}
    </Paper>
  );
};

export default ReducedCart;
