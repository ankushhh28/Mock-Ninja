import React from "react";
import Layout from "../Layout/Layout";
import InterviewerBanner from "../Components/InterviewComp/InterviewerBanner";

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
