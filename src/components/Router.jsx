import React from 'react'
import TicketList from '../pages/TicketList'
import TicketCart from '../pages/TicketCart'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import TicketDetails from '../pages/TicketDetails'
import Checkout from '../pages/Checkout'
import ThankYou from '../pages/ThankYou'
import Exit from '../pages/Exit'
import AddTicket from '../pages/AddTicket'
import UpdateTicket from '../pages/UpdateTicket'
import OrdersList from '../pages/OrdersList'
import Home from './Home'

import { Route, Routes } from 'react-router-dom'

// ======================================================
// Router Component
// Defines all application routes and their corresponding components.
// Handles navigation between pages such as ticket listing, cart, user auth,
// ticket details, checkout, order management, and home page.
// Uses React Router v6 to structure nested and fallback routes.
// ======================================================

const Router = () => {
  return (<Routes>

    <Route path='list' element={<TicketList />}>
      <Route path='details/:id' element={<TicketDetails />} />
    </Route>
    <Route path='cart' element={<TicketCart />} />
    {/* <Route path='details/:id' element={<TicketDetails />} /> */}
    <Route path='checkout' element={<Checkout />} />
    <Route path='signup' element={<SignUp />} />
    <Route path='login' element={<Login />} />
    <Route path='thank-you' element={<ThankYou />} />
    <Route path='exit' element={<Exit />} />
    <Route path='add-ticket' element={<AddTicket />} />
    <Route path='update-ticket' element={<UpdateTicket />} />
    <Route path='all-orders' element={<OrdersList />} />
    <Route path="/" element={<Home />} >
      <Route path="details/:id" element={<TicketDetails />} />
    </Route>
    <Route path="*" element={<Home />} />
  </Routes>
  )
}

export default Router