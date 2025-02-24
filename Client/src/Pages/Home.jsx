import React from "react";
import Layout from "../Layout/Layout";
import InfiniteSlider from "../Components/CandidateComp/InfiniteSlider";
import HomeBanner from "../Components/CandidateComp/CandidateBanner";
import MockDescSection from "../Components/CandidateComp/MockDescSection";
import StepsHome from "../Components/CandidateComp/StepsHome";
import CandidateBanner from "../Components/CandidateComp/CandidateBanner";
import ThreeCircles from "../Components/CandidateComp/ThreeCircles";
import Ats from "../Components/CandidateComp/Ats";
import ServicesByMentor from "../Components/CandidateComp/ServicesByMentor";

const Home = () => {
  return (
    <>
      <Layout>
        <div>
          <CandidateBanner />
          <MockDescSection />
          <ServicesByMentor />
          <InfiniteSlider />
          <StepsHome />
          <ThreeCircles />
          <Ats />
        </div>
      </Layout>
    </>
  );
};

export default Home;
