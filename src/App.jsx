import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Box} from "@mui/material"
import { useLocation } from 'react-router-dom'; 
import { Routes ,Outlet} from 'react-router-dom'
import NavBar from './components/NavBar'
import Router from './components/Router'
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Home'
function App() {
  // const [count, setCount] = useState(0)
  // const location = useLocation(); // שימוש ב-location

  // const isHomePage = location.pathname === "/"||location.pathname === "/exit"; // האם אנחנו בדף הבית
  return (
    <>
    <Box sx={{ overflow: "hidden" }}>
  {/* כל האפליקציה שלך */}

      <NavBar />
      {/* {isHomePage && <Header />} */}
       {/* מציג את Header רק בדף הבית */}
      <Router />
      {/* <Outlet/> */}
      <About />
      <Footer/>
      </Box>
    </>
  )
}

export default App
