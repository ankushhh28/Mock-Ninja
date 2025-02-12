import React, { useEffect, useState, useRef } from 'react';
import Can_Layout from './CanLayout/Can_Layout';
import Ats from '../Components/CandidateComp/Ats';
import ProfileComplete from './Component/ProfileComplete';
import gsap from 'gsap';

const CanATS = () => {
  const [score, setScore] = useState(28);
  const animationRef = useRef(null);

  useEffect(() => {
    // Resume Score Increment Logic
    const interval = setInterval(() => {
      setScore((prev) => (prev < 75 ? prev + 1 : 75));
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // GSAP Animation
    gsap.to(animationRef.current, {
      y: '-70%',
      duration: 2,
      ease: 'linear',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <Can_Layout>
      <ProfileComplete />
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#f3f5ff] text-white p-4 lg:p-8 gap-4 lg:gap-8">
        {/* ----------------------------Left Side-------------------------------- */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-y-4 lg:gap-y-6 bg-white/30 backdrop-blur-lg p-4 lg:p-8 rounded-lg shadow-2xl">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#8667f2] text-center">
            RESUME CHECKER
          </h1>
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-700">
            Is your Resume resume good enough?
          </h2>
          <p className="text-base lg:text-lg text-center text-gray-600">
            Our free and fast resume checker will give an ATS score instantly!
          </p>
        </div>
        {/* ----------------------------Left Side-------------------------------- */}

        {/* ---------------------------Right Side------------------------------- */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          {/*-------------------------- Resume--------------------------------- */}
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
              Larry Styles
            </h2>
            <p className="text-gray-900">Web Developer</p>
            <div className="mt-4 h-32 lg:h-40 bg-gray-200 rounded"></div>
            <div className="mt-2 h-16 lg:h-20 bg-gray-100 rounded"></div>
          </div>
          {/*-------------------------- Resume--------------------------------- */}

          {/*------------------------------ GSAP Animation ---------------------------*/}
          <div className="w-full flex justify-center">
            <div
              ref={animationRef}
              className="w-[90%] sm:w-[70%] h-[30px] lg:h-[40px] bg-green-300/40 backdrop-blur-sm mt-4"
              style={{ transform: 'translateY(-900%)' }}
            ></div>
          </div>
          {/*------------------------------ GSAP Animation ---------------------------*/}

          {/* --------------------------------Resume Score--------------------------------*/}
          <div className="bg-gray-800 p-3 lg:p-4 rounded-lg shadow-lg sm:mt-2 text-center w-full max-w-md">
            <div className="text-xl lg:text-2xl font-semibold text-yellow-400">
              Resume Score: {score}/100
            </div>
          </div>
          {/* --------------------------------Resume Score--------------------------------*/}
        </div>
      </div>
      <Ats />
    </Can_Layout>
  );
};

export default CanATS;
