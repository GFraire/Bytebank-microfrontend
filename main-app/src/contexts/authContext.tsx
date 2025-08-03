import React, { createContext, useContext, ReactNode, useState } from "react";

export interface IUserData {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  balance: number;
};

type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const handleSetUser = (newUser: AuthUser | null) => {
    setUser(newUser);
  };

  const logout = () => {
    handleSetUser(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
