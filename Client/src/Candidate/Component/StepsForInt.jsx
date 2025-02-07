import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/c1.jpg"
import img2 from "../../assets/images/S2.png"
import img3 from "../../assets/images/c3.jpg"
import img4 from "../../assets/images/S4.png"

const StepsForInt = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 10);
    }, 400);

    if (progress >= 100) {
      setActiveStep((prev) => (prev + 1) % 4);
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <>
   <h1 className="px-16 py-3 text-4xl font-bold text-[#8667F2] w-full bg-[#f3f5ff] text-center">
      Mock-Ninja: Your Interview Journey Starts Here!
    </h1>
    <div className="flex flex-col-reverse md:flex-row w-full min-w-screen px-10 py-2 gap-12 md:gap-8 items-center bg-[#f5f3ff]">
      <div className="space-y-2 w-full lg:w-full gap-3">
        <div
          className={`relative rounded-lg p-6 text-xl transition-all duration-300 ${
            activeStep === 0
              ? "bg-[#8667F2] text-white"
              : "bg-[#e0c3fc] text-gray-700"
          }`}
        >
          <button className="w-full text-left font-medium">
            1. Upload your Resume or Select Domain or Choose a Skill
          </button>
          {activeStep === 0 && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-gray-500 transition-all duration-400 ease-in"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>

        <div
          className={`relative rounded-lg p-6 text-xl transition-all duration-300 ${
            activeStep === 1
              ? "bg-primary text-white"
              : "bg-[#e0c3fc] text-gray-700"
          }`}
        >
          <button className="w-full text-left font-medium">
            2. Choose a difficulty level you want the questions to be in
          </button>
          {activeStep === 1 && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-gray-500 transition-all duration-400 ease-in"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>

        <div
          className={`relative rounded-lg p-6 text-xl transition-all duration-300 ${
            activeStep === 2
              ? "bg-primary text-white"
              : "bg-[#e0c3fc] text-gray-700"
          }`}
        >
          <button className="w-full text-left font-medium">
            3. Start your Interview Instantly
          </button>
          {activeStep === 2 && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-gray-500 transition-all duration-400 ease-in"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>

        <div
          className={`relative rounded-lg p-6 text-xl transition-all duration-300 ${
            activeStep === 3
              ? "bg-primary text-white"
              : "bg-[#e0c3fc] text-gray-700"
          }`}
        >
          <button className="w-full text-left font-medium">
            4. Get detailed feedback once you are done
          </button>
          {activeStep === 3 && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-gray-500 transition-all duration-400 ease-in"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
      </div>
        {/* Image Section---------------------------------------------------------------------- */}
        <div className="flex w-full md:w-1/2 justify-center mt-10 md:mt-0 mb-6">
          <img
            src={activeStep === 0 ? img1 : activeStep === 1 ? img2 : activeStep ===2 ? img3 : img4}
            alt="Step"
            className="hidden sm:block w-[400px] h-auto rounded-full filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_8px_6px_rgba(0,0,0,0.7)] md:w-[300px] lg:w-[400px] sm:w-[250px]"
          />
        </div>
        </div>
    </>
  );
};

export default StepsForInt;
