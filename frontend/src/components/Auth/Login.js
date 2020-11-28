import React, { useState, useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { LoggedInContext } from "../../LoggedInContext";
import SocketContext from "../../SocketContext";
import { Animated } from "react-animated-css";
import { useForm } from "react-hook-form";
import NavBar from "../NavBar";
import Api from "../../Api";
import "../../css/Login.css";

function Login() {
  const history = useHistory();
  const { reconnect } = useContext(SocketContext);
  const { loggedIn, setLoggedIn, setToken } = useContext(LoggedInContext);
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState(null);

  if (loggedIn) {
    return <Redirect to="/logout" />;
  }

  async function loginUser(data) {
    let _token;

    try {
      _token = await Api.login(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      return;
    }

    setToken(_token);
    setLoggedIn(true);

    reconnect();

    history.push("/");
  }

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <div className="Login">
      <NavBar />
      <Animated
        className="Login-container"
        animationIn="fadeIn"
        isVisible={true}
      >
        <div className="Login-left">
          <h1>Login</h1>
          <div className="Login-register">
            First time visiting? <Link to="/login">Create an account!</Link>
          </div>
        </div>
        <div className="Login-right">
          <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              ref={register({ required: true })}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={register({ required: true })}
            />
            {status === "error" ? (
              <div className="error">
                Incorrect Username/Password. Please try again
              </div>
            ) : null}
            <button id="Login-submit" type="submit" name="button">
              Login
            </button>
          </form>
        </div>
      </Animated>
    </div>
  );
}

export default Login;
