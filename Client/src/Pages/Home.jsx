import React from "react";
import Layout from "../Layout/Layout";
import InfiniteSlider from "../Components/InfiniteSlider";
import HomeBanner from "../Components/CandidateBanner";
import MockDescSection from "../Components/MockDescSection";
import StepsHome from "../Components/StepsHome";
import CandidateBanner from "../Components/CandidateBanner";
import ThreeCircles from "../Components/ThreeCircles";
import Ats from "../Components/Ats"

const Home = () => {
  return (
    <>
      <Layout>
        <div>
          <CandidateBanner />
          <InfiniteSlider />
          <MockDescSection />
          <StepsHome />
          <ThreeCircles />
          <Ats />
        </div>
      </Layout>
    </>
  );
};

export default Home;
