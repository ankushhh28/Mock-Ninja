import React from "react";
import { Link } from "react-router-dom";
import chatbot from "../assets/images/bgremovedbot.gif";
import longbot from "../assets/images/longbot.gif";
import interviewer from "../assets/images/interviewer.png";

const MockDescSection = () => {
  return (
    <section className="flex flex-col items-center w-full md:px-20 lg:px-10 px-4 py-16 max-w-[2014px] space-y-12 lg:ml-12">
      {/* textLeft----------------------------------------------------------------------------------------------------------------- */}

      <div className="flex flex-col lg:flex-row items-center w-full lg:ml-32">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            AI-Based <span className="text-[#8667F2]">Mock Interviews</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-justify">
            Get personalized interview questions based on your resume, domain,
            and skills. AI analyzes your responses, eye contact, and body
            language to provide detailed feedback. Get an ATS resume score with
            improvement tips to pass automated screenings.
          </p>
          <Link
            to="/Register"
            className="mt-6 text-lg font-semibold text-black italic flex space-x-2 transition-all ease-in-out duration-1000"
          >
            <span>Try AI Mock Interviews</span>
            <span>🤖</span>
          </Link>
        </div>

        {/* rightSideCard------------------------------------------------------------------------------------------ */}

        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="bg-[#c28ceb] p-6 rounded-3xl shadow-lg w-full max-w-sm">
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

      <div className="flex flex-col lg:flex-row-reverse items-center justify-stretch w-full lg:mr-60">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-[#8667F2]">Expert</span> Mock Interviews
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-justify">
            You can book paid mock interviews with industry professionals to get
            practical feedback and improve your skills. A comprehensive
            dashboard tracks your performance with detailed analytics. This
            helps you enhance communication, technical, and managerial skills
            for real-world interviews.
          </p>
          <Link
            to="/Register"
            className="mt-6 text-lg font-semibold text-black flex items-center space-x-2 transition-all ease-in-out duration-1000"
          >
            <span>Book a Session</span>
            <span>💼</span>
          </Link>
        </div>

        {/* leftSideCard--------------------------------------------------------------------------------------------------------- */}
        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="bg-[#c28ceb] p-6 rounded-3xl shadow-lg w-full max-w-sm">
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
