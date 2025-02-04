import React from 'react'
import { useState, useEffect } from 'react';
import img1 from "../assets/images/bg.jpg";
import img2 from "../assets/images/bg1.jpg";
import img3 from "../assets/images/bg.jpg";
import img4 from "../assets/images/bg1.jpg";

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

const HomeCoverSlider = () => {
const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full mt-4">
      <div className="w-full h-full  flex justify-center mb-10">
        <img
          src={slides[currentSlide].img}
          alt={`Slide ${currentSlide + 1}`}
          className="w-auto h-[400px] object-contain duration-700 ease-in-out"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide
                ? "bg-blue-500 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default HomeCoverSlider