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
    console.log("Countries in function: ", countries);
    console.log("Unique data in function: ", non_duplidated_data);

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

    return (
      <div className="worlmap-container">
        <Map center={[10, 0]} zoom={1.5}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {finalResult.map((a) => (
            <CircleMarker
              key={a.Country}
              center={[a.Lat, a.Lon]}
              color="red"
              fillColor="red"
              opacity={0.1}
              fillOpacity={Math.min(Math.max(0.0005 * a.TotalConfirmed, 0), 1)}
              radius={Math.min(Math.max(0.00005 * a.TotalConfirmed, 0), 40)}
            >
              <Popup
                className="pop-info"
                direction="right"
                offset={[0, 0]}
                opacity={0.5}
              >
                <h6 onClick={() => this.handleMarker(a.Country)}>
                  {a.Country}
                </h6>
                <p>{a.TotalConfirmed}</p>
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
