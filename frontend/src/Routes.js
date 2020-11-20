import React from "react";
import Room from "./components/Room";
import Queue from "./components/Queue";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import Profile from "./components/Profile";
import { Switch, Route, Redirect } from "react-router-dom";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/queue">
        <Queue />
      </Route>
      <Route exact path="/room/:room">
        <Room />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
