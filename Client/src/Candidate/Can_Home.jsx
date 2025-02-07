import React from 'react'
import Can_Layout from './CanLayout/Can_Layout'
import Home from '../Pages/Home'
import CandidateBanner from '../Components/CandidateComp/CandidateBanner'
import MockDescSection from '../Components/CandidateComp/MockDescSection'
import InfiniteSlider from '../Components/CandidateComp/InfiniteSlider'
import StepsHome from '../Components/CandidateComp/StepsHome'
import ThreeCircles from '../Components/CandidateComp/ThreeCircles'
import Ats from '../Components/CandidateComp/Ats'
import ProfileComplete from './Component/ProfileComplete'

const CanHome = () => {
  return (
    <>
    
    <Can_Layout>
      <ProfileComplete/>
      <CandidateBanner/>
      <MockDescSection />
      <InfiniteSlider />
      <StepsHome />
      <ThreeCircles />    
      {/* <Ats /> */}
    </Can_Layout>
    </>
  )
}

export default CanHome
