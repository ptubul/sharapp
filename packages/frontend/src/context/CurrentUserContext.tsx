import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  userId: string | null;
  login: (usrId: string, usrName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("userId") ? true : false
  );
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName") ? localStorage.getItem("userName") : null
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : null
  );

  const login = () => {
    setIsAuthenticated(true);
    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("userName"));
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
