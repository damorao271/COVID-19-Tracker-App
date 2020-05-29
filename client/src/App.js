import React from "react";
import { getSummaryData, getDailyData } from "./services/getdata";
import WorldMapDisplay from "./components/worldMapDisplay";
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
    counter: 0,
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

  increaseCounter = (counter) => {
    counter = counter + 5;
    this.setState({ counter });
  };
  decreaseCounter = (counter) => {
    counter <= 0 ? (counter = 0) : (counter = counter - 5);
    this.setState({ counter });
  };

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
    const { superData, global, counter, countries } = this.state;

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            path="/charts"
            render={(props) => (
              <Info props={this.state} handleCountry={this.handleCountry} />
            )}
          />
          <Route
            path="/home"
            render={(props) => (
              <WorldMapDisplay
                countries={countries}
                global={global}
                decreaseCounter={this.decreaseCounter}
                increaseCounter={this.increaseCounter}
                counter={counter}
                superData={superData}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
