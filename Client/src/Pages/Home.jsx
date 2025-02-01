import React from "react";
import Layout from "../Layout/Layout";
import InfiniteSlider from "../Components/InfiniteSlider";
import ImageSlider from "../Components/ImageSlider";
import MockDescSection from "../Components/MockDescSection";
import StepsHome from "../Components/StepsHome";

const Home = () => {
  return (
    <>
    <Layout>
      <div>
      <ImageSlider/>
      <InfiniteSlider/>
      <MockDescSection />
      <StepsHome />
    </div>
    </Layout>
    </>
  );
};

export default Home;
