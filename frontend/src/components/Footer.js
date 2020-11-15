import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "../css/Footer.css";

function Footer() {
  return (
    <ScrollAnimation
      className="Footer"
      offset={0}
      animateIn="fadeIn"
      durationIn={1}
    >
      <div className="Footer-social">
        <a href="www.google.com">
          <i className="fa fa-github"></i>
        </a>
        <a href="www.google.com">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="www.google.com">
          <i className="fa fa-vk"></i>
        </a>
        <a href="www.google.com">
          <i className="fa fa-telegram"></i>
        </a>
      </div>
      <div className="Footer-copyright">
        <p>2020 @ All rights reserved</p>
      </div>
    </ScrollAnimation>
  );
}

export default Footer;
