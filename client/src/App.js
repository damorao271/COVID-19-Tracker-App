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

    let colors = this.stringOfColors(countries);

    global.Country = "Global";
    this.setState({ global, countries, currentDate: date, colors });

    let superData = await getDailyData();
    this.setState({ superData });
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
    const { superData, countries } = this.state;
    const { Country, Deaths } = superData;

    console.log("superData: ", this.state.superData);

    return (
      <div className="App">
        <Header />

        <Switch>
          <Route
            path="/home"
            render={(props) => (
              <WorldMap superData={superData} countries={countries} />
            )}
          />
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
