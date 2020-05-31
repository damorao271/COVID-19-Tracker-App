import React, { Component } from "react";
import { Map, Popup, TileLayer, CircleMarker } from "react-leaflet";
import Slider from "./secondSlider";

class WorldMap extends Component {
  render() {
    const {
      fechas,
      data,
      color,
      counter,
      handleChange,
      handleDragStop,
    } = this.props;

    if (!data) {
      return (
        <div className="loading-map-container">
          <h3 onClick={console.log(this.props)}>Loading Map 2 ...</h3>
          <p>This might take a minute</p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="world-map-container">
          <Map center={[10, 0]} zoom={1.5}>
            <TileLayer
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              url="            https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
            "
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {data.map((a) => (
              <CircleMarker
                key={
                  a.Country + a.Province + a.Lat + a.Lon + a.City + a.CityCode
                }
                center={[a.Lat, a.Lon]}
                color={color}
                fillColor={color}
                opacity={0}
                fillOpacity={
                  a.CountryCode === "US"
                    ? Math.min(Math.max(Math.log2(a.Data), 0), 0.05)
                    : Math.min(Math.max(Math.log2(a.Data), 0), 0.6)
                }
                radius={
                  a.Data === 0
                    ? 0
                    : Math.min(Math.max(Math.log2(a.Data), 0), 40)
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
                    Confirmed Cases {a.Data} Lat:{a.Lat} Lon:{a.Lon}{" "}
                  </p>
                </Popup>
              </CircleMarker>
            ))}
          </Map>
        </div>
        <Slider
          color={color}
          fechas={fechas}
          counter={counter}
          handleChange={handleChange}
          handleDragStop={handleDragStop}
        />
      </React.Fragment>
    );
  }
}

export default WorldMap;

// Leaflet Maps
// http://leaflet-extras.github.io/leaflet-providers/preview/index.html
