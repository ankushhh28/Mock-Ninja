import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

  // http://localhost:5000
  // https://mock-ninja-backend.onrender.com

  const backendUrl = "http://localhost:5000";

// ----------------------------------------------------------------------------

  const [account, setAccount] = useState(() => {
    const savedAccount = sessionStorage.getItem("account")
    return savedAccount ? JSON.parse(savedAccount) : {
      accessToken:"",
      name:"",
      refreshToken:"",
      role:""
    }
  })

  useEffect(() => {
    sessionStorage.setItem("account", JSON.stringify(account))
  },[account])

// ----------------------------------------------------------------------------

  return (

    <DataContext.Provider
      value={{
        backendUrl,
        account,
        setAccount
      }}
    >
      {children}
    </DataContext.Provider>

  );
};
export default DataProvider;
