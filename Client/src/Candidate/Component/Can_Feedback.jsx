import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataProvider";
import { useParams } from "react-router-dom";

const Can_Feedback = () => {
  const steps = [
    {
      id: 1,
      title: "Question 1 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 2,
      title: "Question 2 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 3,
      title: "Question 3 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 4,
      title: "Question 4 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 5,
      title: "Question 5 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 6,
      title: "Question 6 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 7,
      title: "Question 7 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 8,
      title: "Question 8 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 9,
      title: "Question 9 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 10,
      title: "Question 10 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 11,
      title: "Question 11 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
    {
      id: 12,
      title: "Question 12 Feedback",
      question:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      answer:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
      feedback:
        "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    },
  ];

  const { backendUrl } = useContext(DataContext);
  const { mockId } = useParams();

  // ----------------- USE STATES --------------------

  const [activeStep, setActiveStep] = useState(1);
  const [OverallFeedback, setOverallFeedback] = useState([]);
  const [GestureFeedback, setGestureFeedback] = useState([]);

  useEffect(() => {
    const fetchingFeedback = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Can/Fetching-Gesture-Feedback`,
          {
            params: { mockId },
          }
        );

        if (response.status === 200 && response.data.feedbackData?.length > 0) {
          const firstFeedback = response.data.feedbackData[0];

          if (firstFeedback.GestureFeedback) {
            setGestureFeedback(firstFeedback);
          } else if (response.data.feedbackData[1]) {
            setGestureFeedback(response.data.feedbackData[1]);
          }

          if (firstFeedback.QuestionAnswerFeedback) {
            setOverallFeedback(firstFeedback);
          } else if (response.data.feedbackData[1]) {
            setOverallFeedback(response.data.feedbackData[1]);
          }
        }
      } catch (error) {
        console.log(error.response?.data?.message || "Error fetching feedback");
      }
    };

    fetchingFeedback();
  }, [mockId, backendUrl]);

  useEffect(() => {
    // console.log("Gestures", GestureFeedback);
    // console.log("overall", OverallFeedback);
  }, [OverallFeedback, GestureFeedback]);

  const demo = JSON.parse(OverallFeedback);
  console.log(demo);

  return (
    <div className="w-full h-auto px-6 sm:px-12 md:px-16 py-10 sm:py-4 bg-purple-50 flex flex-col mx-auto">
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
              Type of Interview:
            </span>{" "}
            Resume-based
          </p>

          <p className="text-lg sm:text-xl  text-gray-700">
            <span className="text-primary font-semibold">Date:</span>{" "}
            14/Feb/2024
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
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
            repellat rem explicabo temporibus.
          </p>
        </div>
        <div className="p-6 bg-[#F4F1FF] border border-[#8667F2] rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-[#8667F2] mb-2">
            Overall Gestures Feedback
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
            mollitia similique dicta distinctio.
          </p>
        </div>
      </div>

      {/* ----------------------------------- QUESTIONS FEEDBACK ---------------------------------------- */}

      <div className="w-full max-w-6xl mt-10 bg-[#F4F1FF] rounded-2xl shadow-lg p-8 border border-primary">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Can_Feedback;
