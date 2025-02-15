import React from "react";

const Can_FbHistory = () => {

  // api key = /Fetching-Gesture-Feedback-List

  // email bhejna orr email ki spelling yhi rakhna 
  // as params bhejna

  // console.log krwakar data dekh lena kya aa rha hai 

  // details ke under interview type rhega 
  // createdAt ke ander date rhegi kabb interview diya tha

  // server chalu krr lena

  return (
    <div className="flex flex-col w-full items-center bg-[#f3f5ff] gap-y-6">
      <h1 className="px-16 pt-6 text-3xl md:text-4xl font-bold text-primary w-full bg-[#f5f3ff] text-center mt-2">
        Previous Interview's History
      </h1>
      <div className="flex flex-col w-full max-w-[1300px] mt-4 md:m-2">
        <div className="flex items-center justify-between w-full p-4 mb-2 rounded-lg shadow-md bg-[#e9dcff] hover:bg-[#d6b3ff] transition duration-300">
          <span className="text-gray-800 font-semibold w-1/6 md:w-2/6 text-left lg:pl-6">
            1
          </span>
          <span className="text-gray-800 font-medium text-center sm:w-full sm:text-left">
            02 Feb, 2025
          </span>
          <span className="text-gray-800 font-medium sm:w-full text-left">
            Resume
          </span>
          <button className="bg-[#8667f2] hover:bg-[#6e4fcf] text-white px-4 py-2 rounded-md font-bold uppercase text-nowrap hidden sm:block">
            View Details
          </button>
        </div>

        <div className="flex items-center justify-between w-full p-4 mb-2 rounded-lg shadow-md border bg-[#e9dcff] hover:bg-[#d6b3ff] transition duration-300">
          <span className="text-gray-800 font-semibold w-1/6 md:w-2/6 text-left lg:pl-6">
            2
          </span>
          <span className="text-gray-800 font-medium text-center sm:w-full sm:text-left">
            02 Feb, 2025
          </span>
          <span className="text-gray-800 font-medium sm:w-full text-left">
            Domain
          </span>
          <button className="bg-[#8667f2] hover:bg-[#6e4fcf] text-white px-4 py-2 rounded-md font-bold uppercase text-nowrap hidden sm:block">
            View Details
          </button>
        </div>

        <div className="flex items-center justify-between w-full p-4 mb-2 rounded-lg shadow-md border bg-[#e9dcff] hover:bg-[#d6b3ff] transition duration-300">
          <span className="text-gray-800 font-semibold w-1/6 md:w-2/6 text-left lg:pl-6">
            3
          </span>
          <span className="text-gray-800 font-medium text-center sm:w-full sm:text-left">
            02 Feb, 2025
          </span>
          <span className="text-gray-800 font-medium sm:w-full text-left">
            Skill
          </span>
          <button className="bg-[#8667f2] hover:bg-[#6e4fcf] text-white px-4 py-2 rounded-md font-bold uppercase text-nowrap hidden sm:block">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Can_FbHistory;
