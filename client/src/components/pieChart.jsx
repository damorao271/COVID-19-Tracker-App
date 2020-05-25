import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  render() {
    const {
      data: { colors, country, NewConfirmed },
    } = this.props;

    const data = {
      labels: country,
      datasets: [
        {
          label: "Confirmed Cases",
          backgroundColor: colors,
          data: NewConfirmed,
        },
      ],
    };

    return (
      <div className="pie-chart-container">
        <p>Pie Chart</p>
        {console.log("Props", this.props)}

        <Pie
          data={data}
          labels={country}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
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
