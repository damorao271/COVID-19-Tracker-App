import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MapNavbar extends Component {
  render() {
    const { global } = this.props;

    return (
      <div className="map-navbar-container ">
        <nav className="row">
          <div className="col-4">
            <NavLink to="/home/confirmed">
              <h6>Confirmed Cases</h6>
              <p>{global.TotalConfirmed}</p> <p>+ {global.NewConfirmed}</p>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink to="/home/recovered">
              <h6> Recovered Cases</h6>
              <p>{global.TotalRecovered}</p> <p>+ {global.NewRecovered}</p>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink to="/home/deaths">
              <h6> Death Cases</h6>
              <p>{global.TotalDeaths}</p> <p>+{global.NewDeaths}</p>
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default MapNavbar;
