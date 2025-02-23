import axios from "axios"
import { Alert, Box, Button, CircularProgress, Snackbar, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import EditIcon from "@mui/icons-material/Edit";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { DataContext } from '../../Context/DataProvider';

const InterviewPackage = () => {

  const { backendUrl, account } = useContext(DataContext)

// -------------- USE STATES -------------------

  const [toggle, setToggle] = useState(false)
  const [fetchLoad, setFetchLoad] = useState(false)
  const [updateLoad, setUpdateLoad] = useState(false)
  const [modalMsg, setModalMsg] = useState({
    open: false,
    msg: "",
    severity: "",
  });
  const [intData, setIntData] = useState({
    Title:"",
    Price:"",
    Description:"",
    Time:"",
    email:account.email,
    role:account.role
  })

// ------------- HANDLING CHANGES --------------

const handleChange = (e) => {
  const {name, value} = e.target
  setIntData({
    ...intData,
    [name]:value
  })
}

// ---------- FETCHING INTERVIEW PACKAGE DETAILS ------------

useEffect(() => {
  const fetchingData = async() => {
    setFetchLoad(true)
    try {
      const response = await axios.get(`${backendUrl}/Exp/Fetching-Interview-Package-Details`, {
        params: { email: intData.email, role:account.role }, 
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        },
      });
      if(response.status === 200){
        if(response.data !== null){
          setIntData(response.data)
        }
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
    } finally {
      setFetchLoad(false)
    }
  }
  fetchingData()
},[])

// -------------- HANDLE SUBMIT FORM -------------

const handleSubmit = async() => {
  setUpdateLoad(true)
  try {
    const response = await axios.post(`${backendUrl}/Exp/Updating-Interview-Package-Details`, intData, 
    {headers : {
      Authorization:`Bearer ${account.accessToken}`
    }})
    if(response.status === 200){
      setIntData(response.data)
      setModalMsg({open:true, msg:response?.data?.message || "Check Your Conntection! Try Later.", severity:"success"});
    }
  } catch (error) {
    setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
  } finally {
    setUpdateLoad(false)
  }
}

  return (
<>
{/*---------------------- TITLE and BUTTONS ---------------------- */}

<Box className="flex justify-between w-full">

<Typography className='text-xl sm:text-2xl md:text-3xl text-nowrap font-semibold'>
  Interview Package
</Typography>

{!toggle && !updateLoad ? (
  <Button 
  onClick={() => setToggle((prev) => !prev)}
  variant='outlined' startIcon={<EditIcon/>}
  className='border-primary text-purple-900 rounded-3xl py-2 px-6 hover:bg-primary 
  hover:text-white transition-all'>
    Edit
  </Button>
) : updateLoad ? (
  <CircularProgress size={28} className="mr-4 text-black"/>
) : (
  <Button 
  onClick={() => {setToggle((prev) => !prev); handleSubmit()}}
  variant='outlined' startIcon={<TurnedInIcon/>}
  className='border-primary text-purple-900 rounded-3xl py-2 px-6 hover:bg-primary 
  hover:text-white transition-all'>
    Save
  </Button>
  )}

</Box>

<Box className="border-gray-500 border-b mt-6"></Box>

{/* --------------------- FORM SECTION --------------------------- */}

{fetchLoad ? (
  <Box className="h-[50vh] w-full flex justify-center items-center">
  <CircularProgress className="text-black"/>
  </Box>
): (
<Box className="px-4 sm:px-14 mt-6 sm:mt-8 md:mt-10">

<Box className="w-full">
<TextField
  label="Interview Title"
  fullWidth
  value={intData.Title}
  onChange={handleChange} 
  variant="outlined"
  placeholder='Enter Title of your Interview Package'
  name="Title"
  className="mt-5 bg-gray-50 rounded-lg"
  sx={{
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "blue-300",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  }}
  disabled={!toggle}
/>
</Box>

<Box className="w-full">
<TextField
  label="Interview Duration (in Minutes)"
  fullWidth
  type='number'
  value={intData.Time}
  onChange={handleChange} 
  variant="outlined"
  placeholder='Enter Duration of your Interview Package'
  name="Time"
  className="mt-5 bg-gray-50 rounded-lg"
  sx={{
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "blue-300",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  }}
  disabled={!toggle}
/>
</Box>

<Box className="w-full">
<TextField
  multiline
  rows={10}
  label="Interview Description"
  fullWidth
  value={intData.Description}
  onChange={handleChange} 
  variant="outlined"
  placeholder='Enter Description of your Interview Package'
  name="Description"
  className="mt-5 bg-gray-50 rounded-lg"
  sx={{
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "blue-300",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  }}
  disabled={!toggle}
/>
</Box>

<Box className="w-full">
<TextField
  label="Interview Price"
  fullWidth
  type='number'
  value={intData.Price}
  onChange={handleChange} 
  variant="outlined"
  placeholder='Enter Price of your Interview Package'
  name="Price"
  className="mt-5 bg-gray-50 rounded-lg"
  sx={{
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "blue-300",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  }}
  disabled={!toggle}
/>
</Box>

</Box>
)}

{/* -------------------- SANCK BAR --------------------- */}
{/* -------------------- SANCK BAR --------------------- */}
{/* -------------------- SANCK BAR --------------------- */}

<Snackbar
  open={modalMsg.open}
  className="mt-4"
  autoHideDuration={3000}
  onClose={() => setModalMsg({ ...modalMsg, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setModalMsg({ ...modalMsg, open: false })}
    severity={modalMsg.severity}
    sx={{ width: "100%" }}
  >
    <b>{modalMsg.msg}</b>
  </Alert>
</Snackbar>
</>
  )
}

export default InterviewPackage