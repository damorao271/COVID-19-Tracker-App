import React, { Component } from "react";
import WorldMap from "./common/worldMap";
import MapNavbar from "./mapNavbar";
import List from "./common/list";
import Chart from "./common/chart";
import Loader from "react-loader-spinner";
import { Route, Switch } from "react-router-dom";
import _ from "lodash";

class WorldMapDisplay extends Component {
  // Filter Data just confirmed cases
  dataConfirmed = (superData, counter) => {
    let result = [];
    var fechas = _.map(_.uniqBy(superData, "Date"), "Date");

    for (let i = 0; i < superData.length; i++) {
      result[i] = {
        Active: superData[i].Active,
        City: superData[i].City,
        CityCode: superData[i].CityCode,
        Data: superData[i].Confirmed,
        Country: superData[i].Country,
        CountryCode: superData[i].CountryCode,
        Date: superData[i].Date,
        Lat: superData[i].Lat,
        Lon: superData[i].Lon,
        Province: superData[i].Province,
      };
    }

    // Filtra los valores por fecha pero se repiten porque
    // los paises tiene varias zonas
    result = _.filter(result, _.matchesProperty("Date", fechas[counter]));

    return result;
  };

  // Filter Data just death cases
  dataDeaths = (superData, counter) => {
    let result = [];
    var fechas = _.map(_.uniqBy(superData, "Date"), "Date");

    for (let i = 0; i < superData.length; i++) {
      result[i] = {
        Active: superData[i].Active,
        City: superData[i].City,
        CityCode: superData[i].CityCode,
        Data: superData[i].Deaths,
        Country: superData[i].Country,
        CountryCode: superData[i].CountryCode,
        Date: superData[i].Date,
        Lat: superData[i].Lat,
        Lon: superData[i].Lon,
        Province: superData[i].Province,
      };
    }

    // Filtra los valores por fecha pero se repiten porque
    // los paises tiene varias zonas
    result = _.filter(result, _.matchesProperty("Date", fechas[counter]));

    return result;
  };
  // Filter Data just recovered cases
  dataRecovered = (superData, counter) => {
    let result = [];
    var fechas = _.map(_.uniqBy(superData, "Date"), "Date");

    for (let i = 0; i < superData.length; i++) {
      result[i] = {
        Active: superData[i].Active,
        City: superData[i].City,
        CityCode: superData[i].CityCode,
        Data: superData[i].Recovered,
        Country: superData[i].Country,
        CountryCode: superData[i].CountryCode,
        Date: superData[i].Date,
        Lat: superData[i].Lat,
        Lon: superData[i].Lon,
        Province: superData[i].Province,
      };
    }

    // Filtra los valores por fecha pero se repiten porque
    // los paises tiene varias zonas
    result = _.filter(result, _.matchesProperty("Date", fechas[counter]));

    return result;
  };

  render() {
    const {
      pais,
      fechas,
      global,
      superData,
      counter,
      sumDaysAndCities,
      handleCountrySpecific,
      sortByConfirmed,
      sortByRecovered,
      sortByDeaths,
      handleChange,
      handleDragStop,
      countries,
    } = this.props;

    console.log("Super data: ", superData);

    const confirmedCases = this.dataConfirmed(superData, counter);
    const recoveredCases = this.dataRecovered(superData, counter);
    const deathCases = this.dataDeaths(superData, counter);

    if (!superData) {
      return (
        <React.Fragment>
          <MapNavbar global={global} />
          <div className="map-spiner-container">
            <Loader
              type="Oval"
              // color="#00BFFF"
              color="gray"
              secondaryColor="red"
              height="33%"
              width="33%"
            />
            <Loader
              type="Oval"
              // color="#00BFFF"
              color="gray"
              secondaryColor="red"
              height="33%"
              width="33%"
            />
            <Loader
              type="Oval"
              // color="#00BFFF"
              color="gray"
              secondaryColor="red"
              height="33%"
              width="33%"
            />
          </div>
          <div className="slider-contaier spinner row">
            <Loader
              type="ThreeDots"
              // color="#00BFFF"
              color="gray"
              secondaryColor="red"
              height="33%"
              width="33%"
            />
          </div>
          <div className="second-half row">
            <List
              handleCountrySpecific={handleCountrySpecific}
              sortByConfirmed={sortByConfirmed}
              sortByRecovered={sortByRecovered}
              sortByDeaths={sortByDeaths}
              countries={countries}
            />
            <Chart sumDaysAndCities={sumDaysAndCities} pais={pais} />
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <MapNavbar global={global} />

        <Switch>
          <Route
            path="/home/confirmed"
            render={(props) => (
              <WorldMap
                fechas={fechas}
                title="Confirmed Cases"
                type="Cases"
                data={confirmedCases}
                color="red"
                counter={counter}
                handleCountrySpecific={handleCountrySpecific}
                handleChange={handleChange}
                handleDragStop={handleDragStop}
              />
            )}
          />

          <Route
            path="/home/recovered"
            render={(props) => (
              <WorldMap
                fechas={fechas}
                data={recoveredCases}
                type="Reovered"
                color="#7CAD30"
                counter={counter}
                handleCountrySpecific={handleCountrySpecific}
                handleChange={handleChange}
                handleDragStop={handleDragStop}
              />
            )}
          />

          <Route
            path="/home/deaths"
            render={(props) => (
              <WorldMap
                fechas={fechas}
                type="Deaths"
                data={deathCases}
                color="gray"
                counter={counter}
                handleCountrySpecific={handleCountrySpecific}
                handleChange={handleChange}
                handleDragStop={handleDragStop}
              />
            )}
          />

          <Route
            path="/home/"
            render={(props) => (
              <WorldMap
                fechas={fechas}
                type="Cases"
                data={confirmedCases}
                color="red"
                counter={counter}
                handleCountrySpecific={handleCountrySpecific}
                handleChange={handleChange}
                handleDragStop={handleDragStop}
              />
            )}
          />
        </Switch>
        <div className="row">
          <List
            handleCountrySpecific={handleCountrySpecific}
            sortByConfirmed={sortByConfirmed}
            sortByRecovered={sortByRecovered}
            sortByDeaths={sortByDeaths}
            countries={countries}
          />
          <Chart sumDaysAndCities={sumDaysAndCities} pais={pais} />
        </div>
      </React.Fragment>
    );
  }
}

export default WorldMapDisplay;
