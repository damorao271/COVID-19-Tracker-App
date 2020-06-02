import React, { Component } from "react";
import { getDayOneCountry } from "../../services/getdata";
import { Line } from "react-chartjs-2";
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

  // arrange = (pais) => {
  //   let country = [];
  //   let j = 0;
  //   for (let i = 0; i < pais.length - 1; i++) {
  //     // Trim string or pasrse integer

  //     if (pais[i].Date === pais[i + 1].Date) {
  //       pais[i + 1] = {
  //         Country: pais[i].Country,
  //         Date: pais[i + 1].Date,
  //         Confirmed: pais[i].Confirmed + pais[i + 1].Confirmed,
  //         Deaths: pais[i].Deaths + pais[i + 1].Deaths,
  //         Recovered: pais[i].Recovered + pais[i + 1].Recovered,
  //       };
  //     } else {
  //       country[j] = {
  //         Country: pais[i].Country,
  //         Date: pais[i].Date,
  //         Confirmed: pais[i].Confirmed,
  //         Deaths: pais[i].Deaths,
  //         Recovered: pais[i].Recovered,
  //         Province: pais[i].Province,
  //         City: pais[i].City,
  //         sumado: true,
  //         i: i,
  //         j: j,
  //       };
  //       j = j + 1;
  //     }
  //   }
  //   return country;
  // };

  render() {
    const { pais, sumDaysAndCities } = this.props;

    const filter = _.uniqBy(pais, "Country");

    if (!pais) {
      return null;
    }

    const filteredCountry = sumDaysAndCities(pais);

    return (
      <React.Fragment>
        <div className=" col-sm-12 col-md-12 col-xs-12 col-md-6 col-lg-6">
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
                  borderColor: "yellowgreen",
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
