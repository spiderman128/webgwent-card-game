import React, { useState, useLayoutEffect } from "react";
import "./css/App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import SocketContext from "./SocketContext";
import io from "socket.io-client";
import Cookies from "universal-cookie";

const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUser] = useState({});
  const [room, setRoom] = useState();

  useLayoutEffect(() => {
    socket.on("connected", (resp) => {
      let u = resp;
      console.log(resp);
      setUser(u);
    });

    socket.on("update", (resp) => {
      console.log(resp);
      let u = resp;
      setUser(u);
    });

    socket.on("setCookie", (resp) => {
      const cookie = new Cookies();

      cookie.set("uid", resp, {
        path: "/",
      });
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket, user, room, setUser, setRoom }}>
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
