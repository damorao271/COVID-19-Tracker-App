import React, { Component } from "react";
import CountUp from "react-countup";
import _ from "lodash";

class List extends Component {
  render() {
    const { countries, handleCountry, type } = this.props;
    if (!countries) {
      return <h2>Loading ...</h2>;
    }

    const orderedCountries = _.sortBy(
      countries,
      (o) => o.TotalConfirmed,
      -1
    ).reverse();

    return (
      <div className={type}>
        <ol>
          {orderedCountries.map((c) => (
            <li key={c.Country}>
              <p onClick={() => handleCountry(c)}>
                <CountUp
                  className="confirmed-count"
                  start={0}
                  end={c.TotalConfirmed}
                  duration={2.5}
                  separator="."
                />{" "}
                {c.Country}
              </p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default List;
