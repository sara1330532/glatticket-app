import {
  Box,
  Button,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import Swal from "sweetalert2";

import React, { use, useEffect, useState } from "react";
import { apiGetUserById } from "../api/userService";
import OrderTickets from "./OrderTickets";
import { apiUpdateOrderSentById } from "../api/orderService";
import { useSelector } from "react-redux";

// ======================================================
// OrderDetails Component
// This component displays detailed information for a single order.
// It shows user info, order status, cost, address, and ordered tickets.
// Admins can confirm the order through a SweetAlert confirmation dialog.
// ======================================================

const OrderDetails = ({ order }) => {
  const [userData, setUserData] = useState(null);
  const [showTickets, setShowTickets] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(order.isSent);

  const user = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiGetUserById(order.userId);
        setUserData(res.data);
      } catch (err) {
        console.error("שגיאה בקבלת פרטי משתמש:", err);
      }
    };
    fetchUser();
  }, [order.userId]);

  const orderConfirmation = () => {
    Swal.fire({
      title: "?האם אתה בטוח שברצונך לאשר את ההזמנה",
      text: "!לא תוכל לבטל לאחר אישור ההזמנה",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "כן, אשר",
      cancelButtonText: "ביטול"
    }).then((result) => {
      if (result.isConfirmed) {
        apiUpdateOrderSentById(order._id, user.token)
          .then((res) => {
            console.log(res.data);
            setIsConfirmation(true);
            Swal.fire("ההזמנה אושרה!", "", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("שגיאה באישור ההזמנה", err.response?.data?.message || "", "error");
          });
      }
    });
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{new Date(order.date).toLocaleDateString()}</TableCell>
        <TableCell align="center">{order.finallCost} ₪</TableCell>
        <TableCell>
          <Box textAlign="right">
            <Typography>{userData?.username}</Typography>
            <Typography>{userData?.email}</Typography>
            <Typography>{userData?.phone}</Typography>
          </Box>
        </TableCell>
        <TableCell align="center">
          {isConfirmation ? "אושר" : "בהמתנה לאישור"}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            onClick={() => setShowTickets(prev => !prev)}
            sx={{
              color: '#FFD700',
              borderColor: '#FFD700',
              '&:hover': {
                borderColor: 'gold',
                color: 'gold',
              }
            }}
          >
            {showTickets ? " סגור כרטיסים" : " לצפייה בכרטיסים"}
          </Button>
        </TableCell>
        <TableCell align="center">{order.addressSent}</TableCell>
        <TableCell align="center">
          {!isConfirmation && <Button
            variant="contained"
            onClick={() => orderConfirmation()}
            sx={{
              backgroundColor: "#FFD700", // צהוב
              color: "black",

              "&:hover": { backgroundColor: "#FFC107" },
            }}>
            לאישור הזמנה
          </Button>}
          {isConfirmation && <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD700", // צהוב
              color: "black",

              "&:hover": { backgroundColor: "#FFC107" },
            }}>
            למעקב הזמנה
          </Button>}
        </TableCell>
      </TableRow>

      {showTickets && (
        <TableRow>
          <TableCell colSpan={10}>
            <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 1 }}>
              <OrderTickets arrtickets={order.products} />
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default OrderDetails;
