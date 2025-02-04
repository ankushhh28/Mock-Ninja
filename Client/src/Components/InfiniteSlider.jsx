import React from "react";
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

  return (
    <div className="flex justify-center items-center">
    <div className="w-[95%] overflow-hidden relative">
      <div className="flex animate-scroll gap-6">
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
