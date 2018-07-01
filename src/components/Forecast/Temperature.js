
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ForeCastTemperature extends Component {
  render() {
    return (
      <p className="forecast__temperature">{this.props.temperature}
        <span className="temperature__unit-dot"></span>
      </p>
    )
  }
}

ForeCastTemperature.propTypes = {
  temperature: PropTypes.number.isRequired
};

export default ForeCastTemperature;
