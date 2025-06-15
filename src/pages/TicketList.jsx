import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

import { apiGetAllTickets, apiDeleteTicketById, apiUpdateTicketById } from "../api/ticketService";
import { addToCart } from "../features/cartSlice";

import Ticket from "../components/Ticket";
import ReducedCart from "../components/ReducedCart";

import { Button, Box, InputBase, Paper, IconButton } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * ======================================================
 * TicketList Component
 * Displays a paginated and searchable list of event tickets.
 * Allows users to search, add tickets to cart, delete or update tickets (if admin),
 * and load more items. Includes a reduced cart preview.
 * ======================================================
 */

const TicketList = () => {
  const [arr, setArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

    // === RESPONSIVE GRID LOGIC ===
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const columnsCount = isSmall ? 2 : isMedium ? 3 : 4;

  useEffect(() => {
    bringFromServer(currentPage);
  }, [currentPage]);

  const bringFromServer = (page) => {
    setIsLoading(true);
    apiGetAllTickets(page)
      .then((res) => {
        if (res.data.length < 6 || res.data.length === 0) {
          setHasMore(false);
        }
        setArr((prevArr) => [...prevArr, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
        alert("תקלה בשליפת המוצרים");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Memoized filter for search input
  const filteredTickets = useMemo(() => {
    return arr.filter((ticket) =>
      ticket.name?.toLowerCase().includes(searchText.trim().toLowerCase())
    );
  }, [arr, searchText]);

  const numResultFilter = filteredTickets?.length;

  //Handle add-to-cart action, show cart for 3 seconds
  const onAddToCart = (ticket) => {
    dispatch(addToCart(ticket));
    setShowCart(true);
    setTimeout(() => setShowCart(false), 3000);
  };

  //Confirm and delete a ticket by ID
  const deleteTicket = (id) => {
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!לא תוכל לשחזר את הכרטיס לאחר המחיקה",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "!כן, מחק",
      cancelButtonText: "ביטול",
    }).then((result) => {
      if (result.isConfirmed) {
        apiDeleteTicketById(id, user.token)
          .then((res) => {
            setArr(arr.filter((ticket) => ticket._id !== id));
            alert("הכרטיס נמחק בהצלחה");
          })
          .catch((err) => {
            console.log(err);
            alert("תקלה במחיקת מוצר");
          });
      }
    });
  };

  //Update ticket handler - (Currently not used directly here)
  const updateTicket = (data) => {
    apiUpdateTicketById(storedTicket._id, data, user.token)
      .then(() => {
        localStorage.removeItem("editTicket");
        navigate("/list");
      })
      .catch(() => alert("תקלה בעדכון המוצר"));
  };


  //Load next page of tickets
  const loadMoreTickets = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Box sx={{ marginTop: "120px" }}>
        {showCart && <ReducedCart />}
        <div>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: 300,
              margin: "20px auto",
              borderRadius: "30px",
              padding: "2px 10px",
              backgroundColor: "rgb(204, 204, 204)",
              direction: "rtl",
              color: "white",
            }}
            elevation={3}
          >
            {searchText && (
              <IconButton
                sx={{ p: "10px", color: "black", cursor: "pointer" }}
                onClick={() => setSearchText("")}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            <InputBase
              sx={{ ml: 1, flex: 1, color: "black" }}
              placeholder=" חפשו אירוע "
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              inputProps={{ "aria-label": "חיפוש" }}
            />
            <SearchIcon sx={{ p: "10px", color: "black" }} />
          </Paper>

          {searchText && <h3>מצאנו לך {numResultFilter} תוצאות</h3>}

          {searchText && (
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
                gap: 5,
                listStyleType: "none",
              }}
            >
              {filteredTickets.map((item) => (
                <li key={item._id}>
                  <Ticket
                    ticket={item}
                    onAddToCart={onAddToCart}
                    deleteTicket={deleteTicket}
                    updateTicket={updateTicket}
                  />
                </li>
              ))}
            </ul>
          )}

          <Box sx={{ borderTop: "1px solid black", width: "100%", mb: 4 }} />

          <h3>אירועים בגלאטיקט</h3>
          <Outlet />

          {isLoading ? (
            <h3 style={{ textAlign: "center", color: "#aaa" ,fontWeight:"300"}}>...טוען נתונים</h3>
          ) : (
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
                gap: 5,
                listStyleType: "none",
              }}
            >
              {arr.map((item) => (
                <li key={item._id}>
                  <Ticket
                    ticket={item}
                    onAddToCart={onAddToCart}
                    deleteTicket={deleteTicket}
                    updateTicket={updateTicket}
                  />
                </li>
              ))}
              {hasMore && (
                <li>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFD700",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: 5,
                      top: "60%",
                      width: "60%",
                      "&:hover": { backgroundColor: "#FFC107" },
                      "@keyframes pulse": {
                        from: { transform: "scale(1)" },
                        to: { transform: "scale(1.08)" },
                      },
                      animation: "pulse 1.5s infinite alternate ease-in-out",
                    }}
                    onClick={loadMoreTickets}
                  >
                    תן לי עוד
                  </Button>
                </li>
              )}
            </ul>
          )}
        </div>
      </Box>
    </>
  );
};

export default TicketList;
