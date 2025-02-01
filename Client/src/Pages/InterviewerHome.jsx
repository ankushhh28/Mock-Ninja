import React from "react";
import Layout from "../Layout/Layout";
import ToggleButton from "../Components/ToggleButton";
import { Box } from "@mui/material";

const InterviewerHome = () => {
  return (
    <Layout>

{/* ---------------- ALREADY IN CORRECT POSITION ----------------------- */}

      <Box className="flex justify-center py-4">
      <ToggleButton/>
      </Box>

{/* -------------------- REMAINING CONTEXT ----------------------------- */}

    </Layout>
  );
};

export default InterviewerHome;
