import React, { useContext, useState } from 'react'
import {Alert, Box, Button, Snackbar, TextField} from "@mui/material"
import { DataContext } from '../../Context/DataProvider'

const Availability = () => {

  const WeekDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat","Sun"]

  const { backendUrl, account } = useContext(DataContext)

// -------------- USE STATES ----------------

  const [toggleDay, setToggleDay] = useState("Mon")
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

// ---------------  HANDLE SUBMIT --------------

const handleSubmit = () => {
  if(!timeData.time){
    setModalMsg({open:true, msg:"Please Select the Time!", severity:"error"})
    return
  }

  setTimeData({...timeData, time:""})
}

  return (
<>

{/* --------------- WEEK BUTTONS -------------------- */}

<Box className="flex justify-center flex-wrap gap-2">
  {WeekDays.map((day, idx) => (
  <Button 
  onClick={() => setToggleDay(day)}
  className={`px-6 font-bold ${toggleDay === day ? "bg-primary text-white" : "text-primary border-primary"}`}
  variant='outlined'
  key={idx}>
    {day}
  </Button>
  ))}
</Box>

<Box className="border-gray-300 border-b mt-8"></Box>

{/* ------------------ ADD TIMING ------------------- */}

<Box className="flex items-center justify-center gap-4">

<Box className="w-[170px] sm:w-[300px] md:w-[28vw]">
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

<Button 
onClick={handleSubmit}
variant='outlined'
className='w-28 sm:w-40 mt-4 bg-gradient-to-r from-gray-800 via-gray-700
font-bold to-gray-950 text-white'>
  Add Time
</Button>

</Box>

{/* ------------------ MAIN DATA FROM BACKEND ---------------------- */}



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

export default Availability