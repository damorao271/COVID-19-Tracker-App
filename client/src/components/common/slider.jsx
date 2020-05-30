import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

class SliderComponent extends Component {
  render() {
    const { counter, fechas } = this.props;
    var fecha = new Date(fechas[counter]);

    var dia = fecha.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    return (
      <div className="slider-contaier">
        <h3>Slider</h3>
        {dia}

        <Typography id="discrete-slider" gutterBottom>
          Temperature
        </Typography>
        <Slider
          defaultValue={30}
          getAriaValueText={dia}
          // aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={110}
        />
      </div>
    );
  }
}

export default SliderComponent;
