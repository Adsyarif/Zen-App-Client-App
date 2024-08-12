import React, { createContext, useState, ReactNode, FC } from "react";

export interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

interface User {
  userId: Number;
  userName: string;
  userDob: string;
  userPhone: string;
  userEmail: string;
  userGender: string;
  userAddess: string;
}

export const AppContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
});

interface UserProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<string>();

  const value = { currentUser, setCurrentUser, auth, setAuth };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
