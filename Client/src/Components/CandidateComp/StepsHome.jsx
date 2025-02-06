import React, { useRef, useState } from "react";
import img1 from "../../assets/images/side1.png";
import img2 from "../../assets/images/side2.png";
import img3 from "../../assets/images/side3.png";
import img4 from "../../assets/images/side4.png";
import img5 from "../../assets/images/side5.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const steps = [
  {
    id: 1,
    title: "Comprehensive Mock Performance Insights",
    description: "View detailed analytics on your past mock interviews to monitor consistency and growth.",
    image: img1,
  },
  {
    id: 2,
    title: "Personalized AI-Powered Interview Prep",
    description: "Get customized interview questions based on your resume, domain, and skills for targeted practice.",
    image: img2,
  },
  {
    id: 3,
    title: "Smart Feedback with AI & Gesture Recognition",
    description: "AI analyzes your eye contact, body language, and responses to give detailed improvement tips.",
    image: img3,
  },
  {
    id: 4,
    title: "Mock Interviews with Industry Experts",
    description: "Book real-time mock interviews with professionals and get valuable feedback on your skills.",
    image: img4,
  },
  {
    id: 5,
    title: "Resume ATS Score & Optimization",
    description: "Upload your resume, get an ATS score, and receive improvement suggestions to pass screenings.",
    image: img5,
  },
];

export default function StepsHome() {

  const [activeStep, setActiveStep] = useState(1);

// ----------------------- GSAP ANIMATION -------------------
// ----------------------- GSAP ANIMATION -------------------

  gsap.registerPlugin(ScrollTrigger)

  const ImgBoxRef = useRef(null)
  const ImgContentRef = useRef(null)

  useGSAP(() => {
    gsap.from(ImgBoxRef.current,{
      x:-90,
      duration:1,
      opacity:0,
      scrollTrigger:{
        trigger:ImgBoxRef.current,
      }
    })

    gsap.from(ImgContentRef.current,{
      x:90,
      duration:1,
      opacity:0,
      scrollTrigger:{
        trigger:ImgContentRef.current,
      }
    })
  })

  return (
    <div className="flex flex-col lg:flex-row items-center w-full px-4 py-6 sm:px-6 lg:px-10 bg-[#f5f3ff]">
      <div 
      ref={ImgBoxRef}
      className="hidden lg:block lg:w-1/2 bg-[#c28ceb] p-6 rounded-3xl">
        <img
          src={steps.find((step) => step.id === activeStep)?.image}
          alt="Step view"
          className="rounded-lg filter drop-shadow-xl w-full h-[400px] object-contain"
        />
      </div>

      <div 
      ref={ImgContentRef}
      className="w-full lg:w-1/2 space-y-4 px-4 sm:px-6">
        {steps.map((step) => (
          <div key={step.id} className="border-b pb-2">
            <button
              onClick={() => setActiveStep(step.id)}
              className="flex justify-between w-full text-left py-3 font-semibold text-gray-900 hover:text-[#8667F2] transition-all"
            >
              <span>{step.id}. {step.title}</span>
              <span>{activeStep === step.id ? "▲" : "▼"}</span>
            </button>
            {activeStep === step.id && (
              <p className="text-gray-600 px-4 pb-3">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
