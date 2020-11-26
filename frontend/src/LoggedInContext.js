import React, { useState, useCallback } from "react";
import { useLocalStorage } from "./Hooks";
import Api from "./Api";
import JWTDecode from "jwt-decode";

export const LoggedInContext = React.createContext();

const LoggedInProvider = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorage("_token", "");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    console.log("LOGGING OUT!");
    removeToken();
    setLoggedIn(false);
    setUser(null);
  }, [token]);

  const login = useCallback(() => {
    if (token) {
      console.log(JWTDecode(token));
      const { username, exp, iat } = JWTDecode(token);

      if (Math.floor(Date.now() / 1000) >= exp) {
        console.log("Token expired");
        logout();
        return;
      }

      setLoggedIn(true);

      async function getUser() {
        const user = await Api.getUser(username);
        setUser(user);
      }

      getUser();
    }
  }, [token]);

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
