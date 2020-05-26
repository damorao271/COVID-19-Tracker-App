import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h6>
            <NavLink to="/home">Home{"  "}</NavLink>
          </h6>
          <h6>
            <NavLink to="/dataanalysis">Data Analysis </NavLink>
          </h6>
        </nav>
      </div>
    );
  }
}

export default Header;
