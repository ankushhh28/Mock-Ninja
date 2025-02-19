import React, { useContext, useRef, useState } from "react";
import { FaUserLock, FaSignInAlt, FaUserPlus, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
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
import homeImage from "../../assets/images/home.jpeg";
import ToggleButton from "../ToggleButton";
import { DataContext } from "../../Context/DataProvider";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const CandidateBanner = () => {
  
  const { account, beforeLogin, setBeforeLogin } = useContext(DataContext);
  const navigate = useNavigate(); 

  // --------------------------- GSAP ANIMATION -----------------------------------
  // --------------------------- GSAP ANIMATION -----------------------------------

  gsap.registerPlugin(ScrollTrigger);

  const CanBannerText = useRef(null);
  const CanBannerImg = useRef(null);

  useGSAP(() => {
    gsap.from(CanBannerText.current, {
      x: -80,
      duration: 1,
      opacity: 0,
      scrollTrigger: CanBannerText.current,
    });

    gsap.from(CanBannerImg.current, {
      x: 80,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: CanBannerImg.current,
      },
    });
  });

  return (
    <>
      <Box className="flex flex-col  items-center h-auto  w-full bg-[#f5f3ff] px-12 md:px-16  py-6 pb-4">

        {account.accessToken === "" ? (<ToggleButton />): (<><Box className="sm:h-16"></Box></>)}

        <Box className="flex flex-col md:flex-row items-center justify-between w-full mt-8">
          <Box
            ref={CanBannerText}
            className="flex flex-col items-start text-left w-full md:w-1/2 space-y-10"
          >
            <Typography className="text-3xl sm:text-5xl font-extrabold tracking-tighter leading-relaxed text-black">
              <span className="text-[#0d0d0d]">Master Your Interviews</span>,{" "}
              <span className="text-purple-500">Secure Your Future</span>
            </Typography>
            <Typography className="text-gray-700 font-semibold text-xl md:text-2xl">
              Ace your next job interview with AI-driven simulations and
              real-time mock interviews with industry experts. Gain insights,
              improve your skills, and boost your confidence—all in one
              platform.
            </Typography>

            <Box className="flex flex-col md:flex-row gap-6">

           <Button
                onClick={() =>{ if (account.name ==="" && account.accessToken === ""){
                  setBeforeLogin(true);
                }else{
                  navigate("/Candidate/AI/Mock"); 
                }
                }}
                className="normal-case text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950 px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<ArrowForwardIcon />}
              >
                Interview with AI
              </Button>
              <Button
                onClick={() => { if (account.name ==="" && account.accessToken === ""){
                  setBeforeLogin(true);
                }else{navigate("/Candidate/Mock"); 
                }
                }}
                className="normal-case text-white bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8] px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<ArrowForwardIcon />}
              >
                Book Mock Interview
              </Button>
            </Box>
          </Box>

          <Box className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 ">
            <img
              ref={CanBannerImg}
              src={homeImage}
              alt="Illustration"
              className="w-[530px] h-auto rounded-full"
            />
          </Box>
        </Box>
      </Box>

      {/* --------------------- MODAL BEFORE LOGIN AT HOME ----------------------- */}
      {/* --------------------- MODAL BEFORE LOGIN AT HOME ----------------------- */}

      <Dialog
        open={beforeLogin && account.name === ""}
        onClose={() => setBeforeLogin(false)}
        className="backdrop-blur-[1px] flex items-center justify-center "
        PaperProps={{
          sx: { borderRadius: 4 }, 
        }}
      >
        <div className="bg-gradient-to-br from-[#9870e9] to-[#8E2DE2] shadow-2xl max-w-lg w-full px-2 py-4 sm:py-8 text-center text-white">
          <IconButton
            className="absolute top-4 right-4 text-white hover:text-gray-200"
            onClick={() => setBeforeLogin(false)}
          >
            <FaTimes className="text-2xl sm:text-3xl " />
          </IconButton>
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold flex flex-col   items-center justify-center gap-4">
            <FaUserLock className="text-2xl sm:text-3xl" /> Access Required
          </DialogTitle>

          <DialogContent className="mt-2 text-lg sm:text-xl leading-relaxed">
            Unlock AI-powered interviews, resume analysis, and expert mock
            sessions by signing in or creating an account.
          </DialogContent>

          <DialogActions className="flex items-center justify-center gap-2 sm:gap-4  ">
            <NavLink to={"/Login"}>
              <button className="bg-white text-[#4A00E0] text-lg sm:text-xl px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all shadow-lg text-nowrap flex items-center gap-2 justify-center w-full sm:w-auto">
                <FaSignInAlt className="text-xl sm:text-2xl" /> Sign in
              </button>
            </NavLink>
            <NavLink to={"/Register"}>
              <button className="bg-white text-[#8E2DE2] text-lg sm:text-xl px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all shadow-lg flex items-center gap-2 justify-center w-full sm:w-auto">
                <FaUserPlus className="text-xl" /> Register
              </button>
            </NavLink>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default CandidateBanner;
