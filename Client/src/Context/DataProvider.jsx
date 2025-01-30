import { createContext, useContext } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const backendUrl = "http://localhost:5000";
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
