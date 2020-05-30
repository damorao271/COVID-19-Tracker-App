import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

class SliderComponent extends Component {
  render() {
    const { counter, fechas } = this.props;
    var fecha = new Date(fechas[counter]);
    const maxLength = fechas.length;
    var dia = fecha.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const PrettoSlider = withStyles({
      root: {
        color: "red",
        height: 8,
      },
      thumb: {
        height: 12,
        width: 12,
        backgroundColor: "gray",
        color: "red",
        border: "2px solid currentColor",
        marginTop: -4,
        // marginLeft: -6,
        "&:focus, &:hover, &$active": {
          boxShadow: "inherit",
        },
      },
      active: {},
      valueLabel: {
        // left: "calc(-50% + 4px)",
      },
      track: {
        height: 4,
        borderRadius: 2,
      },
      rail: {
        height: 4,
        borderRadius: 2,
      },
    })(Slider);

    return (
      <React.Fragment>
        <div className="slider-contaier">
          <Typography id="discrete-slider" gutterBottom>
            Date: {dia}
          </Typography>
          <div>
            <Slider
              // defaultValue={counter}
              // getAriaValueText={counter}
              color="red"
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={maxLength}
            />
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={20}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SliderComponent;
