import React, { Component } from "react";
import PieChart from "./common/pieChart";
import SubNavbar from "./subNavbar";
import { Route, Switch } from "react-router-dom";

import _ from "lodash";

class Chart extends Component {
  // Funcion que recibe el objeto de data y retorna un objeto con los datos en arrays
  // y un arreglo de colores aleatorios
  dataInArrays = (country, entryColors) => {
    let result = {
      countries: _.map(country, "Country"),
      colors: entryColors,
      NewConfirmed: _.map(country, "NewConfirmed"),
      NewRecovered: _.map(country, "NewRecovered"),
      NewDeaths: _.map(country, "NewDeaths"),
      TotalConfirmed: _.map(country, "TotalConfirmed"),
      TotalRecovered: _.map(country, "TotalRecovered"),
      TotalDeaths: _.map(country, "TotalDeaths"),
    };
    return result;
  };

  render() {
    const dataArray = this.dataInArrays(
      this.props.countries,
      this.props.colors
    );

    const {
      countries,
      colors,
      NewConfirmed,
      NewDeaths,
      NewRecovered,
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
    } = dataArray;

    return (
      <div className="chart">
        <SubNavbar />
        <Switch>
          <Route
            path="/charts/totalconfirmed"
            render={(props) => (
              <PieChart
                title="Global Confirmed Cases"
                colors={colors}
                countries={countries}
                data={TotalConfirmed}
              />
            )}
          />
          <Route
            path="/charts/totalrecovered"
            render={(props) => (
              <PieChart
                title="Global Recovered Cases"
                colors={colors}
                countries={countries}
                data={TotalRecovered}
              />
            )}
          />
          <Route
            path="/charts/totaldeaths"
            render={(props) => (
              <PieChart
                title="Global Death Cases"
                colors={colors}
                countries={countries}
                data={TotalDeaths}
              />
            )}
          />
          <Route
            path="/charts/newconfirmed"
            render={(props) => (
              <PieChart
                title="Global New Confirmed Cases"
                colors={colors}
                countries={countries}
                data={NewConfirmed}
              />
            )}
          />
          <Route
            path="/charts/newrecovered"
            render={(props) => (
              <PieChart
                title="Global New Recovered Cases"
                colors={colors}
                countries={countries}
                data={NewRecovered}
              />
            )}
          />
          <Route
            path="/charts/newdeaths"
            render={(props) => (
              <PieChart
                title="Global New Death Cases"
                colors={colors}
                countries={countries}
                data={NewDeaths}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default Chart;
