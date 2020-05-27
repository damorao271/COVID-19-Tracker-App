import React, { Component } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import _ from "lodash";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  Circle,
  Tooltip,
} from "react-leaflet";
import { Icon, circleMarker } from "leaflet";

class WorldMap extends Component {
  handleMarker = (Country) => {
    console.log("Country: ", Country);
  };

  // Fusiona los arreglos de todos los casos de paises con
  // la longitudm latitud y nombre de cada pais
  mergeArrays = (countries, non_duplidated_data) => {
    let result = [];

    for (let i = 0; i < countries.length; i++) {
      result[i] = {
        Country: non_duplidated_data[i].Country,
        Lat: non_duplidated_data[i].Lat,
        Lon: non_duplidated_data[i].Lon,
        NewConfirmed: countries[i].NewConfirmed,
        NewRecovered: countries[i].NewRecovered,
        NewDeaths: countries[i].NewDeaths,
        TotalConfirmed: countries[i].TotalConfirmed,
        TotalRecovered: countries[i].TotalRecovered,
        TotalDeaths: countries[i].TotalDeaths,
      };
    }
    console.log("Resultado", result);
    return result;
  };

  render() {
    const { superData, countries } = this.props;

    if (!superData) {
      return (
        <h2 onClick={() => this.handleMarker()}>
          Loading ... <p>This might take a few seconds</p>
        </h2>
      );
    }

    // Reduce el tamaño del array para no tener paises repetidos
    // y obtener el nomrbe latitud y longitud de cada pais
    var non_duplidated_data = _.uniqBy(superData, "Country");

    // Se fusionan los array para crear un solo arreglo con todas las
    // propiedades de ambos
    let finalResult = this.mergeArrays(countries, non_duplidated_data);
    console.log("Resultado Final: ", finalResult);

    console.log("Min&Max", minValue, maxValue);

    // Filtrar la Super data para obtener la info de ahi
    var newMap = _.map(superData, "Date");
    var newFilter = _.uniqBy(superData, "Country");

    // Filtra los valores por dia pero se repiten porque
    // los paises tiene varias zonas
    var filtradoPorValor = _.filter(
      superData,
      _.matchesProperty("Date", "2020-05-26T00:00:00Z")
    );

    // Encontrar el promedio de la data
    var mean = _.meanBy(filtradoPorValor, (f) => f.Confirmed);
    var mapeado = _.map(filtradoPorValor, "Confirmed");
    console.log("Mapeando", mapeado);

    var minValue = _.minBy(mapeado);
    var maxValue = _.maxBy(mapeado);

    console.log("Current Date", this.props.currentDate);

    console.log("Nuevo Mapeo", newMap);
    console.log("Mapeo buscando valores unicos", _.uniq(superData, "Date"));
    console.log("Nuevo filtrado", newFilter);
    console.log("Filtrado solo valores de hoy", filtradoPorValor);

    return (
      <div className="worlmap-container">
        <Map center={[10, 0]} zoom={1.5}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {filtradoPorValor.map((a) => (
            <CircleMarker
              key={a.Country + a.Province + a.Lat + a.Lon + a.City + a.CityCode}
              center={[a.Lat, a.Lon]}
              color="red"
              fillColor="red"
              opacity={0.1}
              fillOpacity={Math.min(
                Math.max(
                  (6 * (a.Confirmed - minValue)) / (maxValue - minValue),
                  0
                ),
                0.6
              )}
              radius={
                a.Confirmed === maxValue
                  ? 0
                  : Math.min(
                      Math.max(
                        (200 * (a.Confirmed - minValue)) /
                          (maxValue - minValue),
                        0
                      ),
                      40
                    )
              }
            >
              <Popup
                className="pop-info"
                direction="right"
                offset={[0, 0]}
                opacity={0.2}
              >
                <h6 onClick={() => this.handleMarker(a.Country)}>
                  {a.Country} {a.Province} {a.City}
                </h6>
                <p>
                  Confirmed Cases {a.Confirmed} Lat:{a.Lat} Lon:{a.Lon}{" "}
                </p>
              </Popup>
            </CircleMarker>
          ))}

          {/* <MarkerClusterGroup showCoverageOnHover={false}>
            <CircleMarker center={[49.8397, 24.0297]} color="red" radius={50} />
            <CircleMarker center={[52.2297, 21.0122]} color="red" />
            <CircleMarker center={[51.5074, -0.0901]} color="red" />
          </MarkerClusterGroup> */}
        </Map>
      </div>
    );
  }
}

export default WorldMap;
