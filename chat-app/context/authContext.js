import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    //  onAUth State Changed

    setTimeout(() => {
      setIsAuthenticated("false");
    }, 4000);
  }, []);

  const login = async (email, password) => {
    try {
    } catch (error) {
      console.log("Error", error);
    }
  };

  const logout = async () => {
    try {
    } catch (error) {
      console.log("Error", error);
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return value;
};
