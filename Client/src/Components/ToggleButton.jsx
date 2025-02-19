import React, { useRef } from 'react'
import { Box, Typography } from "@mui/material";
import { NavLink, useLocation } from 'react-router-dom';

import gsap from 'gsap';
import ScrollTrigger  from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const ToggleButton = () => {

  const location = useLocation()
  const isActive = location.pathname.split("/").pop()

// --------------------------- GSAP ANIMATION -----------------------------------
// --------------------------- GSAP ANIMATION -----------------------------------

  gsap.registerPlugin(ScrollTrigger) 

  const ToggleButtonRef = useRef(null)
  
  useGSAP(() => {
    gsap.from(ToggleButtonRef.current, {
      y:-30,
      duration:1,
      opacity:0,
      scrollTrigger:ToggleButtonRef.current
    })    
  })

  return (
    <>

<Box
ref={ToggleButtonRef} 
className="relative flex items-center justify-between w-80 h-14 sm:h-16 
rounded-full bg-gray-200 shadow-md p-2 mt-6">

  <Box
  className={`absolute top-1 left-1 w-1/2 h-[90%] bg-[#8667f2] rounded-full transition-all duration-300 ${
    !isActive ? "translate-x-0" : "translate-x-full"
  }`}
  />

  <NavLink to={"/"}>
  <Box
  className="flex-1 flex justify-center items-center text-nowrap px-4 py-2 rounded-full cursor-pointer relative z-10 transition-all"
  >
  <Typography
    className={`font-extrabold tracking-wider text-base md:text-lg ml-2 ${
      isActive !== "Expert-Home" ? "text-white" : "text-black"
    }`}
  >
    Candidate
  </Typography>
  </Box>
  </NavLink>

  <NavLink to={"/Expert-Home"}>
  <Box
  className="flex-1 flex justify-center items-center text-nowrap px-4 py-2 rounded-full cursor-pointer relative z-10 transition-all"
  >
  <Typography
    className={`font-bold md:font-extrabold tracking-wider text-base md:text-lg ml-2 mr-6 md:mr-4 ${
      isActive === "Expert-Home" ? "text-white" : "text-black"
    }`}
  >
    Expert
  </Typography>
  </Box>
  </NavLink>
</Box>
      
    </>
  )
}

export default ToggleButton
