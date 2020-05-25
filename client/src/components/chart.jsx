import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import PieChart from "./pieChart";
import _ from "lodash";

class Chart extends Component {
  state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  stringOfColors = () => {
    const array = [{ pais: "1" }, { pais: "1" }, { pais: "1" }, { pais: "1" }];
    var colors = [];
    for (let i = 0; i < array.length; i++) {
      colors[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    return colors;
  };

  // Funcion que recibe el objeto de data y retorna un objeto con los datos en arrays
  // y un arreglo de colores aleatorios
  dataInArrays = (country) => {
    var colors = [];
    for (let i = 0; i < country.length; i++) {
      colors[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    let result = {
      country: _.map(country, "Country"),
      colors: colors,
      NewConfirmed: _.map(country, "NewConfirmed"),
      NewRecovered: _.map(country, "NewRecovered"),
      NewDeaths: _.map(country, "NewDeaths"),
      TotalConfirmed: _.map(country, "TotalConfirmed"),
      TotalRecovered: _.map(country, "TotalRecovered"),
      TotalDeaths: _.map(country, "TotalDeaths"),
    };
    console.log("Resultado:", result);
    return result;
  };

  render() {
    const dataArray = this.dataInArrays(this.props.countries);

    return (
      <div className="chart">
        <h2>Chart Component</h2>
        <PieChart data={dataArray} />
        <Pie
          data={this.state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
