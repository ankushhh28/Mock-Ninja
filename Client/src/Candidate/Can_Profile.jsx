import React, { useContext, useState } from 'react'
import Can_Layout from './CanLayout/Can_Layout'
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout';
import { DataContext } from '../Context/DataProvider';
import { useNavigate } from 'react-router-dom';

const CanProfile = () => {

  const {setAccount} = useContext(DataContext)
  const navigate = useNavigate()

  const [open,setOpen] = useState(false)

  return (
  <>
  <Can_Layout>
  <Box className="h-screen w-screen py-6">

{/* ---------------------------------------------------------------------------------------- */}

  <Box className="flex justify-between mx-4 sm:mx-16">

  <Typography className="font-bold text-[17px] sm:text-[20px] mt-1 text-black">
    Profile
  </Typography>

  <Button 
  onClick={() => setOpen(true)}
  variant='outlined'
  className="normal-case font-bold text-[13px] sm:text-[18px] text-white rounded-[30px] bg-gradient-to-r from-red-400
  to-red-700 border-red-600">
  <span><LogoutIcon className='text-[20px] mr-2 font-extrabold'/></span>Logout
  </Button>

  </Box>

  <Box className="border-b-[1px] border-gray-300 mt-4"></Box>

{/* ---------------------------------------------------------------------------------------- */}

    </Box>
  </Can_Layout>

{/* --------------------------- LOGOUT MODAL -------------------------- */}
{/* --------------------------- LOGOUT MODAL -------------------------- */}
{/* --------------------------- LOGOUT MODAL -------------------------- */}

  <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle className='mt-2'>
      Are you sure you want to logout your account ?
    </DialogTitle>
    <DialogActions>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setAccount("")} className='text-red-500'>Confirm</Button>
    </DialogActions>
  </Dialog>

  </>
  )
}

export default CanProfile
