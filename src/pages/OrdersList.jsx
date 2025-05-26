import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiGetAllOredrs } from "../api/orderService";
import OrderDetails from "../components/OrderDetails";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Typography
} from "@mui/material";

const OrdersList = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [arrOrders, setArrOrders] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // חדש

  useEffect(() => {
    bringOrdersFromApi();
  }, [user]);

  const bringOrdersFromApi = () => {
    setIsLoading(true); // לפני הקריאה
    apiGetAllOredrs(user.token)
      .then((res) => {
        if (!res.data.length) {
          setShowMessage(true);
        }
        setArrOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("תקלה בשליפת ההזמנות");
      })
      .finally(() => {
        setIsLoading(false); // אחרי סיום הקריאה
      });
  };

  return (
    <Box sx={{ marginTop: "120px" }}>
      <TableContainer component={Paper} sx={{ direction: "rtl", mt: 4 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          רשימת ההזמנות
        </Typography>

        {isLoading ? (
          <h3 style={{ textAlign: "center", color: "#aaa", fontWeight: "300" }}>...טוען נתונים</h3>

        ) : showMessage ? (
          <Typography sx={{ p: 2 }}>אין הזמנות להצגה כרגע</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">תאריך הזמנה</TableCell>
                <TableCell align="center">סכום הזמנה</TableCell>
                <TableCell align="center">פרטי מזמין</TableCell>
                <TableCell align="center">סטטוס הזמנה</TableCell>
                <TableCell align="center">רשימת הכרטיסים</TableCell>
                <TableCell align="center">כתובת למשלוח</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrOrders.slice().reverse().map((order) => (
                <OrderDetails key={order._id} order={order} />
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default OrdersList;
