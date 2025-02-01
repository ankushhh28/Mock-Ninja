import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import homeRobot from "../assets/homeRobot.gif";

const HomeBanner = () => {
  const [role, setRole] = useState(true);

  return (
    <Box className="flex flex-col sm:gap-12 items-center min-h-screen w-full bg-[#f5f3ff] px-12 md:px-20  pt-6">
      <Box className="relative flex items-center justify-between w-80 h-14 sm:h-16 rounded-full bg-gray-200 shadow-md p-2 mt-6">
        <Box
          className={`absolute top-1 left-1 w-1/2 h-[90%] bg-[#8667f2] rounded-full transition-all duration-300 ${
            role ? "translate-x-0" : "translate-x-full"
          }`}
        />

        <Box
          onClick={() => setRole(true)}
          className="flex-1 flex justify-center items-center text-nowrap px-4 py-2 rounded-full cursor-pointer relative z-10 transition-all"
        >
          <Typography
            className={`font-extrabold tracking-wider text-base md:text-lg ${
              role ? "text-white" : "text-black"
            }`}
          >
            Candidate
          </Typography>
        </Box>

        <Box
          onClick={() => setRole(false)}
          className="flex-1 flex justify-center items-center text-nowrap px-4 py-2 rounded-full cursor-pointer relative z-10 transition-all"
        >
          <Typography
            className={`font-bold md:font-extrabold tracking-wider text-base md:text-lg ${
              !role ? "text-white" : "text-black"
            }`}
          >
            Interviewer
          </Typography>
        </Box>
      </Box>

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
              className="normal-case text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950 px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
              endIcon={<ArrowForwardIcon />}
            >
              Interview with AI
            </Button>
            <Button
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
  );
};

export default HomeBanner;
