import React, { Component } from "react";
import CountUp from "react-countup";

class Card extends Component {
  render() {
    const { type, country, total, daily } = this.props;
    if (!country) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className={type}>
        <h3>
          {country} {type}
        </h3>
        <h2>
          <CountUp
            start={total / 1.009}
            end={total}
            duration={1}
            separator="."
          />
        </h2>
        <h5>
          New +
          <CountUp
            start={daily / 1.009}
            end={daily}
            duration={2.75}
            separator="."
          />
        </h5>
      </div>
    );
  }
}

export default Card;
