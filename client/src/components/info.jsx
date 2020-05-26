import React, { Component } from "react";
import ListConfirmed from "./listConfirmed";
import ListRecovered from "./listRecovered";
import ListDeaths from "./listDeaths";
import LastUpdate from "./lastUpdate";
import Chart from "./chart";
import Card from "./card";

class Info extends Component {
  render() {
    console.log("Props", this.props);
    const { props } = this.props;
    const {
      global: {
        Country,
        NewConfirmed,
        NewDeaths,
        NewRecovered,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered,
      },
      colors,
      countries,
      currentDate,
    } = props;
    const { handleCountry } = this;
    return (
      <div className="info-container">
        <h3>Info</h3>
        <div className="row">
          <div className="element col-2">
            <Card
              type={"Confimed"}
              country={Country}
              total={TotalConfirmed}
              daily={NewConfirmed}
            />
            <ListConfirmed
              type={"Confimed-list"}
              handleCountry={handleCountry}
              countries={countries}
            />
            <LastUpdate date={currentDate} />
          </div>
          <div className="element col-6">
            <Chart colors={colors} countries={countries} />
            **** Datos dia a dia de cada pais ****
            https://api.covid19api.com/dayone/country/south-africa ****
            https://api.covid19api.com/dayone/country/south-africa/status/confirmed
            ****** https://coronavirus.jhu.edu/map.html
          </div>
          <div className="element col-4">
            <div className="row">
              <div className="col-6">
                <Card
                  type={"Recovered"}
                  country={Country}
                  total={TotalRecovered}
                  daily={NewRecovered}
                />
                <ListRecovered
                  type={"Recovered-list"}
                  handleCountry={handleCountry}
                  countries={countries}
                />
              </div>
              <div className="col-6">
                <Card
                  type={"Deaths"}
                  country={Country}
                  total={TotalDeaths}
                  daily={NewDeaths}
                />
                <ListDeaths
                  type={"Deaths-list"}
                  handleCountry={handleCountry}
                  countries={countries}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
