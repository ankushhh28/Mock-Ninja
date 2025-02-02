import React from "react";
import Layout from "../Layout/Layout";
import InfiniteSlider from "../Components/InfiniteSlider";
import HomeBanner from "../Components/CandidateBanner";
import MockDescSection from "../Components/MockDescSection";
import StepsHome from "../Components/StepsHome";
import CandidateBanner from "../Components/CandidateBanner";

const Home = () => {
  return (
    <>
      <Layout>
        <div>
          <CandidateBanner />
          <MockDescSection />
          <InfiniteSlider />
          <StepsHome />
        </div>
      </Layout>
    </>
  );
};

export default Home;
