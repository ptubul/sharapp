import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User type
type User = {
  id: number;
  name: string;
  url: string;
};

// Define the context type
type CurrentUserContextType = {
  currentUser: User;
  fetchCurrentUser: () => Promise<void>;
};

// Create the context with a default value
export const CurrentUserContext = createContext<
  CurrentUserContextType | undefined
>(undefined);

// Define the props for the provider
type CurrentUserProviderProps = {
  children: ReactNode;
};

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 0,
    name: "Anonymous",
    url: "",
  });

  const fetchCurrentUser = async () => {
    // let response = await fetch("/api/users/current");
    // const user = await response.json();
    const user = { id: 1233, name: "yossef", url: "" };
    setCurrentUser(user);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = (): CurrentUserContextType => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};
