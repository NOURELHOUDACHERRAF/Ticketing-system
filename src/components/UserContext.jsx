import React, { createContext, useContext, useState } from "react";

// ✅ Create Context
const UserContext = createContext();

// ✅ Provider Component
export const UserProvider = ({ children }) => {
  // You can fetch/set this data later from an API or login form
  const [user, setUser] = useState({
    firstName: "Ali",
    lastName: "Benail",
    role: "Utilisateur",
    email: "Ali.Bouali@sonalgaz.dz",
    phone: "0551234567",
    unit: "Tlemcen (DTLM)",
  });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Hook to use user anywhere
export const useUser = () => {
  return useContext(UserContext);
};
