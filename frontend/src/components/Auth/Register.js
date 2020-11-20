import React, { useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoggedInContext } from "../../LoggedInContext";
import { Animated } from "react-animated-css";
import NavBar from "../NavBar";
import Api from "../../Api";
import "../../css/Register.css";

function Register() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const { setUser, loggedIn, setLoggedIn, setToken } = useContext(
    LoggedInContext
  );

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  async function registerUser(data) {
    console.log("I am called");
    let tkn;

    try {
      tkn = await Api.register(data);
    } catch (err) {
      console.log("PIZDA!");
      return;
    }

    setToken(tkn);

    const user = await Api.getUser(data.username);
    setUser(user);
    setLoggedIn(true);

    history.push("/");
  }

  const onSubmit = (data) => {
    registerUser(data);
  };

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
          <form className="Register-form" onSubmit={handleSubmit(onSubmit)}>
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
            <label htmlFor="email">Email</label>

            <input type="text" name="email" ref={register()} />
            {errors.exampleRequired && (
              <span className="error">This field is required</span>
            )}
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
