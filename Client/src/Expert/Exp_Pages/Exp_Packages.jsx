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

import Expert_NavBar from "../ExpertLayout/ExpertNavBar"
import Footer from "../../Layout/Footer";

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

  const menuItemsMobile = [
    {
      icon: <TbUserScreen />,
      service: "Interview",
      route: "Interview-Package",
    },
    { icon: <GoGoal />, service: "Career", route: "Career-Package" },
    {
      icon: <MdDocumentScanner />,
      service: "Resume",
      route: "Resume-Package",
    },
    {
      icon: <TbMessageChatbotFilled />,
      service: "PriorityDM",
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
    <>

    <Expert_NavBar/>

      {/* ---------------------- MAIN CONTAINER ---------------------- */}

      <Box className="w-full max-h-screen md:flex items-start">

      {/* ------------------- MOBILE VIEW SIDE BAR ---------------------- */}

      <Box className="w-full h-20 z-10 absolute bottom-0 md:hidden bg-primary overflow-x-hidden">

        <Box className="flex items-end h-full w-full justify-between pb-3">

          <Box 
          onClick={() => navigate("/Expert/Packages/AddPackage")}
          className={`cursor-pointer leading-tight text-[0.75rem] sm:text-[16px] normal-case text-wrap text-center ml-2 flex flex-col items-center
          ${selectedTab === undefined ? "text-white" : "text-black"}`}>
            <span><IoMdAdd className="text-4xl" /></span>
            Add Package
          </Box>

          <Box 
          onClick={() =>  navigate("/Expert/Packages/Availability")}
          className={`cursor-pointer text-[0.75rem] sm:text-[16px] normal-case text-wrap mb-[-1.3px] flex flex-col items-center
          ${selectedTab === "Availability" ? "text-white" : "text-black"}`}>
            <span ><CalendarMonthIcon className="text-3xl mb-[1px]"/></span>
            Availability
          </Box>

          {menuItemsMobile.map((item, index) => (
              <Box
                key={index}
                onClick={() => navigate(`/Expert/Packages/${item.route}`)}
                className={`flex leading-tight mr-2 normal-case text-[0.75rem] sm:text-[16px] text-center items-center justify-center cursor-pointer flex-col gap-1
                ${selectedTab === item.route ? "text-white" : "text-black"}`}
              >
                <span className="text-3xl">{item.icon}</span>
                {item.service}
              </Box>
            ))}
        </Box>

      </Box>

        {/* ---------------------- SIDEBAR SECTION ---------------------- */}
        
        <Box className="h-screen md:flex flex-col px-12 py-8 bg-gray-100 
         text-white shadow-lg sticky top-0 left-0 w-[377px] hidden">

          {/* ------- Add Package Button --------- */}
          <Box className="flex flex-col gap-4 items-center justify-center w-full mt-16">
            <Button
              onClick={() => navigate("/Expert/Packages/AddPackage")}
              className={`flex normal-case items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white rounded-lg shadow-md  transition-all
              ${selectedTab === undefined ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950" :
            "bg-purple-600"}`}
            >
              <IoMdAdd className="text-xl" />
              Add Package
            </Button>

            {/* ------- Availability Button --------- */}

            <Button
              onClick={() => {
                navigate("/Expert/Packages/Availability");
              }}
              className={`flex normal-case items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md  transition-all 
              ${selectedTab === "Availability" ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950" :
            "bg-purple-600"}`}
            >
              <CalendarMonthIcon className="text-xl" />
              Availability
            </Button>

            {/* ------- Sidebar Menu Items --------- */}
            {menuItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => navigate(`/Expert/Packages/${item.route}`)}
                className={`flex normal-case items-center justify-center gap-2 w-full py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md  transition-all ${selectedTab === item.route ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950" :
                "bg-purple-600"}`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.service}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ---------------------- RIGHT SIDE SECTION ---------------------- */}
        <Box className="w-full md:w-3/4 px-4 md:px-10 py-8 overflow-y-auto">
          {RenderComponent()}
        </Box>
      </Box>
      <div className="hidden md:block">
  <Footer />
</div>
      </>
  );
};

export default Exp_Packages;
