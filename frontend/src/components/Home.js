import React from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import NavBar from "./NavBar";
import Rules from "./Rules";
import Footer from "./Footer";

function Home() {
  return (
    <div className="Home">
      <NavBar />
      <div className="Home-landing">
        <Animated
          className="Home-container"
          animationIn="fadeInUp"
          isVisible={true}
        >
          <h1 className="Home-title">Welcome to WebGwent</h1>
          <Link to="/queue" className="Home-button">
            Play
          </Link>
        </Animated>
      </div>
      <div className="Home-rules">
        <Rules />
      </div>
      <div className="Home-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
