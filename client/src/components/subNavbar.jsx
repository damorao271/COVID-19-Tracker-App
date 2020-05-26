import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SubNavbar extends Component {
  render() {
    return (
      <div className="sub-navbar-cont">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink to="/totalconfirmed">Total Confirmed</NavLink>
          <NavLink to="/totalrecovered">Total Recovered</NavLink>
          <NavLink to="/totaldeaths">Total Deaths</NavLink>
          <NavLink to="/newconfirmed">New Confirmed</NavLink>
          <NavLink to="/newrecovered">New Recovered</NavLink>
          <NavLink to="/newdeaths">New Deaths</NavLink>
        </nav>
      </div>
    );
  }
}

export default SubNavbar;
