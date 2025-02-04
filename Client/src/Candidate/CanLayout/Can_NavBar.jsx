import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Avatar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom';
import { DataContext } from '../../Context/DataProvider';

import Logo from "../../assets/Logo.png"

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ComputerIcon from '@mui/icons-material/Computer';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Can_NavBar = () => {

  const {account, backendUrl} = useContext(DataContext)

  const location = useLocation()
  const activePage = location.pathname

// --------------------------------------------------------------------

const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

// --------------------------------------------------------------------

  const [drawerOpen, SetDrawerOpen] = useState(false)
  const [candidateData, SetCandidateData] = useState("")
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profilePhoto"));

// --------------------------------------------------------------------

  useEffect(() => {
  const fetchCandidateDetails = async () => {
    const serverResponse = {
      role:account.role,
      email: account.email,
      accessToken: account.accessToken,
    };
    try {
      const response = await axios.get(
        `${backendUrl}/Can/Fetching-Candidate-Details`,
        {
          params: { email: serverResponse.email, role: serverResponse.role },
          headers: {
            Authorization: `Bearer ${serverResponse.accessToken}`,
          },
        }
      )
      SetCandidateData(response.data)
      localStorage.setItem("profilePhoto",response.data.candidatePicture)
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  fetchCandidateDetails();
}, [account]);

  return (
    <>
  <AppBar className='static'>
    <Toolbar className='bg-primary flex justify-between items-center'>

{/* ----------------------------------------------------------------------- */}

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
{/* ----------------------------------------------------------------------- */}

<Button 
  onClick={() => SetDrawerOpen(true)}
  className="text-white w-fit mr-[-15px]">
  <MenuIcon className="md:hidden text-[30px] sm:text-[33px] cursor-pointer"/> 
  </Button>

{/* ----------------------------------------------------------------------- */}

<Box className="hidden gap-8 md:flex">

  <Box className="flex justify-between items-center md:gap-10">
    
  <NavLink to={"/Candidate/Home"}>
  <Box 
  variant="outlined"
  className={`text-white text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${activePage === "/Candidate/Home" ? "text-gray-800" : ""}`}>
    Home
  </Box>
  </NavLink>
  
  <NavLink to={"/Candidate/AI/Mock"}>
  <Box 
  variant="outlined"
  className={`text-white text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${activePage === "/Candidate/AI/Mock" ? "text-gray-800" : ""}`}>
    AI Mock
  </Box>
  </NavLink>
  
  <NavLink to={"/Candidate/Mock"}>
  <Box 
  variant="outlined"
  className={`text-white text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${activePage === "/Candidate/Mock" ? "text-gray-800" : ""}`}>
    Mock
  </Box>
  </NavLink>

  <NavLink to={"/Candidate/ATS"}>
  <Box 
    variant="outlined"
    className={`text-white text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation ${activePage === "/Candidate/ATS" ? "text-gray-800" : ""}`}>
    ATS
  </Box>
</NavLink>

  </Box>

{/* ----------------------------------------------------------------------- */}

<Box className="flex gap-4 ml-3">
  
  <NavLink to={"/Candidate/Profile"}>
  <Avatar
  className='h-14 w-14'
  src={profilePhoto ? `${profilePhoto}`: `${Logo}`}
  alt='Profile Photo'
  />
  </NavLink> 
    
</Box>

</Box>

{/* ----------------------------------------------------------------------- */}

    </Toolbar>
  </AppBar>

{/* ----------------------------------------------------------------------- */}
{/* ----------------------------------------------------------------------- */}
{/* ----------------------------------------------------------------------- */}
{/* ----------------------------------------------------------------------- */}

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


{/* -------------------------------------------------------------------------------------- */}
    
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

{/* -------------------------------------------------------------------------------------- */}

  <Box className="flex flex-col gap-2 mt-6 mx-10">
    
    <NavLink to={"/Candidate/Home"}>
    <Button
    startIcon={<HomeIcon />}
    variant="contained"
    className={`text-black pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 hover:text-black transition-all ${activePage === "/Candidate/Home" ? "bg-black text-white" : ""} font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      Home
    </Button>
    </NavLink>
    
    <NavLink to={"/Candidate/AI/Mock"}>
    <Button
    startIcon={<SmartToyIcon/>}
    variant="contained"
    className={`text-black pr-[48px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 hover:text-black transition-all ${activePage === "/Candidate/AI/Mock" ? "bg-black text-white" : ""} font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      AI Mock
    </Button>
    </NavLink>
    
    <NavLink to={"/Candidate/Mock"}>
    <Button
    startIcon={<ComputerIcon/>}
    variant="contained"
    className={`text-black pr-[67px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 hover:text-black transition-all ${activePage === "/Candidate/Mock" ? "bg-black text-white" : ""} font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      Mock
    </Button>
    </NavLink>
    
    <NavLink to={"/Candidate/ATS"}>
    <Button
    startIcon={<StickyNote2Icon/>}
    variant="contained"
    className={`text-black pr-[86px] text-[15px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 hover:text-black transition-all ${activePage === "/Candidate/ATS" ? "bg-black text-white" : ""} font-bold bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      ATS
   </Button>
   </NavLink>
    
   <NavLink to={"/Candidate/Profile"}>
    <Button 
    startIcon={<AccountCircleIcon/>}
    variant="contained"
    className={`text-black text-[15px] pr-[50px] hover:rounded-[20px] rounded-[20px] hover:bg-gray-300 font-bold hover:text-black ${activePage === "/Candidate/Profile" ? "bg-black text-white" : ""} bg-[#E5E5E5] shadow-none hover:shadow-none w-full`}
    >
      Profile
    </Button>
    </NavLink>

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

export default Can_NavBar
