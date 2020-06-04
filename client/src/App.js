import React from "react";
import {
  getSummaryData,
  getDailyData,
  getDayOneCountry,
  getDayOneSpecific,
} from "./services/getdata";
import WorldMapDisplay from "./components/worldMapDisplay";
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
    pais: "",
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
    let pais = await getDayOneCountry();

    global.Country = "Global";
    this.setState({ pais, global, countries, currentDate: date, colors });

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

  // Actualiza el pais del Props
  handleCountrySpecific = async (country) => {
    let pais = await getDayOneSpecific(country);
    this.setState({ pais });
  };

  // Suma todos los casos de todas las regiones por dia para hacer un
  // solo display
  sumDaysAndCities = (pais) => {
    let country = [];
    let j = 0;
    for (let i = 0; i < pais.length - 1; i++) {
      // Trim string or pasrse integer

      if (pais[i].Date === pais[i + 1].Date) {
        pais[i + 1] = {
          Country: pais[i].Country,
          Date: pais[i + 1].Date,
          Confirmed: pais[i].Confirmed + pais[i + 1].Confirmed,
          Deaths: pais[i].Deaths + pais[i + 1].Deaths,
          Recovered: pais[i].Recovered + pais[i + 1].Recovered,
        };
      } else {
        country[j] = {
          Country: pais[i].Country,
          Date: pais[i].Date,
          Confirmed: pais[i].Confirmed,
          Deaths: pais[i].Deaths,
          Recovered: pais[i].Recovered,
          Province: pais[i].Province,
          City: pais[i].City,
          sumado: true,
          i: i,
          j: j,
        };
        j = j + 1;
      }
    }
    console.log("Algo esta cambiando: ", pais);
    return country;
  };

  render() {
    const { pais, superData, global, counter, countries, fechas } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            path="/charts"
            render={(props) => (
              <Info props={this.state} handleCountry={this.handleCountry} />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <WorldMapDisplay
                pais={pais}
                sumDaysAndCities={this.sumDaysAndCities}
                handleCountrySpecific={this.handleCountrySpecific}
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
