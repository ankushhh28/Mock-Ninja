import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import aiImg from "../../assets/images/CardAIImage.png"

const Can_Card = () => {
  return (
    <Box className="flex flex-col sm:flex-row items-center gap-8 bg:[#f5f3ff] px-6 py-3">
      <Box className="w-full lg:w-1/2 flex justify-center">
        <img src={ aiImg } alt="rightSideAIImage" className='w-full max-w-sm h-auto rounded-lg min-h-20 filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_8px_6px_rgba(0,0,0,0.7)]' />
      </Box>
      <Box className="w-full lg:w-1/2 text-center lg:text-left">
        <Typography variant="h4" className="text-primary font-extrabold mb-4 whitespace-nowrap">
          Ace Your Next Interview with AI!
        </Typography>
        <Typography variant="body1" className="text-gray-700 mb-4 text-justify">
          Prepare for job interviews with real-time AI-driven mock interviews.
          Get instant feedback and improve your skills with our AI-powered system.
        </Typography>
        <Box className="text-left space-y-2 mb-6">
          <Typography variant="body1" className="text-gray-700 font-semibold">
            🔹 Personalized questions based on your field
          </Typography>
          <Typography variant="body1" className="text-gray-700 font-semibold">
            🔹 Real-time AI evaluation
          </Typography>
          <Typography variant="body1" className="text-gray-700 font-semibold">
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
