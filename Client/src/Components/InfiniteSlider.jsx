import React, { useRef } from "react";
import bashIcon from "../assets/proglangsvgs/bash.svg";
import cIcon from "../assets/proglangsvgs/c.svg";
import csharpIcon from "../assets/proglangsvgs/csharp.svg";
import cppIcon from "../assets/proglangsvgs/cpp.svg";
import dartIcon from "../assets/proglangsvgs/dart.svg";
import goIcon from "../assets/proglangsvgs/go.svg";
import haskellIcon from "../assets/proglangsvgs/haskell.svg";
import javaIcon from "../assets/proglangsvgs/java.svg";
import javascriptIcon from "../assets/proglangsvgs/javascript.svg";
import kotlinIcon from "../assets/proglangsvgs/kotlin.svg";
import pythonIcon from "../assets/proglangsvgs/python.svg";
import rubyIcon from "../assets/proglangsvgs/ruby.svg";
import rustIcon from "../assets/proglangsvgs/rust.svg";
import typescriptIcon from "../assets/proglangsvgs/typescript.svg";
import reactIcon from "../assets/proglangsvgs/react.svg";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const InfiniteSlider = () => {

  const icons = [
    bashIcon,
    cIcon,
    csharpIcon,
    cppIcon,
    dartIcon,
    goIcon,
    haskellIcon,
    javaIcon,
    javascriptIcon,
    kotlinIcon,
    pythonIcon,
    rubyIcon,
    rustIcon,
    typescriptIcon,
    reactIcon,
  ];

// --------------------------- GSAP ANIMATION -----------------------------------
// --------------------------- GSAP ANIMATION -----------------------------------

  gsap.registerPlugin(ScrollTrigger)

  const infiniteSliderRef = useRef(null)
  
  useGSAP(() => {
    gsap.from(infiniteSliderRef.current, {
      x:700,
      opacity:0,
      duration:2,
      scrollTrigger:{
        trigger:infiniteSliderRef.current,
        start:"top 80%",
        // markers:true,
      }
    })
  })

  return (
    <div 
    ref={infiniteSliderRef}
    className="flex justify-center">
    <div className="w-[90%] overflow-hidden relative">
      <div className="flex animate-scroll gap-4 sm:gap-4">
        {[...icons, ...icons].map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt="Icon"
            className="w-24 h-32 sm:w-36 sm:h-44 cursor-pointer px-2 sm:px-4 py-3 sm:py-5"
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default InfiniteSlider;
