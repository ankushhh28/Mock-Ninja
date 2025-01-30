import { createContext } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

  const backendUrl = "https://mock-ninja-backend.onrender.com";

  return (

    <DataContext.Provider
      value={{
        backendUrl,
      }}
    >
      {children}
    </DataContext.Provider>

  );
};
export default DataProvider;
