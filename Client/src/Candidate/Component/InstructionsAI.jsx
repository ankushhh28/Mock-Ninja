import React from "react";
import { Typography, Button, Box } from "@mui/material";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import Filter7Icon from "@mui/icons-material/Filter7";

const icons = [
  <Filter1Icon sx={{ color: "#8667f2" }} />, 
  <Filter2Icon sx={{ color: "#8667f2" }} />, 
  <Filter3Icon sx={{ color: "#8667f2" }} />, 
  <Filter4Icon sx={{ color: "#8667f2" }} />, 
  <Filter5Icon sx={{ color: "#8667f2" }} />, 
  <Filter6Icon sx={{ color: "#8667f2" }} />, 
  <Filter7Icon sx={{ color: "#8667f2" }} />
];

const InstructionsAI = ({ setNext }) => {
  const instructions = [
    "Ensure your camera remains active with permission enabled throughout the interview.",
    "Enable the answer button before responding, disable it afterward, and allow microphone access.",
    "You have 2 minutes to answer each question.",
    "Check your internet, camera, and microphone before starting.",
    "Maintain eye contact, proper posture, and avoid tilting your head to impact feedback positively.",
    "Choose a quiet, distraction-free environment and provide clear, concise answers.",
    "Click the repeat button to hear a question again."
  ];

  return (
    <div className="h-auto  flex flex-col ">
      {/* Header */}
      <header className="bg-purple-100 py-5 shadow-md fixed top-0 w-full z-50">
        <Typography variant="h4" className="text-purple-700 font-bold text-center">
          INSTRUCTIONS
        </Typography>
      </header>


      {/* Content */}
      <main className="flex-1 mt-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 pt-6 pb-16">

      <Typography className="text-center text-red-600 font-semibold animate-pulse mb-4">
        Read Instructions Properly
      </Typography>

        <div className="bg-white shadow-lg border-2 border-gray-100 rounded-xl p-6 md:p-10 space-y-6">
          {instructions.map((text, index) => (
            <Instruction key={index} icon={icons[index]} text={text} />
          ))}

          <div className="text-center space-y-2">
            <Typography variant="h5" className="font-bold text-gray-700 ">
              Best of Luck!
            </Typography>
            <Typography className="text-gray-700  tracking-wide">
              Stay confident, trust your preparation, and give your best.
            </Typography>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-100 py-4 fixed bottom-0 w-full flex justify-center md:justify-end px-4 md:px-16">
        <Button
          variant="contained"
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold text-lg px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          onClick={() => setNext(true)}
        >
          Next
        </Button>
      </footer>
    </div>
  );
};

const Instruction = ({ icon, text }) => (
  <div className="flex items-start gap-3">
    <div className="mt-[0.6px]">{icon}</div>
    <Typography className="text-gray-800 text-base sm:text-lg md:text-xl">
      {text}
    </Typography>
  </div>
);

export default InstructionsAI;

