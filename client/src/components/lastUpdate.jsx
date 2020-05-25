import React, { Component } from "react";

class LastUpdate extends Component {
  render() {
    const { date } = this.props;
    var fecha = new Date(date);
    var year = fecha.getFullYear();
    var month = fecha.getMonth() + 1;
    var day = fecha.getDate();
    var hora = fecha.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    return (
      <div className="last-update-container">
        <div>Last Update at (M/D/YYYY)</div>
        <p>
          {month}/{day}/{year}, {hora}
        </p>
      </div>
    );
  }
}

export default LastUpdate;
