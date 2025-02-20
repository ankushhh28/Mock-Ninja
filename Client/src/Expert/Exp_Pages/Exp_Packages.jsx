import React, { useEffect, useState } from "react";
import ExpertLayout from "../ExpertLayout/ExpertLayout";
import { Box, Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { TbUserScreen } from "react-icons/tb";
import { MdDocumentScanner } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { TbMessageChatbotFilled } from "react-icons/tb";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import AddPackage from "../Exp_Packages/AddPackage";
import InterviewPackage from "../Exp_Packages/InterviewPackage";
import ResumePackage from "../Exp_Packages/ResumePackage";
import PriorityPackage from "../Exp_Packages/PriorityPackage";
import CarrierPackage from "../Exp_Packages/CarrierPackage";
import Availability from "../Exp_Packages/Availability";

const Exp_Packages = () => {
  const menuItems = [
    { icon: <TbUserScreen />, service: "Interview", tab: "InterviewPackage" },
    { icon: <GoGoal />, service: "Career Guidance", tab: "CareerPackage" },
    {
      icon: <MdDocumentScanner />,
      service: "Resume Guidance",
      tab: "ResumePackage",
    },
    {
      icon: <TbMessageChatbotFilled />,
      service: "Priority DM",
      tab: "DMPackage",
    },
  ];

  // ---------------- USE STATES ---------------

  const [selectedTab, setSelectedTab] = useState("AddPackage");

  // ---------------- RENDERING RIGHT SIDE DATA ------------------------

  const RenderComponent = () => {
    if (selectedTab === "AddPackage") {
      return <AddPackage />;
    } else if (selectedTab === "Availability") {
      return <Availability />;
    } else if (selectedTab === "InterviewPackage") {
      return <InterviewPackage />;
    } else if (selectedTab === "ResumePackage") {
      return <ResumePackage />;
    } else if (selectedTab === "DMPackage") {
      return <PriorityPackage />;
    } else if (selectedTab === "CareerPackage") {
      return <CarrierPackage />;
    }
  };

  return (
    <ExpertLayout>
      {/* ---------------------- MAIN CONTAINER ---------------------- */}
      <Box className="w-full max-h-screen flex items-start">
        {/* ---------------------- SIDEBAR SECTION ---------------------- */}
        <Box className="w-1/4 h-screen flex flex-col gap-16 px-6 py-8 bg-gray-500 text-white shadow-lg">
          {/* ------- Add Package Button --------- */}
          <Box className="flex flex-col gap-4 items-center justify-center w-full">
            <Button
              onClick={() => setSelectedTab("AddPackage")}
              className="flex  items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white bg-[#9274ef] rounded-lg shadow-md transition-all"
            >
              <IoMdAdd className="text-xl" />
              Add Package
            </Button>

            {/* ------- Availability Button --------- */}

            <Button
              onClick={() => setSelectedTab("Availability")}
              className="flex items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white bg-[#9274ef] rounded-lg shadow-md  transition-all"
            >
              <CalendarMonthIcon className="text-xl" />
              Availability
            </Button>
          </Box>

          {/* ------- Availability Button --------- */}

          {/* ------- Sidebar Menu Items --------- */}
          <Box className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => setSelectedTab(item.tab)}
                className="flex items-center gap-2 px-4 py-4 w-full text-lg font-medium text-white bg-gray-800 rounded-lg  transition-all"
              >
                <span className="text-xl">{item.icon}</span>
                {item.service}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ---------------------- RIGHT SIDE SECTION ---------------------- */}
        <Box className="w-3/4 px-10 py-8 overflow-y-auto">{RenderComponent()}</Box>
      </Box>
    </ExpertLayout>
  );
};

export default Exp_Packages;
