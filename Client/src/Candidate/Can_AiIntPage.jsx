import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";
import axios from "axios";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Button,
  Typography,
} from "@mui/material";

import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import NextIcon from "@mui/icons-material/ChevronRight";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import { IoIosWarning } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import WarningIcon from "@mui/icons-material/Warning";
import Intructions from "./Component/InstructionsAI";
import CountdownAnimation from "./Component/CountDown";

const Can_AiIntPage = () => {
  const { backendUrl, account } = useContext(DataContext);

  // -------------- Fetching Mock ID in URL -------------------------

  const params = useParams();
  const mockId = params.mockID;

  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  // -------------------- USE STATES -------------------------------

  const [questions, setQuestions] = useState([]);
  const [modalMsg, setModalMsg] = useState({
    open: false,
    msg: "",
    severity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const [loadingOverall, setLoadingOverall] = useState(false);
  const [loadingGesture, setLoadingGesture] = useState(false);
  const [nextClicked, setNextClicked] = useState(true);
  const [resetTriggered, setResetTriggered] = useState(false);

  // -----------------------------------------------------------------------------

  const savedSavingGesture =
    JSON.parse(sessionStorage.getItem("SavingGesture")) || false;
  const savedOverallFeedbacks =
    JSON.parse(sessionStorage.getItem("OverallFeedbacks")) || false;

  const [SavingGesture, setSavingGesture] = useState(savedSavingGesture);
  const [OverallFeedbacks, setOverallFeedback] = useState(
    savedOverallFeedbacks
  );

  useEffect(() => {
    sessionStorage.setItem("SavingGesture", JSON.stringify(SavingGesture));
    sessionStorage.setItem(
      "OverallFeedbacks",
      JSON.stringify(OverallFeedbacks)
    );
  }, [SavingGesture, OverallFeedbacks]);

  // ---CURRENT_QUESTION_INDEX -- SECONDS COUNT INDEX  (SESSION STORAGE) --------

  const savedQuestions =
    parseInt(sessionStorage.getItem("currentQuestionIndex")) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(savedQuestions);

  const savedCount = parseInt(sessionStorage.getItem("timer") || 120);
  const [timer, setTimer] = useState(savedCount);

  useEffect(() => {
    sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    sessionStorage.setItem("timer", timer);
  }, [currentQuestionIndex, timer]);

  // ---------------- USER ANSWER SESSION STORAGE -------------------

  const savedUserAnswer = sessionStorage.getItem("userAnswer");
  const initialUserAnswer = savedUserAnswer ? JSON.parse(savedUserAnswer) : [];

  const [userAnswer, setUserAnswer] = useState(initialUserAnswer);

  useEffect(() => {
    sessionStorage.setItem("userAnswer", JSON.stringify(userAnswer));
  }, [userAnswer]);

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
                .replace(/[\[\]{}":.\?\\\n]|question|\b\d+\b|\bn\b/g, "")
                // .split(/,(?=[A-Z])/)
                .split(/,\s*(?=[A-Z])/)
                .map((item) => item.trim())
                .filter((item) => item !== "");
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

  // ------------- HANDLING NEXT QUESTION ------------------------

  const handleNextQuestion = () => {
    const currentIdx = currentQuestionIndex;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const updatedAnswers = [...userAnswer];
    updatedAnswers[currentIdx] = {
      question: questions[currentIdx],
      answer: text.trim(),
    };

    setUserAnswer(updatedAnswers);

    setText("");

    if (currentIdx <= questions.length - 1) {
      setCurrentQuestionIndex(currentIdx + 1);
      setTimer(120);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      setTimer(120);
    }
  }, []);

  useEffect(() => {
    if (currentQuestionIndex > 11) {
      sessionStorage.removeItem("currentQuestionIndex");
      sessionStorage.removeItem("timer");
      sessionStorage.removeItem("userAnswer");
      sessionStorage.removeItem("SavingGesture");
      sessionStorage.removeItem("OverallFeedbacks");

      endInterview();
      overAllFeedback();

      setResetTriggered(true);
    }
  }, [currentQuestionIndex, nextClicked]);

  useEffect(() => {
    if (resetTriggered) {
      setCurrentQuestionIndex(0);
      setTimer(120);
      setUserAnswer([]);
      setSavingGesture(false);
      setOverallFeedback(false);

      setResetTriggered(false);
    }
  }, [resetTriggered]);

  useEffect(() => {
    if (OverallFeedbacks && SavingGesture) {
      setTimeout(() => {
        navigate(`/Candidate/Rating/${mockId}`);
      }, []);
    }
  }, [OverallFeedbacks, SavingGesture]);

  // ------------- Showing Questions (Timer Logic) ----------------

  useEffect(() => {
    if (next === true && count === true) {
      if (currentQuestionIndex >= questions.length) {
        return;
      }
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            clearInterval(interval);
            handleNextQuestion();
            return 1;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, questions, next, count]);

  // --------------------- Start Listening ----------------------

  const startListening = () => {
    setIsListening(true);
    recognitionRef.current.start();
    // console.log("Listening started...");
  };

  // --------------------- Stop Listening ----------------------

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current.stop();
    // console.log("Listening stopped.");
  };

  // ---------------- Question & Answer records -----------------

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setText((prev) => prev + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Error:", event.error);
    };

    recognition.onend = () => {
      if (isListening) {
        // console.log("Restarting listening...");
        recognition.start();
      }
    };

    return () => {
      recognition.stop();
    };
  }, []);

  // ----------------------- TEXT-TO-SPEECH -------------------------------

  useEffect(() => {
    if (next === true && count === true) {
      const speak = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(
          questions[currentQuestionIndex]
        );
        utterance.lang = "hi-IN";

        // Set speaking status
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synth.speak(utterance);
      };
      speak();
    }
  }, [currentQuestionIndex, next, count, questions]);

  // ---------------------- REPEAT QUESTION SPEECH -------------------

  const repeatQuestion = (questions) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(questions);
    utterance.lang = "hi-IN";

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  // ----------------- SKIP & NEXT BUTTON DISABLE ---------------------

  const handleNextQuestionWithDisable = () => {
    setIsNextButtonDisabled(true);
    handleNextQuestion();
    setTimeout(() => {
      setIsNextButtonDisabled(false);
    }, 2000);
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  // ---------------------- GESTURE FEEDBACK --------------------------
  // ------------------------------------------------------------------
  // ------------------------------------------------------------------

  const webcamRef = useRef(null);
  const [interviewData, setInterviewData] = useState([]);
  let previousLandmarks = null;
  let previousTimestamp = Date.now();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        "https://justadudewhohacks.github.io/face-api.js/models"
      );
      await faceapi.nets.faceExpressionNet.loadFromUri(
        "https://justadudewhohacks.github.io/face-api.js/models"
      );
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        "https://justadudewhohacks.github.io/face-api.js/models"
      );
    };
    loadModels();
  }, []);

  const analyzeEyeContact = (landmarks) => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose();

    if (!leftEye || !rightEye || !nose) return "Unable to detect";

    const leftEyeCenterX = (leftEye[0]?.x + leftEye[3]?.x) / 2 || 0;
    const rightEyeCenterX = (rightEye[0]?.x + rightEye[3]?.x) / 2 || 0;
    const noseCenterX = nose[3]?.x || nose[0]?.x || 0;

    const eyeAlignment = Math.abs(
      (leftEyeCenterX + rightEyeCenterX) / 2 - noseCenterX
    );

    return eyeAlignment < 10
      ? "Direct Eye Contact"
      : "Not Maintaining Eye Contact";
  };

  const analyzePosture = (landmarks, previousLandmarks) => {
    const jawOutline = landmarks.getJawOutline();
    const nose = landmarks.getNose();

    const leftJaw = jawOutline?.[0];
    const rightJaw = jawOutline?.[16];
    const nosePoint = nose?.[3] || nose?.[0];

    if (!leftJaw || !rightJaw || !nosePoint) return "Unable to detect posture";

    const headTilt = Math.abs(leftJaw.y - rightJaw.y);
    let movement = "Stable";

    if (previousLandmarks && previousLandmarks.nose?.[3] && nosePoint) {
      const movementThreshold = 15;
      const faceMovement = Math.abs(previousLandmarks.nose[3].y - nosePoint.y);
      movement =
        faceMovement > movementThreshold ? "Excessive Body Movement" : "Stable";
    }

    if (headTilt < 15 && movement === "Stable") {
      return "Good Posture";
    } else if (headTilt >= 15) {
      return "Head Tilt Detected";
    } else {
      return movement;
    }
  };

  const captureExpression = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // const handGesture = await analyzeHandGestures(video);

      if (!detections) {
        setInterviewData((prevData) => [
          ...prevData,
          {
            noFace: "No face Detected",
            timestamp: new Date().toISOString(),
          },
        ]);
        // console.log("no face detecteddd");

        return;
      }

      const expressions = detections.expressions;
      const dominantExpression = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      const confidence = expressions[dominantExpression].toFixed(2);
      const eyeContact = analyzeEyeContact(detections.landmarks);
      const posture = analyzePosture(detections.landmarks, previousLandmarks);

      previousLandmarks = detections.landmarks;

      // console.log(
      //   `Expression: ${dominantExpression}, Eye Contact: ${eyeContact}, Posture: ${posture}`
      // );

      setInterviewData((prevData) => [
        ...prevData,
        {
          expression: dominantExpression,
          confidence: parseFloat(confidence),
          eyeContact,
          posture,
          // handGesture,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - previousTimestamp >= 5000) {
        captureExpression();
        previousTimestamp = currentTime;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ------------------- SAVING GESTURE FEEDBACK DATA -----------------------------

  const SavingGestureFeedback = async (data) => {
    const serverData = {
      mockId: mockId,
      email: account.email,
      data,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/Can/Saving-Gesture-Feedback`,
        serverData
      );
      if (response.status === 200) {
        setSavingGesture(true);
      }
    } catch (error) {
      setSavingGesture(false);
      setModalMsg({
        open: true,
        msg: error.response.data.message
          ? error.response.data.message
          : "Check your connection! Try later",
        severity: "error",
      });
    }
  };

  // ------------------- GENERATING GESTURE FEEDBACK -----------------------------

  const endInterview = async () => {
    const serverData = {
      interviewData,
    };

    setLoadingGesture(true);
    if (!SavingGesture) {
      try {
        const response = await fetch(
          `${backendUrl}/Can/Generating-Gesture-Feedback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serverData }),
          }
        );

        const result = await response.json();
        SavingGestureFeedback(result);
      } catch (error) {
        setModalMsg({
          open: true,
          msg: error.response.data.message
            ? error.response.data.message
            : "Check your connection! Try later",
          severity: "error",
        });
      } finally {
        setLoadingGesture(false);
      }
    }
  };

  // ------------------- GENERATING OVERALL FEEDBACK -----------------------------

  const overAllFeedback = async () => {
    const server = {
      mockId: mockId,
      email: account.email,
      userAnswer,
    };
    setLoadingOverall(true);
    if (!OverallFeedbacks) {
      try {
        const response = await axios.post(
          `${backendUrl}/Can/Generating-Overall-Feedback`,
          server
        );
        if (response.status === 200) {
          setOverallFeedback(true);
        }
      } catch (error) {
        setOverallFeedback(false);
        setModalMsg({
          open: true,
          msg: error.response.data.message
            ? error.response.data.message
            : "Check your connection! Try later",
          severity: "error",
        });
      } finally {
        setLoadingOverall(false);
      }
    }
  };

  return (
    <>
      {error ? (
        <></>
      ) : !next ? (
        <Intructions setNext={setNext} />
      ) : !count ? (
        <CountdownAnimation setCount={setCount} />
      ) : loading ? (
        <Box className="h-screen w-screen flex items-center justify-center bg-purple-100 flex-col">
          <Typography className="text-xl sm:text-3xl font-semibold text-primary">
            Preparing Your Interview
          </Typography>
          <Typography className="text-xl sm:text-3xl font-semibold text-primary mt-1">
            Please Wait!
          </Typography>
          <CircularProgress size={30} className="text-primary mt-4" />
        </Box>
      ) : loadingGesture || loadingOverall ? (
        <Box className="h-screen w-screen flex items-center justify-center bg-purple-100 flex-col">
          <Typography className="text-xl sm:text-3xl font-semibold text-primary">
            Generating Your Feedback
          </Typography>
          <Typography className="text-xl sm:text-3xl font-semibold text-primary mt-1">
            Please Wait!
          </Typography>
          <CircularProgress size={30} className="text-primary mt-4" />
        </Box>
      ) : (
        // ---------------------- MOCK SCREEN -----------------------------------------------------
        <>
          <Box className="flex flex-col w-full h-screen py-6 px-4 sm:px-8 md:px-12 gap-4 sm:gap-6 md:gap-8 md:py-10 bg-[#202124]">
            {/* ---------------- Question Section --------------------------- */}

            <Box className="flex flex-col items-center text-white gap-4">
              {currentQuestionIndex > 11 &&
              (OverallFeedbacks === false || SavingGesture === false) ? (
                <>
                  <Box className="flex bg-yellow-200 p-3 rounded-lg">
                    <IoIosWarning className="text-yellow-700 hidden sm:block sm:text-2xl mt-[-8px] sm:mt-0 " />
                    <Typography className="text-yellow-700 text-justify">
                      <span className="font-semibold">Warning:</span> If you
                      close this tab or press the back button, your interview
                      feedback won’t be generated.
                    </Typography>
                  </Box>
                  <Typography className="text-xl sm:text-2xl md:text-3xl font-semibold text-red-600">
                    Server is Busy! Stay on Screen, and click on next button
                    after 20-30 seconds
                  </Typography>
                </>
              ) : (
                <>
                  <h2 className="text-sm sm:text-base md:text-2xl font-semibold tracking-wide text-gray-300">
                    QUESTION
                  </h2>

                  {/* ---------------- Mike Open Warning ----------------------- */}
                  {!isListening ? (
                    <p className="text-sm md:text-base lg:text-lg my-2 text-yellow-300 tracking-wide animate-pulse flex items-center gap-2 ml-4 sm:ml-0">
                    <WarningIcon className="w-5 h-5" />
                    Before answering the question, please click the 'Answer' button.
                  </p>
                  
                  ) : (
                  <p className="text-green-400 text-lg my-2 font-medium animate-pulse flex">
                  <span className="mt-1 mr-1"><FaRobot/></span>  AI is listening...</p>
                  )}

                  {/* ---------------- QUESTIONS ------------------------ */}

                  <p
                    id="question"
                    className="text-lg sm:text-xl md:text-3xl font-bold tracking-wide text-center"
                  >
                    {questions[currentQuestionIndex]}
                  </p>
                </>
              )}
            </Box>

            {/* ------------------------- Video Frames Section --------------------- */}

            <Box
              id="video-frames"
              className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-12 flex-wrap sm:mb-4"
            >
              {/* ---------------- AI ------------------------------  */}

              <Box
                id="Ai"
                className="w-full sm:w-[45%] md:w-[40%] h-48 sm:h-64 md:h-96 bg-[#3c4043] rounded-2xl flex items-end justify-center"
              >
                <Button
                  fullWidth
                  onClick={() =>
                    repeatQuestion(questions[currentQuestionIndex])
                  }
                  className="w-full bg-white/10 backdrop-blur-md rounded-md py-2 px-4 text-black font-semibold hover:bg-white/20 transition duration-200"
                >
                  <span
                    className={`text-xl mr-2 normal-case tracking-wide
                  ${isSpeaking ? "text-green-500" : "bg-transparent"}`}
                  >
                    Repeat
                  </span>
                  <span
                    className={`${
                      isSpeaking ? "text-green-500" : "bg-transparent"
                    }`}
                  >
                    <VolumeUpIcon className={`text-3xl`} />
                  </span>
                </Button>
              </Box>

              {/* ---------------- Timer ------------------ */}

              <Box className="flex animate-pulse items-center justify-center text-red-500 text-2xl sm:text-3xl font-bold mx-4 sm:mx-6">
                {Math.floor(timer / 60)}:
                {(timer % 60).toString().padStart(2, "0")}
              </Box>

              {/* ------------------- Webcam ---------------- */}
              <Box
                id="web-cam"
                className="relative w-full sm:w-[45%] md:w-[40%] h-48 sm:h-64 md:h-96 bg-[#3c4043] rounded-2xl overflow-hidden"
              >
                {/* Live Video */}

                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={400}
                  mirrored
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute bottom-0  flex justify-center w-full">
                  {!isListening ? (
                    <Button
                      className="w-full bg-white/10 backdrop-blur-md rounded-md py-2 px-4 text-black font-semibold hover:bg-white/20 transition duration-200"
                      fullWidth
                      onClick={startListening}
                    >
                      <span className="text-xl mr-2 normal-case tracking-wide text-green-500">
                        Answer
                      </span>
                      <MicIcon className="text-3xl text-green-500" />
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-white/10 backdrop-blur-md rounded-md py-2 px-4 text-black font-semibold hover:bg-white/20 transition duration-200"
                      fullWidth
                      onClick={stopListening}
                    >
                      <span className="text-xl mr-2 normal-case tracking-wide text-red-500">
                        Stop
                      </span>
                      <MicOffIcon className="text-3xl text-red-500" />
                    </Button>
                  )}
                </div>
              </Box>
            </Box>

            {/* --------------------------------- Buttons Section --------------------------- */}

            <Box className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8">
              <Button
                onClick={handleNextQuestionWithDisable}
                disabled={isSpeaking || isNextButtonDisabled}
                className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 px-4 sm:px-5 py-2 sm:py-3 font-bold text-lg rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<SkipNextIcon />}
              >
                Skip
              </Button>
              <Button
                disabled={isSpeaking || isNextButtonDisabled}
                onClick={() => {
                  handleNextQuestionWithDisable();
                  setNextClicked((data) => !data);
                }}
                className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 px-4 sm:px-5 py-2 sm:py-3 font-bold text-lg rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<NextIcon />}
              >
                Next
              </Button>
            </Box>
          </Box>

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
      )}
    </>
  );
};

export default Can_AiIntPage;