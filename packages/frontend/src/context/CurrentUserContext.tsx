// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define the User type
// type User = {
//   id: number;
//   name: string;
//   url: string;
// };

// // Define the context type
// type CurrentUserContextType = {
//   currentUser: User;
//   fetchCurrentUser: () => Promise<void>;
// };

// // Create the context with a default value
// export const CurrentUserContext = createContext<
//   CurrentUserContextType | undefined
// >(undefined);

// // Define the props for the provider
// type CurrentUserProviderProps = {
//   children: ReactNode;
// };

// export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
//   children,
// }) => {
//   const [currentUser, setCurrentUser] = useState<User>({
//     id: 0,
//     name: "Anonymous",
//     url: "",
//   });

//   const fetchCurrentUser = async () => {
//     // let response = await fetch("/api/users/current");
//     // const user = await response.json();
//     const user = { id: 1233, name: "yossef", url: "" };
//     setCurrentUser(user);
//   };

//   return (
//     <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
//       {children}
//     </CurrentUserContext.Provider>
//   );
// };

// export const useCurrentUser = (): CurrentUserContextType => {
//   const context = useContext(CurrentUserContext);
//   if (context === undefined) {
//     throw new Error("useCurrentUser must be used within a CurrentUserProvider");
//   }
//   return context;
// };
import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  userId: string;
  login: (usrId: string, usrName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const login = (usrId: string, usrName: string) => {
    setIsAuthenticated(true);
    setUserId(usrId);
    setUserName(usrName);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUserId("");
    setUserName("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userName, userId, login, logout }}
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
