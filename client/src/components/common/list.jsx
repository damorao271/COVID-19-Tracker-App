import React, { Component } from "react";

class List extends Component {
  render() {
    const { countries } = this.props;
    var counter = 1;

    console.log("Props desde List:", this.props);
    console.log("Countries:", countries);

    if (!countries) {
      return (
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
      );
    }

    return (
      <div className="list-container">
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Country</th>
              <th>Total Confirmed</th>
              <th>Total Recovered</th>
              <th>Total Deaths</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr>
                <td>{counter++}</td>
                <td>{c.Country}</td>
                <td>{c.TotalConfirmed}</td>
                <td>{c.TotalRecovered}</td>
                <td>{c.TotalDeaths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
