import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export function ContextWrapper({ children }) {
  const [contextUser, setContextUser] = useState(null);
  const [contextAllUsers, setContextAllUsers] = useState([]);
  const [contextReviews, setContextReviews] = useState([]);

  return (
    <UserContext.Provider
      value={{
        contextUser,
        setContextUser,
        contextAllUsers,
        setContextAllUsers,
        contextReviews,
        setContextReviews,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
