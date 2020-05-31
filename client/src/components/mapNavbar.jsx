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
              <div>
                <h6>Confirmed Cases</h6>
                <p>{global.TotalConfirmed}</p>
              </div>
              <div>
                <p>+ {global.NewConfirmed}</p>
              </div>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink to="/home/recovered">
              <div>
                <h6>Recovered Cases</h6>
                <p>{global.TotalRecovered}</p>
              </div>
              <div>
                <p>+ {global.NewRecovered}</p>
              </div>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink to="/home/deaths">
              <div>
                <h6>Death Cases</h6>
                <p>{global.TotalDeaths}</p>
              </div>
              <div>
                <p>+ {global.NewDeaths}</p>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default MapNavbar;
