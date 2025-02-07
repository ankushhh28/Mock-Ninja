import React from "react";
import { Box, Button } from '@mui/material'

const Can_FbHistory = () => {

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-100">
      <h1 className="px-16 py-3 text-4xl font-bold text-[#8667F2] w-full bg-[#f3f5ff] text-left">
        Previous Interviews' History:
      </h1>
      <div className="w-full max-w-[1400px] mt-4">
        
        <div className="flex items-center justify-between w-full p-4 mb-2 rounded-lg shadow-md border bg-[#e9dcff] hover:bg-[#d6b3ff] transition duration-300">
          <span className="text-gray-800 font-semibold w-1/6 text-center">1</span>
          <span className="text-gray-800 font-medium w-4/6 text-center">02 Feb, 2025</span>
          <span className="text-gray-800 font-medium w-4/6 text-left">Resume</span>
          <button className="bg-[#8667f2] hover:bg-[#6e4fcf] text-white px-4 py-2 rounded-md font-bold uppercase text-nowrap">
            View Details
          </button>
        </div>

        <div className="flex items-center justify-between w-full p-4 mb-2 rounded-lg shadow-md border bg-[#e9dcff] hover:bg-[#d6b3ff] transition duration-300">
          <span className="text-gray-800 font-semibold w-1/6 text-center">2</span>
          <span className="text-gray-800 font-medium w-4/6 text-center">02 Feb, 2025</span>
          <span className="text-gray-800 font-medium w-4/6 text-left">Domain</span>
          <button className="bg-[#8667f2] hover:bg-[#6e4fcf] text-white px-4 py-2 rounded-md font-bold uppercase text-nowrap">
            View Details
          </button>
        </div>


        <div className="flex items-center justify-between w-full p-4 mb-2 rounded-lg shadow-md border bg-[#e9dcff] hover:bg-[#d6b3ff] transition duration-300">
          <span className="text-gray-800 font-semibold w-1/6 text-center">3</span>
          <span className="text-gray-800 font-medium w-4/6 text-center">02 Feb, 2025</span>
          <span className="text-gray-800 font-medium w-4/6 text-left">Topic</span>
          <button className="bg-[#8667f2] hover:bg-[#6e4fcf] text-white px-4 py-2 rounded-md font-bold uppercase text-nowrap">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Can_FbHistory;
