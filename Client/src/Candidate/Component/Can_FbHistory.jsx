import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

const Can_FbHistory = () => {
  const { backendUrl, account } = useContext(DataContext);
  const email = account.email;

  // ----------------------------------------- USE STATES --------------------------------------------
  const [intData, setIntData] = useState([]);

  const Domain = "Domain-based";
  const Skills = "Skill-based";

  // -------------------------------------------------------------------------------------------------
  useEffect(() => {
    const feedbackHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Can/Fetching-Gesture-Feedback-List`,
          {
            params: { email },
          }
        );
        if (response.status === 200) {
          setIntData(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    feedbackHistory();
  }, [email, backendUrl]);

  // --------------------------------------------------------------------------------------------------

  return (
    <div className="flex flex-col w-full items-center bg-[#f3f5ff] gap-y-6">
      <h1 className="px-16 pt-6 text-3xl md:text-4xl font-bold text-primary w-full bg-[#f5f3ff] text-center mt-2">
        Previous Interview's History
      </h1>
      <div className="flex flex-col w-full max-w-[1300px] mt-4 md:m-2">
        {/* ----------------------------- PREVIOUS HISTORY MAPPING ------------------------------------------*/}
        {intData.map((interview, index) => (
          <div
            key={interview._id}
            className="flex items-center justify-between w-full p-4 mb-2 rounded-lg shadow-md bg-[#e9dcff] hover:bg-[#d6b3ff] transition duration-300"
          >
            <span className="text-gray-800 font-semibold w-1/6 md:w-2/6 text-left lg:pl-6">
              {index + 1}.
            </span>
            <span className="text-gray-800 font-medium text-center sm:w-full sm:text-left">
              {new Date(interview.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="text-gray-800 font-medium sm:w-full text-left">
              {interview.details === "Resume"
                ? `${interview.details}-based`
                : [
                    "MERN Stack",
                    "Data Analyst",
                    "App Development",
                    "BlockChain Development",
                  ].includes(interview.details)
                ? Domain
                : Skills}
            </span>
            <button className="bg-[#8667f2] hover:bg-[#6e4fcf] text-white px-4 py-2 rounded-md font-bold uppercase text-nowrap hidden sm:block">
              View Details
            </button>
          </div>
        ))}
        {/* ------------------------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default Can_FbHistory;
