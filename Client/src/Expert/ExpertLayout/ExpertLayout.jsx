import React from 'react'
import ExpertNavBar from './ExpertNavBar'
import Footer from "../../Layout/Footer"

const ExpertLayout = ({ children }) => {
  return (
    <>
      <ExpertNavBar/>
      {children}
      <Footer/>
    </>
  )
}

export default ExpertLayout
