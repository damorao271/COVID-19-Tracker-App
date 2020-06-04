import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";

class MapSlider extends Component {
  render() {
    const { counter, fechas, color } = this.props;

    var fecha = new Date(fechas[counter]);
    var dia = fecha.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const PrettoSlider = withStyles({
      root: {
        color: color,
        height: 8,
      },
      thumb: {
        height: 12,
        width: 12,
        backgroundColor: { color },
        border: "2px solid currentColor",
        marginTop: -4,
        marginLeft: -6,
        "&:focus, &:hover, &$active": {
          boxShadow: "inherit",
        },
      },
      active: {},
      valueLabel: {
        left: "-11px",
        top: "-20px",
        background: "transparent",
      },
      track: {
        height: 4,
        borderRadius: 4,
      },
      rail: {
        height: 4,
        borderRadius: 4,
      },
    })(Slider);

    var datesLength = 0;
    if (fechas.length % 2 !== 0) {
      datesLength = fechas.length;
    } else {
      datesLength = fechas.length - 1;
    }

    const marks = [
      {
        value: 0,
        label: "Day: " + 0,
      },
      {
        value: Math.round((datesLength - 1) * 0.25),
        label: "Day: " + Math.round((datesLength - 1) * 0.25),
      },
      {
        value: Math.round((datesLength - 1) * 0.5),
        label: "Day: " + Math.round((datesLength - 1) * 0.5),
      },
      {
        value: Math.round((datesLength - 1) * 0.75),
        label: "Day: " + Math.round((datesLength - 1) * 0.75),
      },
      {
        value: Math.round(datesLength - 1),
        label: "Day: " + Math.round(datesLength - 1),
      },
    ];

    if (fechas.length < 10) {
      return (
        <div className="slider-contaier row">
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

    return (
      <React.Fragment>
        <div className="slider-contaier row">
          <div className="col-9">
            <div>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={counter}
                step={1}
                marks={marks}
                min={0}
                max={fechas.length}
                value={counter}
                onDragStop={this.props.handleDragStop}
                onChange={this.props.handleChange}
              />
            </div>
          </div>
          <div className=" col-3 day-display ">
            <div className="row">
              <h6>Day:</h6>
              <h5 style={{ color: color }}>{counter}</h5>
            </div>
            <div className="row">
              <h6>{dia}</h6>
            </div>
          </div>
          ``
        </div>
      </React.Fragment>
    );
  }
}

export default MapSlider;
