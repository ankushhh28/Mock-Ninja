import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/oneonone.jpg";
import img2 from "../../assets/images/aiconverse.gif";
import img3 from "../../assets/images/feedback.gif";

const steps = [
  {
    id: 1,
    title: "Sign Up and set up your profile in minutes",
    image: img1,
  },
  {
    id: 2,
    title: "Get Your Profile Verified",
    image: img2,
  },
  {
    id: 3,
    title: "Start conducting interviews and get paid for sharing your expertise",
    image: img3,
  },
];

export default function StepsInterviewer() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 10);
    }, 300);

    if (progress >= 100) {
      setActiveStep((prev) => (prev + 1) % steps.length);
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <>
      <h1 className="px-16 py-6 gap-16 text-4xl font-bold text-[#8667F2] w-full p-2 bg-[#f3f5ff] ">
        How to become an interviewer?
      </h1>

      <div className="flex px-16 py-6 gap-16 items-center bg-[#f5f3ff] ">
      {/* steps------------------------------------------------------------------------------------------- */}
        <div className="space-y-2 lg:w-1/2 gap-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative rounded-lg p-6 text-xl transition-all duration-300 ${
                activeStep === index ? "bg-[#c28ceb] text-white" : "bg-[#e0c3fc] text-gray-700"
              }`}
            >
              <button className="w-full text-left font-medium">
                {step.id}. {step.title}
              </button>

               {/* Progress Bar ----------------------------------------------------------------------------------- */}
              {activeStep === index && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-gray-500 transition-all duration-400 ease-in"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:inline-block lg:w-1/2 items-start bg-[#c28ceb] p-5 rounded-2xl">
          <img
            src={steps[activeStep].image}
            alt="Step"
            className="rounded-lg w-full h-[350px]"
          />
         </div>
      </div>
    </>
  );
}
