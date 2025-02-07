import React from 'react'
import Can_Layout from './CanLayout/Can_Layout'
import Can_Card from './Component/Can_Card'
import StepsForInt from './Component/StepsForInt'
import Can_FbHistory from './Component/Can_FbHistory'

const CanAiMock = () => {
  return (
    <>
    <Can_Layout>
      <StepsForInt />
      <Can_Card />
      <Can_FbHistory /> 
    </Can_Layout>
    </>
  )
}

export default CanAiMock
