import React from 'react'
import Can_NavBar from './Can_NavBar'
import Footer from "../../Layout/Footer"

const Can_Layout = ({ children }) => {
  return (
    <>
      <Can_NavBar/>
      {children}
      <Footer/>
    </>
  )
}

export default Can_Layout
