import React from "react";
import Layout from "../Layout/Layout";
import InfiniteSlider from "../Components/InfiniteSlider";
import HomeBanner from "../Components/HomeBanner";
import MockDescSection from "../Components/MockDescSection";
import StepsHome from "../Components/StepsHome";

const Home = () => {
  return (
    <>
    <Layout>
      <div>
      <HomeBanner/>
      <MockDescSection />
      <InfiniteSlider/>
      <StepsHome />
    </div>
    </Layout>
    </>
  );
};

export default Home;
