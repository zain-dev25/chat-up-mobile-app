import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    //  onAUth State Changed

    // setTimeout(() => {
    //   setIsAuthenticated("false");
    // }, 4000);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Logging in user with:", { email, password });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const logout = async () => {
    try {

      console.log("Logging out user");
      // await setIsAuthenticated(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const register = async (email, password, username, profile) => {
    try {
      console.log("Registering user with:", { email, password, username, profile });
      // await setIsAuthenticated(true);
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
