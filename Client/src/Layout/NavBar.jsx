import { AppBar, Box, Button, Drawer, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/Logo.png"

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const NavBar = () =>  {

  const navigate = useNavigate()

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [drawerOpen, SetDrawerOpen] = useState(false)

  const handleDrawerClose = () => {
    SetDrawerOpen(!drawerOpen)
  }

  return (
    <>

    <AppBar className="static">
      <Toolbar className="bg-[#8667F2] flex justify-between items-center">

{/* ------------------------------------------------------------------------------------ */}

    <Box className="flex items-center gap-1">

      <img 
      className="h-[70px]"
      src={Logo} alt="Mocn Ninja Logo" />

      <Typography className="text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-[roboto] font-extrabold tracking-tight">
        Mock Ninja
      </Typography>

    </Box>

{/* ------------------------------------------------------------------------------------ */}
  
  <Button 
  onClick={() => SetDrawerOpen(true)}
  className="text-white w-fit mr-[-15px]">
  <MenuIcon className="md:hidden text-[30px] sm:text-[33px] cursor-pointer"/> 
  </Button>

{/* ------------------------------------------------------------------------------------ */}

  <Box className="hidden gap-8 md:flex">

  <Box className="flex justify-between items-center md:gap-2">

    <Button 
    onClick={() => navigate("/")}
    variant="outlined"
    className="text-white text-[17px] normal-case font-bold border-none hover:bg-white hover:text-[#8667F2] transition-all">
      Home
    </Button>

    <Button 
    onClick={() => navigate("/About")}
    variant="outlined"
    className="text-white text-[17px] normal-case font-bold border-none hover:bg-white hover:text-[#8667F2] transition-all">
      About
    </Button>

    <Button 
    onClick={() => navigate("/Contact-us")}
    variant="outlined"
    className="text-white text-nowrap text-[17px] normal-case font-bold border-none hover:bg-white hover:text-[#8667F2] transition-all">
      Contact Us
    </Button>

  </Box>

{/* ------------------------------------------------------------------------------------ */}

  <Box className="flex gap-4">

    <Button 
    onClick={() => navigate("/Register")}
    variant="outlined"
    className="hover:text-[#8667F2] normal-case hover:bg-white font-bold bg-[#8667F2] text-white hover:shadow-none border-1 border-white transition-all rounded-[20px]">
      Register
    </Button>

    <Button 
    onClick={() => navigate("/Login")}
    variant="outlined"
    className="hover:text-[#8667F2] normal-case hover:bg-white font-bold bg-[#8667F2] text-white hover:shadow-none border-1 border-white transition-all rounded-[20px]">
      Login
    </Button>
    
  </Box>
  </Box>

      </Toolbar>
    </AppBar>

    <Drawer
    anchor="right" 
    open={drawerOpen}
    onClose={handleDrawerClose} 
    sx={{
      "& .MuiDrawer-paper": {
        width: {xs:"240px", sm:"300px"},
        bgcolor: "#E5E5E5", 
      },
    }}
  >


{/* -------------------------------------------------------------------------------------- */}
    
    <Box className="flex items-center justify-center">
    <img 
    className="h-[80px] w-[80px]"
    src={Logo} alt="Mock Ninja logo"/>

      <Typography className="text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-[roboto] font-extrabold tracking-tight">
        Mock Ninja
      </Typography>
    </Box>
    
    <Box className="px-4 h-1 w-full">
    <Box className="border-b-2 border-gray-400 h-1 w-full"></Box>
    </Box>

{/* -------------------------------------------------------------------------------------- */}

  <Box className="flex flex-col gap-1 mt-6 mx-10">

    <Button
    onClick={() => navigate("/")}
    startIcon={<HomeIcon />}
    variant="contained"
    className="text-black pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full"
    >
      Home
    </Button>

    <Button
    onClick={() => navigate("/About")}
    startIcon={<InfoIcon/>}
    variant="contained"
    className="text-black pr-[60px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full"
    >
      About
    </Button>

    <Button
    onClick={() => navigate("/Contact-us")}
    startIcon={<PermContactCalendarIcon/>}
    variant="contained"
    className="text-black text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full"
    >
      Contact us
    </Button>

  </Box>

{/* -------------------------------------------------------------------------------------- */}
  
   <Box className="flex flex-col gap-4 mt-6 items-center mx-10">
    
    <Button 
    onClick={() => navigate("/Login")}
    startIcon={<VpnKeyIcon/>}
    variant="outlined"
    className="text-black text-[15px] w-full font-bold border-black rounded-[20px] hover:text-white hover:bg-black transition-all">
      Login
    </Button>

    <Button 
    onClick={() => navigate("/Register")}
    startIcon={<HowToRegIcon/>}
    variant="outlined"
    className="text-black text-[15px] w-full font-bold border-black rounded-[20px] hover:text-white hover:bg-black transition-all">
      Register
    </Button>

   </Box>

{/* -------------------------------------------------------------------------------------- */}

  <Box className="px-4 h-1 w-full mt-6 absolute bottom-0 mb-16">
    <Box className="border-b-2 border-gray-400 h-1 w-full"></Box>
  </Box>

  <Box className="absolute bottom-0 ml-8 sm:ml-16 mb-5">

    <Typography className="text-black font-bold text-[16px] sm:text-[18px]">
      {today}
    </Typography>

  </Box>

{/* -------------------------------------------------------------------------------------- */}

</Drawer>

    </>
  )
}

export default NavBar