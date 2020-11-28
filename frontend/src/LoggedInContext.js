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
    removeToken();
    setLoggedIn(false);
    setUser(null);
  }, [removeToken]);

  const login = useCallback(() => {
    if (token) {
      const { username, exp } = JWTDecode(token);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
