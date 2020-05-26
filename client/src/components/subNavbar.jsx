import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SubNavbar extends Component {
  render() {
    return (
      <div className="sub-navbar-cont">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink to="/dataanalysis/totalconfirmed">Total Confirmed</NavLink>
          <NavLink to="/dataanalysis/totalrecovered">Total Recovered</NavLink>
          <NavLink to="/dataanalysis/totaldeaths">Total Deaths</NavLink>
          <NavLink to="/dataanalysis/newconfirmed">New Confirmed</NavLink>
          <NavLink to="/dataanalysis/newrecovered">New Recovered</NavLink>
          <NavLink to="/dataanalysis/newdeaths">New Deaths</NavLink>
        </nav>
      </div>
    );
  }
}

export default SubNavbar;
