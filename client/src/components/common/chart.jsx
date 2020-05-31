import React, { Component } from "react";
import { getDayOneCountry } from "../../services/getdata";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  state = {
    dayOneData: [],
  };

  async componentDidMount() {
    let dayOneData = await getDayOneCountry();
    console.log("Day one data: ", dayOneData);
    this.setState({ dayOneData });
  }

  render() {
    console.log("Day one data: ", this.state.dayOneData);

    const { dayOneData } = this.state;

    return (
      <React.Fragment>
        <div className=" col-sm-12 col-md-12 col-xs-12 col-md-6 col-lg-6">
          <h6>Chart</h6>

          <Line
            data={{
              labels: dayOneData.map(({ Date }) => Date),
              datasets: [
                {
                  data: dayOneData.map((data) => data.Confirmed),
                  label: "Infected",
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  fill: true,
                },
                {
                  data: dayOneData.map((data) => data.Recovered),
                  label: "Recovered",
                  borderColor: "yellowgreen",
                  backgroundColor: "rgba(0, 255, 0, 0.5)",
                  fill: true,
                },
                {
                  data: dayOneData.map((data) => data.Deaths),
                  label: "Deaths",
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
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
