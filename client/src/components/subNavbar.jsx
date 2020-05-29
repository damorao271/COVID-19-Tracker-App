import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SubNavbar extends Component {
  render() {
    return (
      <div className="sub-navbar-cont">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink to="/charts/totalconfirmed">Total Confirmed</NavLink>
          <NavLink to="/charts/totalrecovered">Total Recovered</NavLink>
          <NavLink to="/charts/totaldeaths">Total Deaths</NavLink>
          <NavLink to="/charts/newconfirmed">New Confirmed</NavLink>
          <NavLink to="/charts/newrecovered">New Recovered</NavLink>
          <NavLink to="/charts/newdeaths">New Deaths</NavLink>
        </nav>
      </div>
    );
  }
}

export default SubNavbar;
