import React, { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
//=========================================================================
// ThankYou page - shows confirmation message after order or event creation
//=========================================================================

const ThankYou = () => {
    const navigate = useNavigate();
    const location=useLocation();
    const searchParams = new URLSearchParams(location.search);
    const textForThanks = searchParams.get("redirect") === "checkout" ? "  ההזמנה שלך התקבלה בהצלחה. שמחנו לעמוד לשירותך!" : "האירוע נוסף בהצלחה כעת תוכל לראות את פרטי האירוע ברשימת האירועים";

    return (
        <Box sx={{marginTop:"120px"}}>
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                    textAlign: "center",
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
                </motion.div>

                <Typography variant="h4" gutterBottom sx={{ mt: 2, fontWeight: "bold" }}>
                    תודה רבה!
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                {textForThanks}
                </Typography>

                <motion.div whileHover={{ scale: 1.1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/list")}
                        sx={{ borderRadius: "20px", px: 4, py: 1 }}
                    >
                        חזרה לדף הבית
                    </Button>
                </motion.div>
            </Box>
        </Container>
        </Box>
    );
};

export default ThankYou;
