import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/api"; // 👈 add this

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔹 Persist token
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // 🔹 Restore user from token on app reload
  useEffect(() => {
    const restoreUser = async () => {
      if (!token) return;

      try {
        const userData = await getProfile(token);
        setUser(userData);
      } catch (err) {
        logout(); // invalid/expired token
      }
    };

    restoreUser();
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
