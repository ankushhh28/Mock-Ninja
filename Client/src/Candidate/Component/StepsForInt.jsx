import React, { useState, useEffect, useRef } from "react";
import img1 from "../../assets/images/c1.jpg";
import img2 from "../../assets/images/side5.png";
import img3 from "../../assets/images/c3.jpg";
import img4 from "../../assets/images/S4.png";

import OneIcon from '@mui/icons-material/LooksOne';
import TwoIcon from '@mui/icons-material/LooksTwo';
import ThreeIcon from '@mui/icons-material/Looks3';
import FourIcon from '@mui/icons-material/Looks4';

import gsap from "gsap"
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StepsForInt = () => {

  // ----------------- GSAP ANIMATION -------------------
  // ----------------- GSAP ANIMATION -------------------

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
      duration:1,
      scrollTrigger:leftSteps.current
    })

    gsap.from(RightImages.current, {
      x:170,
      opacity:0,
      duration:1,
      scrollTrigger:RightImages.current
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
        setActiveStep((prev) => (prev + 1) % 4);
        setProgress(0);
      }, 300);
    }

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <>
      <h1
      ref={leftText}
       className="px-10 pt-12 md:pt-16 lg:pt-20 md:px-14 md:pb-10 lg:pb-12 text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-700 w-full bg-[#f3f5ff] ">
        Follow these Steps to
        <span className="text-primary"> Ace Your Interview!</span>
      </h1>
      <div 
      className="flex flex-col-reverse md:flex-row w-full  px-12  gap-12 md:gap-8 items-center justify-center pb-20 bg-[#f5f3ff]">
        <div 
      ref={leftSteps}
        className="space-y-4 w-full md:w-[60%] lg:w-[75%] ">
          <div
            className={`relative rounded-lg  p-3 sm:p-5 text-xl transition-all duration-300 ${
              activeStep === 0
                ? "bg-[#8667F2] text-white"
                : "bg-[#e0c3fc] text-gray-700"
            }`}
          >
            <button className="flex items-center w-full text-left font-medium text-sm md:text-2xl">
              <span><OneIcon className="sm:text-3xl mr-3"/></span>Upload Resume or Select Domain or Choose any Skill
            </button>
            {activeStep === 0 && (
              <div
                className="absolute bottom-0 rounded-lg left-0 h-1 bg-gray-700 transition-all duration-400 ease-in-out"
                style={{ width: `${progress}%`, maxWidth:"99.85%" }}
              />
            )}
          </div>

          <div
            className={`relative rounded-lg p-3 sm:p-5 text-xl transition-all duration-300 ${
              activeStep === 1
                ? "bg-primary text-white"
                : "bg-[#e0c3fc] text-gray-700"
            }`}
          >
            <button className="flex items-center w-full text-left font-medium text-sm md:text-2xl">
            <span><TwoIcon className="text-3xl mr-3"/></span>Choose a difficulty level
            </button>
            {activeStep === 1 && (
              <div
                className="absolute bottom-0 rounded-lg left-0 h-1 bg-gray-700 transition-all duration-400 ease-in-out"
                style={{ width: `${progress}%`, maxWidth:"99.85%"  }}
              />
            )}
          </div>

          <div
            className={`relative rounded-lg p-3 sm:p-5 text-xl transition-all duration-300 ${
              activeStep === 2
                ? "bg-primary text-white"
                : "bg-[#e0c3fc] text-gray-700"
            }`}
          >
            <button className="flex items-center w-full text-left font-medium text-sm md:text-2xl">
            <span><ThreeIcon className="text-3xl mr-3"/></span>Start your Interview Instantly
            </button>
            {activeStep === 2 && (
              <div
                className="absolute rounded-lg bottom-0 left-0 h-1 bg-gray-700 transition-all duration-400 ease-in-out"
                style={{ width: `${progress}%`, maxWidth:"99.85%"  }}
              />
            )}
          </div>

          <div
            className={`relative rounded-lg p-3 sm:p-5 text-xl transition-all duration-300 ${
              activeStep === 3
                ? "bg-primary text-white"
                : "bg-[#e0c3fc] text-gray-700"
            }`}
          >
            <button className="flex items-center w-full text-left font-medium text-sm md:text-2xl">
            <span><FourIcon className="text-3xl mr-3"/></span>Get detailed feedback once you are done
            </button>
            {activeStep === 3 && (
              <div
                className="absolute bottom-0 rounded-lg left-0 h-1 bg-gray-700 transition-all duration-400 ease-in-out"
                style={{ width: `${progress}%`, maxWidth:"99.85%"  }}
              />
            )}
          </div>
        </div>

        {/* Image Section---------------------------------------------------------------------- */}
        <div 
        ref={RightImages}
        className="flex w-full md:w-1/2 justify-center ">
          <img
            src={
              activeStep === 0
                ? img1
                : activeStep === 1
                ? img2
                : activeStep === 2
                ? img3
                : img4
            }
            alt="Step"
            className="hidden sm:block w-[400px] h-auto rounded-full filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.2)] md:w-[300px] lg:w-[400px] sm:w-[250px]"
          />
        </div>
      </div>
    </>
  );
};

export default StepsForInt;
