import React, { useContext, useRef } from "react";
import { FaUserLock, FaSignInAlt, FaUserPlus, FaTimes } from "react-icons/fa";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import homeRobot from "../assets/homeRobot.gif";
import { NavLink } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { DataContext } from "../Context/DataProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const InterviewerBanner = () => {
  const { account , intBeforeLogin, setintBeforeLogin } = useContext(DataContext);

// --------------------------- GSAP ANIMATION -----------------------------------
// --------------------------- GSAP ANIMATION -----------------------------------

gsap.registerPlugin(ScrollTrigger)

const BannerText = useRef(null)
const BannerImg = useRef(null)

useGSAP(() => {
  gsap.from(BannerText.current, {
    x:-80,
    duration:1,
    opacity:0,
    scrollTrigger:BannerText.current
  })

  gsap.from(BannerImg.current, {
    x:170,
    opacity:0,
    duration:1,
    scrollTrigger:{
      trigger:BannerImg.current,
    }
  })
})


  return (
    <>
      <Box className="flex flex-col sm:gap-12 items-center min-h-screen w-full bg-[#f5f3ff] px-12 md:px-20  pt-6">
        <ToggleButton />

        <Box 
        ref={BannerText}
        className="flex flex-col md:flex-row items-center justify-between w-full mt-10">

          <Box 
          className="flex flex-col items-start text-left w-full md:w-1/2 space-y-8">

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
                onClick={() => setintBeforeLogin(true)}
                className="normal-case text-white bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8] px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<ArrowForwardIcon />}
              >
                Become an Interviewer
              </Button>
              <Button
                onClick={() => setintBeforeLogin(true)}
                className="normal-case text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950 px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<ArrowForwardIcon />}
              >
                Schedule a Mock Interview
              </Button>
            </Box>
          </Box>
          <Box 
          className="w-full md:w-1/2 mt-10 md:mt-0">
            <img
            ref={BannerImg}
              src={homeRobot}
              alt="Illustration"
              className="w-[1000px] h-auto"
            />
          </Box>
        </Box>
      </Box>

      {/* --------------------- MODAL BEFORE LOGIN AT HOME ----------------------- */}
      <Dialog
      open={intBeforeLogin && !account.name}
      onClose={() => setintBeforeLogin(false)}
      className="backdrop-blur-[1px] flex items-center justify-center"
    >
      <div className="bg-gradient-to-br from-[#9870e9] to-[#8E2DE2] shadow-2xl max-w-lg w-full p-8 text-center text-white">

      <IconButton
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          onClick={() => setintBeforeLogin(false)}
        >
          <FaTimes className="text-2xl" />
        </IconButton>
        <DialogTitle className="text-4xl font-extrabold flex items-center justify-center gap-3">
          <FaUserLock className="text-5xl" /> Access Required
        </DialogTitle>

        <DialogContent className="mt-4 px-6 text-lg sm:text-xl leading-relaxed">
        To become an interviewer or schedule a mock interview, sign in or create an account.
        </DialogContent>

        <DialogActions className="flex flex-col sm:flex-row justify-center gap-4 mt-6 px-4">
          <NavLink to={"/Login"}>
          <button
            className="bg-white text-[#4A00E0] text-lg sm:text-xl px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all shadow-lg text-nowrap flex items-center gap-2 justify-center w-full sm:w-auto"
          >
            <FaSignInAlt className="text-xl sm:text-2xl" /> Sign In
          </button>
          </NavLink>
          <NavLink to={"/Register"}>
          <button
            className="bg-white text-[#8E2DE2] text-lg sm:text-xl px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all shadow-lg flex items-center gap-2 justify-center w-full sm:w-auto"
          >
            <FaUserPlus className="text-xl" /> Register
          </button>
          </NavLink>
        </DialogActions>
      </div>
    </Dialog>
    </>
  );
};

export default InterviewerBanner;
