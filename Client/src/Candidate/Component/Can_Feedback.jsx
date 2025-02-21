import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataProvider";
import { NavLink, useParams } from "react-router-dom";
import { useMemo } from "react";
import Can_Layout from "../CanLayout/Can_Layout"
import { Box, Button, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Can_Feedback = () => {

  useEffect(() => {
    setTimeout(() => {
      document.body.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, []);

  const {backendUrl} = useContext(DataContext)
  const {mockId} = useParams()

  // ----------------- USE STATES --------------------

  const [activeStep, setActiveStep] = useState(1);
  const [OverallFeedback, setOverallFeedback] = useState([]);
  const [GestureFeedback, setGestureFeedback] = useState([]);
  const [QuesAnswerFeedback, setQuesAnswerFeedback] = useState([]);
  const [intType, setIntType] = useState("");
  const [loading, setLoading] = useState(false)

  // ------------  FETCHING FEEDBACK DATA ---------------
  
  useEffect(() => {
    const fetchingFeedback = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${backendUrl}/Can/Fetching-Gesture-Feedback`,
          {
            params: { mockId },
          }
        );

        if (response.status === 200 && response.data.feedbackData?.length > 0) {
          setIntType(response.data.feedbackDataType);
          const firstFeedback = response.data.feedbackData[0];

          if (firstFeedback.GestureFeedback) {
            setGestureFeedback(firstFeedback);
          } else if (response.data.feedbackData[1].GestureFeedback) {
            setGestureFeedback(response.data.feedbackData[1]);
          } else {
            setGestureFeedback(response.data.feedbackData[2]);
          }

          if (firstFeedback.QuestionAnswerFeedback) {
            setOverallFeedback(firstFeedback);
          } else if (response.data.feedbackData[1].QuestionAnswerFeedback) {
            setOverallFeedback(response.data.feedbackData[1]);
          } else {
            setOverallFeedback(response.data.feedbackData[2]);
          }

          if(firstFeedback.userQuestionAnswer){
            setQuesAnswerFeedback(firstFeedback)
          } else if (response.data.feedbackData[1].userQuestionAnswer){
            setQuesAnswerFeedback(response.data.feedbackData[1])
          } else {
            setQuesAnswerFeedback(response.data.feedbackData[2])
          }

        }
      } catch (error) {
        console.log(error.response?.data?.message || "Error fetching feedback");
      } finally {
        setLoading(false)
      }
    };

    fetchingFeedback();
  }, [mockId, backendUrl]);

  // ------------  DELETING SESSION STORAGE ---------------

  useEffect(() => {
    sessionStorage.removeItem("SavingGesture");
    sessionStorage.removeItem("OverallFeedbacks");
    sessionStorage.removeItem("next");
    sessionStorage.removeItem("count");
  },[])

// ------------ FOR SHOWING GESTURE DATA --------------

  const FinalGestureFeedback = GestureFeedback && GestureFeedback.GestureFeedback
  ? typeof GestureFeedback.GestureFeedback === "string"
    ? GestureFeedback.GestureFeedback.replace(/^"|"$/g, "").replace(/\\/g, "")
    : JSON.stringify(GestureFeedback.GestureFeedback, null, 2)
  : "";

  const parsedFeedback = FinalGestureFeedback 
    ? (typeof FinalGestureFeedback === "string" && FinalGestureFeedback.trim() !== "" 
        ? JSON.parse(FinalGestureFeedback) 
        : FinalGestureFeedback)
    : { areas_for_improvement: "No data available", suggestions: "No suggestions available" };

    const formattedDate = new Date(GestureFeedback?.createdAt).toLocaleDateString(
      "en-GB", 
      { day: "2-digit", month: "short", year: "numeric" }
    );
    

// ------------ FOR SHOWING QUESTIONS DATA --------------  

let steps = [];

if (QuesAnswerFeedback && QuesAnswerFeedback.userQuestionAnswer) {
    let userQuestionAnswer = QuesAnswerFeedback.userQuestionAnswer;

    if (typeof userQuestionAnswer === "string") {
      userQuestionAnswer = JSON.parse(userQuestionAnswer.replace(/^"|"$/g, '').replace(/\\/g, ''));
    }

    steps = userQuestionAnswer.map((item, index) => ({
      id: index + 1,
      title: `Question ${index + 1} Feedback`,
      question: item.question || "No question provided",
      answer: item.answer || "No answer provided",
      feedback: "No feedback Available", 
    }));
} 

// ------------ FOR SHOWING FEEDBACK DATA --------------  

let feedbackString = "";

if (OverallFeedback && OverallFeedback.QuestionAnswerFeedback) {
    feedbackString = OverallFeedback.QuestionAnswerFeedback; 

    if (typeof feedbackString === "string") {
      feedbackString = feedbackString.replace(/\n/g, "").replace(/\\/g, "");

      let feedbackData = JSON.parse(feedbackString);

      steps = steps.map((step, index) => {
        if (index < 12 && feedbackData[index]) {
          const feedbackKey = Object.keys(feedbackData[index])[0]; 
          return {
            ...step,
            feedback: feedbackData[index][feedbackKey] || "No feedback available",
          };
        }
        return step;
      });
    }
}

const parsedFeedbacks = useMemo(() => {
  try {
    return feedbackString ? JSON.parse(feedbackString) : [];
  } catch (error) {
    console.error("Error parsing feedbackString:", error);
    return [];
  }
}, [feedbackString]);


  return (
    <Can_Layout>
    <div className="w-full h-auto px-6 sm:px-12 md:px-16 py-10 sm:py-4 bg-purple-50 flex flex-col mx-auto">
    
    <NavLink to={"/Candidate/AI/Mock"}>
    <Box className="relative right-12">
        <Typography>
          <ArrowBackIcon/>
        </Typography>
      </Box>
    </NavLink>
      {/* ------------------------------------------------------------------------------------------ */}

      <h1 className="text-center text-4xl font-semibold text-purple-700 underline underline-offset-2 mb-12  uppercase ">
        Feedback
      </h1>
      {/* ------------------------------------------------------------------------------------------ */}

      {/* ------------------------------------- TYPE & DATE ---------------------------------------- */}

      <div className="w-full bg-[#F4F1FF]  rounded-2xl shadow-md px-4 py-6 border border-primary">
        <div className="flex flex-col gap-4 text-gray-800 sm:flex-row justify-between ">
          <p className=" text-lg sm:text-xl text-gray-700">
            <span className="text-primary font-semibold">
              Interview Details:
            </span>{" "}
            {loading ? (<span className="text-black font-bold text-[16px]">Loading...</span>) : (
              <>
              {intType}
              </>
            )}
          </p>

          <p className="text-lg sm:text-xl  text-gray-700">
            <span className="text-primary font-semibold">Date:</span>{" "}
            {loading ? ((<span className="text-black font-bold text-[16px]">Loading...</span>)) : 
            (
              <>
              {formattedDate}
              </>
            )}
          </p>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------ */}

      {/* ----------------------------------- GESTURES & SKILLS FEEDBACK ------------------------------ */}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="p-6 bg-[#F4F1FF] border border-[#8667F2] rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-[#8667F2] mb-2">
            Overall Technical Feedback
          </h2>
          {loading ? (
            <p className="text-black font-bold">Loading...</p>
          ) : (
            <p className="text-gray-700">
            {parsedFeedbacks.length > 12 ? parsedFeedbacks[12].overallFeedback : "No overall feedback available"}
            </p>
          )}
        </div>

        <div className="p-6 bg-[#F4F1FF] border border-[#8667F2] rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-[#8667F2] mb-2">
            Overall Gestures Feedback
          </h2>
          {loading ? (
            <p className="text-black font-bold">Loading...</p>
          ) : (
            <>
            <p className="text-gray-700">
            <strong>Area of Improvement:</strong> {parsedFeedback.areas_for_improvement || "Not available."}
          </p>
          <p className="text-gray-700">
            <strong>Suggestions:</strong> {parsedFeedback.suggestions || "No suggestions available."}
          </p>
          </>
          )}
        </div>


      </div>

      {/* ----------------------------------- QUESTIONS FEEDBACK ---------------------------------------- */}

      <div className="w-full  mt-10 bg-[#F4F1FF] rounded-2xl shadow-lg p-8 border border-primary">
        {/* ----------------------------------------------------------------------------------------------- */}
        <h2 className="text-2xl font-semibold text-[#8667F2] mb-4">
          Individual Questions Feedback
        </h2>
        {/* ----------------------------------------------------------------------------------------------- */}

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="border-b border-gray-300 mb-1">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`flex justify-between w-full text-left py-3 font-semibold transition-all ${
                  activeStep === step.id ? "text-[#8667F2]" : "text-gray-900"
                }`}
              >
                <span>{step.title}</span>
                <span>{activeStep === step.id ? "▲" : "▼"}</span>
              </button>
              {activeStep === step.id && (
                <>
                {loading ? (
                  <p className="text-black font-bold mb-6">Loading...</p>
                ) : (
                  <>
                    <p className="text-gray-700 px-4 pb-3">
                    Question: {step.question}
                  </p>
                  <p className="text-gray-700 px-4 pb-3">
                    Your answer: {step.answer}
                  </p>
                  <p className="text-gray-700 px-4 pb-3">
                    Feedback: {step.feedback}
                  </p>
                  </>
                )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </Can_Layout>
  );
};

export default Can_Feedback;
