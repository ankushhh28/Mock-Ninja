import React, { useContext, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import homeRobot from "../assets/homeRobot.gif";
import { NavLink } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { DataContext } from "../Context/DataProvider";

const HomeBanner = () => {

  const { account } = useContext(DataContext)

  const [open, setopen] = useState(false)

  return (
    <>
    <Box className="flex flex-col sm:gap-12 items-center min-h-screen w-full bg-[#f5f3ff] px-12 md:px-20  pt-6">

      <ToggleButton/>


      <Box className="flex flex-col md:flex-row items-center justify-between w-full mt-10">
        <Box className="flex flex-col items-start text-left w-full md:w-1/2 space-y-8">
          <Typography className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-black">
            <span className="text-[#0d0d0d]">Master Your Interviews</span>,{" "}
            <span className="text-purple-500">Secure Your Future</span>
          </Typography>
          <Typography className="text-gray-700 font-semibold text-xl md:text-2xl">
            Ace your next job interview with AI-driven simulations and real-time
            mock interviews with industry experts. Gain insights, improve your
            skills, and boost your confidence—all in one platform.
          </Typography>

          <Box className="flex flex-col md:flex-row gap-4">
            <Button
            onClick={() => setopen(true)}
              className="normal-case text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950 px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
              endIcon={<ArrowForwardIcon />}
            >
              Interview with AI
            </Button>
            <Button
            onClick={() => setopen(true)}
              className="normal-case text-white bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8] px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
              endIcon={<ArrowForwardIcon />}
            >
              Book Mock Interview
            </Button>
          </Box>
        </Box>

        <Box className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src={homeRobot}
            alt="Illustration"
            className="w-[1000px] h-auto"
          />
        </Box>
      </Box>
    </Box>

{/* --------------------- MODAL BEFORE LOGIN AT HOME ----------------------- */}

    <Dialog open={open} onClose={() => setopen(false)}>

      <DialogTitle>
        
      

      </DialogTitle>

      <DialogContent>

      </DialogContent>

      <DialogActions>

      </DialogActions>

    </Dialog>

    </>
  );
};

export default HomeBanner;
