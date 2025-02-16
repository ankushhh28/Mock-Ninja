import React, { useRef } from "react";
import Layout from "../Layout/Layout";
import { Button } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import p1 from "../assets/images/anish.jpg";
import p2 from "../assets/images/ankush.jpg";
import p3 from "../assets/images/ishita.png";
import p4 from "../assets/images/shruti.jpg";

import {
  FaRobot,
  FaQuestionCircle,
  FaSmile,
  FaChartLine,
  FaUserTie,
  FaAddressCard,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaRobot className="text-5xl text-[#8667f2]" />,
      title: "AI-Driven Evaluation",
      description: "Resume evaluation & ATS scoring to boost your chances.",
    },
    {
      icon: <FaQuestionCircle className="text-5xl text-[#8667f2]" />,
      title: "Smart Question Generation",
      description: "Personalized questions based on your profile & skills.",
    },
    {
      icon: <FaSmile className="text-5xl text-[#8667f2]" />,
      title: "Gesture Analysis",
      description: "Detects expressions & gestures to improve confidence.",
    },
    {
      icon: <FaChartLine className="text-5xl text-[#8667f2]" />,
      title: "Performance Tracking",
      description: "Free dashboard to track growth & insights.",
    },
    {
      icon: <FaUserTie className="text-5xl text-[#8667f2]" />,
      title: "Mock Interviews",
      description: "Live interview practice with industry professionals.",
    },
    {
      icon: <FaAddressCard className="text-5xl text-[#8667f2]" />,
      title: "Detailed Feedback",
      description: "Get detailed feedback to improve your next interviews.",
    },
  ];

  gsap.registerPlugin(ScrollTrigger);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const mem1Ref = useRef(null);
  const mem2Ref = useRef(null);
  const mem3Ref = useRef(null);
  const mem4Ref = useRef(null);

  useGSAP(() => {
    gsap.from(text1Ref.current, {
      y: -90,
      duration: 1,
      opacity: 0,
      ScrollTrigger: {
        trigger: text1Ref.current,
      },
    });
    gsap.from(text2Ref.current, {
      y: -90,
      duration: 1.5,
      opacity: 0,
      ScrollTrigger: {
        trigger: text2Ref.current,
      },
    });
    gsap.from(text3Ref.current, {
      y: -90,
      duration: 3,
      opacity: 0,
      ScrollTrigger: {
        trigger: text3Ref.current,
      },
    });
    gsap.from(mem1Ref.current, {
      x: -90,
      duration: 2,
      opacity: 0,
      scrollTrigger: {
        trigger: mem1Ref.current,
      },
    });
    gsap.from(mem2Ref.current, {
      x: -90,
      duration: 2.5,
      opacity: 0,
      scrollTrigger: {
        trigger: mem2Ref.current,
      },
    });
    gsap.from(mem3Ref.current, {
      x: 90,
      duration: 2.5,
      opacity: 0,
      scrollTrigger: {
        trigger: mem3Ref.current,
      },
    });
    gsap.from(mem4Ref.current, {
      x: 90,
      duration: 2,
      opacity: 0,
      scrollTrigger: {
        trigger: mem4Ref.current,
      },
    });
  });

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center bg-[#f3f5ff] min-h-screen text-center py-6 gap-y-12">
          <h1 ref={text1Ref} className="text-5xl font-bold">
            Empowering{" "}
            <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-fuchsia-300 bg-clip-text text-transparent">
              Your Interview Success
            </span>
          </h1>

          <p className="text-2xl text-black text-center max-w-5xl">
            Welcome to Mock Ninja, your AI-powered companion for mastering
            interviews. Our platform blends cutting-edge technology with expert
            guidance to help you prepare like never before. Whether you're
            refining your resume, practicing technical questions, or seeking
            real-world interview experience, we’ve got you covered!
          </p>

{/* ---------------------features grid---------------------------- */}
          <div className="bg-[#f3f5ff] w-full px-6 space-x-5">
          <h2
            ref={text2Ref}
            className="text-center text-4xl font-semibold text-gray-800 mb-12"
          >
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl shadow-lg p-6 sm:p-8 bg-[#f3f5ff] border-white border-2 place-items-center hover:scale-105 ease-in-out duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#8667f2]">
                  {feature.title}
                </h3>
                <p className="text-gray-800 mt-2 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          </div>
          
{/* ---------------------features grid end---------------------------- */}

{/* --------------------team intro-------------------------- */}

          <h1 className="text-3xl font-semibold text-nowrap mt-5">
            <span
              ref={text3Ref}
              className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6"
            >
              Meet Our Tech Team
            </span>
            <span> 💡</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
            <div
              ref={mem1Ref}
              className="shadow-lg rounded-2xl items-center p-5"
            >
              <div className="h-32 w-32 rounded-full grid place-items-center mx-auto overflow-hidden my-3">
                <img src={p1} alt="why not showing" />
              </div>
              <h3 className="text-xl font-semibold text-[#8667f2]">Anish</h3>
              <p className="text-black">Full Stack Developer</p>
            </div>
            <div
              ref={mem2Ref}
              className="shadow-lg rounded-2xl items-center p-5"
            >
              <div className="h-32 w-32 rounded-full grid place-items-center mx-auto overflow-hidden my-3">
                <img src={p2} alt="why not showing" />
              </div>
              <h3 className="text-xl font-semibold text-[#8667f2]">Ankush</h3>
              <p className="text-black">Frontend Developer</p>
            </div>
            <div
              ref={mem3Ref}
              className="shadow-lg rounded-2xl items-center p-5"
            >
              <div className="h-32 w-32 rounded-full grid place-items-center mx-auto overflow-hidden my-3">
                <img src={p3} alt="why not showing" />
              </div>
              <h3 className="text-xl font-semibold text-[#8667f2]">Ishita</h3>
              <p className="text-black">Frontend Developer</p>
            </div>
            <div
              ref={mem4Ref}
              className="shadow-lg rounded-2xl items-center p-5"
            >
              <div className="h-32 w-32 rounded-full grid place-items-center mx-auto overflow-hidden my-3">
                <img src={p4} alt="why not showing" />
              </div>
              <h3 className="text-xl font-semibold text-[#8667f2]">Shruti</h3>
              <p className="text-black">AI/ML Developer</p>
            </div>
          </div>

{/* --------------------team intro endd-------------------------- */}

          <div className="">
            <Button
              variant="contained"
              sx={{
                marginBottom: "-120px",
                backgroundColor: "#8667f2",
                "&:hover": { backgroundColor: "#6a52c7" },
              }}
              className="bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8]"
            >
              Get Started
            </Button>
          </div>
{/* -----------------gradient------------------------- */}
          <div className="flex flex-col min-h-screen min-w-full items-center justify-center text-center bg-[linear-gradient(to_bottom,_#f3f5ff_1%,_transparent_40%),radial-gradient(circle_at_center,_#a2f8d3,_#c7ade2,_#a4d8fd)] -mb-24">
            <h1 className="text-5xl md:text-6xl font-bold text-black">
              Try MockNinja for free.
            </h1>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
