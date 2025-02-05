import React from "react";
import Layout from "../Layout/Layout";
import InterviewerBanner from "../Components/InterviewComp/InterviewerBanner";
import WhyMockNinja from "../Components/InterviewComp/WhyMockNinja";

const InterviewerHome = () => {
  return (
    <Layout>
      {/* ---------------- ALREADY IN CORRECT POSITION ----------------------- */}
      <div >
        <InterviewerBanner />
        <WhyMockNinja />
      </div>

      {/* -------------------- REMAINING CONTEXT ----------------------------- */}
    </Layout>
  );
};

export default InterviewerHome;
