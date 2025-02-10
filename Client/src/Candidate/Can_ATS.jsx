import React from 'react'
import Can_Layout from './CanLayout/Can_Layout'
import Ats from '../Components/CandidateComp/Ats'
import ProfileComplete from './Component/ProfileComplete'

const CanATS = () => {
  return (
    <>
    <Can_Layout>
    <ProfileComplete/>
    <h1 className='text-5xl text-center h-[100vh]'>ATS CHECK</h1>
    <Ats/>
    </Can_Layout>
      
    </>
  )
}

export default CanATS
