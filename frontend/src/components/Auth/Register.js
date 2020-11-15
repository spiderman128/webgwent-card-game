import React, { useState, useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { LoggedInContext } from "../../LoggedInContext";
import { Animated } from "react-animated-css";
import NavBar from "../NavBar";
import "../../css/Register.css";

function Register() {
  const history = useHistory();
  const [status, setStatus] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { setUser, loggedIn, setLoggedIn } = useContext(LoggedInContext);

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  async function register() {}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    register();

    // e.target.username.value = "";
    // e.target.password.value = "";
    // e.target.first_name.value = "";
    // e.target.last_name.value = "";
    // e.target.email.value = "";
  }

  return (
    <div className="Register">
      <NavBar />
      <Animated
        className="Register-container"
        animationIn="fadeIn"
        isVisible={true}
      >
        <div className="Register-left">
          <h1>Register</h1>
          <div className="Register-login">
            Already have an account? <Link to="/login">Log in!</Link>
          </div>
        </div>
        <div className="Register-right">
          <form className="Register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            {status.username
              ? Object.keys(status.username).map((m) => (
                  <span key={m} className="error">
                    {status.username[m]}
                  </span>
                ))
              : null}
            <input onChange={handleChange} type="text" name="username" />
            <label htmlFor="password">Password</label>
            {status.password
              ? Object.keys(status.password).map((m) => (
                  <span key={m} className="error">
                    {status.password[m]}
                  </span>
                ))
              : null}
            <input onChange={handleChange} type="password" name="password" />
            <label htmlFor="email">Email</label>
            {status.email
              ? Object.keys(status.email).map((m) => (
                  <span key={m} className="error">
                    {status.email[m]}
                  </span>
                ))
              : null}
            <input onChange={handleChange} type="text" name="email" />
            <button id="Register-submit" type="submit" name="button">
              Register
            </button>
          </form>
        </div>
      </Animated>
    </div>
  );
}

export default Register;
