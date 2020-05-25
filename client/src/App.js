import React from "react";
import Card from "./components/card";
import { getSummaryData } from "./services/getdata";
import ListConfirmed from "./components/listConfirmed";
import ListRecovered from "./components/listRecovered";
import ListDeaths from "./components/listDeaths";
import LastUpdate from "./components/lastUpdate";

class App extends React.Component {
  state = {
    currentDate: "",
    global: "",
    countries: "",
  };

  async componentDidMount() {
    let {
      Global: global,
      Countries: countries,
      Date: date,
    } = await getSummaryData();

    global.Country = "Global";
    this.setState({ global, countries, currentDate: date });
  }

  handleCountry = (country) => {
    this.setState({ global: country });
    console.log(this.state.currentDate);
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
      countries,
      currentDate,
    } = this.state;
    const { handleCountry } = this;
    return (
      <div className="App">
        <h1>App</h1>
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
            **** Datos dia a dia de cada pais ****
            https://api.covid19api.com/dayone/country/south-africa
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
