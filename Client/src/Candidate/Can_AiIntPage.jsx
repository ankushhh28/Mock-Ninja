import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";
import axios from "axios";
import { Alert, Box, CircularProgress, Snackbar, Button } from "@mui/material";

import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import NextIcon from "@mui/icons-material/ChevronRight";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import Intructions from "./Component/InstructionsAI";
import CountdownAnimation from "./Component/CountDown";

const Can_AiIntPage = () => {
  const { backendUrl, account } = useContext(DataContext);

  // -------------- Fetching Mock ID in URL -------------------------

  const params = useParams();
  const mockId = params.mockID;
  const recognitionRef = useRef(null);

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
  const [userAnswer,setUserAnswer] = useState([])

  // ---CURRENT_QUESTION_INDEX -- SECONDS COUNT INDEX  (SESSION STORAGE) --------

  const savedQuestions =
    parseInt(sessionStorage.getItem("currentQuestionIndex")) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const savedCount = parseInt(sessionStorage.getItem("timer") || 120);
  const [timer, setTimer] = useState(120);

  // console.log(timer, currentQuestionIndex);

  // useEffect(()

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
                .replace(/[\[\]{}":.\?]|question|\b\d+\b/g, "")
                .split(/,(?=[A-Z])/)
                .map((item) => item.trim())
                .filter((item) => item !== "");
          setQuestions(questionsArray);
          // console.log(questionsArray);
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
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.length - 1) {
        return prevIndex + 1;
      } else {
        endInterview();
        sessionStorage.removeItem("currentQuestionIndex");
        sessionStorage.removeItem("timer");
        return;
      }
    });
    setTimer(120);
  };

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

  // useEffect(() => {
  //   console.log(userAnswer);
    
  // },[userAnswer])

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
        // utterance.onstart = () => setIsSpeaking(true);
        // utterance.onend = () => setIsSpeaking(false);

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
    synth.speak(utterance);
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  // -------------------------- GESTURE FEEDBACK ----------------------
  // ------------------------------------------------------------------
  // ------------------------------------------------------------------

  const webcamRef = useRef(null);
  const [interviewData, setInterviewData] = useState([]);
  const [feedback, setFeedback] = useState(null);
  let previousLandmarks = null;
  let previousTimestamp = Date.now();
  let previousFrame = null;
  let stableHandCounter = 0;

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

      console.log("Models Loaded Successfully");
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

  // ------------------- GENERATING FEEDBACK -----------------------------

  const endInterview = async () => {
    console.log("Sending all interview data:", interviewData);

    try {
      const response = await fetch(
        `${backendUrl}/Can/Generating-Gesture-Feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interviewData }),
        }
      );

      const result = await response.json();
      // setFeedback(result);
      console.log("Feedback received:", result);
    } catch (error) {
      console.error("Error sending data:", error);
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
        <Box className="h-screen w-screen flex items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        // ---------------------- MOCK SCREEN -----------------------------------------------------
        <>
          <Box className="flex flex-col w-full h-screen py-6 px-4 sm:px-8 md:px-12 gap-4 sm:gap-6 md:gap-8 md:py-10 bg-[#202124]">
            {/* ---------------- Question Section --------------------------- */}

            <Box className="flex flex-col items-center text-white gap-4">
              <h2 className="text-sm sm:text-base md:text-2xl font-semibold tracking-wide text-gray-300">
                QUESTION
              </h2>

              <p
                id="question"
                className="text-lg sm:text-xl md:text-3xl font-bold tracking-wide text-center"
              >
                {questions[currentQuestionIndex]}
              </p>
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
                >
                  <span className="text-xl mr-2 normal-case tracking-wide">
                    Repeat
                  </span>
                  <VolumeUpIcon className="text-3xl" />
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

                <div className="absolute bottom-1  flex justify-center w-full">
                  {!isListening ? (
                    <Button fullWidth onClick={startListening}>
                      <span className="text-xl mr-2 normal-case tracking-wide">
                        Answer
                      </span>
                      <MicIcon className="text-3xl" />
                    </Button>
                  ) : (
                    <Button fullWidth onClick={stopListening}>
                      <span className="text-xl mr-2 normal-case tracking-wide">
                        Stop
                      </span>
                      <MicOffIcon className="text-3xl" />
                    </Button>
                  )}
                </div>
              </Box>
            </Box>

            {/* --------------------------------- Buttons Section --------------------------- */}
            <Box className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8">
              <Button
                onClick={handleNextQuestion}
                className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 px-4 sm:px-5 py-2 sm:py-3 font-bold text-lg rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
                endIcon={<SkipNextIcon />}
              >
                Skip
              </Button>
              <Button
                onClick={handleNextQuestion}
                className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 px-4 sm:px-5 py-2 sm:py-3 font-bold text-lg rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
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