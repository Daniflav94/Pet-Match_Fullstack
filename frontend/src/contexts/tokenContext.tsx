import React, { useState, createContext } from "react";

type PropsTokenContext = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const DEFAULT_VALUE = {
  token: localStorage.getItem("token") || "",
  setToken: () => {},
};

interface Props {
  children: React.ReactNode;
}

export const TokenContext = createContext<PropsTokenContext>(DEFAULT_VALUE);

const TokenContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState(DEFAULT_VALUE.token);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContextProvider };
export default TokenContext;
