import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

import ForgotImg from "../assets/forgotSvg.svg"

import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from "../assets/Logo.png"

const ForgotPass = () => {

// ------------------------------------------------------------

  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

// ------------------------------------------------------------

  useEffect(() => {
    setErrorMsg("")
  },[email])

// ------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if(!email){
      setLoading(false)
      setErrorMsg("Email is required")
      return
    }

    setTimeout(() => {
      setLoading(false)
    },2000)

    console.log(email)
  }

// ------------------------------------------------------------

  return (
  <>
  <Box className="flex h-screen justify-around bg-gradient-to-br from-purple-200 to-purple-700">

{/* ------------------------------------------------------------------------------------- */}

  <Box className="w-full md:w-[45vw] px-6 sm:px-20 md:px-0 py-10 flex flex-col items-center">

{/* ------------------------------------------------------------------------------------ */}

  <NavLink to={"/"}>
  <img 
  className="h-44 filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_8px_6px_rgba(0,0,0,0.9)] "
  src={Logo} 
  alt="Mock Ninja logo" />
  </NavLink>

{/* ------------------------------------------------------------------------------------ */}

  <Box className="w-fit md:w-full h-[500px] rounded-[30px] mt-2 sm:mt-0 flex flex-col items-center py-10">
  
  <Box className="flex flex-col items-center bg-white shadow-2xl w-full max-w-[450px] rounded-[30px] h-full py-8">

    <Box
    className="normal-case text-black font-bold text-[1.5rem] sm:text-[1.8rem] md:text-[1.8rem]"
    >
    <span><LockOpenIcon className="text-2xl sm:text-3xl mb-2"/></span> Forgot Password?
    </Box>

    <Typography className="text-center text-gray-600 text-[14px] sm:text-[15px]">
      Create a new password to login your account
    </Typography>

{/* ------------------------------------------------------------------------------------ */}

  {errorMsg && (
  <Box className="px-8 sm:px-16 w-full mt-2">
  <Typography className='text-sm text-red-500 font-bold bg-red-100 text-center py-1 rounded-[10px]'>
    {errorMsg}
  </Typography>
  </Box> 
  )}

{/* ------------------------------------------------------------------------------------ */}

    <Box className="sm:px-4 mt-6">
    <TextField
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
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

{/* ------------------------------------------------------------------------------------ */}

    {loading ? (
      <Box className="flex items-center justify-center mt-2">
      <CircularProgress className="text-black"/>
      </Box>
    ) : (
      <Box className="px-6 sm:px-[60px]">
      <Button
      onClick={handleSubmit}
      variant="outlined"
      fullWidth
      className="w-[70vw] sm:w-[330px] font-bold border-black text-black rounded-[20px] hover:bg-black hover:text-white transition-all mt-2"
      >
        Submit
      </Button>
      </Box>
    )}

{/* ------------------------------------------------------------------------------------ */}

    <Box className="px-6 sm:px-[60px] mt-3">
    <NavLink to={"/login"}>
    <Button
    variant="outlined"
    fullWidth
    className="w-[70vw] sm:w-[330px] bg-black text-white font-bold rounded-[30px] transition-all mt-2 hover:text-black hover:bg-white hover:border-black"
    >
      <span><ArrowBackIcon className="text-xl"/></span>Back to login
    </Button>
    </NavLink>
    </Box>

{/* ------------------------------------------------------------------------------------ */}

    <Box className="mt-8">
      <Typography className="text-gray-600 text-[14px] sm:text-[16px]">
        want to register new account? <NavLink to={"/Register"}><span className="underline hover:text-black cursor-pointer text-[13px] sm:text-[15px]">Click here</span></NavLink>
      </Typography>
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