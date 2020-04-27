import React, { Component } from "react";
import logoImage from "../../assets/logo/logo.png";

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img
          style={{ width: "150px" }}
          src={logoImage}
          className="logo-image"
          alt="Logo"
        />
      </div>
    );
  }
}

export default Logo;
