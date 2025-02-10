import React, { useState, useEffect, useRef } from "react";
import img1 from "../../assets/images/oneonone.jpg";
import img2 from "../../assets/images/aiconverse.gif";
import img3 from "../../assets/images/feedback.gif";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const steps = [
  {
    id: 1,
    title: "Sign Up and set up your profile in seconds",
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

  // --------------------------- GSAP ANIMATION -----------------------------------
  // --------------------------- GSAP ANIMATION -----------------------------------

  gsap.registerPlugin(ScrollTrigger)

  const leftText = useRef(null)
  const leftSteps = useRef(null)
  const RightImages = useRef(null)

  useGSAP(() => {
    gsap.from(leftText.current, {
      x:-80,
      opacity:0,
      duration:1,
      scrollTrigger:leftText.current
    })

    gsap.from(leftSteps.current, {
      x:-80,
      opacity:0,
      delay:0.5,
      duration:1,
      scrollTrigger:leftText.current
    })

    gsap.from(RightImages.current, {
      x:170,
      opacity:0,
      delay:0.5,
      duration:1,
      scrollTrigger:leftText.current
    })
  })

  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : prev)); 
    }, 50); 
  
    if (progress >= 100) {
      setTimeout(() => {
        setActiveStep((prev) => (prev + 1) % steps.length); 
        setProgress(0); 
      }, 300);
    }
  
    return () => clearInterval(interval);
  }, [progress]);
  

  return (
    <>
      <h1 
      ref={leftText}
      className="px-16 py-6 gap-16 text-4xl font-bold text-[#8667F2] w-full p-2 bg-[#f3f5ff] ">
        How to become an interviewer?
      </h1>

      <div className="flex px-16 py-6 gap-16 items-center bg-[#f5f3ff] ">
      {/* steps------------------------------------------------------------------------------------------- */}
        <div 
        ref={leftSteps}
        className="space-y-2 lg:w-1/2 gap-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative rounded-lg p-3 sm:p-5 text-xl transition-all duration-300 ${
                activeStep === index ? "bg-[#c28ceb] text-white" : "bg-[#e0c3fc] text-gray-700"
              }`}
            >
              <button className="w-full text-lg sm:text-xl lg:text-2xl text-left font-medium">
                {step.id}. {step.title}
              </button>

               {/* Progress Bar ----------------------------------------------------------------------------------- */}
              {activeStep === index && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-gray-600 transition-all duration-400 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>

        <div 
          ref={RightImages}
        className="hidden md:inline-block lg:w-1/2 items-start bg-[#c28ceb] p-5 rounded-2xl">
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
