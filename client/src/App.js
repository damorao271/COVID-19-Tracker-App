import React from "react";
import { getSummaryData, getDailyData } from "./services/getdata";
import WorldMapDisplay from "./components/worldMapDisplay";
import Header from "./components/header";
import Info from "./components/info";
import { Route, Switch } from "react-router-dom";
import _ from "lodash";

class App extends React.Component {
  state = {
    currentDate: "",
    global: "",
    countries: "",
    colors: "",
    superData: "",
    counter: 0,
    fechas: [],
  };

  // Obtiene los datos del server
  async componentDidMount() {
    let {
      Global: global,
      Countries: countries,
      Date: date,
    } = await getSummaryData();

    countries = _.sortBy(countries, (f) => f.TotalConfirmed).reverse();

    let colors = this.stringOfColors(countries);

    global.Country = "Global";
    this.setState({ global, countries, currentDate: date, colors });

    let superData = await getDailyData();
    let fechas = _.map(_.uniqBy(superData, "Date"), "Date");
    let counter = fechas.length - 1;

    this.setState({ superData, fechas, counter });
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

  // Ordena los paises por cantidad de casos confirmados
  sortByConfirmed = (countries) => {
    countries = _.sortBy(countries, (f) => f.TotalConfirmed).reverse();
    this.setState({ countries });
  };

  // Ordena los paises por cantidad de casos reuperados
  sortByRecovered = (countries) => {
    countries = _.sortBy(countries, (f) => f.TotalRecovered).reverse();
    this.setState({ countries });
  };

  // Ordena los paises por cantidad de casos muertos
  sortByDeaths = (countries) => {
    countries = _.sortBy(countries, (f) => f.TotalDeaths).reverse();
    this.setState({ countries });
  };

  // Actualiza  el State del slider
  handleChange = (event, counter) => {
    this.setState({ counter });
  };

  // Actualiza  el Props del slider
  handleDragStop = (counter) => {
    this.props.update(counter);
  };

  render() {
    const { superData, global, counter, countries, fechas } = this.state;

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
                handleChange={this.handleChange}
                handleDragStop={this.handleDragStop}
                fechas={fechas}
                sortByConfirmed={this.sortByConfirmed}
                sortByRecovered={this.sortByRecovered}
                sortByDeaths={this.sortByDeaths}
                countries={countries}
                global={global}
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
