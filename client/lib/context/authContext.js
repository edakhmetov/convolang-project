import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ value, children }) => {
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
};