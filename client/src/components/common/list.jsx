import React, { Component } from "react";
import CountUp from "react-countup";
import Loader from "react-loader-spinner";
class List extends Component {
  render() {
    const {
      countries,
      handleCountrySpecific,
      sortByConfirmed,
      sortByRecovered,
      sortByDeaths,
    } = this.props;
    var counter = 1;
    console.log("List Props: ", this.props);
    if (!countries) {
      return (
        <div
          // style={{ overflow: "auto" }}
          className="spinner list-countries-container col-sm-12 col-md-12 col-xs-12 col-md-6 col-lg-6"
        >
          <Loader
            type="Oval"
            // color="#00BFFF"
            color="gray"
            secondaryColor="red"
            height="33%"
            width="33%"
          />
        </div>
      );
    }

    return (
      <div className="list-countries-container col-sm-12 col-md-12 col-xs-12 col-md-6 col-lg-6">
        <table>
          <thead>
            <tr>
              <th>
                <h5>Position</h5>
              </th>
              <th>
                <h5>Country</h5>
              </th>
              <th onClick={() => sortByConfirmed(countries)}>
                <h5>Total Confirmed</h5>
              </th>
              <th onClick={() => sortByRecovered(countries)}>
                <h5>Total Recovered</h5>
              </th>
              <th onClick={() => sortByDeaths(countries)}>
                <h5>Total Deaths</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c.Country} onClick={() => handleCountrySpecific(c.Slug)}>
                <td>
                  <p>{counter++}</p>
                </td>
                <td>
                  <h6>{c.Country}</h6>
                </td>
                <td>
                  <p>
                    <CountUp
                      start={c.TotalConfirmed / 1.03}
                      end={c.TotalConfirmed}
                      duration={3}
                      separator="."
                    />
                  </p>
                </td>
                <td>
                  <p>
                    <CountUp
                      start={c.TotalRecovered / 1.03}
                      end={c.TotalRecovered}
                      duration={3}
                      separator="."
                    />
                  </p>
                </td>
                <td>
                  <p>
                    <CountUp
                      start={c.TotalDeaths / 1.03}
                      end={c.TotalDeaths}
                      duration={3}
                      separator="."
                    />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
