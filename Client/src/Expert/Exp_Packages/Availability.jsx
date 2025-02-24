import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Snackbar, TextField} from "@mui/material"
import { DataContext } from '../../Context/DataProvider'

import { MdDelete } from "react-icons/md";

const Availability = () => {

  const WeekDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat","Sun"]

  const dayMap = {
    Mon: "Monday",
    Tues: "Tuesday",
    Wed: "Wednesday",
    Thurs: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  }

  const { backendUrl, account } = useContext(DataContext)
  const email = account.email

// -------------- USE STATES ----------------

  const [toggleDay, setToggleDay] = useState("Mon")
  const [addLoad, setAddLoad] = useState(false)
  const [delLoad, setDelLoad] = useState(false)
  const [Load, setLoad] = useState(false)
  const [modal, setModal] = useState({
    open:false,
    times:"",
    days:"",
    showTime:""
  })
  const [modalMsg, setModalMsg] = useState({
    open: false,
    msg: "",
    severity: "",
  });
  const [timeData, setTimeData] = useState({
    time:"",
    email:account.email,
    dayType:toggleDay
  })
  const [backendTime, setBackendTime] = useState({});

// --------- HANDLING DAY TYPE ON CHANGE ----------------

  useEffect(() => {
    setTimeData({...timeData, dayType:toggleDay})
  },[toggleDay])

// ---------------  HANDLE SUBMIT --------------

const handleSubmit = async() => {

  setAddLoad(true)

  if(!timeData.time){
    setAddLoad(false)
    setModalMsg({open:true, msg:"Please Select the Time!", severity:"error"})
    return
  }

  try {
    const response = await axios.post(`${backendUrl}/Exp/Adding-Availability-Timing`, timeData, {
      headers:{
        Authorization:`Bearer ${account.accessToken}`
      }
    })
    if(response.status === 200){
      setModalMsg({open:true, msg:response?.data?.message || "Check Your Conntection! Try Later.", severity:"success"});
    }
  } catch (error) {
    setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
  } finally {
    setAddLoad(false)
  }

  setTimeData({...timeData, time:""})
}

// -------------  FETCHING TIME DATA -----------------

useEffect(() => {
  const fetchTimeData = async() => {
    setLoad(true)
    try {
      const response = await axios.get(`${backendUrl}/Exp/Fetching-Availability-Timing`, {
        params:{email, role:account.role},
        headers:{
          Authorization:`Bearer ${account.accessToken}`
        }
      })
      if(response.status === 200){
        setBackendTime(response.data.Availability)
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
    } finally {
      setLoad(false)
    }
  }
  fetchTimeData()
},[addLoad, toggleDay, delLoad])

// -------------- HANDLE TIME DELETING --------------

const handleDeleteTime = async(time, dayType) => {
  setDelLoad(true)
  const serverData = {time, dayType, email, role:account.role}

  try {
    const response = await axios.delete(`${backendUrl}/Exp/Delete-Availability-Timing`, {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
      },
      data: serverData, 
    });
    if(response.status === 200){
      setModalMsg({open:true, msg:response?.data?.message || "Check Your Conntection! Try Later.", severity:"success"});
    }
  } catch (error) {
    setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
  } finally {
    setDelLoad(false)
    setModal({days:"", times:"", open:false, showTime:""})
  }
}

// ------------- FILTERING TIME DATA ----------------

const selectedDay = dayMap[toggleDay];
const filteredTimes = backendTime?.[selectedDay] ?? []; 

  return (
<>

{/* --------------- WEEK BUTTONS -------------------- */}

<Box className="flex justify-center flex-wrap gap-2">
  {WeekDays.map((day, idx) => (
  <Button 
  onClick={() => setToggleDay(day)}
  className={`px-6 border-primary font-bold ${toggleDay === day ? "bg-primary text-white" : "text-primary border-primary"}`}
  variant='outlined'
  key={idx}>
    {day}
  </Button>
  ))}
</Box>

<Box className="border-gray-300 border-b mt-8"></Box>

{/* ------------------ ADD TIMING ------------------- */}

<Box className="flex items-center justify-center gap-4">

<Box className="w-[270px] sm:w-[300px] md:w-[28vw]">
<TextField
type='time'
  fullWidth
  value={timeData.time}
  onChange={(e) => setTimeData({...timeData, [e.target.name]:e.target.value})} 
  variant="outlined"
  placeholder='Enter Title of your Career Package'
  name="time"
  className="mt-5 bg-gray-50 rounded-lg"
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
/>
</Box>

{addLoad ? (
  <CircularProgress size={30} className='text-black mt-4 ml-6'/>
) : (
<Button 
onClick={handleSubmit}
variant='outlined'
className='w-28 text-nowrap sm:w-40 mt-4 bg-gradient-to-r from-gray-800 via-gray-700
font-bold to-gray-950 text-white'>
Add Time
</Button>
)}

</Box>

{/* ------------------ MAIN TIMING SECTION  ---------------------- */}

<Box className="mt-6 sm:mt-10 md:mt-16 flex flex-col items-center gap-2">
  {Load ? (
    <CircularProgress className='text-black'/>
  ) : filteredTimes.length > 0 ? (
  
  filteredTimes.map((time, index) => {

    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime = `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;

    return (
      <Box
      key={index}
      className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-md border border-gray-300 w-[90vw] sm:w-[60vw] md:w-[50vw] transition-all duration-300 ease-in-out"
    >
      <span className="text-lg font-semibold text-gray-800">{formattedTime}</span>

      <Button 
      variant='outlined'
        className="text-red-600 border-red-500 transition-all duration-200"
        onClick={() => setModal({open:true,showTime:formattedTime, times:time, days:toggleDay})} // 
      >
        <MdDelete size={24} />
      </Button>
    </Box>
    );
  })
) : (
  <p className="text-gray-500 text-center text-xl mt-10">No availability added for {selectedDay}</p>
)}
</Box>

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

{/* ---------------- CONFIRM DELETE MODAL --------------- */}

<Dialog open={modal.open} onClose={() => setModal({days:"",times:"", open:false, showTime:""})}>

<DialogTitle className="mt-2">
  <p>
Are you sure you want to delete <span className='font-bold'>{modal.showTime}</span> from <span className='font-bold'>{modal.days}day</span>?
  </p>
</DialogTitle>

<DialogActions>
<Button onClick={() => setModal({days:"",times:"", open:false, showTime:""})}>Cancel</Button>
{delLoad ? (
  <CircularProgress size={20} className='mr-8 text-black'/>
) : (
<Button
onClick={() => handleDeleteTime(modal.times, modal.days)}
className="text-red-500"
>
Confirm
</Button>
)}
</DialogActions>
</Dialog>

</>
  )
}

export default Availability