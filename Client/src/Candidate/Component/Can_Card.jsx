import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import aiImg from "../../assets/images/CardAIImage.png"

const Can_Card = () => {
  return (
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
          variant="contained"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300"
        >
          Start AI Interview
        </Button>
      </Box>  
    </Box>
  )
}

export default Can_Card
