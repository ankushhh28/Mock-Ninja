import React, { useState } from 'react'
import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom';

import Logo from "../../assets/Logo.png"

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { IoMdNotifications } from "react-icons/io";
import { TbPackages } from "react-icons/tb";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ExpertNavBar = () => {

  const location = useLocation()
  const activePage = location.pathname

  const [drawerOpen, SetDrawerOpen] = useState(false)

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>

<AppBar className='static'>
    <Toolbar className='bg-primary flex justify-between items-center'>

{/* ------------------------- MOCK NINJA LOGO ------------------------------------ */}

  <Box 
  className="flex items-center gap-1">

  <img 
  className="h-[70px]"
  src={Logo} alt="Mocn Ninja Logo" />

  <Typography 
  className="hidden sm:inline-block sm:text-2xl md:text-3xl text-nowrap font-[roboto] font-extrabold tracking-tight">
    Mock Ninja
  </Typography>

  </Box>
{/* ----------------------- MOBILE MENU BUTTON ------------------------------------- */}

<Button 
  onClick={() => SetDrawerOpen(true)}
  className="text-white w-fit mr-[-15px]">
  <MenuIcon className="md:hidden text-[30px] sm:text-[33px] cursor-pointer"/> 
  </Button>

{/* -------------------------- NAVBAR ---------------------------------------- */}

<Box className="hidden gap-8 md:flex">

  <Box className="flex justify-between items-center md:gap-10 mr-8">
    
  <NavLink to={"/Expert/Home"}>
  <Box 
  variant="outlined"
  className={` text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${activePage === "/Expert/Home" ? "text-gray-800" : "text-white"}`}>
    Home
  </Box>
  </NavLink>
  
  <NavLink to={"/Expert/Notify"}>
  <Box 
  variant="outlined"
  className={` text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${activePage === "/Expert/Notify" ? "text-gray-800" : "text-white"}`}>
    Notify
  </Box>
  </NavLink>
  
  <NavLink to={"/Expert/Packages/AddPackage"}>
  <Box 
    variant="outlined"
    className={`text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${
      ["/Expert/Packages/AddPackage",
        "/Expert/Packages/Availability",
        "/Expert/Packages/Interview-Package",
        "/Expert/Packages/Resume-Package",
        "/Expert/Packages/Priority-Package",
        "/Expert/Packages/Career-Package"
      ].includes(activePage) 
      ? "text-gray-800" 
      : "text-white"
    }`}
  >
    Packages
  </Box>
</NavLink>


  <NavLink to={"/Expert/Profile"}>
  <Box 
    variant="outlined"
    className={` text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${activePage === "/Expert/Profile" ? "text-gray-800" : "text-white"}`}>
    Profile
  </Box>
</NavLink>

 </Box>

</Box>

{/* ------------------------------------------------------------------------- */}

  </Toolbar>
  </AppBar>

{/* -------------------------MOBILE NAV BAR ------------------------------------ */}
{/* -------------------------MOBILE NAV BAR ------------------------------------ */}
{/* -------------------------MOBILE NAV BAR ------------------------------------ */}
{/* -------------------------MOBILE NAV BAR ------------------------------------ */}

<Drawer
    anchor="right" 
    open={drawerOpen}
    onClose={() => SetDrawerOpen(false)} 
    sx={{
      "& .MuiDrawer-paper": {
        width: {xs:"240px", sm:"300px"},
        bgcolor: "#E5E5E5", 
      },
    }}
  >


{/* ------------------------  LOGO AND NAME --------------------------------------- */}
    
    <Box className="flex items-center justify-center mr-10">
    <img 
    className="h-[80px] w-[80px]"
    src={Logo} alt="Mock Ninja logo"
    />

      <Typography className="text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-[roboto] font-extrabold tracking-tight">
        Mock Ninja
      </Typography>
    </Box>
    
    <Box className="px-4 h-1 w-full">
    <Box className="border-b-2 border-gray-400 h-1 w-full"></Box>
    </Box>

{/* -------------------------- SECTIONS ----------------------------------------------- */}

  <Box className="flex flex-col gap-2 mt-6 mx-10">
    
    <NavLink to={"/Expert/Home"}>
    <Button
    startIcon={<HomeIcon />}
    variant="contained"
    className={`text-black pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 hover:text-black transition-all ${activePage === "/Expert/Home" ? "bg-black text-white" : ""} font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      Home
    </Button>
    </NavLink>
    
    <NavLink to={"/Expert/Notify"}>
    <Button
    startIcon={<IoMdNotifications/>}
    variant="contained"
    className={`text-black pr-[58px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 hover:text-black transition-all ${activePage === "/Expert/Notify" ? "bg-black text-white" : ""} font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      Notify
    </Button>
    </NavLink>
    
    <NavLink to={"/Expert/Packages"}>
    <Button
    startIcon={<TbPackages/>}
    variant="contained"
    className={`text-black pr-[30px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 hover:text-black transition-all ${activePage === "/Expert/Packages" ? "bg-black text-white" : ""} font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      Packages
    </Button>
    </NavLink>
    
   <NavLink to={"/Expert/Profile"}>
    <Button 
    startIcon={<AccountCircleIcon/>}
    variant="contained"
    className={`text-black text-[15px] pr-[50px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 font-bold hover:text-black ${activePage === "/Expert/Profile" ? "bg-black text-white" : ""} bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      Profile
    </Button>
    </NavLink>

  </Box>

{/* -------------------------------------------------------------------------------------- */}

  <Box className="px-4 h-1 w-full mt-6 absolute bottom-0 mb-16">
    <Box className="border-b-2 border-gray-400 h-1 w-full"></Box>
  </Box>

  <Box className="absolute bottom-0 ml-12 sm:ml-16 mb-5">

    <Typography className="text-black font-bold text-[16px] sm:text-[18px]">
      {today}
    </Typography>

  </Box>

{/* -------------------------------------------------------------------------------------- */}

</Drawer>
</>
      
  )
}

export default ExpertNavBar
