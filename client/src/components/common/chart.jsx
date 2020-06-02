import React, { Component } from "react";
import { getDayOneCountry } from "../../services/getdata";
import { Line } from "react-chartjs-2";
import Loader from "react-loader-spinner";
import _ from "lodash";

class Chart extends Component {
  getDate = (date) => {
    var fecha = new Date(date);
    var dia = fecha.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    return dia;
  };

  render() {
    const { pais, sumDaysAndCities } = this.props;

    const filter = _.uniqBy(pais, "Country");

    if (!pais) {
      return (
        <div className="spinner chart-container col-sm-12 col-md-12 col-xs-12 col-md-6 col-lg-6">
          <Loader
            type="Oval"
            // color="#00BFFF"
            color="gray"
            secondaryColor="red"
            height="33%"
            width="33%"
          />
        </div>
      );
    }

    const filteredCountry = sumDaysAndCities(pais);

    return (
      <React.Fragment>
        <div className="chart-container col-sm-12 col-md-12 col-xs-12 col-md-6 col-lg-6">
          <h5>{filter.map((c) => c.Country)}</h5>
          <Line
            data={{
              labels: filteredCountry.map(({ Date }) => this.getDate(Date)),
              datasets: [
                {
                  data: filteredCountry.map((data) => data.Confirmed),
                  label: "Infected",
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  fill: true,
                },
                {
                  data: filteredCountry.map((data) => data.Recovered),
                  label: "Recovered",
                  borderColor: "#7CAD30",
                  backgroundColor: "rgba(155, 205, 52, 0.5)",
                  fill: true,
                },
                {
                  data: filteredCountry.map((data) => data.Deaths),
                  label: "Deaths",
                  borderColor: "rgba(119, 119, 118, 0.5)",
                  backgroundColor: "rgba(119, 119, 118, 0.5)",
                  fill: true,
                },
              ],
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Chart;
