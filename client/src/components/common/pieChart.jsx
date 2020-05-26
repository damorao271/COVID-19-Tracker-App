import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  render() {
    const { title, colors, countries, data } = this.props;

    const dataReady = {
      labels: countries,
      datasets: [
        {
          label: "Confirmed Cases",
          backgroundColor: colors,
          data: data,
        },
      ],
    };

    if (!title) {
      return <h2>Loading ...</h2>;
    }

    return (
      <div className="pie-chart-container">
        <h3>{title}</h3>
        <Pie
          data={dataReady}
          labels={countries}
          options={{
            title: {
              display: false,
              text: "Title",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "bottom",
            },
          }}
        />
      </div>
    );
  }
}

export default PieChart;
