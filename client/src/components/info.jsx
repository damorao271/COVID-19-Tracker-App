import React, { Component } from "react";

class Info extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="info-container">
        <h3>Info</h3>
      </div>
    );
  }
}

export default Info;
