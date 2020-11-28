import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";
import { LoggedInContext } from "../LoggedInContext";
import "../css/NavBar.css";

function NavBar() {
  const { loggedIn } = useContext(LoggedInContext);

  return (
    <Animated className="NavBar" animationIn="fadeInUp" isVisible={true}>
      <div className="NavBar-links">
        <div className="NavBar-links-general">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink exact to="/queue" className="nav-link">
            Lobby
          </NavLink>
        </div>
        <div className="NavBar-links-auth">
          {loggedIn === false ? (
            <>
              <NavLink exact to="/login">
                Login
              </NavLink>
              <NavLink exact to="/register" className="nav-link">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink exact to="/profile" className="nav-link">
                Profile
              </NavLink>
              <NavLink exact to="/logout" className="nav-link">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </Animated>
  );
}

export default NavBar;
