import React, { useState } from 'react';
import LoginSlider from '../Components/LoginSlider';
import { Box, Button, TextField, Typography } from '@mui/material';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import googleImg from "../assets/google.svg"

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

// ------------------------------------------------------------

  const [formdata, setFormData] = useState({
    email:"",
    password:"",
  })

// ------------------------------------------------------------

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formdata, [name]:value})
  }

// ------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formdata)
  };

// ------------------------------------------------------------

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
<>
  <Box className="flex h-screen w-screen items-center justify-center bg-[#8667F2] px-40">
    
    <Box className="flex gap-4 bg-white py-8 px-4 rounded-[20px] h-[600px] shadow-xl">

{/* ------------------------------------------------------------------------------------ */}

  <Box className="hidden md:inline-block w-[28vw] shadow-lg rounded-2xl">
    <LoginSlider/>
  </Box>

{/* ------------------------------------------------------------------------------------ */}

  <Box>
  <Box className="h-full px-3 sm:px-6 w-[300px] sm:w-[350px] md:w-[400px] bg-gray-100 pt-8 rounded-[20px] flex-col shadow-lg">

  <Typography 
  className='text-center text-[2rem] font-bold font-[roboto] mb-2'>
    Login
  </Typography>

{/* ------------------------------------------------------------------------------------ */}

  <Box className="p-4">
  <Button 
  fullWidth
  variant="outlined"
  className="normal-case flex w-fit ml-3 px-5 sm:ml-6 md:ml-12 gap-3 p-2 rounded-[10px] border-black">
    <img
    className="h-6" 
    src={googleImg} alt="Google img"/>
    <Typography 
    className="text-gray-700 text-sm text-nowrap">
      Continue with <span className="font-bold">Google</span>
    </Typography>
  </Button>
  </Box>
  
{/* ------------------------------------------------------------------------------------ */}

  {/* <Box className="px-8 sm:px-4">
   <Typography className='text-sm text-red-500 font-bold bg-red-100 text-center py-1 rounded-[10px]'>
    Error while login
   </Typography>
   </Box>  */}

{/* ------------------------------------------------------------------------------------ */}
  
  <Box className="sm:px-4 mt-4 sm:mt-6">
  <TextField
  type="email"
  value={formdata.email}
  onChange={handleChange}
  label="Email"
  fullWidth
  required
  placeholder="Enter your email"
  variant="outlined"
  name="email"
  className="mb-5 bg-gray-100 rounded-lg"
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

    <Box className="sm:px-4">
    <TextField
    value={formdata.password}
    onChange={handleChange}
    type={showPassword ? "text" : "password"}
    fullWidth
    label="Password"
    required
    placeholder="Enter your password"
    variant="outlined"
    name="password"
    className="bg-gray-100 rounded-lg"
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

{/* ------------------------------------------------------------------------------------ */}

  <Box className="sm:px-4 mt-6 sm:mt-8">
    <Button
    onClick={handleSubmit}
    variant='outlined'
    fullWidth
    className='normal-case border-black h-10 text-black hover:text-white font-bold hover:bg-black transition-all rounded-[10px]'
    >
      Login
    </Button>
  </Box>

  <Typography className='text-center font-medium mt-8 sm:mt-10 cursor-pointer'>
    Forgot password?
  </Typography>

  <Typography className='text-center mt-2 sm:mt-4'>
    Dont have an account? <span className='underline cursor-pointer text-gray-500 hover:text-black'>Sign up</span>
  </Typography>

  </Box>

{/* ------------------------------------------------------------------------------------ */}

    </Box>
    </Box>

  </Box>
    </>
  );
};

export default Login