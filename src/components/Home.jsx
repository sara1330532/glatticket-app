import React from 'react';
import baner from '../assets/BANER.png';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import TicketList from '../pages/TicketList';

// ======================================================
// Home Component
// This is the main landing page of the site.
// It displays a banner, a headline section with a follow count,
// a registration button, and a list of available tickets.
// ======================================================
const Home = () => {

    const navig = useNavigate();

// Navigate to the login page when the button is clicked
    function handleToggle() {
        navig('/login');
    }

    return (
        <>
            <Box sx={{ marginTop: "120px" }}>
                <img
                    src={baner}
                    alt="באנר גליקט"
                    style={{
                        width: '100%',
                        maxWidth: '1250px',
                        display: 'block',
                        margin: '30px auto'
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                        flexWrap: 'wrap', 
                        gap: 2,
                        direction: 'rtl',
                        textAlign: 'right',
                        my: 4,
                    }}
                >
                    <h1 style={{
                        fontSize:'2rem', 
                        margin: 0, 
                    }}>גלאטיקט תרבות ברוח ההלכה</h1>

                    <h4
                        style={{
                            backgroundColor: 'rgb(204, 204, 204)',
                            padding: '5px 15px',
                            borderRadius: '15px',
                            margin: 0,
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"

                        }}
                    >
                        2,567  עוקבים
                    </h4>

                    <Button
                        variant="contained"
                        onClick={handleToggle}
                        sx={{
                            backgroundColor: '#FFD600',
                            color: 'black',

                            fontWeight: 'bold',
                            borderRadius: 99,
                            px: 4,
                            '&:hover': {
                                backgroundColor: '#FFC400',
                            },
                        }}
                    >
                        לחצו כאן להרשמה
                    </Button>
                </Box>
                <Outlet />

                <TicketList />
            </Box>
        </>
    );
};

export default Home;
