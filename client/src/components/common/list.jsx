import React, { Component } from "react";

class List extends Component {
  render() {
    const {
      countries,
      sortByConfirmed,
      sortByRecovered,
      sortByDeaths,
    } = this.props;
    var counter = 1;

    if (!countries) {
      return (
        <div className="list-countries-container col-sm-12 col-md-12 col-xs-12 col-8">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Total Confirmed</th>
                <th>Total Recovered</th>
                <th>Total Deaths</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div
        // style={{ overflow: "auto" }}
        className="list-countries-container col-sm-12 col-md-12 col-xs-12 col-md-6 col-lg-6"
      >
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Country</th>
              <th onClick={() => sortByConfirmed(countries)}>
                Total Confirmed
              </th>
              <th onClick={() => sortByRecovered(countries)}>
                Total Recovered
              </th>
              <th onClick={() => sortByDeaths(countries)}>Total Deaths</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c.Country}>
                <td>
                  <p>{counter++}</p>
                </td>
                <td>
                  <p>{c.Country}</p>
                </td>
                <td>
                  <p>{c.TotalConfirmed}</p>
                </td>
                <td>
                  <p>{c.TotalRecovered}</p>
                </td>
                <td>
                  <p>{c.TotalDeaths}</p>
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
