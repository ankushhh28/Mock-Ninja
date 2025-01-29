import React from 'react'
import SelectorNavBar from './SelectorNavBar'
import Footer from "../../Layout/Footer"

const SelectorLayout = ({ children }) => {
  return (
    <>
      <SelectorNavBar/>
      {children}
      <Footer/>
    </>
  )
}

export default SelectorLayout
