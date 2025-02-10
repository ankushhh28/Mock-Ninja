import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";
import axios from "axios";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
  Button,
} from "@mui/material";

import NextIcon from "@mui/icons-material/ChevronRight";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";

import Intructions from "./Component/InstructionsAI";
import CountdownAnimation from "./Component/CountDown";

const Can_AiIntPage = () => {
  const { backendUrl, account } = useContext(DataContext);

  // -------------- Fetching Mock ID in URL -------------------------

  const params = useParams();
  const mockId = params.mockID;

  // -------------------- USE STATES -------------------------------

  const [questions, setQuestions] = useState([]);
  const [modalMsg, setModalMsg] = useState({
    open: false,
    msg: "",
    severity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


// ------------- NEXT BUTTON -- COUNT DOWN BUTTON -----------------

  const [next, setNext] = useState(() => {
    return JSON.parse(sessionStorage.getItem("next")) || false;
  });

  const [count, setCount] = useState(() => {
    return JSON.parse(sessionStorage.getItem("count")) || false;
  });

  useEffect(() => {
    sessionStorage.setItem("next", JSON.stringify(next));
  }, [next]);

  useEffect(() => {
    sessionStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  // ----------- Fetching Questions from Database -------------------

  useEffect(() => {
    const fetchingQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${backendUrl}/Can/fetching-Generate-Questions`,
          {
            params: {
              mockID: mockId,
              email: account.email,
              role: account.role,
            },
            headers: {
              Authorization: `Bearer ${account.accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          const questionsArray = Array.isArray(response.data.questions)
            ? response.data.questions
            : response.data.questions
            .replace(/[\[\]{}":.\b]|question|\b\d+\b/g, "")
            .split(/,(?=[A-Z])/)
            .map(item => item.trim())
            .filter(item => item !== "");
          setQuestions(questionsArray);
        }
      } catch (error) {
        setModalMsg({
          open: true,
          msg:
            error.response?.data?.message ||
            "Check your Connection! try again later",
          severity: "error",
        });
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchingQuestions();
  }, [mockId]);

  return (
    <>
      {error ? (
        <></>
      ) : !next ? (
        <Intructions setNext={setNext} />
      ) : !count ? (
        <CountdownAnimation setCount={setCount} />
      ) : loading ? (
        <Box className="h-screen w-screen flex items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        // ---------------------- MOCK SCREEN -----------------------------------------------------
        <>
          <Box className="flex flex-col w-full h-screen py-10 px-12 md:px-3 gap-4 sm:gap-6 md:gap-8 md:py-10 bg-[#202124]">
            {/* ---------------- Question Section --------------------------- */}
            <Box className="flex flex-col items-center text-white gap-4">
              <h2 className="text-sm md:text-2xl font-semibold tracking-wide text-gray-300">
                QUESTION
              </h2>
              <p
                id="question"
                className="text-lg md:text-3xl font-bold tracking-wide text-center"
              >
                What is JavaScript What is JavaScript What is JavaScript What is JavaScript What is JavaScript What is JavaScript? 
              </p>
            </Box>

            {/* ------------------------- Video Frames Section --------------------- */}

            <Box
              id="video-frames"
              className="flex flex-col md:flex-row justify-center gap-8 md:gap-6 flex-wrap sm:mb-12"
            >
              {/* ---------------- AI ------------------------------  */}

              <Box
                id="Ai"
                className="w-full md:w-[40%] h-64 md:h-96 bg-[#3c4043] rounded-2xl flex items-end justify-center"
              >
                <Button fullWidth >
                  <span className="text-xl mr-2 normal-case tracking-wide">Repeat</span> 
                  <VolumeUpIcon className="text-3xl" />
                </Button>
              </Box>

              {/* ---------------- Timer ------------------ */}
              <Box className="flex animate-pulse items-center justify-center text-red-500 text-3xl md:text-2xl font-bold mx-6 ">
                02:00
              </Box>

              {/* ------------------- Webcam ---------------- */}
              <Box
                id="web-cam"
                className="w-full md:w-[40%] h-64 md:h-96 bg-[#3c4043] rounded-2xl flex items-end justify-center"
              >
                <Button fullWidth>
                <span className="text-xl mr-2 normal-case tracking-wide">Answer</span> 
                  <MicIcon className="text-3xl" />
                </Button>
              </Box>
            </Box>

            {/* --------------------------------- Buttons Section --------------------------- */}
            <Box className="flex justify-center gap-4 md:gap-8">
              <Button
                className=" text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 px-3 md:px-5 py-2 md:py-3 font-bold text-lg rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<SkipNextIcon />}
              >
                Skip
              </Button>
              <Button
                className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 px-3 md:px-5 py-2 md:py-3 font-bold text-lg rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<NextIcon />}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}

      {/* --------------------------------- SNACKBAR --------------------------- */}
      {/* --------------------------------- SNACKBAR --------------------------- */}
      {/* --------------------------------- SNACKBAR --------------------------- */}

      <Snackbar
        open={modalMsg.open}
        autoHideDuration={3000}
        onClose={() => setModalMsg({ ...modalMsg, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setModalMsg({ ...modalMsg, open: false })}
          severity={modalMsg.severity}
          sx={{ width: "100%" }}
        >
          <b>{modalMsg.msg}</b>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Can_AiIntPage;
