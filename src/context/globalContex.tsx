import { createContext, useState, ReactNode } from "react";

export const GlobalContext = createContext({
  refreshPage: false,
  setRefresPage: (value: boolean) => {},
});

export const GlobalProvider = ({ children }: { children?: ReactNode }) => {
  const [refreshPage, setRefresPage] = useState<boolean>(false);

  const value = {
    refreshPage,
    setRefresPage,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
