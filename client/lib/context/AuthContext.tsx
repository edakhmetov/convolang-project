import { createContext, ReactNode } from 'react';
import User from '../types/User';

const user: any = {};

export const AuthContext = createContext(user);

type AuthProviderProps = {
  value: {
    user: User | null;
    setUser: Function;
  };
  children: ReactNode;
};

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
