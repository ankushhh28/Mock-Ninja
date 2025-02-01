import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";

import ForgotImg from "../assets/forgotSvg.svg"
import Logo from "../assets/Logo.png"

import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockResetIcon from '@mui/icons-material/LockReset';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ForgotPass = () => {

  const { backendUrl } = useContext(DataContext)

  const navigate = useNavigate()

// -----------------------------------------------------------------------

  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [optVisible, setOtpVisible] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [submitButton, setSubmitButton] = useState(false)
  const [code, setCode] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [optSendedOnce, SetOptSendedOnce] = useState(false)

// -----------------------------------------------------------------------

  useEffect(() => {
    setErrorMsg("")
  },[email, successMsg, email, password, code])

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

// -----------------------------------------------------------------------

  const handleVerify = async(e) => {
    e.preventDefault()
    setLoading(true)
    setCode("")
    SetOptSendedOnce(false)

    if(!email){
      setLoading(false)
      setErrorMsg("Email is required")
      return
    }

    try {
      const response = await axios.post(`${backendUrl}/ForgotPassword/mail-send`, {
        email:email
      })

      if(response.status === 200){
        setSuccessMsg(response.data.message)
        setTimeout(() => {
          setOtpVisible(true)
          setSubmitButton(true)
          setSuccessMsg("")
        },1000)
        setTimeout(() => {
          SetOptSendedOnce(true)
        },60000)
      }
    } catch (error) {
      setErrorMsg(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

// -----------------------------------------------------------------------

const handleSubmit = async(e) => {
  e.preventDefault()

  setLoading(true)
  
  if(code.length !== 4){
      setLoading(false)
      setErrorMsg("Enter Valid OTP")
      return
    }
    
    const serverResponse = {
      email,
      code
    }

    try {
      const response = await axios.post(`${backendUrl}/OTP/Verification`, serverResponse)
      if(response.status === 200){
        setSuccessMsg(response.data.message)
        setTimeout(() => {
          setSuccessMsg("")
          setChangePassword(true)
        },1000)
      }
    } catch (error) {
      setErrorMsg(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

// ----------------------------------------------------------------------------
  
  const handleChangePassword = async(e) => {
    e.preventDefault()

    setLoading(true)
    
    if(password.length < 8){
      setLoading(false)
      setErrorMsg("Password must be 8 character long.")
      return
    }

    const serverResponse = {
      email,
      password
    }

    try {
      const response = await axios.post(`${backendUrl}/Password/Change`, serverResponse)
      if(response.status === 200){
        setSuccessMsg(response.data.message)
        setTimeout(() => {
          navigate("/login")
        },1000)
      }
    } catch (error) {
      setErrorMsg(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

// ----------------------------------------------------------------------------

  const handleClick = (e) => {
  if (changePassword) {
    handleChangePassword(e); 
  } else {
    if (submitButton) {
      handleSubmit(e);
    } else {
      handleVerify(e); 
    }
  }
};


  return (
    <>
  <Box className="flex h-screen justify-around bg-gradient-to-br from-purple-100 to-purple-700">

{/* ------------------------------------------------------------------------------------- */}

  <Box className="w-full md:w-[45vw] px-6 sm:px-20 md:px-0 py-10 flex flex-col items-center">

{/* ------------------------------------------------------------------------------------ */}

  <Box className="w-fit md:w-full h-fit mt-20 sm:mt-0 md:mt-8 rounded-[30px] flex flex-col items-center py-10">
  
  <Box className="flex flex-col items-center bg-white shadow-2xl w-full max-w-[450px] rounded-[30px] h-full py-8">

  <NavLink to={"/"}>
  <img 
  className="h-32 sm:h-36 md:h-44 filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_8px_6px_rgba(0,0,0,0.7)] "
  src={Logo} 
  alt="Mock Ninja logo" />
  </NavLink>

  {changePassword ? (
    <>
    <Typography className="font-bold text-[1.7rem] sm:text-[1.9rem]">
      <span><LockResetIcon className="text-[3rem] sm:text-[4rem]"/></span>
    </Typography>

    <Box className="sm:px-[60px] mt-5"> 
    <Typography className="text-sm text-gray-500">
    Change your password
    </Typography>
    </Box>
    </>
  ) : (
    <>
    {optVisible ? (
      <>
      <Typography className="font-bold text-[1.7rem] sm:text-[1.9rem]">
        Enter OTP
      </Typography>
      
      <Box className="sm:px-[50px] mt-2">
      <Typography className="text-sm text-gray-500 text-center">
      We have sent a verification
      </Typography>
      <Typography className="text-sm text-gray-500 text-center">
      code to your registered mail
      </Typography>
      <Typography className="text-md text-black text-center mt-4">
      Otp is valid only up to <span className="font-bold text-black">1 min</span>
      </Typography>
      </Box>
      </>
    ): (
      <>
      <Box
      className="normal-case text-black font-bold text-[1.5rem] sm:text-[1.8rem] md:text-[1.8rem]"
      >
      <span><LockOpenIcon className="text-2xl sm:text-3xl mb-2"/></span> Forgot Password?
      </Box>
  
      <Typography className="text-center text-gray-600 text-[14px] sm:text-[15px]">
        Create a new password to login your account
      </Typography>
      </>
    )}
    </>
  )}

{/* ------------------------------------------------------------------------------------ */}

  {errorMsg && (
  <Box className="px-8 sm:px-16 w-full mt-2">
  <Typography className='text-sm text-red-500 font-bold bg-red-100 text-center py-1 rounded-[10px]'>
    {errorMsg}
  </Typography>
  </Box> 
  )}

  {successMsg && (
  <Box className="px-8 sm:px-16 w-full mt-2">
  <Typography className='text-sm text-green-500 font-bold bg-green-100 text-center py-1 rounded-[10px]'>
    {successMsg}
  </Typography>
  </Box> 
  )}

{/* ------------------------------------------------------------------------------------ */}
    
  {changePassword ? (
    <Box className="sm:px-4 mt-5">
    <TextField
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type={showPassword ? "text" : "password"}
    label="Password"
    required
    placeholder="Enter your password"
    variant="outlined"
    name="password"
    className="bg-gray-100 rounded-lg w-[70vw] sm:w-[330px] mb-5"
    sx={{
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "black",
        },
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "black",
      },
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={togglePasswordVisibility} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    />  
    </Box>
  ): (
    <>
      {optVisible ? (
    <Box className="sm:px-4 mt-6">
    <TextField
    type="text"
    value={code}
    onChange={(e) => setCode(e.target.value)}
    label="OTP"
    required
    placeholder="Enter your 4 digit OTP"
    variant="outlined"
    name="code"
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
    ) : (
      <Box className="sm:px-4 mt-6">
      <TextField
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      label="Email"
      required
      placeholder="Enter your mail"
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
    )}
    </>
  )}

{/* ------------------------------------------------------------------------------------ */}

    {loading ? (
      <Box className="flex items-center justify-center mt-2">
      <CircularProgress className="text-black"/>
      </Box>
    ) : (
      <Box className={`px-6 sm:px-[60px]`}>
      <Button
      onClick={handleClick}
      variant="outlined"
      fullWidth
      className="w-[70vw] sm:w-[330px] font-bold border-black text-black rounded-[20px] hover:bg-black hover:text-white transition-all mt-2"
      >
        {changePassword ? "Change" :(<>{submitButton ? "Submit" : "Verify"}</>)}
      </Button>
      </Box>
    )}

{/* ------------------------------------------------------------------------------------ */}
    
{optSendedOnce && (
  <Typography
    onClick={handleVerify}
    className="text-gray-600 hover:text-black underline cursor-pointer mt-5"
  >
    Resend OTP
  </Typography>
)}

{/* ------------------------------------------------------------------------------------ */}

   {!optVisible && !changePassword && (
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
   )}

{/* ------------------------------------------------------------------------------------ */}
   
   {!optVisible && !changePassword && (
    <Box className="mt-8">
    <Typography className="text-gray-600 text-[14px] sm:text-[16px]">
      want to register new account? <NavLink to={"/Register"}><span className="underline hover:text-black cursor-pointer text-[13px] sm:text-[15px]">Click here</span></NavLink>
    </Typography>
    </Box>
   )}

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