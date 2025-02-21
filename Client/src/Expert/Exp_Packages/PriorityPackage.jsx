import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

import EditIcon from "@mui/icons-material/Edit";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

const PriorityPackage = () => {

  const [toggle, setToggle] = useState(false)

  return (
<>
{/*---------------------- TITLE and BUTTONS ---------------------- */}

<Box className="flex justify-between w-full">

<Typography className='text-xl sm:text-2xl md:text-3xl text-nowrap font-semibold'>
  Priority DM Package
</Typography>

{!toggle ? (
  <Button 
  onClick={() => setToggle((prev) => !prev)}
  variant='outlined' startIcon={<EditIcon/>}
  className='border-primary text-purple-900 rounded-3xl py-2 px-6 hover:bg-primary 
  hover:text-white transition-all'>
    Edit
  </Button>
) : (
  <Button 
  onClick={() => setToggle((prev) => !prev)}
  variant='outlined' startIcon={<TurnedInIcon/>}
  className='border-primary text-purple-900 rounded-3xl py-2 px-6 hover:bg-primary 
  hover:text-white transition-all'>
    Save
  </Button>
  )}

</Box>

<Box className="border-gray-500 border-b mt-6"></Box>

{/* --------------------- FORM SECTION --------------------------- */}

</>
  )
}

export default PriorityPackage