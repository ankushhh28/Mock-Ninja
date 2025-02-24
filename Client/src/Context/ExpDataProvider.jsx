import { createContext, useState } from "react";

export const ExpDataContext = createContext(null)

const ExpDataProvider = ({children}) => {

  const [fetchedData, setFetchedData] = useState({
    CarrierPackage:"",
    InterviewPackage:"",
    PriorityPackage:"",
    ResumePackage:""
  })

  return (
    <ExpDataContext.Provider value={{
      fetchedData,
      setFetchedData
    }}>
      {children}
    </ExpDataContext.Provider>
  )
}

export default ExpDataProvider