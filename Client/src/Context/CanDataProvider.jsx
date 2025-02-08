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

  const [questionGenerated, setQuestionGenerated] = useState(() => {
    const savedQuestion = sessionStorage.getItem("questionGenerated");
    return savedQuestion
      ? JSON.parse(savedQuestion)
      : null
  });

  // console.log(questionGenerated);

  useEffect(() => {
    sessionStorage.setItem("questionGenerated", JSON.stringify(questionGenerated));
  }, [questionGenerated]);

// --------------------------------------------------------------------------

  return (
    <CanDataContext.Provider value={{
      canAccount,
      setCanAccount,
      questionGenerated,
      setQuestionGenerated
    }}
    >
      {children}
    </CanDataContext.Provider>
  )
}

export default CanDataProvider;