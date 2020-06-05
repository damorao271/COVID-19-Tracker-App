import React, { Component } from "react";
import { Map, Popup, TileLayer, CircleMarker } from "react-leaflet";
import CountUp from "react-countup";
import L from "leaflet";
import Slider from "./mapSlider";

class WorldMap extends Component {
  render() {
    const {
      fechas,
      data,
      color,
      counter,
      handleCountrySpecific,
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

    const myStyle = {
      fontWeight: "bold",
      color: color,
    };

    var southWest = L.latLng(-63.548552, 190.942647),
      northEast = L.latLng(78.206563, -178.19923),
      bounds = L.latLngBounds(southWest, northEast);
    // maxBounds: bounds
    return (
      <React.Fragment>
        <div className="world-map-container">
          <Map
            center={[10, 0]}
            zoom={1.5}
            // maxZoom={3}
            minZoom={2}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
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
                  <div className="popup-container">
                    <div>
                      <h6 onClick={() => handleCountrySpecific(a.CountryCode)}>
                        {a.Country}
                        <p>
                          {a.Province} {a.City}
                        </p>
                      </h6>
                    </div>
                    <div>
                      <h6 style={myStyle}>
                        <CountUp
                          start={a.Data / 2}
                          end={a.Data}
                          duration={3}
                          separator="."
                        />
                      </h6>
                    </div>
                    <div>
                      <p>
                        Lat:{a.Lat} Lon:{a.Lon}
                      </p>
                    </div>
                  </div>
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
