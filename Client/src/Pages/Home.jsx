import React from "react";
import Layout from "../Layout/Layout";
import InfiniteSlider from "../Components/InfiniteSlider";
import ImageSlider from "../Components/ImageSlider";

const Home = () => {
  return (
    <>
      <Layout>
        <ImageSlider />
        <InfiniteSlider />
      </Layout>
    </>
  );
};

export default Home;
