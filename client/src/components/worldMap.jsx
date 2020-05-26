import React, { Component } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  Circle,
  Tooltip,
} from "react-leaflet";
import { Icon } from "leaflet";

class WorldMap extends Component {
  // state = {};
  handleMarker = () => {
    console.log("Click");
  };
  render() {
    return (
      <div className="worlmap-container">
        <Map center={[10, 0]} zoom={1.5}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <CircleMarker
            center={[6.427, -66.59]}
            color="red"
            fillColor="red"
            opacity={0.1}
            fillOpacity={0.5}
            radius={80}
          >
            <Popup
              className="pop-info"
              direction="right"
              offset={[-20, 20]}
              opacity={1}
            >
              <h6 onClick={() => this.handleMarker()}>Casos</h6>
            </Popup>
          </CircleMarker>

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
