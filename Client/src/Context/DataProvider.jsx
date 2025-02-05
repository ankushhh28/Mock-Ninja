import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

  // http://localhost:5000
  // https://mock-ninja-backend.onrender.com

  const backendUrl = "http://localhost:5000";

// ----------------------------------------------------------------------------

  const [beforeLogin, setBeforeLogin] = useState(false)

// ----------------------------------------------------------------------------
 
  const [intBeforeLogin, setintBeforeLogin] = useState(false)

// ----------------------------------------------------------------------------

  const [account, setAccount] = useState(() => {
    const savedAccount = sessionStorage.getItem("account")
    return savedAccount ? JSON.parse(savedAccount) : {
      accessToken:"",
      name:"",
      email:"",
      refreshToken:"",
      role:""
    }
  })

  console.log(account);

  useEffect(() => {
    sessionStorage.setItem("account", JSON.stringify(account))
  },[account])

// ----------------------------------------------------------------------------

  return (

    <DataContext.Provider
      value={{
        backendUrl,
        account,
        setAccount,
        beforeLogin,
        setBeforeLogin,
        setintBeforeLogin,
        intBeforeLogin
      }}
    >
      {children}
    </DataContext.Provider>

  );
};
export default DataProvider;
