import { createContext, useEffect, useState } from "react";

export const CanDataContext = createContext(null)

const CanDataProvider = ({ children }) => {

// --------------------------------------------------------------------------

  const [canAccount, setCanAccount] = useState(() => {
    const savedAccount = localStorage.getItem("canAccount");
    return savedAccount
      ? JSON.parse(savedAccount)
      : null
  });

  useEffect(() => {
    localStorage.setItem("canAccount", JSON.stringify(canAccount));
  }, [canAccount]);

// --------------------------------------------------------------------------

  return (
    <CanDataContext.Provider value={{
      canAccount,
      setCanAccount
    }}
    >
      {children}
    </CanDataContext.Provider>
  )
}

export default CanDataProvider;