import React, { useState, useEffect } from "react";
import img1 from "../assets/images/login1.png";
import img2 from "../assets/images/login2.png";
import img3 from "../assets/images/login3.png";
import img4 from "../assets/images/login4.png";

const slides = [
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img3,
  },
  {
    img: img4,
  },
];
const LoginSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-auto h-[450px] rounded-2xl shadow-lg bg-[#E0E7FF]">
      <div className="w-full h-full">
        <img
          src={slides[currentSlide].img}
          alt={`Slide ${currentSlide + 1}`}
          className="w-auto h-[400px] object-contain rounded-15 transition-opacity duration-700 ease-in-out"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot w-3 h-3 rounded-full  ${
              index === currentSlide
                ? "bg-blue-500 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default LoginSlider;
