import React, { useState } from "react";
import img1 from "../assets/images/oneonone.jpg";
import img2 from "../assets/images/aiconverse.gif";
import img3 from "../assets/images/feedback.gif";
import img5 from "../assets/images/resumeats.gif";

const steps = [
  {
    id: 1,
    title: "Offer 1:1 sessions",
    description:
      "Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else.",
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
    image: img1,
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

  return (
    <div className="flex flex-col lg:flex-row items-center w-full px-4 py-6 sm:px-6 lg:px-10">
      
      <div className="hidden lg:block lg:w-1/2 bg-[#c28ceb] p-6 rounded-3xl">
        <img
          src={steps.find((step) => step.id === activeStep)?.image}
          alt="Step view"
          className="rounded-lg filter drop-shadow-xl w-full h-[400px] object-contain"
        />
      </div>

      {/* Steps Section */}
      <div className="w-full lg:w-1/2 space-y-4 px-4 sm:px-6">
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
