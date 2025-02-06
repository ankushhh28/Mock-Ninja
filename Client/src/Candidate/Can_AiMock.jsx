import React from 'react'
import Can_Layout from './CanLayout/Can_Layout'
import Can_Card from './Component/Can_Card'
import StepsForInt from './Component/StepsForInt'
import ProfileComplete from './Component/ProfileComplete'

const CanAiMock = () => {
  return (
    <>
    <Can_Layout>
      <ProfileComplete/>
      <StepsForInt />
      <Can_Card /> 
    </Can_Layout>
    </>
  )
}

export default CanAiMock
