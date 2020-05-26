import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 6.42, lng: -66.59 }} />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class WorldMap extends Component {
  state = {};
  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        className="google-map-container"
      >
        <h3>Google Map</h3>
        {/* <WrappedMap
          loadingElement={<div style={{ height: "100%" }}></div>}
          containerElement={<div style={{ height: "100%" }}></div>}
          mapElement={<div style={{ height: "100%" }}></div>}
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          }
        /> */}
      </div>
    );
  }
}

export default WorldMap;
