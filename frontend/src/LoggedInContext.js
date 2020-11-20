import React, { useState } from "react";
import { useLocalStorage } from "./Hooks";
import Api from "./Api";
import JWTDecode from "jwt-decode";

export const LoggedInContext = React.createContext();

const LoggedInProvider = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorage("_token", "");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = () => {
    console.log("LOGGING IN!");
    if (token) {
      setLoggedIn(true);

      async function getUser() {
        const user = await Api.getUser(JWTDecode(token).username);
        setUser(user);
      }

      getUser();
    }
  };

  const logout = () => {
    console.log("LOGGING OUT!");
    removeToken();
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <LoggedInContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        login,
        logout,
        token,
        setToken,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
