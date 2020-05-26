import React from "react";
import { getSummaryData, getDailyData } from "./services/getdata";
import WorldMap from "./components/worldMap";

import Header from "./components/header";
import Info from "./components/info";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    currentDate: "",
    global: "",
    countries: "",
    colors: "",
    superData: "",
  };

  // Obtiene los datos del server
  async componentDidMount() {
    let {
      Global: global,
      Countries: countries,
      Date: date,
    } = await getSummaryData();

    let superData = getDailyData();

    global.Country = "Global";

    let colors = this.stringOfColors(countries);

    this.setState({ global, countries, currentDate: date, colors, superData });
  }
  // Crea un array de colores para la grafica de pastel
  stringOfColors = (country) => {
    var colors = [];
    for (let i = 0; i < country.length; i++) {
      colors[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    return colors;
  };

  // Maneja la seleccion de pais para mostrar datos en los Cards
  handleCountry = (country) => {
    this.setState({ global: country });
  };

  render() {
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
    } = this.state;

    console.log("Super data: ", this.state.superData);

    return (
      <div className="App">
        <Header />

        <Switch>
          <Route path="/home" render={(props) => <WorldMap />} />
          <Route
            path="/dataanalysis"
            render={(props) => (
              <Info props={this.state} handleCountry={this.handleCountry} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
