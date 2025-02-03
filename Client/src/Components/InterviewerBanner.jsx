import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import homeRobot from "../assets/homeRobot.gif";
import { NavLink } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { DataContext } from "../Context/DataProvider";

const InterviewerBanner = () => {
  const { account } = useContext(DataContext);

  const [open, setopen] = useState(false);

  return (
    <>
      <Box className="flex flex-col sm:gap-12 items-center min-h-screen w-full bg-[#f5f3ff] px-12 md:px-20  pt-6">
        <ToggleButton />

        <Box className="flex flex-col md:flex-row items-center justify-between w-full mt-10">
          <Box className="flex flex-col items-start text-left w-full md:w-1/2 space-y-8">
            <Typography className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-black">
              <span className="text-purple-500">Transform Careers with </span>,{" "}
              <span className="text-[#0d0d0d]">Your Expertise</span>
            </Typography>
            <Typography className="text-gray-700 font-semibold text-xl md:text-2xl">
              Join a community of industry professionals who help job seekers
              gain real-world interview experience. Conduct mock interviews,
              assess their strengths and weaknesses, and provide actionable
              feedback to refine their skills. Earn rewards while making a
              lasting impact on future professionals{" "}
            </Typography>

            <Box className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => setopen(true)}
                className="normal-case text-white bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8] px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<ArrowForwardIcon />}
              >
                Become an Interviewer
              </Button>
              <Button
                onClick={() => setopen(true)}
                className="normal-case text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950 px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<ArrowForwardIcon />}
              >
                Schedule a Mock Interview
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
      <Dialog
        open={open && !account.name}
        onClose={() => setopen(false)}
        className="backdrop-blur-sm"
      >
        <DialogTitle className="mt-6 text-gray-900 text-3xl sm:text-4xl font-bold text-center">
          Sign-in Required
        </DialogTitle>

        <DialogContent className="mt-4 px-4 sm:px-6">
          <Typography className="text-xl sm:text-2xl text-gray-600 text-center leading-relaxed">
            Log in to access AI-powered interviews, resume analysis, and
            expert-led Mock Interviews
          </Typography>
        </DialogContent>

        <DialogActions className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6 mb-6 px-4 sm:px-0">
          <button
            onClick={() => navigate("/Login")}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md w-full sm:w-auto"
          >
            Sign In
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl hover:bg-gray-300 transition-all shadow-md w-full sm:w-auto"
            onClick={() => setopen(false)}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InterviewerBanner;
