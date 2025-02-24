import React, { useContext, useRef} from "react";
import careerGuide from "../../assets/images/careerGuide.jpg";
import priorityDM from "../../assets/images/priorityDM.png";
import resumeGuidance from "../../assets/images/resumeGuidance.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DataContext } from "../../Context/DataProvider";
import { useNavigate } from "react-router-dom";

const ServicesByMentor = () => {
  const imgRefs = [useRef(null), useRef(null), useRef(null)];
  const { account, beforeLogin, setBeforeLogin } = useContext(DataContext);
  const navigate = useNavigate();

  const images = [
    {
      img: careerGuide,
      text: "Career Guidance",
      try: "try now!",
      ref: imgRefs[0],
    },
    {
      img: resumeGuidance,
      text: "Resume Guidance",
      try: "try now!",
      ref: imgRefs[1],
    },
    { img: priorityDM, text: "Priority DM", try: "try now!", ref: imgRefs[2] },
  ];

  // ---------------------- GSAP ANIMATION ---------------------

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(imgRefs[0].current, {
      x: -80,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: imgRefs[0].current,
      },
    });

    gsap.from(imgRefs[1].current, {
      y: -90,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: imgRefs[1].current,
      },
    });

    gsap.from(imgRefs[2].current, {
      x: 80,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: imgRefs[2].current,
      },
    });
  });

  return (
    <div className="w-full flex flex-col items-center px-4 bg-[#f3f5ff]">
      <p className="text-2xl md:text-4xl font-bold text-center m-6 p-3 text-transparent bg-clip-text bg-gradient-to-t from-gray-600 via-purple-700 to-[#8667f2]">
        Additional Services we provide!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full space-x-7 max-w-5xl">
        {images.map((item, index) => (
          <div
            key={index}
            ref={item.ref}
            className="flex flex-col items-center"
          >
            <img
              src={item.img}
              alt="not available"
              className="w-[424px] h-70 object-cover rounded-xl shadw-lg hover:scale-105"
            />
            <p className="font-semibold text-2xl bg-gradient-to-t from-black via-gray-600 to-gray-200 bg-clip-text text-transparent">
              {item.text}
            </p>
            <p className="font-medium text-lg underline md:no-underline text-blue-500 md:text-black mb-3 md:hover:text-blue-500 md:hover:underline hover:cursor-pointer"
            onClick={() =>{ if (account.name ==="" && account.accessToken === ""){
              setBeforeLogin(true);
            }else{
              navigate("/candidate/Mock")
            }
          }}
            >
              {item.try}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesByMentor;
