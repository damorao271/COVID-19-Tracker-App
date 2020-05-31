import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

class SliderComponent extends Component {
  state = {
    counter: 1,
    fechas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    value: 10,
  };

  handleChange = (event, value) => this.setState({ value });

  handleDragStop = () => this.props.update(this.state.value);

  render() {
    const { counter, fechas, handleChange, handleDragStop } = this.state;

    var fecha = new Date(fechas[counter]);
    const maxLength = fechas.length;
    var dia = fecha.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const PrettoSlider = withStyles({
      root: {
        color: "yellowgreen",
        height: 8,
      },
      thumb: {
        height: 12,
        width: 12,
        backgroundColor: "yellowgreen",
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

    return (
      <React.Fragment>
        <div className="slider-contaier">
          <Typography id="discrete-slider" gutterBottom>
            {/* Date: {dia} */}
          </Typography>
          <div>
            <Slider
              // defaultValue={counter}
              // getAriaValueText={counter}
              color="primary"
              aria-labelledby="slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={maxLength}
              onChange={this.handleChange}
              onDragStop={this.handleDragStop}
            />
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={20}
              onDragStop={this.props.handleDragStop}
              onChange={this.props.handleChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SliderComponent;
