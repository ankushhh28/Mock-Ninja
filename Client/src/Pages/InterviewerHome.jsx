import React from "react";
import Layout from "../Layout/Layout";
import ToggleButton from "../Components/ToggleButton";
import { Box } from "@mui/material";
import InterviewerBanner from "../Components/InterviewerBanner";

const InterviewerHome = () => {
  return (
    <Layout>
      {/* ---------------- ALREADY IN CORRECT POSITION ----------------------- */}
      <div>
        <InterviewerBanner />
      </div>

      {/* -------------------- REMAINING CONTEXT ----------------------------- */}
    </Layout>
  );
};

export default InterviewerHome;
