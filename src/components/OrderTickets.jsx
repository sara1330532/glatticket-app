import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

// ======================================================
// OrderTickets Component
// This component receives an array of tickets and displays
// each ticket in a styled MUI Card with image and name.
// Used inside OrderDetails to show purchased products.
// ======================================================

const OrderTickets = ({ arrtickets }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {arrtickets.map((ticket, idx) => (
        <Card
          key={idx}
          sx={{
            width: 150,
            m: 2,
            boxShadow: 3,
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 100, objectFit: "cover" }}
            image={ticket.product.Image}
            alt={ticket.product.name}
          />
          <CardContent sx={{ textAlign: "center", padding: "8px 12px" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {ticket.product.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default OrderTickets;
