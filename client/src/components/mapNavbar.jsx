import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import coronaImage from "../../src/img/corona.png";
import CountUp from "react-countup";

class MapNavbar extends Component {
  render() {
    const { global } = this.props;

    if (!global) {
      return (
        <div className="map-navbar-container ">
          <nav className="row">
            <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
              <img className="logo" src={coronaImage} alt="COVID-19" />
            </div>
            <div className="col-4 col-lg-3 col-xl-3">
              <NavLink to="/confirmed">
                <div className="confirmed-navlink ">
                  <div>
                    <h4>Confirmed Cases</h4>
                    <p>...</p>
                  </div>
                  <div>
                    <p>...</p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-4 col-lg-3 col-xl-3">
              <NavLink to="/recovered">
                <div className="recovered-navlink ">
                  <div>
                    <h4>Recovered Cases</h4>
                    <p>...</p>
                  </div>
                  <div>
                    <p>...</p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-4 col-lg-3 col-xl-3">
              <NavLink to="/deaths">
                <div className="deaths-navlink ">
                  <div>
                    <h4>Death {"  "}Cases</h4>
                    <p>...</p>
                  </div>
                  <div>
                    <p>...</p>
                  </div>
                </div>
              </NavLink>
            </div>
          </nav>
        </div>
      );
    }

    return (
      <div className="map-navbar-container ">
        <nav className="row">
          <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
            <img className="logo" src={coronaImage} alt="COVID-19" />
          </div>
          <div className="col-4 col-lg-3 col-xl-3">
            <NavLink to="/confirmed">
              <div className="confirmed-navlink ">
                <div>
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
                <div>
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
          <div className="col-4 col-lg-3 col-xl-3">
            <NavLink to="/recovered">
              <div className="recovered-navlink ">
                <div>
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
                <div>
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
          <div className="col-4 col-lg-3 col-xl-3">
            <NavLink to="/deaths">
              <div className="deaths-navlink ">
                <div>
                  <h4>Death {"  "}Cases</h4>
                  <p>
                    <CountUp
                      start={global.TotalDeaths / 1.05}
                      end={global.TotalDeaths}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
                <div>
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
