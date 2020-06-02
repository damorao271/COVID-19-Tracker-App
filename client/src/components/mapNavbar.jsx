import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import coronaImage from "../../src/img/corona.png";
import CountUp from "react-countup";

class MapNavbar extends Component {
  render() {
    const { global } = this.props;

    return (
      <div className="map-navbar-container ">
        <nav className="row">
          <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
            <img className="logo" src={coronaImage} alt="COVID-19" />
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
            <NavLink to="/home/confirmed">
              <div className="confirmed-navlink row">
                <div className="col-9">
                  <h4>Confirmed Cases</h4>
                  <p>
                    <CountUp
                      start={global.TotalConfirmed / 1.05}
                      end={global.TotalConfirmed}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
                <div className="col-3">
                  <p>
                    +
                    <CountUp
                      start={global.NewConfirmed / 1.05}
                      end={global.NewConfirmed}
                      duration={5}
                      separator="."
                    />
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
            <NavLink to="/home/recovered">
              <div className="recovered-navlink row">
                <div className="col-9">
                  <h4>Recovered Cases</h4>
                  <p>
                    <CountUp
                      start={global.TotalRecovered / 1.05}
                      end={global.TotalRecovered}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
                <div className="col-3">
                  <p>
                    +
                    <CountUp
                      start={global.NewRecovered / 1.05}
                      end={global.NewRecovered}
                      duration={5}
                      separator="."
                    />
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
            <NavLink to="/home/deaths">
              <div className="deaths-navlink row">
                <div className="col-9">
                  <h4>Death Cases</h4>
                  <p>
                    <CountUp
                      start={global.TotalDeaths / 1.05}
                      end={global.TotalDeaths}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
                <div className="col-3">
                  <p>
                    +
                    <CountUp
                      start={global.NewDeaths / 1.05}
                      end={global.NewDeaths}
                      duration={5}
                      separator="."
                    />
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default MapNavbar;
