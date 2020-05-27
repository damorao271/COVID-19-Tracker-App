import React, { Component } from "react";
import WorldMap from "./common/worldMap";
import _ from "lodash";
import { Map, Popup, TileLayer, CircleMarker } from "react-leaflet";

class WorldMapDisplay extends Component {
  hadleDate = () => {
    console.log("Cambia Fecha");
  };

  render() {
    const { superData, counter, increaseCounter, decreaseCounter } = this.props;

    if (!superData) {
      return (
        <h3>
          Loading Map ... <p>This might take a minute</p>
        </h3>
      );
    }

    // Filtra los valores por fecha pero se repiten porque
    // los paises tiene varias zonas

    var fechas = _.map(_.uniqBy(superData, "Date"), "Date");

    console.log("Counter", this.props);
    console.log("Props", this.props);

    var filtradoPorValor = _.filter(
      superData,
      _.matchesProperty("Date", fechas[counter])
    );

    // Encontrar el promedio de la data
    var mean = _.meanBy(filtradoPorValor, (f) => f.Confirmed);
    // Encuentra los valores maximos y minimos del array filtrado por fecha
    var minValue = _.minBy(_.map(filtradoPorValor, "Confirmed"));
    var maxValue = _.maxBy(_.map(filtradoPorValor, "Confirmed"));
    // console.log("Filtrado solo valores de hoy", filtradoPorValor);

    //  Para usar luego cuando haag por tipo de data
    // var filtradoPorTipoDeData = _.filter(filtradoPorValor, "Confirmed");

    // console.log("Data Completa: ", filtradoPorValor);
    // console.log("Solo Confirmados: ", filtradoPorTipoDeData);
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
        </Map>

        <button onClick={() => increaseCounter(counter)}>Cambiar Fecha</button>
        <button onClick={() => decreaseCounter(counter)}>Cambiar Fecha</button>
        <WorldMap superData={superData} color="blue" />
      </div>
    );
  }
}

export default WorldMapDisplay;
