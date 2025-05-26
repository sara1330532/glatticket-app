import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Person } from "@mui/icons-material";
import { Badge, Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";

import logo from "../assets/logo1.webp";

// ======================================================
// Main Navigation Component (NavBar)
// This component displays a fixed navigation menu at the top of the event ticket booking site.
// It includes links to various pages, a shopping cart, and login/profile options,
// depending on the user's status (guest, regular user, or admin).
// ======================================================

const NavBar = () => {
    
    const cartItems = useSelector(state => state.cart.arr);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const user = useSelector(state => state.user.currentUser);

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "10%",
                zIndex: 1000,
                backgroundColor: "#e0e0e0",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                padding: "10px 0",
                borderBottom:"0.5px solid black"
            }}
        >
            <Box
                sx={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 24px",
                }}
            >
                {/* לוגו */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="Logo" style={{ width: "80px" }} />
                </Box>

                {/* קישורים */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
                    <span
                        onClick={() => {
                            const aboutSection = document.getElementById("about");
                            if (aboutSection) {
                                aboutSection.scrollIntoView({ behavior: "smooth" });
                                
                            }
                        }}
                        style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: 500,
                            fontSize: '1rem',
                            
                        }}
                    >
                        אודות
                    </span>
                    <NavLink to="list"
                        style={({ isActive }) =>
                        ({
                            textDecoration: "none",
                            color: "black",
                            borderBottom: isActive ? "1px solid #FFD700" : "none",
                        })}>
                        אירועים קרובים
                    </NavLink>

                    {!user && (
                        <>
                            <NavLink to="cart"
                                style={({ isActive }) =>
                                ({
                                    textDecoration: "none",
                                    color: "black",
                                    borderBottom: isActive ? "1px solid #FFD700" : "none",
                                })}>
                                <Badge
                                    badgeContent={totalItems}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            backgroundColor: "#FFD700",
                                            color: "black",

                                        }
                                    }}
                                >
                                    <ShoppingCart />
                                </Badge>
                            </NavLink>
                            <NavLink to="login">
                                <Avatar sx={{ bgcolor: "#FFD700", color: "black" }}>
                                    <Person />
                                </Avatar>
                            </NavLink>
                        </>
                    )}

                    {user && user.role === "USER" && (
                        <>
                            <NavLink to="cart" style={{ textDecoration: "none", color: "black" }}>
                                <Badge
                                    badgeContent={totalItems}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            backgroundColor: "#FFD700",
                                            color: "black"
                                        }
                                    }}
                                >
                                    <ShoppingCart />
                                </Badge>
                            </NavLink>
                                <Avatar sx={{ bgcolor: "#FFD700", color: "black" }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                            <NavLink to="exit"
                                style={({ isActive }) =>
                                ({
                                    textDecoration: "none",
                                    color: "black",
                                    borderBottom: isActive ? "1px solid #FFD700" : "none",
                                })}>
                                יציאה
                            </NavLink>
                        </>
                    )}

                    {user && user.role === "ADMIN" && (
                        <>
                            <NavLink to="add-ticket"
                                style={({ isActive }) =>
                                ({
                                    textDecoration: "none",
                                    color: "black",
                                    borderBottom: isActive ? "1px solid #FFD700" : "none",
                                })}>
                                הוסף אירוע
                            </NavLink>

                            <NavLink to="all-orders"
                                style={({ isActive }) =>
                                ({
                                    textDecoration: "none",
                                    color: "black",
                                    borderBottom: isActive ? "1px solid #FFD700" : "none",
                                })}>
                                 הזמנות
                            </NavLink>
                                <Avatar sx={{ bgcolor: "#FFD700", color: "black" }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                            <NavLink to="exit"
                                style={({ isActive }) =>
                                ({
                                    textDecoration: "none",
                                    color: "black",
                                    borderBottom: isActive ? "1px solid #FFD700" : "none",
                                })}>
                                יציאה
                            </NavLink>
                        </>
                    )}
                </Box>
            </Box>
        </nav>
    );
};

export default NavBar;
