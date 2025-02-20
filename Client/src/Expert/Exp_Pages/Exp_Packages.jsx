import React, { useEffect, useState } from "react";
import ExpertLayout from "../ExpertLayout/ExpertLayout";
import { Box, Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { TbUserScreen } from "react-icons/tb";
import { MdDocumentScanner } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { TbMessageChatbotFilled } from "react-icons/tb";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import AddPackage from "../Exp_Packages/AddPackage";
import InterviewPackage from "../Exp_Packages/InterviewPackage";
import ResumePackage from "../Exp_Packages/ResumePackage";
import PriorityPackage from "../Exp_Packages/PriorityPackage";
import CarrierPackage from "../Exp_Packages/CarrierPackage";
import Availability from "../Exp_Packages/Availability";
import { useNavigate, useParams } from "react-router-dom";

const Exp_Packages = () => {
  const menuItems = [
    {
      icon: <TbUserScreen />,
      service: "Interview",
      route: "Interview-Package",
    },
    { icon: <GoGoal />, service: "Career Guidance", route: "Career-Package" },
    {
      icon: <MdDocumentScanner />,
      service: "Resume Guidance",
      route: "Resume-Package",
    },
    {
      icon: <TbMessageChatbotFilled />,
      service: "Priority DM",
      route: "Priority-Package",
    },
  ];

  const navigate = useNavigate();
  const { tab } = useParams();
  const selectedTab = tab;

  // ---------------- RENDERING RIGHT SIDE DATA ------------------------

  const RenderComponent = () => {
    if (selectedTab === undefined) {
      return <AddPackage />;
    } else if (selectedTab === "Availability") {
      return <Availability />;
    } else if (selectedTab === "Interview-Package") {
      return <InterviewPackage />;
    } else if (selectedTab === "Resume-Package") {
      return <ResumePackage />;
    } else if (selectedTab === "Priority-Package") {
      return <PriorityPackage />;
    } else if (selectedTab === "Career-Package") {
      return <CarrierPackage />;
    }
  };

  return (
    <ExpertLayout>
      {/* ---------------------- MAIN CONTAINER ---------------------- */}
      <Box className="w-full max-h-screen flex items-start">
        {/* ---------------------- SIDEBAR SECTION ---------------------- */}
        <Box className="w-1/4 h-screen flex flex-col px-12 py-8 bg-gray-800 text-white shadow-lg">
          {/* ------- Add Package Button --------- */}
          <Box className="flex flex-col gap-4 items-center justify-center w-full">
            <Button
              onClick={() => navigate("/Expert/Packages/AddPackage")}
              className="flex items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md  transition-all"
            >
              <IoMdAdd className="text-xl" />
              Add Package
            </Button>

            {/* ------- Availability Button --------- */}

            <Button
              onClick={() => {
                navigate("/Expert/Packages/Availability");
              }}
              className="flex items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md  transition-all"
            >
              <CalendarMonthIcon className="text-xl" />
              Availability
            </Button>

            {/* ------- Sidebar Menu Items --------- */}
            {menuItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => navigate(`/Expert/Packages/${item.route}`)}
                className="flex items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md  transition-all"
              >
                <span className="text-xl">{item.icon}</span>
                {item.service}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ---------------------- RIGHT SIDE SECTION ---------------------- */}
        <Box className="w-3/4 px-10 py-8 overflow-y-auto">
          {RenderComponent()}
        </Box>
      </Box>
    </ExpertLayout>
  );
};

export default Exp_Packages;
