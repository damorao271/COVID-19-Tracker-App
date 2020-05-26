import React from "react";
import Card from "./components/card";
import { getSummaryData } from "./services/getdata";
import ListConfirmed from "./components/listConfirmed";
import ListRecovered from "./components/listRecovered";
import ListDeaths from "./components/listDeaths";
import LastUpdate from "./components/lastUpdate";
import Chart from "./components/chart";
import Header from "./components/header";

class App extends React.Component {
  state = {
    currentDate: "",
    global: "",
    countries: "",
    colors: "",
  };

  // Obtiene los datos del server
  async componentDidMount() {
    let {
      Global: global,
      Countries: countries,
      Date: date,
    } = await getSummaryData();

    global.Country = "Global";

    let colors = this.stringOfColors(countries);

    this.setState({ global, countries, currentDate: date, colors });
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
    const { handleCountry } = this;
    return (
      <div className="App">
        <Header />
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

export default App;
