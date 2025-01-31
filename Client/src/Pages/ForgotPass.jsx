import React from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

import ForgotImg from "../assets/forgotSvg.svg"

import LockOpenIcon from '@mui/icons-material/LockOpen';

const ForgotPass = () => {
  return (
  <>
  <Box className="flex h-screen justify-around bg-gradient-to-br from-purple-200 to-purple-700">

{/* ------------------------------------------------------------------------------------- */}

  <Box className="w-full md:w-[45vw] bg-gray-300 px-6 sm:px-20 md:px-0 py-10 flex flex-col items-center">

  <Box className="w-full h-20 bg-black mt-10">
  </Box>

  <Box className="w-fit md:w-full h-[500px] rounded-[30px] mt-10 sm:mt-6 flex flex-col items-center py-10">
  
  <Box className="flex flex-col items-center bg-white w-full max-w-[450px] rounded-[30px] h-full py-8">

    <Box
    className="normal-case text-black font-bold text-[1.5rem] sm:text-[1.8rem] md:text-[1.8rem]"
    >
    <span><LockOpenIcon className="text-2xl sm:text-3xl mb-2"/></span> Forgot Password?
    </Box>

    <Typography className="text-center text-gray-600 text-[14px] sm:text-[15px]">
      Create a new password to login your account
    </Typography>

    <Box className="sm:px-4 mt-8 sm:mt-12">
    <TextField
    type="email"
    // value={formdata.email}
    // onChange={handleChange}
    label="Email"
    required
    placeholder="Enter your email"
    variant="outlined"
    name="email"
    className="mb-5 bg-gray-100 rounded-lg w-[70vw] sm:w-[330px]"
    sx={{
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "black", 
        },
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "black", 
      },
    }} />
    </Box>
    
    <Box className="px-6 sm:px-[60px]">
    <Button
    variant="outlined"
    fullWidth
    className="w-[70vw] sm:w-[330px] border-black text-black rounded-[20px] hover:bg-black hover:text-white transition-all mt-2"
    >
      Submit
    </Button>
    </Box>
  </Box>

  </Box>
  </Box>

{/* ------------------------------------------------------------------------------------- */}
  <img 
  className="h-screen hidden md:block md:w-[45vw]"
  src={ForgotImg} alt="Image" />

  </Box>
  </>
  )
}

export default ForgotPass