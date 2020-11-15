import React, { useState, useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { LoggedInContext } from "../../LoggedInContext";
import { Animated } from "react-animated-css";
import NavBar from "../NavBar";
import "../../css/Login.css";

function Login() {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (loggedIn) {
    return <Redirect to="/logout" />;
  }

  async function login() {}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    login();

    e.target.username.value = "";
    e.target.password.value = "";
  }

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
          <form className="Login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} type="text" name="username" />
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password" />
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
