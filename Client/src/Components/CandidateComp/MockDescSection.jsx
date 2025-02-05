import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import chatbot from "../../assets/images/bgremovedbot.gif";
import longbot from "../../assets/images/longbot.gif";
import interviewer from "../../assets/images/interviewer.png";
import { Button } from "@mui/material";
import { DataContext } from "../../Context/DataProvider";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const MockDescSection = () => {
  const { beforeLogin, setBeforeLogin, account } = useContext(DataContext);

  // ----------------------------- GSAP ANIMATION -----------------
  // ----------------------------- GSAP ANIMATION -----------------

  gsap.registerPlugin(ScrollTrigger);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text1ImgRef = useRef(null);
  const text2ImgRef = useRef(null);

  useGSAP(() => {
    gsap.from(text1Ref.current, {
      x: -90,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: text1Ref.current,
      },
    });

    gsap.from(text2Ref.current, {
      x: 90,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: text2Ref.current,
      },
    });

    gsap.from(text1ImgRef.current, {
      x: 90,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: text1ImgRef.current,
      },
    });

    gsap.from(text2ImgRef.current, {
      x: -90,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: text2ImgRef.current,
      },
    });
  });

  return (
    <section className="flex flex-col items-center w-full md:px-2 px-4 py-16 max-w-[2014px] space-y-20 md:ml-8">
      {/* textLeft----------------------------------------------------------------------------------------------------------------- */}

      <div className="flex flex-col lg:flex-row items-center w-full justify-center md:justify-around pr-20 ml-[65px] sm:ml-0">
        <div
          ref={text1Ref}
          className="lg:w-1/2 text-center lg:text-left space-y-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            AI-Based <span className="text-[#8667F2]">Mock Interviews</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-600 text-justify">
            Get personalized interview questions based on your resume, domain,
            and skills. AI analyzes your responses, eye contact, and body
            language to provide detailed feedback. Get an ATS resume score with
            improvement tips to pass automated screenings.
          </p>
          <Button
            onClick={() => setBeforeLogin(true)}
            variant="contained"
            className="normal-case text-white bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8] px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
          >
            Try AI Mock Interview
          </Button>
        </div>

        {/* rightSideCard------------------------------------------------------------------------------------------ */}

        <div
          ref={text1ImgRef}
          className="mt-10 flex justify-center md:w-[450px]"
        >
          <div className="bg-[#c28ceb] p-6 rounded-3xl shadow-lg w-full">
            <div className="bg-white p-4 rounded-xl flex items-center space-x-3">
              <img
                src={chatbot}
                alt="AI Bot"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  AI Interview Bot
                </h3>
                <p className="text-sm text-gray-500">
                  Your virtual interviewer
                </p>
              </div>
            </div>
            <div className="w-7xl p-4 flex justify-center">
              <img src={longbot} alt="AI Bot" className="w-28 h-36" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-500 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  Resume analyzed
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-400 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  AI-generated feedback
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-400 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  Behavioral Interview Insights
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TextRight----------------------------------------------------------------------------------------------------------------- */}

      <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full md:justify-around pr-20 ml-[65px] sm:ml-0 ">
        <div
          ref={text2Ref}
          className="lg:w-1/2 text-center lg:text-left space-y-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-[#8667F2]">Expert</span> Mock Interviews
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-600 text-justify">
            You can book paid mock interviews with industry professionals to get
            practical feedback and improve your skills. A comprehensive
            dashboard tracks your performance with detailed analytics. This
            helps you enhance communication, technical, and managerial skills
            for real-world interviews.
          </p>

          <Button
            variant="contained"
            onClick={() => setBeforeLogin(true)}
            className=" text-white  bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8]  px-6 py-4 normal-case font-bold text-xl transition-all duration-300 shadow-md hover:shadow-lg text-nowrap rounded-xl"
          >
            Schedule an Interview
          </Button>
        </div>

        {/* leftSideCard--------------------------------------------------------------------------------------------------------- */}
        <div
          ref={text2ImgRef}
          className="mt-10 lg:mt-0 flex justify-center md:w-[450px]"
        >
          <div className="bg-[#c28ceb] p-6 rounded-3xl shadow-lg w-full">
            <div className="bg-white p-4 rounded-xl flex items-center space-x-3">
              <img
                src={interviewer}
                alt="Expert"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Industry Expert
                </h3>
                <p className="text-sm text-gray-500">Top hiring manager</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-500 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  Expert feedback
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-400 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  Live interview tips
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-400 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  Behavioural Interview Insights
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-400 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  Communication Coaching
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center">
                <span className="text-red-400 text-xl">🔴</span>
                <span className="ml-2 font-semibold text-gray-900">
                  Detailed Dashboard
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockDescSection;
