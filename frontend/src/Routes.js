import React from "react";
import Room from "./components/Room";
import Queue from "./components/Queue";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
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
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
