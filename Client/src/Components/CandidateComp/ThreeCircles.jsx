import domain from "../../assets/images/c1.jpg";
import resume from "../../assets/images/c2.jpg";
import programming from "../../assets/images/c3.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function ThreeCircles() {

  const imgRefs = [useRef(null), useRef(null), useRef(null)];

  const images = [
    { src: domain, text: "Choose a Domain", ref:imgRefs[0] },
    { src: resume, text: "Choose an Expertise", ref:imgRefs[1] },
    { src: programming, text: "Upload Your Resume", ref:imgRefs[2] }
  ];

// ---------------------- GSAP ANIMATION ---------------------
// ---------------------- GSAP ANIMATION ---------------------

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.from(imgRefs[0].current, {
    x:-80,
    duration:1,
    opacity:0,
    scrollTrigger:{
      trigger:imgRefs[0].current,
    }
    })

    gsap.from(imgRefs[1].current, {
    y:80,
    duration:1,
    opacity:0,
    scrollTrigger:{
      trigger:imgRefs[1].current,
    }
    })

    gsap.from(imgRefs[2].current, {
    x:80,
    duration:1,
    opacity:0,
    scrollTrigger:{
      trigger:imgRefs[2].current,
    }
    })
  })

  return (
    <div className="w-full flex justify-center space-x-6 pt-6 bg-[#f5f3ff] gap-6 sm:gap-10 md:gap-20">
      {images.map((item, index) => (
        <div key={index} ref={item.ref} className="flex flex-col items-center justify-center">
          <img src={item.src} alt={item.text} className="w-20 h-20 sm:w-32 sm:h-32 md:w-80 md:h-72 rounded-full object-cover" />
          <p className="mt-2 font-semibold text-nowrap text-[10px] sm:text-lg md:text-2xl pt-1.5 pb-10">{item.text}</p>
        </div>
      ))}
    </div>
    );
  }
  