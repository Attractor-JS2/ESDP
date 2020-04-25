import React, { Component } from "react";
import logoImage from "../../assets/logo/logo.png";
import { animateScroll as scroll } from "react-scroll";

class Logo extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {
    return (
      <div className="logo">
        <img
          style={{ width: "150px" }}
          to="home-section"
          spy={true}
          smooth={true}
          offset={-170}
          duration={800}
          src={logoImage}
          className="logo-image"
          alt="Logo"
          onClick={this.scrollToTop}
        />{" "}
      </div>
    );
  }
}

export default Logo;
