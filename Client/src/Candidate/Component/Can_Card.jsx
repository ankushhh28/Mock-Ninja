import { Box, Typography, Button, Dialog, DialogTitle, IconButton, RadioGroup, FormControlLabel, FormControl, Radio, TextField, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import aiImg from "../../assets/images/CardAIImage.png"
import CloseIcon from '@mui/icons-material/Close';

const Can_Card = () => {

  const [open, setOpen] = useState(false)
  const [intType, setIntType] = useState("Resume")

  return (
<>
<Box className="flex flex-col sm:flex-row items-center gap-14 md:gap-6 bg-[#f5f3ff] px-8 pt-6 pb-12 md:pr-16  md:py-12">

<Box className="w-full md:w-1/2 flex justify-center">
  <img src={ aiImg } alt="leftsideImage" className='w-full max-w-sm h-auto rounded-lg min-h-20 filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] ' />
</Box>

<Box className="flex flex-col w-full lg:w-1/2 gap-4  md:gap-8 text-center md:text-left ">
  <Typography className="text-3xl md:text-4xl text-primary font-extrabold mb-4 whitespace-nowrap text-wrap overflow-visible">
    Ace Your Next Interview with <span className='text-gray-700'>AI!</span> 
  </Typography>
  <Typography variant="body1" className="text-gray-800 text-justify text-xl">
    Prepare for job interviews with real-time AI-driven mock interviews.
    Get instant feedback and improve your skills with our AI-powered system.
  </Typography>
  <Box className="text-left space-y-2 mb-6">
    <Typography variant="body1" className="text-gray-800 font-semibold text-xl">
      🔹 Personalized questions based on your field
    </Typography>
    <Typography variant="body1" className="text-gray-700 font-semibold  text-xl">
      🔹 Real-time AI evaluation
    </Typography>
    <Typography variant="body1" className="text-gray-700 font-semibold  text-xl">
      🔹 Instant feedback & tips
    </Typography>
  </Box>
  <Button
  onClick={() => setOpen(true)}
    variant="contained"
    className="bg-purple-600 sm:w-fit hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300"
  >
    Start AI Interview
  </Button>
</Box>  
</Box>

{/* -------------------------- INTERVIEW FORM ----------------------- */}
{/* -------------------------- INTERVIEW FORM ----------------------- */}
{/* -------------------------- INTERVIEW FORM ----------------------- */}

<Dialog
open={open}
onClose={() => setOpen(false)}
PaperProps={{
  sx: {
    backgroundColor: 'white', 
    borderRadius: 3,
    padding: 2,
    position: 'relative',
    minWidth:{xs:350, sm:500},
  },
}}
    >
{/* ----------------------- TOP RIGHT Close Button ---------------------- */}
<DialogTitle
  sx={{ position: 'absolute', top: 8, right: 8, padding: 0 }}
>
  <IconButton
    aria-label="close"
    onClick={() => setOpen(false)}
    sx={{
      color: (theme) => theme.palette.grey[500],
      '&:hover': {
        backgroundColor: (theme) => theme.palette.grey[200],
      },
    }}
  >
    <CloseIcon />
  </IconButton>
</DialogTitle>

{/* ----------------------- TYPE OF INTERVIEW ------------------ */}

<Box className="ml-4 mt-10">

  <Typography variant="h6" fontWeight="bold" gutterBottom>
    Select Your Interview Type
  </Typography>

  <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
    <RadioGroup
      value={intType}
      onChange={(e) => setIntType(e.target.value)}
      name="interviewType"
    >
      <FormControlLabel value="Resume" control={<Radio />} label="Resume" />
      <FormControlLabel value="Domain" control={<Radio />} label="Domain" />
      <FormControlLabel value="Skills" control={<Radio />} label="Skills" />
    </RadioGroup>
  </FormControl>

</Box>

{/* ------------------------ IF RESUME SELECTED ----------------- */}

  {intType === 'Resume' && (
    <Box className="ml-4">

    </Box>
  )}

{/* ------------------------ IF DOMAIN SELECTED ----------------- */}

  {intType === 'Domain' && (
    <Box className="ml-4">

    </Box>
  )}
{/* ------------------------ IF SKILLS SELECTED ----------------- */}

  {intType === 'Skills' && (
    <Box className="ml-4">

    </Box>
  )}

{/* ----------------------- RESUME SUBMIT BUTTON ----------------- */}

  {intType === 'Resume' && (
    <DialogActions>
    <Box className="ml-4 absoulte">
      <Button>
        Start Interview
      </Button>
    </Box>
    </DialogActions>
  )}

{/* ----------------------- DOMAIN SUBMIT BUTTON ----------------- */}

  {intType === 'Domain' && (
    <DialogActions>
    <Box className="ml-4">
      <Button>
        Start Interview
      </Button>
    </Box>
    </DialogActions>
  )}

{/* ---------------------- SKILLS SUBMIT BUTTON ----------------- */}

  {intType === 'Skills' && (
    <DialogActions>
    <Box className="ml-4">
      <Button>
        Start Interview
      </Button>
    </Box>
    </DialogActions>
  )}

</Dialog>
</>
  )
}

export default Can_Card
