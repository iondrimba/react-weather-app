
import React, { Component } from 'react';

class ForeCastTemperature extends Component {
  render() {
    return (
      <p className="forecast__temperature">{this.props.temperature}
        <span className="temperature__unit-dot"></span>
      </p>
    )
  }
}
export default ForeCastTemperature;
