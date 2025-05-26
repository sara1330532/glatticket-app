import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cartSlice'
import { clearUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'

//==============================================================
// Exit - clears user and cart data, then navigates to home page
//==============================================================

const Exit = () => {
  const navigate= useNavigate();
    const dispatch=useDispatch();
  
    useEffect(() => {
        dispatch(clearCart());
        dispatch(clearUser());
        navigate("home")
    }, [dispatch]);
  return (
    <div>נשמח לראותך שוב!</div>
  )
}

export default Exit