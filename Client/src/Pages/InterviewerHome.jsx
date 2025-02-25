import React from "react";
import Layout from "../Layout/Layout";
import InterviewerBanner from "../Components/InterviewComp/InterviewerBanner";
import WhyMockNinja from "../Components/InterviewComp/WhyMockNinja";
import StepsInterviewer from "../Components/InterviewComp/StepsInterviewer";
import IntService from "../Components/InterviewComp/IntServices";

const InterviewerHome = () => {
  return (
    <Layout>
      {/* ---------------- ALREADY IN CORRECT POSITION ----------------------- */}

      <InterviewerBanner />
      <WhyMockNinja />
      <StepsInterviewer />
      <IntService />

      {/* -------------------- REMAINING CONTEXT ----------------------------- */}
    </Layout>
  );
};

export default InterviewerHome;
